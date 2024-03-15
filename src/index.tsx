import App from './App'
import { render } from 'preact'
import './index.scss'
import { StoreContext, StoreProvider } from '@/context'
import useCartState from '@/hooks/useCartState'
import { ReactNode, useContext, useEffect, useMemo } from 'react'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

const appDomElements = document.querySelectorAll(
  '[data-screen-calculator]'
) as unknown as HTMLElement[]

if (!appDomElements.length)
  throw new Error('No one target dom element for screen calculator not found')

const initWindowCalcObject = () => {
  window.screenCalculator = {
    list: [],
    getCalculator(targetDomEl: HTMLElement) {
      return this.list.find((calcItem) => calcItem.el === targetDomEl)
    },
  }
}

const initAppInstance = (appDomElement: HTMLElement) => {
  const windowCartItem = {}

  const WindowWrapper = ({ children }: { children: ReactNode }) => {
    const { table, ...store } = useContext(StoreContext)
    const cartState = useCartState()

    const calcItem = useMemo(
      () => ({ store, cartState, el: appDomElement, table }),
      [store, cartState, table]
    )

    useEffect(() => {
      if (!('screenCalculator' in window)) initWindowCalcObject()

      window.screenCalculator.list.push(windowCartItem as never)
    }, [])

    useEffect(() => {
      Object.assign(windowCartItem, calcItem)
    }, [calcItem])

    return <>{children}</>
  }

  render(
    <StoreProvider>
      <WindowWrapper>
        <App />
      </WindowWrapper>
    </StoreProvider>,
    appDomElement
  )
}

appDomElements.forEach(initAppInstance)
