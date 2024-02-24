import { Component, OnInit } from '@angular/core';
import { IGetUserList, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  userData!:Array<IGetUserList>; //variable declared to handle data coming from api response
  dataSource:any; //to bind data to the mat table
  displayedColumns: string[] = ['sno', 'name', 'email','userName']; //columns to show in ui table
  tableLoader:Boolean=false; //variable that will be used to handle loader to show and to hide
  
  constructor(private _userService:UserService){}

  ngOnInit() {
    //calling a function for getting list of user
    this.getUserList();
  }

  getUserList(){
    this.tableLoader=true;
    //called function from userservice to get response from api
    this._userService.getAllUsers().subscribe({
      next:(res:any)=>{
        this.userData=res
        this.dataSource = new MatTableDataSource(this.userData);
        this.tableLoader=false;
      },
      error:(err:any)=>{
        this.tableLoader=false;
      }
    })
  }

  search(searchText:string,check:number){
    this.tableLoader=true;
    var searchedData;
    //check 1 incase of user enter name
    if(check==1){
      searchedData=this.userData.filter((data:any)=>data.name.toLowerCase().trim().includes(searchText.toLowerCase().trim()));
    }else{
      //incase of user enter email
      searchedData=this.userData.filter((data:any)=>data.email.toLowerCase().trim().includes(searchText.toLowerCase().trim()));
    }
    this.dataSource = new MatTableDataSource(searchedData);
    this.tableLoader=false;
  }

}
