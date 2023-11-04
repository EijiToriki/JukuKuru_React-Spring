package com.jukukuru.crs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ClassroomEntity {
    private long id;
    private String name;
    private String address;
    private int capacity;
    private List<StudentEntity> students;
    private List<ClassEntity> classes;
}
