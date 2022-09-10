(function () {
    const circle = document.getElementById('circle')
    const startBtn = document.getElementById('btnCircle')

    let deg = 1
    let intervalId = null

    let basic = 360 * 3    //默认圈数
    let runId = null
    let isRotate = false

    let circleTransform = circle.style.transform    //在这定义后就一直会为0，获取第一时刻的值
    let circleTransRotate

    let randomArray = []


    let weight = [3 , 15, 27, 41, 57, 75, 95, 120]    //0 - 1中间为一等奖
 

    let award = [
        "一等奖：省内旅行", "二等奖：商业街一日行", 
        "三等奖：免家务两天", "四等奖：特权券一张",
        "五等奖：积分+60", "六等奖：积分+40", 
        "七等奖：积分+20", "末等奖：感谢参与"
    ]
    // let circleTransform = getComputedStyle(circle,null).transform    
    //得到的是matrix(a,b,c,d,e,f)，需要转换为rotate值，用circle.style.transform.split('(')[1].split('deg')[0]


    //点击
    startBtn.onclick = function () {
        let randomMath = parseInt(Math.random() * 120) + 1   //1 - 8
        let randomWeight = weight.concat(randomMath)
        let sort = randomWeight.sort(function(a, b){
            return a - b
        })
        let index = sort.indexOf(randomMath)
        console.log(randomMath,sort, index)
        clickInterval(randomMath, index)
        // console.log(randomMath)  
    }


    //点击
    function clickFn(randomMath,index) {
        // console.log('00'+(basic + (22.5 * (randomArray[1] + (++randomArray[1])))) || '11'+(basic + (22.5 * (randomArray[0] + (++randomArray[0])))))

        if(circleTransRotate >= (basic + (22.5 * (index + (++index))))) {
            isRotate = false
            clearInterval(runId)
            deg = 22.5 * (index + (index-1))
            circle.style.transform = 'rotate(' + deg + 'deg)'
            if(index > 8){
                index = index - 8
            }
            console.log(award[index - 1])
            console.log(index)
        }

        switch (Boolean(circleTransform)) {
            case false:
                circle.style.transform = 'rotate(' + deg + 'deg)'
                // 渐慢停止
                deg += Math.ceil(basic + (22.5 * (index + (++index))) - deg) * 0.02

                circleTransRotate = parseInt(circle.style.transform.split('(')[1].split('deg')[0])
                break
        }

    }


    //点击旋转
    function clickInterval(randomMath, index) {
        if (isRotate) return    //true  
        isRotate = true

        runId = setInterval(function () {
            clickFn(randomMath, index)
        }, 25)
    }


})()