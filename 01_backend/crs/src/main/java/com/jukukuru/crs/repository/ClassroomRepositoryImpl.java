package com.jukukuru.crs.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ClassroomRepositoryImpl implements ClassroomRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List findByClassroomId(int classroomId) {
        String sql = "" +
                "SELECT " +
                    "* " +
                "FROM " +
                    "classes as c " +
                "inner join " +
                    "classroom as cr " +
                "on " +
                    "cr.id = c.classroom_id " +
                "where c.classroom_id = " + classroomId + ";";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

        return result;
    }
}
