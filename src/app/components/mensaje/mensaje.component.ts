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
  usuario: any;

  constructor(private uService: ClienteService) {

  }

  async ngOnInit() {
    this.usuario = await this.uService.getClienteById(this.message.id_user).toPromise();
    this.usuario = this.usuario[0];
  }

}
