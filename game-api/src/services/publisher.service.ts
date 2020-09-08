import { Injectable } from '@nestjs/common';
import { Publisher } from 'src/models/publisher';
import { publishers } from 'src/data-mock/publishers';

@Injectable()
export class PublisherService {
  private _publishers: Publisher[] = publishers;

  async findById(id: string): Promise<Publisher> {
    for (const publisher of this._publishers) {
      if (publisher.id === id) {
        return publisher;
      }
    }
  }
}
