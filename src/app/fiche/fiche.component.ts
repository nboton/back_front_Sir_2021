import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FicheService } from '../fiche.service';
import { Fiche } from '../modele/Fiche';
import { Tableau } from '../modele/Tableau';
import { User } from '../modele/User';
import { AddEditFicheDialogComponent } from '../add-edit-fiche-dialog/add-edit-fiche-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IFiche } from '../modele/IFiche';
import { IUser } from '../modele/IUser';
import { UtilisateurService } from '../utilisateur.service';
import { TableauService } from '../tableau.service';
import { ITableau } from '../modele/ITableau';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
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
  fiche:any;
  edite:boolean;
  //ficheSouscription:Subscription
 
  constructor(private tableauserv:TableauService,private userservice:UtilisateurService, private dialog:MatDialog,private formBuilder: FormBuilder,
    private router: Router,
    private  ficheService: FicheService ) { }

ngOnInit() {
 
this.initForm();
this.LoadFieldForEdition()
       //On souscrit au subject sectionSubject pour récuperer la liste des sections
       this.userservice.utilisateurSubject.subscribe(
        (utili)=>{
            this.users=utili;
            console.log(this.users)
        }
      );
      //On déclenche la souscription
        this.userservice.emitUser();
        
        this.tableauserv.tableauSubject.subscribe(
          (tabs)=>{
              this.tableaux=tabs;
              console.log(this.tableaux)
          }
        );
        //On déclenche la souscription
          this.tableauserv.emitTableau();
}


initForm() {
this.ficheForm = this.formBuilder.group({
dateButoire : [ '', Validators.required],
delai : [ '', Validators.required],
libelle : [ '', Validators.required],
lieu : [ '', Validators.required],
noteExplicative : [ '', Validators.required],
url : [ '', Validators.required],
idFiche : [ '', Validators.required],
selectedUserId : [ '', Validators.required],
selectedTableauId: [ '', Validators.required],

});
}

onSubmitForm() {

  const dateButoire = this.ficheForm.get('dateButoire').value;
  const delai = this.ficheForm.get('delai').value;
  const libelle = this.ficheForm.get('libelle').value;
  const lieu = this.ficheForm.get('lieu').value;
  const noteExplicative = this.ficheForm.get('noteExplicative').value;
  const url = this.ficheForm.get('url').value;
  const selectUserId = this.ficheForm.get('selectedUserId').value;
  const selectedTableauId=this.ficheForm.get('selectedTableauId').value;
  const tableau=this.getTableauById(selectedTableauId)
  const user=this.getUserById(selectUserId)
  const fiche = new Fiche(dateButoire,libelle,lieu,url,noteExplicative,delai,[],user,[],tableau);

//Lorsqu'il s'agit d'une édition, edition est à true
if(this.ficheService.edition){
    //Si modification confirmée 
    if (confirm("Do you want to save changes?") == true) {
    const id = this.ficheForm.get('idFiche').value;
    alert(id);
    this.ficheService.updateFiche(fiche).then(
      (res) => {
      // Lorsque l'ajout a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
      if (res) {
      this.ficheService.emitFiche();
      //alert("Modification effectuée avec succès");
      }
      },
      (error) => {
      console.log(error);
      }
      );
      
      this.BackOnList();
      //Si modification Annulée
    } else {  
        alert("Modification annulée");
    }
//Lorsqu'il s'agit d'un nouvel enregistrement edition=false
}else{
  if (confirm("Do you want to save changes?") == true) {
      this.ficheService.addFiche(fiche).then(
      (res) => {
      // Lorsque l'ajout a été effectué on émet la liste pour rafraichir celle-ci dans le component liste-iche
      if (res) {
      this.ficheService.emitFiche();
      }
      this.BackOnList();
      },
      (error) => {
      console.log(error);
      }
      );
  
      //Si Suppression Annulée
      }else{
        alert("Enregistrement annulé");
      }
      this.router.navigate(['detail-fiche']);
  
  }

}

getUserById(userCode:string):any{
  for(let user of this.users){
    if(user.codeUser==userCode){
    this.user=user
    break
    }else{
      continue
    }
  }
  return this.user;
}
  getTableauById(idTableau:Number):any{
    for(let tableau of this.tableaux){
      if(tableau.idTableau==idTableau){
      this.tableau=tableau
      break
      }else{
        continue
      }
    }
  return this.tableau;
 

}
LoadFieldForEdition(){
  if(this.ficheService.fiche!=undefined){
    this.fiche=this.ficheService.fiche;   
  }else{

    this.fiche ={
                  "idFiche":0,
                  "dateButoire":"",
                  "libelle":"",
                  "lieu":"",
                  "url":"",
                  "noteExplicative":"",
                  "delai":0,
                  "tags":[],
                  "utilisateur":this.user,
                  "positionnementFiches":[],
                  "tableau":this.tableau
                };
  }
}

BackOnList() {
  this.fiche ={
    "idFiche":0,
    "dateButoire":"",
    "libelle":"",
    "lieu":"",
    "url":"",
    "noteExplicative":"",
    "delai":0,
    "tags":[],
    "utilisateur":this.user,
    "positionnementFiches":[],
    "tableau":this.tableau
  };
  
this.router.navigate(['detail-fiche'])
}

}
