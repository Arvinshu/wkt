let currentPage = 1;
let totalPages = 1;
let totalRecords = 0;

function updatePagination(total, pageSize) {
    totalRecords = total;
    if (pageSize === -1) {
        totalPages = 1;
    } else {
        totalPages = Math.ceil(total / pageSize);
    }
    document.getElementById('currentPage').textContent =
        `${currentPage} / ${totalPages}`;
}

function loadData(pageNum) {
    const pageSize = parseInt(document.getElementById('pageSize').value);
    currentPage = pageNum;

    fetch(`/api/data?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#dataTable tbody');
            tbody.innerHTML = '';

            // 计算起始序号
            const startIndex = (currentPage - 1) * (pageSize === -1 ? totalRecords : pageSize) + 1;

            data.data.forEach((item, index) => {
                const row = `
                    <tr>
                        <td>${startIndex + index}</td>
                        <td>${item.tr}</td>
                        <td>${item.employee}</td>
                        <td>${item.dep}</td>
                        <td>${item.tsStatus}</td> 
                        <td>${new Date(item.tsDate).toLocaleDateString()}</td>
                        <td>${item.tsHours}</td>
                        <td>${item.tsBm}</td>
                        <td>${item.tsName}</td>
                        <td>${item.zone}</td>
<!--                    <td>${item.tsComments || ''}</td>
                        <td>${item.projComments || ''}</td>
-->
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            updatePagination(data.total, pageSize);
        });
}

// 添加窗口resize监听
window.addEventListener('resize', () => {
    const container = document.querySelector('.table-container');
    if (window.innerWidth < 992) {
        container.style.overflowX = 'auto';
    } else {
        container.style.overflowX = 'visible';
    }
});

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadData(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadData(currentPage);
    }
}

// 初始加载数据
loadData(1);