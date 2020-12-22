import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hopdong',
  templateUrl: './hopdong.component.html',
  styleUrls: ['./hopdong.component.css']
})
export class HopdongComponent implements OnInit,AfterViewInit  {
  @ViewChild('myDiv') myDiv!: ElementRef;
  benA: any;
  diaChiA:any;
  dienThoaiA:any;
  mstA:any;
  daiDienA:any;

  benB: any;
  diaChiB:any;
  diaChiThuB:any;
  dienThoaiB:any;
  mstB:any;
  daiDienB:any;
  taiKhoanNH:any;
  tenTaiKhoan:any;
  constructor() { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    console.log(this.myDiv.nativeElement.innerHTML);
}

  Export2Doc(element: any, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>"; 
   var postHtml = "</body></html>";
    var html = preHtml + this.myDiv.nativeElement.innerHTML + postHtml;
    console.log(html);
    
    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

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
}
