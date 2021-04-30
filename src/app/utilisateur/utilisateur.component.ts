import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../modele/IUser';
import { UtilisateurService } from '../utilisateur.service';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})


export class UtilisateurComponent implements OnInit {
  userSouscription:Subscription;
  users:any;

  constructor(private utilisateurService:UtilisateurService, private router:Router) { }

  ngOnInit(): void {
          //On souscrit au subject sectionSubject pour récuperer la liste des sections
    this.userSouscription=this.utilisateurService.utilisateurSubject.subscribe(
      (utili)=>{
          this.users=utili;
          console.log("contenu de sections dans init:",this.users);
      }
    );
    //On déclenche la souscription
      this.utilisateurService.emitUser();
     
  }

  BackOnAdd(){
    this.router.navigate(['user']);
  
  }
  onRemove(user:any){
    //let resp=confirm("Are you sure you want to do that?");  
    //if(resp){
        this.utilisateurService.deleteUser(user).subscribe(
          (res) => {
            // Lorsque la suppression a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
            if (res) {

              this.utilisateurService.emitUser();
             
            }
          },
          (error) => {
            console.log(error);
          }
            );
          this.users=this.users.filter(val=>user.codeUser!=val.codeUser);
         
    }
  //}

  ngOnDestroy(){
    this.userSouscription.unsubscribe();
  }
}
