"use strict";
const specUnits = require("./specUnits.js")
const numeral = require('numeral')
module.exports = (unit = {})=>{
  try{
    const baseId = unit.definitionId?.split(':')[0]
    if(specUnits.base[baseId]){
      const obj = {stats: [], nameKey: specUnits.base[baseId].nameKey}
      if(baseId === "YOUNGCHEWBACCA"){
        obj.stats.push({
          nameKey: "ATP",
          value: numeral(( (unit.stats.final[28] || 0) * 0.6 ) / ( ( (unit.stats.final[1] || 0) * 1.8 ) *0.1 )).format("0.00")
        })
      }
      if(baseId === "BB8"){
        for(let i in specUnits.base[baseId].statsList){
          obj.stats.push({
            nameKey: i+" Droid Allies",
            value: Math.floor((1 / (1 - ((specUnits.base[baseId].statsList[i] + 1) * 0.08))) * (unit.stats.final[5] || 0))
          })
        }
      }
      return obj
    }
  }catch(e){
    console.log(e)
  }
}
