function maybeLoadPageFitter() {
  chrome.storage.sync.get( 
    {
      pageFitter: 'default',
    },
    function(items) {
      if (items.pageFitter === 'noOverlap') {
        function adjuster() {
          adjust(document.querySelector('body'), false)
        }
        window.onload = adjuster
        window.onresize = adjuster
      } else if (items.pageFitter === 'someOverlap') {
        function adjuster() {
          adjust(document.querySelector('body'), true)
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

function adjust(e, someOverlap) {
  e.style.width = '100%'
  const eWidth = parseInt(window.getComputedStyle(e)['width'].replace('px',''))
  console.log(eWidth)
  if ( someOverlap && ( eWidth < 1000 || eWidth > 1500) ) {
    return
  }
  const bodyWidth = window.innerWidth
  const diff = bodyWidth - eWidth
  const adjustment = 428
  if ( diff < adjustment ) {
    const adjusted = (eWidth-(adjustment-diff)) + 'px'
	e.style.width = adjusted
  }
}

