import { Guid, LichSuModel, ChiTietLichSu } from './../../models/lichsu.model';
import { Component, OnInit } from '@angular/core';
import { LichSuService } from 'src/app/service/lichsu.s';
import { MatDialog } from '@angular/material/dialog';
import { LichSuPop } from './popupLS/lichsuPop';

@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.component.html',
})
export class LichSuComponent implements OnInit {
  constructor(private ls: LichSuService, private dialog:MatDialog) {}
  data: any;
  ngOnInit() {
    this.GetAll();
    this.lichsu.ChiTiet.push(this.CtLichSu, this.CtLichSu);
    console.log(this.lichsu);
  }
  OpenHangMuc(item:any){
    const dialog = this.dialog.open(LichSuPop,{
      width: 'auto',
      data:item
    })
  }
  GetAll() {
    this.ls.GetAll().subscribe((res) => {
      this.data = res;
      console.log(res);
    });
  }
  CtLichSu: ChiTietLichSu = {
    Id: Guid.Empty,
    DonGia: 0,
    Dvt: '',
    HangMuc: '',
    LichSuId: Guid.Empty,
    SoLuong: 0,
    ThanhTien: 0,
  };
  lichsu: LichSuModel = {
    BenA: '',
    ChucVu: '',
    DaiDien: '',
    DiaChi: '',
    DiaDienTrinhDien: '',
    DienThoai: '',
    GiaTriHopDong: 0,
    GioiTinh: true,
    Id: Guid.Empty,
    Mst: '',
    NgayTao: '',
    ThoiGianLapDat: '',
    ThoiGianThucHien: '',
    Tong: 0,
    Vat: 0,
    ChiTiet: Array<ChiTietLichSu>(),
  };
}
