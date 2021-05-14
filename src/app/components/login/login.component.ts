import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UsuarioModel } from '@app/models/usuario.model';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService ) { }

  EmailControl = new FormControl('', [Validators.required]);
  PasswordControl = new FormControl('', [Validators.required]);
  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    if (form.invalid) {
      return;
    }

    this.auth.login( this.usuario ).subscribe(
      resp => {
        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message)
      });
  }

}
