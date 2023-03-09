import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/products'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {isAdmin} = this.props
    const product = this.props.product
    return (
      <>
        <h1 className="pageheader">{product.title}</h1>

        <div className="singleproduct-wrapper-container">
          <div className="singleproduct-wrapper-item">
            <div className="singleproduct-images-container">
              <img src={product.photoUrl} />
            </div>
          </div>
          <div className="singleproduct-wrapper-item">
            <div className="singleproduct-price-qty-button-container">
              <p>Price: ${product.price}</p>
              <p>{product.inventoryQty > 0 ? `In stock: ${product.inventoryQty}` : 'Out of Stock' }</p>
              <p>
                {product.inventoryQty > 0 && <button onClick={() => this.props.addToCart(product)}>Add to Cart</button>}
              </p>
            </div>
          </div>
          {isAdmin && (
            <Link to={`/products/${product.id}/update`}>
              <button type="button">Update product</button>
            </Link>
          )}
          <div className="singleproduct-wrapper-item">
            <p>Description: {product.description}</p>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
    isAdmin: state.auth.isAdmin,
    cart: state.cart,
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
    addToCart: (product) => {
      dispatch(addToCart(product))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
