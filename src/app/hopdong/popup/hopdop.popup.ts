import { FunService } from './../../service/fun';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
    selector: 'hopdong-popup',
    templateUrl: './hopdong.popup.html',

})

export class HopDongPopup implements OnInit {
    constructor(private dialog: MatDialogRef<HopDongPopup>, @Inject(MAT_DIALOG_DATA) public ob: any, private http: HttpClient, private toastr: ToastrService, private doctien: FunService) { }
    checkUpdate: boolean = false;
    openCreate?: boolean = false;
    dsDanhMuc: any;
    showTienChu: any;
    dsKhachHang: any;
    doitacmoi: boolean = false;
    seacrh: any = { dienThoai: '' };
    seacrh1: any = { hangMuc: '' };

    ngOnInit() {
        this.getAllKH();
        this.getAllHM();
        console.log(this.ob);


    }
    Close() {

        this.dialog.close(this.ob);
    }

    addData =
        {
            Stt: this.ob.table.length + 1,
            HangMuc: '',
            Dvt: '',
            DonGia: 0,
            SoLuong: 1,
            ThanhTien: 0
        }
    AddRow() {

        this.openCreate = !this.openCreate;
    }
    Auto() {
        if (this.addData.DonGia >= 0)
        this.showTienChu = this.doctien.DocTien(this.addData.DonGia);
    else
        this.showTienChu = 'Không ';
        this.addData.ThanhTien = this.addData.SoLuong * this.addData.DonGia;
    }
    Them() {
        // this.addData.ThanhTien = this.addData.SoLuong  * this.addData.DonGia;
        if (this.addData.HangMuc == '' || this.addData.Dvt == '' || this.addData.Stt == null || this.addData.DonGia == 0 || this.addData.SoLuong == 0) {
            this.toastr.error("Các mục không được để trống!", "Thông báo!");
            return;
        }
        this.ob.table.push(this.addData);
        // console.log(this.ob.table);

        this.checkUpdate = false;
        this.addData = {
            Stt: this.ob.table.length + 1,
            HangMuc: '',
            Dvt: '',
            DonGia: 0,
            SoLuong: 1,
            ThanhTien: 0
        };
        this.showTienChu = 'Không';
        this.toastr.success('Thêm hạng mục thành công!', 'Thông báo!');
    }

    Sua(stt: any) {

    }
    checkdoitac() {
        var data = {
            Id: '00000000-0000-0000-0000-000000000000',
            maKh:'',
            BenA: this.ob.data.benA,
            DiaChi: this.ob.data.diaChiA,
            DienThoai: this.ob.data.dienThoaiA,
            Mst: this.ob.data.mstA,
            DaiDien: this.ob.data.daiDienA,
            GioiTinh: this.ob.data.gioiTinh == "1" ? true : false,
            ChucVu: this.ob.data.chucVu
        }
        this.http.post(environment.baseAPI + 'khachhang/checkdoitac', data).subscribe((res: any) => {
            this.doitacmoi = true;
        }, error => {
            this.doitacmoi = false;
        })
    }
    getAllKH() {
        this.http.get(environment.baseAPI + 'khachhang/getAll').subscribe((res: any) => {
            console.log(res);
            this.dsKhachHang = res;
        })
    }
    getAllHM() {
        this.http.get(environment.baseAPI + 'hangmuc/getAll').subscribe((res: any) => {
            // console.log(res);
            this.dsDanhMuc = res;
        })
    }
    Select(item: any) {
        // console.log(item);
            this.ob.data.maKh = item.maKh,


            this.ob.data.benA = item.benA,

            this.ob.data.diaChiA = item.diaChi,

            this.ob.data.dienThoaiA = item.dienThoai,

            this.ob.data.chucVu = item.chucVu,

            this.ob.data.mstA = item.mst,

            this.ob.data.gioiTinh = item.gioiTinh ? "1" : "0",

            this.ob.data.daiDienA = item.daiDien

        this.doitacmoi = false;
    }
    DoiTacMoi() {

        var data = {
            Id: '00000000-0000-0000-0000-000000000000',
            maKh: this.ob.data.maKh,
            BenA: this.ob.data.benA,
            DiaChi: this.ob.data.diaChiA,
            DienThoai: this.ob.data.dienThoaiA,
            Mst: this.ob.data.mstA,
            DaiDien: this.ob.data.daiDienA,
            GioiTinh: this.ob.data.gioiTinh == "1" ? true : false,
            ChucVu: this.ob.data.chucVu
        }
        console.log(data);
        this.http.post(environment.baseAPI + 'khachhang', data).subscribe((res) => {
            this.toastr.success('Luu đối tác thành công', 'Thông báo');
        }, (err) => {
            this.toastr.error("Đối tác đã có trong hệ thống!", 'Thông báo');

        });
        this.doitacmoi = false;
    }
    SelectHM(item: any) {
        // console.log(item);
        this.addData =
        {
            Stt: this.ob.table.length + 1,
            HangMuc: item.hangMuc,
            Dvt: item.dvt,
            DonGia: item.donGia,
            SoLuong: 1,
            ThanhTien: item.donGia
        }
        if (this.addData.DonGia >= 0)
            this.showTienChu = this.doctien.DocTien(this.addData.DonGia);
        else
            this.showTienChu = 'Không ';
        this.checkUpdate = false;

    }

    Xoa(item: any) {
        // this.ob.data.
        var apps = this.ob.table;

        // get index of object with id:37
        var removeIndex = apps.map(function (item1: any) { return item1.Stt; }).indexOf(item.Stt);

        // remove object
        this.ob.table.splice(removeIndex, 1);
    }

}
