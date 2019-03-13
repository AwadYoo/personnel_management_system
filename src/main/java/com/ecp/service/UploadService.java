package com.ecp.service;

import com.ecp.entity.Dept;
import com.ecp.entity.Upload;
import org.springframework.data.domain.Page;

public interface UploadService {
    Page<Upload> getList(int page, int limit, String key);
}
