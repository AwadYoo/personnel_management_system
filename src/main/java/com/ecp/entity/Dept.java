package com.ecp.entity;

import com.ecp.entity.base.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "tb_dept")
public class Dept extends BaseEntity implements Serializable {

    private String name;

    private String leader;

    private String code;

}
