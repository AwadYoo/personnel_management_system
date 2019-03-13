package com.ecp.mode;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response<T> {

    public static final int CODE_OK = 0;

    public static final int CODE_COMMON_ERROR = 1;

    protected int code;
    protected String msg;
    protected T one;
    protected List<T> data;

    protected Long count;

    public Response() {
    }

    public Response(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Response(int code) {
        this.code = code;
    }

    public Response(int code, T data) {
        this.code = code;
        this.one = data;
    }

    public Response(int code, List<T> data) {
        this.code = code;
        this.data = data;
    }

    public Response(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.one = data;
    }

    public Response(int code, String msg, List<T> data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public Response(int code, List<T> data, Long count) {
        this.code = code;
        this.data = data;
        this.count = count;
    }

    public Response(int code, String msg, List<T> data, Long count) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.count = count;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getOne() {
        return one;
    }

    public void setOne(T one) {
        this.one = one;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
