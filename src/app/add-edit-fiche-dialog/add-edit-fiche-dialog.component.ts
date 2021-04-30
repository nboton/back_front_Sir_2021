import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFiche } from '../modele/IFiche';
import { ITableau } from '../modele/ITableau';
import { IUser } from '../modele/IUser';

@Component({
  selector: 'app-add-edit-fiche-dialog',
  templateUrl: './add-edit-fiche-dialog.component.html',
  styleUrls: ['./add-edit-fiche-dialog.component.css']
})
export class AddEditFicheDialogComponent implements OnInit {
  add:IFiche;
  ficheForm: FormGroup;
  fiches:any
  errorSms!: string;
  selectedUserId:string='';
  selectedTableauId:number;
  users:any;
  tableaux:any;
  tableau:ITableau;
  user:IUser;
  libelle = new FormControl('', [Validators.required,]);

  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<AddEditFicheDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:IFiche) { }

  ngOnInit(): void {
    this.ficheForm = this.formBuilder.group({
      dateButoire : [ '', Validators.required],
      delai : [ '', Validators.required],
      libelle : [ '', Validators.required],
      lieu : [ '', Validators.required],
      noteExplicative : [ '', Validators.required],
      url : [ '', Validators.required],
      //codeUser : [ '', Validators.required],
      selectedUserId : [ '', Validators.required],
      selectedTableauId: [ '', Validators.required],
      
      });
  }

  onClose(){
  
    this.dialogRef.close();
  }

}
