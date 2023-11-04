package com.jukukuru.crs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class ClassEntity {
    private long id;
    private Date date;
    private int class_time;
}
