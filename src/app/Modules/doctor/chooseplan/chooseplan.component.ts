import { Component } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { DoctorService } from '../Service/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { choose } from '../Interface/IChooseplan';
import { error } from 'jquery';

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent {


  doctorID !: string
  IChoose: choose = { PatientId: "aads", planId: 1 };
  data!: any[]

  PatientId!: any;
  constructor(private _loginService: LoginService, private _doctorService: DoctorService, private route: Router, private _ActivatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.doctorID = this._loginService.getUserId();
    this.GetDoctorPlans(this.doctorID)

    this._ActivatedRoute.paramMap.subscribe(params => {
      this.PatientId = params.get('PatientId');

    });

  }
  GetDoctorPlans(doctorID: string) {
    this._doctorService.GetDoctorPlans(this.doctorID).subscribe((resp) => {
      this.data = resp
    })
  }
  GOToplan(planID: number) {
    this.route.navigate([`/doctor/dash/Plan/${planID}`])
  }
  Delete(plansId: number) {
    console.log(plansId)
    this._doctorService.Delete(plansId).subscribe((resp) => {
      if (resp.msg == 'deleted') {
        this.GetDoctorPlans(this.doctorID)
      }
    })
  }

  chooseplan(planID: number) {
    this.IChoose = { PatientId: this.PatientId , planId:planID };
  
    console.log(this.IChoose)
    this._doctorService.Chooseplan(this.IChoose).subscribe((resp) => {
      this.data = resp
      console.log(resp)
      

      
    })
  }

}


