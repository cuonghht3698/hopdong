import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FunService } from 'src/app/service/fun';
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
    private toastr: ToastrService,
    private fun:FunService
  ) { }
  dsHangMuc: any;
  dsKhachHang: any;
  tienchu: any;
  fullKH:boolean = false;
  searchKH = {
    benA:'',
    dienThoai:'',
    daiDien:''
  };
  searchDM = {
    hangMuc: ''
  };
  HangMuc = {
    Id: '00000000-0000-0000-0000-000000000000',
    HangMuc: '',
    Dvt: '',
    DonGia: 0,
  };


  KhachHang = {
    Id:'00000000-0000-0000-0000-000000000000',
    BenA: '',
    DiaChi: '',
    DienThoai: '',
    Mst: '',
    DaiDien: '',
    GioiTinh: true,
    ChucVu: ''
  }
  ngOnInit() {
    this.getAllKH();
    this.getAllHM();
  }
  Close() {
    this.dialog.close(this.ob);
  }
  FullKH(){
    this.fullKH = !this.fullKH;
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
  CreateOrUpdateHM() {
    console.log(this.HangMuc);
    if (this.HangMuc.Id == '00000000-0000-0000-0000-000000000000') {
      this.http.post(environment.baseAPI + 'hangmuc', this.HangMuc).subscribe((res) => {
        this.toastr.success('Thêm hạng mục thành công', 'Thông báo');
        this.getAllHM();
        this.Huy();
      })
    }
    else {
      this.http.put(environment.baseAPI + 'hangmuc', this.HangMuc).subscribe((res) => {
        this.toastr.success('Sửa hạng mục thành công', 'Thông báo');
        this.getAllHM();
        this.Huy();

      })
    }

  }
  docTien() {
        this.tienchu =this.fun.DocTien(this.HangMuc.DonGia);
  }
  Xoa(id: any) {
    if (confirm("Xóa?")) {
      this.http.delete(environment.baseAPI + 'hangmuc/' + id).subscribe((res) => {
        this.toastr.success('Xóa hạng mục thành công', 'Thông báo');
        this.getAllHM();
      })
    }

  }
  Huy() {
    this.HangMuc = {
      Id: '00000000-0000-0000-0000-000000000000',
      HangMuc: '',
      Dvt: '',
      DonGia: 0,
    };
  }
  selectHM(item: any) {
    this.HangMuc = {
      Id: item.id,
      HangMuc: item.hangMuc,
      Dvt: item.dvt,
      DonGia: item.donGia
    };
    this.docTien();
  }
  selectKH(item: any) {
    this.KhachHang = {
      Id:item.id,
      BenA: item.benA,
      DiaChi: item.diaChi,
      DienThoai: item.dienThoai,
      Mst: item.mst,
      DaiDien: item.daiDien,
      GioiTinh: item.gioiTinh,
      ChucVu: item.chucVu
    };
    this.docTien();
  }

  CreateOrUpdateKH() {
    console.log(this.KhachHang);
    if (this.KhachHang.Id == '00000000-0000-0000-0000-000000000000') {
      this.http.post(environment.baseAPI + 'khachhang', this.KhachHang).subscribe((res) => {
        this.toastr.success('Thêm hạng mục thành công', 'Thông báo');
        this.getAllKH();
        this.Huy();
      })
    }
    else {
      this.http.put(environment.baseAPI + 'khachhang', this.KhachHang).subscribe((res) => {
        this.toastr.success('Sửa hạng mục thành công', 'Thông báo');
        this.getAllKH();
        this.Huy();

      })
    }

  }
  XoaKH(id:any){
    if (confirm("Xóa?")) {
      this.http.delete(environment.baseAPI + 'khachhang/' + id).subscribe((res) => {
        this.toastr.success('Xóa khách hàng mục thành công', 'Thông báo');
        this.getAllKH();
      })
  }}
  HuyKH(){
    this.KhachHang = {
      Id:'00000000-0000-0000-0000-000000000000',
      BenA: '',
      DiaChi: '',
      DienThoai: '',
      Mst: '',
      DaiDien: '',
      GioiTinh: true,
      ChucVu: ''
    }
  }
}
