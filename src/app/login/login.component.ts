import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = { username: "", password: "" };

  constructor(private app: AppService, private http: HttpClient, private router: Router) { }

  login() {

  }

  ngOnInit(): void {
  }

}
