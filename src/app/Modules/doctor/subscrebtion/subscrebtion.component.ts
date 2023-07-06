

import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../Service/doctor.service';
import { LoginService } from '../../auth/Services/login.service';

import { Router } from '@angular/router';
import { error } from 'jquery';
import { NotesService } from '../../user/services/notes.service';

@Component({
  selector: 'app-subscrebtion',
  templateUrl: './subscrebtion.component.html',
  styleUrls: ['./subscrebtion.component.scss']
})
export class SubscrebtionComponent implements OnInit {

  waitingPatients!: any[];
  DoctorId!: string;
  AlertMsg: any;
  showAlert: boolean = false;
  showalertsub : boolean = false;
  behaviorSubjectforSubscribtionsnumber = 0;
  lengthofwaitinglist :any
  constructor(private _DoctorService: DoctorService, private _LoginService: LoginService, private _NoteService : NotesService) { }

  ngOnInit(): void {
    this.getDoctorId();
    this.GetAllWaitingPatient();
    
  }

  displayAlert(msg: string) {
    this.AlertMsg = msg;
    this.showAlert = true;
    this.showalertsub = true;
    setTimeout(() => {
      this.showAlert = false;
  
    }, 2000); // Adjust the duration (in milliseconds) as needed
  }
  getDoctorId() {
    this.DoctorId = this._LoginService.getUserId()
  }
  GetAllWaitingPatient() {
    this._DoctorService.getAllWaitingPatients(this.DoctorId).subscribe((response) => {
      this.waitingPatients = response;
      this.lengthofwaitinglist = response.length;
    })
    
  }
  AcceptPatient(Patientid: string) {

    let waitingPatient = {
      "patientId": Patientid,
      "doctorID": this.DoctorId
    }
    
    this._NoteService.getValueofSubscibtionNum().subscribe({
      next : data => {this.behaviorSubjectforSubscribtionsnumber = data
      console.log(data)} ,
      error : err => console.log(err)
    })
    this._NoteService.setValueforSubscibtionNum(this.lengthofwaitinglist);
    
    
    console.log(waitingPatient);
    this._DoctorService.acceptPatient(waitingPatient).subscribe((res) => {
      if (res.msg == "NotFound") {
        this.displayAlert("ليس لديك خطه مناسبه للمريض ")

      }
      else if (res.msg == 'Confirmed') {
        this.GetAllWaitingPatient()

      }
    }, error => {

      console.log("err", error)
    }
    )


  }

  RejectPatient(Patientid: string) {
    let waitingPatient = {
      "patientId": Patientid,
      "doctorID": this.DoctorId
    }

    this._NoteService.getValueofSubscibtionNum().subscribe({
      next : data => {this.behaviorSubjectforSubscribtionsnumber = data
      console.log(data)} ,
      error : err => console.log(err)
    })

    this._NoteService.setValueforSubscibtionNum(--this.behaviorSubjectforSubscribtionsnumber);
    console.log(waitingPatient);
    this._DoctorService.rejectPatient(waitingPatient).subscribe((response) => {

      this.GetAllWaitingPatient();
    }),
      (error: any) => {

        this.GetAllWaitingPatient();
      }


  }

}