import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io(SOCKET_URL);

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
