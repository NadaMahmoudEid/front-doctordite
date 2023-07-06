import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IPatient } from '../../doctor/Interface/IPatient';
import { LoginService } from '../../auth/Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router, private _LoginService:LoginService) {

  }

  Cancel(userdata:any):Observable<any>{
    return this.httpClient.put("http://localhost:5268/api/Patient/CanceledSubscription",userdata)
   }

   CurrentCustomPlan(PatientDoctorId:any):Observable<IPatient>{
    return this.httpClient.post<IPatient>(`http://localhost:5268/api/CustomPlan/CurrentCustomPlan`,PatientDoctorId).pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
  getAllPatientData():Observable<any>
  {
    let patientId = this._LoginService.getUserId();
    return this.httpClient.get(`http://localhost:5268/api/Patient/patientDataDTO/${patientId}`)
  }
  getCurrentDay(customPlanId:number):Observable<any>
  {
    return this.httpClient.get(`http://localhost:5268/api/CustomPlan/GetDayCustomPlan?customPlanId=${customPlanId}`)
  }
  GetIFPatientInSubscription(userID:string):Observable<any>
  {
    return this.httpClient.get(`http://localhost:5268/api/Patient/GetIFPatientInSubscription/${userID}`)
  }
  
  GetDocIdWithStatusConfirmed(PatientId:string):Observable<string>
  {
    return this.httpClient.get<string>(`http://localhost:5268/api/Doctor/GetDocIdWithStatusConfirmedByPatientId/${PatientId}`);
  }

  GetIFPatientIsComfirmed(userID:string):Observable<any>
  {
    return this.httpClient.get(`http://localhost:5268/api/Patient/GetIFPatientIsComfirmed/${userID}`)
  }
}
