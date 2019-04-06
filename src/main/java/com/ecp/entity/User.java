package com.ecp.entity;

import com.ecp.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@Entity
@Table(name = "tb_user")
public class User extends BaseEntity implements Serializable {

    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "name")
    private String userName;

    @Column(name = "gender")
    private Short gender;

    @Column(name = "job")
    private String job;

    @Column(name = "dept_id")
    private Long deptId;

    @OneToOne
    @JoinColumn(name = "dept_id", referencedColumnName = "id", insertable = false, updatable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private Dept dept;

    private boolean enabled;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "email")
    private String email;

    @Column(name = "login_id")
    private String loginId;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "last_login_time")
    private LocalDateTime lastLoginTime;
    @Column(name = "face")
    private String face;
    /**
     * 1-admin 0-operator
     */
    @Column(name = "role")
    private Integer role;

    /**
     * 0-未审核  1-审核
     */
    @Column(name = "checked")
    private Integer checked;

    public static Short getShortSex(String sex) {
        if ("男".equals(sex)) return 1;
        if ("女".equals(sex)) return 2;
        if ("保密".equals(sex)) return 3;
        if ("未知".equals(sex)) return 4;
        return -1;
    }

    public boolean IsAdmin() {
        if (null == this.role || this.role == 1) return false;
        return true;
    }

    public static String getStringSex(Short sex) {
        if (sex == 1) return "男";
        if (sex == 2) return "女";
        if (sex == 3) return "保密";
        if (sex == 4) return "未知";
        return "错误数据";
    }

    public static String getStringState(boolean state) {
        return state ? "正常用户" : "限制用户";
    }

    public static boolean getBooleanState(String state) {
        return "正常用户".equals(state);
    }
}


