package com.jukukuru.crs.controller;

import com.jukukuru.crs.entity.ClassEntity;
import com.jukukuru.crs.entity.ClassroomEntity;
import com.jukukuru.crs.requestData.OpenDateRequest;
import com.jukukuru.crs.requestData.RegisterDateRequest;
import com.jukukuru.crs.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
public class ClassroomController {

    private final ClassroomService classroomService;
    @GetMapping("/getOpenDate")
    public List<ClassEntity> getOpenDate(@RequestBody OpenDateRequest openDateRequest){
        int classroomId = openDateRequest.getClassroomId();
        System.out.println(classroomId);
        return classroomService.findByClassroomId(classroomId);
    }

    @PostMapping("/registerDate")
    public int registerDate(@RequestBody RegisterDateRequest registerDateRequest){
        int studentId = registerDateRequest.getStudentId();
        List<Integer> classIds = registerDateRequest.getClassIds();

        return classroomService.registerDatesbyStudent(studentId, classIds);
    }


}
