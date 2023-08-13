import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs';
import { SignupRequest } from 'src/app/core/models/SignupRequest';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'jaguars-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent{

  valCheck: string[] = ['remember'];

  password!: string;
  email!: string;

  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    public authService: AuthService,
    public loginService: LoginService,
    ) {
    super(injector);
    this.email = "jay.wang@wpgholdings.com";
    this.password = "abcd1234";
  }

  signInBtnClick() {
    this.authService.login(this.email, this.password)
      .pipe(finalize(() => {
        console.log("do finalize...");
      }))
      .subscribe({
        next: (result) => {
          console.log("do next...");
        },
        error: (err) => {
          console.log("do error...");
        }
      });
  }

  signUpBtnClick() {
    if (this.hasInvalidParams()) return;
    let request = new SignupRequest();
    request.email = this.email;
    request.password = this.password;
    this.loginService.onSignup(request)
      .pipe(finalize(() => {
        console.log("do finalize...");
      }))
      .subscribe({
        next: (result) => {
          console.log("do next...");
        },
        error: (err) => {
          console.log("do error...");
        }
      });
  }

  hasInvalidParams(): boolean {
    if (this.email == null || this.password == null) {
      return true;
    }
    return false;
  }

}
