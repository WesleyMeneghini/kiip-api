const mongoose = require('mongoose');
const Scheduling = mongoose.model('Scheduling');

exports.get = async () => {
    var res = await Scheduling.find();
    return res;
}


exports.created = async (data) => {
    var scheduling = new Scheduling(data)
    let res = await scheduling.save();
    return res;
}

exports.update = async (id, data) => {
    let res = await Scheduling.findByIdAndUpdate(id, {
        $set: data,
    }, {
        new: true
    });
    return res;
}

exports.delete = async (id) => {
    let res = await Scheduling.findByIdAndDelete(id);
    return res;
}
