/*
 * @Author: huz
 * @Date: 2019-09-25 22:46:57
 * @LastEditTime: 2019-09-26 00:33:31
 */

import {bindWindow} from './actions/bind-window';
import {Mode} from './interfaces/interfaces';
import {shared} from './config/config';
import {single} from './mode/single.mode';
import {team} from './mode/team.mode';

start();

export function start(mode: Mode = Mode.Single) {
  const ts = shared.instances = bindWindow();
  if (mode === Mode.Single) {
    single(ts);
  } else if (mode === Mode.Team) {
    team(ts);
  }
}
