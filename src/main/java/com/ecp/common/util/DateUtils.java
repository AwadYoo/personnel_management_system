package com.ecp.common.util;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class DateUtils {

    public static ZoneId defaultZoneId = ZoneId.systemDefault();

    public static final DateTimeFormatter yyyymmddhhmiss = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");

    public static final DateTimeFormatter yyyy_mmddhhmiss = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(defaultZoneId);

    public static final DateTimeFormatter yyyy_mmddhhmi = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
            .withZone(defaultZoneId);

    public static final DateTimeFormatter yyyymmdd = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
}
