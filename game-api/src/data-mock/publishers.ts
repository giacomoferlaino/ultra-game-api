import { Publisher } from 'src/models/publisher';

export const ubisoft: Publisher = Publisher.create(
  'Ubisoft',
  42161326600046,
  '01 48 18 50 00',
);
export const valve: Publisher = Publisher.create(
  'Valve',
  83014307900010,
  '919 854 0070',
);
export const epicGames: Publisher = Publisher.create(
  'Epic Games',
  52178928900027,
  '919 854 0070',
);

export const rockstarGames: Publisher = Publisher.create(
  'Rockstar Games',
  35352378000032,
  '01 48 18 50 00',
);

export const publishers: Publisher[] = [
  ubisoft,
  valve,
  epicGames,
  rockstarGames,
];
