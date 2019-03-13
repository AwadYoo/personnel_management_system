package com.ecp.login;

import com.ecp.common.Constants;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component("webLogoutHandler")
public class WebLogoutHandler implements LogoutHandler {

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        HttpSession session = request.getSession();
        //session.removeAttribute(Constants.SESSION_ROLE_ID);
        //session.removeAttribute(Constants.SESSION_USER_ID);
    }

}
