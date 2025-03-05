// src/main/resources/static/js/profit-center.js

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
let isSyncing = false;

// 同步利润中心数据
async function syncZones() {
    if (isSyncing) return;
    isSyncing = true;

    const btn = document.querySelector('.btn-sync');
    try {
        btn.disabled = true;
        btn.innerHTML = '<div class="spinner"></div> 同步中...';

        const response = await fetch('/api/project-profit-center/sync', {
            method: 'POST'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP ${response.status}`);
        }

        showToast('✅ 同步成功');
        loadData();
    } catch (error) {
        showToast(`❌ 同步失败: ${error.message}`, 'error');
    } finally {
        isSyncing = false;
        btn.disabled = false;
        btn.textContent = '同步数据';
    }
}

// 加载数据
function loadData() {
    const tbody = document.getElementById('dataBody');
    if (!tbody) {
        console.error('找不到表格体元素');
        return;
    }

    fetch('/api/project-profit-center')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => renderTable(data))
        .catch(error => {
            showToast(`加载失败: ${error.message}`, 'error');
        });
}

// 渲染表格
function renderTable(data) {
    const tbody = document.getElementById('dataBody');
    if (!tbody) return;

    tbody.innerHTML = data.map((item, index) => `
        <tr>
            <td>${index + 1}</td> <!-- 动态生成序号 -->
            <td>${item.businessType || '-'}</td>
            <td>${item.regionCategory || '-'}</td>
            <td>${item.regionName || '-'}</td>
            <td>${item.centerName || '-'}</td>
            <td>${item.businessSubcategory || '-'}</td>
            <td>${item.departmentName || '-'}</td>
            <td><input value="${item.responsiblePerson || ''}"></td>
            <td><input value="${item.workLocation || ''}"></td>
            <td><button class="btn-save" onclick="save('${item.zone}', this)">保存</button></td>
        </tr>
    `).join('');
}

// 保存数据
function save(zone, btn) {
    const row = btn.closest('tr');
    const payload = {
        zone: zone,
        responsiblePerson: row.querySelector('td:nth-child(8) input').value.trim(),
        workLocation: row.querySelector('td:nth-child(9) input').value.trim()
    };

    fetch('/api/project-profit-center', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) throw new Error('保存失败');
            showToast('✅ 保存成功');
        })
        .catch(error => {
            showToast(`❌ ${error.message}`, 'error');
        });
}

// ================= 暴露全局函数 =================
window.syncZones = syncZones;
window.loadData = loadData;
window.save = save;

// ================= 初始化逻辑 =================
document.addEventListener('DOMContentLoaded', () => {
    // 进入页面自动加载数据
    loadData();
});