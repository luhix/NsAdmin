layui.define(['element','layer'], function (exports) {

    var $ = layui.jquery,
        layer = layui.layer,
        element = layui.element;

    var ns_theme = {
        init: function () {
            var themeName=this.getData('themeName')||'ns-black-theme';
            this.changeSkin(themeName);
            this.initEvent();
        }

        ,initEvent:function(){
            var that=this;
            $(".ns-theme-skin-switch").click(function(){
                var themeName=$(this).attr('skin')||'ns-black-theme';
                that.changeSkin(themeName);
            });
        }

        ,changeSkin:function (themeName) {
            var css="layui-layout-body ";
            $('body').attr('class',css+themeName);
            // console.log($('body').attr('class',css+themeName));
            this.setData('themeName',themeName);
        }
        
        //设置皮肤
        ,setData: function (key, val) {
            if(window.localStorage) {
                var dataBase = window.localStorage;
                dataBase[key] = val;
            } else {
                layer.msg("当前浏览器不支持换肤操作");
            }
        }
        //读取皮肤
        ,getData: function (key) {
            if(window.localStorage) {
                var dataBase = window.localStorage;
                return dataBase[key];
            } else {
                layer.msg("当前浏览器不支持换肤操作");
            }
        }
    }

    
    exports('nsTheme', ns_theme);

})