import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginService } from '../../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule, NgSelectModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  _frmGroup: FormGroup

  @Input() data: any 
  constructor(
    private usertservice: LoginService,
    private fb: FormBuilder,private modalService: NgbModal

  ) {
    this._frmGroup = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}')]],
      Organization: ['', [Validators.required, Validators.maxLength(50)]],
      Address: ['', [Validators.required, Validators.maxLength(500)]],
      EmailAddress: ['', [Validators.required, Validators.maxLength(50)]],
      Location: ['', [Validators.required, Validators.maxLength(100)]],
      Photopath: ['', []],

    })

  }
  ngOnInit(): void {
    if (this.data != undefined && this.data != null) {
      this.Photopath = this.data.photoPath
      this._frmGroup.patchValue({
        Name: this.data.name,
        MobileNumber: this.data.mobileNumber,
        Organization: this.data.organization,
        Address: this.data.address,
        EmailAddress: this.data.emailAddress,
        Location: this.data.location,
      })
    }
  }

  Photopath: any;

  changeAvatar(files: any) {
    if (files.length === 0) {
      console.log("No candidate photo selected.");
      return;
    }

    const mimeType = files[0].type;
    if (!mimeType.match(/image\/*/)) {
      console.log("Only images are supported.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = () => {
      this.Photopath = reader.result;
    };
  }


  OnSubmit() {
    this._frmGroup.patchValue({
      Photopath: this.Photopath,
    })
    if (this.data != undefined && this.data != null) {
      this.usertservice.Update(this.data.id,this._frmGroup.value)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            Swal.fire({
              title: "Record Updated Sucessfully.",
              icon: "success",
              timer: 3000,
              draggable: true
            });
            this._frmGroup.reset()
            this.Photopath = null,
            this.modalService.dismissAll("Save Click")
          },
          error: err => {
            console.log(err);
          }
        });
    }
    else {
      this.usertservice.Add(this._frmGroup.value)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            Swal.fire({
              title: "Record Save Sucessfully.",
              icon: "success",
              timer: 3000,
              draggable: true
            });
            this._frmGroup.reset()
            this.Photopath = null
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }



  get f() {
    return this._frmGroup.controls;
  }
}
