'use strict'
const GetChar = require('./getChar')
const GetShip = require('./getShip')
const GetSquadShip = require('./getSquadShip')
module.exports = (obj, showName = true)=>{
  try{
    if(obj.combatType == 1){
      return GetChar(obj, showName)
    }else{
      if(obj?.squadLayout){
        return GetSquadShip(obj, showName)
      }else{
        return GetShip(obj, showName)
      }
    }
  }catch(e){
    console.error(e);
  }
}
