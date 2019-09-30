requirejs.config({
    paths: {
        'vue' : 'vendor/vue/js/vue',
        'text' : 'vendor/require-text',
        "require-vue": "vendor/require-vuejs"
    }
});

var commonComponent = ['vue',
					   'require-vue!vendor/vue/component/common/common',
					   'require-vue!vendor/vue/component/common/menu-button'];

function registerComponent(){
    define(commonComponent, function (vue, commonComponent, menuButton, record, example, containerView, containerBlood, bloodBag, bloodBagPlus, refrigerator, refrigeratorPlus) {
        vue.component('common-component', commonComponent);
        vue.component('menu-button', menuButton);
        return true;
    })
}

registerComponent();
