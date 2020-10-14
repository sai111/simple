/**
* 把原始的数据
* field1 field2 field3
*   1      2      3
*   2      3      4
* 这样的数据格式转换为内部的
* [{field:'field1',index:0,data:[1,2]} ......]
* 这样的结构化数据格式。
*/

const { isArray } = require('core-js/fn/array')

// 如果应用传入的数据是[{name:name, sex:sex ...} , ...] 这样的数据，就自动转换为chartx需要的矩阵格式数据
function parse2MatrixData(list) {
  if (list === undefined || list === null) {
    list = []
  }
  // 检测第一个数据是否为一个array, 否就是传入了一个json格式的数据
  if (list.length > 0 && !Array.isArray(list[0])) {
    let newArr = []
    let fields = []
    let fieldNum = 0
    for (let i = 0, l=list.length; i < l; i++ ) {
      let row = list[i]
      if (i === 0) {
        for (let f in row) {
          fields.push(f)
        }
        newArr.push(fields)
        fieldNum = fields.length
      }
      let _rowData = []
      for( let j = 0; j < fieldNum; j++ ){
        _rowData.push(row[fields[j]])
      }
      newArr.push( _rowData )
    }
    return newArr
  } else {
    return list
  }
}

function parse2JsonData(list){
  let newArr = list
  //检测第一个数据是否为一个array, 否就是传入了一个json格式的数据
  if (list.length > 0 && !Array.isArray(list[0])) {
      newArr = []
      let fields = list[0]
      let fl = fields.length
      for( let i = 1, l = list.length; i < l; i++){
          let obj = {}
          for( let fi = 0; fi < fl; fi++ ){
            obj[fields[fi]] = list[i][fi]
          }
          newArr.push(obj)
      }
      return newArr
  }
}

/**
 * 
 * @param {*} dataOrg 原始数据
 * @param {*} opt 
 */
export default function (dataOrg, opt) {
  // 数据框架集合
  let dataFrame = {
    length: 0,
    org: [], // 最原始的数据，一定是个行列式，因为如果发现是json格式数据，会自动转换为行列式
    jsonOrg: [], // 原始数据的json格式
    data: [], // 最原始的数据转化后的数据格式(range取段过后的数据)：[o,o,o] o={field:'val1',index:0,data:[1,2,3]}
    fields: [],
    range: {
      start: 0,
      end: 0
    },
    filters: [] // 数据过滤器，在range的基础上
  }

  function _initHandle(dataOrg) {
    // 数据做一份拷贝，避免污染源数据
    dataOrg = JSON.parse(JSON.stringify(dataOrg, function(k, v) {
      if (v === undefined) {
        return null
      }
      return v
    }))
    if (!dataOrg || dataOrg.length === 0) {
      return dataFrame
    }

    // 检测第一个数据是否为一个array, 否就是传入了一个json格式的数据
    if (dataOrg.length > 0 && !Array.isArray(dataOrg[0])) {
      dataFrame.jsonOrg = dataOrg
      dataOrg = parse2MatrixData(dataOrg)
      dataFrame.org = dataOrg
    } else {
      dataFrame.org = dataOrg
      dataFrame.jsonOrg = parse2JsonData(dataOrg)
    }
    // 设置好数据区间end值
    dataFrame.range.end = dataOrg.length - 1 - 1
    if (dataOrg.length && dataOrg[0].length && !~dataOrg[0].indexOf('__index__')) {
      // 如果数据中没有用户自己设置的__index__，那么就主动添加一个__index__，来记录元数据中的index
      for (let i = 0; i < dataOrg.length; i++) {
        if (!i) {

        } else {
          
        }
        
      }
    }
  }
}
