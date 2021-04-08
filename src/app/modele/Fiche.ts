import { ITableau } from "./ITableau";
import { IUser } from "./IUser";
import { Tableau } from "./Tableau";

export class Fiche {
   
    constructor( 
        dateButoire:          number,
        libelle:              string,
        lieu:                 string,
        url:                  URL,
        noteExplicative:      string,
        delai:                number,
        tags:                 any[],
        utilisateur:          IUser,
        positionnementFiches: any[],
        tableau:              Tableau){

    }
  }