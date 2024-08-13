import React from 'react'
import { Text } from 'react-native'

const ErrorMessage = ({ name, errors, mt, mb }: { name: string, errors: any, mt?: number, mb?: number }) => {
  return (
    <>
      {
        errors?.[name] ?
        <Text selectable style={{ color: "red", marginTop: mt ? mt : 0, marginBottom: mb ? mb : 0, fontSize: 14, bottom: 2, left: 2 }}>{errors?.[name]?.message}</Text>
        :
        <> 
        <Text></Text>
        </>
      }
    </>
  )
}

export default ErrorMessage