package com.ecp.controller;

import com.ecp.entity.User;
import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import com.ecp.mode.dto.UserDTO;
import com.ecp.repo.UserRepo;
import com.ecp.service.CurrentUser;
import com.ecp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户管理
 *
 * @author 于婉
 * @create 2019-02-26 13:39
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CurrentUser currentUser;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public Response<UserDTO> getUser(int page, int limit, String key) {
        return userService.getAll(page, limit, key);
    }

    @PostMapping("/users")
    public Response addUser(String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId) {
        try {
            userService.saveUser(loginId, name, email, sex, status, note, phone, job, deptId);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @PostMapping("/registered")
    public Response registered(String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId) {
        try {
            userService.registered(loginId, name, email, sex, status, note, phone, job, deptId);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public Response deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
        return new Response(Response.CODE_OK);
    }


    @PutMapping("/users/{id}")
    public Response updateUser(@PathVariable Long id, String loginId, String name, String email, String sex,
                               String status, String note, Long phone, String job, Long deptId) {
        try {
            userService.updateUser(id, loginId, name, email, sex, status, note, phone, job, deptId);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @PutMapping("/users/{id}/{action}")
    public Response updateUser(@PathVariable Long id, @PathVariable String action) {
        try {
            userService.updateState(id, action);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @PostMapping("/users/batch")
    public Response deleteUserBatch(@RequestParam("id[]") Long[] ids) {
        try {
            for (Long id : ids) {
                userRepo.deleteById(id);
            }
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @GetMapping("/users/current")
    public UserDTO currentUser() {
        return new UserDTO(currentUser.user());
    }

    @PutMapping("/users/current")
    public Response updateCurrentUser(String name, String sex, Long phone, String birthday, String email) {
        User user = currentUser.user();
        user.setUserName(name);
        user.setGender(User.getShortSex(sex));
        user.setPhone(phone);
        user.setEmail(email);
        try {
            userRepo.save(user);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }


    @GetMapping("/users/count")
    public Map getUserCount() {
        Map map = new HashMap(1);
        map.put("count", userService.getUserCount());
        return map;
    }

    @PostMapping("/screen/unlock")
    public boolean unlock(String password) {
        return userService.unlockScreen(password);
    }

    @GetMapping("/screen/lock")
    public Response lock() {
        return new OKResponse();
    }

    @GetMapping("/lastLoginTime")
    public Map lastLoginTime() {
        Map map = new HashMap(1);
        map.put("lastLoginTime", userService.getLastLoginTime());
        return map;
    }

    @PostMapping("/password/selfChange")
    public Response selfChangePwd(String oldPwd, String newPwd, String confirmPwd) {
        if (newPwd.equals(confirmPwd)) {
            User user = currentUser.user();
            if (passwordEncoder.matches(oldPwd, user.getPassword())) {
                String encodePassword = passwordEncoder.encode(newPwd);
                user.setPassword(encodePassword);
                userRepo.updatePassword(encodePassword, user.getId());
                return new Response(Response.CODE_OK);
            } else {
                return new Response(Response.CODE_COMMON_ERROR, "原密码输入不正确");
            }
        } else {
            return new Response(Response.CODE_COMMON_ERROR, "两次输入的密码不一致");
        }
    }

    @PostMapping("/users/current/face")
    public Response uploadCurrentFace(MultipartFile file, HttpSession session) {
        String fileName = file.getOriginalFilename();
        String post = fileName.substring(fileName.lastIndexOf('.'), fileName.length());
        User user = currentUser.user();
        String fileName2 = user.getLoginId() + post;
        try {
            String realPath = System.getProperty("user.dir");
            File p = new File(realPath + "/face");
            if (!p.exists()) p.mkdirs();
            File f = new File(p, fileName2);
            FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(f));
            user.setFace(fileName2);
            userRepo.save(user);
            Map data = new HashMap();
            data.put("src", fileName2);
            return new Response(Response.CODE_OK, data);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }


}
