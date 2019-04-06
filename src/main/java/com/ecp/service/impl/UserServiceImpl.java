package com.ecp.service.impl;

import com.ecp.common.Constants;
import com.ecp.common.util.DateUtils;
import com.ecp.entity.User;
import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import com.ecp.mode.dto.UserDTO;
import com.ecp.repo.UserRepo;
import com.ecp.service.CurrentUser;
import com.ecp.service.UserService;
import com.sun.xml.internal.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * @author 于婉
 * @create 2019-02-26 13:41
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CurrentUser currentUser;

    @Override
    public void saveUser(String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId, Integer role) {
        User user = new User();
        user.setLoginId(loginId);
        user.setUserName(name);
        user.setEmail(email);
        user.setGender(User.getShortSex(sex));
        user.setMemo(note);
        user.setCreateUser(currentUser.user().getUserName());
        user.setPassword(passwordEncoder.encode(Constants.PARAMETER_USER_DEFAULT_PASSWORD));
        user.setCreateTime(LocalDateTime.now());
        user.setEnabled(User.getBooleanState(status));
        user.setJob(job);
        user.setPhone(phone);
        user.setRole(role);
        user.setDeptId(deptId);
        user.setChecked(1);
        userRepo.save(user);
    }

    @Override
    public Response<UserDTO> getAll(int page, int limit, String key) {

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<UserDTO> pageUser;
        if (key == null) {
            pageUser = userRepo.findAll(pageable).map(user -> new UserDTO(user));
        } else {
            key = "%" + key + "%";
            pageUser = userRepo.findInKey(key, pageable).map(user -> new UserDTO(user));
        }
        return new OKResponse<>(pageUser.getContent(), pageUser.getTotalElements());
    }

    @Override
    public void updateState(Long id, String action) {
        userRepo.updateState(id, "enable".equals(action));
    }

    @Override
    public void updateUser(Long id, String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId, Integer role) {
        userRepo.findById(id).ifPresent(user -> {
            user.setLoginId(loginId);
            user.setUserName(name);
            user.setEmail(email);
            user.setGender(User.getShortSex(sex));
            user.setEnabled(User.getBooleanState(status));
            user.setMemo(note);
            user.setUpdateUser(currentUser.user().getUserName());
            user.setUpdateTime(LocalDateTime.now());
            user.setJob(job);
            user.setPhone(phone);
            user.setRole(role);
            user.setDeptId(deptId);
            userRepo.save(user);
        });
    }

    @Override
    public String getLastLoginTime() {
        return DateUtils.yyyymmddhhmiss.format(currentUser.getLastLoginTime());
    }

    @Override
    public boolean unlockScreen(String password) {
        return passwordEncoder.matches(password, currentUser.user().getPassword());
    }

    @Override
    public Long getUserCount() {
        return userRepo.count();
    }

    @Override
    public void registered(String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId) {
        User user = new User();
        user.setUserName(name);
        user.setLoginId(loginId);
        user.setGender(User.getShortSex(sex));
        user.setEmail(email);
        user.setCreateUser("系统临时创建");
        user.setMemo(note);
        user.setCreateTime(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(Constants.PARAMETER_USER_DEFAULT_PASSWORD));
        user.setJob(job);
        user.setEnabled(false);
        user.setPhone(phone);
        user.setDeptId(deptId);
        user.setChecked(0);
        user.setRole(1);
        userRepo.save(user);
    }

    @Override
    public void reviewUser(Long id, String action) {
        User user = userRepo.findById(id).get();
        user.setUpdateUser(currentUser.userName());
        user.setUpdateTime(LocalDateTime.now());
        user.setChecked(1);
        user.setEnabled(true);
        user.setRole(1);
        userRepo.save(user);
    }

    @Override
    public Response<UserDTO> reviews(int page, int limit, String key) {
        Page<UserDTO> pageUser;
        Pageable pageable = PageRequest.of(page - 1, limit);
        if (key == null) {
            pageUser = userRepo.findAllReviews(pageable).map(user -> new UserDTO(user));
        } else {
            key = "%" + key + "%";
            pageUser = userRepo.findInKeyReviews(key, pageable).map(user -> new UserDTO(user));
        }
        return new OKResponse<>(pageUser.getContent(), pageUser.getTotalElements());
    }
}
