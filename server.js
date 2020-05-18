// Usei o express para criar e configurar o servidor
const express = require('express');
const server = express();

const db = require('./db.js');

//Configurando os arquivos staticos (css, js, imagens)
server.use(express.static('public'));

//Habilitando uso do req.body
server.use(express.urlencoded({ extended: true}));


//Configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true
});

//Criei uma rota "/" e caputro o pedido do cliente para respoder
server.get('/', function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro de banco de dados!')
        };

        const reverseIdeas = [...rows].reverse();

        const lastIdeas = [];

        for (let idea of reverseIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render('index.html', {
            ideas: lastIdeas
        });
    })

})

server.get('/ideas', function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        
        if (err) {
            console.log(err)
            return res.send('Erro de banco de dados!')
        };

        const reverseIdeas = [...rows].reverse();

        return res.render('ideas.html', {
            ideas: reverseIdeas
        });
    });
})

//Salvando dados no banco de dados

server.post('/', function(req, res){
    // Inserir dado na tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]
    db.run(query, values, function(err){

        if (err) {
            console.log(err)
            return res.send('Erro de banco de dados!')
        };

        return res.redirect('/ideas')
    })
})

server.get('/ideas/:id', (req, res) =>{
    const idList  = parseInt(req.params.id);

    const sql = `DELETE FROM ideas WHERE id = ?`
    
    
    db.run(sql, idList, function(err){
        if (err) return console.log(err)

        return res.redirect('/ideas')
    })
})

//Liguei meu servidor na porta 3000
server.listen(3000);