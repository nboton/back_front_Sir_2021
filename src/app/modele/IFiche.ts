import { ITableau } from "./ITableau";
import { IUser } from "./IUser";
import { User } from "./User";

export interface IFiche {
  idFiche:              number;
  dateButoire:          number;
  libelle:              string;
  lieu:                 String;
  url:                  URL;
  noteExplicative:      string;
  delai:                number;
  tags:                 any[];
  utilisateur:          IUser;
  positionnementFiches: any[];
  tableau:              ITableau;
  }