'use strict'
const numeral = require('numeral')
const { pct, reqStats } = require("../enum")
module.exports = (stats = {}, combatType = 1)=>{
  const res = {}
  for(let i in reqStats){
    let x = +reqStats[i]
    let modStat = 0
    if(combatType === 1){
      modStat = (stats.mods[x] || 0)
      if(x === 14) modStat = (stats.mods[21] || 0);
      if(x === 15) modStat = (stats.mods[21] || 0);
    }else{
      modStat = (stats.crew[x] || 0)
    }
    if(x === 14 || x === 15){
      res[x] = numeral((stats?.final[x] || 0)*100).format('0.00')+(modStat > 0 ? ' ('+numeral(modStat * 100).format('0.00')+')':'')+'%'
    }else{
      if(pct[x]){
        res[x] = numeral((stats?.final[x] || 0)*100).format('0.0')+(modStat > 0 ? ' ('+numeral(modStat * 100).format('0.0')+')':'')+'%'
      }else{
        res[x] = numeral((stats?.final[x] || 0)).format('0,0')+(modStat > 0 ? ' ('+numeral(modStat).format('0,0')+')':'')
      }
    }
  }
  return res
}
