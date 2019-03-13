package com.ecp.entity;

import com.ecp.entity.base.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 公告管理实体
 *
 * @author 尤贺雨
 * @create 2019-03-13 13:52
 */

@Data
@Entity
@Table(name = "tb_notice")
public class Notice extends BaseEntity {

    private String title;

    private String content;

}
