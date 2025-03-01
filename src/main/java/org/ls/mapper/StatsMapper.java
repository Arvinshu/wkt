package org.ls.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ls.entity.DepartmentStat;
import java.util.List;

@Mapper
public interface StatsMapper {
    List<DepartmentStat> getDepartmentStats();
}