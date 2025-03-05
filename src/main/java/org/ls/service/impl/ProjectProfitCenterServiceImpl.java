// src/main/java/org/ls/service/impl/ProjectProfitCenterServiceImpl.java
package org.ls.service.impl;

import org.ls.entity.ProjectProfitCenter;
import org.ls.mapper.ProjectProfitCenterMapper;
import org.ls.mapper.WktMapper;
import org.ls.service.ProjectProfitCenterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
            // 1. 获取最新zone数据
            List<String> latestZones = Optional.ofNullable(wktMapper.selectDistinctZones())
                    .orElse(Collections.emptyList());

            // 2. 获取当前有效zone
            List<String> currentActiveZones = mapper.selectActiveZones();

            // 3. 处理新增zone（拆分字段逻辑）
            List<String> newZones = latestZones.stream()
                    .filter(z -> !currentActiveZones.contains(z))
                    .toList();
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
                                    null,  // 负责人初始值
                                    null   // 工作地点初始值
                            );
                        })
                        .collect(Collectors.toList());
                mapper.insertNewZonesWithSplitFields(splitData);
            }

            // 4. 重新激活存在的zone（新增核心逻辑）
            latestZones.forEach(zone -> {
                mapper.updateActiveStatus(zone, true);
            });

            // 5. 标记失效zone
            List<String> allZones = mapper.selectAllZones();
            List<String> inactiveZones = allZones.stream()
                    .filter(z -> !latestZones.contains(z))
                    .collect(Collectors.toList());
            if (!inactiveZones.isEmpty()) {
                mapper.markInactiveZones(inactiveZones);
            }

            log.info("利润中心同步完成：新增 {} 个zone，当前有效zone {} 个",
                    newZones.size(), latestZones.size());
        } catch (Exception e) {
            log.error("自动同步失败", e);
            throw new RuntimeException("同步失败: " + e.getMessage());
        }
    }
}