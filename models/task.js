const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(process.env.DB);
autoIncrement.initialize(connection);

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

taskSchema.plugin(autoIncrement.plugin, 'Task');
    
module.exports = mongoose.model('Task', taskSchema);