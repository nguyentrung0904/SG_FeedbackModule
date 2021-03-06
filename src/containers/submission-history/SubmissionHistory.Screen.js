import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './SubmissionHistory.Style'

import { Button } from 'antd-mobile'
import { navigateToFormDetail, navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { loadFormHistory } from '../../api/index'
import Loader from '../../components/loader/Loader'

export default class SubmissionHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Feedback History'
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: true
    }

  }

  loadData = () => {
    loadFormHistory().then((data) => {
      console.log('SubmissionHistoryScreen data' + data)
      this.setState({
        data,
        loading: false
      })
    }).catch((error) => {
      this.setState({
        loading: false
      })
    })
  }

  componentDidMount () {
    this.loadData()
  }

  getIconFromFormTypeId = (formTypeId, hightlight) => {

    switch (formTypeId) {
      case '1':
        return hightlight ? require('../../assets/icons/ic_moving_blue.png') : require('../../assets/icons/ic_moving_grey.png')
      case '2':
        return hightlight ? require('../../assets/icons/ic_rental_blue.png') : require('../../assets/icons/ic_rental_grey.png')
      case '3':
        return hightlight ? require('../../assets/icons/ic_renovation_blue.png') : require('../../assets/icons/ic_renovation_grey.png')
      case '4':
        return hightlight ? require('../../assets/icons/ic_car_blue.png') : require('../../assets/icons/ic_car_grey.png')
      case '5':
        return hightlight ? require('../../assets/icons/ic_wallet_blue.png') : require('../../assets/icons/ic_wallet_grey.png')
    }
  }

  onItemPressed = (item) => {
    const {navigation} = this.props
    navigateToFormDetail(navigation, {
      id: item.id,
      // title: item.subc
    })
  }

  renderItem = (item) => {

    const highlight = item.read === false
    const textStyle = highlight ? null : styles.detailTextStyle1

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onItemPressed(item)}>
        <Image style={{width: 40, height: 40}} source={{uri: item.icon}}/>
        <View style={styles.detailContainer}>
          <Text style={textStyle}>
            {item.condo} {item.building} {item.unit}
          </Text>
          <Text style={textStyle}>
            Status: {item.status}
          </Text>
        </View>
        <View style={styles.itemRightContainer}>
          <Text style={textStyle}>
            {item.date}
          </Text>
          {/*{item.new_message ? <View style={styles.newMsgContainer}>*/}
              {/*<Text style={styles.newMsgText}>New Message</Text>*/}
            {/*</View>*/}
            {/*: null}*/}
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator}></View>
    )
  }

  render () {
    const {loading, data} = this.state

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={'Loading'}/>
        <FlatList data={data}
                  renderItem={(item) => this.renderItem(item.item)}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={this.renderSeparator}/>
      </View>
    )
  }
}