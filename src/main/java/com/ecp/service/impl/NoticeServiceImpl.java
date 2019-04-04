package com.ecp.service.impl;

import com.ecp.entity.Dept;
import com.ecp.entity.Notice;
import com.ecp.repo.NoticeRepo;
import com.ecp.service.CurrentUser;
import com.ecp.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * @author 于婉
 * @create 2019-03-13 13:57
 */
@Service
public class NoticeServiceImpl implements NoticeService {


    @Autowired
    private NoticeRepo noticeRepo;
    @Autowired
    private CurrentUser currentUser;

    @Override
    public Page<Notice> getList(int page, int limit, String key) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Notice> pages;
        if (key == null) {
            pages = noticeRepo.findAll(pageable);
        } else {
            key = "%" + key + "%";
            pages = noticeRepo.findInKey(key, pageable);
        }
        return pages;
    }

    @Override
    public void saveNotice(String content, String title, String memo) {
        Notice notice = new Notice();
        notice.setContent(content);
        notice.setTitle(title);
        notice.setMemo(memo);
        notice.setCreateTime(LocalDateTime.now());
        notice.setCreateUser(currentUser.userName());
        notice.setUpdateTime(LocalDateTime.now());
        notice.setUpdateUser(currentUser.userName());
        noticeRepo.save(notice);

    }

    @Override
    public void updateNotices(Long id, String content, String title, String memo) {
        Notice notice = noticeRepo.findById(id).get();
        notice.setContent(content);
        notice.setMemo(memo);
        notice.setTitle(title);
        notice.setUpdateTime(LocalDateTime.now());
        notice.setUpdateUser(currentUser.userName());
        noticeRepo.save(notice);

    }
}
