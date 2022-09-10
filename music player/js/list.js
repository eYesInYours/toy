import { getLyric } from '/js/lyric.js'

const listDom = document.querySelectorAll('span')[3]
const ul = document.querySelector('ul')
const lis = document.querySelectorAll('li')
const audio = document.querySelector('audio')
const showImg = document.getElementById('showImg')
const continueStop = document.querySelectorAll('span')[1]

const prev = document.querySelectorAll('span')[0]
const next = document.querySelectorAll('span')[2]

let defineI = 0

const music = [
    'public/music/王靖雯 - 不知所措_hires.flac',
    'public/music/林俊杰 - 黑夜问白天.flac',
    'public/music/陈奕迅 - 让我留在你身边.flac',
]
const albumArt = [
    'url(' + `'../public/albumArt/王靖雯 - 不知所措.jpg'` + ')',
    'url(' + `'../public/albumArt/林俊杰 - 黑夜问白天'` + ')',
    'url(' + `'../public/albumArt/陈奕迅 - 让我留在你身边'` + ')',
]
const lyrics = [
    'public/lyrics/王靖雯 - 不知所措.lrc',
    'public/lyrics/林俊杰 - 黑夜问白天.lrc',
    'public/lyrics/陈奕迅 - 让我留在你身边.lrc',
]

ul.style.display = 'none'

listDom.onclick = function () {
    ul.style.display === 'none' ?
        (
            ul.style.display = 'block',
            // ul.className += ' animate__animated animate__slideInRight'
            ul.className = 'list-group myUl left animate__animated animate__fadeIn'
        ) :
        (
            ul.style.display = 'none'
        )
}

for (let i = 0; i < lis.length; i++) {
    const li = lis[i]
    li.onclick = function () {
        listFn(i)
        defineI = i
    }

    next.onclick = function () {
        if(defineI == 2){
            defineI = -1
        }
        listFn(defineI+1)
        defineI++
    }
    prev.onclick = function(){
        if(defineI == 0)
        defineI = 3
        listFn(defineI-1)
        defineI--
    }
}

function listFn(i) {
    audio.setAttribute('src', music[i])
    showImg.style.cssText = 'background-image:' + albumArt[i] + ';background-size:cover;'
    showImg.style.animation = 'rotateImg 14s infinite linear running'
    continueStop.className = 'iconfont icon-ai05'
    ul.style.display = 'none'

    getLyric(lyrics[i])

    audio.play()
}
