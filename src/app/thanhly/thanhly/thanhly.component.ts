import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LichSuService } from 'src/app/service/lichsu.s';

@Component({
  selector: 'app-thanhly',
  templateUrl: './thanhly.component.html',
  styleUrls: ['./thanhly.component.css']
})
export class ThanhlyComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,private ls:LichSuService){}

  ngOnInit(): void {

    this.getHopDong();
  }
  getHopDong(){
    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.ls.GetbyId(id).subscribe((res)=>{
      console.log(res);

    })
  }
}
