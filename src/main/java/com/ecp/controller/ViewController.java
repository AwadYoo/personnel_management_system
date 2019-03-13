package com.ecp.controller;

import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 视图控制器
 *
 * @author 尤贺雨
 * @create 2019-02-25 14:03
 */
@Controller
public class ViewController {

    @GetMapping("/login")
    public ModelAndView login() {
        ModelAndView mv = new ModelAndView("/login");
        return mv;
    }

    @GetMapping("/logout")
    public ModelAndView logout() {
        ModelAndView mv = new ModelAndView("/logout");
        return mv;
    }


    @GetMapping("/test")
    public ModelAndView main() {
        ModelAndView mv = new ModelAndView("/test");
        return mv;
    }
}
