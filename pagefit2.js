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
    "openSidebar": true
  }
}

hypothesisWrapper = document.createElement('div')
hypothesisWrapper.id = 'hypothesisWrapper'
hypothesisWrapper.innerHTML = document.body.innerHTML
document.body.innerHTML = hypothesisWrapper.outerHTML

const hypothesisAllElements = Array.from(document.querySelectorAll('div'))
  .concat( Array.from(document.querySelectorAll('p')) )

const hypothesisOriginalCss = []

const hypothesisWideElements = hypothesisAllElements.filter ( e => { 
  return e.clientWidth > hypothesisComputeWrapperWidth()
})
  
for (let i = 0; i < hypothesisWideElements.length; i++) {
  const e = hypothesisWideElements[i]	
  hypothesisOriginalCss.push({ 
    "width": e.clientWidth, 
    "leftMargin": e.style.leftMargin
   })
}

function hypothesisComputeWrapperWidth() {
  const wrapper = document.getElementById('hypothesisWrapper')
  const layout = JSON.parse(localStorage.getItem('hypothesisLayout'))
  const wrapperWidth = wrapper.clientWidth
  const sidebarWidth = layout ? layout.width : 465
  return (wrapperWidth - sidebarWidth )
}

function hypothesisWideElementsAdjust(width) {
  for (let i = 0; i < hypothesisWideElements.length; i++) {
    const element = hypothesisWideElements[i]
    element.style.width = '100%'
    element.style.width = width
  }
}

function hypothesisAdjust() {
  const wrapper = document.getElementById('hypothesisWrapper')
  wrapper.style.width = '100%'
  const width = `${hypothesisComputeWrapperWidth()}px`
  hypothesisWideElementsAdjust(width)
  wrapper.style.width = width
}

//hypothesisWrapperAdjust()

window.onresize = hypothesisAdjust

window.onload = hypothesisAdjust	
