/*
 * @Author: huz
 * @Date: 2019-09-25 23:02:15
 * @LastEditTime: 2019-09-26 00:07:58
 */
import TSPlug from 'ts.dll';
import {findWindow} from './find-window';
import {shared} from '../config/config';

export function bindWindow() {
  const windowsHandle = findWindow(shared.original);
  const instance: TSPlug[] = [];
  for (const handle of windowsHandle) {
    const ts = new TSPlug();
    ts.bindWindow(handle, 'dx2', 'windows', 'windows', 0);
    instance.push(ts);
  }
  if (instance.length > 0) {
    console.log(`bind window success ${instance.length}`);
  } else {
    console.error('bind window failed');
  }
  return instance;
}
