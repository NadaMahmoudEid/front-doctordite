import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/Services/login.service';
import { DoctorService } from '../Service/doctor.service';
import { data } from 'jquery';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
doctorID !:string
data!:any[]
  constructor(private _loginService:LoginService, private _doctorService:DoctorService,private route:Router) {
    
  }
  ngOnInit(): void {
    this.doctorID=this._loginService.getUserId();
    this.GetDoctorPlans(this.doctorID)
   
  }
  GetDoctorPlans(doctorID:string){
    this._doctorService.GetDoctorPlans(this.doctorID).subscribe((resp)=>{
      console.log(resp)
     
      this.data=resp

    })
  }
  GOToplan(planID:number){
    this.route.navigate([`/doctor/dash/Plan/${planID}`])
  }
  Delete(plansId:number){
    console.log(plansId)
    this._doctorService.Delete(plansId).subscribe((resp)=>{
      if(resp.msg=='deleted'){
        this.GetDoctorPlans(this.doctorID)
      }
    })
  }
  Update(PlanID: number) {
    this.route.navigate([`/doctor/dash/UpdatePlan/${PlanID}`])
  }

}
