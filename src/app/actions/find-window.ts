/*
 * @Author: huz
 * @Date: 2019-09-25 23:14:56
 * @LastEditTime: 2019-09-26 00:42:05
 */
import TSPlug from 'ts.dll';
import {shared} from '../config/config';

export function findWindow(ts: TSPlug) {
  const windowHandelString = ts.enumWindowByProcess('onmyoji.exe', '', '', 16);
  if (windowHandelString) {
    const windowHandelRaw = windowHandelString.split(',');
    const windowHandel = windowHandelRaw.map(v => Number(v));
    shared.handles = windowHandel;
    return [...windowHandel];
  } else {
    console.log('not found window handle');
    return [];
  }
}
