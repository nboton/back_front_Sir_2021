import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './utilisateur/Domaine/user';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  constructor(private httpclient:HttpClient) { }


  getUsers():Observable<User>{
    return this.httpclient.get<User>("/api/utilisateur/");
  }

  /*setUser(id:string):Observable<PokeDetail>{
    return this.httpclient.get<PokeDetail>(url+id+"/");
  }*/
}
