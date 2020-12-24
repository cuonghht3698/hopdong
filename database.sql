CREATE DATABASE HD
GO
USE QLHOPDONG
GO
CREATE TABLE KHACHHANG
(
	Id uniqueidentifier primary key,
	GioiTinh bit,
	BenA nvarchar(200),
	DiaChi nvarchar(250),
	DienThoai nvarchar(100),
	Mst nvarchar(50),
	DaiDien nvarchar(250),
	ChucVu nvarchar(100)
)

GO
CREATE TABLE SANPHAM(
	Id uniqueidentifier primary key,
	HangMuc nvarchar(200),
	Dvt nvarchar(200),
	DonGia decimal(18,0)
)