import tinycolor from 'tinycolor2'

function _colorChange (data) {
  var color

  if (data && data.hex) {
    color = tinycolor(data.hex)
  } else {
    color = tinycolor(data)
  }

  var hsv = color.toHsv()

  // make sure hue isn't changed if we didn't change it (should only happen when s or v is 0)
  if (typeof data === 'object' && data.dataKey !== 'h' && 'h' in data && data.h !== hsv.h) {
    hsv.h = data.h
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
