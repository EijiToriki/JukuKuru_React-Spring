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


    // Todo : クエリの組み立てが分かりにくい：プレースホルダ使ったやり方
    @Override
    public int registerDatesByStudentId(int studentId, List<Integer> classIds){
        String query = """
                    INSERT INTO class_management(class_id, student_id)
                    VALUES
                    """;
        for(int i=0; i < classIds.size()-1; i++) {
            query += "(" + classIds.get(i) + ", " + studentId + "), ";
        }
        query += "(" + classIds.get(classIds.size()-1) + ", " + studentId + "); ";

        return judgeQuery(query);
    }

    @Override
    public int deleteDatesByStudentId(int studentId, List<Integer> deleteClassIds){
        String query = """
                    DELETE FROM class_management
                    WHERE (class_id = 
                """;

        for(Integer classId : deleteClassIds){
            query += (classId + " OR class_id = ");
        }
        query += " 0) AND student_id =  " + studentId + ";";

        return judgeQuery(query);
    }

    @Override
    public int updateDatesByStudentId(
        int studentId,
        List<Integer> beforeClassIds,
        List<Integer> afterClassIds
    ){
        String query = """
                UPDATE class_management SET
                class_id = CASE class_id
                """;
        for(int i=0; i < beforeClassIds.size(); i++){
            query += ("WHEN " + beforeClassIds.get(i) + " THEN " + afterClassIds.get(i) +"\n");
        }
        query += "END\nWHERE class_id IN (";

        for(int i=0; i < beforeClassIds.size()-1; i++){
            query += (beforeClassIds.get(i) + ", ");
        }
        query += (beforeClassIds.get(beforeClassIds.size()-1) + ") AND student_id = " + studentId + ";");

        return judgeQuery(query);
    }


    public int judgeQuery(String query){
        int result = jdbcTemplate.update(query);
        if(result >= 1){
            return 0;
        }else{
            return 9;
        }
    }

    @Override
    public void updateRegisterFlag(int studentId){
        String query = """
                UPDATE student SET
                register_flag = 1
                WHERE id = 
                """ + studentId;
        jdbcTemplate.update(query);
    }


}
