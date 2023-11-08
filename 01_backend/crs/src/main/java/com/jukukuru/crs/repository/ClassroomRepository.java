package com.jukukuru.crs.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ClassroomRepository {

    List<Map<String, Object>> findByClassroomId(int classroomId);

    int registerDatesByStudentId(int studentId, List<Integer> classIds);

    List<Map<String, Object>> findByStudentId(int studentId);

    List<Map<String, Object>> findOptionalDate(int studentId, int classroomId);

    int updateDatesByStudentId(int studentId, List<Integer> beforeClassIds, List<Integer> afterClassIds);

    int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds);
}
