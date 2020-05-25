const schedulingRepository = require('../repositories/scheduling-repository')
const emailService = require('../services/email-service');


exports.get = async (req, res, next) => {
    let result = await schedulingRepository.get();
    res.status(200).json(result)
}

exports.getById = async (req, res, next) => {
    const id = req.body.id || req.params.id
    let result = await schedulingRepository.getById(id);
    console.log(result)
    res.status(200).json(result)
}

exports.post = async (req, res, next) => {
    let { email, telefone, dateService } = req.body;


    try {
        let retorno = await schedulingRepository.created(req.body);
        // console.log(retorno)
        let precoTotal = 0;
        let desconto = 0;

        for (let i = 0; i < retorno.typeService.length; i++) {
            retorno.typeService[i]
            desconto = (retorno.typeService[i].discount/100) * retorno.typeService[i].price;
            precoTotal += retorno.typeService[i].price - desconto
        }
        // console.log(precoTotal)
        const totalPrice = {
            id: retorno._id,
            totalPrice: precoTotal,
            chave: "teste"
        }
        // console.log(totalPrice)
        
        let teste = await this.put(totalPrice)

        emailService.send(
            teste.email,
            "Agendamento na KIIP limpeza automitiva!",
            global.EMAIL_TMPL.replace('{0}', teste.name)

        );
        emailService.send(
            "wesley.meneghiniwwm@gmail.com",
            "Novo agendamento " + teste.dateService,
            teste.toString()
        )

        res.status(201).json(teste)


    } catch (error) {
        res.status(400).json(error)
    }
}

exports.put = async (req, res, next) => {
    let body = "";
    let id = "";

    if(req.chave == "teste"){
        body = req;
        id = body.id
        delete body.id
    }else{
        let { id, status } = req.body;
        delete req.body.id
    }

    // console.log(req)
    // console.log(req.body);

    try {
        let result = await schedulingRepository.update(id, body);
        if(req.chave == "teste"){
            return result
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

exports.delete = async (req, res, next) => {
    let { id } = req.body;

    try {
        await schedulingRepository.delete(id);
        res.status(200).json({
            message: 'Agendamento deletado!'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'erro ao deletar o agendamento',
            error
        })
    }

}