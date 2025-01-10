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
module.exports = ({ members = [], missingDeployment = '0', memberCount = 0, guildMemberCount = 0, guildName })=>{
  let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
  html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
  html += '<link href="/css/tbGP.css" rel="stylesheet">'
  html += '</head>'
  html += '<body>'
    html += '<table width=100% border="0" class="review">'
    html += `<tr class="title"><td colspan="6">${guildName} Members with possible missing deployment (${memberCount}/${guildMemberCount})</td></tr>`
    html += `<tr class="memberOdd"><td>Name</td><td>Deployed</td><td>Not Deployed</td><td>Total</td><td>Char</td><td>Ship</td></tr>`
    let oddCount = 0
    for(let i in members){
      html += `<tr class="${getBkCSS(oddCount)}"><td>${members[i].name}</td><td>${members[i].gpDeployed}</td><td>${members[i].gpNotDeployed}</td><td>${members[i].gp}</td><td>${members[i].gpChar}</td><td>${members[i].gpShip}</td></tr>`
      oddCount++
    }
    html += '</table>'
  html += '</body>'
  return html
}
