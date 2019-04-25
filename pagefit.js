window.hypothesisConfig = function() {
  return {
    "onLayoutChange": function(obj) {
      console.log(`onLayoutChange ${JSON.stringify(obj)}`)
      },
    "openSidebar": true
  }
}

function maybeLoadPageFitter() {
  const body = document.querySelector('body')
  chrome.storage.sync.get( 
    {
      pageFitter: 'default',
      breakpoint: '1000',
    },
    function(items) {
      if (items.pageFitter === 'noOverlap') {
        function adjuster() {
          adjust(body, false)
        }
        window.onload = adjuster
        window.onresize = adjuster
      } else if (items.pageFitter === 'someOverlap') {
        function adjuster() {
          adjust(body, true, parseInt(items.breakpoint))
        }
        window.onload = adjuster
        window.onresize = adjuster
      } else {
        // retain default behavior
      }
    }
  )
}

maybeLoadPageFitter()

function getViewerWidth() {
  const viewer = getViewer()
  return parseInt(window.getComputedStyle(viewer)['width'].replace('px',''))
}

function getBodyWidth() {
  const body = document.querySelector('body')
  return parseInt(window.getComputedStyle(body)['width'].replace('px',''))
}

function getViewer() {
  return document.getElementById('outerContainer')
}

function adjust(body, someOverlap, breakpoint) {
  body.style.width = '100%'
  const windowWidth = window.innerWidth
  const sidebarWidth = 428
  const adjustedBodyWidth = (windowWidth - sidebarWidth) + 'px'
  if ( someOverlap && windowWidth <= breakpoint ) {
    getViewer().style.width = localStorage.getItem('pdfViewerWidth') + 'px'
  } else {
    getViewer().style.width = adjustedBodyWidth
    localStorage.setItem('pdfViewerWidth', getViewerWidth())
  } 
}


