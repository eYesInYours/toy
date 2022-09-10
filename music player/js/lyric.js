    //1.文本读取
    export function getLyric(url) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'text'
        xhr.send()

        // xhr.onreadystatechande = function () {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status >= 200 && xhr.status < 300) {
        //             let lyric = xhr.response
        //             console.log(lyric)
        //             result.innerText = lyric
        //         }
        //     }
        // }

        /*
            onload不用判断状态码，被调用一次
            onreadystateChange需要判断状态码，当状态码发生改变时就需要重新调用。
            onload不兼容低版本IE，onreadystateChange兼容。
        */

        xhr.onload = function () {
            const audio = document.querySelector('audio')
            const lyricDom = document.getElementById('lyrics')

            //这里获得歌词文件
            let lyric = xhr.response;
            //2.分离歌词
            let result = parseLyric(lyric)
            
            //3.
            audio.ontimeupdate = function(e){
                for(let i = 0; i<result.length; i++){
                    if(this.currentTime > result[i][0]){
                        lyricDom.innerHTML = result[i][1]
                    }
                }
            }

        };


    }

    // 提取分离
    export function parseLyric(text) {
        let lines = text.split('\n'),
            // let lines = text,
            pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
            result = []

        //去掉不含时间的行：数组的长度一直在减（slice返回新数组），所以不是只对原始数组起效
        //test() 方法用于检测一个字符串是否匹配某个模式
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1)
        }

        //如果最后一个数组为空，则删除
        lines[lines.length - 1].length === 0 && lines.pop()

        lines.forEach(function (value, index, a/*数组本身*/) {
            let time = value.match(pattern),
                txt = value.replace(pattern, '')
            
            //一行中可能有多个时间，如[xx:xx.xx][xx:xx.xx][xx:xx.xx]，需要进一步分割
            time.forEach(function (v, i, b) {
                let t = v.slice(1, -1).split(':')
                result.push([parseInt(t[0],10) * 60 + parseFloat(t[1]), txt])
            })
        })

        //按歌词时间排序
        result.sort(function (a, b) {
            return a[0] - b[0]
        })
        return result
    }

