/*
 * @Author: huz
 * @Date: 2019-10-03 19:32:56
 * @LastEditTime: 2019-10-03 19:32:56
 */
const path = require('path');

require('ts-node').register();
require(path.resolve(__dirname, './team-driver.worker.ts'));
