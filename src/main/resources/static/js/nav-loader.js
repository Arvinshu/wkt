// src/main/resources/static/js/nav-loader.js

/**
 * 动态加载导航菜单并设置精准激活状态
 */
function loadNavigation() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = '<div class="loading">加载导航中...</div>';

    fetch('/components/nav.html')
        .then(response => {
            if (!response.ok) throw new Error(`导航加载失败: HTTP ${response.status}`);
            return response.text();
        })
        .then(html => {
            navContainer.innerHTML = html;
            initNavigationLogic();
            setPreciseActiveState(); // 关键修改点：使用精准激活逻辑
        })
        .catch(error => handleNavigationError(error));
}

/** 初始化菜单交互逻辑 */
function initNavigationLogic() {
    // 保持原有鼠标悬停逻辑不变
    document.querySelectorAll('.has-submenu').forEach(menu => {
        // ...（原有代码保持不变）...
    });
}

/** 精准设置激活状态 */
function setPreciseActiveState() {
    const currentPath = window.location.pathname;

    // 第一步：清除所有激活状态
    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
    });

    // 第二步：精准匹配当前页面
    document.querySelectorAll('.nav-item').forEach(link => {
        if (new URL(link.href).pathname === currentPath) {
            link.classList.add('active');
        }
    });
}

/** 错误处理 */
function handleNavigationError(error) {
    console.error('导航加载失败:', error);
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = `
        <div class="nav-error">
            <p>⚠️ 导航加载失败</p>
            <button onclick="location.reload()">点击重试</button>
        </div>
    `;
}

// 初始化导航
document.addEventListener('DOMContentLoaded', loadNavigation);

// 窗口大小变化重置菜单状态
window.addEventListener('resize', () => {
    document.querySelectorAll('.has-submenu').forEach(menu => {
        menu.classList.remove('expanded');
        menu.querySelector('.submenu').style.display = '';
    });
});