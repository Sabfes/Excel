import {ExcelComponent} from "@core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@core/dom";
import {debounce} from "@core/utils";
import {ActiveRoute} from "@core/router/ActiveRoute";

export class Header extends ExcelComponent{
    static classname = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input','click'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input type="text" value="${title}" class="excel__input"/>

            <div>
                <div class="excel__button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>

                <div class="excel__button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
            </div> 
        `
    }
    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы хотите удалить таблицу?')
            console.log('excel:' + ActiveRoute.param)
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}