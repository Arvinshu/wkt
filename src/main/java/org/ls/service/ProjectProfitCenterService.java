// src/main/java/org/ls/service/ProjectProfitCenterService.java
package org.ls.service;

import org.ls.entity.ProjectProfitCenter;
import java.util.List;

public interface ProjectProfitCenterService {
    List<ProjectProfitCenter> getAllActive();
    void updateProfitCenter(
            String zone,
            String responsiblePerson,  // 新增参数
            String workLocation        // 新增参数
    );
    void syncZones();
}
