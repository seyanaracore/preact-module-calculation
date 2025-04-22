import { isProdService, EXCEL_EXPORT_CALC_TITLE } from '../../consts'
import { CART_TABLE_HEADER } from './CartTable/consts'

export const excelImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAlFJREFUSEu1lVtIVFEUhr89nnFMzbLISEPMIhLTrl4mEkIkQicmHYgEmSIHizI0kLLM0lJHJaJ6qAdN86EgpaBInyxfKumt7CFCEwQpyPIyeXeaHXMgwziN4+28bfZa3/r3f87+j2CJHjEXbkT+vpU6gyK7q1qHZuvTBIfmHPTHb2S7RFqEEGnARkBxw3RSpvXebmvxChyWn1wkJelANODnsWlg/BnDEz2uQL1mmdCJ7q/322+qikPzkuVsCv7sn0s4QmxIJHFGo2bL/tJjtFc3iTmDk1ZtYa1hBWGbIshNtVL3oonRiTF1iHudUmKdHeyj05GZkMrDty24XC61OWgYlClQggN4bW/EbD/B958DCASvKh5pgx/kVLIzPIqoS2YVYrfkEbN+M6Zbp6ePfT4xU7Ui3rhH0wpNxYqPwseypxy9V8Sbrnd02puJu5bJ4KjjL6RvBMaduJbr+Xy3jcRCC31D/Qgh6Lrz8v9WlJhPYdmVgr25luNJGaRct81QVhB/mJg1G9idaMRX0TPpnJred689euxWKqVkb6WVb47+GeBIEUwgBoLWrab+TDVn68oYHHGoiutyqzyDP1x9gp/ewNbidCack4sDzjKauJBqo737Pb4+eqy1FxduhU4IPlU8J6umkI7eTjpKHxNdfGiGj8zn5TXYytkRHkXs5QxVZWtBDT0/vpBdf2Vhn1vQsgBA4BgbVkFhwSE0ZJdz4MZJnK5f878g3uTFolxprUFzCqEli81/lbmDXviPbpNSWgDTvIPeG2/dNQv+NXk7yFPdb542MiYJ0VqmAAAAAElFTkSuQmCC'

function _createNode(doc: any, nodeName: any, opts: any) {
  let tempNode = doc.createElement(nodeName)

  if (opts) {
    if (opts.attr) {
      window.$(tempNode).attr(opts.attr)
    }

    if (opts.children) {
      window.$.each(opts.children, (key: any, value: any) => {
        tempNode.appendChild(value)
      })
    }

    if (opts.text !== null && opts.text !== undefined) {
      tempNode.appendChild(doc.createTextNode(opts.text))
    }
  }

  return tempNode
}

const table = {
  data: [] as string[][],
  cartTableRowStart: null as number | null,
  cartTableRowEnd: null as number | null,
  get cartTableHeadersRow() {
    if (this.cartTableRowStart) return this.cartTableRowStart + 1

    return null
  },
}

function toStringCellData(cellData: string): string {
  return `\0${cellData}`
}

function priceToNumberCellData(cellData: string): string {
  return parseInt(cellData.replace(/ /g, ''), 10).toString()
}

export const realExcelExportButton = {
  extend: 'excelHtml5',
  exportOptions: {
    stripHtml: false,
    format: {
      body(_data: string | number, row: number, column: number, node: Element) {
        if (table.data.length - 1 < row) {
          table.data.push([])
        }

        table.data[row].push(_data.toString())

        let data = node?.textContent || _data.toString()
        const firstColData = table.data[row]?.[0]
        const isFirstCol = column === 0

        const isCartTable = (() => {
          if (table.cartTableRowStart === null) return false

          if (table.cartTableRowEnd === null) {
            return row >= table.cartTableRowStart
          }

          if (row >= table.cartTableRowStart && row < table.cartTableRowEnd) {
            return true
          }
        })()

        const isCartPriceCol = isCartTable && column === 3
        const isCartSumCol = isCartTable && column === 4

        if (data === CART_TABLE_HEADER) {
          table.cartTableRowStart = row
        }

        if (table.cartTableRowStart && row >= table.cartTableRowStart && isFirstCol && !data) {
          table.cartTableRowEnd = row
        }

        // Значения для этих строк надо преобразовать из числа в строку, иначе будет отображено как число и значения будут справа, а на остальных строках рядом они слева
        if (
          firstColData === 'Количество пикселей, всего:' ||
          firstColData === 'Потребляемая мощность, вт:'
        ) {
          data = toStringCellData(data)
        }

        // Заголовки для таблицы корзины, добавляем приписку руб для названия колонки
        if ((isCartPriceCol || isCartSumCol) && row === table.cartTableHeadersRow) {
          data = `${data}, руб.`
        }

        if (
          (isCartPriceCol || isCartSumCol) &&
          table.cartTableHeadersRow !== null &&
          row > table.cartTableHeadersRow
        ) {
          data = priceToNumberCellData(data)
        }

        return data
      },
    },
  },
  customize(xlsx: any) {
    const sheet = xlsx.xl.worksheets['sheet1.xml']
    const mergeCells = window.$('mergeCells', sheet)

    mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', { attr: { ref: 'A2:E2' } }))

    window.$('c[r=A1] t', sheet).text(EXCEL_EXPORT_CALC_TITLE)

    // Жирный шрифт
    window.$('row:contains("Характеристика") c', sheet).attr('s', '2')
    // красный цвет
    window.$('row:contains("Технические характеристики") c', sheet).attr('s', '11')

    if (!isProdService) {
      // Номер строки зависит от кол-ва значений в характеристике продукта
      mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', { attr: { ref: 'A10:E10' } }))

      // красный цвет
      window.$('row:contains("Расчет стоимости комплектующих") c', sheet).attr('s', '11')
      // Жирный шрифт
      window.$('row:contains("Комплектующие") c', sheet).attr('s', '2')
    } else {
      // Категория модуля. Жирный шрифт
      window.$('c[r=A3]', sheet).attr('s', '2')
      // Название модуля. Жирный шрифт
      window.$('c[r=A4]', sheet).attr('s', '2')
    }
  },
}
