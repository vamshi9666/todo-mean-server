const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const taskSchema = mongoose.Schema({
	_id: {type:Number},
	name:{type:String,required:true},
	startDate:{
		type:Date,
		required:true
	},
	endDate:{
		type:Date
	}
})

taskSchema.plugin(AutoIncrement)
    
module.exports = mongoose.model('Task', taskSchema);