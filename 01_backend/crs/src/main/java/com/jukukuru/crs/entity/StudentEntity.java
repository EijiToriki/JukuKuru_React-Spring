package com.jukukuru.crs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class StudentEntity {
    private long id;
    private long teacher_id;
    private long classroom_id;
    private String name;
    private int register_flag;
}
