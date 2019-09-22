<template>
    <li v-bind:id="button.code" v-on:click="!button.disabled && onclick(button,$event)">
        <div class="item">
            <span class="icon" v-bind:class="button.icon" v-bind:title="button.name"></span>
            <span>{{ button.name }}</span>
        </div>
    </li>
</template>
<script>
    define(["vue"], function(vue) {
        var result = vue.extend({
            template: template,
            props: ['button'],
            methods: {
                onclick: function(button,event){
                    //alert("原生事件:" + button.code);
                    this.$emit('button-event', button,event);
                }
            }
        });
        return result;
    });
</script>

<style scoped>
	.menubar{
		height: 40px;
		padding: 0 20px;
		font-size: 14px;
		background: rgba(8, 27, 77, 1);
	}
	.menubar ul li{
		height: 40px;
	    float: left;
	    margin-right: 10px;
	    padding: 8px 0;
	}
	.menubar ul li .item{
		color: #fff;
		height: 24px;
		padding: 4px;
		cursor: pointer;
	    line-height: 15px;
	    border-radius: 4px;
	    outline-style: none;
	    background: rgba(255, 255, 255, 0.06);
	}
	.menubar ul li .item .icon{
		width: 16px;
		margin-right: 4px;
		border-radius: 4px;
	    text-align: center;
		background: rgba(255,255,255,0.2);
	}
	.menubar ul li .item .icon:before {
	    font-size: 12px;
	}
	.menubar ul li .item span{
		float: left;
		height: 16px;
		display: block;
	}
</style>
