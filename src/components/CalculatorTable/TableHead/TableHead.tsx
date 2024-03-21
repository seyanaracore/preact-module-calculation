import cls from '../styles.module.scss'

const TableHead = () => {
  return (
    <thead>
      <tr
        className={cls.tableTitle}
        role="row"
      >
        <th>Технические характеристики</th>
        <th />
        <th />
        <th />
        <th />
      </tr>
    </thead>
  )
}

export default TableHead
