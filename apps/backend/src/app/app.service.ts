import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ];
  }
}
