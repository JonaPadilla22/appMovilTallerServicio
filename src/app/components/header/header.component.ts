import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
  @Input() page: any;
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario = "3";
  img_usuario = "1.png";
  constructor() { }

  ngOnInit() {}

}
