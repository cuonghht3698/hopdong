export interface LichSuModel {
    Id: Guid.Empty,
    GioiTinh: boolean,
    BenA: string,
    DiaChi: string,
    DienThoai: string,
    Mst: string,
    DaiDien: string,
    ChucVu: string,
    DiaDienTrinhDien: string,
    ThoiGianThucHien: string,
    ThoiGianLapDat: string,
    Tong: number,
    Vat: number,
    GiaTriHopDong: number,
    NgayTao: string,
    soHD:string,
    soTK:string,
    ngayKy:Date,
    maKH:string,
    tenCT:string
    ChiTiet: Array<ChiTietLichSu>;
}

export interface ChiTietLichSu {
    Id: Guid.Empty,
    HangMuc: string,
    Dvt: string,
    DonGia: number,
    SoLuong: number,
    ThanhTien: number,
    LichSuId: Guid.Empty
}

export enum Guid {
    Empty = "00000000-0000-0000-0000-000000000000"
}
