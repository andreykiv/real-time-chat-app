import { Component, OnInit } from '@angular/core';
import {
  Observable,
  distinctUntilChanged,
  interval,
  map,
  skip,
  take,
} from 'rxjs';
import { ChatService } from '../../shared/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  newMessage = '';
  messageList: string[] = [];
  user = 'Guest';

  public clock$: Observable<Date>;

  constructor(private chatService: ChatService) {
    this.clock$ = interval(1).pipe(
      take(1),
      map(() => new Date()),
    );
  }

  ngOnInit() {
    this.chatService
      .getNewMessage()
      .pipe(skip(1), distinctUntilChanged())
      .subscribe((message: string) => {
        this.messageList.push(message);
        console.log('messageList?:', this.messageList);
      });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
