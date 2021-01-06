import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lichsu-pop',
  templateUrl: './lichsuPop.html'
})

export class LichSuPop implements OnInit {
  constructor(private dialog:MatDialogRef<LichSuPop>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() { }
}
