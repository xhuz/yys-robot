import TSPlug from 'ts.dll';
import {isMainThread, Worker, workerData} from 'worker_threads';
import {resolve} from 'path';

export function single(ts: TSPlug[]) {
  for (let i = 0; i < ts.length; i++) {
    const worker = new Worker(resolve(__dirname, '../workers/single.worker.js'), {
      workerData: i
    });
  }
}
