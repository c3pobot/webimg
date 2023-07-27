'use strict'
const Cmds = {
  1: require('./getChar'),
  2: require('./getShip')
}

module.exports = async(unit = {}, uInfo = {})=>{
  try{
    if(Cmds[uInfo.combatType]) return await Cmds[uInfo.combatType](unit, uInfo)
  }catch(e){
    console.error(e);
  }
}
