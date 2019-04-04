package com.ecp.service;

import com.ecp.common.Constants;
import com.ecp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

/**
 * 当前会话（session）下的用户信息
 *
 * @author 于婉
 * @create 2019-02-25 11:07
 */
@Service
public class CurrentUser {

    @Autowired
    private HttpSession session;

    public User user() {
        return (User) session.getAttribute(Constants.SESSION_USER_ID);
    }

    public String userName() {
        return (String) session.getAttribute(Constants.SESSION_USER_NAME);
    }

    public LocalDateTime getLastLoginTime() {
        return (LocalDateTime) session.getAttribute(Constants.SESSION_LAST_LOGIN_TIME);
    }

}
