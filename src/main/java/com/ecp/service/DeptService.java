package com.ecp.service;

import com.ecp.entity.Dept;
import org.springframework.data.domain.Page;

public interface DeptService {
    Page<Dept> getList(int page, int limit, String key);

    void saveDept(String code, String name, String leader, String memo);

    void updateDept(Long id, String code, String name, String leader);
}
