import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FicheComponent } from './fiche/fiche.component';
import { TableauComponent } from './tableau/tableau.component';
import { SectionComponent } from './section/section.component';
import { ListSectionComponent } from './list-section/list-section.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { ListFicheComponent } from './list-fiche/list-fiche.component';
import { AddEditFicheDialogComponent } from './add-edit-fiche-dialog/add-edit-fiche-dialog.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



const appRoutes: Routes = [
  { path: 'section', component: SectionComponent },
  { path: 'fiche', component: FicheComponent },
  { path: 'tableau', component: TableauComponent },
  { path: 'user', component: AddUserComponent },
  {path:"detail-section", component:ListSectionComponent},
  {path:"detail-fiche", component:ListFicheComponent},
  {path:"detail-user", component:UtilisateurComponent},
  
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    UtilisateurComponent,
    AddUserComponent,
    FicheComponent,
    TableauComponent,
    SectionComponent,
    ListSectionComponent,
    HeaderComponent,
    ListFicheComponent,
    AddEditFicheDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    DropdownModule,
    CalendarModule
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEditFicheDialogComponent
  ],
})
export class AppModule { }
