import {screenConfig} from '../config/config';
export function getScreenConfig(resolution: number = 1.333333333) {
  return transConfig(resolution);
}

function transConfig(resolution: number) {
  console.log(screenConfig);
  // let i: keyof typeof screenConfig.position;
  // for (i in screenConfig.position) {
  //   if (screenConfig.position.hasOwnProperty(i)) {
  //     const item = screenConfig.position[i];
  //     console.log(item);
  //   }

}
