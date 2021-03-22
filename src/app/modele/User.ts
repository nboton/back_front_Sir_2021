import { IFiche } from "./IFiche";

export class User {
   
    constructor( private codeUser: string,private nom:string,private prenom:string, 
        private email:string ){

    }
  }