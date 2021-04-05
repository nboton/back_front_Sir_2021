import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Section } from '../modele/Section';
import { SectionService } from '../section.service';



@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  sectionForm: FormGroup;
  errorSms!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private  sectionService: SectionService ) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.sectionForm = this.formBuilder.group({
      libelle : [ '', Validators.required],
    });
  }

  onSubmitForm() {
    const libelle = this.sectionForm.get('libelle').value;
    const section = new Section(libelle, [], []);
    
    this.sectionService.addSection(section).then(
      (res) => {
        // Lorsque l'ajout a été effectué on émet la liste pour rafraichir celle-ci dans le component list-section
        if (res) {
          this.sectionService.emitSection();
        }
       this.BackOnList();
      },
      (error) => {
        console.log(error);
      }
        );
   this.router.navigate(['detail-section']);
  }


  BackOnList() {
    this.router.navigate(['detail-section']);
   
  
  }

}
