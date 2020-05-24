const express = require('express');
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
        console.log(data)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'Falha ao cadastrar um serviço',
            error: error
        })
    }
}

exports.put = async (req, res, next) =>{
    try {
        const data = await serviceRepository.update(req.body._id, req.body);
        console.log(data)
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


