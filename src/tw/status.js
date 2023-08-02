'use strict'
const isOdd = (num)=>{
  return num % 2
}
module.exports = (data = {})=>{
  try{
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet">'
    html += '<link href="/css/stats.css" rel="stylesheet">'
    html += '</head>'
    html += '<body>'
    html += '<table width=100% border="0" class="review">'

    html += '<tr class="title"><td>Max Perfect Score</td><td colspan="2">'+data.banners?.perfectScore+'</td></tr>'
    html += '<tr class="ltbg"><td colspan="3">'+data.banners?.home?.name+'</td></tr>'
    html += '<tr class="ltbg"><td>Perfect Score</td><td colspan="2">'+data.banners?.home?.perfectScore+'</td></tr>'
    html += '<tr class="ltbg"><td>Current Score</td><td colspan="2">'+data.banners?.home?.finalScore+'</td></tr>'
    html += '<tr class="ltbg"><td>Best Possible Score</td><td colspan="2">'+data.banners?.home?.bestScore+'</td></tr>'
    html += '<tr class="ltbg"><td width="50%">Victories</td><td>'+data.banners?.home?.defeatedTotal+'/'+data.maxBattles+'</td><td width="25%">Char Drops</td></tr>'
    html += '<tr class="ltbg"><td>Dropped Battles</td><td>'+(data.drops?.home?.charDrops + data.drops?.home?.shipDrops)+'</td><td>'+data.drops?.home?.charDrops+'</td></tr>'
    html += '<tr class="ltbg"><td>Banners Lost - Drops</td><td>'+(data.drops?.home?.charBannerDrops + data.drops?.home?.shipBannerDrops)+'</td><td>Ship Drops</td></tr>'
    html += '<tr class="ltbg"><td>Banners Lost - Units</td><td>'+data.drops?.home?.units+'</td><td>'+data.drops?.home?.shipDrops+'</td></tr>'
    html += '<tr class="ltbg"><td>Banners Lost - Total</td><td>'+(data.drops?.home?.charBannerDrops + data.drops?.home?.shipBannerDrops + data.drops?.home?.units)+'</td><td>&nbsp;</td></tr>'

    html += '<tr class="dkbg"><td colspan="3">'+data.banners?.away?.name+'</td></tr>'
    html += '<tr class="dkbg"><td>Perfect Score</td><td colspan="2">'+data.banners?.away?.perfectScore+'</td></tr>'
    html += '<tr class="dkbg"><td>Current Score</td><td colspan="2">'+data.banners?.away?.finalScore+'</td></tr>'
    html += '<tr class="dkbg"><td>Best Possible Score</td><td colspan="2">'+data.banners?.away?.bestScore+'</td></tr>'
    html += '<tr class="dkbg"><td width="50%">Victories</td><td>'+data.banners?.away?.defeatedTotal+'/'+data.maxBattles+'</td><td width="25%">Char Drops</td></tr>'
    html += '<tr class="dkbg"><td>Dropped Battles</td><td>'+(data.drops?.away?.charDrops + data.drops?.away?.shipDrops)+'</td><td>'+data.drops?.away?.charDrops+'</td></tr>'
    html += '<tr class="dkbg"><td>Banners Lost - Drops</td><td>'+(data.drops?.away?.charBannerDrops + data.drops?.away?.shipBannerDrops)+'</td><td>Ship Drops</td></tr>'
    html += '<tr class="dkbg"><td>Banners Lost - Units</td><td>'+data.drops?.away?.units+'</td><td>'+data.drops?.away?.shipDrops+'</td></tr>'
    html += '<tr class="dkbg"><td>Banners Lost - Total</td><td>'+(data.drops?.away?.charBannerDrops + data.drops?.away?.shipBannerDrops + data.drops?.away?.units)+'</td><td>&nbsp;</td></tr>'

    html += '<tr class="title"><td colspan="2">Defense Leaders</td><td>Battles</td></tr>'
    html += '<tr class="ltbg"><td colspan="3">'+data.banners?.home?.name+'</td></tr>'
    for(let i in data.defends?.home?.name) html += '<tr class="ltbg"><td colspan="2">'+data.defends?.home?.name[i]+'</td><td>'+data.defends?.home?.defends+'</td></tr>'
    html += '<tr class="title"><td colspan="2">Top 5 Trouble Squads</td><td>Battles</td></tr>'
    html += '<tr class="ltbg"><td colspan="3">'+data.banners?.home?.name+'</td></tr>'
    if(data.leaders?.away?.length>4){
        for(let i=0;i<5;i++) html += '<tr class="ltbg"><td colspan="2">'+data.leaders?.away[i].unitDefId+'</td><td>'+data.leaders?.away[i].defends+'</td></tr>';
    }else{
      for(let i in data.leaders?.away) html += '<tr class="ltbg"><td colspan="2">'+data.leaders?.away[i].unitDefId+'</td><td>'+data.leaders?.away[i].defends+'</td></tr>';
    }
    html += '<tr class="dkbg"><td colspan="3">'+data.banners?.away?.name+'</td><tr>'
    if(data.leaders?.home?.length>4){
      for(let i=0;i<5;i++) html += '<tr class="dkbg"><td colspan="2">'+data.leaders?.home[i].unitDefId+'</td><td>'+data.leaders?.home[i].defends+'</td></tr>';
    }else{
      for(let i in data.leaders?.home) html += '<tr class="dkbg"><td colspan="2">'+data.leaders?.home[i].unitDefId+'</td><td>'+data.leaders?.home[i].defends+'</td></tr>';
    }
    html += '<tr class="title"><td colspan="3">Ends in: '+data.timeTillEnd.h+':'+data.timeTillEnd.m+':'+data.timeTillEnd.s+'</td></tr>'

    html += '</table>'
    html += '</body>'
    html += '</html>'
    return html

  }catch(e){
    console.error(e);
  }
}
