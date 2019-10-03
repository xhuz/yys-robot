/*
 * @Author: huz
 * @Date: 2019-10-03 13:18:30
 * @LastEditTime: 2019-10-03 13:18:30
 */
import TSPlug from 'ts.dll';
import {Shared} from '../interfaces/interfaces';

export const shared: Shared = {
  original: new TSPlug(),
  handles: []  // all window handle
};
