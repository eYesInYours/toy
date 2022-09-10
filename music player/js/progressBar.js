// (() => {
    //音量进度条
    const outer = document.getElementById('outer')
    const progressbBar = document.getElementById('progressbBar')
    const circlePoi = document.getElementById('circlePoi')
    const audio = document.querySelector('audio')
    const mute = document.querySelectorAll('span')[4]
    let forPercent = 0

    circlePoi.style.left = '80px'
    progressbBar.style.background = 'linear-gradient(to right,black 0%,black 80%,rgb(200, 194, 194) 81%,rgb(200, 194, 194) 100%'

    outer.onclick = function(e){
        progressBar(e)
    }

    outer.onmousedown = function () {

        document.onmousemove = function (e) {
            progressBar(e)
        }

        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
        return false
    }

    function progressBar(e){
            let toArrive = parseInt(e.clientX - outer.offsetLeft)
            if (toArrive < 0) {
                toArrive = 0
            } else if (toArrive > outer.offsetWidth) {
                toArrive = outer.offsetWidth
            }
            let percent = toArrive / outer.offsetWidth * 100
            let arrive = toArrive - 4.5         //原点中心
            circlePoi.style.left = arrive + 'px'

            if(percent == 0){
                mute.className = 'iconfont icon-shengyinjingyin'
            }else{
                mute.className = 'iconfont icon-yinliang'
            }
            progressbBar.style.background = 'linear-gradient(to right,black 0%,black '+ percent +'%,rgb(200, 194, 194) '+ (percent+1) +'%,rgb(200, 194, 194) 100%'
            audio.volume = percent/100
            forPercent = percent
    }

    export { forPercent }


// })()