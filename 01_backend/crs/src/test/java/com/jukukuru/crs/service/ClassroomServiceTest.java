package com.jukukuru.crs.service;

import com.jukukuru.crs.entity.ClassEntity;
import org.junit.jupiter.api.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class ClassroomServiceTest {
    @Test
    public void generateClassEntityListTest(){
        final ClassroomService classroomService;

        List<Map<String, Object>> queryResult = new ArrayList<Map<String, Object>>(
                Arrays.asList(
                       new HashMap<String, Object>(){
                           {
                               put("id", 1);
                               put("class_date", "2023-12-26");
                               put("class_time", 1);
                               put("classroom_id", 1);
                               put("class_id", 1);
                               put("student_id", 1);
                           }
                       },
                        new HashMap<String, Object>(){
                            {
                                put("id", 2);
                                put("class_date", "2023-12-26");
                                put("class_time", 2);
                                put("classroom_id", 1);
                                put("class_id", 2);
                                put("student_id", 1);
                            }
                        }
                )
        );

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        List<ClassEntity> expected = new ArrayList<ClassEntity>();

        try{
            Date date1 = df.parse("2023-12-26");
            expected.add(new ClassEntity(1, date1,1));
            Date date2 = df.parse("2023-12-26");
            expected.add(new ClassEntity(2, date2,2));
        }catch (ParseException e){
            fail();
        }

        List<ClassEntity> actual = classroomService.generateClassEntityList(queryResult);

        assertEquals(expected, actual);

    }
}
