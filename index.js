function show() {
  $.ajax({
    url: 'http://localhost:8080/interface/showlist.php',
    type: 'get',
    dataType: "json",
    success: function (res) {
      if (res.code == 1) {
        let mcd = res.data
        if (mcd.length > 0) {
          mcd.forEach(function (dom) {
            $('.main-con-container').append(`<div class="container-box">
            <input type="checkbox" class="radio">
            <i><img src="${dom.product_img}g" alt=""></i>
            <p>${dom.product_name}</p>
            <span>￥${dom.product_price}.00</span>
            <div class="add">
                <div class="add-boxs4 "></div>
                <strong class="reduce-five">一</strong>
                <i class="num-five number">${dom.product_num}</i>
                <strong class="adds-five">＋</strong>
            </div>
            <h5 class="money-five nowmoney">￥${dom.product_price}</h5>
            <a href="javascript:;" class="btn" title="删除">X</a>
        </div>`)
          })
          dal()
          Getmoney()
          Autoplayadd(document.querySelector('.reduce-five'), document.querySelector('.num-five'), document.querySelector('.adds-five'), document.querySelector('.money-five'), document.querySelector('.add-boxs4'))
        }
      }
    }
  })
}
function Move(a, b) {
  a.on('mouseenter', function () {
    b.stop().fadeIn()
  })
  a.on('mouseleave', function () {
    b.stop().fadeOut()
  })
} // 封装移入移出函数
Move($('.connect'), $('.fixed-right-img'))
Move($('.app'), $('.fixed-right-img1'))
Move($('.newman'), $('.fixed-right-img2'))
Move($('.focus'), $('.fixed-right-img3'))

// 浏览器滚动距离大于10 显示回到顶部按钮 点击回到顶部
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 10) {
    $('.return-top').stop().slideDown('fast')
  } else {
    $('.return-top').stop().slideUp('fast')
  }
})
$('.return-top').on('click', function () {
  $('html').stop().animate({
    scrollTop: 0
  }, 200, 'linear')
})
Move($('.banner-left-one'), $('.banner-left-box'))
Move($('.banner-left-two'), $('.banner-left-box1'))
$('.focus1').on('click', function () {
  $('.fixed-right-img4').stop().fadeIn()
})
$('.focus1').on('mouseleave', function () {
  $('.fixed-right-img4').stop().fadeOut()
})
// 当滚动距离大于商品页高度结账栏由固定定位改成页面定位
$(window).on('scroll', function () {
  $('.bill').addClass('fixed-bill')
  if ($(window).scrollTop() > 150) {
    $('.bill').removeClass('fixed-bill')
  }
  else {
    $('.bill').addClass('fixed-bill')
  }
})
var all = document.querySelectorAll('.all-choose')
var radio = document.querySelectorAll('.radio')
let resnum = document.querySelector('.quantity')
let resmoney = document.querySelector('.results')
// 点击全选的时候 所有单选全部勾中

for (let i = 0; i < all.length; i++) {
  all[i].onclick = function () {
    for (i = 0; i < all.length; i++) {
      all[i].checked = this.checked
      if (all[i].checked == true) {
        gob.className = 'right'
      } else {
        gob.className = 'go-bill'
      }
    }
    for (i = 0; i < radio.length; i++) {
      radio[i].checked = this.checked
    }
    Getmoney()
  }
}
for (i = 0; i < radio.length; i++) {
  radio[i].onclick = function () {
    var flag = true
    for (i = 0; i < radio.length; i++) {
      if (!radio[i].checked) {
        flag = false
      }
    }
    for (i = 0; i < all.length; i++) {
      all[i].checked = flag
    }
    if (this.checked) {
      gob.className = 'right'
    }
    if (radio[0].checked == false && radio[1].checked == false && radio[2].checked == false) {
      gob.className = 'go-bill'
    }
    Getmoney()
  }
}

let gob = document.querySelector('.go-bill')
//遍历全选框只要有一个全选选中 下面结账就显示
// 点击加号 数量增加 
// 封装一个函数添加数量和价格
// a 是减号 b是数量 c是加号 d是价格 e是盒子类名
function Autoplayadd(a, b, c, d, e) {
  let res = parseInt(b.innerHTML)
  let rmb = parseInt(d.innerHTML.replace('￥', ''))
  c.onclick = function () {
    res = res + 1
    b.innerHTML = res
    d.innerHTML = '￥' + res * rmb
    e.style.display = 'none'
    Getmoney()
  }
  a.addEventListener('click', function () {
    res = res - 1
    b.innerHTML = res
    d.innerHTML = '￥' + res * rmb
    if (res <= 0) {
      b.innerHTML = 0
      d.innerHTML = '￥' + 0
      e.style.display = 'block'
    }
    Getmoney()
  })
}
Autoplayadd(document.querySelector('.reduce-one'), document.querySelector('.num-one'), document.querySelector('.add-one'), document.querySelector('.money-one'), document.querySelector('.add-boxs'))
Autoplayadd(document.querySelector('.reduce-two'), document.querySelector('.num-two'), document.querySelector('.adds-two'), document.querySelector('.money-two'), document.querySelector('.add-boxs1'))
Autoplayadd(document.querySelector('.reduce-three'), document.querySelector('.num-three'), document.querySelector('.adds-three'), document.querySelector('.money-three'), document.querySelector('.add-boxs2'))
Autoplayadd(document.querySelector('.reduce-four'), document.querySelector('.num-four'), document.querySelector('.adds-four'), document.querySelector('.money-four'), document.querySelector('.add-boxs3'))

// 点击按钮 删除当前一行
function dal() {
  let btns = document.querySelectorAll('.btn')
  let container = document.querySelectorAll('.container-box')
  btns.forEach(function (item, index) {
    btns[index].onclick = function () {
      container.forEach(function () {
      container[index].style.display = 'none'
      })
    }
  })
}
dal()
// 计算数量和价格
//封装函数当选择框勾中的时候计算总金额
let nowmoneys = document.querySelectorAll('.nowmoney')
let numbers = document.querySelectorAll('.number')
function Getmoney() {
  let total = 0
  let mathres = 0
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      let money = parseInt(nowmoneys[i].innerHTML.replace('￥', ''))
      total += money
      math = parseInt(numbers[i].innerHTML)
      mathres += math
    }
  }
  document.querySelector('.results').innerHTML = '￥' + total
  document.querySelector('.quantity').innerHTML = mathres + '件'
}
let search = document.querySelector('.sear')
let searindex = 0
let sarr = ['感冒药', '止咳药', '消炎药', '医疗器具']
setInterval(() => {
  search.placeholder = sarr[searindex]
  searindex++
  if (searindex == sarr.length) {
    searindex = 0
  }
}, 3000);
//发送Ajax请求 刷新页面
$('.again').click(()=>{
  show()
})
