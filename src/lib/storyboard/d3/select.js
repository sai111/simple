// 元素选择

function none() {}

function selector(selector) {
  return selector === null ? none: function() {
    return this.querySelector(selector)
  }
}

function formatArray(arr) {
  return typeof arr === 'object' && 'length' in arr ? 
}

function Selection() {

}


export default class selector {

  constructor() {
    
  }
}
