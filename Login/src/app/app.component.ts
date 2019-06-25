import { Component } from '@angular/core';
import { FormBuilder, NgForm, FormControl, Validator, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Form Validation';

  myPeople = [];

  myFormz: FormGroup;
  matcher = new MyErrorStateMatcher();

  email: string;

  constructor(private formBuilder: FormBuilder) {
    this.myFormz = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])/)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  // addUser() {
  //   this.myPeople.push({
  //     email: this.myFormz.value.email,
  //     password: this.myFormz.value.password,
  //     confirmPassword: this.myFormz.value.confirmPassword
  //   });
  //  password : ['',[Validators.required, Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]')]],
  // (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])/)
  // }

  // constructor(public formBuilder: FormBuilder) {
  //   this.myFormz = formBuilder.group({
  //     email : ['',[Validators.required]],
  //     password : ['',[Validators.required]], confirmPassword: ['']
  //     confirmPassword : ['',[Validators.required, Validators.pattern]]Deigh [3:49 PM]
  //   });
  // }

}
