import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser} from './modele/IUser';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

utilisateurSubject=new Subject<IUser>();


  constructor(private httpclient:HttpClient) { }


  getAllUsers():Observable<IUser>{
    return this.httpclient.get<IUser>("/api/utilisateur/");
  }

 
}
