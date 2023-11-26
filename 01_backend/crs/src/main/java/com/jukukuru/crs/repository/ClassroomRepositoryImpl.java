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
    public List<Map<String, Object>> findByIdPassword(String login_id, String password){
        String sql = "" +
                "SELECT " + "* " + "FROM " + "student " +
                "WHERE login_id = '" + login_id + "' AND password = '" + password + "';";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

        return result;
    }

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
    public List<Map<String, Object>> findOptionalDate(int studentId, int classroomId){
        String sqlAll = "" +
                "SELECT " +
                "c.id, c.class_date, c.class_time " +
                "FROM " +
                "classes as c " +
                "inner join " +
                "classroom as cr " +
                "on " +
                "cr.id = c.classroom_id " +
                "where c.classroom_id = " + classroomId;
        String sqlStudent = "" +
                "SELECT " +
                "c.id, c.class_date, c.class_time " +
                "FROM " +
                "classes as c " +
                "inner join " +
                "class_management as cm " +
                "on " +
                "c.id = cm.class_id " +
                "where cm.student_id = " + studentId;
        String sql = sqlAll + " EXCEPT " + sqlStudent + ";";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        return result;
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
    public int registerDatesByStudentId(int studentId, List<Integer> classIds){
        String query = """
                    INSERT INTO class_management(class_id, student_id)
                    VALUES(?, ?)
                    """;
        return executeInsertOrDeleteQuery(query, classIds, studentId);
    }


    @Override
    public int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds){
//        String query = """
//                DELETE FROM class_management
//                WHERE class_id = ? AND student_id = ?;
//                """;
        String query = """
                    DELETE FROM class_management
                    WHERE (class_id = 
                """;

        for(Integer classId : deleteClassIds){
            query += (classId + " OR class_id = ");
        }
        query += " 0) AND student_id =  " + studentId + ";";

        int result = jdbcTemplate.update(query);
        if(result >= 1){
            return 0;
        }else{
            return 9;
        }

//        return executeInsertOrDeleteQuery(query, deleteClassIds, studentId);
    }


    private int executeInsertOrDeleteQuery(String query, List<Integer> classIds, int studentId){
        for(Integer classId : classIds) {
            int result = jdbcTemplate.update(query, classId, studentId);
            // 1行の更新でない場合、異常終了
            if(result != 1){
                return 9;
            }
        }
        return 0;
    }


    @Override
    public int updateDatesByStudentId(
        int studentId,
        List<Integer> beforeClassIds,
        List<Integer> afterClassIds
    ){
        String query = """
                UPDATE class_management SET class_id = ?
                WHERE class_id = ? AND student_id = ?;
                """;
        return executeUpdateQuery(query, studentId, beforeClassIds, afterClassIds);
    }


    public int executeUpdateQuery(
        String query,
        int studentId,
        List<Integer> beforeClassIds,
        List<Integer> afterClassIds
    ){
        for(int i=0; i<beforeClassIds.size(); i++) {
            Integer beforeClassId = beforeClassIds.get(i);
            Integer afterClassId = afterClassIds.get(i);
            int result = jdbcTemplate.update(query, afterClassId, beforeClassId, studentId);
            // 1行の更新でない場合、異常終了
            if(result != 1){
                return 9;
            }
        }
        return 0;

    }

}
