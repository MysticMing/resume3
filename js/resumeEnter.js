/**
 * Found by Mystic on 2018/9/13.
 */
$(function () {

  // 淫贱的阻止页面选中效果
  document.onmousedown=function () {
    document.onmousemove=function () {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }
  document.onmouseup=function () {
    document.onmousemove = null;
  }


  var $container = $('.portfolio-items');
  setTimeout(function () {
    $container.isotope({
      itemSelector : '.portfolio-items > div',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: true
      }
    });
  },1000)

  project_info();




  $('#resume').fullpage({
      sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],

      scrollingSpeed: 700,
      // 是否首尾相接
      // continuousVertical: true,
      normalScrollElementTouchThreshold: 5,
      // 导航条显示
      navigation: true,

      // 内容超出后是否出现滚动条
      scrollOverflow: false,
      // // 左右滑块循环
      loopHorizontal: false,
      // 左右滑块颜色
      controlArrowColor:'#16BA9D',
      // 导航栏设置,分为6页
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],//anchors定义锚链接，在最开始的页面头部定义锚点，定死在页面头部，并绑定data-menuanchor
      menu: '#menu',//绑定菜单，设定的相关属性与anchors的值对应后，菜单可以控制滚动
      easing: 'easeInOut',

      // 页面渲染后回调，afterRender 页面结构生成后的回调函数，或者说页面初始化完成后的回调函数
      
      afterRender: function () {
        // page4 透明背景

        $('item-4').css('background', 'rgba(255, 255, 255, .1)');
        //侧边导航事件
        var Tooltips = ['个人简历', '基本资料', '专业技能', '工作经历', '项目经验', '自我评价'];
        //使用dataset获取元素的自定义属性
        //expense=[............];
        //chartInput = [];
		//for (var item in expense) {
		//chartInput.push(expense[item]);
		//}
		//上面这几行代码作用是让所有的自定义的属性值塞到一个数组中。
		//
		//如果你想删掉一个data属性，可以这么做：
		//
		//delete expenseday2.dataset.meal;
		//如果你想给元素添加一个属性，可以这么做：
		//
		//expenseday2.dataset.dessert = 'icecream';
		
		
		//fp-nav代表页面右侧定死的按钮翻页
        $("#fp-nav ul li").each(function (index) {
          this.dataset['toggle'] = 'tooltip';//直接给this代表的ul 中的li设置toggle属性值为tooltip
          this.dataset['placement'] = 'left';
          $(this).attr('title', Tooltips[index])
        })
        $('[data-toggle="tooltip"]').tooltip();


        // 顶部导航栏自动回拉事件
        if ($('.navbar-toggle').css('display') == 'block') {
        	//当顶部的li点击时触发
          $('.navbar-collapse li').on('click', function () {
            $('.navbar-toggle').trigger('click');
          });
        }

	//1!!!!!!!!!!!!!!!!!
        $('#fp-nav').addClass('hidden-xs');
        // 为了避免标签太多同一时间加载的话在刚载入页面时候产生怪异感，所有动画元素初始都是hidden的

        $('.item-1 .next-page').on('click', function () {
          $.fn.fullpage.moveSectionDown();//向下滚动
        });
//        页面加载后的0.5秒5个圆角显示
        setTimeout(function () {
          $('.item-1 .corner').show();
          $('.resume-hide').show();
        }, 500);
      },

      // 滚动触发后结束前回调
      onLeave: function (index, nextIndex, direction) {

        if(nextIndex==4){
          $('.pure').hide();
          $('.sky').show();
        }
		
		//第六页的特效
        if(nextIndex==6){
          $('.sky').hide();
        }else {
            $('.item-6 .top').animate({'height': '50%'},400);
            $('.item-6 .foot').animate({'height': '50%'},400);
        }


        switch (index) {
          case 1:
            $('.item-1 .corner').hide();
            $('.resume-hide').hide();
            $('.navbar').removeClass('black');

            break;

          case 2:
            if (direction == 'down') {
              $('.item-2 .icon-infomation').addClass('zoomOutUp');
              setTimeout(function () {
                $('.item-2 .icon-infomation').removeClass('zoomOutUp');
                $('.item-2 .container').hide();
              }, 500);
            } else {
              $('.item-2 .container').hide();
            }
            break;

          case 3:
            $('.item-3 .container').hide();
            $('.navbar').removeClass('blue');
            break;

          case 4:
          {
            $('.item-4 .container').hide();
            break;
          }
          case 6:{

          }
        }
      },

      // afterload为fullPage中的函数，滚动结束后回调
      afterLoad: function (anchorLink, index) {
      if(index==6)
        $('.pure').show();

        switch (anchorLink) {
          case 'page1':
            $('.item-1 .corner').show();
            $('.resume-hide').show();
            $('.navbar').addClass('black');
            break;
          case 'page2':
            $('.item-2 .container').show();
            break;
          case 'page3':
            $('.navbar').addClass('blue');
            $('.item-3 .container').show();

            break;
          case 'page4':
            $('.item-4 .container').show();
            break;

          case 'page5':
            break;
			//page6上下两侧同时移动特效，将两个背景色块从50同时减到30
          case 'page6':
            setTimeout(function () {
              $('.item-6 .top').animate({'height': '30%'},400);
              $('.item-6 .foot').animate({'height': '30%'},400);
            },500)

            break;
        }
      },

    // 水平滑块回调
      onSlideLeave: function (anchorLink,index,slideIndex,direction) {
          // if(slideIndex==0){
            project_info();
          // }
      },

      // 水平滑块回调
      afterSlideLoad: function (anchorLink,index,slideIndex) {
      }
    }
  )


})



