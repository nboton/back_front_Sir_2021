import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { User } from '../modele/User';
import { UtilisateurService } from '../utilisateur.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title = 'Ajout d\'un utilisateur';
  userForm: any ;
  constructor(private fb: FormBuilder,private userService:UtilisateurService) {
   this.initForm();
 }


  initForm() {
   this.userForm = this.fb.group({
      codeUser: ['', Validators.required ],
      nom: ['', Validators.required ],
      prenom: ['', Validators.required ],
      email: ['', Validators.required ],

   });
 }
  ngOnInit(): void {
  }

  onSubmitForm(){
    const code=this.userForm.get("userCode").value;
    const nom=this.userForm.get("nom").value;
    const prenom=this.userForm.get("prenom").value;
    const email=this.userForm.get("email").value;
    const user=new User(code,nom,prenom,email);
    this.userService.addUser(user)
  }

}
