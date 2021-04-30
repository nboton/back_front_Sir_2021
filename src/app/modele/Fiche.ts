import { ITableau } from "./ITableau";
import { IUser } from "./IUser";
import { Tableau } from "./Tableau";
import { User } from "./User";

export class Fiche {
    private dateButoire:          string
    private libelle:              string
    private lieu:                 string
    private url:                  string
    private noteExplicative:      string
    private delai:                number
    private tags:                 any[]
    private utilisateur:          IUser
    private positionnementFiches: any[]
    private tableau:              Tableau
    constructor(dateButoire:string,libelle:string,lieu:string,url:string,noteExplicative:string,delai:number, tags:any[],
        utilisateur:IUser,positionnementFiches: any[],tableau:Tableau){
        
        this.dateButoire=dateButoire
        this.libelle=libelle
        this.lieu=lieu
        this.url=url
        this.noteExplicative=noteExplicative,
        this.delai=delai,
        this.tags=tags,
        this.utilisateur=utilisateur
        this.positionnementFiches=positionnementFiches
        this.tableau=tableau

    }
  }