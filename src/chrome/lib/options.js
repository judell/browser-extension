'use strict';

function saveOptions() {
  const pageFitters = document.getElementsByName('pdfPagefit')
  alert(pageFitters)
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
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      badge: true,
      pageFitter: 'default',
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
  );
}

document.addEventListener('DOMContentLoaded', loadOptions)
document.getElementById('badge').addEventListener('click', saveOptions)
document.getElementById('pdfOverlapBreakpoint').onchange = saveOptions

const pageFitters = document.getElementsByName('pdfPagefit')
pageFitters.forEach( pageFitter => {
  pageFitter.addEventListener('click', saveOptions)
})
