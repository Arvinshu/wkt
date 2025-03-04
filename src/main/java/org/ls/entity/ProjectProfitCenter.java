// src/main/java/org/ls/entity/ProjectProfitCenter.java
package org.ls.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectProfitCenter {
    private Integer id;
    private String zone;
    private String businessType;            // 新增字段
    private String regionCategory;          // 新增字段
    private String regionName;              // 新增字段
    private String centerName;              // 新增字段
    private String businessSubcategory;     // 新增字段
    private String departmentName;          // 新增字段
    private String projectProfitCenter;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String responsiblePerson;  // 新增负责人
    private String workLocation;      // 新增工作地点

    public ProjectProfitCenter(
            String zone,
            String businessType,
            String regionCategory,
            String regionName,
            String centerName,
            String businessSubcategory,
            String departmentName,
            String responsiblePerson,  // 新增参数
            String workLocation        // 新增参数
    ) {
        this.zone = zone;
        this.businessType = businessType;
        this.regionCategory = regionCategory;
        this.regionName = regionName;
        this.centerName = centerName;
        this.businessSubcategory = businessSubcategory;
        this.departmentName = departmentName;
        this.responsiblePerson = responsiblePerson; // 新增字段赋值
        this.workLocation = workLocation;           // 新增字段赋值
    }

    // 保留无参构造方法（MyBatis 需要）
    public ProjectProfitCenter() {}
}