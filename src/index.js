import Photoshop from './components/Photoshop.vue'
import EditableInput from './components/common/EditableInput.vue'
import Hue from './components/common/Hue.vue'
import Saturation from './components/common/Saturation.vue'
import ColorMixin from './mixin/color.js'

const VueColor = {
  version: '2.4.6',
  Photoshop,
  EditableInput,
  Hue,
  Saturation,
  ColorMixin
}

module.exports = VueColor
