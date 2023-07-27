'use strict'
const numeral = require('numeral')
const sorter = require('json-array-sorter')
const { damageType } = require('../enum')
const getAbilityType = require('./getAbilityType')
module.exports = async(unit = {}, uInfo = {})=>{
  let res = []
  const skills = await sorter([{column: 'id', order: 'ascending'}], unit.skill.filter(x=>(x.id.startsWith('basic') || x.id.startsWith('special')) && x.tier >=0))
  for(let s in skills){
    let tier = skills[s].tier
    let skill = await redis.get('ad-'+skills[s].id)
    let effectReference = skill?.tiers[tier].effectReference.filter(x=>x.id.includes('damage'))
    for(let e in effectReference){
      let effects = skill.abilityDamage.find(x=>x.id === effectReference[e].id), damageId, dmg
      if(effects?.param){
        for(let p in effects.param){
          if(damageType[effects.param[p]]) damageId = damageType[effects.param[p]];
        }
      }
      if(damageId) dmg = Math.floor((unit.stats?.final[damageId] || 0) * (+(effects.multiplierAmountDecimal) / 10000))
      if(dmg){
        const index = res.findIndex(x=>x.id === skill.skillId)
        if(index >= 0){
          res[index].damage.push(numeral(dmg).format('0,0'))
        }else{
          res.push({
            id: skill.skillId,
            type: getAbilityType(skill?.skillId),
            nameKey: (uInfo?.skills ? uInfo.skills[skill.skillId]?.nameKey:''),
            damage: [
              numeral(dmg).format('0,0')
            ]
          })
        }
      }
    }
  }
  return res
}
