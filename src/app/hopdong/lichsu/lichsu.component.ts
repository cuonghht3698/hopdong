import { Guid, LichSuModel, ChiTietLichSu } from './../../models/lichsu.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lichsu',
    templateUrl: './lichsu.component.html'
})

export class LichSuComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        this.lichsu.ChiTiet.push(
            this.CtLichSu,
            this.CtLichSu
        )
        console.log(this.lichsu);
    }
    CtLichSu:ChiTietLichSu ={
        Id:Guid.Empty,
        DonGia:0,
        Dvt:'',
        HangMuc:'',
        LichSuId:Guid.Empty,
        SoLuong:0,
        ThanhTien:0,
    }
    lichsu: LichSuModel = {
        BenA:'',
        ChucVu:'',
        DaiDien:'',
        DiaChi:'',
        DiaDienTrinhDien:'',
        DienThoai:'',
        GiaTriHopDong:0,
        GioiTinh:true,
        Id:Guid.Empty,
        Mst:'',
        NgayTao:'',
        ThoiGianLapDat:'',
        ThoiGianThucHien: '',
        Tong:0,
        Vat:0,
        ChiTiet: Array<ChiTietLichSu>()
    }


}