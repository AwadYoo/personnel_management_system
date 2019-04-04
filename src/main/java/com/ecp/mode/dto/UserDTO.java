package com.ecp.mode.dto;

import com.ecp.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

import static com.ecp.common.util.DateUtils.yyyy_mmddhhmiss;

/**
 * @author 于婉
 * @create 2019-02-26 14:55
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO implements Serializable {


    private Long id;
    private String userId;
    private String userName;
    private String userEmail;
    private String userSex;
    private String userStatus;
    //private String userGrade;
    private String lastLoginTime;
    private String userDesc;
    //private String birthday;
    private Long phone;
    private String dept;
    private String job;
    //private String face;

    public UserDTO() {
    }


    public UserDTO(User user) {
        this.id = user.getId();
        this.userId = user.getLoginId();
        this.userName = user.getUserName();
        this.userEmail = user.getEmail();
        this.userSex = User.getStringSex(user.getGender());
        this.userStatus = User.getStringState(user.isEnabled());
        LocalDateTime loginTime = user.getLastLoginTime();
        this.lastLoginTime = loginTime == null ? "" : yyyy_mmddhhmiss.format(loginTime);
        this.userDesc = user.getMemo();
        this.phone = user.getPhone();
        this.job = user.getJob();
        if (user.getDept() != null) {
            this.dept = user.getDept().getName();
        }
        //LocalDate b = user.getBirthday();
        //this.birthday = b == null ? "" : yyyymmdd.format(b);
        //this.mobile = user.getMobile();
        //this.face = user.getFace();
    }

}
