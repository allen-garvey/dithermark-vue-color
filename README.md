# vue-color Dithermark

Fork of [vue-color](https://github.com/xiaokaike/vue-color) v2.4.6 to create custom build for [Dithermark](https://github.com/allen-garvey/dithermark)

## Getting Starting

* `npm install`
* `npm run release`
* Compiled and minified files located in `dist` directory


## Usage

```js

var colors = {
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}
// or
var colors = '#194d33'
// or 
var colors = { h: 150, s: 0.66, v: 0.30 }
// or 
var colors = { r: 255, g: 0, b: 0 }
// etc...

new Vue({
  el: '#app',
  components: {
    'photoshop-picker': photoshop
  },
  data () {
    return {
      colors
    }
  }
})

```

`colors` accepts either a string of a hex color '#333' or a object of rgb or hsl values `{ r: 51, g: 51, b: 51 }` or `{ h: 0, s: 0, l: .10 }`, whatever [tinycolor2](https://www.npmjs.com/package/tinycolor2) accepts as an input.

```html
<!-- suppose you have the data 'colors' in your component -->
<photoshop-picker v-model="colors" />
```

OR

```html
<photoshop-picker :value="colors" @input="updateValue"></photoshop-picker>
```

## License

vue-color is licensed under [The MIT License](LICENSE).
