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
      if(level > 0) abilityIcon = datacron.affix[level - 1]?.scopeIcon
      let html = '<div class="gac-datacron">'
        html += '<div class="datacron-icon">'
          html += '<span>'
            html += '<div>'
              html += '<div class="datacron-icon__icon datacron-icon__icon--size-sm">'
                html += '<div class="datacron-icon__callout-affix datacron-icon__callout-affix--size-sm">'
                  html += '<img class="datacron-icon__callout-affix-img" src=/thumbnail/'+abilityIcon+'.png>'
                html += '</div>'

                html += '<div class="datacron-icon__bg datacron-icon__bg--tier-'+(enumTier[datacron.affix.length] || 3)+'"></div>'
                html += '<div class="datacron-icon__box">'
                  html += '<img class="datacron-icon__box-img" src="thumbnail/'+template.iconKey+'.png">'
                html += '</div>'
                if(!template.focused){
                  html += '<div class="datacron-icon__primaries datacron-icon__primaries--max-3">'
                    html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-1'+(datacron.affix.length > 2 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                    html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-2'+(datacron.affix.length > 5 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                    html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-3'+(datacron.affix.length > 8 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '</div>'
                }else{
                  html += '<div class="datacron-icon__primaries datacron-icon__primaries--max-5">'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-1'+(datacron.affix.length > 2 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-2'+(datacron.affix.length > 5 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-3'+(datacron.affix.length > 8 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-4'+(datacron.affix.length > 11 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '<div class="datacron-icon__primary datacron-icon__primary--size-sm datacron-icon__primary--t-5'+(datacron.affix.length > 14 ? ' datacron-icon__primary--is-active':'')+'"></div>'
                  html += '</div>'
                }
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
