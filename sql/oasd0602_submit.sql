/*
 Navicat Premium Data Transfer

 Source Server         : MySQL1
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : oasd

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 02/06/2023 23:37:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for artwork
-- ----------------------------
DROP TABLE IF EXISTS `artwork`;
CREATE TABLE `artwork`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `year` int NULL DEFAULT NULL,
  `genre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0-未售出；1-已售出',
  `releaseTime` datetime NULL DEFAULT NULL,
  `visited` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of artwork
-- ----------------------------
INSERT INTO `artwork` VALUES (1, '7', 'Monai', 'good', 1900, 'France', '200ccm', 9999, 'image/7.jpg', 'H2O2', '1', '2023-05-31 16:32:20', 22);
INSERT INTO `artwork` VALUES (2, 'fighting', 'France', 'cavalryman', 1878, 'None', '150', 199999, 'image/33.jpg', 'H3O3', '0', '2023-05-31 20:19:07', 13);
INSERT INTO `artwork` VALUES (3, 'fighting', 'France', 'cavalryman', 1878, 'None', '150', 15, 'image/33.jpg', 'H3O3', '0', '2023-05-31 14:16:58', 4);
INSERT INTO `artwork` VALUES (4, 'Freedom', 'Vann', 'Vann\'s beautiful painting', 1300, 'Loss', '500cm', 2000000, 'image/56.jpg', 'H2O2', '0', '2023-05-31 20:00:58', 3);
INSERT INTO `artwork` VALUES (5, 'Freedom2', 'Vann', 'Vann\'s beautiful painting', 1340, 'Win', '520cm', 399999, 'image/64.jpg', 'H2O2', '0', '2023-05-31 20:01:24', 16);
INSERT INTO `artwork` VALUES (6, 'Rain', 'Canon', 'raining', 1747, 'Western', '300', 498989, 'image/2.jpg', 'H4O4', '0', '2023-05-31 20:02:38', 10);
INSERT INTO `artwork` VALUES (7, 'abstract', 'The unknown', 'Abstract line and box', 1700, 'adrre', '40', 499980, 'image/5.jpg', 'admin', '1', '2023-06-02 07:02:27', 4);
INSERT INTO `artwork` VALUES (8, 'Mountain', 'Raphael', 'The beauty of the mountains', 1560, 'Western', '44', 6000, 'image/021010.jpg', 'admin', '0', '2023-06-02 07:06:50', 70);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `artworkId` int NULL DEFAULT NULL,
  `parentId` int NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `deleted` int NULL DEFAULT NULL,
  `likes` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 8, NULL, 'H3O3', '123', NULL, 3);
INSERT INTO `comment` VALUES (2, 8, NULL, 'H3O3', '123', NULL, 5);
INSERT INTO `comment` VALUES (3, 8, NULL, 'H2O2', 'nice', 1, 0);
INSERT INTO `comment` VALUES (4, 8, NULL, 'H2O2', 'great', NULL, 1);
INSERT INTO `comment` VALUES (5, 8, NULL, 'H2O2', 'great', 1, 3);
INSERT INTO `comment` VALUES (6, 8, 1, 'H2O2', 'aaaaa', NULL, 1);
INSERT INTO `comment` VALUES (7, 8, 1, 'H2O2', '555555', NULL, 0);
INSERT INTO `comment` VALUES (8, 8, 1, 'H2O2', '122', NULL, 1);
INSERT INTO `comment` VALUES (9, 8, 2, 'H2O2', 'reply', NULL, 0);
INSERT INTO `comment` VALUES (10, 8, 6, 'admin', 'replying', NULL, 0);

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `commentId` int NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of likes
-- ----------------------------
INSERT INTO `likes` VALUES (5, 5, 'H2O2');
INSERT INTO `likes` VALUES (7, 1, 'H2O2');
INSERT INTO `likes` VALUES (8, 6, 'H2O2');
INSERT INTO `likes` VALUES (9, 8, 'H2O2');
INSERT INTO `likes` VALUES (10, 2, 'H2O2');
INSERT INTO `likes` VALUES (11, 4, 'admin');

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `artworkId` int NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0-未售出；1-别人买了自己加入购物车的商品（显示sold out）；2-自己已购买的商品（显示在用户订单中）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------
INSERT INTO `shoppingcart` VALUES (12, 'H4O4', 7, '1');
INSERT INTO `shoppingcart` VALUES (14, 'H3O3', 6, '0');
INSERT INTO `shoppingcart` VALUES (15, 'H3O3', 3, '0');
INSERT INTO `shoppingcart` VALUES (16, 'H3O3', 5, '0');
INSERT INTO `shoppingcart` VALUES (17, 'H2O2', 7, '2');
INSERT INTO `shoppingcart` VALUES (18, 'admin', 1, '2');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birthday` datetime NULL DEFAULT NULL,
  `nationality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `balance` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'H2O2', '$2y$10$tBPtlrQVVRSn.n/7jClM6Oobd0td5RgAHJzuvaH/EmAEBxUUVflKS', 'cy@cy.cn', '18988787822', 'male', '2023-06-06 00:00:00', 'China🇨🇳', 1439022);
INSERT INTO `user` VALUES (2, 'H3O3', '$2y$10$1PxYUJ/HWmXoo0e1ArYRPuBFD8g6pXqUukcPnYrk5didQZv/YXvjO', 'cy@cy.com', '18989874542', 'male', '2019-05-22 00:00:00', 'China🇨🇳', 8097019);
INSERT INTO `user` VALUES (3, 'H4O4', '$2y$10$xI8Z5UxI9mvp72LFFHW/E.HzMPK0xS55gHRz3pGC4gFRKxAqoixRS', 'cy1@cy.com', '18989874542', 'male', '1900-01-01 00:00:00', 'Vietnam', 508989);
INSERT INTO `user` VALUES (4, 'YYYY', '$2y$10$YgU3D/cFNpD.v7pm6tty4uGZfjofJO3TPMc/Iwk8PL0Ob4NfY.kzG', 'cy@cy.cn', '17677896567', 'female', '2008-06-20 00:00:00', 'China🇨🇳', 0);
INSERT INTO `user` VALUES (5, 'admin', '$2y$10$9rdoRcUR0dz4eySAeFip8evK9lYHQVss/nmYGySUKpLihiQrAE/Ga', 'root@nn.com', '17877623456', 'other', '1959-07-29 00:00:00', 'Italy🇮🇹', 495981);
INSERT INTO `user` VALUES (6, 'test', '$2y$10$05OheNu12ef.vy38rHGK/eOgNaGmd67tLt4Oj0p2Jq8LnM8WTIpuC', '28H2O2@gmail.com', '18458072829', 'male', '2023-03-09 00:00:00', 'Egypt', 50000);
INSERT INTO `user` VALUES (7, 'test1', '$2y$10$csx6R6dLVS4h8I.HVUX/Re/57icHIFjOG9XGxur5ooRXPWHCbJXiO', '', '111', '', '1900-01-01 00:00:00', '', 0);
INSERT INTO `user` VALUES (8, '111', '$2y$10$lFMSMZdat1pI2mEUi9Ut..0uQQOD1cQPlko/qml.MpkhHAmFH9q.G', '', '12', '', '1900-01-01 00:00:00', '', 0);

SET FOREIGN_KEY_CHECKS = 1;
