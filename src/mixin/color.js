import tinycolor from 'tinycolor2'

function _colorChange (data) {
  var color

  if (data && data.hex) {
    color = tinycolor(data.hex)
  } else {
    color = tinycolor(data)
  }

  var hsv = color.toHsv()

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
  }

  return {
    hex: color.toHexString().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv
  }
}

export default {
  props: ['value'],
  data () {
    return {
      val: _colorChange(this.value)
    }
  },
  computed: {
    colors: {
      get () {
        return this.val
      },
      set (newVal) {
        this.val = newVal
        if (this.shouldLiveUpdate) {
          this.$emit('input', newVal)
        }
      }
    }
  },
  methods: {
    colorChange (data) {
      this.colors = _colorChange(data)
    },
    isValidHex (hex) {
      return tinycolor(hex).isValid()
    }
  }
}
