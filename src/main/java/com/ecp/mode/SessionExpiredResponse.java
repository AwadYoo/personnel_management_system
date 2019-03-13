package com.ecp.mode;

import lombok.Data;

import java.io.Serializable;

/**
 * @author 尤贺雨
 * @create 2019-02-25 11:17
 */
@Data
public class SessionExpiredResponse implements Serializable {

    private int code;

    private String reason;

    private String redirectUrl;
}
