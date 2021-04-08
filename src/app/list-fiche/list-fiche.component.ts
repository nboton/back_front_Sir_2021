import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FicheService } from '../fiche.service';

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {

 
  fiches:any
  errorSms!: string;
  ficheSouscription:Subscription

  constructor(private router: Router,
    private  ficheService: FicheService ) { }

ngOnInit() {
//On souscrit au subject sectionSubject pour récuperer la liste des sections
this.ficheSouscription=this.ficheService.ficheSubject.subscribe(
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

ngOnDestroy(){
  this.ficheSouscription.unsubscribe();
}

















BackOnList() {
this.router.navigate(['detail-section']);


}

}


