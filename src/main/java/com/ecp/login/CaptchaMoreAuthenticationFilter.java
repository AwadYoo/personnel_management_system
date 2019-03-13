package com.ecp.login;

import com.ecp.mode.VerifyCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;

public class CaptchaMoreAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        String verifyCode = request.getParameter("verifyCode");

        if (StringUtils.isEmpty(verifyCode)) {
            throw new CaptchException("验证码不能为空");
        }

        HttpSession session = request.getSession(false);

        Object identifyingCodes = null;
        if (session != null) {
            identifyingCodes = session.getAttribute("identifyingCode");
        }

        if (identifyingCodes == null) {
            throw new CaptchException("验证码已过期");
        }

        VerifyCode identifyingCode = (VerifyCode) identifyingCodes;
        if(LocalDateTime.now().isAfter(identifyingCode.time.plusMinutes(15))){
            String username = obtainUsername(request);
            throw new CaptchException(username + " 验证码已过期");
        }
        if(!verifyCode.equalsIgnoreCase(identifyingCode.code)){
            String username = obtainUsername(request);
            throw new CaptchException(username + " 验证码错误");
        }
        return super.attemptAuthentication(request, response);

    }
}
