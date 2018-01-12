layui.define(['element'], function (exports) {
    var element = layui.element,
        $ = layui.jquery;
    
    var ns_tab = {
        init: function () {
            ns_tab.switchMenu();
            ns_tab.switchTab();
            element.on('nav(leftMenu)', function(elem){
                var icon = $(elem).find('a').find('i').attr('class'),
                    title  = $(elem).find('a').find('span').text(),
                    id  = $(elem).find('a').attr('data-id'),
                    url  = $(elem).find('a').attr('data-url');

                //防止空url添加
                if (url == undefined) return;

                //判断是否已经存在所点击tab
                var tabDiv = $('.ns-main').children('.ns-tab-title');
                var tabExist = tabDiv.find('li[lay-id='+id+']');
                if(tabExist.length > 0) {
                    ns_tab.tabChange(id);
                } else {
                    ns_tab.tabAdd(id,title,url,icon);
                }
            });
        }
        ,tabAdd: function(id, title, url,icon) {
            //新增一个Tab项
            element.tabAdd('right-tab', {
                title: '<i class= "'+ icon+'" aria-hidden="true"></i>' + '&nbsp;<span>'+title+'</span>',
                content: '<iframe class="ns-main-iframe"  src="' + url + '" />',
                id: id
            })
            ns_tab.tabChange(id);

        }
        ,tabChange: function(id){
            console.log(id);
        //切换到指定Tab项
          element.tabChange('right-tab', id); //切换到：用户管理
            $('.ns-tab-title>'+'li[lay-id='+id+']');
        }
        ,switchMenu: function () {
            $('.ns-menu-switch').on('click', function() {
                if($(this).hasClass('open')) {
                    $(".layui-side").animate({
                        'left': -200
                    }, 200);
                    $(".layui-body").animate({
                        'left': 0
                    }, 200);

                    $(".layui-footer").animate({
                        'left': 0
                    },200);
                    $(this).attr('title','展开'); //设置自定义属性
                    $(this).removeClass('open').addClass('ns-menu-switch-color');
                } else {
                    $(".layui-side").animate({
                        'left': 0
                    }, 200);
                    $(".layui-body").animate({
                        'left': 200
                    }, 200);

                    $(".layui-footer").animate({
                        'left': 200
                    },200);
                    $(this).attr('title','关闭'); //设置自定义属性
                    $(this).addClass('open').removeClass('ns-menu-switch-color');
                }
            });
        }

        //tab和menu联动切换
        ,switchTab: function () {
            element.on('tab(right-tab)', function(data){

                // console.log(data.elem.context.attributes[0].nodeValue);
                // console.log(data.elem);
                if(data.elem.context.attributes != undefined){
                    var id = data.elem.context.attributes[0].nodeValue;
                    layui.each($(".layui-nav-child"), function () {
                        $(this).find("dd").removeClass("layui-this");
                    });
                    $(".ns-"+id).addClass("layui-this");
                }
            });
        }
    }

    exports('nsTab', ns_tab);
})