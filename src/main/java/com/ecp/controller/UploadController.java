package com.ecp.controller;

import com.ecp.common.FileUtil;
import com.ecp.entity.Upload;
import com.ecp.mode.OKResponse;
import com.ecp.mode.Response;
import com.ecp.repo.UploadRepo;
import com.ecp.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;


@RestController
@RequestMapping("/doc")
public class UploadController {

    @Autowired
    private UploadRepo uploadRepo;
    @Autowired
    private UploadService uploadService;

    @RequestMapping("/upload")
    public Response upLoad(MultipartFile file, HttpServletRequest request) {
        try {
            Upload upload = new Upload();

            String s = FileUtil.encodeBase64File(file);
            upload.setContent(s);
            upload.setName(file.getOriginalFilename());
            upload.setSuffix(file.getContentType());
            upload.setSize(file.getSize() / 1_000d);
            uploadRepo.save(upload);
            return new OKResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Response.CODE_COMMON_ERROR);
        }
    }


    @GetMapping("/getList")
    public Response getList(int page, int limit, String key) {
        Page<Upload> docPage = uploadService.getList(page, limit, key);
        return new OKResponse(docPage.getContent(), docPage.getTotalElements());
    }


    @DeleteMapping("/docs/{id}")
    public Response deleteDocs(@PathVariable Long id) {
        uploadRepo.deleteById(id);
        return new Response(Response.CODE_OK);
    }

    @GetMapping("/download/{id}")
    public void download(@PathVariable Long id, HttpServletResponse response) {
        Optional<Upload> optional = uploadRepo.findById(id);
        if (!optional.isPresent()) {
            return;
        }
        Upload upload = optional.get();
        try {
            byte[] bytes = FileUtil.decoderBase64File(upload.getContent());

            //设置文件下载头
            response.addHeader("Content-Disposition", "attachment;filename=" + upload.getName());
            //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
            response.setContentType("multipart/form-data");

            ServletOutputStream out = response.getOutputStream();
            out.write(bytes);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @PostMapping("/docs/batch")
    public Response deleteDocBatch(@RequestParam("id[]") Long[] ids) {
        try {
            for (Long id : ids) {
                uploadRepo.deleteById(id);
            }
            return new Response(Response.CODE_OK);
        } catch (Exception e) {
            return new Response(Response.CODE_COMMON_ERROR, e.getMessage());
        }
    }
}
