/*
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-03 17:27:19
 */
import {bindWindow} from '../actions/bind-window';
import {getScreenConfig} from '../actions/get-screen-config';
import {Area} from 'ts.dll/@types/modules/interface';
import TSPlug from 'ts.dll';

process.on('message', handle => {
  const screenConfig = getScreenConfig();
  const ts = bindWindow(handle);
  const {color, position} = screenConfig;
  const {yellow, auto, reward} = color;
  const {singleBattle, singleBattleRange, auto: autoButton, settlement, rejectRewardButton, rejectRewardButtonRange} = position;
  const singleBattleArea = {
    x1: singleBattleRange[0],
    x2: singleBattleRange[1],
    y1: singleBattleRange[2],
    y2: singleBattleRange[3]
  };

  const rejectRewardArea = {
    x1: rejectRewardButtonRange[0],
    x2: rejectRewardButtonRange[1],
    y1: rejectRewardButtonRange[2],
    y2: rejectRewardButtonRange[3]
  };

  while (true) {
    singlePrepare(ts, singleBattle[0], singleBattle[1], yellow, singleBattleArea, reward, rejectRewardButton, rejectRewardArea);

    inTheBattle(ts, auto, autoButton, reward, rejectRewardButton, rejectRewardArea);

    battleFinished(ts, auto, autoButton, reward, rejectRewardButton, rejectRewardArea);

    inTheSettlement(ts, settlement, yellow, singleBattle, reward, rejectRewardButton, rejectRewardArea);

    msleep(1000, 1500);
  }

});

function singlePrepare(ts: TSPlug, colorX: number, colorY: number, targetColor: string, area: Area, rewardColor: string, rewardButton: number[], rewardArea: Area) {
  let retryNum = 0;
  let retryNum1 = 0;
  let flag = false;
  while (true) {
    retryNum++;
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    const testColor = ts.getColor(colorX, colorY);
    if (testColor === targetColor) {
      flag = true;
    } else if (retryNum > 10) {
      ts.unBindWindow();
      console.log('exit process');
      process.exit();
    }
    if (flag) {
      randomClick(ts, area);
      msleep(1000, 1333);
      const testColor1 = ts.getColor(colorX, colorY);
      retryNum1++;
      if (testColor1 !== targetColor) {
        retryNum1 = 0;
        console.log('click battle button');
        break;
      } else if (retryNum1 > 10) {
        ts.unBindWindow();
        console.log('exit process');
        process.exit();
      }
    }
    msleep(1000, 1888);
  }
}

function inTheBattle(ts: TSPlug, autoColor: string, autoButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    const battle = isBattle(ts, autoColor, autoButton);
    if (battle) {
      break;
    }
    msleep(200, 400);
  }
  msleep(100, 200);
  console.log('in the battle');
}

function battleFinished(ts: TSPlug, autoColor: string, autoButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    const battle = isBattle(ts, autoColor, autoButton);
    if (!battle) {
      break;
    }
    msleep(200, 400);
  }
  msleep(100, 200);
  console.log('battle finished');
}

function isBattle(ts: TSPlug, color: string, position: number[]) {
  const testColor = ts.getColor(position[0], position[1]);
  if (testColor === color) {
    return true;
  }
  return false;
}

function inTheSettlement(ts: TSPlug, settlementButton: number[], battleColor: string, battleButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    exitSettlement(ts, settlementButton);
    const testColor = ts.getColor(battleButton[0], battleButton[1]);
    if (testColor === battleColor) {
      console.log('into ready screen');
      break;
    }
    msleep(500, 1000);
  }
  console.log('new cycle!');
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
    console.log('reject reward success');
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
