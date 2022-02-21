//Variaveis de controle do jogo
let perguntasfeitas = [];

//perguntas do jogo
const perguntas = [
//Pergunta 0  
    {pergunta: "Qual dessas linguagens não é considerada uma linguagem de programação?",
    respostas: ["php", "JavaScript", "c++", "html"],
    correta: "resp3"},
//Pergunta 1
    {pergunta: "Em que ano o Brasil foi descoberto?",
    respostas: ["1498", "1500", "1750", "1200"],
    correta: "resp1"},
//Pergunta 2
    {pergunta: "Oque significa HTML ?",
    respostas: ["Hyper Tonto Maluco Legal", "Hyper Text Markup Language", "Hey Trade More Language", "Hyper Text Mark Lang"],
    correta: "resp1"},
//Pergunta 3
    {pergunta: "Quais Dessas lingaugens é considerada uma linguagem de marcação",
    respostas: ["html", "JavaScript", "c++", "php"],
    correta: "resp0"},
//Pergunta 4
{pergunta: "Quais Dessas lingaugens é considerada uma linguagem de marcação",
respostas: ["html", "JavaScript", "c++", "php"],
correta: "resp0"},
//Pergunta 5
{pergunta: "Quais Dessas lingaugens é considerada uma linguagem de marcação",
respostas: ["html", "JavaScript", "c++", "php"],
correta: "resp0"},
//Pergunta 6
{pergunta: "Quais Dessas lingaugens é considerada uma linguagem de marcação",
respostas: ["html", "JavaScript", "c++", "php"],
correta: "resp0"},
//Pergunta 7
{pergunta: "Quais Dessas lingaugens é considerada uma linguagem de marcação",
respostas: ["html", "JavaScript", "c++", "php"],
correta: "resp0"},




]
//Ajustando a variavel a começar contando do 0.
var qtdperguntas = perguntas.length -1
//Adicionando qtdperguntas como parametro
gerarpergunta(qtdperguntas);

function gerarpergunta(maxperguntas) {
    //gerar um número aleatorio!
    let aleatorio = (Math.random() * maxperguntas).toFixed();
    //Math random = metodo de randomizar
    //toFixed = retirar numeros decimais
    aleatorio = Number(aleatorio);
    //Converter para número
    console.log('A pergunta sorteada foi' + aleatorio);

    //verificar se a pergunta sorteada ja foi feita
    if(!perguntasfeitas.includes(aleatorio)){
        //Inserir na matriz como pergunta feita
        perguntasfeitas.push(aleatorio);
        //Preencher o html com os dados da questao sorteada
        var p_selecionada = perguntas[aleatorio].pergunta
        console.log(p_selecionada)

        $('#pergunta').html(p_selecionada);
        $('#pergunta').attr('data-indice', aleatorio)
        //colocar as respostas
        for(var i=0; i<4; i++) {
            $(`#resp${i}`).html(perguntas[aleatorio].respostas[i]);

        }

        //Embaralhar as respostas
        var pai = $('#respostas');
        var botoes = pai.children();

        for(var i=1; i<botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
        
    }
    else {
        //Se a pergunta ja foi feita
        console.log(' a pergunta ja foi feita. Sorteando novamente')
        if(perguntasfeitas.length < qtdperguntas + 1) {
            return gerarpergunta(maxperguntas);
        }
        else {
            console.log('Acabaram as perguntas!');

            $('#quiz').addClass('oculto');
            $('#Mensagem').html("Você Ganhou!!!")
            $('#status').removeClass('oculto');
        }
    }
    


}

$('.resposta').click(function () {
    if($("#quiz").attr('data-status') !== 'travado') {

    
    resetabotoes();
    //Adicionar a classe selecionada
    $(this).addClass('selecionada');
}
});

$('#confirm').click(function () {
    //Indice da pergunta
    var indice = $('#pergunta').attr('data-indice');
    //Respota Certa
    var respocerta = perguntas[indice].correta;
    //Resposta selecionada
    $('.resposta').each(function () {
        if($(this).hasClass('selecionada')){
            var respostaescolhida = $(this).attr('id');

            if (respocerta == respostaescolhida) {
                console.log('Aceertou Miseravee!');
                proximapergunta(); 
            }
            else {
                console.log('Errrrrouuuuuu!!')
                $('#quiz').attr('data-status', 'travado');
                $('#confirm').addClass('oculto');
                $('#' + respocerta).addClass('correta');
                $('#' + respostaescolhida).removeClass('selecionada');
                $('#' + respostaescolhida).addClass('errada');
                setTimeout(function(){
                    //4 segundos para dar game over
                    gameover();
                },4000)

            }
        }
    })

});

function newgame() {
    $('#quiz').attr('data-status', 'ok');
    perguntasfeitas = [];
    resetabotoes();
    gerarpergunta(qtdperguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
    $('#confirm').removeClass('oculto');


}

function proximapergunta(){
    resetabotoes();

    gerarpergunta(qtdperguntas);

}

function resetabotoes() {
    $('.resposta').each(function (){
        //remover a classe selecionada
        if($(this).hasClass('selecionada')){
           $(this).removeClass('selecionada')
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta')
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada')
        }
    
    });
}

function gameover () {
    $('#quiz').addClass('oculto');
    $('#Mensagem').html("Game Over!")
    $('#status').removeClass('oculto');
}

$('#novojogo').click(function(){
    newgame();
});