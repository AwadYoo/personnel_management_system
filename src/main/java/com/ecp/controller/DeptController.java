package com.ecp.controller;

import com.alibaba.fastjson.JSONObject;
import com.ecp.entity.Dept;
import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import com.ecp.repo.DeptRepo;
import com.ecp.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 尤贺雨
 * @create 2019-02-27 11:44
 */
@RestController
@RequestMapping("/dept")
public class DeptController {

    @Autowired
    private DeptService deptService;
    @Autowired
    private DeptRepo deptRepo;

    @GetMapping("/getDept")
    public Response getDept() {
        List list = new ArrayList();
        for (Dept dept : deptRepo.findAll()) {
            JSONObject object = new JSONObject();
            object.put("id", dept.getId());
            object.put("name", dept.getName());
            list.add(object);
        }
        return new OKResponse(list);
    }

    @GetMapping("/getList")
    public Response getList(int page, int limit, String key) {
        Page<Dept> deptPage = deptService.getList(page, limit, key);
        return new OKResponse(deptPage.getContent(), deptPage.getTotalElements());
    }

    @PostMapping("/depts")
    public Response addDepts(String code, String name, String leader, String memo) {
        try {
            deptService.saveDept(code, name, leader, memo);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/depts/{id}")
    public Response deleteDepts(@PathVariable Long id) {
        deptRepo.deleteById(id);
        return new Response(Response.CODE_OK);
    }


    @PutMapping("/depts/{id}")
    public Response updateDepts(@PathVariable Long id, String code, String name, String leader) {
        try {
            deptService.updateDept(id, code, name, leader);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }


    @PostMapping("/depts/batch")
    public Response deleteDeptBatch(@RequestParam("id[]") Long[] ids) {
        try {
            for (Long id : ids) {
                deptRepo.deleteById(id);
            }
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }
}
