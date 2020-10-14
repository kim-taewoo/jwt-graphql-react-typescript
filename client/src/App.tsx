import React from 'react'
import { useHelloQuery } from './generated/graphql'

const App:React.FC = () => {
  const {data, loading} = useHelloQuery()

  if (loading || !data) {
    return <div>로딩중...</div>
  }
  return (
    <div>
      {data.hello}
    </div>
  )
}

export default App
