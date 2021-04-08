import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FicheService } from '../fiche.service';
import { Fiche } from '../modele/Fiche';
import { Tableau } from '../modele/Tableau';
import { User } from '../modele/User';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

  ficheForm: FormGroup;
  fiches:any
  errorSms!: string;
  ficheSouscription:Subscription

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private  ficheService: FicheService ) { }

ngOnInit() {
this.initForm();

}


initForm() {
this.ficheForm = this.formBuilder.group({
dateButoire : [ '', Validators.required],
delai : [ '', Validators.required],
libelle : [ '', Validators.required],
lieu : [ '', Validators.required],
noteExplicative : [ '', Validators.required],
url : [ '', Validators.required],
codeUser : [ '', Validators.required],
});
}

onSubmitForm() {
const dateButoire = this.ficheForm.get('dateButoire').value;
const delai = this.ficheForm.get('delai').value;
const libelle = this.ficheForm.get('libelle').value;
const lieu = this.ficheForm.get('lieu').value;
const noteExplicative = this.ficheForm.get('noteExplicative').value;
const url = this.ficheForm.get('url').value;
const codeUser = this.ficheForm.get('codeUser').value;
const user=new User("u1","nom","prenom","email",[]);
const tableau=new Tableau(1,"tableau1",[],[]);

const fiche = new Fiche(dateButoire,libelle,lieu,url,noteExplicative,delai,[],user,[],tableau);
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
this.router.navigate(['detail-section']);
}



ngOnDestroy(){
  this.ficheSouscription.unsubscribe();
}


BackOnList() {
this.router.navigate(['detail-liste']);


}

}
