try {
  document.getElementById('hypothesisWrapper').remove()
} catch {}

document.body.width = '100%'

hypothesisWrapper = document.createElement('div')
hypothesisWrapper.id = 'hypothesisWrapper'
hypothesisWrapper.innerHTML = document.body.innerHTML
document.body.innerHTML = hypothesisWrapper.outerHTML


function hypothesisWrapperAdjust() {
  const wrapper = document.getElementById('hypothesisWrapper')
  wrapper.style.width = '100%'
  const wrapperWidth = wrapper.clientWidth
  const sidebarWidth = 428 
  const extraWidth = 30
  const adjustedWrapperWidth = (wrapperWidth - ( sidebarWidth + extraWidth ) ) + 'px'
  wrapper.style.width = adjustedWrapperWidth
}

//hypothesisWrapperAdjust()

window.onresize = hypothesisWrapperAdjust

//window.onload = hypothesisWrapperAdjust	
