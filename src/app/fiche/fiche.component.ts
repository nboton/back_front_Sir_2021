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
  users:any;
  tableaux:any
  user:IUser;
  //ficheSouscription:Subscription
 
  constructor(private tableauserv:TableauService,private userservice:UtilisateurService, private dialog:MatDialog,private formBuilder: FormBuilder,
    private router: Router,
    private  ficheService: FicheService ) { }

ngOnInit() {
this.initForm();
       //On souscrit au subject sectionSubject pour récuperer la liste des sections
       this.userservice.utilisateurSubject.subscribe(
        (utili)=>{
            this.users=utili;
            console.log("contenu de sections dans init:",this.users);
        }
      );
      //On déclenche la souscription
        this.userservice.emitUser();
      
        this.tableauserv.tableauSubject.subscribe(
          (tabs)=>{
              this.tableaux=tabs;
              console.log("contenu de sections dans init:",this.tableaux);
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
//codeUser : [ '', Validators.required],
//selectedUserId : [ '', Validators.required],

});
}

onSubmitForm() {
const dateButoire = this.ficheForm.get('dateButoire').value;
const delai = this.ficheForm.get('delai').value;
const libelle = this.ficheForm.get('libelle').value;
const lieu = this.ficheForm.get('lieu').value;
const noteExplicative = this.ficheForm.get('noteExplicative').value;
const url = this.ficheForm.get('url').value;
//const codeUser = this.ficheForm.get('codeUser').value;
//const selectUserId = this.ficheForm.get('selectedUserId').value;
const user=this.users[0];
console.log("l'utilisateur1",user)
//const user=new User("u1","nom","prenom","email",[]);
const tableau=new Tableau(1,"tableau1",[],[]);
//const user=this.getUserById(selectUserId)
const fiche = new Fiche(dateButoire,libelle,lieu,url,noteExplicative,delai,[],user,[],tableau);

//alert(user);
console.log('Nouvelle Fiche à renregistrer',dateButoire,"--",delai,"--",libelle,"--",lieu,"--",noteExplicative,"--",url,"--",user,"--",tableau);
this.ficheService.addFiche(fiche).then(
(res) => {
// Lorsque l'ajout a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
if (res) {
this.ficheService.emitFiche();
}
this.BackOnList();
},
(error) => {
console.log(error);
}
);
this.router.navigate(['detail-fiche']);
}


importFile(fiche:IFiche){
  const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="250px"
    dialogConfig.width="500px"
   
    dialogConfig.data =fiche;
    
    const dialogRef = this.dialog.open(AddEditFicheDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {     
     
      //this.artefactServce.setXMLFile(result)
      
    });
}

getUserById(userCode:string):any{
  
  this.userservice.getUser(userCode).subscribe(data=> {
    this.user=data
 // alert(this.user.nom+" "+this.user.prenom)
  });
 // alert(this.user.nom+ ""+this.user.prenom);
  return this.user;

  

}



BackOnList() {
this.router.navigate(['detail-fiche'])
}

}
