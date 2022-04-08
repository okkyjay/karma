const { query } = require("express")
const { Account, PhoneNumber } = require("../../models/index")

const findOneAccount = async (query) => {
    const account = await Account.findOne({where:query})
    return account
}

const findOnePhoneNumber = async (query) => {
    const phone_number = await PhoneNumber.findOne({where:query})
    return phone_number
}

module.exports = {
    findOneAccount,
    findOnePhoneNumber
  }