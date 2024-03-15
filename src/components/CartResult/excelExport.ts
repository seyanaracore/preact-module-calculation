import cls from './styles.module.scss'
import { Table } from '@/types'
import initTable from '@/helpers/initTable'
import DataTable from 'datatables.net-dt'
import { dataTableBaseConfig } from '@/consts'

const exportExportButtonText =
  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAlFJREFUSEu1lVtIVFEUhr89nnFMzbLISEPMIhLTrl4mEkIkQicmHYgEmSIHizI0kLLM0lJHJaJ6qAdN86EgpaBInyxfKumt7CFCEwQpyPIyeXeaHXMgwziN4+28bfZa3/r3f87+j2CJHjEXbkT+vpU6gyK7q1qHZuvTBIfmHPTHb2S7RFqEEGnARkBxw3RSpvXebmvxChyWn1wkJelANODnsWlg/BnDEz2uQL1mmdCJ7q/322+qikPzkuVsCv7sn0s4QmxIJHFGo2bL/tJjtFc3iTmDk1ZtYa1hBWGbIshNtVL3oonRiTF1iHudUmKdHeyj05GZkMrDty24XC61OWgYlClQggN4bW/EbD/B958DCASvKh5pgx/kVLIzPIqoS2YVYrfkEbN+M6Zbp6ePfT4xU7Ui3rhH0wpNxYqPwseypxy9V8Sbrnd02puJu5bJ4KjjL6RvBMaduJbr+Xy3jcRCC31D/Qgh6Lrz8v9WlJhPYdmVgr25luNJGaRct81QVhB/mJg1G9idaMRX0TPpnJred689euxWKqVkb6WVb47+GeBIEUwgBoLWrab+TDVn68oYHHGoiutyqzyDP1x9gp/ewNbidCack4sDzjKauJBqo737Pb4+eqy1FxduhU4IPlU8J6umkI7eTjpKHxNdfGiGj8zn5TXYytkRHkXs5QxVZWtBDT0/vpBdf2Vhn1vQsgBA4BgbVkFhwSE0ZJdz4MZJnK5f878g3uTFolxprUFzCqEli81/lbmDXviPbpNSWgDTvIPeG2/dNQv+NXk7yFPdb542MiYJ0VqmAAAAAElFTkSuQmCC" alt="excel icon"/>Excel'

const exportExcelButtonIndex = 0

const _excelExportButton = {
  text: exportExportButtonText,
  extend: 'excelHtml5',
  className: [cls.excelExportBtn].join(' '),
  exportOptions: {
    stripHtml: false,
    format: {
      body(_data: string | number, row: number, column: number, node: Element) {
        let data = _data

        if (column === 2 || column === 3) {
          data = data.toString().replace(/&nbsp;/g, '')
        }

        const children = node.children?.[0] as undefined | HTMLLinkElement

        // if (children && children.tagName === 'A') {
        //   data = `=ГИПЕРССЫЛКА("${children.href}"; "${children.textContent}")`
        // }
        if (children && children.tagName === 'A') {
          data = JSON.stringify({ link: children.href, text: children.textContent })
        }

        return data
      },
    },
  },
  customize(xlsx: any) {
    const sheet = xlsx.xl.worksheets['sheet1.xml']
    const mergeCells = window.$('mergeCells', sheet)

    window.$('c[r=A1] t', sheet).text('LED EXPRESS. Калькулятор комплектующих')

    // mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', { attr: { ref: 'C3:C20' } }))

    // mergeCells.attr('count', mergeCells.attr('count')! + 1)

    window.$('row:contains("Комплектующие") c', sheet).attr('s', '11')

    window.$('row c', sheet).each(function (this: Element) {
      const item = window.$('is t', this)
      const itemText = item.text()
      const isLink = itemText.match(/\{"link":".*","text":".*"}/)
      const isPrice = itemText.includes('₽')

      // if (isPrice) {
      //   item.text(parseInt(itemText, 10))
      //   // (3.) underline
      //   item.attr('s', '65')
      //   window.$('is', this).attr('s', '65')
      // }

      if (isLink) {
        const { link, text } = JSON.parse(itemText) as { link: string; text: string }

        // (2.) change the type to `str` which is a formula
        window.$(this).attr('t', 'str')
        //append the formula
        window.$(this).append(`<f>` + `HYPERLINK("${link}","${text}")` + `</f>`)
        //remove the inlineStr
        window.$('is', this).remove()
        // (3.) underline
        window.$(this).attr('s', '4')
      }
    })

    function _createNode(doc: any, nodeName: any, opts: any) {
      console.log(doc, nodeName, opts)

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
  },
}

const loadExcelExportModule = async () => {
  const jszip = await import('jszip').then(({ default: m }) => m)

  //@ts-ignore
  await import('datatables.net-buttons/js/buttons.html5.mjs')

  window.$.fn.dataTable.Buttons.jszip(jszip)
}

export const excelExportButton = {
  text: exportExportButtonText,
  className: [cls.excelExportBtn].join(' '),
  async action(this: Table, _: any, dt: any) {
    await loadExcelExportModule()

    // eslint-disable-next-line no-proto
    const clonedDomTable = this.context[0].nTable.cloneNode(true) as HTMLTableElement

    const clonedInstanceTable = new DataTable(clonedDomTable, {
      ...dataTableBaseConfig,
      layout: {
        topStart: {
          // @ts-expect-error
          buttons: [_excelExportButton],
        },
      },
    })

    clonedInstanceTable.buttons()[0].node.click()
    clonedInstanceTable.destroy()
  },
}
