package com.ecp.common;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * 文件操作工具类
 * @author sunddylee
 * @date 2016年12月20日
 *
 */
public class FileUtil {

    /**
     * NIO way
     * 读取excel文件
     * @param filePath
     * @throws Exception
     */
    public static byte[] readExcelFiletoByteArray(String filePath) throws Exception {
        File f = new File(filePath);
        if (!f.exists()) {
            throw new FileNotFoundException(filePath);
        }

        FileChannel channel = null;
        FileInputStream fs = null;
        try {
            fs = new FileInputStream(f);
            channel = fs.getChannel();
            ByteBuffer byteBuffer = ByteBuffer.allocate((int) channel.size());
            while ((channel.read(byteBuffer)) > 0) {
                // do nothing
                // System.out.println("reading");
            }
            return byteBuffer.array();
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        } finally {
            try {
                channel.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                fs.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 下载excel文件
     * @param response
     * @param filePath
     * @param fileName：带有后缀名的文件名 例如 a.xls
     * @throws Exception
     */
    public static void downloadExcelFile(HttpServletResponse response, String filePath, String fileName) throws Exception {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            // 设置response参数，可以打开下载页面
            response.reset();
            response.setContentType("application/vnd.ms-excel;charset=utf-8");
            response.setHeader("Content-Disposition", "attachment;filename="
                    + new String((fileName).getBytes(), "iso-8859-1"));
            ServletOutputStream out = response.getOutputStream();

            bis = new BufferedInputStream(new FileInputStream(filePath));
            bos = new BufferedOutputStream(out);

            byte[] buff = new byte[2048];
            int bytesRead;
            // Simple read/write loop.
            while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
                bos.write(buff, 0, bytesRead);
            }
        } catch (IOException e) {
            throw e;
        } finally {
            if (bis != null)
                bis.close();
            if (bos != null)
                bos.close();
        }
    }

    public static void downloadExcelFile(HttpServletResponse response, String fileName, byte[] fileContent) throws Exception {
        BufferedOutputStream bos = null;
        try {
            // 设置response参数，可以打开下载页面
            response.reset();
            response.setContentType("application/vnd.ms-excel;charset=utf-8");
            response.setHeader("Content-Disposition", "attachment;filename="
                    + new String((fileName).getBytes(), "iso-8859-1"));
            ServletOutputStream out = response.getOutputStream();
            bos = new BufferedOutputStream(out);
            if(null != fileContent){
                bos.write(fileContent);
            }

        } catch (IOException e) {
            throw e;
        } finally {
            if (bos != null)
                bos.close();
        }
    }

    /**
     * 将文件转成base64 字符串
     * @return  *
     * @throws Exception
     */
    public static String encodeBase64File(String path) throws Exception {
        File file = new File(path);
        FileInputStream inputFile = new FileInputStream(file);
        byte[] buffer = new byte[(int) file.length()];
        inputFile.read(buffer);
        inputFile.close();
        return new BASE64Encoder().encode(buffer);
    }


    public static String encodeBase64File(MultipartFile file) throws Exception {
        return new BASE64Encoder().encode(file.getBytes());
    }

    public static byte[] decoderBase64File(String base64Code) throws Exception {
        return new BASE64Decoder().decodeBuffer(base64Code);
    }


    /**
     * 将base64字符解码保存文件
     * @param base64Code
     * @param targetPath
     * @throws Exception
     */
    public static void decoderBase64File(String base64Code, String targetPath)
            throws Exception {
        byte[] buffer = new BASE64Decoder().decodeBuffer(base64Code);
        FileOutputStream out = new FileOutputStream(targetPath);
        out.write(buffer);
        out.close();
    }

    /**
     * 将base64字符保存文本文件
     * @param base64Code
     * @param targetPath
     * @throws Exception
     */

    public static void toFile(String base64Code, String targetPath)
            throws Exception {
        byte[] buffer = base64Code.getBytes();
        FileOutputStream out = new FileOutputStream(targetPath);
        out.write(buffer);
        out.close();
    }

    public static void main(String[] args) {
        try {
            String base64Code = encodeBase64File("E:\\test\\test1.xls");
            System.out.println(base64Code);
            decoderBase64File(base64Code, "E:\\test\\test.xls");
//      toFile(base64Code, "D:\\three.txt");
        } catch (Exception e) {
            e.printStackTrace();

        }

    }
}
