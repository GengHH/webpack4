<template>
  <div>{{ mymsg }}</div>
</template>

<script>
export default {
  name:'App',
  data: function () {
    return{
      mymsg:'genghonghui'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "microsoft yahei";
}
html,
body {
  width: 100%;
  height: 100%;
}
div {
  color: brown;
  font-size: 20px;
}
</style>