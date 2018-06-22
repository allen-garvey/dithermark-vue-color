<template>
  <div :class="['vc-photoshop', disableFields ? 'vc-photoshop__disable-fields' : '']">
    <div class="vc-ps-head">{{head}}</div>
    <div class="vc-ps-body">
      <div class="vc-ps-body-main">
        <div class="vc-ps-first-column">
          <div class="vc-ps-saturation-wrap">
            <saturation v-model="colors" @change="childChange"></saturation>
          </div>
          <div class="vc-ps-button-container vc-ps-button-container-main">
            <button class="btn btn-default btn-sm" aria-label="cancel" @click="handleCancel">Cancel</button>
            <button class="btn btn-primary btn-sm" aria-label="confirm" @click="handleAccept">Ok</button>
          </div>
        </div>
        <div class="vc-ps-hue-wrap">
          <hue v-model="colors" @change="childChange" direction="vertical">
            <div class="vc-ps-hue-pointer">
              <i class="vc-ps-hue-pointer--left"></i><i class="vc-ps-hue-pointer--right"></i>
            </div>
          </hue>
        </div>
      </div>
      <div class="vc-ps-controls">
        <div class="vc-ps-previews">
          <div class="vc-ps-previews__label">new</div>
          <div class="vc-ps-previews__swatches">
            <div class="vc-ps-previews__pr-color" :aria-label="'newColor:' + colors.hex" :style="{background: colors.hex}"></div>
            <div class="vc-ps-previews__pr-color" :aria-label="'currentColor:' + currentColor" :style="{background: currentColor}" @click="clickCurrentColor"></div>
          </div>
          <div class="vc-ps-previews__label">current</div>
        </div>
        <div class="vc-ps-actions" v-if="!disableFields">
          <div class="vc-ps-fields">
            <!-- hsv -->
            <div class="vc-ps-fields-group vc-ps-hsv-fields">
              <ed-in label="h" data-name="h" title="Hue" desc="°" type="number" :value="hsv.h" @change="inputChange"></ed-in>
              <ed-in label="s" data-name="s" title="Saturation" desc="%" type="number" :value="hsv.s" :max="100" :min="0" @change="inputChange"></ed-in>
              <ed-in label="v" data-name="v" title="Value" desc="%" type="number" :value="hsv.v" :max="100" :min="0" @change="inputChange"></ed-in>
            </div>
            <!-- rgba -->
            <div class="vc-ps-fields-group vc-ps-rgb-fields">
              <ed-in label="r" data-name="r" title="Red" type="number" :value="colors.rgba.r" :max="255" :min="0" @change="inputChange"></ed-in>
              <ed-in label="g" data-name="g" title="Green" type="number" :value="colors.rgba.g" :max="255" :min="0" @change="inputChange"></ed-in>
              <ed-in label="b" data-name="b" title="Blue" type="number" :value="colors.rgba.b" :max="255" :min="0" @change="inputChange"></ed-in>
            </div>
            <!-- hex -->
            <div class="vc-ps-fields-group vc-ps-hex-fields">
              <ed-in label="#" data-name="#" title="Color hex representation" type="text" class="vc-ps-fields__hex" :value="hex" @change="inputChange"></ed-in>
            </div>
          </div>
        </div>
      </div>
      <div class="vc-ps-button-container vc-ps-button-container-secondary">
        <button class="btn btn-default btn-sm" aria-label="cancel" @click="handleCancel">Cancel</button>
        <button class="btn btn-primary btn-sm" aria-label="confirm" @click="handleAccept">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'

function containsAnyKey(object, keys){
  for(let key of keys){
    if(key in object){
      return true
    }
  }
  return false
}
//hues greater than 360 are handled automatically
function wrapHue(hue){
  if(hue < 0){
    return 360 + (hue % 360);
  }
  return hue
}

