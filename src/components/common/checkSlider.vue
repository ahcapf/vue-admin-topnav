<template>
  <el-slider
    :class="{success: value === 100, 'slider-validate': true}"
    v-model="value"
    :disabled="isDisabled"
    :show-tooltip="false"
    @input="resetSlider"
    @change="handleChange" />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      defaultValue: 0,
      value: 0,
      isDisabled: false
    }
  },
  mounted() {
    const value = this.$el.querySelector('.el-slider__button-wrapper').clientWidth / this.$el.clientWidth * 100
    this.defaultValue = value
    this.resetSlider(value)
  },
  methods: {
    resetSlider (value) {
      if (value < this.defaultValue) {
        value = this.defaultValue
      }
      this.value = value
      this.$emit('change', value)
    },
    handleChange(val) {
      if (val === 100) {
        this.isDisabled = true
      }
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
.slider-validate.el-slider {
  overflow: hidden;
  $--slider-height: 40px;

  .el-slider__runway {
    height: $--slider-height;
    margin: 0;
    background-color: transparent;
    border: 1px solid #dcdfe6;

    &::after {
      content: "按住滑块，拖动到最右边";
      display: block;
      width: 100%;
      text-align: center;
      height: 100%;
      position: absolute;
      color: #908f8b;
      font-size: 12px;
      line-height: 38px;
    }

    .el-slider__bar {
      height: $--slider-height - 2px;
      background-color: #3DB85F;
      border-radius: 3px;
    }

    .el-slider__button-wrapper {
      width: $--slider-height - 2px;
      height: $--slider-height - 2px;
      top: 0;
      transform: translateX(-100%);

      .el-slider__button {
        width: 100%;
        height: 38px;
        border-radius: 3px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 0;
        border-right: 1px solid #dcdfe6;

        &::before {
          font-family: element-icons !important;
          speak: none;
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          content: "\e6dc";
        }
      }
    }

    .el-slider__button.dragging,
    .el-slider__button.hover,
    .el-slider__button:hover {
      transform: scale(1);
    }
  }

  &.success {
    .el-slider__runway {
      &::after {
        content: "验证通过";
        color: #fff;
        font-size: 12px;
      }

      .el-slider__button-wrapper {
        .el-slider__button {
          &::before {
            content: "\e6da";
            color: white;
            background: #3DB85F;
            border: 1px solid #3DB85F;
            border-radius: 50%;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
