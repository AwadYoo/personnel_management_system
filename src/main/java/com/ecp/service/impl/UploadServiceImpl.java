package com.ecp.service.impl;

import com.ecp.entity.Dept;
import com.ecp.entity.Upload;
import com.ecp.repo.UploadRepo;
import com.ecp.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UploadServiceImpl implements UploadService {

    @Autowired
    private UploadRepo uploadRepo;
    @Override
    public Page<Upload> getList(int page, int limit, String key) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Upload> vo;
        if (key == null) {
            vo = uploadRepo.findAll(pageable);
        } else {
            key = "%" + key + "%";
            vo = uploadRepo.findInKey(key, pageable);
        }
        return vo;
    }
}
