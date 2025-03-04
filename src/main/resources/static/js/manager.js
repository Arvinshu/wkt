// src/main/resources/static/js/manager.js

// import { showToast } from './common.js'; // 使用 ES Modules 模块化导入 common.js 中的 showToast 函数

// ================= 全局工具函数 =================
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ================= 核心业务逻辑 =================
let isSyncing = false; // 同步状态锁

// 加载部门负责人数据
function loadManagers() {
    fetch('/api/department-manager')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => renderManagerTable(data))
        .catch(error => {
            showToast(`数据加载失败: ${error.message}`, 'error');
        });
}

// 渲染表格数据
function renderManagerTable(data) {
    const tbody = document.getElementById('managerTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map(item => `
        <tr>
            <td class="department-name">${item.departmentName}</td>
            <td>
                <input type="text" 
                       value="${item.departmentLeader || ''}" 
                       data-original="${item.departmentLeader || ''}"
                       oninput="toggleSaveButton(this)">
            </td>
            <td>
                <button class="btn-save" 
                        onclick="saveManager('${item.departmentName}', this)" 
                        disabled>保存</button>
            </td>
        </tr>
    `).join('');
}

// 切换保存按钮状态
function toggleSaveButton(input) {
    const btn = input.closest('tr').querySelector('.btn-save');
    btn.disabled = input.value === input.dataset.original;
}

// 保存负责人信息
function saveManager(departmentName, btn) {
    const input = btn.closest('tr').querySelector('input');
    const newLeader = input.value.trim();

    fetch('/api/department-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            departmentName: departmentName,
            departmentLeader: newLeader
        })
    })
        .then(response => {
            if (!response.ok) throw new Error('Save failed 保存失败');
            input.dataset.original = newLeader;
            btn.disabled = true;
            showToast('✅ 保存成功');
        })
        .catch(error => {
            showToast(`❌ ${error.message}`, 'error');
        });
}

// ================= 部门同步逻辑 =================
// manager.js
async function syncDepartments() {
    if (isSyncing) return;
    isSyncing = true;

    try {
        const syncBtn = document.querySelector('.btn-sync');
        syncBtn.disabled = true;
        syncBtn.innerHTML = '<div class="spinner"></div> 同步中...';

        const response = await fetch('/api/department-manager/sync', { method: 'POST' });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP ${response.status}`);
        }

        const message = await response.text();
        showToast(`✅ ${message}`);
        loadManagers();
    } catch (error) {
        showToast(`❌ ${error.message}`, 'error');
    } finally {
        isSyncing = false;
        const syncBtn = document.querySelector('.btn-sync');
        if (syncBtn) {
            syncBtn.disabled = false;
            syncBtn.textContent = '同步部门';
        }
    }
}

// 修改 manager.js 初始化逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 动态绑定点击事件
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('#btn-refresh')) {
            syncDepartments();
        }
    });
});

window.syncDepartments = syncDepartments; // 暴露到全局
window.loadManagers = loadManagers;      // 暴露到全局