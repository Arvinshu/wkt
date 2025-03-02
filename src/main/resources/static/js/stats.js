// src/main/resources/static/js/stats.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/stats/department')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#statsTable tbody');
            tbody.innerHTML = data.map(item => {
                // 处理休假工时人天
                const excludedDays = item.excludedDays ?
                    parseFloat(item.excludedDays).toFixed(2) :
                    '0.00';

                // 处理项目工时率
                let rateValue = '0.00%';
                let highlightClass = '';
                if (item.projectRate) {
                    const rate = parseFloat(item.projectRate) * 100;
                    rateValue = rate.toFixed(2) + '%';
                    if (rate > 0) {  // 非零值添加高亮样式
                        highlightClass = 'highlight-rate';
                    }
                }

                return `
                <tr>
                    <td>${item.department}</td>
                    <td>${item.manager || '未设置'}</td> <!-- 部门负责人 -->
                    <td>${item.count}</td>
                    <td>${excludedDays}</td>
                    <td class="${highlightClass}">${rateValue}</td>
                    <td>${item.applicants || '无数据'}</td>
                </tr>
                `;
            }).join('');
        })
        .catch(error => {
            console.error('数据加载失败:', error);
            tbody.innerHTML = `<tr><td colspan="5">数据加载失败，请刷新重试</td></tr>`;
        });
});