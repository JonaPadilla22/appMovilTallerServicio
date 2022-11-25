import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
})
export class MensajeComponent implements OnInit {
  @Input() message: any;
  url = environment.baseUrlAPI + "/usuarios/";
  user = JSON.parse(localStorage.getItem('USUARIO'));
  usuario: any;
  date_msg: any;
  date: any;
  
  constructor(private uService: ClienteService) {

  }

  async ngOnInit() {
    this.usuario = await this.uService.getClienteById(this.message.id_user).toPromise();
    this.usuario = this.usuario[0];
    this.date_msg = new Date(this.message.timestamp).getDate();
    var date_now = new Date;
    this.date = date_now.getDate();
  }

}
