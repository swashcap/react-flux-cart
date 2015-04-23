var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('lodash');

var _products = {};
var _cartVisible = false;

function add(sku, update) {
    update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
    _products[sku] = _.extend({}, _products[sku], update);
}

function setCartVisible(cartVisible) {
    _cartVisible = cartVisible;
}

function removeItem(sku) {
    delete _products[sku];
}

var CartStore = _.extend({}, EventEmitter.prototype, {
    // Return cart items
    getCartItems: function () {
        return _products;
    },

    // Return # of items in cart
    getCartCount: function () {
        return Object.keys(_products).length;
    },

    // Return cart cost total
    getCartTotal: function () {
        var total = 0;

        for (product in _products) {
            if (_products.hasOwnProperty(product)) {
                total += _products[product].price * _products[product].quantity;
            }
        }

        return total.toFixed(2);
    },

    // Return cart visibility state
    getCartVisible: function () {
        return _cartVisible;
    },

    // Emit change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (cb) {
        this.on('change', cb);
    },

    // Remove change listener
    removeChangeListener: function (cb) {
        this.removeListener('change', cb);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
        case FluxCartConstants.CART_ADD:
            add(action.sku, action.update);
            break;
        case FluxCartConstants.CART_VISIBLE:
            setCartVisible(action.cartVisible);
            break;
        case FluxCartConstants.CART_ADD:
            removeItem(action.sku);
            break;
        default:
            return true;
    }

    CartStore.emitChange();

    return true;
});



module.exports = CartStore;