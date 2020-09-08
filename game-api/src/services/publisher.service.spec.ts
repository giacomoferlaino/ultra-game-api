import { PublisherService } from './publisher.service';
import { Publisher } from 'src/models/publisher';
import { ubisoft } from 'src/data-mock/publishers';

jest.mock('src/data-mock/publishers', () => {
  const Publisher = require('src/models/publisher').Publisher;
  const ubisoft: Publisher = Publisher.create(
    'Ubisoft',
    42161326600046,
    '01 48 18 50 00',
  );
  const valve: Publisher = Publisher.create(
    'Valve',
    83014307900010,
    '919 854 0070',
  );
  const epicGames: Publisher = Publisher.create(
    'Epic Games',
    52178928900027,
    '919 854 0070',
  );
  const rockstarGames: Publisher = Publisher.create(
    'Rockstar Games',
    35352378000032,
    '01 48 18 50 00',
  );
  const publishers: Publisher[] = [ubisoft, valve, epicGames, rockstarGames];

  return {
    publishers: publishers,
    ubisoft: ubisoft,
    valve: valve,
    epicGames: epicGames,
    rockstarGames: rockstarGames,
  };
});

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
