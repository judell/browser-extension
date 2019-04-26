'use strict';

function saveOptions() {
  const pageFitters = document.getElementsByName('pdfPagefit')
  
  let pageFitter
  for (let i = 0, length = pageFitters.length; i < length; i++) {
      if (pageFitters[i].checked) {
          pageFitter = pageFitters[i].value
          alert(pageFitter)
          break
      }
  }

  chrome.storage.sync.set({
    badge: document.getElementById('badge').checked,
    pageFitter: pageFitter,
    breakpoint: document.getElementById('pdfOverlapBreakpoint').value
  });

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
    } catch { 
      console.error(e) 
    }
  }
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      badge: true,
      pageFitter: 'noOverlap',
      breakpoint: '1000',
    },
    function(items) {
      document.getElementById('badge').checked = items.badge
      document.getElementById('pdfOverlapBreakpoint').value = items.breakpoint
      const pageFitters = document.getElementsByName('pdfPagefit')
      alert(pageFitters)
      let pageFitter
      for (let i = 0, length = pageFitters.length; i < length; i++) {
          if (pageFitters[i].value === items.pageFitter) {
              pageFitters[i].checked = true
              alert(pageFitter)
              break
          }
      }
    
    }
  )

  try {
    let tags = JSON.parse(localStorage.getItem('hypothesis.user.tags.list'))
    document.getElementById('tags').value =  tags.map(t => { return t.trim() }).join(', ')
  } catch (e) {
    console.error(e)
  }

}

document.addEventListener('DOMContentLoaded', loadOptions)
document.getElementById('badge').addEventListener('click', saveOptions)
document.getElementById('pdfOverlapBreakpoint').onchange = saveOptions
document.getElementById('tags').onchange = saveOptions

const pageFitters = document.getElementsByName('pdfPagefit')
pageFitters.forEach( pageFitter => {
  pageFitter.addEventListener('click', saveOptions)
})
