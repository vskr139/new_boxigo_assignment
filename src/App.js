import {Component} from 'react'

import Navbar from './components/Navbar'

import MyMovesItem from './components/MyMovesItem'

import './App.css'

class App extends Component {
  state = {customerDetailsData: [], activeId: '', itemChecked: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('http://test.api.boxigo.in/sample-data/')
    const jsonData = await response.json()
    this.setState({customerDetailsData: jsonData.Customer_Estimate_Flow})
  }

  changeActiveId = estimateId => {
    this.setState({activeId: estimateId})
    this.setState(prevState => ({itemChecked: !prevState.itemChecked}))
  }

  getUpdatedCustomerDetailsData = customerDetailsData => {
    const customerDetailsList = customerDetailsData.map(each => ({
      movingFrom: each.moving_from,
      movingTo: each.moving_to,
      estimateId: each.estimate_id,
      propertySize: each.property_size,
      totalItems: each.total_items,
      distance: each.distance,
      movingOn: each.moving_on,
      customStatus: each.custom_status,
      newHouseAdditionalInfo: each.new_house_additional_info,
      oldHouseAdditionalInfo: each.old_house_additional_info,
      newFloorNo: each.new_floor_no,
      oldFloorNo: each.old_floor_no,
      newElevatorAvailability: each.new_elevator_availability,
      oldElevatorAvailability: each.old_elevator_availability,
      newParkingDistance: each.new_parking_distance,
      oldParkingDistance: each.old_parking_distance,
    }))
    return customerDetailsList
  }

  getInventoryItemsData = customerDetailsData => {
    const inventoryItemsList = customerDetailsData.map(
      each => each.items.inventory,
    )
    return inventoryItemsList
  }

  render() {
    const {customerDetailsData, activeId, itemChecked} = this.state
    const inventoryItemsData = this.getInventoryItemsData(customerDetailsData)
    console.log(inventoryItemsData)
    const updatedCustomerDetailsData = this.getUpdatedCustomerDetailsData(
      customerDetailsData,
    )
    return (
      <div className="app-container">
        <Navbar />
        <div className="my-moves-container">
          <h1 className="my-moves-heading">MY MOVES</h1>
          <ul className="my-moves-list-container">
            {updatedCustomerDetailsData.map(eachMovingItem => (
              <MyMovesItem
                movingItemDetails={eachMovingItem}
                key={eachMovingItem.estimateId}
                isActive={activeId === eachMovingItem.estimateId}
                changeActiveId={this.changeActiveId}
                inventoryItemsData={inventoryItemsData}
                itemChecked={itemChecked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
