import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hnid-confirm-dialog',
  templateUrl: './hnid-confirm-dialog.component.html',
  styleUrls: ['./hnid-confirm-dialog.component.scss']
})
export class HnidConfirmDialogComponent implements OnInit {

  prompt: string;

  constructor(
    private dialogRef: MatDialogRef<HnidConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) { 

    this.prompt = data.prompt;
  }  

  ngOnInit(): void {
  }

  proceed() {
    this.dialogRef.close(1);
  }

  close() {
    this.dialogRef.close();
  }

}
