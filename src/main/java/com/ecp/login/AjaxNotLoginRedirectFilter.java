package com.ecp.login;


import com.ecp.common.Constants;
import com.ecp.mode.SessionExpiredResponse;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class AjaxNotLoginRedirectFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        boolean ajaxRequestReceived = false;
        HttpServletRequest httpRequest = null;

        if (request instanceof HttpServletRequest) {
            httpRequest = (HttpServletRequest) request;
            if(httpRequest.getRequestURI().startsWith("/login")){
                chain.doFilter(request, response);
                return;
            }
            ajaxRequestReceived = "XMLHttpRequest".equals(httpRequest.getHeader("X-Requested-With"));
        }

        if (ajaxRequestReceived) {
            if (hasSessionExpired(httpRequest)) {
                SessionExpiredResponse res = new SessionExpiredResponse();
                res.setCode(601);
                res.setReason("session expired");
                performRedirect(httpRequest, response, res);
            } else if (notLogin(httpRequest)) {
                SessionExpiredResponse res = new SessionExpiredResponse();
                res.setCode(600);
                res.setReason("not login");
                performRedirect(httpRequest, response, res);
            } else {
                chain.doFilter(request, response);
            }
        } else {
            chain.doFilter(request, response);
        }

    }

    private boolean hasSessionExpired(HttpServletRequest httpRequest) {
        if (httpRequest.getRequestedSessionId() != null
                && !httpRequest.isRequestedSessionIdValid()) {
            return true;
        }
        return false;
    }

    private boolean notLogin(HttpServletRequest httpRequest) {
        return (httpRequest.getSession().getAttribute(Constants.SESSION_USER_ID) == null);
    }

    private void performRedirect(HttpServletRequest request,
                                 ServletResponse response, SessionExpiredResponse sessionEx) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(Constants.mapper.writeValueAsString(sessionEx));
    }
}
