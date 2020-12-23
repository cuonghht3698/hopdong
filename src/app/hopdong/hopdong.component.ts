
import { HopDongPopup } from './popup/hopdop.popup';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hopdong',
  templateUrl: './hopdong.component.html',
  styleUrls: ['./hopdong.component.css']
})
export class HopdongComponent implements OnInit,AfterViewInit  {
  constructor(private dialog:MatDialog,private fb:FormBuilder) { }
   data!: FormGroup;
   dateNow!: Date;
   dataTable:any[] = [];
  @ViewChild('myDiv') myDiv!: ElementRef;

  

  
  ngOnInit(): void {

    this.dateNow = new Date();
    this.data = this.fb.group({
      benA:'',
      diaChiA:'',
      dienThoaiA:'',
      mstA:'',
      daiDienA:'',
      diaDiem:'',
      timeThucHien: new Date(),
      timeLapDat:new Date()
    })
      this.OpenPopup();
  }
  ngAfterViewInit() {
    // console.log(this.myDiv.nativeElement.innerHTML);
}


OpenPopup(){
  const dialog = this.dialog.open(HopDongPopup,{
    width: '90%',
    height: '600px',
    data: {data:this.data.value,table:this.dataTable},
    disableClose:true
  })

  dialog.afterClosed().subscribe((res:any)=>{
    // console.log(res);
    
    this.dataTable = res.table;
    this.data = this.fb.group({
      benA:res.benA,
      diaChiA:res.diaChiA,
      dienThoaiA:res.dienThoaiA,
      mstA:res.mstA,
      daiDienA:res.daiDienA,
      diaDiem:res.diaDiem,
      timeThucHien: new Date(),
      timeLapDat:new Date()
    })
  })
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
