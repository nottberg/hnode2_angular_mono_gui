import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  
  isLoggedIn = false;

  constructor(private token: TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser.hasOwnProperty('username'))
    {
      console.log("Profile user valid.")
      this.isLoggedIn = true;
    }
  }

}
