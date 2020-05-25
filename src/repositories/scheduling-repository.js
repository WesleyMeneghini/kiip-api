const mongoose = require('mongoose');
const Scheduling = mongoose.model('Scheduling');

exports.get = async () => {
    let res = await Scheduling.find({}).populate('typeService', ['name', 'price', 'descount']);
    return res;
}

exports.getById = async (id) => {
    let res = await Scheduling.findById(id).populate('typeService', ['price', 'discount', 'name']);
    return res;
}


exports.created = async (data) => {
    var scheduling = new Scheduling(data)
    let retorno = await scheduling.save();
    let res = await this.getById(retorno._id);
    return res;
}

exports.update = async (id, data) => {
    let res = await Scheduling.findByIdAndUpdate(id, {
        $set: data,
    }, {
        new: true
    }).populate('typeService', ['price', 'discount', 'name']);
    return res;
}

exports.delete = async (id) => {
    let res = await Scheduling.findByIdAndDelete(id);
    return res;
}
