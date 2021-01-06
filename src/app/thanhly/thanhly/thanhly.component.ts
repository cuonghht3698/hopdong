import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunService } from 'src/app/service/fun';
import { LichSuService } from 'src/app/service/lichsu.s';

@Component({
  selector: 'app-thanhly',
  templateUrl: './thanhly.component.html',
  styleUrls: ['./thanhly.component.css']
})
export class ThanhlyComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,private ls:LichSuService, private fun:FunService){}
  data:any;
  tongChiPhi:number = 0;
  thueVAT:number = 0;
  tongAll:number = 0;
  doctien:string = '';
  checkNKT:boolean = false;
  ngayKetThuc = {
    ngay:0,
    thang:0,
    nam:0
  }
  ngOnInit(): void {
    this.getHopDong();
  }
  getHopDong(){
    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.ls.GetbyId(id).subscribe((res:any)=>{
      this.data = res[0];
      console.log(res[0]);

      res[0].chiTietLichSus.forEach((e:any) => {
        this.tongChiPhi += (e.soLuong * e.thanhTien);
      });
      this.thueVAT = this.tongChiPhi * 0.1;
      this.tongAll = this.tongChiPhi + this.thueVAT;
      this.doctien = this.fun.DocTien(this.tongAll);
    });
  }
}
