package com.ecp.entity;

import com.ecp.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Table(name = "tb_upload")
@Entity
public class Upload extends BaseEntity {

    private String name;

    private String suffix;

    private Double size;

    @JsonIgnore
    private String content;

}
