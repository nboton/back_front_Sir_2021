import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddEditFicheDialogComponent } from '../add-edit-fiche-dialog/add-edit-fiche-dialog.component';
import { FicheService } from '../fiche.service';
import { Fiche } from '../modele/Fiche';
import { IFiche } from '../modele/IFiche';
import { IUser } from '../modele/IUser';
import { User } from '../modele/User';
import { TableauService } from '../tableau.service';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
  fiches:any
  fiche:any;
  errorSms!: string;
  user:User;
  users:any;
  tableaux:any;
  submitted: boolean;
  ficheDialog: boolean;
  selectedUser:User;

  
  constructor(private tableauserv:TableauService,private utilisateurService:UtilisateurService, private dialog:MatDialog,private router: Router,
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

    //Charger les utilisateur
    this.utilisateurService.utilisateurSubject.subscribe(
        (utili)=>{
            this.users=utili;
            console.log("contenu de sections dans init:",this.users);
        }
    );
    //On déclenche la souscription
        this.utilisateurService.emitUser();
    //Charger les tableaux
    this.tableauserv.tableauSubject.subscribe(
        (tabs)=>{
            this.tableaux=tabs;
        }
    );
    //On déclenche la souscription
        this.tableauserv.emitTableau();
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

//**** */
openNew() {
    this.fiche ={};
    this.submitted = false;
    this.ficheDialog = true;
}

/**Edition de fiche */
editFiche(fiche: Fiche) {
    this.fiche = {...fiche};
    this.ficheDialog = true;
}

/**Delete produit */
deleteFiche(fiche: IFiche) {
    this.ficheService.deleteFiche(fiche.idFiche).subscribe(
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

/**Hide Dialog */
hideDialog() {
    this.ficheDialog = false;
    this.submitted = false;
}

saveFiche() {
    this.submitted = true;

    /*if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }*/
}

}

