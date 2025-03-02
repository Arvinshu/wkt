// src/main/java/org/ls/controller/DepartmentManagerController.java
package org.ls.controller;

import org.ls.entity.DepartmentManager;
import org.ls.service.DepartmentManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/department-manager")
public class DepartmentManagerController {

    private final DepartmentManagerService departmentManagerService;

    public DepartmentManagerController(DepartmentManagerService departmentManagerService) {
        this.departmentManagerService = departmentManagerService;
    }

    @GetMapping
    public List<DepartmentManager> getAll() {
        return departmentManagerService.getAllDepartmentManagers();
    }


    @PostMapping
    public void updateManager(@RequestBody Map<String, String> request) {
        departmentManagerService.updateManager(
                request.get("departmentName"),
                request.get("departmentLeader")
        );
    }

    // 新增接口
    @PostMapping("/sync")
    public ResponseEntity<String> syncDepartments() {
        try {
            departmentManagerService.syncDepartments();
            return ResponseEntity.ok("部门同步成功");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("同步失败: " + e.getMessage());
        }
    }
}