import { ITableau } from "./ITableau";
import { IUser } from "./IUser";
import { User } from "./User";

export interface IFiche {
  idFiche:              number;
  dateButoire:          string;
  libelle:              string;
  lieu:                 String;
  url:                  string;
  noteExplicative:      string;
  delai:                number;
  tags:                 any[];
  utilisateur:          IUser;
  positionnementFiches: any[];
  tableau:              ITableau;
  }