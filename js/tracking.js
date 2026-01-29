/**
 * PTmeili 电商网站埋点工具
 * 基于 PtEngine 数据分析需求
 */

const PtTracking = {
  
  // ========================================
  // 商品相关事件
  // ========================================

  /**
   * 商品曝光（列表中展示）
   */
  trackProductImpression(products, listName) {
    ptengine.track('商品曝光', {
      '列表名称': listName,
      '商品数量': products.length,
      '商品ID列表': products.map(p => p.id).join(','),
      '商品名称列表': products.map(p => p.name).join(',')
    });
  },

  /**
   * 商品点击
   */
  trackProductClick(product, listName, position) {
    ptengine.track('商品点击', {
      '商品ID': product.id,
      '商品名称': product.name,
      '商品价格': product.price,
      '商品原价': product.originalPrice || product.price,
      '折扣率': product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) + '%' : '0%',
      '商品分类': product.category,
      '商品品牌': product.brand || '',
      '列表名称': listName,
      '列表位置': position,
      '是否热卖': product.isHot ? '是' : '否',
      '是否新品': product.isNew ? '是' : '否',
      '是否促销': product.originalPrice ? '是' : '否'
    });
  },

  /**
   * 商品详情浏览
   */
  trackProductView(product) {
    ptengine.track('商品详情浏览', {
      '商品ID': product.id,
      '商品名称': product.name,
      '商品价格': product.price,
      '商品原价': product.originalPrice || product.price,
      '折扣率': product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) + '%' : '0%',
      '商品分类': product.category,
      '商品品牌': product.brand || '',
      '商品评分': product.rating,
      '评价数量': product.reviewCount,
      '库存数量': product.stock,
      '是否热卖': product.isHot ? '是' : '否',
      '是否新品': product.isNew ? '是' : '否'
    });
  },

  /**
   * 选择商品规格
   */
  trackSelectVariant(product, variantType, variantValue) {
    ptengine.track('选择商品规格', {
      '商品ID': product.id,
      '商品名称': product.name,
      '规格类型': variantType,
      '规格值': variantValue
    });
  },

  /**
   * 查看商品评价
   */
  trackViewReviews(product) {
    ptengine.track('查看商品评价', {
      '商品ID': product.id,
      '商品名称': product.name,
      '评价数量': product.reviewCount,
      '商品评分': product.rating
    });
  },

  /**
   * 查看商品规格参数
   */
  trackViewSpecs(product) {
    ptengine.track('查看商品规格', {
      '商品ID': product.id,
      '商品名称': product.name
    });
  },

  // ========================================
  // 购物车相关事件
  // ========================================

  /**
   * 加入购物车
   */
  trackAddToCart(product, quantity, variant = {}) {
    ptengine.track('加入购物车', {
      '商品ID': product.id,
      '商品名称': product.name,
      '商品价格': product.price,
      '商品原价': product.originalPrice || product.price,
      '折扣率': product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) + '%' : '0%',
      '购买数量': quantity,
      '小计金额': product.price * quantity,
      '颜色': variant.color || '',
      '尺码': variant.size || '',
      '商品分类': product.category
    });
  },

  /**
   * 从购物车移除
   */
  trackRemoveFromCart(item, reason = '') {
    ptengine.track('移除购物车', {
      '商品ID': item.id,
      '商品名称': item.name,
      '商品价格': item.price,
      '移除数量': item.quantity,
      '移除金额': item.price * item.quantity,
      '移除原因': reason
    });
  },

  /**
   * 修改购物车数量
   */
  trackUpdateCartQuantity(item, oldQuantity, newQuantity) {
    const action = newQuantity > oldQuantity ? '增加' : '减少';
    ptengine.track('修改购物车数量', {
      '商品ID': item.id,
      '商品名称': item.name,
      '商品价格': item.price,
      '原数量': oldQuantity,
      '新数量': newQuantity,
      '变化数量': Math.abs(newQuantity - oldQuantity),
      '操作类型': action
    });
  },

  /**
   * 查看购物车
   */
  trackViewCart(items, totalAmount) {
    ptengine.track('查看购物车', {
      '商品种类数': items.length,
      '商品总数量': items.reduce((sum, item) => sum + item.quantity, 0),
      '购物车总金额': totalAmount,
      '商品列表': items.map(item => item.name).join(',')
    });
  },

  /**
   * 清空购物车
   */
  trackClearCart(items, totalAmount) {
    ptengine.track('清空购物车', {
      '清空商品数量': items.length,
      '清空总金额': totalAmount
    });
  },

  // ========================================
  // 收藏相关事件
  // ========================================

  /**
   * 收藏商品
   */
  trackAddToFavorite(product) {
    ptengine.track('收藏商品', {
      '商品ID': product.id,
      '商品名称': product.name,
      '商品价格': product.price,
      '商品分类': product.category
    });
  },

  /**
   * 取消收藏
   */
  trackRemoveFromFavorite(product) {
    ptengine.track('取消收藏', {
      '商品ID': product.id,
      '商品名称': product.name
    });
  },

  // ========================================
  // 结算相关事件
  // ========================================

  /**
   * 开始结算
   */
  trackBeginCheckout(items, totalAmount) {
    ptengine.track('开始结算', {
      '商品种类数': items.length,
      '商品总数量': items.reduce((sum, item) => sum + item.quantity, 0),
      '结算总金额': totalAmount,
      '商品列表': items.map(item => item.name).join(',')
    });
  },

  /**
   * 填写收货信息
   */
  trackFillShippingInfo(field) {
    ptengine.track('填写收货信息', {
      '填写字段': field
    });
  },

  /**
   * 选择配送方式
   */
  trackSelectShipping(method, cost) {
    ptengine.track('选择配送方式', {
      '配送方式': method,
      '配送费用': cost
    });
  },

  /**
   * 选择支付方式
   */
  trackSelectPayment(method) {
    ptengine.track('选择支付方式', {
      '支付方式': method
    });
  },

  /**
   * 使用优惠券
   */
  trackApplyCoupon(code, success, discountAmount = 0) {
    ptengine.track('使用优惠券', {
      '优惠券码': code,
      '是否成功': success ? '是' : '否',
      '优惠金额': discountAmount
    });
  },

  /**
   * 提交订单
   */
  trackSubmitOrder(orderInfo) {
    ptengine.track('提交订单', {
      '订单号': orderInfo.orderId,
      '商品原价总额': orderInfo.originalTotal || orderInfo.subtotal,
      '商品实际总额': orderInfo.subtotal,
      '优惠金额': orderInfo.discount || 0,
      '运费': orderInfo.shippingCost,
      '订单总额': orderInfo.total,
      '商品数量': orderInfo.itemCount,
      '商品种类数': orderInfo.itemTypes,
      '支付方式': orderInfo.paymentMethod,
      '配送方式': orderInfo.shippingMethod
    });
  },

  /**
   * 订单完成
   */
  trackOrderComplete(orderInfo) {
    ptengine.track('订单完成', {
      '订单号': orderInfo.orderId,
      '订单总额': orderInfo.total,
      '商品数量': orderInfo.itemCount,
      '支付方式': orderInfo.paymentMethod,
      '配送方式': orderInfo.shippingMethod,
      '收货省份': orderInfo.province,
      '收货城市': orderInfo.city
    });
  },

  // ========================================
  // 搜索与筛选事件
  // ========================================

  /**
   * 站内搜索
   */
  trackSearch(keyword, resultCount) {
    ptengine.track('站内搜索', {
      '搜索关键词': keyword,
      '搜索结果数': resultCount
    });
  },

  /**
   * 筛选商品
   */
  trackFilter(filterType, filterValue) {
    ptengine.track('筛选商品', {
      '筛选类型': filterType,
      '筛选值': filterValue
    });
  },

  /**
   * 排序商品
   */
  trackSort(sortType) {
    ptengine.track('排序商品', {
      '排序方式': sortType
    });
  },

  // ========================================
  // 用户相关事件
  // ========================================

  /**
   * 用户注册
   */
  trackRegister(method) {
    ptengine.track('用户注册', {
      '注册方式': method
    });
  },

  /**
   * 用户登录
   */
  trackLogin(method) {
    ptengine.track('用户登录', {
      '登录方式': method
    });
  },

  /**
   * 用户退出
   */
  trackLogout() {
    ptengine.track('用户退出', {});
  },

  /**
   * 订阅邮件
   */
  trackSubscribe(email) {
    ptengine.track('订阅邮件', {
      '邮箱': email
    });
  },

  // ========================================
  // 交互事件
  // ========================================

  /**
   * 点击导航
   */
  trackNavClick(navItem) {
    ptengine.track('点击导航', {
      '导航项': navItem
    });
  },

  /**
   * 点击Banner
   */
  trackBannerClick(bannerName, position) {
    ptengine.track('点击Banner', {
      'Banner名称': bannerName,
      'Banner位置': position
    });
  },

  /**
   * 点击推荐位
   */
  trackRecommendClick(product, recommendType, position) {
    ptengine.track('点击推荐', {
      '商品ID': product.id,
      '商品名称': product.name,
      '推荐类型': recommendType,
      '推荐位置': position
    });
  },

  /**
   * 图片放大查看
   */
  trackImageZoom(product, imageIndex) {
    ptengine.track('图片放大', {
      '商品ID': product.id,
      '商品名称': product.name,
      '图片序号': imageIndex
    });
  },

  /**
   * 切换商品图片
   */
  trackImageSwitch(product, imageIndex) {
    ptengine.track('切换图片', {
      '商品ID': product.id,
      '商品名称': product.name,
      '图片序号': imageIndex
    });
  },

  /**
   * 切换Tab
   */
  trackTabSwitch(tabName, pageName) {
    ptengine.track('切换Tab', {
      'Tab名称': tabName,
      '页面名称': pageName
    });
  },

  // ========================================
  // 工具方法
  // ========================================

  /**
   * 节流函数
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * 初始化
   */
  init() {
    console.log('PtTracking initialized');
  }
};

// 自动初始化
if (typeof ptengine !== 'undefined') {
  PtTracking.init();
}
