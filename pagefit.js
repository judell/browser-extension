function adjust(e) {
  e.style.width = '100%'
  const eWidth = parseInt(window.getComputedStyle(e)['width'].replace('px',''))
  const bodyWidth = window.innerWidth
  const diff = bodyWidth - eWidth
  const adjustment = 428
  if ( diff < adjustment ) {
    const adjusted = (eWidth-(adjustment-diff)) + 'px'
	e.style.width = adjusted
  }
}

function adjuster() {
  adjust(document.querySelector('body'))
}


window.onload = adjuster

window.onresize = adjuster

