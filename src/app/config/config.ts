/*
 * @Author: huz
 * @Date: 2019-09-25 22:48:49
 * @LastEditTime: 2019-10-03 23:48:24
 */

export const screenConfig = {
  color: {
    yellow: 'f3b25e', // 黄色的挑战按钮
    auto: 'f8f3e0', // 自动战斗
    fighterAutoAccept: 'edc791', // 组队模式打手自动接受邀请
    normalAccept: '54b05f', // 组队模式常规邀请
    blankBattle: '2b2b2b', // 空白的挑战按钮
    reward: 'dd7260', // 悬赏关闭按钮
    team: 'e9cd73', // 组队挑战按钮
    defaultInvitation: '725f4d', // 默认邀请按钮,
    fontCooperative: 'f8f3e0', // 协战队伍文字颜色,
    fighterReady: '221611'
  },
  position: { // range 为随机点击区域的范围
    singleBattle: [807, 422],
    singleBattleRange: [807, 807 + 74, 422, 422 + 17],
    teamBattle: [1091, 576],
    teamBattleRange: [1070, 1105, 572, 630],
    auto: [71, 577],
    settlement: [980, 1030, 225, 275],
    teamSettlement: [189, 333, 23, 76],
    continueInviteButton: [724, 396],
    continueInviteButtonRange: [724 - 5, 724 + 5, 396 - 5, 396 + 5],
    rejectRewardButton: [750, 458],
    rejectRewardButtonRange: [745, 755, 453, 463],
    defaultInvitationButton: [499, 321],
    defaultInvitationButtonRange: [489, 509, 311, 331],
    blankBattleButton: [1067, 585],
    autoAcceptButtonRange: [16, 366, 122, 465], // 自动接受按钮出现的区域，方便findColor找色
    fontCooperativeRange: [68, 204, 14, 60], // 协战队伍文字出现的区域,
    fighterReadyPosition: [985, 587] // 辅助位置，组队打手进入了备战界面
  }
};

export const img480 = '../../assets/img-480';
export const imgDefault = '../../assets/img-default';
