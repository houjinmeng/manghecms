<template>
  <div>
    <div
      contenteditable="true"
      class="dialog-main"
      innerHTML.length="20"
      ref="Maincontent"
      @input="handleInput"
      @compositionstart="handleStart"
      @compositionend="handleEnd"
    ></div>
  </div>
</template>

<script>
export default {
  methods: {
    handleInput(event) {
      let text = event.target.innerText;
      this.valueHandle(event, text);
    },

    valueHandle(event, strVale) {
      let _this = this;
      let text = strVale;
      this.sendContent = text;
      if (this.composing) {
        return;
      }
      let len = this.validateTextLength(text);
      if (len > 500) {
        this.$refs.Maincontent.innerHTML = text.substr(0, 500);
        this.$refs.Maincontent.focus();
      }
      setTimeout(() => {
        _this.keepLastIndex(event.target);
      }, 5);
      // 拓展 如果想要只需要前100位数据
      // this.content = this.content.substring(0, 100)
    },

    handleStart() {
      this.composing = true;
    },
    /**
     * 中文输入结束
     */
    handleEnd($event) {
      this.composing = false;
      let text = $event.target.innerHTML;
      // console.log($event.target.innerHTML)
      this.valueHandle($event, text);
    },
    validateTextLength(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = value.match(cnReg);
      let length;
      if (mat) {
        length = mat.length + (value.length - mat.length) * 0.5;
        return length;
      } else {
        return value.length * 0.5;
      }
    },
    keepLastIndex (obj) {
        if (window.getSelection) { // ie11 10 9 ff safari
          obj.focus() // 解决ff不获取焦点无法定位问题
          let range = window.getSelection() // 创建range
          range.selectAllChildren(obj) // range 选择obj下所有子内容
          range.collapseToEnd() // 光标移至最后
        } else if (document.selection) { // ie10 9 8 7 6 5
          let range = document.selection.createRange() // 创建选择对象
          // var range = document.body.createTextRange();
          range.moveToElementText(obj) // range定位到obj
          range.collapse(false) // 光标移至最后
          range.select()
        }
      },
  }
};
</script>
<style>
.dialog-main {
  background-color: #ffffff;
  height: 1rem;
}
</style>