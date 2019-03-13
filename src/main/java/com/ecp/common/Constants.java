package com.ecp.common;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 常量接口
 *
 * @author 尤贺雨
 * @create 2019-02-25 11:09
 */

public interface Constants {
    /**
     * 用户相关
     */
    String SESSION_USER_ID = "user_in_session";

    String SESSION_ROLE_ID = "role_in_session";

    String SESSION_CURRENT_SITE_ID = "current_site_in_session";

    String SESSION_USER_NAME = "user_name_in_session";

    String SESSION_LAST_LOGIN_TIME = "last_login_time_session";

    String PARAMETER_USER_DEFAULT_PASSWORD = "123456";

    String PARAMETER_USER_DEFAULT_NONLOCKED = "user.defaultnonlocked";

    ObjectMapper mapper = new ObjectMapper();
}
