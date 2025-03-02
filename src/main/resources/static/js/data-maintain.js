// src/main/resources/static/js/data-maintain.js

/**
 * 通用数据维护框架逻辑
 * 功能：模块切换、侧边栏交互、通用提示等
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化侧边栏交互
    initSidebarMenu();

    // 绑定全局提示关闭事件
    bindToastClose();
});

/**
 * 初始化侧边栏菜单交互
 */
function initSidebarMenu() {
    // 侧边栏菜单点击事件
    document.querySelectorAll('.submenu li').forEach(item => {
        item.addEventListener('click', function() {
            const module = this.dataset.module;
            if (!module) return;

            // 切换模块高亮状态
            document.querySelectorAll('.submenu li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');

            // 切换显示对应模块内容
            document.querySelectorAll('.module-container').forEach(container => {
                container.classList.remove('active');
            });
            document.getElementById(module).classList.add('active');
        });
    });

    // 默认激活第一个菜单项
    const firstMenuItem = document.querySelector('.submenu li[data-module]');
    if (firstMenuItem) {
        firstMenuItem.click();
    }
}

/**
 * 显示全局提示
 * @param {string} message - 提示内容
 * @param {string} type - 类型（success/error）
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/**
 * 绑定提示关闭按钮事件
 */
function bindToastClose() {
    document.addEventListener('click', e => {
        if (e.target.closest('.toast-close')) {
            e.target.closest('.toast').remove();
        }
    });
}

/**
 * 全局异常处理
 */
window.onerror = function(message, source, lineno, colno, error) {
    showToast(`前端错误: ${message}`, 'error');
};