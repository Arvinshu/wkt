// src/main/java/org/ls/service/impl/DepartmentManagerServiceImpl.java
package org.ls.service.impl;

import org.ls.entity.DepartmentManager;
import org.ls.mapper.DepartmentManagerMapper;
import org.ls.mapper.WktMapper;
import org.ls.service.DepartmentManagerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.Resource;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DepartmentManagerServiceImpl implements DepartmentManagerService {

    @Resource
    private DepartmentManagerMapper departmentManagerMapper;

    @Resource
    private WktMapper wktMapper;

    @Override
    public List<DepartmentManager> getAllDepartmentManagers() {
        return departmentManagerMapper.selectAll();
    }

    @Override
    public void updateManager(String departmentName, String departmentLeader) {
        departmentManagerMapper.updateManager(departmentName, departmentLeader);
    }

    @Override
    @Transactional
    public void syncDepartments() {
        try {
            // 获取当前有效部门列表
            List<String> currentDepartments = departmentManagerMapper.selectActiveDepartments();

            // 获取最新的部门列表（需处理 null 值）
            List<String> latestDepartmentsRaw = wktMapper.selectDistinctDepartments();
            List<String> latestDepartments = (latestDepartmentsRaw != null) ? latestDepartmentsRaw : new ArrayList<>();

            // 数据清洗：过滤空值和无效部门
            latestDepartments = latestDepartments.stream()
                    .filter(dept -> dept != null
                            && !dept.trim().isEmpty()
                            && !"未分配".equals(dept))
                    .collect(Collectors.toList());

            // 新增部门处理
            List<String> newDepartments = latestDepartments.stream()
                    .filter(dept -> !currentDepartments.contains(dept))
                    .collect(Collectors.toList());
            if (!newDepartments.isEmpty()) {
                departmentManagerMapper.insertNewDepartments(newDepartments);
            }

            // 失效部门标记逻辑
            if (latestDepartments.isEmpty()) {
                // 标记所有部门为不活跃
                departmentManagerMapper.markAllInactive();
            } else {
                // 标记不在最新列表中的部门为不活跃
                departmentManagerMapper.markInactiveDepartments(latestDepartments);
            }
        } catch (Exception e) {
            log.error("部门同步失败: ", e);
            throw new RuntimeException("同步失败: " + e.getMessage()); // 触发事务回滚
        }
    }
}