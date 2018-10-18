/**
 * Page五小鸟图片内的小图片和图标切换的JS.
 * Find by Mystic 
 */
var project_info  = function () {

//        当前活动标签
  var current = 1;

	//应用自定义函数设置第一个li为显示
  display($('#rotmenu li:first'));
  
  $('#rotmenu li').bind('click', function (e) {
  	//此时函数传递的参数为this代表的事件注册事件rotmenu.li
    display($(this));
    e.preventDefault();
  });
  
  
  
  //自定义display函数
  function display(elem) {
  	//重新定义一个变量来接收点击的li对象
    var $this = elem;
    var repeat = false;
	//负责控制右侧点击切换栏的位置，animate第二个参数为动画切换时间
	//负责移动回原处操作
    $this.parent().find('li:nth-child(' + current + ') a')
      .stop()
      //反向向右移20px，将显示栏外的点击栏并排排列，，并且侧边栏收回和透明度切换有0.4s时差
      .animate({'marginRight': '-20px'}, 300, function () {
        $(this).animate({'opacity': '0.7'}, 700);
      });

    //重置当前current，通过￥this获得当前对象，并用index方法返回下标
    //$("li").click(function(){ alert $(this).index();}
    current = parseInt($this.index() + 1);

    // 把a往外移动效果显示,同时控制a的文字浮现，并且让左下角的文字栏浮现
    	//此特效属于display自定义函数中
    var elem = $('a',$this);
    elem.stop().animate({'marginRight': '0px', 'opacity': '1.0'}, 300);

    // 信息展示,针对6个网页的·
    var info_elem = elem.next();
    //rot1为rotate内的一个容器
    $('#rot1 .heading').stop().animate({'left': '-420px'}, 500, 'easeOutCirc', function () {
      $('h1', $(this)).html(info_elem.find('.info_heading').html());
      $(this).animate({'left': '0px'}, 400, 'easeInOutQuad');
    });

    $('#rot1 .description').stop().animate({'bottom': '-270px'}, 500, 'easeOutCirc', function () {
      $('p', $(this)).html(info_elem.find('.info_description').html());
      $(this).animate({'bottom': '0px'}, 400, 'easeInOutQuad');
    })

    $('#rot1').prepend(
      $('<img/>', {
        style: 'opacity:0',
        className: 'bg'
      }).load(
        function () {
          $(this).animate({'opacity': '1'}, 600);
          $('#rot1 img:first').next().animate({'opacity': '0'}, 700, function () {
            $(this).remove();
          });
        }
      ).attr('src', 'images/' + info_elem.find('.info_image').html()).attr('width', '100%').attr('height', '300')
    );
}

}
