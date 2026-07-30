import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './about.component.html',
  host: {'collision-id' : 'AboutComponent'}
})
export class AboutComponent implements OnInit{
    
    constructor(

    ){}
  ngOnInit(): void {
    
  }


}
