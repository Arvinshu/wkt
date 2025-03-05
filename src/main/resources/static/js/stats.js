// 部门统计页数据加载与表格优化
document.addEventListener('DOMContentLoaded', function() {
    // 加载数据
    fetch('/api/stats/department')
        .then(response => {
            if (!response.ok) throw new Error('数据加载失败');
            return response.json();
        })
        .then(data => {
            renderTable(data);
            initTableResponsive(); // 初始化响应式处理
        })
        .catch(error => handleError(error));

    // 窗口大小变化监听
    window.addEventListener('resize', adjustTableLayout);
});

// 渲染表格
function renderTable(data) {
    const tbody = document.querySelector('#statsTable tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map(item => {
        // 数据处理逻辑保持不变
        const excludedDays = item.excludedDays ?
            parseFloat(item.excludedDays).toFixed(2) : '0.00';

        let rateValue = '0.00%';
        let highlightClass = '';
        if (item.projectRate) {
            const rate = parseFloat(item.projectRate) * 100;
            rateValue = rate.toFixed(2) + '%';
            if (rate > 0) highlightClass = 'highlight-rate';
        }

        return `
            <tr>
                <td>${item.department}</td>
                <td>${item.manager || '未设置'}</td>
                <td>${item.count}</td>
                <td>${excludedDays}</td>
                <td class="${highlightClass}">${rateValue}</td>
                <td>${item.applicants || '无数据'}</td>
            </tr>
        `;
    }).join('');

    // 新增：自动调整列宽
    autoAdjustColumns();
}

// 自动调整列宽（核心优化）
function autoAdjustColumns() {
    const table = document.getElementById('statsTable');
    if (!table) return;

    // 获取表格可见宽度
    const tableWidth = table.offsetWidth;

    // 设置最小列宽规则
    const minWidths = [250, 150, 100, 150, 150, 300];

    // 动态调整列宽
    Array.from(table.rows[0].cells).forEach((th, index) => {
        th.style.minWidth = `${minWidths[index]}px`;
    });
}

// 响应式布局调整
function adjustTableLayout() {
    const container = document.querySelector('.stats-container');
    if (window.innerWidth > 1200) {
        container.style.width = "85%"; // 宽屏时略微收缩
    } else {
        container.style.width = "95%"; // 窄屏时扩展宽度
    }
    autoAdjustColumns(); // 重新调整列宽
}

// 错误处理
function handleError(error) {
    console.error('数据加载失败:', error);
    const tbody = document.querySelector('#statsTable tbody');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" class="error">数据加载失败，请刷新页面</td></tr>`;
    }
}

// 初始化响应式功能
function initTableResponsive() {
    adjustTableLayout(); // 首次加载时调整
}