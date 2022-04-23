const Model = require('./model');
const mongoose = require('mongoose');

async function addAddress(address) {
  let myAddress;
  address.owner = mongoose.Types.ObjectId(address.owner);

  const exist = await Model.findOne({
    $and: [
      {
        owner: {
          $eq: address.owner,
        },
      },
      {
        postalCode: {
          $eq: address.postalCode,
        },
      },
      {
        streetAddress: {
          $eq: address.streetAddress,
        },
      },
    ],
  }).exec();
  console.log('address exist?', exist);
  if (exist === null) {
    myAddress = new Model(address);
    myAddress.save();
  } else {
    throw new Error('This address already exists');
  }

  return myAddress;
}

async function getAddress(owner) {
  let addresses;
  try {
    owner = mongoose.Types.ObjectId(owner);
    console.log('store getAddress', owner);
    addresses = await Model.find({ owner: owner }).exec();
  } catch (error) {
    console.error(error);
  }
  return addresses;
}

async function getAddressId(owner, addressId) {
  let address;
  try {
    owner = mongoose.Types.ObjectId(owner);
    addressId = mongoose.Types.ObjectId(addressId);

    address = await Model.find({
      $and: [
        {
          owner: {
            $eq: owner,
          },
        },
        {
          _id: {
            $eq: addressId,
          },
        },
      ],
    }).exec();
  } catch (error) {
    console.error(error);
  }
  return address;
}

async function dropAddress(owner, addressId) {
  owner = mongoose.Types.ObjectId(owner);
  addressId = mongoose.Types.ObjectId(addressId);
  return await Model.deleteOne({ owner: owner }).exec();
}

async function updateAddress(owner, address) {
  const initialValue = await getAddress(owner);
  return await Model.findByIdAndUpdate({ owner: owner }, { ...initialValue, ...address }).exec();
}
module.exports = {
  addAddress,
  getAddress,
  dropAddress,
  updateAddress,
  getAddressId,
};
