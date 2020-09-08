import { PublisherService } from './publisher.service';
import { ubisoft } from 'src/data-mock/publishers';

describe('class: PublisherService', () => {
  let publisherService: PublisherService;

  beforeEach(() => {
    publisherService = new PublisherService();
  });

  describe('method: findById', () => {
    const id: string = ubisoft.id;
    it('should resolve the publisher associated with the given id', async () => {
      await expect(publisherService.findById(id)).resolves.toEqual(ubisoft);
    });

    it('should resolve undefined if the no publisher has the given id', async () => {
      await expect(
        publisherService.findById('invalidId'),
      ).resolves.toBeUndefined();
    });
  });
});
