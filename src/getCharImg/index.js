'use strict'
const GetChar = require('./getChar')
const GetShip = require('./getShip')
const GetSquadShip = require('./getSquadShip')
module.exports = async(obj, showName = true)=>{
  try{
    if(obj.combatType == 1){
      return await GetChar(obj, showName)
    }else{
      if(obj?.squadLayout){
        return await GetSquadShip(obj, showName)
      }else{
        return await GetShip(obj, showName)
      }
    }
  }catch(e){
    console.error(e);
  }
}
