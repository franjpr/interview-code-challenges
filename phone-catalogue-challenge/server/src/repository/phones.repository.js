
const findAll = () => {
  try {
    let { phonesCollection } = require('../../data/phones');

    return phonesCollection;
  } catch (error) {
    console.log("findAll -> error", error);
  }
}

const findOneById = (id) => {
  try {
    let { phonesCollection } = require('../../data/phones');

    let phone = phonesCollection.find(item => item.id === id);

    return phone;
  } catch (error) {
    console.log("findAll -> error", error);
  }
}

module.exports = {
  findAll,
  findOneById,
}