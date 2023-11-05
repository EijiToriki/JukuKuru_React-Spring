package com.jukukuru.crs.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ClassroomRepository {

    List<Map<String, Object>> findByClassroomId(int classroomId);
}
