import { Component, OnInit, Input } from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number;

  constructor() { }

  ngOnInit() {
    $('.slider').bxSlider({
      auto: true,
      pager: true,
      slideWidth: this.anchura
    });
  }

}
