'use strict'
const HP = require('../../helper')
module.exports = (skills = [], uInfo = {})=>{
  try{
    let html
    for(let i in skills){
      const skill = uInfo.skills[skills[i].id]
      if(skill?.zetaTier || skill?.omiTier){
        if(!html) html = ''
        if(skill?.omiTier && +skills[i].tier + 2 >= skill.omiTier){
          html += '<tr><td colspan="3" class="unit-zeta"><img src="/asset/tex.skill_omicron.png"> '+HP.getAbilityType(skills[i].id)+' : '+skill.nameKey+'</td></tr>'
        }else{
          if(skill?.zetaTier && +skills[i].tier + 2 >= skill.zetaTier){
            html += '<tr><td colspan="3" class="unit-zeta"><img src="/asset/tex.skill_zeta.png"> '+HP.getAbilityType(skills[i].id)+' : '+skill.nameKey+'</td></tr>'
          }
        }
      }
    }
    return html
  }catch(e){
    console.error(e)
  }
}
