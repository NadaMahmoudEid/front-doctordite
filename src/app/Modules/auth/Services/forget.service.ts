import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iforgetpass } from '../Interfaces/Iforgetpass';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {
  private UserNameBehaviorSubject = new BehaviorSubject<any>(0);

  constructor(private _HttpClient: HttpClient,private _Router:Router) { }
  setUserName(value: any) {
    this.UserNameBehaviorSubject.next(value);
  }

  getUserName(): Observable<any> {
    return this.UserNameBehaviorSubject.asObservable();
  }
  forgetpass(forget:Iforgetpass):Observable<any>{
    return this._HttpClient.put('http://localhost:5268/api/Account/ForgetPassword', forget);
  }
  
  getquestion(name:string):Observable<any>{
    return this._HttpClient.get(`http://localhost:5268/api/Account/GetQuestionByUserName?UserName=${name}`);
  }
  

}
