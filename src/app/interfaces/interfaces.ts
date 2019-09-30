/*
 * @Author: huz
 * @Date: 2019-09-25 23:07:29
 * @LastEditTime: 2019-09-26 00:44:18
 */

import TSPlug from 'ts.dll';

export const enum Mode {
  Single,
  Team
}

export interface Shared {
  original: TSPlug;
  instances: TSPlug[];
  handles: number[];
}
