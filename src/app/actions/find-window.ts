/*
 * @Author: huz
 * @Date: 2019-09-25 23:14:56
 * @LastEditTime: 2019-10-03 23:13:16
 */
import TSPlug from 'ts.dll';
import {shared} from '../config/shared';

export function findWindow(ts: TSPlug) {
  const windowHandelString = ts.enumWindowByProcess('client.exe', '', '', 16);  // onmyoji.exe
  if (windowHandelString) {
    const windowHandelRaw = windowHandelString.split(',');
    const windowHandel = shared.handles = windowHandelRaw.map(v => Number(v));
    return [...windowHandel];
  } else {
    console.log('not found window handle');
    return [];
  }
}
