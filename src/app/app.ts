/*
 * @Author: huz
 * @Date: 2019-09-25 22:46:57
 * @LastEditTime: 2019-10-03 17:58:58
 */

import {findWindow} from './actions/find-window';
import {Mode} from './interfaces/interfaces';
import {shared} from './config/shared';
import {single} from './mode/single.mode';
import {team} from './mode/team.mode';

start(Mode.Team);

export function start(mode: Mode = Mode.Single) {
  const windowHandles = findWindow(shared.original);
  if (windowHandles.length === 0) return;
  if (mode === Mode.Single) {
    single();
  } else if (mode === Mode.Team) {
    // tslint:disable-next-line: no-floating-promises
    team();
  }
}
