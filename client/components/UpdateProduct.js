import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {updateProduct} from '../store/products'

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.product.title || '',
      description: this.props.product.description || '',
      price: this.props.product.price || 0,
      inventoryQty: this.props.product.inventoryQty || 0,
      photoUrl: this.props.product.photoUrl || '',
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

    // TODO: Check if values entered differ from values in database
    // TODO: create updateProduct store file & routes

    this.props.updateProduct({...this.state}, this.props.match.params.id)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  componentDidUpdate(previousProps) {
    if (previousProps.product.id !== this.props.product.id) {
      this.setState({
        title: this.props.product.title,
        description: this.props.product.description,
        price: this.props.product.price,
        inventoryQty: this.props.product.inventoryQty,
        photoUrl: this.props.product.photoUrl,
      })
    }
  }

  render() {
    const {isAdmin} = this.props
    const product = this.props.product
    return (
      <div className="update-single-product">
        <h3 className="pageheader">Update Product</h3>

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
              type="textarea"
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

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id))
    },
    loadInitialData() {
      dispatch(me())
    },
    updateProduct: (productToUpdate, id) =>
      dispatch(updateProduct(productToUpdate, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
