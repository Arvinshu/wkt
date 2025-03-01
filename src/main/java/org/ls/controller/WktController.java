package org.ls.controller;

import org.ls.entity.Wkt;
import org.ls.service.WktService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class WktController {
    private final WktService wktService;

    public WktController(WktService wktService) {
        this.wktService = wktService;
    }

    @GetMapping("/api/data")
    public Map<String, Object> getData(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "50") Integer pageSize) {

        List<Wkt> data = wktService.getData(pageNum, pageSize);
        Integer total = wktService.getTotalCount();

        Map<String, Object> result = new HashMap<>();
        result.put("data", data);
        result.put("total", total);
        return result;
    }
}
