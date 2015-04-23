var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('lodash');

var _product = {};
var _selected = null;

function loadProductData(data) {
    _product = data[0];
    _selected = data[0].variants[0];
}

function setSelected(index) {
    _selected = _product.variants[index];
}

var ProductStore = _.extend({}, EventEmitter.prototype, {
    // Return product data
    getProduct: function () {
        return _product;
    },

    // Return selected product
    getSelected: function () {
        return _selected;
    },

    // Emit change event
    emitChange: function () {
        this.emit('change')
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
        case FluxCartConstants.RECEIVE_DATA:
            loadProductData(action.data);
            break;
        case FluxCartConstants.SELECT_PRODUCT:
            setSelected(action.data);
            break;
        default:
            return true;
    }

    ProductStore.emitChange();

    return true;
});

module.exports = ProductStore;