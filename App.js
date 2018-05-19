import React, { Component } from 'react'
import Routes from './src/navigation/Routes'
import DetailRoutes from './src/navigation/DetailStack'
import CONFIG from './src/utils/Config'

export default class App extends Component<> {

  constructor (props) {
    super(props)
    CONFIG.rootTag = props.rootTag ? props.rootTag : '1'
    CONFIG.token = props.token != null ? props.token : 'Token 86d292e2b683d7264609ba0f1d558f4d62db1b8d'
    CONFIG.url = props.url != null ? props.url : 'http://13.250.247.107:8003/v1'
    CONFIG.id = props.id != null ? parseInt(props.id) : 0
  }

  render () {
    console.log('CONFIG: ' + JSON.stringify(CONFIG))
    if (CONFIG.id === 0) {
      return (
        <Routes/>
      )
    } else {
      return (
        <DetailRoutes/>
      )
    }

  }
}
