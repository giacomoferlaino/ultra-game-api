import { Publisher } from './publisher';

describe('class: Publisher', () => {
  describe('method: create', () => {
    const publisher: Publisher = Publisher.create(
      undefined,
      undefined,
      undefined,
    );

    it('should return a new publisher with a random uuid(v4) id', () => {
      expect(publisher.id.length).toBe(36);
    });
  });
});
