import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BarcodeScannerOriginal } from '@ionic-native/barcode-scanner';
import { ServicioService } from 'src/app/services/servicios/servicio.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
})
export class ScanQrComponent implements OnInit {
  scanActive: boolean = false;
  isModalOpen: boolean = false;
  servicio: any;
  constructor(private servService: ServicioService) { }

  ngOnInit() {
    this.startScanner();
  }

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
         //The QR content will come out here
        let id = result.content.replace("'", "");
        this.servicio = await this.servService.getServicioById(id).toPromise();
        this.servicio = this.servicio[0];
        this.setOpen(true);
        //Handle the data as your heart desires here
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
