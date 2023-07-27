'use strict'
const GetGearImg = require('../../gear/getGearImg')
const GetRelicImg = require('../getRelicImg')
const isOdd = (num)=>{
  return num % 2
}
module.exports = async(gear = [], relic = [], uInfo = {}, info = {})=>{
  try{
    let bkImg = 'gear-even', oddCount = 0, colCount = 0
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/gear.css" rel="stylesheet">'
    html += '<link href="/css/unitImg.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
      html += '<table padding="0" width="700px">'
        html += '<tr class="header-text"><td><div style="margin-left: 10px" class="character-portrait__image-frame character-portrait__image-frame--size-small"><img class="character-portrait__img character-portrait__img--size-small" src="/thumbnail/'+uInfo.thumbnailName+'.png"></div></td><td colspan="2" align="left">'+(info.header || uInfo.nameKey)+'</td></tr>'
        if(gear?.length > 0){
          html += '<tr class="'+bkImg+'"><td colspan="3" class="gear-name">Additional Gear needed for G'+info.gearLevel+'</td></tr>'
          oddCount++
          for(let i in gear){
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
            html += '<td>x '+gear[i].count+'</td>'
            html += '</tr>'
          }
        }else{
          oddCount++
          html += '<tr class="'+bkImg+'"><td colspan="3">You have all the gear needed for G'+info.gearLevel+'</td></tr>'
        }
        if(info?.gearLevel === 13){
          if(relic?.length > 0){
            if(isOdd(oddCount)){
              bkImg = 'gear-odd'
            }else{
              bkImg = 'gear-even'
            }
            html += '<tr class="'+bkImg+'"><td colspan="3" class="gear-name">Additional Material needed for R'+info.relicLevel+'</td></tr>'
            oddCount++
            for(let i in relic){
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
              html += '<td>x '+relic[i].count+'</td>'
              html += '</tr>'
            }
          }else{
            if(isOdd(oddCount)){
              bkImg = 'gear-odd'
            }else{
              bkImg = 'gear-even'
            }
            html += '<tr class="'+bkImg+'"><td colspan="3">You have all the relic materials needed for R'+info.relicLevel+'</td></tr>'
          }
        }
      html += '</table>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
