/**
 * 加载字体
 */
export function loadFont_family() {
  return [{
    family: 'Arial',
    name: 'Arial'
  },
    {
      family: 'SimSun',
      name: '宋体'
    }, {
      family: 'SimHei',
      name: '黑体'
    }, {
      family: 'Microsoft Yahei',
      name: '微软雅黑'
    }, {
      family: 'Microsoft JhengHei',
      name: '微软正黑体'
    }, {
      family: 'KaiTi',
      name: '楷体'
    }, {
      family: 'NSimSun',
      name: '新宋体'
    }];
}

/**
 * 加载字体大小
 */
export function loadFont_Size() {
  return [6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
}
