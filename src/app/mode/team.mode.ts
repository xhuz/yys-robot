/*
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-03 23:50:42
 */
import TSPlug from 'ts.dll';
import {shared} from '../config/shared';
import {bindWindow} from '../actions/bind-window';
import {getScreenConfig} from '../actions/get-screen-config';
import {Area} from 'ts.dll/@types/modules/interface';
import {fork} from 'child_process';
import {resolve as pathResolve} from 'path';
import {worker} from 'cluster';

export async function team() {
  if (shared.handles.length < 2) throw {message: 'window handles less than 2'};
  const screenConfig = getScreenConfig();
  const {color, position} = screenConfig;
  const {team, auto, reward} = color;
  const {teamBattleRange, teamBattle, auto: autoButton, settlement, rejectRewardButton, rejectRewardButtonRange} = position;
  const teamBattleArea = {
    x1: teamBattleRange[0],
    x2: teamBattleRange[1],
    y1: teamBattleRange[2],
    y2: teamBattleRange[3]
  };
  const rejectRewardArea = {
    x1: rejectRewardButtonRange[0],
    x2: rejectRewardButtonRange[1],
    y1: rejectRewardButtonRange[2],
    y2: rejectRewardButtonRange[3]
  };
  let driver = bindWindow(shared.handles[0]);
  let fighter = bindWindow(shared.handles[1]);
  const dColor = driver.cmpColor(team, 0.9, teamBattle[0], teamBattle[1]);
  const fColor = fighter.cmpColor(team, 0.9, teamBattle[0], teamBattle[1]);
  if (!fColor) {
    console.log('swapping handle');
    [driver, fighter] = [fighter, driver];
    [shared.handles[0], shared.handles[1]] = [shared.handles[1], shared.handles[0]];
  }
  if (dColor && fColor) {
    console.log('can not found battle button');
    throw {message: 'init failed'};
  }

  console.log(shared.handles);

  while (true) {
    singlePrepare(driver, fighter, teamBattle[0], teamBattle[1], team, teamBattleArea, reward, rejectRewardButton, rejectRewardArea);

    inTheBattle(driver, fighter, auto, autoButton, reward, rejectRewardButton, rejectRewardArea);

    battleFinished(driver, fighter, auto, autoButton, reward, rejectRewardButton, rejectRewardArea);

    await runWorker();
    console.log('new cycle');

    msleep(1000, 1500);
  }

}

function runWorker() {
  const d = new Promise<any>((resolve) => {
    const dWorker = fork(pathResolve(__dirname, '../workers/team-driver.worker.js'));
    dWorker.send(shared.handles[0]);
    dWorker.on('exit', () => {
      resolve();
    });
  });
  const f = new Promise<any>((resolve) => {
    const fWorker = fork(pathResolve(__dirname, '../workers/team-fighter.worker.js'));
    fWorker.send(shared.handles[1]);
    fWorker.on('exit', () => {
      resolve();
    });
  });
  return Promise.all([d, f]);
}

function singlePrepare(driver: TSPlug, fighter: TSPlug, colorX: number, colorY: number, targetColor: string, area: Area, rewardColor: string, rewardButton: number[], rewardArea: Area) {
  let flag = false;
  while (true) {
    rejectReward(driver, rewardColor, rewardButton, rewardArea);
    rejectReward(fighter, rewardColor, rewardButton, rewardArea);
    const testColor = driver.cmpColor(targetColor, 0.9, colorX, colorY);
    if (!testColor) {
      flag = true;
    }
    if (flag) {
      randomClick(driver, area);
      msleep(1000, 1333);
      const testColor1 = driver.cmpColor(targetColor, 0.9, colorX, colorY);
      if (testColor1) {
        console.log('click battle button');
        break;
      }
    }
    msleep(1000, 1888);
  }
}

function inTheBattle(driver: TSPlug, fighter: TSPlug, autoColor: string, autoButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(driver, rewardColor, rewardButton, rewardArea);
    rejectReward(fighter, rewardColor, rewardButton, rewardArea);
    const battle = isBattle(driver, fighter, autoColor, autoButton);
    if (battle) {
      break;
    }
    msleep(200, 400);
  }
  msleep(100, 200);
  console.log('in the battle');
}

function battleFinished(driver: TSPlug, fighter: TSPlug, autoColor: string, autoButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(driver, rewardColor, rewardButton, rewardArea);
    rejectReward(fighter, rewardColor, rewardButton, rewardArea);
    const battle = isBattle(driver, fighter, autoColor, autoButton);
    if (!battle) {
      break;
    }
    msleep(200, 400);
  }
  msleep(100, 200);
  console.log('battle finished');
}

function isBattle(driver: TSPlug, fighter: TSPlug,color: string, position: number[]) {
  const testColor = driver.getColor(position[0], position[1]);
  const testColor1 = fighter.getColor(position[0], position[1]);
  if (testColor === color || testColor1 === color) {
    return true;
  }
  return false;
}

function inTheSettlement(driver: TSPlug, fighter: TSPlug, settlementButton: number[], battleColor: string, battleButton: number[], rewardColor: string, rewardButton: number[], rewardArea: Area) {
  while (true) {
    rejectReward(driver, rewardColor, rewardButton, rewardArea);
    rejectReward(fighter, rewardColor, rewardButton, rewardArea);
    exitSettlement(driver, settlementButton);
    exitSettlement(driver, settlementButton);
    const testColor = driver.getColor(battleButton[0], battleButton[1]);
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
