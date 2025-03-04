// src/main/resources/static/js/common.js

/**
 * 显示 Toast 提示消息
 * @param {string} message 消息内容
 * @param {string} [type='success'] 提示类型，可选值: 'success', 'error', 'warning', 'info'， 默认为 'success'
 */
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container'); // 获取 toast 容器

    if (!toastContainer) { // 如果容器不存在，则创建
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(`toast-${type}`); // 根据类型添加不同的类名
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // 5秒后自动消失 (示例)
    setTimeout(() => {
        toast.classList.add('toast-fade-out'); // 添加 fade-out 动画 class
        setTimeout(() => {
            toastContainer.removeChild(toast); // 动画结束后移除元素
        }, 300); // 动画时长，例如 300ms
    }, 5000);
}