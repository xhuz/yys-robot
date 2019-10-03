/*
 * @Author: huz
 * @Date: 2019-09-25 23:02:15
 * @LastEditTime: 2019-10-03 16:44:22
 */
import TSPlug from 'ts.dll';
import {findWindow} from './find-window';
import {shared} from '../config/shared';

// export function bindWindow(handle: number) {
//   const windowsHandle = findWindow(shared.original);
//   const instance: TSPlug[] = [];
//   for (const handle of windowsHandle) {
//     const ts = new TSPlug();
//     ts.bindWindow(handle, 'dx2', 'windows', 'windows', 0);
//     instance.push(ts);
//   }
//   if (instance.length > 0) {
//     console.log(`bind window success ${instance.length}`);
//   } else {
//     console.error('bind window failed');
//   }
//   return instance;
// }

export function bindWindow(handle: number) {
  const ts = new TSPlug();
  const ret = ts.bindWindow(handle, 'dx2', 'windows', 'windows', 0);
  if (ret === 1) {
    console.log('bind window success');
    return ts;
  }
  throw {message: 'bind window failed'};
}
