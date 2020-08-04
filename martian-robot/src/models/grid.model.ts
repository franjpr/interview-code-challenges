import { Cell } from '../types';
import { Robot } from './robot.model';

/**
 * Holds a grid with xAxis and yAxis dimensions inclusive
 */
export class Grid {
  private xAxis: number;
  private yAxis: number;

  private matrix: Array<Array<Cell>> = [];

  constructor(x: number, y: number) {
    this.xAxis = x;
    this.yAxis = y;
    this.createMatrix();
  }

  private createMatrix = () => {
    this.matrix = new Array(this.xAxis);

    for (let x = 0; x <= this.xAxis; x++) {
      this.matrix[x] = new Array<Cell>(this.yAxis);
      for (let y = 0; y <= this.yAxis; y++) {
        this.matrix[x][y] = { robot: ' ' };
      }
    }
  };

  /**
   * Loops while the robot is not lost and still has instructions.
   * At each iteration we check if the cell where the robot is its 'Scented'
   * in order to move or prevent it from falling and then we check
   * if the robot its lost in order to 'Scent' and clear the cell or
   * place it in a valid cell of the matrix.
   * @param robot
   */
  placeRobot = (robot: Robot): void => {
    this.matrix[robot.position.xPos][robot.position.yPos].robot = robot;

    while (robot.hasInstructions() && !robot.isLost()) {
      this.matrix[robot.position.xPos][robot.position.yPos].robot = ' ';

      if (this.isScented(robot.position.xPos, robot.position.yPos)) {
        robot.preventFall();
      } else {
        robot.updatePosition();
      }

      if (robot.isLost()) {
        this.matrix[robot.prevPosition.xPos][robot.prevPosition.yPos].scent =
          'Scent';
        this.matrix[robot.position.xPos][robot.position.yPos].robot = ' ';
      } else {
        this.matrix[robot.position.xPos][robot.position.yPos].robot = robot;
      }
    }
  };

  getGridSize = () => `${this.xAxis} x ${this.yAxis}`;
  getBoundaries = () => ({ x: this.xAxis, y: this.yAxis });
  getMaxYaxis = () => this.yAxis;
  getGrid = () => this.matrix;
  getCell = (x: number, y: number): Cell => this.matrix[x][y];
  isScented = (x: number, y: number): boolean =>
    this.getCell(x, y).scent === 'Scent';
}
