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
  
  id_usuario :any;
  img_usuario :any;
  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.id_usuario = JSON.parse(await this.storage.get('USUARIO')).ID;
    this.img_usuario = JSON.parse(await this.storage.get('USUARIO')).IMG;
  }

}
