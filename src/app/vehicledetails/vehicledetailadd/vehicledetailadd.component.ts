import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { VehicledetailService } from '../vehicledetail.service';
import { LoginService } from 'src/app/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicledetailadd',
  templateUrl: './vehicledetailadd.component.html',
  styleUrls: ['./vehicledetailadd.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule, NgSelectModule],
})
export class VehicledetailaddComponent {
  _frmGroup: FormGroup
  userList: any[] = []
  @Input() data: any
  constructor(
    private service: VehicledetailService,
    private userService: LoginService,
    private fb: FormBuilder, private modalService: NgbModal

  ) {
    this._frmGroup = this.fb.group({
      VehicleType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      ChassisNumber: ['', [Validators.required]],
      EnginNumber: ['', [Validators.required, Validators.maxLength(50)]],
      Manufacturing_Year: ['', [Validators.required, Validators.maxLength(4)]],
      Load_carrying_Capacity: ['', [Validators.required, Validators.maxLength(50)]],
      Makrof_vehicle: ['', [Validators.required, Validators.maxLength(100)]],
      BodyType: ['', [Validators.required, Validators.maxLength(100)]],
      OrganizationName: ['', [Validators.required, Validators.maxLength(100)]],
      ModelNumber: ['', [Validators.required]],
      userId: ['', []]
    })

  }
  ngOnInit(): void {
    this.GetuserList()
    debugger
    if (this.data != undefined && this.data != null) {
      this._frmGroup.patchValue({

        VehicleType: this.data.vehicleNumber,
        ChassisNumber: this.data.chassisNumber,
        EnginNumber: this.data.enginNumber,
        Manufacturing_Year: this.data.vehicleType,
        Load_carrying_Capacity: this.data.load_carrying_Capacity,
        Makrof_vehicle: this.data.makrof_vehicle,
        BodyType: this.data.bodyType,
        OrganizationName: this.data.organizationName,
        ModelNumber: this.data.modelNumber,
        userId: this.data.userId.id

      })
    }
  }

  GetuserList() {
    this.userService.GetList().subscribe(
      res => {
        this.userList = res
      }
    )
  }

  OnSubmit() {

    if (this.data != undefined && this.data != null) {
      this.service.Update(this.data.vehicleNumber, this._frmGroup.value)
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
            this.modalService.dismissAll("Save Click")
          },
          error: err => {
            console.log(err);
          }
        });
    }
    else {
      this.service.Add(this._frmGroup.value)
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
