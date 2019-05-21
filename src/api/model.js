'use strict';

const { Schema, model } = require('mongoose');

const DeviceSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  version: {
    type: Date,
    required: true
  },
  deviceId: {
    unique: true,
    required: true,
    type: [String]
  }
}, {
  timestamps: true,
  strict: false
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  deviceIds: {
    type: [DeviceSchema],
    required: true
  }
}, {
  timestamps: true,
  strict: false
});

module.exports =  {
  User: model('users', UserSchema),
  Device: model('devices', DeviceSchema)
};