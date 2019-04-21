function slideDown(el, time) {

    let overflow = el.style.overflow;

    el.style.opacity = 0;
    el.style.display = "block";

    let h = 0;
    let height = parseInt(window.getComputedStyle(el, null).getPropertyValue('height'));
    let heightRate = (height / time * 10);
    el.style.height = 0;

    let pt = 0;
    let paddingTop = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-top'));
    let paddingTopRate = (paddingTop / time * 10);
    el.style.paddingTop = 0;

    let pb = 0;
    let paddingBottom = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
    let paddingBottomRate = (paddingBottom / time * 10);
    el.style.paddingBottom = 0;
    
    el.style.opacity = 1;
    el.style.overflow = "hidden";

    let loop = setInterval(function(){

        h += heightRate;
        pt += paddingTopRate;
        pb += paddingBottomRate;
        
        if (h >= height) {

            el.style.overflow = overflow;
            el.style.height = null;
            el.style.paddingTop = paddingTop + "px";
            el.style.paddingBottom = paddingBottom + "px";
            clearInterval(loop);

        } else {

            el.style.height = h + "px";
            el.style.paddingTop = pt + "px";
            el.style.paddingBottom = pb + "px";

        }
    }, 1)
}

function slideUp(el, time) {

    el.style.overflow = "hidden";

    let height = parseInt(window.getComputedStyle(el, null).getPropertyValue('height'));
    let heightRate = (height / time * 10);
    let h = height;

    let paddingTop = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-top'));
    let paddingTopRate = (paddingTop / time * 10);
    let pt = paddingTop;

    let paddingBottom = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-bottom'));
    let paddingBottomRate = (paddingBottom / time * 10);
    let pb = paddingBottom;

    let loop = setInterval(function(){

        h -= heightRate;
        pt -= paddingTopRate;
        pb -= paddingBottomRate;
        
        if (h <= 0) {

            el.removeAttribute('style');
            clearInterval(loop);

        } else {

            el.style.height = h + "px";
            el.style.paddingTop = pt + "px";
            el.style.paddingBottom = pb + "px";

        }
    }, 1)
}

function fadeIn(el, time) {
    
    el.style.opacity = 0;
    el.style.display = "block";

    let rate = 1 / time * 10;
    let o = 0;

    let loop = setInterval(function(){

        o += rate;
        
        if (o >= 1) {

            el.style.opacity = 1;
            clearInterval(loop);

        } else {

            el.style.opacity = o;

        }
    }, 1)

}

function fadeOut(el, time) {
    
    el.style.opacity = 1;
    el.style.display = "block";

    let rate = 1 / time * 10;
    let o = 1;

    let loop = setInterval(function(){

        o -= rate;
        
        if (o <= 0) {

            el.removeAttribute('style');
            clearInterval(loop);

        } else {

            el.style.opacity = o;

        }
    }, 1)

}