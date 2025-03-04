// src/main/java/org/ls/service/impl/ProjectProfitCenterServiceImpl.java
package org.ls.service.impl;

import org.ls.entity.ProjectProfitCenter;
import org.ls.mapper.ProjectProfitCenterMapper;
import org.ls.mapper.WktMapper;
import org.ls.service.ProjectProfitCenterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProjectProfitCenterServiceImpl implements ProjectProfitCenterService {

    private final ProjectProfitCenterMapper mapper;
    private final WktMapper wktMapper;

    public ProjectProfitCenterServiceImpl(ProjectProfitCenterMapper mapper, WktMapper wktMapper) {
        this.mapper = mapper;
        this.wktMapper = wktMapper;
    }

    @Override
    public List<ProjectProfitCenter> getAllActive() {
        return mapper.selectAllActive();
    }

    @Override
    public void updateProfitCenter(
            String zone,
            String responsiblePerson,
            String workLocation
    ) {
        mapper.updateProfitCenter(zone, responsiblePerson, workLocation);
    }

    @Override
    @Transactional
    public void syncZones() {
        try {
            // 1. 自动查询 t_wkt 表获取最新 zone 数据
            List<String> latestZonesFromWkt = wktMapper.selectDistinctZones();

            // 2. 获取当前有效 zone 列表
            List<String> currentActiveZones = mapper.selectActiveZones();

            // 3. 发现新增 zone（需拆分）
            List<String> newZones = latestZonesFromWkt.stream()
                    .filter(z -> !currentActiveZones.contains(z))
                    .collect(Collectors.toList());

            // 4. 拆分并插入新数据
            if (!newZones.isEmpty()) {
                List<ProjectProfitCenter> splitData = newZones.stream()
                        .map(z -> {
                            String[] parts = z.split("-");
                            return new ProjectProfitCenter(
                                    z,
                                    (parts.length > 0) ? parts[0].trim() : null,
                                    (parts.length > 1) ? parts[1].trim() : null,
                                    (parts.length > 2) ? parts[2].trim() : null,
                                    (parts.length > 3) ? parts[3].trim() : null,
                                    (parts.length > 4) ? parts[4].trim() : null,
                                    (parts.length > 5) ? parts[5].trim() : null,
                                    null,  // 负责人初始为null
                                    null   // 工作地点初始为null
                            );
                        })
                        .collect(Collectors.toList());
                mapper.insertNewZonesWithSplitFields(splitData);
            }

            // 5. 标记失效 zone
            List<String> allZonesInPPC = mapper.selectAllZones();
            List<String> inactiveZones = allZonesInPPC.stream()
                    .filter(z -> !latestZonesFromWkt.contains(z))
                    .collect(Collectors.toList());
            if (!inactiveZones.isEmpty()) {
                mapper.markInactiveZones(inactiveZones);
            }
        } catch (Exception e) {
            log.error("自动同步失败", e);
        }
    }
}