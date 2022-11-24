import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/clientes/cliente.service';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.css'],
})
export class ChangeImageComponent implements OnInit {
  url = environment.baseUrlAPI + "/usuarios/";
  id_usuario = JSON.parse(localStorage.getItem('USUARIO')).ID;
  img_usuario = JSON.parse(localStorage.getItem('USUARIO')).IMG;

  imagen: any;

  @ViewChild('inputImage') inputImage: any; 
  constructor(
    private alertController: AlertController,
    private clientService: ClienteService
  ) { }

  ngOnInit() {
    this.url += this.img_usuario ?? 'default.png';
  }

  async changeImage(){
    console.log(this.inputImage.value);
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
              console.log(this.imagen);
              const img = new FormData();
              img.append("file", this.imagen);
              this.clientService.updateImageUser(this.id_usuario, img).subscribe(
                {
                  next: async (response: any) => {
                    const alert = await this.alertController.create({
                      header: 'Exito',
                      message: response.message,
                      buttons: ['OK'],
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
