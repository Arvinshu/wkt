// src/main/java/org/ls/mapper/ProjectProfitCenterMapper.java
package org.ls.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.ls.entity.ProjectProfitCenter;

import java.util.List;

@Mapper
public interface ProjectProfitCenterMapper {
    List<ProjectProfitCenter> selectAllActive();

    int updateProfitCenter(
            @Param("zone") String zone,
            @Param("responsiblePerson") String responsiblePerson,  // 新增参数
            @Param("workLocation") String workLocation            // 新增参数
    );

    List<String> selectActiveZones();

    int insertNewZones(@Param("zones") List<String> zones);

    int markInactiveZones(@Param("activeZones") List<String> activeZones);

    int insertNewZonesWithSplitFields(List<ProjectProfitCenter> zones);

    List<String> selectAllZones();

    int updateActiveStatus(@Param("zone") String zone, @Param("active") Boolean active);

}