package com.jukukuru.crs.service;

import com.jukukuru.crs.entity.ClassEntity;
import com.jukukuru.crs.repository.ClassroomRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClassroomService {

    public final ClassroomRepositoryImpl classroomRepository;

    public List<ClassEntity> findByClassroomId(int classroomId){
        List<Map<String, Object>> queryResult = classroomRepository.findByClassroomId(classroomId);

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


    public int registerDatesbyStudent(int studentId, List<Integer> classIds){
        return classroomRepository.registerDatesByStudentId(studentId, classIds);
    }

}
