import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { ISection } from '../modele/ISection';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.css']
})
export class ListSectionComponent implements OnInit {

  sections:any;
  sectionSouscription:Subscription;

  constructor(private sectionService:SectionService,private router:Router) { }

  ngOnInit(): void {
    //On souscrit au subject sectionSubject pour récuperer la liste des sections
    this.sectionSouscription=this.sectionService.sectionSubject.subscribe(
      (sects)=>{
          this.sections=sects;
          console.log("contenu de sections dans init:",this.sections);
      }
    );
    //On déclenche la souscription
      this.sectionService.emitSection();
     
  }

  onRemove(section:any){
    this.sectionService.deleteSection(section).subscribe(
      (res) => {
        // Lorsque la suppression a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
        if (res) {
          this.sectionService.emitSection();
        }
      },
      (error) => {
        console.log(error);
      }
        );
        this.sections=this.sections.filter(val=>section.idSection!=val.idSection );
   //this.router.navigate(['detail-section']);

  }

  ngOnDestroy(){
    this.sectionSouscription.unsubscribe();
  }


}
