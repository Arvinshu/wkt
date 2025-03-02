// src/main/resources/static/js/nav-loader.js

/**
 * 动态加载导航菜单并设置激活状态（支持多级菜单）
 */
function loadNavigation() {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) {
        console.warn('导航容器未找到，请确认页面包含<div id="nav-container"></div>');
        return;
    }

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
            initNavigationLogic();
            setActiveState();
        })
        .catch(error => handleNavigationError(error));
}

/** 初始化菜单交互逻辑 */
function initNavigationLogic() {
    // 鼠标悬停展开二级菜单
    document.querySelectorAll('.has-submenu').forEach(menu => {
        let hideTimeout;

        menu.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            const submenu = menu.querySelector('.submenu');
            submenu.style.display = 'block';
            setTimeout(() => submenu.classList.add('visible'), 10);
        });

        menu.addEventListener('mouseleave', () => {
            const submenu = menu.querySelector('.submenu');
            submenu.classList.remove('visible');
            hideTimeout = setTimeout(() => {
                submenu.style.display = 'none';
            }, 300); // 匹配CSS过渡时间
        });

        // 移动端触摸支持
        menu.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                menu.classList.toggle('expanded');
            }
        });
    });

    // 二级菜单点击保持展开状态
    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                link.closest('.has-submenu').classList.remove('expanded');
            }
        });
    });
}


function setActiveState() {
    const currentPath = window.location.pathname;
    const isStatsPage = currentPath === '/' || currentPath.endsWith('index.html');
    const isWorkingHoursPage = currentPath.endsWith('working-hours.html');
    const isManagerPage = currentPath.endsWith('department-manager.html');

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        const pageType = link.dataset.page;

        if (
            (pageType === 'stats' && isStatsPage) ||
            (pageType === 'working-hours' && isWorkingHoursPage) ||
            (link.href && new URL(link.href).pathname === currentPath)
        ) {
            link.classList.add('active');

            if (link.closest('.has-submenu')) {
                link.closest('.has-submenu').querySelector('> a').classList.add('active');
            }
        }
    });
}

/** 设置菜单激活状态 */
function setActiveState() {
    const currentPath = window.location.pathname;
    const isStatsPage = currentPath === '/' || currentPath.endsWith('index.html');
    const isWorkingHoursPage = currentPath.endsWith('working-hours.html');
    const isManagerPage = currentPath.endsWith('department-manager.html');

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        const pageType = link.dataset.page;

        if (
            (pageType === 'stats' && isStatsPage) ||
            (pageType === 'working-hours' && isWorkingHoursPage) ||
            (link.href && new URL(link.href).pathname === currentPath)
        ) {
            // 高亮父级菜单
            link.classList.add('active');
            const parentMenu = link.closest('.has-submenu');
            if (parentMenu) {
                parentMenu.querySelector('.nav-item').classList.add('active');
            }
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

// 窗口大小变化时重置菜单状态
window.addEventListener('resize', () => {
    document.querySelectorAll('.has-submenu').forEach(menu => {
        menu.classList.remove('expanded');
        menu.querySelector('.submenu').style.display = '';
    });
});