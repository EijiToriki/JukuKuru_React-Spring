package com.jukukuru.crs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping
@RestController
public class DBTestController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test")
    public List test(){
        String sql = "" +
                "SELECT " +
                    "* " +
                "FROM " +
                "classroom as cr " +
                "inner join " +
                "classes as c " +
                "on " +
                "cr.id = c.classroom_id;";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        return result;
    }

}
