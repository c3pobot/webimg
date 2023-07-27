'use strict'
const GetCrew = require('./getCrew')
module.exports = (obj, showName = true)=>{
  try{
    let html = '<table><tr><td>'
      html += '<div class="col-sm-6 col-md-6 col-lg-4">'
        html += '<div class="collection-ship collection-ship-dark-side">'
          html += '<div class="collection-ship-main">'
            html += '<div class="collection-ship-primary">'
              html += '<div class="ship-portrait ship-portrait--size-">'

                html += '<div class="ship-portrait__image-group">'

                  html += '<div class="ship-portrait__image-frame">'
                    html += '<img class="ship-portrait__img ship-portrait__img--size-" src="/thumbnail/'+obj.thumbnailName+'.png"/>'
                  html += '</div>'
                  html += '<div class="ship-portrait__level ship-portrait__level--size-">'+obj.level+'</div>'
                  html += '<div class="ship-portrait__frame"></div>'
                html += '</div>'

                html += '<div class="ship-portrait__stars">'
                  html += '<div class="'+(obj.rarity < 1 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 2 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 3 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 4 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 5 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 6 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                  html += '<div class="'+(obj.rarity < 7 ? 'ship-portrait__star--inactive':'ship-portrait__star')+'"></div>'
                html += '</div>'
              html += '</div>'
            html += '</div>'
          html += '</div>'

        html += '</div>'
      html += '</div>'
      html += '</td></tr>'
      html += '<tr><td><table width="100%"><tr>'
      if(obj.crew?.length > 0){
        for(let i in obj.crew){
          html += '<td>'
          html += GetCrew(obj.crew[i])
          html += '</td>'
        }
      }else{
        html += '<td></td>'
      }
      html += '</tr></table></td></tr>'
      if(showName) html += '<tr><td><div class="collection-ship-name">'+obj.nameKey+'</div></td></tr>'
    html += '</table>'
    return html;
  }catch(e){
    console.error(e)
  }
}
