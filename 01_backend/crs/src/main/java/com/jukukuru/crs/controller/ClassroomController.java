package com.jukukuru.crs.controller;

import com.jukukuru.crs.entity.ClassEntity;
import com.jukukuru.crs.entity.ClassroomEntity;
import com.jukukuru.crs.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
public class ClassroomController {

    private final ClassroomService classroomService;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @GetMapping("/getOpenDate/{classroomId}")
    public List<ClassEntity> getOpenDate(@PathVariable("classroomId") int classroomId){
        return classroomService.findByClassroomId(classroomId);
    }
}
