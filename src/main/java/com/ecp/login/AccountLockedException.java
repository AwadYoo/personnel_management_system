package com.ecp.login;

import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.core.AuthenticationException;

/**
 * 账户锁定异常
 *
 * @author 尤贺雨
 * @create 2019-02-27 10:24
 */
public class AccountLockedException  extends AuthenticationException {
    public AccountLockedException(String msg) {
        super(msg);
    }

    public AccountLockedException(String msg, Throwable t) {
        super(msg, t);
    }
}
