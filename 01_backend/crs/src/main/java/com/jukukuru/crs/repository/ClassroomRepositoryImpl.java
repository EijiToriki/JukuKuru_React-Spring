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
        String query = """
                    INSERT INTO class_management(class_id, student_id)
                    VALUES(?, ?)
                    """;
        return executeUpdateDeleteQuery(query, classIds, studentId);
    }


    @Override
    public List<Map<String, Object>> findByStudentId(int studentId){
        String sql = "" +
                "SELECT " +
                "* " +
                "FROM " +
                "classes as c " +
                "inner join " +
                "class_management as cm " +
                "on " +
                "c.id = cm.class_id " +
                "where cm.student_id = " + studentId + ";";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        return result;
    }


    @Override
    public int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds){
        String query = """
                DELETE FROM class_management
                WHERE class_id = ? AND student_id = ?;
                """;
        return executeUpdateDeleteQuery(query, deleteClassIds, studentId);
    }


    private int executeUpdateDeleteQuery(String query, List<Integer> classIds, int studentId){
        for(Integer classId : classIds) {
            int result = jdbcTemplate.update(query, classId, studentId);
            // 1行の更新でない場合、異常終了
            if(result != 1){
                return 9;
            }
        }
        return 0;
    }
}
