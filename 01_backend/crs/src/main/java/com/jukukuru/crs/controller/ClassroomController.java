package com.jukukuru.crs.controller;

import com.jukukuru.crs.entity.ClassEntity;
import com.jukukuru.crs.requestData.*;
import com.jukukuru.crs.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClassroomController {

    private final ClassroomService classroomService;

    @GetMapping("/getOpenDate")
    public List<ClassEntity> getOpenDate(@RequestParam int classroomId){
        return classroomService.findByClassroomId(classroomId);
    }


    @PostMapping("/registerDate")
    public int registerDate(@RequestBody RegisterDateRequest registerDateRequest){
        int studentId = registerDateRequest.getStudentId();
        List<Integer> classIds = registerDateRequest.getClassIds();

        return classroomService.registerDatesbyStudent(studentId, classIds);
    }


    @GetMapping("/getComeDate")
    public List<ClassEntity> getComeDate(@RequestParam int studentId){
        return classroomService.findByStudentId(studentId);
    }


    @GetMapping("/getOptionalDate")
    public List<ClassEntity> getOptionalDate(@RequestBody OptionalDateRequest optionalDateRequest){
        int studentId = optionalDateRequest.getStudentId();;
        int classroomId = optionalDateRequest.getClassroomId();
        return classroomService.findOptionalDate(studentId, classroomId);
    }


    @PutMapping("/changeDate")
    public int changeDate(@RequestBody ChangeDateRequest changeDateRequest){
        int studentId = changeDateRequest.getStudentId();
        List<Integer> beforeClassIds = changeDateRequest.getBeforeClassIds();
        List<Integer> afterClassIds = changeDateRequest.getAfterClassIds();
        return classroomService.updateDatesByStudentId(studentId, beforeClassIds, afterClassIds);
    }


    @DeleteMapping("/deleteComeDate")
    public int deleteComeDate(@RequestBody DeleteDateRequest deleteDateRequest){
        int studentId = deleteDateRequest.getStudentId();
        List<Integer> deleteClassIds = deleteDateRequest.getDeleteClassIds();
        return classroomService.deleteDatesByStudentId(studentId, deleteClassIds);
    }

}
