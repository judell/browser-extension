'use strict';

const pdfPageFitters = document.getElementsByName('pdfPagefit')
const htmlPageFitters = document.getElementsByName('htmlPagefit')

function saveOptions() {
  let pdfPageFitter
  for (let i = 0; i < pdfPageFitters.length; i++) {
      if (pdfPageFitters[i].checked) {
          pdfPageFitter = pdfPageFitters[i].value
          break
      }
  }

  let htmlPageFitter
  for (let i = 0; i < htmlPageFitters.length; i++) {
      if (htmlPageFitters[i].checked) {
          htmlPageFitter = htmlPageFitters[i].value
          break
      }
  }

  chrome.storage.sync.set({
    badge: document.getElementById('badge').checked,
    pdfPageFitter: pdfPageFitter,
    breakpoint: document.getElementById('pdfOverlapBreakpoint').value,
    htmlPageFitter: htmlPageFitter,
  })

  let tags = document.getElementById('tags').value
  if (tags) {
      try {
        tags = tags.split(',').map(tag => { return ' ' + tag.trim() } )
        localStorage.setItem('hypothesis.user.tags.list', JSON.stringify(tags))
        const map = {}
        tags.forEach(tag => {
          map[tag] = {}
        })
        localStorage.setItem('hypothesis.user.tags.map', JSON.stringify(map))
    } catch (e) { 
      console.log(e.message)
    }
  }
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      badge: true,
      pdfPageFitter: null,
      htmlPageFitter: null,
      breakpoint: '1000',
    },
    function(items) {
      document.getElementById('badge').checked = items.badge
      document.getElementById('pdfOverlapBreakpoint').value = items.breakpoint
      for (let i = 0; i < pdfPageFitters.length; i++) {
        if (pdfPageFitters[i].value === items.pdfPageFitter) {
            pdfPageFitters[i].checked = true
            break
        }
      }
      for (let i = 0; i <  htmlPageFitters.length; i++) {
        if (htmlPageFitters[i].value === items.htmlPageFitter) {
            htmlPageFitters[i].checked = true
            break
        }
      }
    }
  )

  try {
    let tags = JSON.parse(localStorage.getItem('hypothesis.user.tags.list'))
    document.getElementById('tags').value =  tags.map(t => { return t.trim() }).join(', ')
  } catch (e) {
  }

}

document.addEventListener('DOMContentLoaded', loadOptions)
document.getElementById('badge').addEventListener('click', saveOptions)
document.getElementById('pdfOverlapBreakpoint').onchange = saveOptions
document.getElementById('tags').onchange = saveOptions

pdfPageFitters.forEach( pdfPageFitter => {
  pdfPageFitter.addEventListener('click', saveOptions)
})

htmlPageFitters.forEach( htmlPageFitter => {
  htmlPageFitter.addEventListener('click', saveOptions)
})

