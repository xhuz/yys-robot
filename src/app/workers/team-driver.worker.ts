/*
 * @Author: huz
 * @Date: 2019-10-03 19:32:32
 * @LastEditTime: 2019-10-03 23:49:24
 */
import {bindWindow} from '../actions/bind-window';
import TSPlug from 'ts.dll';
import {Area} from 'ts.dll/@types/modules/interface';
import {getScreenConfig} from '../actions/get-screen-config';

process.on('message', handle => {
  console.log('[driver] ' + handle);
  const ts = bindWindow(handle);
  const screenConfig = getScreenConfig();
  const {color, position} = screenConfig;
  const {yellow, reward, defaultInvitation, blankBattle, team} = color;
  const {teamBattle, blankBattleButton, teamSettlement, rejectRewardButton, rejectRewardButtonRange, continueInviteButton, continueInviteButtonRange, defaultInvitationButton, defaultInvitationButtonRange} = position;
  const rejectRewardArea = {
    x1: rejectRewardButtonRange[0],
    x2: rejectRewardButtonRange[1],
    y1: rejectRewardButtonRange[2],
    y2: rejectRewardButtonRange[3]
  };

  const defaultInvitationArea = {
    x1: defaultInvitationButtonRange[0],
    x2: defaultInvitationButtonRange[1],
    y1: defaultInvitationButtonRange[2],
    y2: defaultInvitationButtonRange[3]
  };

  const continueInviteArea = {
    x1: continueInviteButtonRange[0],
    x2: continueInviteButtonRange[1],
    y1: continueInviteButtonRange[2],
    y2: continueInviteButtonRange[3]
  };

  while (true) {
    rejectReward(ts, reward, rejectRewardButton, rejectRewardArea);
    exitSettlement(ts, teamSettlement);
    const continueColor = ts.getColor(continueInviteButton[0], continueInviteButton[1]);
    if (continueColor === yellow) {
      const testColor = ts.getColor(defaultInvitationButton[0], defaultInvitationButton[1]);
      if (testColor === defaultInvitation) {
        findColorAndClick(ts, defaultInvitationButton[0], defaultInvitationButton[1], defaultInvitation, defaultInvitationArea, reward, rejectRewardButton, rejectRewardArea);
        console.log('[driver] ticked default Invitation button');
      }
      findColorAndClick(ts, continueInviteButton[0], continueInviteButton[1], yellow, continueInviteArea, reward, rejectRewardButton, rejectRewardArea);
      console.log('[driver] clicked continue invite fighter');
      break;
    }
    const testColor = ts.cmpColor(blankBattle, 0.9, blankBattleButton[0], blankBattleButton[1]);
    const testColor1 = ts.cmpColor(team, 0.9, teamBattle[0], teamBattle[1]);
    if (!testColor || !testColor1) {
      console.log('[driver] driver into ready screen');
      break;
    }
    msleep(500, 1000);
  }
  console.log('[driver] driver process exit');
  process.exit();
});

function findColorAndClick(ts: TSPlug, colorX: number, colorY: number, targetColor: string, area: Area, rewardColor: string, rewardButton: number[], rewardArea: Area) {
  let flag = false;
  while (true) {
    rejectReward(ts, rewardColor, rewardButton, rewardArea);
    const testColor = ts.getColor(colorX, colorY);
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
    console.log('[driver] reject reward success');
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
