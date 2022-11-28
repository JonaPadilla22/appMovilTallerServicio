import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TouchSequence } from 'selenium-webdriver';
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
  user:any;
  usuario: any;
  date_msg: any;
  date: any;
  

  isLocalUser : boolean = false;//confirmar quien es el del mensaje


  constructor(private uService: ClienteService,private storage: Storage) {

  }

  async ngOnInit() {
    this.usuario = await this.uService.getClienteById(this.message.id_user).toPromise();
    this.usuario = this.usuario[0];
    this.date_msg = new Date(this.message.timestamp).getDate();
    var date_now = new Date;
    this.date = date_now.getDate();
    this.user = JSON.parse(await this.storage.get('USUARIO'));
    let usuario_id = JSON.parse(await this.storage.get('USUARIO')).ID;

    if(this.usuario.ID == usuario_id){
      this.isLocalUser = true;
    }
  }

}
