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

export const screenConfig = {
  color: {
    yellow: 'f3b25e',
    auto: 'f8f3e0',
    fighterAutoAccept: 'edc791',
    normalAccept: '54b05f',
    battleButtonBlank: 'c7bdb4'
  },
  position: {
    singleBattle: [807, 422],
    teamBattle: [987, 528],
    auto: [71, 577],
    settlement: [980, 1030, 255, 275],
    continueInviteButton: [724, 396]
  }
};

export const img480 = '../../assets/img-480';
export const imgDefault = '../../assets/img-default';
