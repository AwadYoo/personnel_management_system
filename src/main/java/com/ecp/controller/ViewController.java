package com.ecp.controller;

import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

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
