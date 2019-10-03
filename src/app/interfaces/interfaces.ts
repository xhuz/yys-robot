/*
 * @Author: huz
 * @Date: 2019-09-25 23:07:29
 * @LastEditTime: 2019-10-03 13:41:24
 */

import TSPlug from 'ts.dll';

export const enum Mode {
  Single,
  Team
}

export interface Shared {
  original: TSPlug;
  handles: number[];
}

export interface Area {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
