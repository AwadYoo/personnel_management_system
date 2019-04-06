package com.ecp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.HttpPutFormContentFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/temp").setViewName("temp");
        registry.addViewController("/main").setViewName("main");
        registry.addViewController("/error").setViewName("error");
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/registered").setViewName("registered");
        registry.addViewController("/admin/userAdd").setViewName("admin/userAdd");
        registry.addViewController("/admin/userList").setViewName("admin/userList");
        registry.addViewController("/admin/userInfo").setViewName("admin/userInfo");
        registry.addViewController("/admin/userInfoTemp").setViewName("admin/userInfoTemp");
        registry.addViewController("/admin/docListTemp").setViewName("admin/docListTemp");
        registry.addViewController("/admin/changePwd").setViewName("admin/changePwd");
        registry.addViewController("/admin/review").setViewName("admin/review");

        registry.addViewController("/admin/deptList").setViewName("admin/deptList");
        registry.addViewController("/admin/deptAdd").setViewName("admin/deptAdd");
        registry.addViewController("/admin/docList").setViewName("admin/docList");
        registry.addViewController("/admin/docAdd").setViewName("admin/docAdd");
        registry.addViewController("/admin/noticeList").setViewName("admin/noticeList");
        registry.addViewController("/admin/noticeAdd").setViewName("admin/noticeAdd");

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/public/**").addResourceLocations("file:./static/", "classpath:/static/");
        registry.addResourceHandler("/face/**").addResourceLocations("file:face/");
    }

    @Bean
    public HttpPutFormContentFilter httpPutFormContentFilter() {
        return new HttpPutFormContentFilter();
    }

}
