import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddEditFicheDialogComponent } from '../add-edit-fiche-dialog/add-edit-fiche-dialog.component';
import { FicheService } from '../fiche.service';
import { IFiche } from '../modele/IFiche';

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {

 
  fiches:any
  fiche:IFiche
  errorSms!: string;
  
  constructor(private dialog:MatDialog,private router: Router,
    private  ficheService: FicheService ) { }

ngOnInit() {
//On souscrit au subject sectionSubject pour récuperer la liste des sections
this.ficheService.ficheSubject.subscribe(
  (fichs)=>{
      this.fiches=fichs;
      console.log("contenu de la fiche dans init:",this.fiches);
  }
);
//On déclenche la souscription
  this.ficheService.emitFiche();
}


onRemove(fiche:any){
  this.ficheService.deleteFiche(fiche).subscribe(
    (res) => {
      // Lorsque la suppression a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
      if (res) {
        this.ficheService.emitFiche();
      }
    },
    (error) => {
      console.log(error);
    }
      );
      this.fiches=this.fiches.filter(val=>fiche.idFiche!=val.idFiche );
 //this.router.navigate(['detail-section']);

}

importFile(fiche:IFiche){
  const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="250px"
    dialogConfig.width="500px"
   
    dialogConfig.data =fiche;
    console.log(dialogConfig.data.idFiche)
    const dialogRef = this.dialog.open(AddEditFicheDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {     
     
      //this.artefactServce.setXMLFile(result)
      
    });
    
    console.log(typeof(fiche));
}






BackOnList() {
this.router.navigate(['detail-fiche']);


}

}


