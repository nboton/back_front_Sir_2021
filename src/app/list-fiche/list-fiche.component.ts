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
  value: Date

  
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

}


BackOnList() {
 // this.ficheService.fiche=null;
  this.ficheService.edition=false;
  this.router.navigate(['fiche']);

}

/**Edition de fiche */
editFiche(fiche: IFiche) {
   this.ficheService.fiche=fiche;
   this.ficheService.edition=true;
   this.router.navigate(['fiche']);
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
}

}

