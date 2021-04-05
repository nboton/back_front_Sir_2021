import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser} from './modele/IUser';
import { User } from './modele/User';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  utilisateurs:IUser;
  utilisateurSubject=new Subject<IUser>();
  constructor(private httpclient:HttpClient) { }

  emitUser(){
    this.getAllUsers().subscribe(
      (users)=>{
        this.utilisateurs=users
        this.utilisateurSubject.next(this.utilisateurs);
      }
    )
  }

  getAllUsers():Observable<IUser>{
    return this.httpclient.get<IUser>("/api/utilisateur/");
  }

  getUser(code:string):Observable<IUser>{
    return this.httpclient.get<IUser>("/api/utilisateur/"+code);
  }

  deleteUser(code:string):Observable<IUser>{
    console.log("url de supression:/api/utilisateur/delete/"+code);
    return this.httpclient.delete<IUser>("/api/utilisateur/delete/"+code);
  }

  addUser(user:User): Promise<IUser> {
    console.log("l'objet adduser issu du form:",user)
    return this.httpclient.post<IUser>("/api/utilisateur/add", user).toPromise();
  }
}
