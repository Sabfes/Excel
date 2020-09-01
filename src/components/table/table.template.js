const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function (_, col) {
        return `
             <div class="cell" contenteditable="true" data-type="cell" data-id="${row}:${col}"  data-col="${col}"></div>
        `
    }
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, index) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize} 
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 25,) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols, ''))

    for (let i=0; i<rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            .map(toCell(i))
            .join('')

        rows.push(createRow( cell, i+1))
    }

    return rows.join('')
}

