const schedulingRepository = require('../repositories/scheduling-repository')

exports.get = async (req, res, next) => {
    let result = await schedulingRepository.get();
    res.status(200).json(result)
}

exports.post = async (req, res, next) => {
    let { email, telefone, dateService } = req.body;

    try {
        let result = await schedulingRepository.created(req.body);
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.put = async (req, res, next) => {
    let { id, status } = req.body;
    delete req.body.id
    // console.log(req.body);
    try {
        let result = await schedulingRepository.update(id, req.body);
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