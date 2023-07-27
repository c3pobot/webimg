'use strict'
'use strict'
const moment = require('moment')
const css = require('src/webImg/css/gaHist.css')
const Cmds = {}
const FormatTime = (time)=>{
  let min = Math.floor(time / 60)
  let seconds = time - (min * 60)
  return (min+':'+seconds)
}
const enumResult = {
  1: 'Win',
  2: 'Loss',
  3: 'Quit',
  4: 'Timeout'
}
const GetGACharImg = async( obj = {}, uInfo )=>{
  try{
    if(!uInfo) uInfo = (await mongo.find('units', {_id: obj.unit}))[0]
    let charHTML = '<div class="collection-char">'
    let gClass = 'player-char-portrait char-portrait-full'
    if(uInfo.combatType === 1){
      gClass += ' char-portrait-full-gear-t'+obj.tier
      if(obj.tier > 12) gClass += ' char-portrait-full-alignment-'+(uInfo.categoryId.filter(x=>x === 'alignment_light').length > 0 ? 'light':'dark')+'-side'
    }
    charHTML += '<div class="'+gClass+'">'
    charHTML += '<img class="char-portrait-full-img" src="data:image/png;base64,'+uInfo.thumbnail+'" height="80" width="80">'
    charHTML += '<div class="char-portrait-full-gear"></div>'
    charHTML += '<div class="star'+(obj.rarity < 1 ? ' star-inactive':'')+' star1"></div>'
    charHTML += '<div class="star'+(obj.rarity < 2 ? ' star-inactive':'')+' star2"></div>'
    charHTML += '<div class="star'+(obj.rarity < 3 ? ' star-inactive':'')+' star3"></div>'
    charHTML += '<div class="star'+(obj.rarity < 4 ? ' star-inactive':'')+' star4"></div>'
    charHTML += '<div class="star'+(obj.rarity < 5 ? ' star-inactive':'')+' star5"></div>'
    charHTML += '<div class="star'+(obj.rarity < 6 ? ' star-inactive':'')+' star6"></div>'
    charHTML += '<div class="star'+(obj.rarity < 7 ? ' star-inactive':'')+' star7"></div>'
    if(uInfo.combatType === 1 && obj.relic > 2) charHTML += '<div class="char-portrait-full-relic">'+(+obj.relic - 2)+'</div>'
    charHTML += '<div class="char-portrait-full-level">'+obj.level+'</div>'
    charHTML += '</div>'
    charHTML += '</div>'
    return charHTML
  }catch(e){
    console.error(e)
  }
}
const GetUnits = async(obj = [])=>{
  try{
    let html = ''
    const baseIds = obj.map(x=>x.unit)
    const units = await mongo.find('units', {_id: {$in: baseIds}})
    for(let i in obj){
      const tempImg = await GetGACharImg(obj[i], units.find(x=>x._id === obj[i].unit))
      html += '<td class="unit-image unit-'+(obj[i].health ? 'alive':'dead')+'">'
      if(tempImg) html += tempImg
      html += '</td>'
    }
    return html
  }catch(e){
    console.error(e)
  }
}
const GetBattle = async( obj = {} )=>{
  try{
    const oLead = await GetGACharImg(obj?.attack?.leader_data)
    const dLead = await GetGACharImg(obj?.defense?.leader_data)

    let html = '<tr><td align="center" class="battle-'+obj.result+'">'
    //results table
    html += '<table><tr><td class="unit-image">'
    if(oLead) html += oLead
    html += '</td><td>vs</td><td class="unit-image">'
    if(dLead) html += dLead
    html += '</td></tr>'
    html += '<tr><td colspan="3" class="result-info">Result: '+enumResult[obj.result]+'<br>Length: '+FormatTime(obj.battle_length)+'<br>Attempt: '+((obj.defense_number || 0) + 1 )+'<br>Banners: '+obj.banners+'</td></tr>'
    html += '</table>'
    //resuts table
    html += '</td>'
    html += '<td>'
    //units table
    html += '<table>'
    //offense
    html += '<tr><td><table><tr><td class="unit-image unit-'+(obj?.attack?.leader_data?.health ? 'alive':'dead')+'">'
    if(oLead) html += oLead
    html += '</td>'
    if(obj?.attack?.members?.length > 0){
      const tempUnits = await GetUnits(obj.attack.members)
      if(tempUnits) html += tempUnits
    }
    html += '</tr>'
    if(obj.attack?.reinforcements?.length > 0){
      html += '<tr>'
      const tempReinforcements = await GetUnits(obj.attack.reinforcements)
      if(tempReinforcements) html += tempReinforcements
      html += '</tr>'
    }
    html += '</table></td></tr>'
    //offense
    //defense
    html += '<tr><td align="center">vs</td></tr>'
    html += '<tr><td><table><tr><td class="unit-image unit-'+(obj?.defense?.leader_data?.health ? 'alive':'dead')+'">'
    if(dLead) html += dLead
    html += '</td>'
    if(obj?.defense?.members?.length > 0){
      const tempUnits = await GetUnits(obj.defense.members)
      if(tempUnits) html += tempUnits
    }
    html += '</tr>'
    if(obj.defense?.reinforcements?.length > 0){
      html += '<tr>'
      const tempReinforcements = await GetUnits(obj.defense.reinforcements)
      if(tempReinforcements) html += tempReinforcements
      html += '</tr>'
    }
    html += '</table></td></tr>'
    //defense
    html += '</td></table>'
    return html
  }catch(e){
    console.error(e)
  }
}
const GetBattles = async( data = [] )=>{
  try{
    let html = '', count = 0
    for(let i in data){
      if(count == 0) html += '<tr>';
      html += '<td valign="top"><table>'
      const tempObj = await GetBattle(data[i])
      if(tempObj) html += tempObj
      html += '</table></td>'
      count++;
      if(data.length - 1 == +i && count != 2) count = 2
      if(count == 2){
        count = 0
        html += '</tr>'
      }
    }
    if(html !== '') return html
  }catch(e){
    console.error(e)
  }
}
const GetHTML = async(data = [], info = {}, type = 'offense')=>{
  try{
    let ships = data.filter(x=>x?.attack?.leader_data?.definition?.combat_type === 2)
    let chars = data.filter(x=>x?.attack?.leader_data?.definition?.combat_type === 1)
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet"><style>'+css+'</style></head>'
    html += '<body>'
    //start main table
    html += '<table><tbody>'
    html += '<tr><td colspan="2" class="player-name" width="100%">GAC '+moment.utc(+info.startTime).format('MM/DD')+' Round '+info.matchNumber+' '+(type === 'offense' ? 'Offense':'Defense')+' '+info.player_name+' ('+info.player_score+') vs '+info.opponent_name+' ('+info.opponent_score+')</td></tr>'
    if(chars?.length > 0){
      const tempObj = await GetBattles(chars)
      if(tempObj) html += tempObj
    }
    if(ships?.length > 0){
      const tempObj = await GetBattles(ships)
      if(tempObj) html += tempObj
    }
    html += '</tbody></table>'
    //end main table
    html += '</body>'
    return html
  }catch(e){
    console.error(e)
  }
}
module.exports = async(obj = {})=>{
  let offense, defense
  if(obj.battles?.playerAttackingZone?.length > 0) offense = await GetHTML(obj.battles.playerAttackingZone, obj, 'offense')
  if(obj.battles?.opponentAttackingZone?.length > 0) defense = await GetHTML(obj.battles.opponentAttackingZone, obj, 'defense')
  return({offense: offense, defense: defense})
}
