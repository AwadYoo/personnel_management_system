package com.ecp;


import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonTest {

    @Test
    public void test(){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format1 = format.format(new Date());
        System.out.println(format1);
    }
}
