<template>
    <div>
        <span>公共组件</span>
        {{prop}}
        {{text}}
    </div>
</template>
<script>
    define(["vue"], function(vue) {
        var result = vue.extend({
            template: template,
            props: ['prop'],
            data: function() {
                return {"text": "Ok from component.vue using scoped css"};
            }
        });
        return result;
    });
</script>

<style scoped>

</style>
