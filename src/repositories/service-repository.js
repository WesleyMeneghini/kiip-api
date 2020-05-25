const mongoose = require('mongoose');
const Service = mongoose.model('Service');

exports.get = async () => {
    
    const res = await Service.find();
    return res;
}
exports.getById = async (id) => {
    
    const res = await Service.findById(id);
    return res;
}

exports.created = async (data) => {
    var service = new Service(data);
    const res = await service.save(data);
    return res;
}

exports.update = async (id, data) => {
    if(data._id) delete data._id;
    console.log(data)
    var res = await Service.findByIdAndUpdate(id, {
        $set: data
    },{
        new: true 
    });
    return res;
}

exports.delete = async (id) => {
    var res = await Service.findByIdAndDelete(id);
    // console.log(res)
    return res;
}