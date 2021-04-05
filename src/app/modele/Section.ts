export class Section {
   
    libelle:string | undefined;
    tableaux:any[] | undefined;
    positionnementFiches: any[] | undefined;
   
    constructor( libelle:string,tableaux:any[],positionnementFiches: any[]){
    this.libelle=libelle;
    this.tableaux=tableaux;
    this.positionnementFiches=positionnementFiches;
       
    }
      

   
    }