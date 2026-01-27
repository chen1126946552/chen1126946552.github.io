/**
 * 电商网站公共 JavaScript
 * 包含 GTM/dataLayer 工具函数和购物车逻辑
 */

// ========================================
// GTM 和 dataLayer 工具函数
// ========================================

/**
 * 初始化 dataLayer
 */
window.dataLayer = window.dataLayer || [];

/**
 * 推送事件到 dataLayer
 * @param {string} eventName - 事件名称
 * @param {object} eventData - 事件数据
 */
function pushToDataLayer(eventName, eventData = {}) {
  // 清除之前的电商数据
  dataLayer.push({ ecommerce: null });
  
  dataLayer.push({
    event: eventName,
    ...eventData
  });
  
  console.log('DataLayer Push:', eventName, eventData);
}

/**
 * 推送电商事件
 * @param {string} eventName - 事件名称
 * @param {object} ecommerceData - 电商数据
 */
function pushEcommerceEvent(eventName, ecommerceData) {
  pushToDataLayer(eventName, {
    ecommerce: {
      currency: 'CNY',
      ...ecommerceData
    }
  });
}

/**
 * 格式化商品数据为 GA4 格式
 * @param {object} product - 商品数据
 * @param {number} quantity - 数量
 * @param {number} index - 列表位置
 * @returns {object} 格式化后的商品数据
 */
function formatProductItem(product, quantity = 1, index = 0) {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.category || '',
    item_brand: product.brand || '电商示例',
    price: product.price,
    quantity: quantity,
    index: index
  };
}

// ========================================
// 购物车管理
// ========================================

const Cart = {
  STORAGE_KEY: 'ecommerce_cart',

  /**
   * 获取购物车数据
   * @returns {array} 购物车商品列表
   */
  getItems() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * 保存购物车数据
   * @param {array} items - 购物车商品列表
   */
  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateCartCount();
  },

  /**
   * 添加商品到购物车
   * @param {object} product - 商品数据
   * @param {number} quantity - 数量
   * @param {object} variant - 变体信息（颜色、尺码等）
   */
  addItem(product, quantity = 1, variant = {}) {
    const items = this.getItems();
    const variantKey = JSON.stringify(variant);
    
    // 查找是否已存在相同商品和变体
    const existingIndex = items.findIndex(
      item => item.id === product.id && JSON.stringify(item.variant || {}) === variantKey
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        variant: variant
      });
    }

    this.saveItems(items);

    // 推送 add_to_cart 事件
    pushEcommerceEvent('add_to_cart', {
      value: product.price * quantity,
      items: [formatProductItem(product, quantity)]
    });

    showToast('已添加到购物车');
    return items;
  },

  /**
   * 从购物车移除商品
   * @param {number} index - 商品在购物车中的索引
   */
  removeItem(index) {
    const items = this.getItems();
    const removedItem = items[index];
    
    if (removedItem) {
      items.splice(index, 1);
      this.saveItems(items);

      // 推送 remove_from_cart 事件
      pushEcommerceEvent('remove_from_cart', {
        value: removedItem.price * removedItem.quantity,
        items: [{
          item_id: removedItem.id,
          item_name: removedItem.name,
          price: removedItem.price,
          quantity: removedItem.quantity
        }]
      });
    }

    return items;
  },

  /**
   * 更新商品数量
   * @param {number} index - 商品索引
   * @param {number} quantity - 新数量
   */
  updateQuantity(index, quantity) {
    const items = this.getItems();
    if (items[index]) {
      const oldQuantity = items[index].quantity;
      items[index].quantity = Math.max(1, quantity);
      this.saveItems(items);

      // 如果数量增加，推送 add_to_cart
      if (quantity > oldQuantity) {
        pushEcommerceEvent('add_to_cart', {
          value: items[index].price * (quantity - oldQuantity),
          items: [{
            item_id: items[index].id,
            item_name: items[index].name,
            price: items[index].price,
            quantity: quantity - oldQuantity
          }]
        });
      }
    }
    return items;
  },

  /**
   * 清空购物车
   */
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateCartCount();
  },

  /**
   * 获取购物车商品总数
   * @returns {number} 商品总数
   */
  getCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * 获取购物车总金额
   * @returns {number} 总金额
   */
  getTotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * 更新页面上的购物车数量显示
   */
  updateCartCount() {
    const count = this.getCount();
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ========================================
// 商品数据管理
// ========================================

const Products = {
  data: null,

  /**
   * 加载商品数据
   * @returns {Promise<array>} 商品列表
   */
  async load() {
    if (this.data) return this.data;
    
    try {
      const response = await fetch('/data/products.json');
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error('Failed to load products:', error);
      return [];
    }
  },

  /**
   * 根据 ID 获取商品
   * @param {string} id - 商品 ID
   * @returns {object|null} 商品数据
   */
  async getById(id) {
    const products = await this.load();
    return products.find(p => p.id === id) || null;
  },

  /**
   * 根据分类获取商品
   * @param {string} category - 分类名称
   * @returns {array} 商品列表
   */
  async getByCategory(category) {
    const products = await this.load();
    if (!category || category === '全部') return products;
    return products.filter(p => p.category === category);
  }
};

// ========================================
// UI 工具函数
// ========================================

/**
 * 显示 Toast 消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success, error, info)
 * @param {number} duration - 显示时长（毫秒）
 */
function showToast(message, type = 'success', duration = 3000) {
  // 移除已存在的 toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // 触发动画
  setTimeout(() => toast.classList.add('show'), 10);

  // 自动移除
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * 格式化价格
 * @param {number} price - 价格
 * @returns {string} 格式化后的价格
 */
function formatPrice(price) {
  return '¥' + price.toFixed(2);
}

/**
 * 生成星级评分 HTML
 * @param {number} rating - 评分 (0-5)
 * @returns {string} HTML 字符串
 */
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let html = '';
  
  for (let i = 0; i < fullStars; i++) {
    html += '★';
  }
  if (hasHalfStar) {
    html += '☆';
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    html += '☆';
  }
  
  return html;
}

/**
 * 生成唯一订单号
 * @returns {string} 订单号
 */
function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD${timestamp}${random}`;
}

// ========================================
// 移动端导航
// ========================================

function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// ========================================
// 页面初始化
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // 更新购物车数量
  Cart.updateCartCount();
  
  // 初始化移动端导航
  initMobileNav();

  // 设置当前导航高亮
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// ========================================
// 导出模块（如果使用模块化）
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Cart,
    Products,
    pushToDataLayer,
    pushEcommerceEvent,
    formatProductItem,
    showToast,
    formatPrice,
    generateStars,
    generateOrderId
  };
}
