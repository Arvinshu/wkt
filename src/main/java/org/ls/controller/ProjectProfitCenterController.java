// src/main/java/org/ls/controller/ProjectProfitCenterController.java
package org.ls.controller;

import org.ls.entity.ProjectProfitCenter;
import org.ls.service.ProjectProfitCenterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/project-profit-center")
public class ProjectProfitCenterController {

    private final ProjectProfitCenterService service;

    public ProjectProfitCenterController(ProjectProfitCenterService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProjectProfitCenter> getAll() {
        return service.getAllActive();
    }

    @PostMapping
    public void update(@RequestBody ProjectProfitCenter request) {
        // 仅更新负责人和工作地点
        service.updateProfitCenter(
                request.getZone(),
                request.getResponsiblePerson(),
                request.getWorkLocation()
        );
    }

    @PostMapping("/sync")
    public ResponseEntity<String> sync() {
        try {
            service.syncZones();
            return ResponseEntity.ok("利润中心同步成功");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("同步失败: " + e.getMessage());
        }
    }
}