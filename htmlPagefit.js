try {
  document.getElementById('hypothesisWrapper').remove()
} catch {}

window.hypothesisConfig = function() {
  return {
    "onLayoutChange": function(obj) {
      console.log(`onLayoutChange ${JSON.stringify(obj)}`)
      localStorage.setItem('hypothesisLayout', JSON.stringify(obj))
      hypothesisAdjust()
      },
    "openSidebar": false
  }
}

hypothesisWrapper = document.createElement('div')
hypothesisWrapper.id = 'hypothesisWrapper'
hypothesisWrapper.innerHTML = document.body.innerHTML
document.body.innerHTML = hypothesisWrapper.outerHTML

const hypothesisAllElements = Array.from(document.querySelectorAll('div'))
  .concat( Array.from(document.querySelectorAll('p')) )
  .concat( Array.from(document.querySelectorAll('blockquote')) )
  .concat( Array.from(document.querySelectorAll('iframe')) )
		  
function hypothesisComputeWrapperWidth() {
  const wrapper = document.getElementById('hypothesisWrapper')
  const layout = JSON.parse(localStorage.getItem('hypothesisLayout'))
  const wrapperWidth = wrapper.clientWidth
  const sidebarWidth = layout ? layout.width : 485
  return (wrapperWidth - sidebarWidth )
}

function hypothesisWideElementsAdjust() {
  hypothesisAllElements.forEach ( e => { 
    const domRect = e.getBoundingClientRect()
    const width = domRect.x + domRect.width
    if (width > hypothesisComputeWrapperWidth()) {
      const viewportOffset = e.getBoundingClientRect().x
      const adjustedWidth = hypothesisComputeWrapperWidth() - viewportOffset
      e.style.width = adjustedWidth
    }
  })  
}

async function hypothesisAdjust() {
  function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
   }
  await delay(.1) 
  const wrapper = document.getElementById('hypothesisWrapper')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.width = `${hypothesisComputeWrapperWidth()}px`
  //hypothesisWideElementsAdjust()
}

//hypothesisWrapperAdjust()

window.onresize = hypothesisAdjust
window.onload = hypothesisAdjust	
    
  

