'use strict'
const isOdd = (num)=>{
  return num % 2
}
const getRewardTier = (id)=>{
  let tier = 'T'
  tier += id.slice(-1)
  return tier
}
const getFeatType = (id, sector)=>{
  let name = 'S'+sector?.toString()
  if(name && id.includes('BOSS')) name = name.replace('S', 'B')
  if(name === 'S10') name = 'CQ'
  return name
}
const getCrateImg = (id)=>{
  const array = id.split('_')
  if(array.length > 0){
    const lastIndex = +array.length
    return array[lastIndex - 3]+'_'+array[lastIndex - 2]+'_'+array[lastIndex - 1]
  }
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
    html += '<tr class="status"><td align="right"><img class="currency" src="/asset/conquest-currency.png"></td><td class="status-td">  '+data.credits+'/3500</td><td align="right"><img class="currency" src="/asset/conquest-keys.png"></td><td class="status-td">'+data.keys+'/'+data.totalKeys+'</td></tr>'
    //feat table
    html += '<tr><td colspan="4"><table width="100%">'
    html += '<tr class="title"><td>Sector</td><td>Description</td><td>Status</td><td><img class="currency" src="/asset/conquest-keys.png"></td></tr>'
    if(data.feats && data.feats.length > 0){
      for(let i in data.feats){
        html += '<tr class="'+getBkg()+'"><td>'+getFeatType(data.feats[i].id, data.feats[i].sector)+'</td><td class="feat-desc">'+data.feats[i].descKey+'</td>'
        html += '<td class="feat-status">'+data.feats[i].currentValue+'/'+data.feats[i].completeValue+'</td>'
        html += '<td class="feat-reward">'+data.feats[i].reward+'</td></tr>'
      }
    }else{
      html += '<tr class="'+getBkg()+'"><td colspan="4">No uncompleted feats</td></tr>'
    }
    if(data.stars && data.stars.length > 0){
      for(let i in data.stars){
        html += '<tr class="'+getBkg()+'"><td>S'+data.stars[i].sector+'</td>'
        html += '<td class="feat-desc">Incomplete stars</td>'
        html += '<td class="feat-status">'+(data.stars[i].totalStars - data.stars[i].bossCount - data.stars[i].basicCount)+'/'+data.stars[i].totalStars+'</td>'
        html += '<td class="feat-reward">'+(data.stars[i].bossCount + data.stars[i].basicCount)+'</tr></tr>'
      }
    }else{
      html += '<tr class="'+getBkg()+'"><td colspan="4">Not missing any stars</td></tr>'
    }
    html += '</table></td></tr>'
    //reward table
    if(data?.rewards?.current?.primaryReward && data.rewards.current.primaryReward[0]){
      let colspan = 1
      if(data.rewards.next) colspan++
      if(data.rewards.max) colspan++
      html += '<tr><td colspan="4"><table width="100%"><tr class="title"><td'+(colspan > 1 ? ' colspan="'+colspan+'"':'')+'>Reward Status</td></tr>'
      html += '<tr class="'+getBkg()+'"><td>Current</td>'
      if(colspan > 1) html += '<td>Next</td>'
      if(colspan > 2) html += '<td>Max</td>'
      html += '</tr>'
      html += '<tr class="'+getBkg()+'"><td>'+getRewardTier(data.rewards.current.primaryReward[0].id)+' '+data.keys+'/'+data.rewards.current.rankStart+'</td>'
      if(data.rewards.next && data.rewards.next.rankStart) html += '<td>'+getRewardTier(data.rewards.next.primaryReward[0].id)+' '+data.keys+'/'+data.rewards.next.rankStart+'</td>'
      if(data.rewards.max && data.rewards.max.rankStart) html += '<td>'+getRewardTier(data.rewards.max.primaryReward[0].id)+' '+data.keys+'/'+data.rewards.max.rankStart+'</td>'
      html += '</tr>'
      html += '<tr class="'+getBkg()+'"><td><img class="crate-img" src="/asset/'+getCrateImg(data.rewards.current.primaryReward[0].id)+'.png"></td>'
      if(data?.rewards?.next?.primaryReward && data.rewards.next.primaryReward[0]) html += '<td><img class="crate-img" src="/asset/'+getCrateImg(data.rewards.next.primaryReward[0].id)+'.png"></td>'
      if(data?.rewards?.max?.primaryReward && data.rewards.max.primaryReward[0]) html += '<td><img class="crate-img" src="/asset/'+getCrateImg(data.rewards.max.primaryReward[0].id)+'.png"></td>'
      html += '</tr></table></td></tr>'
    }
    html += '<tr><td colspan="4">Data Updated : '+(new Date(data.updated)).toLocaleString('en-US', {timeZone: 'America/New_York'})+'</td></tr>'
    //
    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html
  }catch(e){
    console.error(e);
  }
}
