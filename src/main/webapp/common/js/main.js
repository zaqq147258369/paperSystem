require.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'], //.deps：一个数组，表明该模块的依赖性。
            exports: 'Backbone' //.exports：定义输出的变量名，表明这个模块外部调用时的名称。
        }
    },
    paths: {
        "jquery": "jquery"
    }
});