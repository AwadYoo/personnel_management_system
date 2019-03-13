package com.ecp.controller;

import com.alibaba.fastjson.JSONObject;
import com.ecp.entity.Dept;
import com.ecp.entity.Notice;
import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import com.ecp.repo.NoticeRepo;
import com.ecp.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 尤贺雨
 * @create 2019-03-13 13:55
 */
@RestController
@RequestMapping("/notice")
public class NoticeController {


    @Autowired
    private NoticeService noticeService;
    @Autowired
    private NoticeRepo noticeRepo;

    @GetMapping("/getNotices")
    public Response getNotices() {
        List list = new ArrayList();
        for (Notice notice : noticeRepo.findAll()) {
            JSONObject object = new JSONObject();
            object.put("id", notice.getId());
            object.put("content", notice.getTitle());
            object.put("detail", notice.getContent());
            list.add(object);
        }
        return new OKResponse(list);
    }

    @GetMapping("/getList")
    public Response getList(int page, int limit, String key) {
        Page<Notice> pages = noticeService.getList(page, limit, key);
        return new OKResponse(pages.getContent(), pages.getTotalElements());
    }

    @PostMapping("/notices")
    public Response addNotices(String content, String title, String memo) {
        try {
            noticeService.saveNotice(content, title, memo);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/notices/{id}")
    public Response deleteNotices(@PathVariable Long id) {
        noticeRepo.deleteById(id);
        return new Response(Response.CODE_OK);
    }


    @PutMapping("/notices/{id}")
    public Response updateNotices(@PathVariable Long id, String content, String title, String memo) {
        try {
            noticeService.updateNotices(id, content, title, memo);
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }


    @PostMapping("/notices/batch")
    public Response deleteNoticeBatch(@RequestParam("id[]") Long[] ids) {
        try {
            for (Long id : ids) {
                noticeRepo.deleteById(id);
            }
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }
}
