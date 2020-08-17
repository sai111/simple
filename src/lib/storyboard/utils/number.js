// 千位符
export const formatThousand = function(num) {
  let numPreFix = ''
  let numArr = ''
  let numdist = ''
  // 处理负数
  if (num < 0) {
    numPreFix = '-'
    numArr = String(num).slice(1).split('').reverse()
  } else {
    numArr = String(num).split('').reverse()
  }
  for (let i = 0; i < numArr.length; i++) {
    numdist += numArr[i]
    if ((i + 1) % 3 === 0 && (i + 1) < numArr.length) {
      numdist += ','
    }
  }
  return numPreFix + numdist.split('').reverse().join('')
}

// 流量统计
export const formatFlow = function(num) {
	const table = [
  	{size: 1024 * 1024 * 1024, unit: 'Tb'},
    {size: 1024 * 1024, unit: 'Mb'},
    {size: 1024, unit: 'Kb'},
    {size: -1, unit: 'b'},
  ]
  for (const item of table) {
  	// 网络1B = 8b
    const _num = num * 8
    if (parseInt(num) >= item.size) {
    	return {
      	num: (parseInt(_num) / Math.abs(time.size)).toFixed(1),
        unit: item.unit
      }
    }
  }
}

// 中文数字格式化，num为数字，max为最大显示的长度
export const formatNum = function(num, max) {
	let newNum = null
  let unit = null
  let len = 0
  if (num < 10000) {
  	newNum = num
    unit = ''
  } else if (num < 10000 * 10000) {
  	newNum = num / 10000
    len = max - (parseInt(newNum) + '').split('').length
    len = len < 0 ? 0 : len
    newNum = newNum.toFixed(len <= 3 ? len : 3)
    unit = '万'
  } else if (num < 10000 * 10000 * 10000) {
  	newNum = num / (10000 * 10000)
    len = max - (parseInt(newNum) + '').split('').length
    len = len < 0 ? 0 : len
    newNum = newNum.toFixed(len <= 3 ? len : 3)
    unit = '亿'
  } else if (num < 10000 * 10000 * 10000 * 10000) {
  	newNum = num / (10000 * 10000 * 10000)
    len = max - (parseInt(newNum) + '').split('').length
    len = len < 0 ? 0 : len
    newNum = newNum.toFixed(len <= 3 ? len : 3)
    unit = '兆'
  } else if (num < 10000 * 10000 * 10000 * 10000 * 10000) {
  	newNum = num / (10000 * 10000 * 10000 * 10000)
    len = max - (parseInt(newNum) + '').split('').length
    len = len < 0 ? 0 : len
    newNum = newNum.toFixed(len <= 3 ? len : 3)
    unit = '万兆'
  }
  return {
  	num: newNum,
    unit: unit,
    decimalLen: len, // 小数点位符，谨慎使用
  }
}

export const formatPercent = function(num, sum) {
  return Math.round(parseInt(num) / sum * 10000) / 100 + '%'
}
