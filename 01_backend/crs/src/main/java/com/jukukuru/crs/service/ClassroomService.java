package com.jukukuru.crs.service;

import com.jukukuru.crs.entity.ClassEntity;
import com.jukukuru.crs.entity.StudentEntity;
import com.jukukuru.crs.repository.ClassroomRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClassroomService {

    public final ClassroomRepositoryImpl classroomRepository;

    public StudentEntity findByIdPassword(String login_id, String password){
        List<Map<String, Object>> queryResult = classroomRepository.findByIdPassword(login_id, password);

        if(queryResult.size() == 1){
            Map<String, Object> studentInfo = queryResult.get(0);
            StudentEntity studentEntity = new StudentEntity(
                    (int) studentInfo.get("id"),
                    (int) studentInfo.get("teacher_id"),
                    (int) studentInfo.get("classroom_id"),
                    (String) studentInfo.get("name")
            );
            return studentEntity;
        }else{
            return null;
        }
    }

    public List<ClassEntity> findByClassroomId(int classroomId){
        List<Map<String, Object>> queryResult = classroomRepository.findByClassroomId(classroomId);
        return generateClassEntityList(queryResult);
    }


    @Transactional
    public int registerDatesbyStudent(int studentId, List<Integer> classIds){
        return classroomRepository.registerDatesByStudentId(studentId, classIds);
    }


    public List<ClassEntity> findByStudentId(int studentId){
        List<Map<String, Object>> queryResult = classroomRepository.findByStudentId(studentId);
        return generateClassEntityList(queryResult);
    }


    public List<ClassEntity> findOptionalDate(int studentId, int classroomId){
        List<Map<String, Object>> queryResult = classroomRepository.findOptionalDate(studentId, classroomId);
        return generateClassEntityList(queryResult);
    }


    @Transactional
    public int updateDatesByStudentId(int studentId, List<Integer> beforeClassIds, List<Integer> afterClassIds){
        return classroomRepository.updateDatesByStudentId(studentId, beforeClassIds, afterClassIds);
    }

    @Transactional
    public int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds){
        return classroomRepository.deleteDatesByStudentId(studentId, deleteClassIds);
    }


    // ClassEntity(id, 日付, コマID)を要素とするリストを生成
    private List<ClassEntity> generateClassEntityList(List<Map<String, Object>> queryResult){
        List<ClassEntity> result = new ArrayList<ClassEntity>();
        for(Map<String, Object> row : queryResult) {
            // Todo : 絶対この方法は良くないので、リファクタしたい
            ClassEntity classEntity = new ClassEntity(
                    (int) row.get("id"),
                    (Date) row.get("class_date"),
                    (int) row.get("class_time")
            );
            result.add((classEntity));
        }
        return result;
    }

}
