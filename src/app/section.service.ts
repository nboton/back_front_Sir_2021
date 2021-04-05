import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISection } from './modele/ISection';
import { Section } from './modele/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sections:ISection;
  sectionSubject=new Subject<ISection>();
  urldomaine:string="/api/section/";
  constructor(private httpclient:HttpClient) { }
/**
 * Permet d'emettre d'émettre la liste afin de pouvoir rafraichir celle-ci dans le component list-section
 */
 
  emitSection(){
    this.getAllSection().subscribe(
      (sects)=>{
        this.sections=sects
        this.sectionSubject.next(this.sections);
      }
    )
  }
/**
 * 
 * @returns La liste des sections
 */
  getAllSection():Observable<ISection>{
    return this.httpclient.get<ISection>(this.urldomaine);
  }
/**
 * Permet de récupérer les infos d'une section données
 * @param idSection 
 * @returns 
 */
  getSection(idSection:number):Observable<ISection>{
    return this.httpclient.get<ISection>(this.urldomaine+idSection);
  }

  /**
   * Permet l'ajout d'une nouvelle section
   * @param section 
   * @returns 
   */

  addSection(section:any):Promise<any>{
    console.log("addsection:",section);
    return this.httpclient.post<Section>(this.urldomaine+"add",section).toPromise();
  }

/**
 * Permet de supprimer une section
 * @param section 
 * @returns 
 */
  deleteSection(section:ISection):Observable<Section>{
    return this.httpclient.delete<Section>(this.urldomaine+"delete/"+section.idSection);
  }
  
  
}


