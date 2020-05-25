const multer = require('multer');
const fs = require('fs');

const serviceRepository = require('../repositories/service-repository');

exports.get = async (req, res, next) =>{
    try {
        const data = await serviceRepository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao listar os serviços',
            error: error
        })
    }
}

exports.post = async (req, res, next) =>{
    try {
        const data = await serviceRepository.created(req.body);
        // console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'Falha ao cadastrar um serviço',
            error: error
        })
    }
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        // file.fieldname + "-" + 
        Date.now() +
        "-" +
        file.originalname.split(".")[0].trim().replace(/ /g , "-") +
        "." +
        file.originalname.split(".").pop()
      );
    }
});

fileFilter = (req, file, cb) => {
    const ext = file.mimetype.split("/").pop();
    if (!["jpeg", "png"].includes(ext)) {
        req.erro = "Tipo de arquivo inválido";
        cb(null, false);
    } else cb(null, true);
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single("uploads");

exports.uploadImage = async (req, res, next) => {
     upload(req, res, erro => {

        // console.log(req.file);
        if (req.erro) return res.status(400).send({ erro: req.erro });

        const service = {};
        service.id = req.params.id;
        service.image = req.file.filename;
        
        try {
            serviceRepository.getById(service.id).then(data => {
                // console.log(data)
                const serviceImage = data.image
                serviceRepository.update(service.id, service).then(e => {
                    // console.log(e)
                    if(serviceImage != ''){
                        fs.unlinkSync('./uploads/' + serviceImage)
                    }
                    res.json({ 
                        image: e.image 
                    })

                })
            }).catch(e => {
                // console.log(e)
                fs.unlinkSync('./uploads/' + service.image)
                res.status(400).json({
                    message: 'ID inválido'
                })
            })
            
        } catch (error) {
        console.log(error)
            fs.unlinkSync('./uploads/' + service.image)
            return res.status(404).send({ erro: "Serviço não encontrado" });
        }
        
    });
}

exports.put = async (req, res, next) =>{
    try {
        // console.log(req.body)
        const data = await serviceRepository.update(req.body.id, req.body);
        // console.log(data)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: `Falha ao atualizar o serviço!`,
            error: error
        })
    }
}

exports.delete = async (req, res, next) =>{
    try {
        const data = await serviceRepository.delete(req.body._id);
        res.status(200).send({
            message: `Serviço deletado deletado com sucesso!`
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: `Falha ao deletar o serviço!`,
            error: error
        })
    }
}


