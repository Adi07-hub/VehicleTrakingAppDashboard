import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'body',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = "Login";
  IsLoggedIn: boolean = false;
  errorMessage: string = "";
  btnLogin: string = "Log In";
  IsSubmit: boolean = false;
  islogin = false


  _loginForm: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: LoginService, private modalService: NgbModal,
    private _router: Router) {
    this._loginForm = this.formBuilder.group({
      unm: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      pwd: ['', [Validators.required]]

    })

  }
  login() {

    if (this._loginForm.invalid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }
    let payload = {
      unm: this._loginForm.value.unm,
      pwd: this._loginForm.value.pwd
    }

    this.IsSubmit = true;
    this.btnLogin = "Logging in..."; // Show loading state

    this.service.login(payload)
      .subscribe({
        next: (res: any) => {
          this.IsLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true'); // Optional localStorage
          localStorage.setItem('userName', res.userName);
          this._router.navigate(['home/index']);
        },
        error: err => {
          this.btnLogin = "Log In"; // Reset button
          this.IsSubmit = false; // Re-enable form

          // Show error message to the user
          this.errorMessage = err.error.errors?.[0]?.message || "An error occurred. Please try again.";
          console.error(err);
        }
      });
  }

  resetForm() {
    this._loginForm.reset();
  }

  closeResult = ''
  find(content: any) {



    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then(
      (result) => {
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;


      },
    );
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  get f() { return this._loginForm.controls; }
}
