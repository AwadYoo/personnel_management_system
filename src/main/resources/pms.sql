/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : pms

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 04/04/2019 15:40:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_dept
-- ----------------------------
DROP TABLE IF EXISTS `tb_dept`;
CREATE TABLE `tb_dept`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `leader` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改者',
  `memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tb_notice
-- ----------------------------
DROP TABLE IF EXISTS `tb_notice`;
CREATE TABLE `tb_notice`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改者',
  `memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_notice
-- ----------------------------
INSERT INTO `tb_notice` VALUES (1, '这是一个测试横幅', '这是一个测试横幅这是一个测试横幅这是一个测试横幅这是一个测试横幅', '2019-03-13 14:52:08', '这是一个测试横幅这是一个测试横幅这是一个测试横幅这是一个测试横幅这是一个测试横幅', '2019-03-13 16:03:14', '尤贺雨', 'test');
INSERT INTO `tb_notice` VALUES (2, '这是横幅2', '这是横幅2这是横幅2这是横幅2这是横幅2这是横幅2', '2019-03-13 16:03:56', '尤贺雨', '2019-03-13 16:03:56', '尤贺雨', '这是横幅2ss');

-- ----------------------------
-- Table structure for tb_upload
-- ----------------------------
DROP TABLE IF EXISTS `tb_upload`;
CREATE TABLE `tb_upload`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `suffix` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '格式',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文件内容',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改者',
  `memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `size` decimal(20, 2) NULL DEFAULT NULL COMMENT '大小',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_upload
-- ----------------------------
INSERT INTO `tb_upload` VALUES (1, 'application.properties', 'application/octet-stream', 'I7bLv9q6xQpzZXJ2ZXIucG9ydD04MDg4CiO808jrxeTWw77Nv8nS1L340NC+ssys18rUtLXEt8PO\r\nygpzcHJpbmcubXZjLnN0YXRpYy1wYXRoLXBhdHRlcm49L3N0YXRpYy8qKgpzcHJpbmcucmVzb3Vy\r\nY2VzLnN0YXRpYy1sb2NhdGlvbnM9Y2xhc3NwYXRoOi9zdGF0aWMKI215c3FsIGRhdGFzb3VyY2UK\r\nI3NwcmluZy5kYXRhc291cmNlLnVybD1qZGJjOm15c3FsOi8vbG9jYWxob3N0OjMzMDYvamV0X3Nu\r\nZF9jeHF5X2FwcGx5X2Rldj91c2VTU0w9ZmFsc2UmcmV3cml0ZUJhdGNoZWRTdGF0ZW1lbnRzPXRy\r\ndWUKc3ByaW5nLmRhdGFzb3VyY2UudXJsPWpkYmM6bXlzcWw6Ly8xOTIuMTY4LjEuMjUwOjMzMDYv\r\namV0X3NuZF9jeHF5X2FwcGx5X2Rldj96ZXJvRGF0ZVRpbWVCZWhhdmlvcj1jb252ZXJ0VG9OdWxs\r\nCnNwcmluZy5kYXRhc291cmNlLnVzZXJuYW1lPXJvb3QKc3ByaW5nLmRhdGFzb3VyY2UucGFzc3dv\r\ncmQ9aG9LbVhaREg4a0Z2S0ViVkNXTktIbzhIQXh0WXV5TnZLV0hXMGx3M2d0bz0KI3NwcmluZy5k\r\nYXRhc291cmNlLnBhc3N3b3JkPVFJT000QzhuMm0yeFUxREtMOEozaXc9PQpzcHJpbmcuZGF0YXNv\r\ndXJjZS5kcml2ZXItY2xhc3MtbmFtZT1jb20ubXlzcWwuamRiYy5Ecml2ZXIKc3ByaW5nLmRhdGFz\r\nb3VyY2UudHlwZT1jb20uYWxpYmFiYS5kcnVpZC5wb29sLkRydWlkRGF0YVNvdXJjZQojbXliYXRp\r\ncwojbXliYXRpcy5tYXBwZXItbG9jYXRpb25zPWNsYXNzcGF0aDpteWJhdGlzL21hcHBlci8qLnht\r\nbAojbXliYXRpcy5jb25maWctbG9jYXRpb249Y2xhc3NwYXRoOm15YmF0aXMvbXliYXRpcy1jb25m\r\naWcueG1sCm15YmF0aXMtcGx1cy5tYXBwZXItbG9jYXRpb25zPWNsYXNzcGF0aDpteWJhdGlzL21h\r\ncHBlci8qLnhtbApteWJhdGlzLXBsdXMudHlwZS1hbGlhc2VzLXBhY2thZ2U9Y29tLmpldC5jbG91\r\nZC5qZXRzbmRjeHF5YXBwbHkuZW50aXR5Cm15YmF0aXMtcGx1cy5jb25maWd1cmF0aW9uLmxvZy1p\r\nbXBsPW9yZy5hcGFjaGUuaWJhdGlzLmxvZ2dpbmcuc3Rkb3V0LlN0ZE91dEltcGwKI9PKvP63osvN\r\nxeTWwwpzcHJpbmcubWFpbC5kZWZhdWx0LWVuY29kaW5nPVVURi04CnNwcmluZy5tYWlsLmhvc3Q9\r\nc210cC5xcS5jb20Kc3ByaW5nLm1haWwudXNlcm5hbWU9ODA2OTk0MjgyQHFxLmNvbQpzcHJpbmcu\r\nbWFpbC5wYXNzd29yZD12em9tb2xpY2xxc3liYmppCnNwcmluZy5tYWlsLnByb3BlcnRpZXMubWFp\r\nbC5zbXRwLmF1dGg9dHJ1ZQpzcHJpbmcubWFpbC5wcm9wZXJ0aWVzLm1haWwuc210cC5zdGFydHRs\r\ncy5lbmFibGU9dHJ1ZQpzcHJpbmcubWFpbC5wcm9wZXJ0aWVzLm1haWwuc210cC5zdGFydHRscy5y\r\nZXF1aXJlZD10cnVlCiN0aHltZWxlYWbF5NbDCnNwcmluZy50aHltZWxlYWYucHJlZml4PWNsYXNz\r\ncGF0aDovdGVtcGxhdGVzLwpzcHJpbmcudGh5bWVsZWFmLnN1ZmZpeD0uaHRtbApzcHJpbmcudGh5\r\nbWVsZWFmLm1vZGU9SFRNTDUKc3ByaW5nLnRoeW1lbGVhZi5lbmNvZGluZz1VVEYtOApzcHJpbmcu\r\ndGh5bWVsZWFmLnNlcnZsZXQuY29udGVudC10eXBlPXRleHQvaHRtbApzcHJpbmcudGh5bWVsZWFm\r\nLmNhY2hlPWZhbHNlCiPWp7PWtcTX7rTzzsS8/gpzcHJpbmcuc2VydmxldC5tdWx0aXBhcnQubWF4\r\nLWZpbGUtc2l6ZT0xMDBNQgojzsS8/sfrx/PX7rTzz97WxgpzcHJpbmcuc2VydmxldC5tdWx0aXBh\r\ncnQubWF4LXJlcXVlc3Qtc2l6ZT0xMDBNQgojyc+0q87EvP61xMHZyrHEv8K8CnNwcmluZy5zZXJ2\r\nbGV0Lm11bHRpcGFydC5sb2NhdGlvbj1EOi8venljd29ya3NwYWNlLy9maWxldXBsb2FkLy8KI8/C\r\n1NjB2cqxxL/CvApzcHJpbmcuc2VydmxldC5kb3duTG9hZC5sb2NhdGlvbj1EOi8venljd29ya3Nw\r\nYWNlLy9maWxldXBsb2FkLy8KCiPM37P2uvO1vbXEtdjWtyAgIMSsyM+jui9sb2dpbgpzaGlyby5r\r\naWNrT3V0LmtpY2tvdXRVcmw9L2FkbWluL2xvZ2luIAojZmFsc2Wjuszes/3HsMPmtcTTw7unICB0\r\ncnVlo7rM3rP9uvPD5rXE08O7pyAgIMSsyM+jumZhbHNlCnNoaXJvLmtpY2tPdXQua2lja291dEFm\r\ndGVyPWZhbHNlIAoj0ru49tXLusXWp7PWtcTX7rTzu+G7sMr9ICDErMjPo7oxCnNoaXJvLmtpY2tP\r\ndXQubWF4U2Vzc2lvbj0yICAKCiNzZXJ2ZXIuc2Vzc2lvbi50aW1lb3V0PTE0NDAwCnNlcnZlci5z\r\nZXJ2bGV0LnNlc3Npb24udGltZW91dD00MzIwMDAwMApzZXJ2ZXIuc2VydmxldC5zZXNzaW9uLmNv\r\nb2tpZS5uYW1lPUpFVC1TTkQtQ1hRWS1BUFBMWQoK', '2019-04-04 15:12:50', NULL, '2019-04-04 15:12:50', NULL, NULL, 2.20);

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` tinyint(255) NULL DEFAULT NULL COMMENT '0-男，1-女',
  `job` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工作名称',
  `dept_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门',
  `phone` bigint(20) NULL DEFAULT NULL COMMENT '手机',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登陆名称',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改者',
  `memo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `role_id` bigint(20) NULL DEFAULT NULL COMMENT '角色id',
  `last_login_time` datetime(0) NULL DEFAULT NULL,
  `enabled` tinyint(1) NULL DEFAULT NULL,
  `face` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `role` int(5) NULL DEFAULT 1 COMMENT '0-管理员 1-普通员工',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (1, '尤贺雨', 1, 'java开发', '1', 18755119062, '18755119046@163.com', 'yhy', '$2a$08$Uu4ORv/9Rk5likIheC2tlOIdf1Mrtftj.IBx/hYavXy0i/bnbOTWa', '2019-02-27 10:00:00', '尤贺雨', '2019-02-28 10:02:52', '尤贺雨', '开发者', NULL, '2019-02-27 10:23:22', 1, 'yhy.png', 1);
INSERT INTO `tb_user` VALUES (2, '于婉', 2, '', NULL, 18755119046, '110@qq.com', 'yuwan', '$2a$08$nBO.XZTTTPD2prQ4dvD6vObYxYvxvXWraMW1moemIU8F93HV/in3G', '2019-03-26 14:40:05', '尤贺雨', '2019-03-26 14:40:05', NULL, '', NULL, '2019-03-26 14:40:47', 1, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
