import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent{
    static classname = 'excel__header'
    toHTML() {
        return `
            <input type="text" value="Новая таблица" class="excel__input"/>

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
}