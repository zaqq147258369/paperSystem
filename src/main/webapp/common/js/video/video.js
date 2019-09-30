(function($){

    window.videoList = [];
    var currentLayout = 0;

    var Container = function(obj){
        var parentContainer = obj.container;
        if(!(parentContainer instanceof jQuery))
            parentContainer = $(parentContainer);
        var toolBar = $('<nav class="navbar navbar-default">' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li>' +
            '<a href="#" onclick="changeScreen(this)">' +
            '<span title="全屏" class="fa fa-square-o" aria-hidden="true"></span>' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a id="btnRemoveAll" href="#" onclick="removeAll()">' +
            '<span title="删除全部" class="fa fa-remove" aria-hidden="true"></span>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</nav>');
        var videoContainer = $('<div class="videoContainer flex-item-inColumn full-height"></div>');
        parentContainer.append(toolBar);
        parentContainer.append(videoContainer);
        if(obj.closeAll){
            videoContainer.data('closeAll', obj.closeAll);
        }
    }

    $.fn.createContainer = function(data){
        if (methods[data.method]) {
            return methods[data.method](data.obj);
        }else if(typeof method === 'object' || !method){

        }else{

        }
    };

    var VideoLayout = function(row, container){
        currentLayout = row;
        var sum = row * row;
        var size = (1 / row) * 100 + "%";
        var container = $('.videoContainer');
        if(sum == 0){
            container[0].innerHTML = "";
        }else{
            if($('.videoLayout').length == 0){
                var videoLayout = $('<div class="videoLayout"></div>');
                container.append(videoLayout);
            }
            var existedLength = $('.videoLayout .videoBox').length;
            if(sum > existedLength){
                for(var i=0; i<sum; i++){
                    if(i<existedLength){
                        changeVideoBoxSize($('.videoLayout .videoBox')[i], size);
                    }else{
                        var videoBox = $('<div class="videoBox flex-container-column" style="width:' + size + ';height:' + size + '"></div>');
                        $('.videoLayout').append(videoBox);
                    }
                }
            }
        }
    };

    $.fn.videoLayout = function(method, number){
        if (methods[method]) {
            return methods[method](number);
        }else if(typeof method === 'object' || !method){

        }else{

        }
    };

    var VideoBox = function(obj){
        var video = $.extend({},$.fn.videoBox._defaultOpt, obj.option);
        video.src = video.src + "?id=" + video.id;
        var title = $('<span class="videoName">' + video.name + '</span>')
        var header = $('<div class="videoBox-header"><a onclick="removeBox(this)"><i class="fa fa-remove"></i></a></div>');
        var videoIframe = $('<iframe class="videoIframe flex-item-inColumn" src="' + video.src + '"></iframe>');
        header.append(title);
        $($('.videoLayout .videoBox')[window.videoList.length]).append(header);
        $($('.videoLayout .videoBox')[window.videoList.length]).append(videoIframe);
        $($('.videoLayout .videoBox')[window.videoList.length]).data('videoBox', obj);
        window.videoList.add(video);
        window.top.videoList = window.videoList;
    }

    $.fn.videoBox = function(data){
        if (methods[data.method]) {
            return methods[data.method](data.obj);
        }else if(typeof method === 'object' || !method){

        }else{

        }
    }

    $.fn.removeAll = function(){
        window.removeAll();
    }

    window.removeAll = function(){
        var videoContainer = $('.videoContainer')[0];
        var closeAll = $(videoContainer).data('closeAll');
        if(closeAll){
            closeAll();
        }
        clearUpVideo($(videoContainer).find('iframe'));
        videoContainer.innerHTML = "";
        window.videoList = [];
    }

    window.removeBox = function(dom){
        var videoBox = $(dom).parents('.videoBox');
        var data = videoBox.data('videoBox');
        if(data.close){
            data.close();
        }
        clearUpVideo(videoBox.find('iframe'));

        var index = videoBox.index();
        videoBox.remove();
        window.videoList.splice(index, 1);
        //改变布局，改变视频大小
        var countVideo = $('.videoIframe').length;
        var row = Math.sqrt(countVideo);
        if(!(row == parseInt(row)))
            row = parseInt(row) + 1;
        if(row < currentLayout){
            changeLayout(row);
            currentLayout = row;
        }else{
            var size = (1 / currentLayout) * 100 + "%";
            var videoBox = $('<div class="videoBox flex-container-column" style="width:' + size + ';height:' + size + '"></div>');
            $('.videoLayout').append(videoBox);
        }

        $('.videoIframe').each(function(){
            $(this)[0].contentWindow.location.reload();
        })
    }

    //释放视频
    function clearUpVideo(iframes){
        for(var i=0; i<iframes.length; i++){
            var childWindow = iframes[i].contentWindow;
            childWindow.clearUpSDK();
        }
    }

    function changeVideoBoxSize(dom, size){
        $(dom).css({width:size, height:size});
        if($(dom).find('iframe').length > 0)
            $(dom).find('iframe')[0].contentWindow.location.reload();
    }

    function changeLayout(row){
        var index = 0;
        var sum = row * row;
        var size = (1 / row) * 100 + "%";
        $('.videoBox').each(function(){
            if(index >= sum)
                $(this).remove();
            else
                changeVideoBoxSize(this, size);
            index++;
        })
    }

    window.changeScreen = function(dom){
        var displayDiv = $(dom).parents('div')[0];
        var newTitle = "";
        var newClassName = "";
        var parentDoc = window.parent.document;
        var className = $(dom).find('span')[0].className;
        var hideDivs = [".header-bar", ".twill ", ".header-path", ".footer", ".show-list-btn", "#leftDiv"];


        if(className == "fa fa-square-o"){
            newTitle = "缩小";
            newClassName = "fa fa-clone";
            $('body').css('padding', 0);
            $('#leftDiv').hide();
            for(var i=0; i<hideDivs.length; i++){
                $(parentDoc).find(hideDivs[i]).hide();
            }
            $('.videoIframe').each(function(){
                $(this)[0].contentWindow.location.reload();
            })

        }else{
            newTitle = "全屏";
            newClassName = "fa fa-square-o";
            $('body').css('padding', 20);
            $('#leftDiv').show();
            for(var i=0; i<hideDivs.length; i++){
                $(parentDoc).find(hideDivs[i]).show();
            }
            $('.videoIframe').each(function(){
                $(this)[0].contentWindow.location.reload();
            })
        }
        $(dom).find('span')[0].title = newTitle;
        $(dom).find('span')[0].className = newClassName;
    }

    var methods = {
        initLayout: function(number){
            var row = Math.sqrt(number * 1);
            if(!(parseInt(row) == row)){
                row = parseInt(row) + 1;
            }
            new VideoLayout(row);
        },
        initVideoBox: function(obj){
            new VideoBox(obj);
        },
        initContainer: function(parentContainer){
            new Container(parentContainer);
        }
    };

    $.fn.videoBox._defaultOpt = {
        src: "../../../monitor/views/videoOverview/realplay.html",
    };

})(jQuery);
