import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-cliente',
  templateUrl: './chat-cliente.page.html',
  styleUrls: ['./chat-cliente.page.css'],
})
export class ChatClientePage implements OnInit {
  @Input() serv: any;
  constructor() { }

  ngOnInit() {
  }

}
