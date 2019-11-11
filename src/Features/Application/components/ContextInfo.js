import React from 'react'
import ReactJson from 'react-json-view'

export function ContextInfo(props) {
  const { context } = props

  return (
    <div>
      <h1>Context</h1>
      <ReactJson
        displayDataTypes={false}
        displayObjectSize={false}
        name="localUsers"
        src={context.localUsers}
      />
    </div>
  )
}
