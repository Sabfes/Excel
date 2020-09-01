import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";
import {TableSelection} from "@/components/table/TableSelection";
import {range, matrix, nextSelector} from "@core/utils";

export class Table extends ExcelComponent{
    static classname = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    prepare() {
        this.selection = new TableSelection()
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', ()=> {
            this.selection.current.focus()
        })

    }
    toHTML() {
        return createTable()
    }
    onMousedown(event){
        // Логика ресайза
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const type = $resizer.data.resize
            const sideProp = type === 'col' ? 'bottom' : 'right'
            let value

            $resizer.css({opacity: 1, [sideProp]: '-2000px'})

            document.onmousemove = e => {
                if (type === 'col') {
                    const delta = e.pageX - coords.right
                    value = coords.width + delta
                    $resizer.css({right: -delta + 'px'})
                } else {
                    const delta = e.pageY - coords.bottom
                    value = coords.height + delta
                    $resizer.css({bottom: -delta + 'px'})
                }

            }
            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null

                if (type === 'col') {
                    $parent.css({width: value + 'px'})
                    this.$root.findAll(`[data-col="${$parent.data.col}"]`)
                        .forEach(el => el.style.width = value + 'px')
                } else {
                    $parent.css({height: value + 'px'})
                }

                $resizer.css({opacity: 0, bottom: 0, right: 0})
            }
        }
        // Логика ячеек
        else if ( event.target.dataset.type === 'cell') {
            const $target = $(event.target)

            if (event.shiftKey) {
                const cells =  matrix($target, this.selection.current).map( id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($target)
            }
        }
    }
    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}

