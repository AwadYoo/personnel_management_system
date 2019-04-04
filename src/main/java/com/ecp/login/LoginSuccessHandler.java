package com.ecp.login;


import com.ecp.common.Constants;
import com.ecp.entity.User;
import com.ecp.mode.SessionExpiredResponse;
import com.ecp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepo;

//    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        HttpSession session = request.getSession();
        User user = userRepo.findByLoginId(userDetails.getUsername()).get();
        session.setAttribute(Constants.SESSION_USER_ID, user);
        session.setAttribute(Constants.SESSION_USER_NAME, user.getUserName());
        LocalDateTime lastLoginTime = user.getLastLoginTime();
        LocalDateTime now = LocalDateTime.now();
        if (lastLoginTime == null) lastLoginTime = now;

        session.setAttribute(Constants.SESSION_LAST_LOGIN_TIME, lastLoginTime);
        userRepo.updateLastLoginTime(user.getId(), lastLoginTime);
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            response.setContentType("application/json;charset=UTF-8");
            SessionExpiredResponse res = new SessionExpiredResponse();
            res.setCode(200);
            res.setReason("login success");
            response.getWriter().write(Constants.mapper.writeValueAsString(res));
            response.getWriter().write("ajax login success");
        } else {
            getRedirectStrategy().sendRedirect(request, response, user.IsAdmin() ? "/index" : "/temp");
            //super.onAuthenticationSuccess(request, response, authentication);
        }
    }

}
