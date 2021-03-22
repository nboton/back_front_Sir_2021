import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})


export class UtilisateurComponent implements OnInit {
  displayedColumns = ['codeUser', 'nom', 'prenom', 'email','action'];
  dataSource:any;

  constructor(private utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
    //this.dataSource=this.utilisateurService.ELEMENT_DATA;
      this.utilisateurService.getAllUsers().subscribe(data =>
        {
          console.log("Voici la liste des utilisateur:",data)
         
          this.dataSource=data
          console.log("Voici la data source:",this.dataSource)

        })
  }

  addUser(){
    
    
  }

}
