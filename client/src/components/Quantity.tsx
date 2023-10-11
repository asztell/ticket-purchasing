import { useCallback } from 'react'
import { useQueryParams, getQueryParams } from '../hooks/useQueryParams'
import './Quantity.scss'

export function Quantity(): JSX.Element {
  const [queryParams, setQueryParams] = useQueryParams()
  const params = getQueryParams(queryParams)
  const { ticketsCount } = params
  // const ticketsCount = params.ticketsCount

  const handleDecrement = useCallback(() => {
    if (ticketsCount === '' && parseInt(ticketsCount) > 0) {
      const newTicketsCount = parseInt(ticketsCount) - 1
      setQueryParams(
        (searchParams: URLSearchParams) => {
          searchParams.set('ticketsCount', newTicketsCount.toString())
          return searchParams
        },
        { replace: true }
      )
    }
  }, [ticketsCount, setQueryParams])

  const handleIncrement = useCallback(() => {
    const newTicketsCount =
      typeof ticketsCount === 'string' ? parseInt(ticketsCount) + 1 : 1
    setQueryParams(
      (searchParams: URLSearchParams) => {
        searchParams.set('ticketsCount', newTicketsCount.toString())
        return searchParams
      },
      { replace: true }
    )
  }, [ticketsCount, setQueryParams])

  return (
    <div className='Quantity'>
      <h2>Quantity</h2>
      <div className='Container'>
        <button onClick={handleDecrement}>-</button>
        <span className='Value'>{ticketsCount}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  )
}
