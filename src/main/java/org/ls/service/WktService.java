package org.ls.service;

import org.ls.entity.Wkt;
import java.util.List;

public interface WktService {
    List<Wkt> getData(Integer pageNum, Integer pageSize);
    Integer getTotalCount();
}