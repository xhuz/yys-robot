/*
 * @Author: huz
 * @Date: 2019-09-25 22:46:57
 * @LastEditTime: 2019-09-26 00:33:31
 */

import {bindWindow} from './components/bind-window';
import {Mode} from './interfaces/interfaces';
import {shared} from './config/config';

start();

export function start(mode: Mode = Mode.Single) {
  const ts = shared.instances = bindWindow();
}
