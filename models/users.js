const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
   password: String,
   name_full: String,
   email: String,
   org_name: String,
   current_year_tax: Number,
   current_year_energy_cost: Number,
   roof_square_footage: Number,
   projected_energy_annual_kW: Number,
   match_program: Boolean,
   match_alerts: Boolean
})

module.exports = mongoose.model('Users', UserSchema)