export default {
  name: 'Photoshop',
  mixins: [colorMixin],
  props: {
    head: {
      type: String,
      default: 'Color Picker'
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  components: {
    saturation,
    hue,
    'ed-in': editableInput
  },
  data () {
    return {
      currentColor: '#FFF'
    }
  },
  computed: {
    hsv () {
      const hsv = this.colors.hsv
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed()
      }
    },
    hex () {
      const hex = this.colors.hex
      return hex && hex.replace('#', '')
    }
  },
  created () {
    this.currentColor = this.colors.hex
  },
  methods: {
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if ('#' in data) {
        if(this.isValidHex(data['#'])){
          this.colorChange({
            hex: data['#'],
            source: 'hex'
          })
        }
      } else if (containsAnyKey(data, ['r', 'g', 'b', 'a'])) {
        this.colorChange({
          r: 'r' in data ? data.r : this.colors.rgba.r,
          g: 'g' in data ? data.g : this.colors.rgba.g,
          b: 'b' in data ? data.b : this.colors.rgba.b,
          a: 'a' in data ? data.a : this.colors.rgba.a,
          source: 'rgba'
        })
      } else if (containsAnyKey(data, ['h', 's', 'v'])) {
        this.colorChange({
          h: 'h' in data ? wrapHue(data.h) : this.colors.hsv.h,
          s: 's' in data ? (data.s / 100) : this.colors.hsv.s,
          v: 'v' in data ? (data.v / 100) : this.colors.hsv.v,
          source: 'hsv'
        })
      }
    },
    clickCurrentColor () {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex'
      })
    },
    handleAccept () {
      this.$emit('ok', this.currentColor)
    },
    handleCancel () {
      this.$emit('cancel', this.currentColor)
    }
  }

}
</script>

<style>
.vc-photoshop {
  box-sizing: initial;
  display: inline-block;
}
.vc-photoshop__disable-fields {
  width: 390px;
}
.vc-ps-head {
  padding: 6px 0 0;
  font-size: 13px;
  text-align: center;
}
.vc-ps-body {
  padding: 2px 7px 5px 5px;
  display: flex;
}
.vc-ps-body-main{
  display: flex;
}

.vc-ps-saturation-wrap {
  width: 256px;
  height: 256px;
  position: relative;
  border: 2px solid #B3B3B3;
  border-bottom: 2px solid #F0F0F0;
  overflow: hidden;
}
.vc-ps-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-ps-hue-wrap {
  position: relative;
  height: 256px;
  width: 37px;
  margin-left: 10px;
  border: 2px solid #B3B3B3;
  border-bottom: 2px solid #F0F0F0;
}
.vc-ps-hue-pointer {
  position: relative;
}
.vc-ps-hue-pointer--left,
.vc-ps-hue-pointer--right {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent #555;
}
.vc-ps-hue-pointer--left:after,
.vc-ps-hue-pointer--right:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #fff;
  position: absolute;
  top: 1px;
  left: 1px;
  transform: translate(-8px, -5px);
}
.vc-ps-hue-pointer--left {
  transform: translate(-13px, -4px);
}
.vc-ps-hue-pointer--right {
  transform: translate(20px, -4px) rotate(180deg);
}

.vc-ps-controls {
  margin-left: 12px;
}

.vc-ps-previews {
  width: 60px;
}
.vc-ps-previews__swatches {
  border: 1px solid #B3B3B3;
  border-bottom: 1px solid #F0F0F0;
  margin-bottom: 2px;
  margin-top: 1px;
}
.vc-ps-previews__pr-color {
  height: 34px;
  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;
}
.vc-ps-previews__label {
  font-size: 14px;
  text-align: center;
}
.vc-ps-fields-group{
  margin-bottom: 5px;
}
.vc-ps-fields {
  padding-top: 5px;
}
.vc-ps-fields .vc-input__input {
  width: 3em;
  border: 1px solid #888888;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC;
  margin-bottom: 5px;
  font-size: 13px;
  padding-left: 3px;
}
.vc-ps-fields .vc-input__label, .vc-ps-fields .vc-input__desc {
  text-transform: uppercase;
  font-size: 13px;
}

.vc-ps-fields__hex .vc-input__input {
  width: 4.2em;
}
.vc-ps-button-container{
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
}
.vc-editable-input{
  min-width: -webkit-max-content;
  min-width: max-content;
}
.vc-ps-first-column{
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
