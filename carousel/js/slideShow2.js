$(function(){
    $photoWall = $('#photoWall')
    $container = $('#slideShow>.container')
    $direction = $('#slideShow>.container>#btn>div')
    $next = $('#slideShow>.container>#btn>div').last()
    $prev = $('#slideShow>.container>#btn>div').first()
    //平滑翻页功能区的变量
    const PAGEWIDTH = 640
    let currentLeft = $photoWall.position().left
    const TIME = 400
    const ITEM_TIME = 20
    //循环翻页：首尾相连图片效果的变量
    let imgCount = $('#slideShow>.container>#photoWall>img').length
    //设置标识用于辨认是否正在翻页
    let moving = false
    //图片切换时自动更新原点导航
    let index = 0
    let $pointsNav = $('#slideShow>.container>#pointNav>div')


    
    $prev.click(function(){
        nextPage(false)
    })
    $next.click(function(){
        nextPage(true)
    })



    //1.定义一个函数，实现平滑翻页的功能
    function nextPage(next){
        // 4.解决快速点击时造成的翻页异常
        if(moving){
            return
        }
        moving = true

        let offset
        if(typeof next === "boolean"){
            offset = next ? -PAGEWIDTH : PAGEWIDTH
        }else{
            offset = - (next - index) * PAGEWIDTH
        }
        
        let ITEM_OFFSET = offset / (TIME / ITEM_TIME)
        let target = currentLeft + offset

        let animateInt
        animateInt = setInterval(function(){
            currentLeft += ITEM_OFFSET
            if(currentLeft == target){
                clearInterval(animateInt)
                moving = false

                //2.循环翻页：实现首尾相连的图片效果
                //Bug:精度最终会有略微偏差，所以需要Math.round矫正
                if(Math.round(currentLeft) == -(imgCount-1)*PAGEWIDTH){
                    currentLeft = - PAGEWIDTH
                }else if(Math.round(currentLeft) == 0){
                    currentLeft = -(imgCount-2)*PAGEWIDTH
                }

            }
            $photoWall.css('left',currentLeft)
        },ITEM_TIME)

        updatePoints(next)

    }



    //3.自动翻页和鼠标移入时停止翻页
    let hoverInterval = setInterval(function(){
        nextPage(true)
    },4000)

    $container.hover(function(){
        clearInterval(hoverInterval)
        $direction.css({'background-color':'black','opacity':0.2})
    },function(){
        hoverInterval = setInterval(function(){
            nextPage(true)
        },4000)
        $direction.css({'background-color':'','opacity':''})
    })



    //5.图片切换时自动更新原点导航
    function updatePoints(next){
        let pointsCount = $pointsNav.length
        let targetIndex = 0

        if(typeof next === "boolean"){
            if(next){
            targetIndex = index + 1
            if(targetIndex == pointsCount){
                    targetIndex = 0
                }
            }else{
                targetIndex = index - 1
                if(targetIndex < 0 ){
                    targetIndex = pointsCount - 1
                }
            }
        }else{
            targetIndex = next 
        }
        
        $pointsNav.css('width','')
        $pointsNav.eq(targetIndex).css('width','10')
        index = targetIndex
//  console.log(index) 
        // clickPoints()
    }


    //6.点击小圆点跳转到对应图片。并更新圆点样式
    $pointsNav.click(function(){
        let $index = $(this).index()
        nextPage($index)
    })

})