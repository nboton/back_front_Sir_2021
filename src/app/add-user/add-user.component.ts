import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IFiche } from '../modele/IFiche';
import { IUser } from '../modele/IUser';
import { User } from '../modele/User';
import { UtilisateurService } from '../utilisateur.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title = 'Ajout d\'un utilisateur';
  usersForm:FormGroup;
  fiche:IFiche | undefined;
  ficheSubject=new Subject<IFiche>();
  idFiche:string="";

  constructor(private fb: FormBuilder,
              private userService:UtilisateurService,
              private router:Router,
              private route:ActivatedRoute) {
  
 }
 ngOnInit(): void {
  
   this.initForm();
   
}


  initForm() {
   this.usersForm = this.fb.group({
      codeUser: ['', Validators.required ],
      nom: ['', Validators.required ],
      prenom: ['', Validators.required ],
      email: ['', Validators.required ],

   });
 }
 
 

  onSubmitForm(){
    const code=this.usersForm.get("codeUser").value;
    const nom=this.usersForm.get("nom").value;
    const prenom=this.usersForm.get("prenom").value;
    const email=this.usersForm.get("email").value;
    const user=new User(code,nom,prenom,email,[]);
    //console.log('code:',code," nom:",nom," prenom",prenom, " email",email);
   if (confirm("Do you want to save changes?") == true) {
    this.userService.addUser(user).then(
      (res)=>{
        if (res){
          this.userService.emitUser();
          alert("Enregistrement effectué avec succès");
          this.BackOnList();
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  
  }
  }



  BackOnList() {
    this.router.navigate(['detail-user']);
  
  }

}
