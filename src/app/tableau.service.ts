import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITableau } from './modele/ITableau';
import { Tableau } from './modele/Tableau';

@Injectable({
  providedIn: 'root'
})
export class TableauService {
  tableaux!:ITableau;
  tableauSubject=new Subject<ITableau>();
  constructor(private httpclient:HttpClient) { }

  emitTableau(){
    this.getAllTableau().subscribe(
      (tabs)=>{
        this.tableaux=tabs
        this.tableauSubject.next(this.tableaux);
      }
    )
  }

  getAllTableau():Observable<ITableau>{
    return this.httpclient.get<ITableau>("/api/fiche/");
  }

  getTableau(idTableau:number):Observable<ITableau>{
    return this.httpclient.get<ITableau>("/api/fiche/"+idTableau);
  }

  deleteTableau(idTableau:number):Observable<ITableau>{
    console.log("url de supression:/api/fiche/delete/"+idTableau);
    return this.httpclient.delete<ITableau>("/api/fiche/delete/"+idTableau);
  }


  /*addUse(user):Promise<any>{
    return this.httpclient.post<IUser>("/api/utilisateur/add",user).toPromise();
  }
  /*setUser(id:string):Observable<PokeDetail>{
    return this.httpclient.get<PokeDetail>(url+id+"/");
  }*/
  addTableau(tableau:Tableau): Observable<ITableau> {
    return this.httpclient.post<ITableau>("/api/taleau/add",tableau);
}
}


