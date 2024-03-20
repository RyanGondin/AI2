const express = require('express');
const app = express();
//configurações
app.set('port', process.env.port || 3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/info', function(request,response){
  
    response.send('Rota tá a funfar');
});

app.get('/BemVindo', function(request,response){
    let nome = request.query.id;
    response.send('Bem Vindo '+nome);
});

app.get('/Soma', function(request,response){
    let nome = request.query.id;
    response.send('Bem Vindo '+nome);
});

app.listen(app.get('port'), () => {
    console.log('Rota foi executada com sucesso '+ app.get('port'));
   });