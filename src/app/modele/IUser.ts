import { IFiche } from "./IFiche";

export interface IUser {
  codeUser: string;
  nom:      string;
  prenom:   string;
  email:    string;
  fiches:   IFiche[];
}


