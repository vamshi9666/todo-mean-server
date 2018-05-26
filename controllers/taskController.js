const Task = require('./../models/task');

exports.get_tasks = (req,res,next)=>{
	Task.find({})
	.select("_id name startDate endDate")
	.then(result=>{
		res.status(200).json({
			message:"fetched tasks from server !",
			count: result.length,
			data:result
		})
	})
	.catch(err=>{
		res.status(200).json({
			message:"error in get_task in controller !",
			error:err
		})
	})
}
exports.get_task = (req,res,next)=>{
	const id = req.params.id;
	Task.find({_id: id})
	.then(result=>{
		if(result.length > 1){
			console.log("task not found for given id")
			res.status(300).json({
				message:"task not found for given id"
			})
		}
		else{
			res.status(200).json({
				message:"fetched tasj data from server",
				data:result

			})
		}
	})
	.catch(err=>{
		res.status(200).json({
			message:"error in fetching with given id !",
			error:err
		})
	})

}
exports.add_task = (req,res,next)=>{
	const task = new Task({
		name:req.body.name,
		startDate:req.body.startDate,
		endDate:req.body.endDate,
	})
	task.save()
	.then(result=>{
		res.status(200).json({
			message:"Task added successfully !",
			data:result
		})
	})
	.catch(err=>{
		console.log(err);
		res.status(300).json({
			message:"error in adding new task ! \n please try again !"
		})
	})
}
exports.update_task = (req,res,next)=>{
	const id = req.params.id;
	const updates = {
		name:req.body.name,
		startDate:req.body.startDate,
		endDate:req.body.endDate
	}
	Task.update({_id:id},{$set:updates})
	.exec()
	.then(result=>{
		res.status(200).json({
			message:"updated task successfully !",
			data:result
		})
	})
	.catch(err=>{
		res.status(300).json({
			message:"error in updating task !",
			error:err
		})
	})
}
exports.delete_task = (req, res, next) => {
    const _id = req.params._id;
    Task.remove({ _id: _id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'task deleted',
        });
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};