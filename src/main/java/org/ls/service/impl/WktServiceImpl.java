package org.ls.service.impl;

import org.ls.entity.Wkt;
import org.ls.mapper.WktMapper;
import org.ls.service.WktService;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;
import java.util.List;

@Service
public class WktServiceImpl implements WktService {
    @Resource
    private WktMapper wktMapper;

    @Override
    public List<Wkt> getData(Integer pageNum, Integer pageSize) {
        if (pageSize == -1) {
            return wktMapper.selectAll();
        } else {
            int offset = (pageNum - 1) * pageSize;
            return wktMapper.selectByPage(offset, pageSize);
        }
    }

    @Override
    public Integer getTotalCount() {
        return wktMapper.selectTotalCount();
    }
}