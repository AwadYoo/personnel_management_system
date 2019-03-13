package com.ecp.controller;

import com.alibaba.fastjson.JSONObject;
import com.ecp.entity.User;
import com.ecp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Autowired
    UserRepo userRepo;

    @GetMapping("/")
    public String hello() {
        return "hello";
    }

//    @GetMapping("/db")
//    public Object db() {
//        User user = new User();
//        user.setUserName("yhy");
//        user.setDeptId(12L);
//        user.setEmail("123@555.com");
//        user.setPhone(63652);
////        repo.save(user);
//        return userRepo.save(user);
//    }
}
