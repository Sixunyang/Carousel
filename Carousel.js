//In fact, the most difficult thing is the link between numbers and right buttons! ! !
//The first photo of the clone is placed in the last one, and is quickly shifted from the last one to the first by ul.style.left=0 to achieve seamless result.


window.onload = function () {
    //1.  Motion function
    function animate(ele, target) {
        clearInterval(ele.timer)
        let speed = target > ele.offsetLeft ? 10 : -10;
        ele.timer = setInterval(function () {
            if (Math.abs(target - ele.offsetLeft) > 10) {
                ele.style.left = ele.offsetLeft + speed + 'px' //Attetion, the element here should have a position property in css, then it could work
            }
            else {
                ele.style.left = target + 'px';
                clearInterval(ele.timer)
            }
        }, 30)

    }
    /*  ensure the function works
    let right = document.querySelector('.right')
     animate(right, 1000) */
    
    //2. based on the number of pictures, we danamically create the relevent dot below
    ol = document.querySelector('ol')
    ul = document.querySelector('ul')
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li')
        ol.appendChild(li)
        li.innerHTML = i + 1
    }

   //3. Let the selected dots become pink; exclusive thoughts
     //4. Click on the small dot, the picture moves to the corresponding position
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

    //5. Right click, the picture moves to the next one
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

        // console.log(num);
        if (num == 5) {
            ol.children[4].className = ''
            ol.children[0].className = 'current' //8. When the last slider of the clone is reached, the dot should be at 1
        } else {
            for (let j = 0; j < ul.children.length - 1; j++) {
                ol.children[j].className = ''
            }
            ol.children[num].className = 'current'
        }
    })
    
   
    // 6.  To achieve seamless, we need to clone a photo to the end
    let last = ul.children[0].cloneNode(true)
    ul.appendChild(last)

    //7.  click the right button, the small dot goes to the corresponding position

   //9.  Give the same function to the left button
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

        for (let j = 0; j < ul.children.length - 1; j++) {
            ol.children[j].className = ''
        }
        ol.children[num].className = 'current'

    })

}
