package com.ecp.config;


import com.ecp.login.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DBAuthenticationProvider dbAuthenticationProvider;

    @Autowired
    private WebLogoutHandler logoutHandler;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().sameOrigin();
        http.authorizeRequests().antMatchers("/login", "/error", "/verificationCode", "/public/**").permitAll()
                .anyRequest().authenticated().and()
                .addFilterBefore(captchaMoreAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .formLogin().loginPage("/login")

                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login")
                .addLogoutHandler(logoutHandler).permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(dbAuthenticationProvider);
    }

    @Bean
    public CaptchaMoreAuthenticationFilter captchaMoreAuthenticationFilter() throws Exception {
        CaptchaMoreAuthenticationFilter filter = new CaptchaMoreAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(loginSuccessHandler());
        filter.setAuthenticationFailureHandler(loginFailureHandler());
        filter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(("/login"), "POST"));
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }

    @Bean
    public LoginFailureHandler loginFailureHandler() {
        LoginFailureHandler handler = new LoginFailureHandler();
        handler.setFailureUrl("/error");
        return handler;
    }

    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        LoginSuccessHandler handler = new LoginSuccessHandler();
        //handler.setSuccessUrl("/index");
        return handler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8);
    }
}

