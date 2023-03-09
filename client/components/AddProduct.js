import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/products'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: 0,
      inventoryQty: 0,
      photoUrl: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.validateFormData()) {
      this.props.addProduct({...this.state})
    } else {
      alert('Please enter title, description, price, and quantity!')
    }
  }

  validateFormData() {
    const title = this.state.title
    const description = this.state.description
    const price = this.state.price
    const inventoryQty = this.state.inventoryQty

    if (!title) return false
    if (!description) return false
    if (!price) return false
    if (!inventoryQty) return false

    return true
  }

  render() {
    return (
      <div className="new-product-form-container">
        <h2 className="pageheader">Add a new product:</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Photo Url:
            <input
              name="photoUrl"
              type="text"
              value={this.state.photoUrl}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Price:
            <input
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              name="inventoryQty"
              type="number"
              value={this.state.inventoryQty}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (newProduct) => dispatch(addProduct(newProduct)),
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
