// Usei o express para criar e configurar o servidor
const express = require('express');
const server = express();

const ideas =[
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        title:'Cursos de Programação',
        category:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus veniam aspernatur consequatur',
        description:'estudo',
        url:'http://rocketseat.com.br'
    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        title:'Eexercícios',
        category:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus veniam aspernatur consequatur',
        description:'saúde',
        url:'http://rocketseat.com.br'
    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        title:'Meditação',
        category:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus veniam aspernatur consequatur',
        description:'menalidade',
        url:'http://rocketseat.com.br'
    },
    {
        img:'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        title:'Karaoke',
        category:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus veniam aspernatur consequatur',
        description:'diversão em família',
        url:'http://rocketseat.com.br'
    },
]
//Configurando os arquivos staticos (css, js, imagens)
server.use(express.static('public'));

//Configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true
});

//Criei uma rota "/" e caputro o pedido do cliente para respoder
server.get('/', function(req, res){

    const reverseIdeas = [...ideas].reverse();

    const lastIdeas = [];

    for(let idea of reverseIdeas){
        if(lastIdeas.length < 2){
            lastIdeas.push(idea)
        }
    }

    return res.render('index.html', { ideas: lastIdeas });
})

server.get('/ideas', function(req, res){

    const reverseIdeas = [...ideas].reverse();

    return res.render('ideas.html', {ideas: reverseIdeas});
})
//Liguei meu servidor na porta 3000
server.listen(3000);
