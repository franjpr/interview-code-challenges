import { Robot } from '../models';

/**
 * SCENT ROBOT BLANK  OCT
 *    0    0     1    1
 *    0    1     0    2
 *    1    0     1    5
 *    1    1     0    6
 */
export type Cell = { scent?: 'Scent'; robot: Robot | ' ' };
