import { Component, OnInit } from '@angular/core';
import { CrudService, User } from './services/crud.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  users:any = [];

  constructor(private crud:CrudService){}
  
  ngOnInit(): void {
    this.fetchUsers();  
  }

  fetchUsers():void{
    this.crud.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  addUser(){  
    let myUser:any = {id:"207", name:"Laura Villa", email:"lvilla@gmail.com",phone:"3104562536"}; 
    this.crud.addUser(myUser).subscribe(
      data => {
        this.fetchUsers();
      }
    );
  }

  removeUser(id:string){
    this.crud.deleteUser(id).subscribe(
      res => {
        this.fetchUsers();
      }
    );
  }

}
