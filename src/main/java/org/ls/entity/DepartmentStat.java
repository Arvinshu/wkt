package org.ls.entity;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DepartmentStat {
    private String department; // 处理后的部门名称
    private Integer count;     // 人数统计
    private BigDecimal excludedDays;    // 新增：休假工时人天
    private BigDecimal projectRate;    // 新增：项目工时率
    private String applicants; // 新增申请人列
}