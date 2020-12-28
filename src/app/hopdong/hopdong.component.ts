import { environment } from './../../environments/environment';

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
    private http: HttpClient
  ) {}
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
      data: { data: this.data.value, table: this.dataTable },
      disableClose: true,
    });

    dialog.afterClosed().subscribe((res: any) => {
      console.log(res);
      this.dataTable = res.table;
      this.data = this.fb.group({
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
      });

      console.log(res);
      var s = 0;

      for (let i = 0; i < res.table.length; i++) {
        s += res.table[i].ThanhTien;
      }
      this.tong = s;
      this.vat = this.tong * 0.1;
      this.tongAll = this.tong + this.vat;
      this.http
        .get(
          environment.baseAPI +
            'hangmuc/chuyendoitien?number=' +
            String(this.tongAll)
        )
        .subscribe((res: any) => {
          // console.log(res);
          this.tienChu =
            res.tienChu.charAt(0).toUpperCase() + res.tienChu.slice(1);
        });
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
    console.log(html);

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
}
