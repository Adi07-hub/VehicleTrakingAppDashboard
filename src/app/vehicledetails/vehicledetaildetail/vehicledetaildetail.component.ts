import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { VehicledetailService } from '../vehicledetail.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicledetailaddComponent } from "../vehicledetailadd/vehicledetailadd.component";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-vehicledetaildetail',
  templateUrl: './vehicledetaildetail.component.html',
  styleUrls: ['./vehicledetaildetail.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgSelectModule, FormsModule, VehicledetailaddComponent,NgxPaginationModule]

})
export class VehicledetaildetailComponent {
  userdata: any[] = []

  constructor(private service: VehicledetailService, private modalService: NgbModal) { }
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

  searchText: string = '';
  page: number = 1;

  filteredData() {
    if (!this.searchText) return this.userdata;
    return this.userdata.filter(item =>
      item.vehicleNumber.toString()?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
