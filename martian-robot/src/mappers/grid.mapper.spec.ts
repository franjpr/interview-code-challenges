import { gridMapper } from './grid.mapper';
import { Grid } from '../models';

describe('GridMapper specs', () => {
  it('throws error if input is undefined', () => {
    let fn = () => {
      gridMapper(undefined);
    };

    expect(fn).toThrow('Invalid input');
  });

  it('throws error if input is invalid', () => {
    let fn = () => {
      gridMapper('a 52');
    };

    let fnB = () => {
      gridMapper('1 52');
    };

    expect(fn).toThrow('Invalid coordinates, value must be > 0 and < 50');
    expect(fnB).toThrow('Invalid coordinates, value must be > 0 and < 50');
  });

  it('creates a grid with the given dimensions', () => {
    let grid: Grid = gridMapper('2 4');

    expect(grid.getGridSize()).toEqual('2 x 4');
    expect(grid.getGrid()).toHaveLength(3);
    expect(grid.getGrid()[0]).toHaveLength(5);
  });
});
