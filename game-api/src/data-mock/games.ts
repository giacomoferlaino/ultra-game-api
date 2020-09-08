import { Game } from 'src/models/game';
import { ubisoft, valve, epicGames, rockstarGames } from './publishers';

export const assassinsCreed: Game = Game.create(
  "Assassin's Creed Valhalla",
  59.99,
  ubisoft.id,
  ['action', 'historical'],
  new Date(2020, 4, 10),
);

export const hyperScape: Game = Game.create(
  'Hyper Scape',
  0.0,
  ubisoft.id,
  ['free to play', 'multiplayer'],
  new Date(2020, 3, 22),
);

export const portal2: Game = Game.create(
  'Portal 2',
  8.19,
  valve.id,
  ['strategy', 'tech'],
  new Date(2016, 5, 18),
);

export const shadowComplex: Game = Game.create(
  'Shadow Complex Remastered',
  14.99,
  epicGames.id,
  ['no idea what this game is'],
  new Date(2019, 7, 10),
);

export const gtaV: Game = Game.create(
  'Grand Theft Auto V',
  29.99,
  rockstarGames.id,
  ['life simulator (kind of)', 'best seller'],
  new Date(2019, 5, 27),
);

export const games: Game[] = [
  assassinsCreed,
  hyperScape,
  portal2,
  shadowComplex,
  gtaV,
];
