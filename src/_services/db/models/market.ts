// Core
import * as dynamogoose from 'dynamoose';

// Schemas
const subCategorySchema = new dynamogoose.Schema({
  sku: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  parent: {
    type: Number,
    required: true,
  },

  items: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },
});

const categorySchema = new dynamogoose.Schema({
  sku: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  subcategories: {
    type: Array,
  },

  items: {
    type: Array,
  },
});

const marketItemSchema = new dynamogoose.Schema({
  sku: {
    type: String,
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

  searchName: {
    type: String,
    required: true,
  },

  nameUkr: {
    type: String,
    required: true,
  },

  nameRu: {
    type: String,
    required: true,
  },

  descriptionUkr: {
    type: String,
    required: true,
  },

  descriptionRu: {
    type: String,
    required: true,
  },

  manufacturer: {
    type: String,
    required: true,
  },

  unit: {
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
  id: {
    type: String,
    required: true,
  },
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
        'Pending',
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
  comment: {
    type: String,
  },
  deliveryComment: {
    type: String,
  },
  deliveryTime: {
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
