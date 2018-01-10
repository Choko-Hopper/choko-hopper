const Sequelize = require("sequelize")
const db = require("../db")

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.thechocolatetherapist.com/wp-content/themes/blankspace-child/images/header-chocolate-shavings.jpg",
    validate: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    get() {
      let price = this.getDataValue("price")
      return price / 100
    }
  },
  isInStock: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  description: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  }
})

module.exports = Product
