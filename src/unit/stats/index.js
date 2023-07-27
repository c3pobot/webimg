'use strict'
const GetUnitStats = require('./getUnitStats')
const GetUnitMods = require('./getUnitMods')
module.exports = async(unit = {}, info = {})=>{
  try{
    //header
    let colSpan = 1
    if(unit.combatType === 1 && unit.unitMods?.length > 0) colSpan = 2
    //let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet"><link rel="stylesheet" type="text/css" href="static/css/unit.css"></head>'
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/unit.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table class="unit-image">'
    html += '<tr>'
    html += '<td valign="top">'
    //unit start
      html += '<table class="unit-image-inner">'
      html += '<tr><td colspan="2"><table class="unit-portrait" background="/portrait/'+unit.thumbnailName+'.png">'
      html += '<tr><td class="unit-name">'+unit.nameKey+'</td></tr>'
      html += '<tr><td colspan="3">&nbsp;</td></tr>'
        //unitextra start
        html += '<tr><td valign="bottom"><table class="unit-extra" id="unit-extra">'
        if(unit.combatType === 1 && unit.skills?.length > 0){
          for(let i in unit.skills) html += '<tr><td colspan="3" class="unit-zeta"><img src="/asset/'+unit.skills[i].img+'.png"> '+unit.skills[i].type+' : '+unit.skills[i].nameKey+'</td></tr>'
        }
        html += '<tr>'
        html += '<td class="unit-level">L'+unit.level+'</td>'
        html += '<td class="unit-rarity">'
        for(let i=0;i<7;i++) html += '<img src="/asset/'+(i < unit.rarity ? 'star-yellow':'star-grey')+'.png">';
        html += '</td>'
        if(unit.combatType === 1){
          html += '<td class="unit-gear"><div style="color: '+unit.gear?.color+'">'+(unit.gear?.value)+'</div></td>'
        }else{
          html += '<td>&nbsp;</td>'
        }
        html += '</tr>'
        html += '</table></td></tr>'
        //unitextra end

      html += '</table></td></tr>'
      const unitStats = await GetUnitStats(unit)
      if(unitStats) html += unitStats
      html += '</table>'
    //unit end
    html += '</td>'
    //mods start
    if(unit.combatType === 1 && unit.unitMods?.length > 0){
      const unitMods = await GetUnitMods(unit.unitMods);
      if(unitMods) html += unitMods
    }
    html += '</tr>'
    if(info.footer) html += '<tr><td colspan="'+colSpan+'" class="footer-text">'+info.footer+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return {html: html}
  }catch(e){
    console.error(e)
  }
}
