import {Component} from "react"

import InventoryItem from "../InventoryItem"

import "./index.css"

class InventoryItemList extends Component {
    state = {inventoryItemId: '', isChecked: false}

    checkingInventoryItem = id => {
      this.setState({inventoryItemId: id})
      this.setState(prevState => ({isChecked: !prevState.isChecked}))
    }

    render (){
        const {inventoryItemId, isChecked} = this.state
        const {eachInventoryItemDetails} = this.props
        console.log(eachInventoryItemDetails)
        return (
            <ul className="inventory-item-details-list-container">
            {eachInventoryItemDetails.map(each => (
                <InventoryItem
                  inventoryItemDetails={each}
                  key={each.id}
                  checkingInventoryItem={this.checkingInventoryItem}
                  isInventoryItemChecked={inventoryItemId === each.id}
                  isChecked={isChecked}
                />

            ))}
            </ul>
        )
    }
}
export default InventoryItemList