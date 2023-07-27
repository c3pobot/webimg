'use strict'
const enumAlignment = {
  'alignment_neutral': 1,
  'alignment_light': 2,
  'alignment_dark': 3
}

module.exports = async(unit = {}, uInfo = {})=>{
  try{
    let unitAlignment = enumAlignment[uInfo.alignment]
    let html = '<div class="gac-unit'+(unit.healthPercent == 0 ? ' gac-unit--dead':'')+'">'
          //startbars
          html += '<div class="gac-unit__bars">'
            html += '<div class="gac-unit__bar gac-unit__bar--prot">'
              html += '<div class="gac-unit__bar-inner gac-unit__bar-inner--prot" style="width: '+unit.shieldPercent+'%"></div>'
            html += '</div>'
            html += '<div class="gac-unit__bar gac-unit__bar--hp">'
              html += '<div class="gac-unit__bar-inner gac-unit__bar-inner--hp '+(unit.healthPercent < 50 && unit.healthPercent >= 25 ? 'gac-unit__bar-inner--hp-low':'')+(unit.healthPercent < 25 ? 'gac-unit__bar-inner--hp-critical':'')+'" style="width: '+unit.healthPercent+'%"></div>'
            html += '</div>'
          html += '</div>'
          //endbard
          //start unit
          html += '<div class="gac-unit__portrait">'
            html += '<div class="gac-unit-portrait gac-unit-portrait--type-2">'
              //start thumbnail
              html += '<div class="ship-portrait ship-portrait--size-small">'
                html += '<div class="ship-portrait__image-group">'
                  html += '<div class="ship-portrait__image-frame ship-portrait__image-frame--size-small">'
                    html += '<img class="ship-portrait__img ship-portrait__img--size-xsmall" src="/thumbnail/'+uInfo.thumbnailName+'.png"/>'
                  html += '</div>'
                  html += '<div class="ship-portrait__level ship-portrait__level--size-xsmall">'+unit.level+'</div>'
                  html += '<div class="ship-portrait__frame ship-portrait__frame--size-small"></div>'
                html += '</div>'
              html += '</div>'
              //end thumbnail
              //start stars
              html += '<div class="ship-portrait__stars">'
                html += '<div class="'+(unit.rarity < 1 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 2 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 3 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 4 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 5 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 6 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
                html += '<div class="'+(unit.rarity < 7 ? 'ship-portrait__star--inactive':'ship-portrait__star')+' ship-portrait__star--size-small"></div>'
              html += '</div>'
              //end stars
            html += '</div>'
          html += '</div>'
          //end unit
        html += '</div>'
    return html
  }catch(e){
    console.error(e);
  }
}
