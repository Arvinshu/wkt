package org.ls.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ls.entity.Wkt;
import java.util.List;

@Mapper
public interface WktMapper {
    List<Wkt> selectAll();
    List<Wkt> selectByPage(Integer offset, Integer limit);
    Integer selectTotalCount();
}
