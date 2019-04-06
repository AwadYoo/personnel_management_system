package com.ecp.service;

import com.ecp.entity.User;
import com.ecp.mode.Response;
import com.ecp.mode.dto.UserDTO;

/**
 * @author 于婉
 * @create 2019-02-26 13:40
 */
public interface UserService {
    void saveUser(String loginId, String name, String email, String sex, String status, String note,Long phone,String job,Long deptId, Integer role);

    Response<UserDTO> getAll(int page, int limit, String key);

    void updateState(Long id, String action);

    void updateUser(Long id, String loginId, String name, String email, String sex, String status, String note,Long phone, String job, Long deptId, Integer role);

    String getLastLoginTime();

    boolean unlockScreen(String password);

    Long getUserCount();

    void registered(String loginId, String name, String email, String sex, String status, String note, Long phone, String job, Long deptId);

    void reviewUser(Long id, String action);

    Response<UserDTO> reviews(int page, int limit, String key);
}
