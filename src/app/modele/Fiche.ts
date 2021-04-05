import { ITableau } from "./ITableau";
import { IUser } from "./IUser";

export class Fiche {
   
    constructor( idFiche:     number,
        dateButoire:          number,
        libelle:              string,
        lieu:                 string,
        url:                  URL,
        noteExplicative:      string,
        delai:                number,
        tags:                 any[],
        utilisateur:          IUser,
        positionnementFiches: any[],
        tableau:              ITableau){

    }
  }