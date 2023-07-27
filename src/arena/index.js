'use strict'
const Cmds = {}
Cmds.char = require('./char')
Cmds.ship = require('./ship')
module.exports = async(arena = [], type = 'char', info = {})=>{
  try{
    if(Cmds[type]) return await Cmds[type](arena, info)
  }catch(e){
    console.error(e);
  }
}
