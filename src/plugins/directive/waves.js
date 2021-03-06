
function bindingBalidity(val){
    if(val === 0 || val === '0' || val === null || val === 'null' || val === false || val === 'false'){
        return 'false'
    }
    return 'true'
}

export default{    
    inserted(el,binding){
        el.setAttribute('waves',bindingBalidity(binding.value))
    },
    update(el,binding){
        el.setAttribute('waves',bindingBalidity(binding.value))
    },
    bind(el,binding){
        el.addEventListener('mousedown',e => {
            if(e.button === 0 && el.getAttribute('waves') === 'true'){
                const customOpts = Object.assign({}, binding.value)
                const opts = Object.assign({
                    ele: el,
                    type: 'hit',
                    color: 'rgba(0, 0, 0, 0.15)'
                }, customOpts)
                const target = opts.ele
                if(target) {
                    target.style.position = 'relative'
                    target.style.overflow = 'hidden'
                    const rect = target.getBoundingClientRect()
                    let ripple = target.querySelector('.waves-ripple')
                    if(!ripple) {
                        ripple = document.createElement('span')
                        ripple.className = 'waves-ripple'
                        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
                        target.appendChild(ripple)
                    }else{
                        ripple.className = 'waves-ripple'
                    }
                    ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
                    ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
                    ripple.style.backgroundColor = opts.color
                    ripple.className = 'waves-ripple z-active'                    
                }
                return false
            }
        },false)
    },
}