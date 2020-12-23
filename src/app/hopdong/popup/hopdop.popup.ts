import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $:any;
@Component({
    selector: 'hopdong-popup',
    templateUrl: './hopdong.popup.html'
})

export class HopDongPopup implements OnInit {
    constructor(private dialog: MatDialogRef<HopDongPopup>, @Inject(MAT_DIALOG_DATA) public ob: any) { }
    checkUpdate!:true;
    openCreate?:boolean = false;
    ngOnInit() {
        // console.log(this.ob);
        $( document ).ready(function() {
            
        });

    }
    Close() {
        
        this.dialog.close(this.ob);
    }

    addData =
        {
            Stt: this.ob.table.length +1,
            HangMuc: '',
            Dvt: '',
            DonGia: 0,
            SoLuong: 0,
            ThanhTien: 0
        }
    AddRow() {
        this.openCreate = !this.openCreate;;
    }
    Auto(){
        this.addData.ThanhTien = this.addData.SoLuong  * this.addData.DonGia;
    }
    Them(){
       // this.addData.ThanhTien = this.addData.SoLuong  * this.addData.DonGia;
       this.ob.table.push(this.addData);
       this.addData = {
        Stt: this.ob.table.length +1,
        HangMuc: '',
        Dvt: '',
        DonGia: 0,
        SoLuong: 0,
        ThanhTien: 0
       };
    }

    Sua(stt:any){

    }
}