var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

var FluxCart = React.createClass({
    closeCart: function () {
        FluxCartActions.updateCartVisible(false);
    },
    openCart: function () {
        FluxCartActions.updateCartVisible(true);
    },
    removeFrontCart: function (sku) {
        FluxCartActions.removeFromCart(sku);
        this.closeCart();
    },
    render: function () {
        var self = this;
        var products = this.props.products;

        return (
            <div className={"flux-cart " + this.props.visible ? 'active' : ''}>
                <div className="mini-cart">
                    <button type="button" className="close-cart" onClick={this.closeCart>x</button>
                    <ul>
                        {Object.keys(product).map(function (product) {
                            return (
                                <li key={product}>
                                    <h1 className="name">{products[product].name}</h1>
                                    <p className="type">{products[product].type} x {products[product].quantity}</p>
                                    <p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={self.removeFromCart.bind(self, product)}>Remov</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button
                    type="button"
                    className="view-cart"
                    onClick={this.openCart}
                    disabled={Object.keys(this.props.products).length > 0 ? '' : 'disabled'}>
                    View Cart ({this.props.count})
                </button>
            </div>
        );
    }
});

module.exports = FluxCart;