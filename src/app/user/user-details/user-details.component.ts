import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginService } from 'src/app/login/login.service';
import { CreateUserComponent } from "../create-user/create-user.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgSelectModule, FormsModule, CreateUserComponent, NgxPaginationModule]
})
export class UserDetailsComponent {
  userdata: any[] = []

  constructor(private service: LoginService, private modalService: NgbModal) { }
  ngOnInit(): void {

    this.getuserdataData()

  }

  getuserdataData() {
    this.service.GetData().subscribe((res: any) => {
      this.userdata = res
    })
  }



  data: any = []
  closeResult = ''
  find(content: any, item: any) {

    this.data = item

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then(
      (result) => {
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.getuserdataData()

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
  userSearchText: string = '';
  userPage: number = 1;

  filteredUsers() {
    if (!this.userSearchText) return this.userdata;
    const searchLower = this.userSearchText.toLowerCase();
    return this.userdata.filter(item =>
      item.name?.toLowerCase().includes(searchLower)
    );
  }
}
