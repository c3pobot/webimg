'use strict'
const isOdd = (num)=>{
  return num % 2
}
const getBkCSS = (oddCount)=>{
  let bkCSS = 'memberEven'
  if(isOdd(oddCount)) bkCSS = 'memberOdd'
  oddCount++
  return bkCSS
}
module.exports = (pObj = {}, mods = [])=>{
  let bkImg = 'gear-even', oddCount = 0, colCount = 0
  let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
  html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
  html += '<link href="/css/tbGP.css" rel="stylesheet">'
  html += '</head>'
  html += '<body>'
    html += '<table width=100% border="0" class="review">'
    html += `<tr class="title"><td>${pObj.name} unequipped </td></tr>`
    let oddCount = 0
    for(let i in mods){
      if(mods[i].loadouts?.length == 0) continue
      for(let m in mods[i].loadouts){
        html += `<tr class="${getBkCSS(oddCount)}"><td>${mods[i]?.loadouts[m]?.tab} > ${mods[i]?.loadouts[m]?.name} > ${mods[i]?.nameKey}-${mods[i]?.slot}</td></tr>`
      }
    }
    html += '</table>'
  html += '</body>'
  return html
}
