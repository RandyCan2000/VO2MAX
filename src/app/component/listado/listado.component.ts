import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    public DialogRef:MatDialogRef<ListadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String) { }

  ngOnInit(): void {
  }

  public CloseDialog(){
    this.DialogRef.close()
  }



}
