import { excelExportCalcTitle } from '@/consts'

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

const CART_ROW_START = 7

export const realExcelExportButton = {
  extend: 'excelHtml5',
  exportOptions: {
    stripHtml: false,
    format: {
      body(_data: string | number, row: number, column: number, node: Element) {
        let data = _data.toString()
        const isPrice = data.includes('₽')
        const isResultRow = row > 16
        const isUnit = column === 1 && row > CART_ROW_START

        if (column === 4 && row < CART_ROW_START) {
          data = `\0${data}`
        }

        if (isUnit && data) {
          data = node.textContent!
        }

        if (['Цена', 'Сумма'].includes(data)) {
          data = `${data}, руб.`
        }

        if (isPrice && !isResultRow) {
          data = parseInt(data.replace(/&nbsp;/g, ''), 10).toString()
        }

        if (isPrice && isResultRow) {
          data = data.replace(/&nbsp;/g, '')
        }

        if (data && column === 2 && row > CART_ROW_START + 1) {
          data = parseInt(data.toString(), 10).toString()
        }

        const children = node.children?.[0] as undefined | HTMLLinkElement

        if (children && children.tagName === 'A') {
          data = children.textContent!
        }

        return data
      },
    },
  },
  customize(xlsx: any) {
    const sheet = xlsx.xl.worksheets['sheet1.xml']
    const mergeCells = window.$('mergeCells', sheet)

    // Номер строки зависит от кол-ва значений в характеристике продукта
    mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', { attr: { ref: 'A10:E10' } }))
    mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', { attr: { ref: 'A2:E2' } }))

    window.$('c[r=A1] t', sheet).text(excelExportCalcTitle)

    window.$('row:contains("Технические характеристики") c', sheet).attr('s', '11')
    window.$('row:contains("Расчет стоимости комплектующих") c', sheet).attr('s', '11')

    window.$('row:contains("Комплектующие") c', sheet).attr('s', '2')
    window.$('row:contains("Характеристика") c', sheet).attr('s', '2')
  },
}
