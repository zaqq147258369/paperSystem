/**
 * Created by tl on 2016/8/30.
 */
"use strict"
define([
    'ZY'
], function () {
    var _this;
    var themeKey = 'customTheme';
    var _themeDialogOpt = {
        url: '~echartStyle-dialog.html',
        width: 450,
        height: 600,
        title: '图表样式'
    };
    var EchartThemeBuild = function () {
        _this = this;
        //合并echart option
        function mergeOpt(echartOpt, themeOpt) {
            themeOpt = JSON.parse(themeOpt);
            if (themeOpt) {
                echartOpt.backgroundColor = themeOpt.backgroundColor;
                echartOpt.color = themeOpt.color;
                echartOpt.title = $.extend(echartOpt.title, themeOpt.title || {});
                echartOpt.legend = $.extend(echartOpt.legend, themeOpt.legend || {});
                var xAxis = echartOpt.xAxis;
                var yAxis = echartOpt.yAxis;
                var series = echartOpt.series;
                if (series && series instanceof Array) {
                    for (var i = 0; i < series.length; i++) {
                        $.extend(series[i].markPoint, themeOpt.series.markPoint || {});
                    }
                }
                if (xAxis && yAxis) {
                    if (xAxis instanceof Object && yAxis instanceof Object) {
                        $.extend(xAxis.axisLabel, themeOpt.xyAxis.axisLabel || {});
                        $.extend(xAxis.axisLine, themeOpt.xyAxis.axisLine || {});
                        $.extend(xAxis.splitLine, themeOpt.xyAxis.splitLine || {});

                        $.extend(yAxis.axisLabel, themeOpt.xyAxis.axisLabel || {});
                        $.extend(yAxis.axisLine, themeOpt.xyAxis.axisLine || {});
                        $.extend(yAxis.splitLine, themeOpt.xyAxis.splitLine || {});
                    }
                    if (xAxis instanceof Array && yAxis instanceof Array) {
                        for (var i = 0; i < xAxis.length; i++) {
                            $.extend(xAxis[i].axisLabel, themeOpt.xyAxis.axisLabel || {});
                            $.extend(xAxis[i].axisLine, themeOpt.xyAxis.axisLine || {});
                            $.extend(xAxis[i].splitLine, themeOpt.xyAxis.splitLine || {});
                        }
                        for (var i = 0; i < yAxis.length; i++) {
                            $.extend(yAxis[i].axisLabel, themeOpt.xyAxis.axisLabel || {});
                            $.extend(yAxis[i].axisLine, themeOpt.xyAxis.axisLine || {});
                            $.extend(yAxis[i].splitLine, themeOpt.xyAxis.splitLine || {});
                        }
                    }
                }
            }
        }

        _this.init = function (echart, option) {
            var themeOpt = window.localStorage.getItem(themeKey);
            mergeOpt(option, themeOpt);
            console.log(option)
            /*var echartOpt = $.extend({}, option, themeOpt || {});*/
            echart.setOption(option);
        }
        _this.openEchartThemeDialog = function (callback) {
            window.openDlg({
                url: _themeDialogOpt.url,
                width: _themeDialogOpt.width,
                height: _themeDialogOpt.height,
                title: _themeDialogOpt.title,
                callback: function (theme) {
                    if(theme){
                        if($.isEmptyObject(theme)){
                            window.localStorage.removeItem(themeKey);
                        }else{
                            _this.setTheme(theme);
                        }
                        if (callback) {
                            callback();
                        }
                    }
                }
            });
        }
        _this.setTheme = function (theme) {
            window.localStorage.setItem(themeKey, JSON.stringify(theme));
        }
    };
    return new EchartThemeBuild();
});
