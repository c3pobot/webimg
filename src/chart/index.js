'use strict'
const sorter = require('json-array-sorter')
module.exports = async(chartData = [], info = {})=>{
  let array = await sorter([{column: info.sort, order: 'descending'}], chartData)
  try{
    let config = {
      data: {
        labels: array.map(x=>x.name),
        datasets: []
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'red'
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: 'red',
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: 'red'
            }
          }
        }
      }
    }
    if(info.title) config.options.plugins.title = {display: true, text: info.title, color: 'red'}
    for(let i in info?.chart){
      if(info.chart[i].yId) config.options.scales[info.chart[i].yId] = {
        ticks: {
          color: info.chart[i].bgcolor,
        },
        position: 'right'
      }
      config.data.datasets.push(
        {
          label: info.chart[i].name,
          type: info.chart[i].type,
          backgroundColor: info.chart[i].bgcolor,
          borderColor: info.chart[i].bgcolor,
          data: array.map(x=>x[info.chart[i].data]),
          yAxisID: info.chart[i].yId || 'y'
        }
      )
    }
    let html = '<body style="background-color: black;">'
    html += '<div style="color: red;"><canvas id="myChart" width="1200" height="600"></canvas></div>'
    html += '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>'
    html += '<script>'
    html += 'const myChart = new Chart( document.getElementById(\'myChart\'), '+JSON.stringify(config)+')'
    html += '</script>'
    html += '</body>'
    return html
  }catch(e){
    console.error(e);
  }
}
