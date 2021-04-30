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
  url="/api/fiche/";
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
    return this.httpclient.get<IFiche>(this.url);
  }

  getFiche(idFiche:number):Observable<IFiche>{
    return this.httpclient.get<IFiche>(this.url+idFiche);
  }

  deleteFiche(idFiche:number):Observable<IFiche>{
    return this.httpclient.delete<IFiche>(this.url+"delete/"+idFiche);
  }


  addFiche(fiche:Fiche): Promise<any> {
    return this.httpclient.post<Fiche>(this.url+"add", fiche).toPromise();
}
}
