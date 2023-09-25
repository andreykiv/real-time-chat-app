import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is captain Jack Sparrow speaking. Check check';
  }
}
