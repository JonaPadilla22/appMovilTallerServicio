import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-citas-cliente',
  templateUrl: './detalle-citas-cliente.page.html',
  styleUrls: ['./detalle-citas-cliente.page.css'],
})
export class DetalleCitasClientePage{
  @Input() cita: any;
  @Input() id_cita: string;
  
  constructor() { 
    
  }

  ngOnInit() {
    
  }

}
