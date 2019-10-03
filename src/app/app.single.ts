/*
 * @Author: huz
 * @Date: 2019-10-03 23:50:56
 * @LastEditTime: 2019-10-03 23:53:15
 */
import {findWindow} from './actions/find-window';
import {Mode} from './interfaces/interfaces';
import {shared} from './config/shared';
import {single} from './mode/single.mode';
import {team} from './mode/team.mode';

start();

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
