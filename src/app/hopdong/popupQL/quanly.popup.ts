import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'hopdong-popup',
  templateUrl: './quanly.popup.html',
})
export class QuanLyPopUp implements OnInit {
  constructor(
    private dialog: MatDialogRef<QuanLyPopUp>,
    @Inject(MAT_DIALOG_DATA) public ob: any,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  dsHangMuc: any;
  dsKhachHang: any;
  HangMuc = {
    HangMuc: '',
    Dvt: '',
    DonGia: '',
  };


  KhachHang={
    benA: '',
    diaChiA: '',
    dienThoaiA: '',
    mstA: '',
    daiDienA: '',
    gioiTinh:1,
    chucVu:''
  }
  ngOnInit() {
    this.getAllKH();
    this.getAllHM();
  }
  Close() {
    this.dialog.close(this.ob);
  }
  getAllKH() {
    this.http
      .get(environment.baseAPI + 'khachhang/getAll')
      .subscribe((res: any) => {
        console.log(res);
        this.dsKhachHang = res;
      });
  }
  getAllHM() {
    this.http
      .get(environment.baseAPI + 'hangmuc/getAll')
      .subscribe((res: any) => {
        // console.log(res);
        this.dsHangMuc = res;
      });
  }
}
