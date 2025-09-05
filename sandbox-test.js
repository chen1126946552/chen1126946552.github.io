document.addEventListener('DOMContentLoaded', function() {
    // 基础功能处理程序
    const handlers = {
        injectDynamicSandbox() {
            const content = `
                <div class="product-recommendation">
                    <h3>おすすめ商品</h3>
                    <div class="product-card">
                        <img src="https://cdn.shopify.com/s/files/1/0532/3063/3157/files/gif2_360x.gif?v=1756352919" 
                             alt="[Kathy] AdaptAll™ スポーツ サンダル">
                        <h3>[Kathy] AdaptAll™ スポーツ サンダル</h3>
                        <p class="price">¥21,900</p>
                        <div class="color-options">
                            <span class="color-dot black" title="ブラック"></span>
                            <span class="color-dot beige" title="ベージュ"></span>
                        </div>
                        <button class="add-to-cart">カートに入れる</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectEmptyDiv() {
            document.body.insertAdjacentHTML('afterbegin', '<div></div>');
        },

        injectAttributeDiv() {
            document.body.insertAdjacentHTML('afterbegin', '<div id="test-div" data-test="true" aria-hidden="true"></div>');
        },

        injectEmptySection() {
            document.body.insertAdjacentHTML('afterbegin', '<section></section>');
        },

        injectEmptyArticle() {
            document.body.insertAdjacentHTML('afterbegin', '<article></article>');
        },

        injectEmptyMain() {
            document.body.insertAdjacentHTML('afterbegin', '<main></main>');
        },

        injectEmptyAside() {
            document.body.insertAdjacentHTML('afterbegin', '<aside></aside>');
        },

        injectSingleComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(' 这是一个单行注释 ');
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectMultiComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(`
                这是一个多行注释
                第二行
                第三行
            `);
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectNestedComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(`
                外层注释
                <!-- 内层注释 -->
                继续外层
            `);
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectConditionalComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(`[if IE]>
                这是IE条件注释
                <![endif]`);
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectVueComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(` @vue/component 
                <template>
                    <!-- Vue模板注释 -->
                </template>
            `);
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectReactComment() {
            const text = document.createTextNode(`
                {/* React JSX注释 */}
                {/* 
                    多行React注释
                */}
            `);
            document.body.insertBefore(text, document.body.firstChild);
        },

        injectAngularComment() {
            const wrapper = document.createElement('div');
            wrapper.className = 'comment-wrapper';
            const comment = document.createComment(` Angular template comment 
                @Component({
                    // TypeScript注释
                })
            `);
            wrapper.appendChild(comment);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },

        injectOtherFrameworkComment() {
            const fragment = document.createDocumentFragment();
            fragment.appendChild(document.createComment(' Svelte注释 '));
            fragment.appendChild(document.createTextNode('<%# EJS注释 %>'));
            fragment.appendChild(document.createTextNode('{{! Handlebars注释 }}'));
            document.body.insertBefore(fragment, document.body.firstChild);
        },

        injectBasicNoscript() {
            const content = '<div class="script-wrapper"><noscript>您的浏览器不支持JavaScript，请启用JavaScript以获得更好的体验。</noscript></div>';
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        // 模板占位符相关函数
        injectTemplatePlaceholder() {
            const content = `
                {{ mustache_variable }}
                <%= ejs_variable %>
                {{{ handlebars_raw }}}
                {% template_tag %}
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectComponentPlaceholder() {
            const content = `
                <component-placeholder />
                <slot name="content"></slot>
                <ng-container></ng-container>
                <template></template>
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectDynamicPlaceholder() {
            const content = `
                {{ dynamicContent }}
                <div v-if="loading">...</div>
                {isLoading && <Spinner />}
                *ngIf="isLoading"
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectConditionalPlaceholder() {
            const content = `
                <div v-if="condition">...</div>
                {condition ? <A /> : <B />}
                *ngIf="condition else elseBlock"
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        // 加载状态占位符相关函数
        injectSkeletonPlaceholder() {
            const content = `
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-circle"></div>
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectLoadingPlaceholder() {
            const content = `<div class="loading-spinner"></div>`;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectErrorStatePlaceholder() {
            const content = `
                <div class="error-icon">❌</div>
                <div class="error-message">Error loading content</div>
                <button class="retry-button">Retry</button>
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectEmptyStatePlaceholder() {
            const content = `
                <div class="empty-icon">📭</div>
                <div class="empty-message">No content available</div>
                <button class="action-button">Add Content</button>
            `;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        // SCRIPT标签相关函数
        injectInlineScript() {
            const content = `<div class="script-wrapper"><script>
                console.log('内联脚本执行 - ' + new Date().toLocaleTimeString());
            </script></div>`;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectExternalScript() {
            const content = `<div class="script-wrapper"><script src="https://cdn.shopify.com/s/assets/storefront.js" async></script></div>`;
            document.body.insertAdjacentHTML('afterbegin', content);
        },

        injectDynamicScript() {
            setTimeout(() => {
                const content = `<div class="script-wrapper"><script>
                    console.log('动态脚本执行 - ' + new Date().toLocaleTimeString());
                </script></div>`;
                document.body.insertAdjacentHTML('afterbegin', content);
            }, 1000);
        },

        injectModuleScript() {
            const content = `<div class="script-wrapper"><script type="module">
                import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
                console.log('ES模块脚本执行 - ' + new Date().toLocaleTimeString());
            </script></div>`;
            document.body.insertAdjacentHTML('afterbegin', content);
        }
    };

    // 添加事件监听
    const buttons = {
        'add-sandbox-btn': handlers.injectDynamicSandbox,
        'add-empty-div-btn': handlers.injectEmptyDiv,
        'add-attr-div-btn': handlers.injectAttributeDiv,
        'add-empty-section-btn': handlers.injectEmptySection,
        'add-empty-article-btn': handlers.injectEmptyArticle,
        'add-empty-main-btn': handlers.injectEmptyMain,
        'add-empty-aside-btn': handlers.injectEmptyAside,
        'add-single-comment-btn': handlers.injectSingleComment,
        'add-multi-comment-btn': handlers.injectMultiComment,
        'add-nested-comment-btn': handlers.injectNestedComment,
        'add-conditional-comment-btn': handlers.injectConditionalComment,
        'add-vue-comment-btn': handlers.injectVueComment,
        'add-react-comment-btn': handlers.injectReactComment,
        'add-angular-comment-btn': handlers.injectAngularComment,
        'add-other-framework-btn': handlers.injectOtherFrameworkComment,
        'add-basic-noscript-btn': handlers.injectBasicNoscript,
        'add-template-placeholder-btn': handlers.injectTemplatePlaceholder,
        'add-component-placeholder-btn': handlers.injectComponentPlaceholder,
        'add-dynamic-placeholder-btn': handlers.injectDynamicPlaceholder,
        'add-conditional-placeholder-btn': handlers.injectConditionalPlaceholder,
        'add-skeleton-btn': handlers.injectSkeletonPlaceholder,
        'add-loading-btn': handlers.injectLoadingPlaceholder,
        'add-error-state-btn': handlers.injectErrorStatePlaceholder,
        'add-empty-state-btn': handlers.injectEmptyStatePlaceholder,
        'add-inline-script-btn': handlers.injectInlineScript,
        'add-external-script-btn': handlers.injectExternalScript,
        'add-dynamic-script-btn': handlers.injectDynamicScript,
        'add-module-script-btn': handlers.injectModuleScript
    };

    // 为所有按钮添加事件监听器
    Object.entries(buttons).forEach(([id, handler]) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', handler);
        }
    });

    // 购物车功能
    const cartSandbox = document.querySelector('[data-sandbox-id="dynamic-state"]');
    if (cartSandbox) {
        const cartItems = cartSandbox.querySelector('.cart-items');
        const subtotal = cartSandbox.querySelector('.subtotal');
        let cart = [];

        // 添加到购物车功能
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                // 更新购物车
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage
                });

                // 更新购物车显示
                updateCart();

                // 触发sandbox状态变化
                cartSandbox.setAttribute('data-state', 'active');
                setTimeout(() => {
                    cartSandbox.setAttribute('data-state', 'inactive');
                }, 3000);
            }
        });

        // 颜色选择功能
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-dot')) {
                const productCard = e.target.closest('.product-card');
                const productImage = productCard.querySelector('img');
                const color = e.target.title;
                
                // 根据颜色更换图片
                const currentSrc = productImage.src;
                const newSrc = currentSrc.replace(/_BLACK_1_800x\.jpg/, `_${color.toUpperCase()}_1_800x.jpg`);
                productImage.src = newSrc;
            }
        });

        function updateCart() {
            // 更新购物车内容
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                </div>
            `).join('');

            // 更新小计
            const total = cart.reduce((sum, item) => {
                const price = parseInt(item.price.replace('¥', '').replace(',', ''));
                return sum + price;
            }, 0);
            subtotal.textContent = `¥${total.toLocaleString()}`;

            // 触发Web Pixels Manager事件
            if (window.ShopifyAnalytics) {
                console.log('Cart updated event triggered for Web Pixels Manager');
            }
        }
    }

    // 监控sandbox可见性变化
    const sandboxes = document.querySelectorAll('.web-pixels-manager-sandbox');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sandbox = entry.target;
            if (entry.isIntersecting) {
                console.log(`Sandbox ${sandbox.getAttribute('data-sandbox-id')} is visible`);
                sandbox.setAttribute('data-state', 'active');
            } else {
                console.log(`Sandbox ${sandbox.getAttribute('data-sandbox-id')} is hidden`);
                sandbox.setAttribute('data-state', 'inactive');
            }
        });
    });

    // 观察所有sandbox
    sandboxes.forEach(sandbox => {
        observer.observe(sandbox);
    });
});

// Web Pixels Manager事件处理
window.addEventListener('load', () => {
    console.log('Web Pixels Manager initialized');
    
    function trackPixelEvent(eventName, data) {
        console.log('Pixel Event:', eventName, data);
    }

    // 监听商品查看
    document.querySelectorAll('.product-card').forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const productName = card.querySelector('h3').textContent;
                    const productPrice = card.querySelector('.price').textContent;
                    trackPixelEvent('product_viewed', {
                        product_name: productName,
                        product_price: productPrice
                    });
                }
            });
        });
        observer.observe(card);
    });
});
