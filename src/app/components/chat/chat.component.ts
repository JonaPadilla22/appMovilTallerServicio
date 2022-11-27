import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormGroup, FormBuilder } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { Chat } from 'src/app/models/chat';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() serv: any;
  user = JSON.parse(localStorage.getItem('USUARIO'));

  @ViewChild('contenedorMensaje') contenedorMensaje : any; 

  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : []
    });
   }
  ngAfterViewInit(){
    this.contenedorMensaje.elc.scrollTop = 9999
  }

  ngOnInit() {
    const chatsRef = ref(this.db, `chats/${this.serv.ID_SERVICIO}`);
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
      this.chats.sort(function(a, b) {
        var c = new Date(a.timestamp).getTime();
        var d = new Date(b.timestamp).getTime();
        return c-d;
      });
    });
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    chat.id_user = this.user.ID;
    set(ref(this.db, `chats/${this.serv.ID_SERVICIO}/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message' : []
    });
  }

}
