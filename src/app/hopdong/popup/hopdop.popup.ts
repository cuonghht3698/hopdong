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
    constructor(private dialog: MatDialogRef<HopDongPopup>, @Inject(MAT_DIALOG_DATA) public ob: any, private http: HttpClient, private toastr: ToastrService) { }
    checkUpdate: boolean = false;
    openCreate?: boolean = false;
    dsDanhMuc: any;
    showTienChu: any;
    dsKhachHang: any;
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
        if (this.addData.DonGia > 0)
            this.http.get(environment.baseAPI + "hangmuc/chuyendoitien?number=" + String(this.addData.DonGia)).subscribe((res: any) => {
                // console.log(res);
                this.showTienChu = res.tienChu.charAt(0).toUpperCase() + res.tienChu.slice(1);;
            })
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
        this.showTienChu = '';
        this.toastr.success('Thêm hạng mục thành công!', 'Thông báo!');
    }

    Sua(stt: any) {

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

        this.ob.data.benA = item.benA,

            this.ob.data.diaChiA = item.diaChi,

            this.ob.data.dienThoaiA = item.dienThoai,

            this.ob.data.chucVu = item.chucVu,

            this.ob.data.mstA = item.mst,

            this.ob.data.gioiTinh = item.gioiTinh ? "1" : "0",

            this.ob.data.daiDienA = item.daiDien


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
        if (this.addData.DonGia > 0)
        this.http.get(environment.baseAPI + "hangmuc/chuyendoitien?number=" + String(this.addData.DonGia)).subscribe((res: any) => {
            // console.log(res);
            this.showTienChu = res.tienChu.charAt(0).toUpperCase() + res.tienChu.slice(1);;
        })
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
