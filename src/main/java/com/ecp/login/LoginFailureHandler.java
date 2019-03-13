package com.ecp.login;


import com.ecp.mode.SessionExpiredResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.ExceptionMappingAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginFailureHandler extends ExceptionMappingAuthenticationFailureHandler {

    private String failureUrl;

    public void setFailureUrl(String failureUrl) {
        this.failureUrl = failureUrl;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response, AuthenticationException exception)
            throws IOException, ServletException {

        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.removeAttribute(Constants.SESSION_USER_NAME);
//            session.removeAttribute(Constants.SESSION_USER_ID);
//            session.removeAttribute(Constants.SESSION_LAST_LOGIN_TIME);
//        }


        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            response.setContentType("application/json;charset=UTF-8");
            SessionExpiredResponse res = new SessionExpiredResponse();
            res.setCode(201);
            res.setReason("login error");
            response.getWriter().write("ajax 失败");
        } else {
            //saveException(request, exception);
            if (session == null) session = request.getSession(true);
            session.setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION,
                    exception);
            if (exception instanceof CaptchException) {
                session.setAttribute("failureReason", exception.getMessage());
            } else if (exception instanceof UsernameNotFoundException) {
                session.setAttribute("failureReason", "用户名或密码错误");
            } else if (exception instanceof AccountLockedException) {
                session.setAttribute("failureReason", "此用户被禁止使用");
            }
//            else if (exception instanceof DisabledException) {
//                session.setAttribute("failureReason", "此用户被禁止使用");
//            } else if (exception instanceof LockedException) {
//                session.setAttribute("failureReason", "此用户被锁定");
//            } else if (exception instanceof AccountExpiredException) {
//                session.setAttribute("failureReason", "此用户已过期");
//            }
            else {
                session.setAttribute("failureReason", exception.getMessage());
            }
            getRedirectStrategy().sendRedirect(request, response, failureUrl);
        }

    }
}
