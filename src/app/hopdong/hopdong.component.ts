import { FunService } from './../service/fun';
import { LichSuService } from './../service/lichsu.s';
import { ChiTietLichSu, Guid, LichSuModel } from './../models/lichsu.model';
import { environment } from './../../environments/environment';
import * as moment from 'moment';
import { HopDongPopup } from './popup/hopdop.popup';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QuanLyPopUp } from './popupQL/quanly.popup';

@Component({
  selector: 'app-hopdong',
  templateUrl: './hopdong.component.html',
  styleUrls: ['./hopdong.component.css'],
})
export class HopdongComponent implements OnInit, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private ls: LichSuService,
    private docso:FunService
  ) { }

  dataAll: any;
  data!: FormGroup;
  dateNow!: Date;
  dataTable: any[] = [];
  tong: number = 0;
  vat: number = 0;
  tongAll = this.tong + this.vat;
  tienChu = '';
  @ViewChild('myDiv') myDiv!: ElementRef;

  ngOnInit(): void {
    this.dateNow = new Date();
    this.data = this.fb.group({
      soHD:'',
      ngayKy: new Date(),
      soTK:'',
      maKH:'',
      soHopDong:'',
      benA: '',
      diaChiA: '',
      dienThoaiA: '',
      mstA: '',
      daiDienA: '',
      diaDiem: '',
      gioiTinh: '1',
      chucVu: '',
      timeThucHien: new Date(),
      timeLapDat: '',
      tenCT:''
    });
    // this.OpenPopup();
    // this.OpenQL();
  }
  ngAfterViewInit() {
    // console.log(this.myDiv.nativeElement.innerHTML);
  }

  OpenPopup() {
    const dialog = this.dialog.open(HopDongPopup, {
      width: '95%',
      height: '90%',
      data: { data: this.data.value, table: this.dataTable},
      disableClose: true,
    });

    dialog.afterClosed().subscribe((res: any) => {
      // console.log(res);
      this.dataAll = res;
      this.dataTable = res.table;
      this.data = this.fb.group({
        soHD: res.data.soHD,
        ngayKy: res.data.ngayKy,
        soTK: res.data.soTK,
        benA: res.data.benA,
        diaChiA: res.data.diaChiA,
        dienThoaiA: res.data.dienThoaiA,
        mstA: res.data.mstA,
        gioiTinh: res.data.gioiTinh,
        chucVu: res.data.chucVu,
        daiDienA: res.data.daiDienA,
        diaDiem: res.data.diaDiem,
        timeThucHien: res.data.timeThucHien,
        timeLapDat: res.data.timeLapDat,
        tenCT: res.data.tenCT,
      });
      this.dateNow = res.dateNow;
      // console.log(res);
      var s = 0;

      for (let i = 0; i < res.table.length; i++) {
        s += res.table[i].ThanhTien;
      }
      this.tong = s;
      this.vat = this.tong * 0.1;
      this.tongAll = this.tong + this.vat;
      this.tienChu = this.docso.DocTien(this.tongAll);

    });
  }
  OpenQL() {
    const dialog1 = this.dialog.open(QuanLyPopUp, {
      width: '100%',
      height: '90%',
      disableClose: true,
    });
  }
  Export2Doc(element: any, filename = '') {
    var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title>
    <style>
    .footer{
      display: flex;
      flex-direction: row;
      width: 100%;
      text-align: center;
    }

    .bena{
      /* background-color: aqua; */
    }
    .benb{
      /* background-color: red; */
    }
    .footer div{
      width: 50%;
    }
    .footer div strong{
      width: 100%;
    }

    </style>
    </head><body>`;
    var postHtml = '</body></html>';
    var html = preHtml + this.myDiv.nativeElement.innerHTML + postHtml;
    // console.log(html);

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    });

    // Specify link url
    var url =
      'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  // convert so sang chữ


  // LICH SU HOP DONG

  CtLichSu: ChiTietLichSu = {
    Id: Guid.Empty,
    DonGia: 0,
    Dvt: '',
    HangMuc: '',
    LichSuId: Guid.Empty,
    SoLuong: 0,
    ThanhTien: 0,
  }
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
    NgayTao: moment().format(),
    ThoiGianLapDat: '',
    ThoiGianThucHien: moment().format(),
    Tong: 0,
    Vat: 0,
    soHD:'',
    maKH:'',
    ngayKy: new Date(),
    soTK:'',
    tenCT:'',
    ChiTiet: Array<ChiTietLichSu>()
  }


  CreateLSHopDong() {
    // console.log(this.dataAll);
    this.lichsu = {
      BenA: this.dataAll.data.benA,
      ChucVu: this.dataAll.data.chucVu,
      DaiDien: this.dataAll.data.daiDienA,
      DiaChi: this.dataAll.data.diaChiA,
      DiaDienTrinhDien: this.dataAll.data.diaDiem,
      DienThoai: this.dataAll.data.dienThoaiA,
      GiaTriHopDong: this.tongAll,
      GioiTinh: this.dataAll.data.gioiTinh == "1" ? true : false,
      Id: Guid.Empty,
      Mst: this.dataAll.data.mstA,
      NgayTao: moment().format(),
      ThoiGianLapDat: this.dataAll.data.timeLapDat,
      ThoiGianThucHien: moment(this.dataAll.data.timeThucHien).format(),
      Tong: this.tong,
      Vat: this.vat,
      soHD: this.dataAll.data.soHD,
      maKH :this.dataAll.data.maKH,
      ngayKy:this.dataAll.data.ngayKy,
      soTK: this.dataAll.data.soTK,
      tenCT:this.dataAll.data.tenCT,
      ChiTiet: Array<ChiTietLichSu>()
    }

    this.dataAll.table.forEach((item: any) => {
      this.lichsu.ChiTiet.push(Object.assign(item, { Id: Guid.Empty, LichSuId: Guid.Empty }))
    });
    console.log(this.lichsu);

    this.ls.Create(this.lichsu).subscribe((res) => {
      // console.log(res);

    })
  }
}
