import { IFiche } from "./IFiche";

export class User {
  codeUser: string;
  nom:      string;
  prenom:   string;
  email:    string;
  fiches:   IFiche[];
   
    constructor( codeUser: string,nom:string,prenom:string, email:string, fiches: IFiche[] ){
        this.codeUser=codeUser;
        this.nom=nom;
        this.prenom=prenom;
        this.email=email;
        this.fiches=fiches;

    }
  }