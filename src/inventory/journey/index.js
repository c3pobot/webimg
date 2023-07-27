'use strict'
const GetGearImg = require('../../gear/getGearImg')
const GetRelicImg = require('../getRelicImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async( {info = {}, material = {}})=>{
  try{
    let gear = Object.values(material?.gear)
    let relic = Object.values(material?.relicMats)
    let bkImg = 'gear-even', oddCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/gear.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table padding="0" width="700px">'
        html += '<tr class="header-text"><td colspan="3">'+info.player+' '+info.nameKey+' Journey Guide Gear and relic mats needed</td></tr>'

        //html += '<tr class="header-text"><td><div style="margin-left: 10px" class="character-portrait__image-frame character-portrait__image-frame--size-small"><img class="character-portrait__img character-portrait__img--size-small" src="/thumbnail/'+uInfo.thumbnailName+'.png"></div></td><td colspan="2" align="left">'+(info.header || uInfo.nameKey)+'</td></tr>'
        if(gear?.length > 0){
          html += '<tr class="'+bkImg+'"><td colspan="3" class="gear-name">Additional Gear needed</td></tr>'
          if(info.includeInventory) html += '<tr class="'+bkImg+'"><td colspan=3 class="gear-name">Note: gear only looks at salvage, not crafted gear/components for what is in inventory</td></tr>'
          oddCount++
          for(let i in gear){
            if(info.includeInventory && gear[i].inventory >= gear[i].count) continue;
            if(isOdd(oddCount)){
              bkImg = 'gear-odd'
            }else{
              bkImg = 'gear-even'
            }
            oddCount++
            html += '<tr class="'+bkImg+'">'
            html += '<td class="gear-image">'
            html += await GetGearImg(gear[i])
            html += '</td>'
            html += '<td class="gear-name">'+gear[i].nameKey+'</td>'
            if(info.includeInventory){
              html += '<td>'+(gear[i].inventory || 0)+'/'+gear[i].count+'</td>'
            }else{
              html += '<td>x '+gear[i].count+'</td>'
            }
            html += '</tr>'
          }
        }else{
          oddCount++
          html += '<tr class="'+bkImg+'"><td colspan="3">You have all the gear needed</td></tr>'
        }
        if(relic?.length > 0){
          if(isOdd(oddCount)){
            bkImg = 'gear-odd'
          }else{
            bkImg = 'gear-even'
          }
          html += '<tr class="'+bkImg+'"><td colspan="3" class="gear-name">Additional Relic Material needed</td></tr>'
          oddCount++
          for(let i in relic){
            if(info.includeInventory && relic[i].inventory >= relic[i].count) continue;
            if(isOdd(oddCount)){
              bkImg = 'gear-odd'
            }else{
              bkImg = 'gear-even'
            }
            oddCount++
            html += '<tr class="'+bkImg+'">'
            html += '<td class="gear-image">'
            html += await GetRelicImg(relic[i])
            html += '</td>'
            html += '<td class="gear-name">'+relic[i].nameKey+'</td>'
            if(info.includeInventory){
              html += '<td>'+(relic[i].inventory || 0)+'/'+relic[i].count+'</td>'
            }else{
              html += '<td>x '+relic[i].count+'</td>'
            }
            html += '</tr>'
          }
        }else{
          if(isOdd(oddCount)){
            bkImg = 'gear-odd'
          }else{
            bkImg = 'gear-even'
          }
          html += '<tr class="'+bkImg+'"><td colspan="3">You have all the relic materials needed</td></tr>'

        }
        if(info.updated) html += '<tr><td colspan="3">Data Updated ' + (new Date(+info.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
      html += '</table>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
