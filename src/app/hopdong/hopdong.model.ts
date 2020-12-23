
export interface HopDongModel {
    benA: string;
    diaChiA: string;
    dienThoaiA: string;
    mstA: string;
    daiDienA: string;
    benB: string;
    diaChiB: string;
    diaChiThuB: string;
    dienThoaiB: string;
    mstB: string;
    daiDienB: string;
    taiKhoanNH: string;
    tenTaiKhoan: string;
    diaDiem: string;
    timeThucHien: Date;
    timeLapDat: Date;
    dataTable: Array<HopDongTB>;
}

export interface HopDongTB {
    STT: number;
    HangMuc: string;
    Dvt: string;
    ĐonGia: number;
    SoLuong: number;
    ThanhTien: number;
}