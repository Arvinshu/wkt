// src/main/java/org/ls/service/DepartmentManagerService.java
package org.ls.service;

import org.ls.entity.DepartmentManager;
import java.util.List;

public interface DepartmentManagerService {
    List<DepartmentManager> getAllDepartmentManagers();
    void updateManager(String departmentName, String departmentLeader);
    void syncDepartments(); // 新增方法
}