/*
 * @Author: huz
 * @Date: 2019-10-03 19:32:32
 * @LastEditTime: 2019-10-03 23:50:00
 */
import {bindWindow} from '../actions/bind-window';
import TSPlug from 'ts.dll';
import {Area} from 'ts.dll/@types/modules/interface';
import {getScreenConfig} from '../actions/get-screen-config';

process.on('message', handle => {
  console.log('[fighter] ' + handle);
  const ts = bindWindow(handle);
  const screenConfig = getScreenConfig();
  const {color, position} = screenConfig;
  const {reward, fighterAutoAccept, fighterReady} = color;
  const {teamSettlement, rejectRewardButton, rejectRewardButtonRange, continueInviteButtonRange, defaultInvitationButtonRange, autoAcceptButtonRange, fighterReadyPosition} = position;
  const rejectRewardArea = {
    x1: rejectRewardButtonRange[0],
    x2: rejectRewardButtonRange[1],
    y1: rejectRewardButtonRange[2],
    y2: rejectRewardButtonRange[3]
  };

  const autoAcceptButtonArea = {
    x1: autoAcceptButtonRange[0],
    x2: autoAcceptButtonRange[1],
    y1: autoAcceptButtonRange[2],
    y2: autoAcceptButtonRange[3]
  };

  while (true) {
    rejectReward(ts, reward, rejectRewardButton, rejectRewardArea);
    exitSettlement(ts, teamSettlement);
    const ret1 = ts.findColor(fighterAutoAccept, 1.0, 0, autoAcceptButtonArea);
    const {ret: code, x, y} = ret1;
    if (code > -1) {
      console.log('[fighter] fighter (auto) accept found at', x, y);
      const area = {
        x1: x - 5,
        x2: x + 5,
        y1: y - 5,
        y2: y + 5
      };
      findColorAndClick(ts, x, y, fighterAutoAccept, area, reward, rejectRewardButton, rejectRewardArea);
      console.log('[fighter] fighter clicked (auto) accept');
    }
    const testColor = ts.cmpColor(fighterReady, 0.9, fighterReadyPosition[0], fighterReadyPosition[1]);
    if (!testColor) {
      console.log('[fighter] fighter into ready screen');
      break;
    }
    msleep(500, 1000);
  }
  console.log('[fighter] fighter process exit');
  process.exit();
});

function findColorAndClick(ts: TSPlug, colorX: number, colorY: number, targetColor: string, area: Area, rewardColor: string, rewardButton: number[], rewardArea: Area) {
  let flag = false;
  while (true) {
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    const testColor = ts.getColor(colorX, colorY);
    console.log(testColor, targetColor);
    if (testColor === targetColor) {
      flag = true;
    }
    if (flag) {
      randomClick(ts, area);
      msleep(1000, 1333);
      const testColor1 = ts.getColor(colorX, colorY);
      if (testColor1 !== targetColor) {
        break;
      }
    }
    msleep(1000, 1888);
  }
}

function exitSettlement(ts: TSPlug, position: number[]) {
  const [x1, x2, y1, y2] = position;
  randomClick(ts, {x1, x2, y1, y2});
}

function rejectReward(ts: TSPlug, rewardColor: string, rewardButton: number[], rewardArea: Area) {
  const testColor = ts.getColor(rewardButton[0], rewardButton[1]);
  if (testColor === rewardColor) {
    randomClick(ts, rewardArea);
    msleep(1000, 1232);
    console.log('[fighter] reject reward success');
  }
  msleep(43, 99);
}

function randomClick(ts: TSPlug, {x1, x2, y1, y2}: Area) {
  const xr = getRandom(x1, x2);
  const yr = getRandom(y1, y2);
  ts.moveTo(xr, yr);
  msleep(100, 300);
  ts.leftClick();
  msleep(200, 300);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom(min: number, max: number) {
  return Math.random() * (Math.abs(max - min)) + min;
}

function msleep(a: number, b: number) {
  const n = getRandomInt(a, b);
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(a: number, b: number) {
  msleep(a * 1000, b * 1000);
}
