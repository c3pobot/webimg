'use strict'
const mongo = require('mongoclient')
const enumTier = {
  0: 0,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
  9: 3
}
module.exports = async(datacron = {})=>{
  try{
    let template = (await mongo.find('datacronList', {_id: datacron.templateId}))[0]
    if(template?.setId){
      let abilityIcon, level = datacron.affix.length
      if(datacron.affix[2]) abilityIcon = datacron.affix[2].scopeIcon
      if(datacron.affix[5]) abilityIcon = datacron.affix[5].scopeIcon
      if(datacron.affix[8]) abilityIcon = datacron.affix[8].scopeIcon
      let html = '<div class="gac-datacron">'
        html += '<div class="datacron-icon">'
          html += '<span>'
            html += '<div>'
              html += '<div class="datacron-icon__icon datacron-icon__icon--size-sm">'
                html += '<div class="datacron-icon__callout-affix datacron-icon__callout-affix--size-sm">'
                  html += '<img class="datacron-icon__callout-affix-img" src=/thumbnail/'+abilityIcon+'.png>'
                html += '</div>'

                html += '<div class="datacron-icon__bg datacron-icon__bg--tier-'+enumTier[datacron.affix.length]+'"></div>'
                html += '<div class="datacron-icon__box">'
                  html += '<img class="datacron-icon__box-img" src="thumbnail/'+template.iconKey+'.png">'
                html += '</div>'
                html += '<div class="datacron-icon__primaries datacron-icon__primaries--size-sm">'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--first'+(datacron.affix.length > 2 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--second'+(datacron.affix.length > 5 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--third'+(datacron.affix.length > 8 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                html += '</div>'
              html += '</div>'
            html += '</div>'
          html += '</span>'
        html += '</div>'
      html += '</div>'
      return html
    }
  }catch(e){
    console.error(e);
  }
}
