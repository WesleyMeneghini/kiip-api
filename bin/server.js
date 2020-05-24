const app = require('../src/app');
const port = 3000;

// Rota raiz para mostrar que o servidor esta funcionando
app.get('/', (req, res, next) => {
    res.status(200).json({
        server: 'version 1.0.0'
    })
})

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});