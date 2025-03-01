// src/main/resources/static/js/nav-loader.js

/**
 * 动态加载导航菜单并设置激活状态（支持新版页面结构）
 */
function loadNavigation() {
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
            if (!response.ok) throw new Error(`导航加载失败: HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            navContainer.innerHTML = html;

            // ================= 新版激活状态判断逻辑 =================
            const currentPath = window.location.pathname;
            const isStatsPage = currentPath === '/' || currentPath.endsWith('index.html');
            const isWorkingHoursPage = currentPath.endsWith('working-hours.html');

            document.querySelectorAll('.nav-item').forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');

                const pageType = link.dataset.page; // 依赖导航组件中的 data-page 属性

                if (
                    (pageType === 'stats' && isStatsPage) ||
                    (pageType === 'working-hours' && isWorkingHoursPage)
                ) {
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

// 初始化导航
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('nav-container')) {
        loadNavigation();
    } else {
        console.warn('导航容器未找到，请确认页面包含<div id="nav-container"></div>');
    }
});