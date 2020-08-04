import { Grid } from '../models';

/**
 * returns a Grid with NxM dimensions specified in the parameter
 * @param input
 */
export const gridMapper = (input: string): Grid => {
  if (!input) {
    throw new Error('Invalid input');
  }
  input = input.trim();

  let coordinatesRegexp = new RegExp(/^\d{1,2}\s\d{1,2}$/);

  if (!coordinatesRegexp.test(input)) {
    throw new Error('Invalid coordinates, value must be > 0 and < 50');
  }

  let [x, y] = input.split(' ').map(Number);

  if (!validCoordinates(x, y)) {
    throw new Error('Invalid coordinates, value must be > 0 and < 50');
  }

  return new Grid(x, y);
};

const validCoordinates = (x: number, y: number): boolean =>
  x <= 50 && y <= 50 && x >= 0 && y >= 0;
