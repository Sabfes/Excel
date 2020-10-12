import {ExcelComponent} from "@core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {$} from "@core/dom";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent{
    static classname = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
                <div class="excel__button">
                    <i class="material-icons">delete</i>
                </div>

                <div class="excel__button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div> 
        `
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}