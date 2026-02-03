/**
 * PTmeili 电商网站埋点工具
 * 基于 PtEngine 数据分析需求
 * 支持中文、英文、日文三语言同步追踪
 */

const PtTracking = {
  
  // ========================================
  // 多语言翻译字典
  // ========================================
  
  translations: {
    // 事件名称翻译
    events: {
      '商品曝光': { en: 'Product Impression', ja: '商品表示' },
      '商品点击': { en: 'Product Click', ja: '商品クリック' },
      '商品详情浏览': { en: 'Product View', ja: '商品詳細閲覧' },
      '选择商品规格': { en: 'Select Variant', ja: '商品仕様選択' },
      '查看商品评价': { en: 'View Reviews', ja: 'レビュー閲覧' },
      '查看商品规格': { en: 'View Specs', ja: '商品仕様閲覧' },
      '加入购物车': { en: 'Add to Cart', ja: 'カート追加' },
      '移除购物车': { en: 'Remove from Cart', ja: 'カート削除' },
      '修改购物车数量': { en: 'Update Cart Quantity', ja: 'カート数量変更' },
      '查看购物车': { en: 'View Cart', ja: 'カート閲覧' },
      '清空购物车': { en: 'Clear Cart', ja: 'カートクリア' },
      '收藏商品': { en: 'Add to Favorites', ja: 'お気に入り追加' },
      '取消收藏': { en: 'Remove from Favorites', ja: 'お気に入り削除' },
      '开始结算': { en: 'Begin Checkout', ja: 'チェックアウト開始' },
      '填写收货信息': { en: 'Fill Shipping Info', ja: '配送情報入力' },
      '选择配送方式': { en: 'Select Shipping', ja: '配送方法選択' },
      '选择支付方式': { en: 'Select Payment', ja: '支払方法選択' },
      '使用优惠券': { en: 'Apply Coupon', ja: 'クーポン使用' },
      '提交订单': { en: 'Submit Order', ja: '注文送信' },
      '订单完成': { en: 'Order Complete', ja: '注文完了' },
      '站内搜索': { en: 'Site Search', ja: 'サイト内検索' },
      '筛选商品': { en: 'Filter Products', ja: '商品絞り込み' },
      '排序商品': { en: 'Sort Products', ja: '商品並び替え' },
      '用户注册': { en: 'User Register', ja: 'ユーザー登録' },
      '用户登录': { en: 'User Login', ja: 'ユーザーログイン' },
      '用户退出': { en: 'User Logout', ja: 'ユーザーログアウト' },
      '订阅邮件': { en: 'Subscribe Newsletter', ja: 'メール購読' },
      '点击导航': { en: 'Click Navigation', ja: 'ナビゲーションクリック' },
      '点击Banner': { en: 'Click Banner', ja: 'バナークリック' },
      '点击推荐': { en: 'Click Recommendation', ja: 'おすすめクリック' },
      '图片放大': { en: 'Zoom Image', ja: '画像拡大' },
      '切换图片': { en: 'Switch Image', ja: '画像切替' },
      '切换Tab': { en: 'Switch Tab', ja: 'タブ切替' }
    },
    
    // 属性名称翻译
    properties: {
      '列表名称': { en: 'List Name', ja: 'リスト名' },
      '商品数量': { en: 'Product Count', ja: '商品数' },
      '商品ID列表': { en: 'Product ID List', ja: '商品IDリスト' },
      '商品名称列表': { en: 'Product Name List', ja: '商品名リスト' },
      '商品ID': { en: 'Product ID', ja: '商品ID' },
      '商品名称': { en: 'Product Name', ja: '商品名' },
      '商品价格': { en: 'Product Price', ja: '商品価格' },
      '商品原价': { en: 'Original Price', ja: '通常価格' },
      '折扣率': { en: 'Discount Rate', ja: '割引率' },
      '商品分类': { en: 'Category', ja: 'カテゴリ' },
      '商品品牌': { en: 'Brand', ja: 'ブランド' },
      '列表位置': { en: 'List Position', ja: 'リスト位置' },
      '是否热卖': { en: 'Is Hot', ja: '人気商品' },
      '是否新品': { en: 'Is New', ja: '新商品' },
      '是否促销': { en: 'Is Promotion', ja: 'セール中' },
      '商品评分': { en: 'Rating', ja: '評価' },
      '评价数量': { en: 'Review Count', ja: 'レビュー数' },
      '库存数量': { en: 'Stock', ja: '在庫数' },
      '规格类型': { en: 'Variant Type', ja: '仕様タイプ' },
      '规格值': { en: 'Variant Value', ja: '仕様値' },
      '购买数量': { en: 'Quantity', ja: '購入数' },
      '小计金额': { en: 'Subtotal', ja: '小計' },
      '颜色': { en: 'Color', ja: 'カラー' },
      '尺码': { en: 'Size', ja: 'サイズ' },
      '移除数量': { en: 'Remove Quantity', ja: '削除数' },
      '移除金额': { en: 'Remove Amount', ja: '削除金額' },
      '移除原因': { en: 'Remove Reason', ja: '削除理由' },
      '原数量': { en: 'Old Quantity', ja: '元の数' },
      '新数量': { en: 'New Quantity', ja: '新しい数' },
      '变化数量': { en: 'Change Quantity', ja: '変化数' },
      '操作类型': { en: 'Action Type', ja: '操作タイプ' },
      '商品种类数': { en: 'Item Types', ja: '商品種類数' },
      '商品总数量': { en: 'Total Items', ja: '商品総数' },
      '购物车总金额': { en: 'Cart Total', ja: 'カート合計' },
      '商品列表': { en: 'Product List', ja: '商品リスト' },
      '清空商品数量': { en: 'Clear Item Count', ja: 'クリア商品数' },
      '清空总金额': { en: 'Clear Total', ja: 'クリア合計額' },
      '结算总金额': { en: 'Checkout Total', ja: 'チェックアウト合計' },
      '填写字段': { en: 'Field Name', ja: 'フィールド名' },
      '配送方式': { en: 'Shipping Method', ja: '配送方法' },
      '配送费用': { en: 'Shipping Cost', ja: '配送料' },
      '支付方式': { en: 'Payment Method', ja: '支払方法' },
      '优惠券码': { en: 'Coupon Code', ja: 'クーポンコード' },
      '是否成功': { en: 'Is Success', ja: '成功' },
      '优惠金额': { en: 'Discount Amount', ja: '割引額' },
      '订单号': { en: 'Order ID', ja: '注文番号' },
      '商品原价总额': { en: 'Original Total', ja: '通常価格合計' },
      '商品实际总额': { en: 'Actual Total', ja: '実際合計' },
      '运费': { en: 'Shipping Fee', ja: '送料' },
      '订单总额': { en: 'Order Total', ja: '注文合計' },
      '商品数量': { en: 'Item Count', ja: '商品数' },
      '收货省份': { en: 'Province', ja: '都道府県' },
      '收货城市': { en: 'City', ja: '市区町村' },
      '搜索关键词': { en: 'Search Keyword', ja: '検索キーワード' },
      '搜索结果数': { en: 'Result Count', ja: '検索結果数' },
      '筛选类型': { en: 'Filter Type', ja: '絞り込みタイプ' },
      '筛选值': { en: 'Filter Value', ja: '絞り込み値' },
      '排序方式': { en: 'Sort Type', ja: '並び順' },
      '注册方式': { en: 'Register Method', ja: '登録方法' },
      '登录方式': { en: 'Login Method', ja: 'ログイン方法' },
      '邮箱': { en: 'Email', ja: 'メールアドレス' },
      '导航项': { en: 'Nav Item', ja: 'ナビ項目' },
      'Banner名称': { en: 'Banner Name', ja: 'バナー名' },
      'Banner位置': { en: 'Banner Position', ja: 'バナー位置' },
      '推荐类型': { en: 'Recommend Type', ja: 'おすすめタイプ' },
      '推荐位置': { en: 'Recommend Position', ja: 'おすすめ位置' },
      '图片序号': { en: 'Image Index', ja: '画像番号' },
      'Tab名称': { en: 'Tab Name', ja: 'タブ名' },
      '页面名称': { en: 'Page Name', ja: 'ページ名' },
      '是': { en: 'Yes', ja: 'はい' },
      '否': { en: 'No', ja: 'いいえ' },
      '增加': { en: 'Increase', ja: '増加' },
      '减少': { en: 'Decrease', ja: '減少' }
    }
  },

  // ========================================
  // 核心追踪方法
  // ========================================

  /**
   * 多语言追踪核心方法
   * 同时发送中文、英文、日文三个版本的事件
   */
  _multiLangTrack(eventNameCn, propertiesCn) {
    if (typeof ptengine === 'undefined') {
      console.warn('Ptengine not loaded');
      return;
    }

    // 获取当前时间和URL（系统属性，所有语言版本统一使用中文）
    const currentTime = new Date();
    const timestamp = currentTime.getTime();
    const timeString = currentTime.toLocaleString('zh-CN', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const currentUrl = window.location.href;

    // 系统属性（所有语言版本统一使用中文字段名）
    const systemProperties = {
      '事件发生时间': timeString,
      '事件发生时间戳': timestamp,
      '事件发生的URL': currentUrl,
      '页面标题': document.title
    };

    // 翻译事件名称
    const eventNames = {
      zh: eventNameCn,
      en: this.translations.events[eventNameCn]?.en || eventNameCn,
      ja: this.translations.events[eventNameCn]?.ja || eventNameCn
    };

    // 翻译属性名称和值
    const translateProperties = (lang) => {
      const translated = {};
      for (const [keyCn, value] of Object.entries(propertiesCn)) {
        // 翻译属性名
        const keyTranslated = lang === 'zh' 
          ? keyCn 
          : (this.translations.properties[keyCn]?.[lang] || keyCn);
        
        // 翻译属性值（如果是"是/否"、"增加/减少"等）
        let valueTranslated = value;
        if (typeof value === 'string' && this.translations.properties[value]) {
          valueTranslated = lang === 'zh' 
            ? value 
            : (this.translations.properties[value]?.[lang] || value);
        }
        
        translated[keyTranslated] = valueTranslated;
      }
      return translated;
    };

    // 发送中文版本
    const propertiesZh = {
      ...systemProperties,
      ...translateProperties('zh'),
      '_lang': 'zh-CN',
      '_event_version': 'multi-lang-v1.2'
    };
    ptengine.track(eventNames.zh, propertiesZh);
    console.log('📊 [ZH]', eventNames.zh, propertiesZh);

    // 发送英文版本
    const propertiesEn = {
      ...systemProperties,
      ...translateProperties('en'),
      '_lang': 'en-US',
      '_event_version': 'multi-lang-v1.2'
    };
    ptengine.track(eventNames.en, propertiesEn);
    console.log('📊 [EN]', eventNames.en, propertiesEn);

    // 发送日文版本
    const propertiesJa = {
      ...systemProperties,
      ...translateProperties('ja'),
      '_lang': 'ja-JP',
      '_event_version': 'multi-lang-v1.2'
    };
    ptengine.track(eventNames.ja, propertiesJa);
    console.log('📊 [JA]', eventNames.ja, propertiesJa);
  },

  // ========================================
  // 商品相关事件
  // ========================================

  /**
   * 商品曝光（列表中展示）
   */
  trackProductImpression(products, listName) {
    this._multiLangTrack('商品曝光', {
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
    this._multiLangTrack('商品点击', {
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
    this._multiLangTrack('商品详情浏览', {
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
    this._multiLangTrack('选择商品规格', {
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
    this._multiLangTrack('查看商品评价', {
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
    this._multiLangTrack('查看商品规格', {
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
    this._multiLangTrack('加入购物车', {
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
    this._multiLangTrack('移除购物车', {
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
    this._multiLangTrack('修改购物车数量', {
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
    this._multiLangTrack('查看购物车', {
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
    this._multiLangTrack('清空购物车', {
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
    this._multiLangTrack('收藏商品', {
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
    this._multiLangTrack('取消收藏', {
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
    this._multiLangTrack('开始结算', {
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
    this._multiLangTrack('填写收货信息', {
      '填写字段': field
    });
  },

  /**
   * 选择配送方式
   */
  trackSelectShipping(method, cost) {
    this._multiLangTrack('选择配送方式', {
      '配送方式': method,
      '配送费用': cost
    });
  },

  /**
   * 选择支付方式
   */
  trackSelectPayment(method) {
    this._multiLangTrack('选择支付方式', {
      '支付方式': method
    });
  },

  /**
   * 使用优惠券
   */
  trackApplyCoupon(code, success, discountAmount = 0) {
    this._multiLangTrack('使用优惠券', {
      '优惠券码': code,
      '是否成功': success ? '是' : '否',
      '优惠金额': discountAmount
    });
  },

  /**
   * 提交订单
   */
  trackSubmitOrder(orderInfo) {
    this._multiLangTrack('提交订单', {
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
    this._multiLangTrack('订单完成', {
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
    this._multiLangTrack('站内搜索', {
      '搜索关键词': keyword,
      '搜索结果数': resultCount
    });
  },

  /**
   * 筛选商品
   */
  trackFilter(filterType, filterValue) {
    this._multiLangTrack('筛选商品', {
      '筛选类型': filterType,
      '筛选值': filterValue
    });
  },

  /**
   * 排序商品
   */
  trackSort(sortType) {
    this._multiLangTrack('排序商品', {
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
    this._multiLangTrack('用户注册', {
      '注册方式': method
    });
  },

  /**
   * 用户登录
   */
  trackLogin(method) {
    this._multiLangTrack('用户登录', {
      '登录方式': method
    });
  },

  /**
   * 用户退出
   */
  trackLogout() {
    this._multiLangTrack('用户退出', {});
  },

  /**
   * 订阅邮件
   */
  trackSubscribe(email) {
    this._multiLangTrack('订阅邮件', {
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
    this._multiLangTrack('点击导航', {
      '导航项': navItem
    });
  },

  /**
   * 点击Banner
   */
  trackBannerClick(bannerName, position) {
    this._multiLangTrack('点击Banner', {
      'Banner名称': bannerName,
      'Banner位置': position
    });
  },

  /**
   * 点击推荐位
   */
  trackRecommendClick(product, recommendType, position) {
    this._multiLangTrack('点击推荐', {
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
    this._multiLangTrack('图片放大', {
      '商品ID': product.id,
      '商品名称': product.name,
      '图片序号': imageIndex
    });
  },

  /**
   * 切换商品图片
   */
  trackImageSwitch(product, imageIndex) {
    this._multiLangTrack('切换图片', {
      '商品ID': product.id,
      '商品名称': product.name,
      '图片序号': imageIndex
    });
  },

  /**
   * 切换Tab
   */
  trackTabSwitch(tabName, pageName) {
    this._multiLangTrack('切换Tab', {
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
    console.log('🌍 PtTracking Multi-Language initialized');
    console.log('📊 Supported languages: 中文 (ZH), English (EN), 日本語 (JA)');
    console.log('✅ All events will be tracked in 3 languages simultaneously');
  }
};

// 自动初始化
if (typeof ptengine !== 'undefined') {
  PtTracking.init();
} else {
  console.warn('⚠️ Ptengine not loaded. Multi-language tracking is ready but waiting for ptengine.');
}
