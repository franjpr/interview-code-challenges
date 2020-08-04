import { Robot } from './robot.model';

describe('Robot specs', () => {
  it('creates a robot with the given parameters', () => {
    let robot = new Robot(0, 0, 'E', []);
    expect(robot).toBeTruthy();
  });

  it('updates the robot position according to the instructions', () => {
    let robotA = new Robot(0, 0, 'E', ['R']);
    let robotB = new Robot(0, 0, 'E', ['F', 'F']);

    robotA.setLimits(5, 3);
    robotB.setLimits(5, 3);
    robotA.updatePosition();
    robotB.updatePosition();
    robotB.updatePosition();

    expect(robotA.orientation).toEqual('S');
    expect(robotB.position.xPos).toEqual(2);
  });

  it('set robot lost if it moves off the grid', () => {
    let robot = new Robot(0, 0, 'S', ['F']);
    robot.setLimits(2, 2);

    expect(robot.isLost()).toBeFalsy();
    robot.updatePosition();

    expect(robot.orientation).toEqual('S');
    expect(robot.position.yPos).toEqual(0);
    expect(robot.isLost()).toBeTruthy();
  });

  it('throws error if grid limits are not set', () => {
    let robot = new Robot(0, 0, 'S', ['F']);
    let fn = () => {
      robot.updatePosition();
    };
    expect(fn).toThrow('Must set robot limits in order to start moving');
  });
});
