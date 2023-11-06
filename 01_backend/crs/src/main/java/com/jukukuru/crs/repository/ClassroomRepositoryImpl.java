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


    @Override
    public int registerDatesByStudentId(int studentId, List<Integer> classIds){
        for(Integer classId : classIds){
            int result = jdbcTemplate.update("""
                    INSERT INTO class_management(class_id, student_id)
                    VALUES(?, ?)
                    """, classId, studentId);
            // 1行の更新でない場合、異常終了
            if(result != 1){
                return 9;
            }
        }
        // 正常終了
        return 0;
    }
}
