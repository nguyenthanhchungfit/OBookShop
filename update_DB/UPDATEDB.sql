ALTER TABLE don_hang
ADD COLUMN trang_thai tinyint default 0;

ALTER TABLE don_hang
DROP FOREIGN KEY FK_Don_hang_KH;

ALTER TABLE nhan_vien
MODIFY COLUMN luong BIGINT DEFAULT 0;

ALTER TABLE quan_ly
MODIFY COLUMN luong BIGINT DEFAULT 0;

ALTER TABLE khach_hang
MODIFY password varchar(70) not null;

ALTER TABLE nhan_vien
MODIFY password varchar(70) not null;

ALTER TABLE quan_ly
MODIFY password varchar(70) not null;

-- 16-06
ALTER TABLE chi_tiet_don_hang
DROP FOREIGN KEY FK_CTDH_Sach