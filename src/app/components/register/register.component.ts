import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UsuarioModel } from '@app/models/usuario.model';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  NameControl = new FormControl('', [Validators.required]);
  PasswordControl = new FormControl('', [Validators.required]);
  EmailControl = new FormControl('', [Validators.required, Validators.email]);
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    if (form.invalid) {
      return;
    }

    this.auth.newuser(this.usuario).subscribe(
      resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);        
      });

  }

}
