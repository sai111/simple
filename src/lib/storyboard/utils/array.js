// 将同类型的类型合并在一起
export const groupBy = function(data, type) {
  data.map((v) => v[type]).reduce((p, c, i) => {
    p[c] = (p[c] || []).concat(data[i])
    return p
  }, [])
}

// 数组去重
export const uniq = function(arr = []) {
  return arr.reduce((p, c) => p.includes(v) ? p : [...p, c], [])
}

// 数组分割
function Chunk(arr = [], size = 1) {
  return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];
}

// 数组最大最小值
function Max(arr = []) {
  return arr.reduce((t, v) => t > v ? t : v);
}

function Min(arr = []) {
  return arr.reduce((t, v) => t < v ? t : v);
}

// 判断是几维数组
function dimension_array_es6(arr) {
  if(arr instanceof Array) {
      return Math.max(...arr.map(e => {
          return 1 + parseInt(dimension_array_es6(e))
      }))
  } else {
      return 0
  }
}
