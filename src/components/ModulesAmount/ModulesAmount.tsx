import { ChangeEvent } from 'react'

type Props = {
  modulesAmount: number
  maxModulesAmount: number
  setModulesAmount: (module: number) => void
}

const ModulesAmount = ({ modulesAmount, setModulesAmount, maxModulesAmount }: Props) => {
  const onChangeModulesAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setModulesAmount(Number((e.target as HTMLInputElement).value))
  }

  return (
    <input
      type="number"
      value={modulesAmount}
      min={1}
      max={maxModulesAmount}
      onChange={onChangeModulesAmount}
    />
  )
}

export default ModulesAmount
