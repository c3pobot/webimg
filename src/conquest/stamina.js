'use strict'
const isOdd = (num)=>{
  return num % 2
}
const getBkg = ()=>{
  let bkImg = 'unit-even'
  if(isOdd(oddCount)){
    bkImg = 'unit-odd'
  }else{
    bkImg = 'unit-even'
  }
  oddCount++;
  return bkImg
}
const getCurrentStamina = (stamina, time)=>{
  const timeDiff = Math.floor(+Date.now() / 1000) - +time
  const mins = Math.floor(+timeDiff / 60)
  return stamina + Math.floor(+mins / 30)
}
const timeTooMax = (stamina)=>{
  let res = (100 - +stamina) * 0.5
  return res
}
module.exports = async(data)=>{
  try{
    let oddCount = 0
    const getBkg = ()=>{
      let bkImg = 'unit-even'
      if(isOdd(oddCount)){
        bkImg = 'unit-odd'
      }else{
        bkImg = 'unit-even'
      }
      oddCount++;
      return bkImg
    }
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/conquest.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width="100%">'
    //
    html += '<tr class="title"><td colspan="4">'+data.name+'\'s Galactic Conquest</td></tr>'
    //html += '<tr class="status"><td align="right"><img class="currency" src="/asset/conquest-currency.png"></td><td class="status-td">  '+data.credits+'/3500</td><td align="right"><img class="currency" src="/asset/conquest-keys.png"></td><td class="status-td">'+data.keys+'/'+data.totalKeys+'</td></tr>'
    html += '<tr><td colspan="4"><table id="units" width="100%">'
    html += '<tr class="title"><td align="left">Unit</td><td>Stamina</td><td width="108px">Hours Till Max</td></tr>'
    let unitCount = 0
    if(data?.units?.length > 0){
      for(let i in data.units){
        const currentStamina = getCurrentStamina(data.units[i].remainingStamina, data.units[i].lastRefreshTime)
        if(currentStamina < 100){
          unitCount++;
          html += '<tr class="'+getBkg()+'"><td class="unit-name">'+data.units[i].nameKey+'</td><td class="unit-stamina">'+currentStamina+'%</td><td>'+timeTooMax(currentStamina)+'</td></tr>'
        }
      }
    }
    if(unitCount == 0) html += '<tr class="'+getBkg()+'"><td colspan="3">No units below 100% stamina</td></tr>'
    html += '</table></td></tr>'
    //
    html += '<tr><td colspan="4">Data Updated : '+(new Date(data.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
