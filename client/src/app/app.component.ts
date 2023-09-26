import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner/spinner.service';
import { ChatService } from './shared/services/chat/chat.service';
import { Observable, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newMessage = '';
  messageList: string[] = [];
  user = 'Guest';

  public clock$: Observable<Date>;

  constructor(
    private chatService: ChatService,
    public spinnerService: SpinnerService,
  ) {
    this.clock$ = interval().pipe(
      take(1),
      map(() => new Date()),
    );
  }

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
