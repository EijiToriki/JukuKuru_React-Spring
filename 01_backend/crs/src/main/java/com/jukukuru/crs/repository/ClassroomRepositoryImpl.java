package com.jukukuru.crs.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@Repository
public class ClassroomRepositoryImpl implements ClassroomRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findByIdPassword(String login_id, String password){
        String sql = "SELECT * FROM student WHERE login_id = ? AND password = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, login_id, password);

        return result;
    }

    @Override
    public List findByClassroomId(int classroomId) {
        String sql = "SELECT * FROM classes AS c " +
                     "INNER JOIN classroom AS cr ON cr.id = c.classroom_id " +
                     "WHERE c.classroom_id = ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, classroomId);

        return result;
    }


    @Override
    public List<Map<String, Object>> findOptionalDate(int studentId, int classroomId){
        String sqlAll = "SELECT c.id, c.class_date, c.class_time " +
                        "FROM classes AS c " +
                        "INNER JOIN classroom AS cr ON cr.id = c.classroom_id " +
                        "WHERE c.classroom_id = ?";

        String sqlStudent = "SELECT c.id, c.class_date, c.class_time " +
                            "FROM classes AS c " +
                            "INNER JOIN class_management AS cm ON c.id = cm.class_id " +
                            "WHERE cm.student_id = ?";

        String sql = sqlAll + " EXCEPT " + sqlStudent;

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, classroomId, studentId);
        return result;
    }


    @Override
    public List<Map<String, Object>> findByStudentId(int studentId){
        String sql = "SELECT * " +
                     "FROM classes AS c " +
                     "INNER JOIN class_management AS cm ON c.id = cm.class_id " +
                     "WHERE cm.student_id = ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, studentId);
        return result;
    }


    // Todo : クエリの組み立てが分かりにくい：プレースホルダ使ったやり方
    @Override
    public int registerDatesByStudentId(int studentId, List<Integer> classIds) {
        StringBuilder queryBuilder = new StringBuilder("INSERT INTO class_management(class_id, student_id) VALUES ");

        for (int i = 0; i < classIds.size(); i++) {
            queryBuilder.append("(?, ?)");

            if (i < classIds.size() - 1) {
                queryBuilder.append(", ");
            }
        }

        String query = queryBuilder.toString();

        return jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            int parameterIndex = 1;
            for (Integer classId : classIds) {
                preparedStatement.setInt(parameterIndex++, classId);
                preparedStatement.setInt(parameterIndex++, studentId);
            }

            return preparedStatement;
        });
    }

    @Override
    public int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds) {
        StringBuilder queryBuilder = new StringBuilder("DELETE FROM class_management WHERE (class_id IN (");

        for (int i = 0; i < deleteClassIds.size(); i++) {
            queryBuilder.append("?");

            if (i < deleteClassIds.size() - 1) {
                queryBuilder.append(", ");
            }
        }

        queryBuilder.append(") OR class_id = 0) AND student_id = ?");

        String query = queryBuilder.toString();

        return jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            int parameterIndex = 1;
            for (Integer classId : deleteClassIds) {
                preparedStatement.setInt(parameterIndex++, classId);
            }

            preparedStatement.setInt(parameterIndex, studentId);

            return preparedStatement;
        });
    }

    @Override
    public int updateDatesByStudentId(
            int studentId,
            List<Integer> beforeClassIds,
            List<Integer> afterClassIds
    ) {
        StringBuilder queryBuilder = new StringBuilder("UPDATE class_management SET class_id = CASE class_id ");

        for (int i = 0; i < beforeClassIds.size(); i++) {
            queryBuilder.append("WHEN ? THEN ? ");

        }

        queryBuilder.append("END WHERE class_id IN (");

        for (int i = 0; i < beforeClassIds.size(); i++) {
            queryBuilder.append("?");

            if (i < beforeClassIds.size() - 1) {
                queryBuilder.append(", ");
            }
        }

        queryBuilder.append(") AND student_id = ?");

        String query = queryBuilder.toString();

        return jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            int parameterIndex = 1;
            for (int i = 0; i < beforeClassIds.size(); i++) {
                preparedStatement.setInt(parameterIndex++, beforeClassIds.get(i));
                preparedStatement.setInt(parameterIndex++, afterClassIds.get(i));
            }

            for (Integer beforeClassId : beforeClassIds) {
                preparedStatement.setInt(parameterIndex++, beforeClassId);
            }

            preparedStatement.setInt(parameterIndex, studentId);

            return preparedStatement;
        });
    }


//    public int judgeQuery(String query){
//        int result = jdbcTemplate.update(query);
//        if(result >= 1){
//            return 0;
//        }else{
//            return 9;
//        }
//    }

    @Override
    public void updateRegisterFlag(int studentId) {
        String query = "UPDATE student SET register_flag = 1 WHERE id = ?";

        jdbcTemplate.update(query, studentId);
    }


}
