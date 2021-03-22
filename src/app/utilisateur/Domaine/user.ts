export interface User {
  codeUser: string;
  nom:      string;
  prenom:   string;
  email:    string;
  fiches:   Fich[];
}

export interface Fich {
  idFiche:              number;
  dateButoire:          number;
  libelle:              string;
  lieu:                 string;
  url:                  URL;
  noteExplicative:      string;
  delai:                number;
  tags:                 any[];
  positionnementFiches: any[];
  tableau:              null;
}
