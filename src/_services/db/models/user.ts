// Core
import * as dynamogoose from 'dynamoose';

// Schemas
const userSchema = new dynamogoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  userpic: {
    type: String,
    default: '',
  },

  lists: {
    type: Array,
    default: [],
  },

  favorites: {
    type: Object,
    default: {},
  },

  registrationDate: Date,
  lastVisit: Date,
  averageSessionDuration: {
    type: Number,
    default: 0,
  },

  isAdmin: {
    type: Boolean,
    required: true,
  },

  isWorker: {
    type: Boolean,
    required: true,
  },

  addresses: {
    type: Array,
    default: [],
  },

  bonuses: {
    type: Number,
    default: 0,
  },

  cards: {
    type: Array,
    default: [],
  },

  orders: {
    type: Array,
    default: [],
  },

  referrals: {
    type: Array,
    default: [],
  },
});

export const UserModel = dynamogoose.model('Users', userSchema);
