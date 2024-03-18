import App from './App'
import { render } from 'preact'
import './index.scss'
import { StoreProvider } from '@/context'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import { QueryClientProvider } from 'react-query'
import queryClient from '@/query/queryClient'

const appDomElement = document.getElementById('screen-calculator')

if (!appDomElement) throw new Error('container with id "screen-calculator" not found')

render(
  <StoreProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StoreProvider>,
  appDomElement
)
