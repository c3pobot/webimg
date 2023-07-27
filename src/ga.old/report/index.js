'use strict'
const css = require('src/webImg/css/gaHist.css')
module.exports = async(pObj = {}, eObj = {}, gaUnits = [])=>{
  try{
    let unitsArray = [], units = []
    if(gaUnits.length > 0) unitsArray = gaUnits.map(x=>x.baseId)
    if(unitsArray?.length > 0) units = await mongo.find('units', {_id: {$in : unitsArray}})
    let html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Antic" rel="stylesheet"><style>'+css+'</style></head>'
    html += '<body>'
    html += '<table>'
      html += '<tr><td>'+pObj.name+' vs '+eObj.name+'</td></tr>'
      html += '<tr><td>Skill : </td><td>'++'</td></tr>'
      html += '<tr><td>GP : </td><td>'++'</td></tr>'
      html += '<tr><td>Char GP : </td><td>'++'</td></tr>'
      html += '<tr><td>Ship GP : </td><td>'++'</td></tr>'
      html += '<tr><td>G13 : </td><td>'++'</td></tr>'
      html += '<tr><td>G12 : </td><td>'++'</td></tr>'
      html += '<tr><td>Zeta\'s : </td><td>'++'</td></tr>'
      html += '<tr><td>GP : </td><td>'++'</td></tr>'
    html += '</table>'
    html += '</body>'
    html += '</html>'
  }catch(e){
    console.error(e)
  }
}
