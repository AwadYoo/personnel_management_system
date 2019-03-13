package com.ecp.login;

import org.springframework.security.core.AuthenticationException;

public class PasswordNotMatchException extends AuthenticationException {


    public PasswordNotMatchException(String msg) {
        super(msg);
    }

    public PasswordNotMatchException(String msg, Throwable t) {
        super(msg, t);
    }

}
