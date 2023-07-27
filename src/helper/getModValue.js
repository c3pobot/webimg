'use strict'
const numeral = require('numeral')
const { pct } = require("../enum")
module.exports = (statId, value)=>{
  let newValue
  if(pct[statId]){
    newValue = numeral(+value/1000000).format('0.00')+'%'
  }else{
    newValue = Math.floor(+value/100000000)
  }
  return newValue
}
