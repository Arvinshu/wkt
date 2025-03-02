// src/main/java/org/ls/mapper/DepartmentManagerMapper.java
package org.ls.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ls.entity.DepartmentManager;

import java.util.List;

@Mapper

public interface DepartmentManagerMapper {
    List<DepartmentManager> selectAll();

    // 获取所有活跃部门
    List<String> selectActiveDepartments();

    // 批量插入新部门
    int insertNewDepartments(@Param("departments") List<String> departments);

    // 标记不活跃部门
    int markInactiveDepartments(@Param("departments") List<String> activeDepartments);

    // DepartmentManagerMapper.java
    int updateManager(
            @Param("departmentName") String departmentName,
            @Param("departmentLeader") String departmentLeader
    );

    int markAllInactive();
}