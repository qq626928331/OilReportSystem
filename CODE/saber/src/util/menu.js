import store from "../store";


//默认为空，在关闭tab时 追加数据  打开页面后删除数据
//需要参数判断 是第一次打开还是tab切换
export const setKeepAliveExcludeMenus = (hlMenus, appendMen, isFirst) => {
  let keepAliveExcludeMenus = [];
  if (isFirst) {
    //第一次打开页面  清空该页面的缓存
    if (hlMenus.length > 0) {
      hlMenus.forEach((item, index) => {
        appendMen.forEach((ite, ind) => {
          if (item === ite) {
            hlMenus.splice(index, 1);
            return true;
          }
        })
      })
    }
  }else{
    //拼接元素
    if (hlMenus.length > 0) {
      hlMenus.forEach((item, index) => {
        appendMen.forEach((ite, ind) => {
          if (item !== ite) {
            hlMenus.push(ite)
            return true;
          }
        })
      })
    } else {
      appendMen.forEach((ite, ind) => {
        hlMenus.push(ite)
      })
    }
  }

  keepAliveExcludeMenus = [...new Set(hlMenus)];
  store.commit('SET_KEEP_ALIVE_EXCLUDE_MENUS', keepAliveExcludeMenus);
  console.log(keepAliveExcludeMenus);
  return keepAliveExcludeMenus;
}
