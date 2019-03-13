package com.ecp.service;

import com.ecp.entity.Notice;
import org.springframework.data.domain.Page;

public interface NoticeService {
    Page<Notice> getList(int page, int limit, String key);

    void saveNotice(String content, String title, String memo);

    void updateNotices(Long id, String content, String title, String memo);
}
