import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store/products'
import {addToCart} from '../store/cart'
import AddProduct from './AddProduct'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: this.props.products || [],
    }
    this.filterProducts = this.filterProducts.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.products !== this.props.products) {
      this.setState({
        products: this.props.products,
      })
    }
  }

  filterProducts(category) {
    if (category === 'all') {
      this.setState({
        products: this.props.products,
      })
    } else {
      this.setState({
        products: this.props.products.filter(
          (product) => product.category === category
        ),
      })
    }
  }
  render() {
    const {isAdmin} = this.props
    let products = this.state.products

    return (
      <>
        {/* <h1 className="pageheader">Shop our wares</h1> */}

        <div className=".allproducts-wrapper-container">
          <div className="allproducts-wrapper-item">
            <div className="allproducts-options-container">
              {/* TODO: Change this to be a link to a separate page for better UX */}

              <select
                onChange={(event) => this.filterProducts(event.target.value)}
              >
                <option value="all">All</option>
                <option value="potions">Potions</option>
                <option value="fashion">Fashion</option>
                <option value="weapons">Weapons</option>
                <option value="crystals">Crystals</option>
                <option value="books">Books</option>
              </select>
            </div>
          </div>
          <div className="allproducts-wrapper-item">
            <div className="allproducts-product-list-container">
              {products.map((product) => (
                <div key={product.id} className="allproducts-product-list-item">
                  <div className="allproducts-individual-product-container">
                    <Link to={`/products/${product.id}`}>
                      <h3>{product.title}</h3>
                    </Link>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.photoUrl} />
                    </Link>

                    <div className="allproducts-price-and-stock-container">
                      <span>Price: ${product.price}</span>
                      <span>{product.inventoryQty > 0 ? `In stock: ${product.inventoryQty}` : 'Out of Stock' }</span>
                    </div>
                    <div>
                    {product.inventoryQty > 0 && <button onClick={() => this.props.addToCart(product)}>Add {product.title} to Cart</button>}
                    </div>
                    {isAdmin && (
                      <Link to={`/products/${product.id}/update`}>
                        <button type="button">Update Product</button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {isAdmin && <AddProduct />}
            </div>
          </div>
          {/* TODO: Add pagination and buttons:
        <div className=".allproducts-wrapper-item">
          <h3>Previous page & next page buttons</h3>
        </div> */}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.allProducts,
    cart: state.cart,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(getProducts())
    },
    addToCart: (product) => {
      dispatch(addToCart(product))
    },
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
