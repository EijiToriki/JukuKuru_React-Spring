package com.jukukuru.crs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class TeacherEntity {
    private long id;
    private String name;
    private String loginID;
    private String password;
    private List<StudentEntity> students;
}
