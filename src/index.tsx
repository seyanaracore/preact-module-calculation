import App from './App'
import { render } from 'preact'
import './index.scss'
import { StoreProvider } from '@/context'

const appDomElement = document.getElementById('app')

if (!appDomElement) throw new Error('Target dom element for module form not found')

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  appDomElement
)
