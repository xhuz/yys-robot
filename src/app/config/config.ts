/*
 * @Author: huz
 * @Date: 2019-09-25 22:48:49
 * @LastEditTime: 2019-09-26 00:45:16
 */
import {Shared} from '../interfaces/interfaces';
import TSPlug from 'ts.dll';

export const shared: Shared = {
  original: new TSPlug(),
  instances: [], // all ts instance
  handles: []  // all window handle
};

export const img480 = '../../assets/img-480';
export const imgDefault = '../../assets/img-default';
