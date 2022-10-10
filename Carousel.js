//其实最难的就是数字与右键的联动对应！！！
//克隆的到第一张通过ul.style.left=0迅速位移，然后再匀速动画，实现无缝衔接。


window.onload = function () {
    //1.封装匀速运动的函数
    function animate(ele, target) {

        clearInterval(ele.timer)
        let speed = target > ele.offsetLeft ? 10 : -10;
        ele.timer = setInterval(function () {
            if (Math.abs(target - ele.offsetLeft) > 10) {
                ele.style.left = ele.offsetLeft + speed + 'px' //对应的ele必须有position才能生效
            }
            else {
                ele.style.left = target + 'px';
                clearInterval(ele.timer)
            }
        }, 30)

    }
    /*  确保动画有效
    let right = document.querySelector('.right')
     animate(right, 1000) */
    //2.根据图片的个数动态生成小圆点

    ol = document.querySelector('ol')
    ul = document.querySelector('ul')
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li')
        ol.appendChild(li)
        li.innerHTML = i + 1
    }

    //3.让选中的小圆点变成pink;排他思想
    //4.点击小圆点，图片移到对应的位置
    let num = 0;
    ol.children[0].className = 'current'
    for (let i = 0; i < ul.children.length; i++) {
        ol.children[i].addEventListener('click', function () {
            for (let j = 0; j < ul.children.length - 1; j++) {
                ol.children[j].className = ''
            }
            this.className = 'current'

            animate(ul, -420 * i)
            num = i
        })
    }

    //5.点右键，图片移到下一张
    let right = document.querySelector('.right')


    right.addEventListener('click', function () {
        num++
        if (num < ul.children.length) {
            animate(ul, -420 * num)

        }
        else {
            ul.style.left = 0
            num = 1
            animate(ul, -420 * num)
        }

        console.log(num);
        if (num == 5) {
            ol.children[4].className = ''
            ol.children[0].className = 'current' //8.到克隆的最后一张时，小圆点在1
        } else {
            for (let j = 0; j < ul.children.length - 1; j++) {
                ol.children[j].className = ''
            }
            ol.children[num].className = 'current'
        }





    })
    //6. 实现无缝从第五张到第一张，需要克隆一张照片到最后
    let last = ul.children[0].cloneNode(true)
    ul.appendChild(last)

    //7.点击右键时，小圆点到对应位置

    //9.给左键同样的功能
    let left = document.querySelector('.left')


    left.addEventListener('click', function () {
        num--
        if (num >= 0) {
            animate(ul, -420 * num)

        }
        else {
            ul.style.left = -420 * 5 + 'px'
            num = 4
            animate(ul, -420 * num)
        }


        /* if (num == 5) {
            ol.children[4].className = ''
            ol.children[0].className = 'current' //8.到克隆的最后一张时，小圆点在1
        }  */
        for (let j = 0; j < ul.children.length - 1; j++) {
            ol.children[j].className = ''
        }
        ol.children[num].className = 'current'






    })



}