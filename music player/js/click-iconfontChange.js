

    import {getLyric} from '/js/lyric.js'
    import { forPercent } from '/js/progressBar.js'
    const continueStop = document.querySelectorAll('span')[1]
    const mute = document.querySelectorAll('span')[4]
    const showImg = document.getElementById('showImg')
    const audio = document.querySelector('audio')


    // 播放
    continueStop.onclick = function(){
        continueStop.className == 'iconfont icon-ai05' ? 
            (
                continueStop.className = 'iconfont icon-jixugongxiang',
                showImg.style.animation = 'rotateImg 14s infinite linear paused',
                audio.pause()
            ) : 
            (
                continueStop.className = 'iconfont icon-ai05',
                showImg.style.animation = 'rotateImg 14s infinite linear running',
                audio.play(),
                getLyric('/public/lyrics/王靖雯 - 不知所措.lrc')
            )
    }

    // 静音
    mute.onclick = function(){
        mute.className == 'iconfont icon-shengyinjingyin' ? 
            (
                mute.className = 'iconfont icon-yinliang',
                audio.volume = forPercent/100
            ) :
            (
                mute.className = 'iconfont icon-shengyinjingyin',
                audio.volume = 0
            )
    }

// })()