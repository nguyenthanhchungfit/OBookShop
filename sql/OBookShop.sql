-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: obookshopdb
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chi_tiet_don_hang`
--

DROP TABLE IF EXISTS `chi_tiet_don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chi_tiet_don_hang` (
  `ma_don_hang` smallint(6) NOT NULL,
  `id_sach` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `ten_sach` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `don_gia` mediumint(9) NOT NULL,
  `so_luong` tinyint(4) NOT NULL,
  `thanh_tien` mediumint(9) NOT NULL,
  PRIMARY KEY (`ma_don_hang`,`id_sach`),
  KEY `FK_CTDH_Sach` (`id_sach`),
  CONSTRAINT `FK_CTDH_DH` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_hang` (`ma_don_hang`),
  CONSTRAINT `FK_CTDH_Sach` FOREIGN KEY (`id_sach`) REFERENCES `sach` (`id_sach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_don_hang`
--

LOCK TABLES `chi_tiet_don_hang` WRITE;
/*!40000 ALTER TABLE `chi_tiet_don_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `chi_tiet_don_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_sach_ban_hang`
--

DROP TABLE IF EXISTS `danh_sach_ban_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danh_sach_ban_hang` (
  `ma_don_hang` smallint(6) NOT NULL,
  `id_sach` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `so_luong` tinyint(4) NOT NULL,
  `don_gia` mediumint(9) NOT NULL,
  `thanh_tien` mediumint(9) NOT NULL,
  `ngay_ban` datetime NOT NULL,
  UNIQUE KEY `ma_don_hang` (`ma_don_hang`),
  UNIQUE KEY `id_sach` (`id_sach`),
  CONSTRAINT `FK_DsBanHang_DH` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_hang` (`ma_don_hang`),
  CONSTRAINT `FK_DsBanHang_Sach` FOREIGN KEY (`id_sach`) REFERENCES `sach` (`id_sach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_sach_ban_hang`
--

LOCK TABLES `danh_sach_ban_hang` WRITE;
/*!40000 ALTER TABLE `danh_sach_ban_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `danh_sach_ban_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_sach_nhap_hang`
--

DROP TABLE IF EXISTS `danh_sach_nhap_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danh_sach_nhap_hang` (
  `ma_nhap_hang` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `id_sach` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `so_luong` mediumint(9) NOT NULL,
  `don_gia` mediumint(9) NOT NULL,
  `thanh_tien` int(11) NOT NULL,
  `ngay_nhap` datetime NOT NULL,
  `nguoi_nhap` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ma_nhap_hang`),
  KEY `FK_DsNhapHang_NhanVien` (`nguoi_nhap`),
  CONSTRAINT `FK_DsNhapHang_NhanVien` FOREIGN KEY (`nguoi_nhap`) REFERENCES `nhan_vien` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_sach_nhap_hang`
--

LOCK TABLES `danh_sach_nhap_hang` WRITE;
/*!40000 ALTER TABLE `danh_sach_nhap_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `danh_sach_nhap_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_hang`
--

DROP TABLE IF EXISTS `don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `don_hang` (
  `ma_don_hang` smallint(6) NOT NULL,
  `nguoi_nhan` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `nguoi_gui` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `dia_chi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `so_dien_thoai` char(11) COLLATE utf8_unicode_ci NOT NULL,
  `ngay_mua` datetime NOT NULL,
  PRIMARY KEY (`ma_don_hang`),
  KEY `FK_Don_hang_KH` (`nguoi_gui`),
  CONSTRAINT `FK_Don_hang_KH` FOREIGN KEY (`nguoi_gui`) REFERENCES `khach_hang` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_hang`
--

LOCK TABLES `don_hang` WRITE;
/*!40000 ALTER TABLE `don_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `don_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khach_hang` (
  `username` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `ho_ten` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `so_dien_thoai` char(11) COLLATE utf8_unicode_ci DEFAULT '',
  `gioi_tinh` tinyint(1) DEFAULT '0',
  `dia_chi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `image_url` varchar(30) COLLATE utf8_unicode_ci DEFAULT 'default.jpg',
  `diem_tich_luy` smallint(6) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang`
--

LOCK TABLES `khach_hang` WRITE;
/*!40000 ALTER TABLE `khach_hang` DISABLE KEYS */;
/*!40000 ALTER TABLE `khach_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nha_xuat_ban`
--

DROP TABLE IF EXISTS `nha_xuat_ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nha_xuat_ban` (
  `ten_nxb` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nam_thanh_lap` smallint(6) DEFAULT '1990',
  `dia_chi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ten_nxb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_xuat_ban`
--

LOCK TABLES `nha_xuat_ban` WRITE;
/*!40000 ALTER TABLE `nha_xuat_ban` DISABLE KEYS */;
INSERT INTO `nha_xuat_ban` VALUES ('Đà Nẵng',2008,'30 tháng 4. Hòa Cường Bắc, Hải Châu, Đà Nẵng'),('Đại học quốc gia Hà Nội',1995,'16 Hàng Chuối, Hai Bà Trưng. Hà Nội'),('Giáo dục Việt Nam',1957,'Số 8, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội'),('Hội nhà văn',1960,'Phường 8, quận 3, TP Hồ Chí Minh'),('Hồng Đức',1985,'Tây Hồ, Hà Nội'),('Kim Đồng',1957,'22 Hàng Chuối, Hà Nội'),('Kinh tế TPHCM',1977,'Phường 5, quận 10, TP Hồ Chí Minh'),('Lao động',1945,'Phường Bến Thành, quận 1, TP Hồ Chí Minh'),('Phụ nữ',1957,'39 Hàng Chuối, Hà Nội'),('Tổng hợp Đà Nẵng',1970,'19/1 Quang Trung, Hải Châu, Đà Nẵng'),('Tổng hợp TPHCM',1977,'Phường Đa Kao, Quận 1, Hồ Chí Minh'),('Trẻ',1986,'Phường 7, quận 3,TP Hồ Chí Minh'),('Văn học',1988,'Phường 14, quận 3, TP Hồ Chí Minh');
/*!40000 ALTER TABLE `nha_xuat_ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhan_vien`
--

DROP TABLE IF EXISTS `nhan_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhan_vien` (
  `username` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `ho_ten` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `so_dien_thoai` char(11) COLLATE utf8_unicode_ci DEFAULT '',
  `gioi_tinh` tinyint(1) DEFAULT '0',
  `dia_chi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `image_url` varchar(30) COLLATE utf8_unicode_ci DEFAULT 'default.jpg',
  `luong` int(11) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_vien`
--

LOCK TABLES `nhan_vien` WRITE;
/*!40000 ALTER TABLE `nhan_vien` DISABLE KEYS */;
/*!40000 ALTER TABLE `nhan_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quan_ly`
--

DROP TABLE IF EXISTS `quan_ly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quan_ly` (
  `username` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `ho_ten` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `so_dien_thoai` char(11) COLLATE utf8_unicode_ci DEFAULT '',
  `gioi_tinh` tinyint(1) DEFAULT '0',
  `dia_chi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `image_url` varchar(30) COLLATE utf8_unicode_ci DEFAULT 'default.jpg',
  `luong` int(11) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quan_ly`
--

LOCK TABLES `quan_ly` WRITE;
/*!40000 ALTER TABLE `quan_ly` DISABLE KEYS */;
/*!40000 ALTER TABLE `quan_ly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach`
--

DROP TABLE IF EXISTS `sach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sach` (
  `id_sach` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `ten_sach` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `the_loai` char(5) COLLATE utf8_unicode_ci DEFAULT '',
  `nha_xuat_ban` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nam_xuat_ban` smallint(6) DEFAULT '1990',
  `khuyen_mai` tinyint(4) DEFAULT '0',
  `gia` mediumint(9) DEFAULT '0',
  `so_luong_ton` smallint(6) DEFAULT '0',
  `chat_luong` tinyint(4) DEFAULT '0',
  `image_sach_url` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doc_truoc` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id_sach`),
  KEY `FK_Sach_The_loai` (`the_loai`),
  KEY `FK_Sach_NXB` (`nha_xuat_ban`),
  CONSTRAINT `FK_Sach_NXB` FOREIGN KEY (`nha_xuat_ban`) REFERENCES `nha_xuat_ban` (`ten_nxb`),
  CONSTRAINT `FK_Sach_The_loai` FOREIGN KEY (`the_loai`) REFERENCES `the_loai` (`id_the_loai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach`
--

LOCK TABLES `sach` WRITE;
/*!40000 ALTER TABLE `sach` DISABLE KEYS */;
INSERT INTO `sach` VALUES ('IS0001','Tôi thấy hoa vàng trên cỏ xanh','TL001','Trẻ',2010,0,56500,10,0,'IS0001.jpg',NULL),('IS0002','Út Quyên và tôi','TL001','Trẻ',2014,0,25000,10,0,'IS0002.jpg',NULL),('IS0003','Đi qua hoa cúc','TL001','Trẻ',2014,0,39200,10,0,'IS0003.jpg',NULL),('IS0004','Trả lại nụ hôn','TL001','Trẻ',2018,0,51500,10,0,'IS0004.jpg',NULL),('IS0005','Tắm heo và tắm tiên','TL001','Văn học',2016,0,71200,10,0,'IS0005.jpg',NULL),('IS0006','Cung đường vàng nắng','TL001','Trẻ',2012,0,54400,10,0,'IS0006.jpg',NULL),('IS0007','Động phòng hoa chúc cách vách','TL001','Văn học',2018,0,82600,10,0,'IS0007.jpg',NULL),('IS0008','Sự diệu dàng khó cưởng','TL001','Văn học',2015,0,55300,10,0,'IS0008.jpg',NULL),('IS0009','Hùng Ka Rô','TL001','Văn học',2017,0,100000,10,0,'IS0009.jpg',NULL),('IS0010','Phố','TL001','Văn học',2017,0,60000,10,0,'IS0010.jpg',NULL),('IS0011','Dạy con làm giàu (tập 1)','TL002','Trẻ',2016,0,36400,15,0,'IS0011.jpg',NULL),('IS0012','Dạy con làm giàu (tập 2)','TL002','Trẻ',2016,0,66500,15,0,'IS0012.jpg',NULL),('IS0013','Doanh nghiệp của thể kỉ 21','TL002','Trẻ',2015,0,52500,15,0,'IS0013.jpg',NULL),('IS0014','Kiếm sĩ bắt ruồi','TL002','Kinh tế TPHCM',2017,0,75000,15,0,'IS0014.jpg',NULL),('IS0015','Hiệu ứng chim mồi (tập 1)','TL002','Kinh tế TPHCM',2017,0,75000,15,0,'IS0015.jpg',NULL),('IS0016','Hiệu ứng chim mồi (tập 2)','TL002','Kinh tế TPHCM',2017,0,80000,15,0,'IS0016.jpg',NULL),('IS0017','Ai sẽ được thăng tiến','TL002','Lao động',2016,0,42000,15,0,'IS0017.png',NULL),('IS0018','Không bao giờ thất bại, tất cả là thử...','TL002','Tổng hợp TPHCM',2017,0,62000,15,0,'IS0018.jpg',NULL),('IS0019','Những chú chó bán hàng','TL002','Trẻ',2018,0,90000,15,0,'IS0019.jpg',NULL),('IS0020','Làm giàu qua chứng khoáng','TL002','Hồng Đức',2018,0,132000,15,0,'IS0020.jpg',NULL),('IS0021','Kĩ năng giao tiếp - Lời hứa','TL003','Kim Đồng',2015,0,8000,6,0,'IS0021.jpg',NULL),('IS0022','Kĩ năng giao tiếp - Lời khen','TL003','Kim Đồng',2015,0,8000,6,0,'IS0022.jpg',NULL),('IS0023','Kĩ năng giao tiếp - Lời tạm biệt','TL003','Kim Đồng',2015,0,8000,6,0,'IS0023.jpg',NULL),('IS0024','Kĩ năng giao tiếp - Lời xin lỗi','TL003','Kim Đồng',2015,0,8000,6,0,'IS0024.jpg',NULL),('IS0025','Những người bạn bên bờ hồ','TL003','Phụ nữ',2015,0,23500,6,0,'IS0025.jpg',NULL),('IS0026','Những người bạn dưới đáy biển','TL003','Phụ nữ',2015,0,23500,6,0,'IS0026.jpg',NULL),('IS0027','Những người bạn trên sa mạc','TL003','Phụ nữ',2015,0,23500,6,0,'IS0027.jpg',NULL),('IS0028','Chuyện con mèo và con chuột bạn thân của nó','TL003','Hội nhà văn',2016,0,25500,6,0,'IS0028.jpg',NULL),('IS0029','Chuyện con chó tên là Trung thành','TL003','Hội nhà văn',2016,0,29000,6,0,'IS0029.jpg',NULL),('IS0030','Chuyện con mèo dạy Hải âu bay','TL003','Hội nhà văn',2016,0,30000,6,0,'IS0030.jpg',NULL),('IS0031','Quẳng gánh lo đi và vui sống','TL004','Tổng hợp TPHCM',2016,0,57000,11,0,'IS0031.jpg',NULL),('IS0032','Đắc nhân tâm','TL004','Tổng hợp TPHCM',2017,0,44000,11,0,'IS0032.jpg',NULL),('IS0033','Chiến thắng nỗi lo và sự căng thẳng','TL004','Lao động',2018,0,74200,11,0,'IS0033.jpg',NULL),('IS0034','Vui sống và làm việc','TL004','Tổng hợp TPHCM',2013,0,168000,11,0,'IS0034.jpg',NULL),('IS0035','Tôi tài giỏi, bạn cũng thế','TL004','Phụ nữ',2010,0,88000,11,0,'IS0035.jpg',NULL),('IS0036','Chiến thắng trò chơi cuộc sống','TL004','Phụ nữ',2013,0,96000,11,0,'IS0036.jpg',NULL),('IS0037','Ngày xưa có một con bò','TL004','Trẻ',2016,0,43400,11,0,'IS0037.jpg',NULL),('IS0038','Đời ngắn đừng ngủ dài','TL004','Trẻ',2014,0,42000,11,0,'IS0038.jpg',NULL),('IS0039','Ba người thầy vĩ đại','TL004','Trẻ',2013,0,60000,11,0,'IS0039.jpg',NULL),('IS0040','Ba người thầy vĩ đại (tái bản)','TL004','Lao động',2018,0,60000,11,0,'IS0040.jpg',NULL),('IS0041','Dạy con trong hoang mang','TL005','Tổng hợp TPHCM',2017,0,79000,11,0,'IS0041.jpg',NULL),('IS0042','Dạy con trong hoang mang II','TL005','Tổng hợp TPHCM',2018,0,100000,11,0,'IS0042.jpg',NULL),('IS0043','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con xấu hổ ơi là xấu hổ!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0043.jpg',NULL),('IS0044','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con buồn ơi là buồn!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0044.jpg',NULL),('IS0045','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con nhớ ơi là nhớ!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0045.jpg',NULL),('IS0046','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con sợ ơi là sợ!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0046.jpg',NULL),('IS0047','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con giận ơi là giận!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0047.jpg',NULL),('IS0048','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con tiếc ơi là tiếc!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0048.jpg',NULL),('IS0049','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con tủi thân ơi là tủi thân!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0049.jpg',NULL),('IS0050','Kĩ năng làm chủ cảm xúc - vì sao con khóc? - vì con ghen tị ơi là ghen tị!','TL005','Giáo dục Viêt Nam',2017,0,20800,13,0,'IS0050.jpg',NULL),('IS0051','Hướng dẫn học và giải chi tiết bài tập sinh học 6','TL006','Tổng hợp Đà Nẵng',2017,0,40500,5,0,'IS0051.jpg',NULL),('IS0052','Hướng dẫn học và giải chi tiết bài tập sinh học 7','TL006','Đà Nẵng',2017,0,34000,5,0,'IS0052.jpg',NULL),('IS0053','Hướng dẫn học và giải chi tiết bài tập sinh học 8','TL006','Tổng hợp TPHCM',2017,0,46800,5,0,'IS0053.jpg',NULL),('IS0054','Đề kiểm tra sinh học 9','TL006','Đại học quốc gia Hà Nội',2015,0,28000,5,0,'IS0054.jpg',NULL),('IS0055','Chiến thuật ôn thi THPT quốc gia môn ngữ văn chuyên đề nghị luận văn học','TL006','Đại học quốc gia Hà Nội',2016,0,84000,5,0,'IS0055.jpg',NULL),('IS0056','Chiến thuật ôn thi THPT quốc gia môn ngữ văn chuyên đề nghị luận xã hội tập 1','TL006','Đại học quốc gia Hà Nội',2016,0,90000,5,0,'IS0056.jpg',NULL),('IS0057','Chiến thuật ôn thi THPT quốc gia môn ngữ văn chuyên đề nghị luận xã hội tập 2','TL006','Đại học quốc gia Hà Nội',2016,0,90000,5,0,'IS0057.jpg',NULL),('IS0058','Giải bài toán lớp 5 - tâp 1','TL006','Tổng hợp TPHCM',2015,0,35100,5,0,'IS0058.jpg',NULL),('IS0059','Giải bài toán lớp 5 - tâp 2','TL006','Tổng hợp TPHCM',2015,0,28800,5,0,'IS0059.jpg',NULL),('IS0060','Các bài toán thực tế liên môn thi tuyển sinh toán 9 vào 10','TL006','Đà Nẵng',2018,0,40500,5,0,'IS0060.jpg',NULL),('IS0061','Đột phá Mindmap - tư duy đọc hiểu môn ngữ văn bằng hình ảnh lớp 10','TL007','Đại học quốc gia Hà Nội',2016,0,100800,10,0,'IS0061.png',NULL),('IS0062','Đột phá Mindmap - tư duy đọc hiểu môn ngữ văn bằng hình ảnh lớp 11','TL007','Đại học quốc gia Hà Nội',2016,0,106200,10,0,'IS0062.png',NULL),('IS0063','Đột phá Mindmap - tư duy đọc hiểu môn ngữ văn bằng hình ảnh lớp 12','TL007','Đại học quốc gia Hà Nội',2016,0,118800,10,0,'IS0063.jpg',NULL),('IS0064','Gammar for you (basic) - bí quyết chinh phục ngữ pháp tiếng anh cơ bản','TL007','Đại học quốc gia Hà Nội',2017,0,127200,10,0,'IS0064.jpg',NULL),('IS0065','Gammar for you (advanced) - bí quyết chinh phục ngữ pháp tiếng anh nâng cao','TL007','Đại học quốc gia Hà Nội',2017,0,111200,10,0,'IS0065.jpg',NULL),('IS0066','Quick and fun học nhanh 1000+ từ vựng tiếng anh (cho luyện thi THPT quốc gia)','TL007','Đại học quốc gia Hà Nội',2017,0,41600,10,0,'IS0066.jpg',NULL),('IS0067','Reading for you - bí quyết chinh phục kỹ năng đọc hiểu tiếng anh','TL007','Đại học quốc gia Hà Nội',2017,0,111200,10,0,'IS0067.jpg',NULL),('IS0068','Thực hành phản xạ từ vựng tiếng anh siêu đẳng tập 1','TL007','Đại học quốc gia Hà Nội',2017,0,108000,10,0,'IS0068.jpg',NULL),('IS0069','Tập viết tiếng Nhật căn bản Hiragana','TL007','Đại học quốc gia Hà Nội',2016,0,26000,10,0,'IS0069.jpg',NULL),('IS0070','Tập viết tiếng Nhật căn bản Kanji','TL007','Đại học quốc gia Hà Nội',2017,0,36000,10,0,'IS0070.png',NULL);
/*!40000 ALTER TABLE `sach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sach_tac_gia`
--

DROP TABLE IF EXISTS `sach_tac_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sach_tac_gia` (
  `id_tac_gia` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `id_sach` char(6) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_tac_gia`,`id_sach`),
  KEY `FK_STG_S` (`id_sach`),
  CONSTRAINT `FK_STG_S` FOREIGN KEY (`id_sach`) REFERENCES `sach` (`id_sach`),
  CONSTRAINT `FK_STG_TG` FOREIGN KEY (`id_tac_gia`) REFERENCES `tac_gia` (`id_tac_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sach_tac_gia`
--

LOCK TABLES `sach_tac_gia` WRITE;
/*!40000 ALTER TABLE `sach_tac_gia` DISABLE KEYS */;
INSERT INTO `sach_tac_gia` VALUES ('TG001','IS0001'),('TG001','IS0002'),('TG001','IS0003'),('TG002','IS0004'),('TG002','IS0005'),('TG002','IS0006'),('TG003','IS0007'),('TG003','IS0008'),('TG004','IS0009'),('TG004','IS0010'),('TG005','IS0011'),('TG005','IS0012'),('TG005','IS0013'),('TG006','IS0014'),('TG006','IS0015'),('TG006','IS0016'),('TG006','IS0017'),('TG007','IS0018'),('TG007','IS0019'),('TG007','IS0020'),('TG008','IS0021'),('TG008','IS0022'),('TG008','IS0023'),('TG008','IS0024'),('TG009','IS0025'),('TG009','IS0026'),('TG009','IS0027'),('TG010','IS0028'),('TG010','IS0029'),('TG010','IS0030'),('TG011','IS0031'),('TG011','IS0032'),('TG011','IS0033'),('TG011','IS0034'),('TG012','IS0035'),('TG012','IS0036'),('TG012','IS0037'),('TG013','IS0038'),('TG013','IS0039'),('TG013','IS0040'),('TG014','IS0041'),('TG014','IS0042'),('TG015','IS0043'),('TG015','IS0044'),('TG015','IS0045'),('TG015','IS0046'),('TG015','IS0047'),('TG015','IS0048'),('TG015','IS0049'),('TG015','IS0050'),('TG016','IS0051'),('TG016','IS0052'),('TG016','IS0053'),('TG016','IS0054'),('TG017','IS0055'),('TG017','IS0056'),('TG017','IS0057'),('TG018','IS0058'),('TG018','IS0059'),('TG018','IS0060'),('TG017','IS0061'),('TG017','IS0062'),('TG017','IS0063'),('TG019','IS0064'),('TG019','IS0065'),('TG019','IS0066'),('TG019','IS0067'),('TG019','IS0068'),('TG020','IS0069'),('TG020','IS0070');
/*!40000 ALTER TABLE `sach_tac_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tac_gia`
--

DROP TABLE IF EXISTS `tac_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tac_gia` (
  `id_tac_gia` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `ten_tac_gia` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `nam_sinh` smallint(6) DEFAULT '1900',
  `que_quan` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id_tac_gia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tac_gia`
--

LOCK TABLES `tac_gia` WRITE;
/*!40000 ALTER TABLE `tac_gia` DISABLE KEYS */;
INSERT INTO `tac_gia` VALUES ('TG001','Nguyễn Nhật Ánh',1955,'Tỉnh Quảng Nam'),('TG002','Dương Thụy',1975,'Sài Gòn'),('TG003','Diệp Lạc Vô Tâm',1980,'Trung Quốc'),('TG004','Chu Lai',1946,'Tỉnh Hưng Yên'),('TG005','Robert T. Kiyosaki',1947,'Nhật Bản'),('TG006','Quốc Khánh',1947,'Tỉnh Tây Ninh'),('TG007','Chung ju yung',1915,'Hàn Quốc'),('TG008','Nguyễn Thanh Hà',1970,'Tỉnh Long An'),('TG009','Accotoro',1980,'Nhật Bản'),('TG010','Luis sepulveda',1949,'Chile'),('TG011','Dale Carnegie',1988,'Hoa Kỳ'),('TG012','Adam Khoo',1974,'Singapore'),('TG013','Robin Sharma',1964,'Canada'),('TG014','Ts. Lê Nguyên Phương',1960,'Hoa Kỳ'),('TG015','Khủng Long Q',1987,'TPHCM'),('TG016','Hoàng Thị Tuyến',1988,'Hà Nội'),('TG017','Trình Văn Quỳnh',1977,'Bạc Liêu'),('TG018','Nguyễn Đức Chí',1980,'Tỉnh Long An'),('TG019','Dương Hương',1982,'TPHCM'),('TG020','Mai Ngọc',1985,'TPHCM');
/*!40000 ALTER TABLE `tac_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `the_loai`
--

DROP TABLE IF EXISTS `the_loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `the_loai` (
  `id_the_loai` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `ten_the_loai` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_the_loai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `the_loai`
--

LOCK TABLES `the_loai` WRITE;
/*!40000 ALTER TABLE `the_loai` DISABLE KEYS */;
INSERT INTO `the_loai` VALUES ('TL001','Sách văn học'),('TL002','Sách kinh tế'),('TL003','Sách thiếu nhi'),('TL004','Sách kỹ năng - sống đẹp'),('TL005','Sách Bà mẹ - Em bé'),('TL006','Sách tham khảo'),('TL007','Sách Học Ngoại ngữ');
/*!40000 ALTER TABLE `the_loai` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-16  8:08:41
