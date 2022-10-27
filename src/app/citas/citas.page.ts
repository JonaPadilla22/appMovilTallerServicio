import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BarcodeScannerOriginal } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  public page: string;
  // datocodificado: any;
  // datoscaneado: {};
  // constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.page = "Citas";
  }

  // Codificar(){
  //   this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
  //     encodedData => {
  //     this.datocodificado = encodedData;
  //    }).catch(err => {
  //        console.log('Error', err);
  //    });
  // }

  // Leer() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     this.datoscaneado = barcodeData;
  //   })
  //   .catch(err => {
  //     console.log("Error", err);
  //   })
  // }
  scanActive: boolean = false;

  constructor() {}

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      
      if (result.hasContent) {
        this.scanActive = false;
        alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
