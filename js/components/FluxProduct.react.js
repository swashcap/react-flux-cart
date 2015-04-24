var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

var FluxProduct = React.createClass({
    addToCart: function (event) {
        var sku = this.props.selected.sku;
        var update = {
            name: this.props.product.name,
            type: this.props.selected.type,
            price: this.props.selected.price
        };
        FluxCartActions.addToCart(sku, update);
        FluxCartActions.updateCartVisible(true);
    },
    selectVariant: function (event) {
        FluxCartActions.selectProduct(event.target.value);
    },
    render: function () {
        var ats;

        if (this.props.selected.sku in this.props.cartitems) {
            ats = this.props.selected.inventory - this.props.cartitems[this.props.selected.sku].quantity
        } else {
            ats = this.props.selected.inventory;
        }

        return (
            <div className="flux-product">
                <img src={'img/' + this.props.product.image} />
                <div className="flux-product-detail">
                    <h1 className="name">{this.props.product.name}</h1>
                    <p className="description">{this.props.product.description}</p>
                    <p className="price">Price: ${this.props.selected.price}</p>
                    <select onChange={this.selectVariant}>
                        {this.props.product.variants.map(function (variant, index) {
                            return (
                                <option key={index} value={index}>{variant.type}</option>
                            );
                        })}
                    </select>
                    <button type="button" onClick={this.addToCart} disabled={ats > 0 ? '' : 'disabled'}>
                        {ats > 0 ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = FluxProduct;
