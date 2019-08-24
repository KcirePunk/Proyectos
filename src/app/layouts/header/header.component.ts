import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public estado: boolean;

  constructor() { 
    this.estado = false;
  }

  ngOnInit() {
  }

  ver(estado: boolean){
    let nav = document.getElementById('nav');
    if(estado == true) {
      nav.style.display = 'block';
    }else {
      nav.style.display = 'none';
    }

  }
}
