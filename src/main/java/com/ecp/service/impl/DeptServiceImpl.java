package com.ecp.service.impl;

import com.ecp.entity.Dept;
import com.ecp.mode.OKResponse;
import com.ecp.mode.dto.UserDTO;
import com.ecp.repo.DeptRepo;
import com.ecp.service.CurrentUser;
import com.ecp.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * @author 于琬
 * @create 2019-03-01 9:46
 */
@Service
public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptRepo deptRepo;
    @Autowired
    private CurrentUser currentUser;

    @Override
    public Page<Dept> getList(int page, int limit, String key) {

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Dept> depts;
        if (key == null) {
            depts = deptRepo.findAll(pageable);
        } else {
            key = "%" + key + "%";
            depts = deptRepo.findInKey(key, pageable);
        }
        return depts;
    }

    @Override
    public void saveDept(String code, String name, String leader, String memo) {
        Dept dept = new Dept();
        dept.setCode(code);
        dept.setName(name);
        dept.setLeader(leader);
        dept.setMemo(memo);
        dept.setCreateTime(LocalDateTime.now());
        dept.setCreateUser(currentUser.userName());
        dept.setUpdateTime(LocalDateTime.now());
        dept.setUpdateUser(currentUser.userName());
        deptRepo.save(dept);
    }

    @Override
    public void updateDept(Long id, String code, String name, String leader) {
        Dept dept = deptRepo.findById(id).get();
        dept.setCode(code);
        dept.setName(name);
        dept.setLeader(leader);
        dept.setUpdateTime(LocalDateTime.now());
        dept.setUpdateUser(currentUser.userName());
        deptRepo.save(dept);
    }


}
