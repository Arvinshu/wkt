package org.ls.controller;

import org.ls.entity.DepartmentStat;
import org.ls.mapper.StatsMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    private final StatsMapper statsMapper;

    public StatsController(StatsMapper statsMapper) {
        this.statsMapper = statsMapper;
    }

    @GetMapping("/department")
    public List<DepartmentStat> getDepartmentStats() {
        return statsMapper.getDepartmentStats();
    }
}