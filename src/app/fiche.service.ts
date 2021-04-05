import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Fiche } from './modele/Fiche';
import { IFiche } from './modele/IFiche';

@Injectable({
  providedIn: 'root'
})
export class FicheService {
  fiches:IFiche;
  ficheSubject=new Subject<IFiche>();
  constructor(private httpclient:HttpClient) { }

  emitFiche(){
    this.getAllFiche().subscribe(
      (fichs)=>{
        this.fiches=fichs
        this.ficheSubject.next(this.fiches);
      }
    )
  }

  getAllFiche():Observable<IFiche>{
    return this.httpclient.get<IFiche>("/api/fiche/");
  }

  getFiche(idFiche:number):Observable<IFiche>{
    return this.httpclient.get<IFiche>("/api/fiche/"+idFiche);
  }

  deleteFiche(idFiche:number):Observable<IFiche>{
    console.log("url de supression:/api/fiche/delete/"+idFiche);
    return this.httpclient.delete<IFiche>("/api/fiche/delete/"+idFiche);
  }


  /*addUse(user):Promise<any>{
    return this.httpclient.post<IUser>("/api/utilisateur/add",user).toPromise();
  }
  /*setUser(id:string):Observable<PokeDetail>{
    return this.httpclient.get<PokeDetail>(url+id+"/");
  }*/
  addFiche(fiche:Fiche): Observable<IFiche> {
    return this.httpclient.post<IFiche>("/api/fiche/add", fiche);
}
}
