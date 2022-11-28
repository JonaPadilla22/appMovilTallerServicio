import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.css'],
})
export class ChangeImageComponent implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario:any;
  img_usuario:any;
  user: any;
  imagen: any;

  @ViewChild('inputImage') inputImage: any; 
  
  constructor(
    private alertController: AlertController,
    private clientService: ClienteService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.url += this.img_usuario ?? 'default.png';
    this.id_usuario = JSON.parse(await this.storage.get('USUARIO')).ID;
    this.img_usuario = JSON.parse(await this.storage.get('USUARIO')).IMG;
  }

  async changeImage(){
    if(this.inputImage.value==""){
      const alert = await this.alertController.create({
        header: 'Error',
        message: "NO HA SELECCIONADO UNA IMAGEN",
        buttons: ['OK'],
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: '¿Desea cambiar la imagen de usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: async () => {
              const img = new FormData();
              img.append("file", this.imagen);
              this.clientService.updateImageUser(this.id_usuario, img).subscribe(
                {
                  next: async (response: any) => {
                    const alert = await this.alertController.create({
                      header: 'Exito',
                      message: response.message,
                      buttons: [
                        {
                          text: 'Confirmar',
                          role: 'confirm',
                          handler: async () => {
                            this.user = await this.clientService.getClienteById(this.id_usuario).toPromise();
                            localStorage.removeItem('USUARIO');
                            
                            await this.storage.set('USUARIO', JSON.stringify(this.user[0]));
                            window.location.reload();
                          },
                        },
                      ],
                    });
                    await alert.present();
                  },
                  error: async (e) => {
                    const alert = await this.alertController.create({
                      header: 'Error',
                      message: "HA OCURRIDO UN ERROR AL ACTUALIZAR LA IMAGEN",
                      buttons: ['OK'],
                    });
                    await alert.present();
                  }
                }
              );
            },
          },
        ],
      });
      await alert.present();
    } 
  }

  inputChange(data: any){  
    const reader = new FileReader()
    reader.readAsDataURL(data.files[0])
    this.imagen=data.files[0]
    reader.onload = async (e: any) => {
      this.url = e.target.result     
    }
    //console.log(URL.createObjectURL(data.files[0]));
    // this.url = URL.createObjectURL(data.files[0]);
  }
}
