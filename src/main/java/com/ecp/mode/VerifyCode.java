package com.ecp.mode;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VerifyCode {
    public String code;
    public LocalDateTime time;

    public VerifyCode(String code) {
        this.code = code;
        this.time = LocalDateTime.now();
    }
}
