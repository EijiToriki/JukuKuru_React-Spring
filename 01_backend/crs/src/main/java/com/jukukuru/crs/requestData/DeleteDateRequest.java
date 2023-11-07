package com.jukukuru.crs.requestData;

import lombok.Data;

import java.util.List;

@Data
public class DeleteDateRequest {
    private int studentId;
    private List<Integer> deleteClassIds;
}
