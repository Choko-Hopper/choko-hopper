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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    },
    get() {
      let price = this.getDataValue("price")
      price = "$" + price
      return /\.\d\d/g.test(price) ? price : price + ".00"
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    get(){
      if(this.getDataValue("quantity") === 0){
        return "Out of Stock"
      }
    }
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
