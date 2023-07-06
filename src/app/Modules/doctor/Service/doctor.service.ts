import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../../shared/Interface/IDoctor';
import { IConnect } from '../Interface/IConnect';
import { IPlan } from '../Interface/IPlan';
import { FormBuilder } from '@angular/forms';
import { choose } from '../Interface/IChooseplan';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _http: HttpClient, private _formBuilder: FormBuilder) { }



  getSingleDoctor(id: string): Observable<IDoctor> {
    return this._http.get<IDoctor>(`http://localhost:5268/api/Doctor/doctorid?doctorid=${id}`);
  }

  Subscribe(Connect: IConnect): Observable<IConnect> {
    return this._http.post<IConnect>(`http://localhost:5268/api/Patient/Subscribtion`, Connect);
  }

  addPlan(data: IPlan): Observable<IPlan> {
    return this._http.post<IPlan>(`http://localhost:5268/api/Plan`, data);
  }

 
  ChangeDoctorPass(userData: object): Observable<any> {

    return this._http.post("http://localhost:5268/api/Doctor/ChangePassowrd", userData)
  }
  getAllWaitingPatients(Doctorid: any): Observable<any> {
    return this._http.get(`http://localhost:5268/api/Patient/GetPatientsByDoctorIdWithStatusWaiting?Doctorid=${Doctorid}`)
  }
  rejectPatient(waitingPatient: any): Observable<any> {
    return this._http.put('http://localhost:5268/api/Patient/RejectAccount', waitingPatient);
  }
  acceptPatient(waitingPatient: any): Observable<any> {
    return this._http.put('http://localhost:5268/api/Patient/ConfirmAccount', waitingPatient);
  }

  GetDoctorPlans(doctorid: string): Observable<any> {

    return this._http.get(`http://localhost:5268/api/Plan/GetAllPlansByDoctotId?doctorID=${doctorid}`)
  }

  GetDaysByplanID(planID: number) {


    return this._http.get(`http://localhost:5268/api/Plan/GetDaysByPlanId?planId=${planID}`)
  }
  GetMealByDayID(dayId: number) {


    return this._http.get(`http://localhost:5268/api/Plan/GetMealsByDayId?dayId=${dayId}`)
  }
  EditCustomMeal(editMealForm: any) {

    return this._http.put("http://localhost:5268/api/CustomPlan/UpdateCustomMeal", editMealForm)
  }
  GetMealById(id: number) {
    return this._http.get(`http://localhost:5268/api/Plan/GetMealById${id}`)
  }
  GetCustomMealById(id: number) {
    return this._http.get(`http://localhost:5268/api/CustomPlan/GetMealCustomPlanByCusDayId/${id}`)
  }

  EditMeal(editMealForm: any) {
  

    return this._http.put("http://localhost:5268/api/Plan/UpdateMeal", editMealForm)
  }

  EditProfile(editUserForm: any): Observable<any> {
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this._http.put("http://localhost:5268/api/Doctor/EditDoctorData", editUserForm, options)
  }

  GetDoctorImg(userId: any): Observable<any> {

    return this._http.get(`http://localhost:5268/api/Doctor/GetDoctorImg?doctorid=${userId}` )
  }
  Delete(PlanId: any): Observable<any> {

    return this._http.delete(`http://localhost:5268/api/Plan/DeletePlan${PlanId}` )
  }
  Chooseplan(IChoose: choose): Observable<any> {

    return this._http.post("http://localhost:5268/api/Doctor/AddCustomPlanToSpecificPatient",IChoose)
  }

  EditPlan(editPlan: any) {


    return this._http.put("http://localhost:5268/api/Plan/UpdatePlan", editPlan)
  }

  GetPlanID(planID: any):Observable<any> {
    return this._http.get(`http://localhost:5268/api/Plan/GetPlanById?id=${planID}`)
  }


  
}
