/*
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-03 20:59:07
 */
import {screenConfig} from '../config/config';
export function getScreenConfig(resolution: 1 | 1.333333333 = 1.333333333) {
  if (resolution === 1) {
    return screenConfig;
  }
  return transConfig(resolution);
}

function transConfig(resolution: 1 | 1.333333333) {
  let i: keyof typeof screenConfig.position;
  for (i in screenConfig.position) {
    if (screenConfig.position.hasOwnProperty(i)) {
      const item = screenConfig.position[i];
      screenConfig.position[i] = item.map(v => v / resolution);
    }
  }
  screenConfig.color.auto = 'f4efdc';
  return screenConfig;
}
