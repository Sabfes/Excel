import {$} from "@core/dom";
import {Emiter} from "@core/Emiter";

export class Excel {
  constructor(selector, options) {
      this.$el = $(selector)
      this.components = options.components || []
      this.emitter = new Emiter()
  }

  getRoot() {
      const $root = $.create('div', 'excel')

      const componentOptions = {
          emitter: this.emitter
      }

      this.components = this.components.map( Component => {
          const $el = $.create('div', Component.classname)
          const component = new Component($el, componentOptions)

          $el.html(component.toHTML())
          $root.append($el)
          return component
      })
      return $root
  }
  render() {
      this.$el.append(this.getRoot())

      this.components.forEach(component => component.init())
  }
  destroy(){
      this.components.forEach( companent => companent.destroy())
  }
}

