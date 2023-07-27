'use strict'
module.exports = (gear = {})=>{
  try{
    let html = '<div class="pull-left">'
    html += '<span class="gear-icon gear-icon-tier'+gear.tier+'">'
    html += '<span class="gear-icon-inner">'
    html += '<img class="gear-icon-img" src="/asset/'+gear.iconKey+'.png">'
    html += '<span class="gear-icon-mk-level">'+gear.mark+'</span>'
    html += '</span></span></div>'
    return html
  }catch(e){
    console.error(e);
  }
}
