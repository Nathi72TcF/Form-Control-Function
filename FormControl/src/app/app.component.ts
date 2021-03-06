import { Component } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormControl';

  myPeople = [];
  myFormz;
  name: string;
  surname: string;
  age: string;
  email: string;
  phoneNumbers: string;

  constructor(public formBuilder: FormBuilder) {
    this.myFormz = formBuilder.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      age : ['', Validators.maxLength(2) && Validators.required],
      email : ['', Validators.email && Validators.required],
      phoneNumbers : ['', Validators.maxLength(10) && Validators.required]
    });
  }

  addUser() {
    this.myPeople.push({
      name: this.myFormz.value.name,
      surname: this.myFormz.value.surname,
      age: this.myFormz.value.age,
      email: this.myFormz.value.email,
      phoneNumber: this.myFormz.value.phoneNumbers
    });
    this.myFormz.value.name = '';
    this.surname = '';
    this.age = '';
    this.email = '';
    this.phoneNumbers = '';
  }

}
