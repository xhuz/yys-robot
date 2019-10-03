/*
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-03 12:28:54
 */
import {fork} from 'child_process';
import {shared} from '../config/shared';
import {resolve} from 'path';

export function single() {
  for (const handle of shared.handles) {
    const worker = fork(resolve(__dirname, '../workers/single.worker.js'));
    worker.send(handle);
  }
}
