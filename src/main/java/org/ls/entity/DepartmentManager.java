// src/main/java/org/ls/entity/DepartmentManager.java
package org.ls.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DepartmentManager {
    private Integer id;
    private String departmentName;      // 对应department_name
    private String departmentLeader;    // 对应department_leader
    private LocalDateTime createdAt;    // 对应created_at
    private LocalDateTime updatedAt;    // 对应updated_at
}