package com.jukukuru.crs.requestData;

import lombok.Data;

import java.util.List;

@Data
public class ChangeDateRequest {
    private int studentId;
    private List<Integer> beforeClassIds;
    private List<Integer> afterClassIds;
}
