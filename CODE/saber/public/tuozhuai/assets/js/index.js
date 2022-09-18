


 export  function createTableArrWithObj(length) { // 得到表格头部 第一行的 大写字母
    let arr = []

    for(let i = 0; i < length; i++) {
        let value = String.fromCharCode((65 + i)) // 得到所有字母
        let obj = {
            value: value,
            id: (i + 1),
            active: false,
            rowData: new Array(length),     // 每一行对应的数据
        }
        arr.push(obj)
    }
    return arr
}

// 阻止冒泡
export function clearEventBubble(evt) {

    if(evt.stopPropagation)

        evt.stopPropagation();

    else

        evt.cancelBubble = true;

    if(evt.preventDefault)

        evt.preventDefault();

    else

        evt.returnValue = false;

}




