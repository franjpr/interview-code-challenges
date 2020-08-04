import { Grid } from './grid.model';
import { Robot } from './robot.model';

describe('Grid model specs', () => {
  it('initializes a matrix with the given dimensions', () => {
    let grid = new Grid(5, 5);

    expect(grid.getBoundaries().x).toEqual(5);
    expect(grid.getBoundaries().y).toEqual(5);
    expect(grid.getGrid()).toHaveLength(6);
    expect(grid.getGrid()[0]).toHaveLength(6);
  });

  it('places a robot at the given coordinates', () => {
    let robot = new Robot(0, 0, 'E', ['']);
    robot.setLimits(3, 3);

    let grid = new Grid(3, 3);

    grid.placeRobot(robot);

    expect(grid.getGrid()[0][0].robot.toString()).toEqual(robot.toString());
  });

  it('places a "Scent" where a robot fell', () => {
    let robot = new Robot(0, 0, 'E', ['F', 'F', 'F']);
    robot.setLimits(2, 2);

    let grid = new Grid(2, 2);

    grid.placeRobot(robot);

    expect(robot.isLost()).toBeTruthy();
    expect(grid.getGrid()[2][0].scent).toEqual('Scent');
    expect(robot.getLocation()).toEqual('2 0 E LOST');
  });

  it('a robot reach its final location', () => {
    let robot = new Robot(0, 0, 'E', ['F', 'F', 'L', 'F', 'F', 'R']);
    let grid = new Grid(3, 3);

    robot.setLimits(3, 3);
    grid.placeRobot(robot);

    let robotInGrid = grid.getCell(2, 2).robot;

    expect((robotInGrid as Robot).getLocation()).toEqual('2 2 E');
    expect(robot.isLost()).toBeFalsy();
  });

  it('a robot prevents from falling form a SCENTED cell', () => {
    let grid = new Grid(5, 3);
    let robotThatIsNotGoingToFall = new Robot(0, 3, 'W', [
      'L',
      'L',
      'F',
      'F',
      'F',
      'L',
      'F',
      'L',
      'F',
      'L',
    ]);

    let robotThatIsLost = new Robot(3, 2, 'N', [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
    ]);

    robotThatIsLost.setLimits(5, 3);
    robotThatIsNotGoingToFall.setLimits(5, 3);

    grid.placeRobot(robotThatIsLost);
    grid.placeRobot(robotThatIsNotGoingToFall);

    expect(robotThatIsLost.getLocation()).toEqual('3 3 N LOST');
    expect(grid.getCell(3, 3).scent).toEqual('Scent');
    expect(robotThatIsNotGoingToFall.getLocation()).toEqual('2 3 S');
  });
});
