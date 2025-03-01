package org.ls.entity;

import lombok.Data;
import java.util.Date;

@Data
public class Wkt {
    private String tr;
    private String employee;
    private String dep;
    private String tsStatus;
    private Date tsDate;
    private Integer tsHours;
    private String tsBm;
    private String tsName;
    private String zone;
//  private String tsComments;
//  private String projComments;
}
