/*
 Navicat Premium Data Transfer

 Source Server         : MySQL80
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : oasd

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 02/06/2023 16:24:30
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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of artwork
-- ----------------------------
INSERT INTO `artwork` VALUES (1, '7', 'Monai', 'good', 1900, 'France', '200ccm', 9999, 'image/7.jpg', 'H2O2', '1', '2023-05-31 16:32:20', 5);
INSERT INTO `artwork` VALUES (2, 'fighting', 'France', 'cavalryman', 1878, 'None', '150', 199999, 'image/33.jpg', 'H3O3', '0', '2023-05-31 20:19:07', 8);
INSERT INTO `artwork` VALUES (3, 'fighting', 'France', 'cavalryman', 1878, 'None', '150', 15, 'image/33.jpg', 'H3O3', '0', '2023-05-31 14:16:58', 3);
INSERT INTO `artwork` VALUES (4, 'Freedom', 'Vann', 'Vann\'s beautiful painting', 1300, 'Loss', '500cm', 2000000, 'image/56.jpg', 'H2O2', '0', '2023-05-31 20:00:58', 3);
INSERT INTO `artwork` VALUES (5, 'Freedom2', 'Vann', 'Vann\'s beautiful painting', 1340, 'Win', '520cm', 399999, 'image/64.jpg', 'H2O2', '0', '2023-05-31 20:01:24', 14);
INSERT INTO `artwork` VALUES (6, 'Rain', 'Canon', 'raining', 1747, 'Western', '300', 498989, 'image/2.jpg', 'H4O4', '0', '2023-05-31 20:02:38', 7);
INSERT INTO `artwork` VALUES (7, 'abstract', 'The unknown', 'Abstract line and box', 1700, 'adrre', '40', 499980, 'image/5.jpg', 'admin', '0', '2023-06-02 07:02:27', 0);
INSERT INTO `artwork` VALUES (8, 'Mountain', 'Raphael', 'The beauty of the mountains', 1560, 'Western', '44', 6000, 'image/021010.jpg', 'admin', '1', '2023-06-02 07:06:50', 0);

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `artworkId` int NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '0-未售出；1-已售出（显示在用户订单中）\r\n',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------
INSERT INTO `shoppingcart` VALUES (11, 'H3O3', 8, '1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'H2O2', '$2y$10$tBPtlrQVVRSn.n/7jClM6Oobd0td5RgAHJzuvaH/EmAEBxUUVflKS', 'cy@cy.cn', '18988787822', 'male', '2023-06-06 00:00:00', 'Japan🇯🇵', 30000);
INSERT INTO `user` VALUES (2, 'H3O3', '$2y$10$1PxYUJ/HWmXoo0e1ArYRPuBFD8g6pXqUukcPnYrk5didQZv/YXvjO', 'cy@cy.com', '18989874542', 'male', '2019-05-22 00:00:00', 'China🇨🇳', 9495011);
INSERT INTO `user` VALUES (3, 'H4O4', '$2y$10$xI8Z5UxI9mvp72LFFHW/E.HzMPK0xS55gHRz3pGC4gFRKxAqoixRS', 'cy1@cy.com', '18989874542', 'male', '1900-01-01 00:00:00', 'Vietnam', 10000);
INSERT INTO `user` VALUES (4, 'YYYY', '$2y$10$YgU3D/cFNpD.v7pm6tty4uGZfjofJO3TPMc/Iwk8PL0Ob4NfY.kzG', 'cy@cy.cn', '17677896567', 'female', '2008-06-20 00:00:00', 'China🇨🇳', 0);
INSERT INTO `user` VALUES (5, 'admin', '$2y$10$9rdoRcUR0dz4eySAeFip8evK9lYHQVss/nmYGySUKpLihiQrAE/Ga', 'root@nn.com', '17877623456', 'other', '1959-07-29 00:00:00', 'Italy🇮🇹', 6000);

SET FOREIGN_KEY_CHECKS = 1;
