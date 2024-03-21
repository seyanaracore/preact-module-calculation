const ProductCharacteristicItem = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <tr>
      <td>{label}</td>
      <td />
      <td />
      <td />
      <td>{value}</td>
    </tr>
  )
}

export default ProductCharacteristicItem
