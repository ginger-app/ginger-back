// Core
import * as dynamogoose from 'dynamoose';

// Schemas
const subCategorySchema = new dynamogoose.Schema({
  name: {
    type: String,
    required: true,
  },

  id: {
    type: Number,
    required: true,
  },

  parent: {
    type: Number,
    required: true,
  },
});

const categorySchema = new dynamogoose.Schema({
  name: {
    type: String,
    required: true,
  },

  id: {
    type: Number,
    required: true,
  },

  subcategories: {
    type: Array,
  },
});

const marketItemSchema = new dynamogoose.Schema({
  sku: {
    type: Number,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
  },

  subcategories: {
    type: Array,
    required: true,
  },

  spec: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  manufacturer: {
    type: String,
    required: true,
  },

  measurementValue: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new dynamogoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
    // enum
    validate: value =>
      [
        'Awaiting payment',
        'Awaiting collection',
        'Awaiting shipment',
        'Shipping',
        'Completed',
      ].includes(value),
    required: true,
  },
  userCart: {
    type: Object,
    // map: {
    //   item: Number,
    //   amount: Number,
    // },
    required: true,
  },
  actualCart: {
    type: Object,
    // map: {
    //   item: Number,
    //   amount: Number,
    // },
    default: {},
  },
  address: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
});

export const MarketItemModel = dynamogoose.model(
  'Marketplace',
  marketItemSchema,
);
export const Subcategory = dynamogoose.model(
  'Subcategories',
  subCategorySchema,
);
export const Category = dynamogoose.model('Categories', categorySchema);
export const Order = dynamogoose.model('Orders', orderSchema);
