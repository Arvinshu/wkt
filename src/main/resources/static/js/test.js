// src/main/resources/static/js/nav-loader.js

/**
 * 动态加载导航菜单并设置激活状态
 */
function loadNavigation() {
    // 创建加载状态提示
    const navContainer = document.getElementById('nav-container');
    navContainer.innerHTML = '<div class="loading">加载导航中...</div>';

    fetch('/components/nav.html', {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    })
        .then(response => {
            // 处理HTTP错误状态
            if (!response.ok) {
                throw new Error(`导航加载失败: HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // 插入导航菜单
            navContainer.innerHTML = html;

            // 设置激活状态
            const currentPath = window.location.pathname;
            document.querySelectorAll('.nav-item').forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (currentPath === linkPath) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        })
        .catch(error => {
            console.error('导航加载失败:', error);
            navContainer.innerHTML = `
            <div class="nav-error">
                <p>⚠️ 导航加载失败</p>
                <button onclick="location.reload()">点击重试</button>
            </div>
        `;
        });
}

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
    // 确保导航容器存在
    if (document.getElementById('nav-container')) {
        loadNavigation();
    } else {
        console.warn('导航容器未找到，请确认页面包含<div id="nav-container"></div>');
    }
});