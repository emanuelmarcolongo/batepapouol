/* deuCerto = login com sucesso (novo nome se usuário);
deuErrado = login sem sucesso (criar outro usuário);
deuCerto > pegarMensagens = faz o requisito do banco de dados do servidor;
pegarMensagens > mensagens = renderiza as mensagems no html;
enviarMensagem = envia mensgaem pro banco de dados e chama pegarMensagens para pegar o banco atualizado; */



let nome = '';
let nome1 = '';
function login() {

    const user = document.querySelector('.username').value;
    nome1 = user;
    nome = { name: `${user}` };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
    promessa.then(deuCerto);
    promessa.catch(deuErrado);

}

function deuCerto() {
    let pagina = document.querySelector('.paginaEntrada');
    pagina.classList.add('esconder');
    pegarMensagens();

    const idInterval = setInterval(manterConexao, 5000);


}

function pegarMensagens () {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(mensagens);
}

function deuErrado() {
    let aviso = document.querySelector('.aviso');
    aviso.innerHTML = "Nome de usuário em uso, tente outra vez"
}

let informações;
function mensagens(parametro) {
    informações = parametro.data;
    console.log(informações);

    const pagina = document.querySelector('.conteudo');


    for (let i = 0; i < informações.length; i++) {
        if (informações[i].type === 'message') {
            pagina.innerHTML += `
    <div class="mensagem"> 
        (${informações[i].time})   <strong>${informações[i].from}</strong> para ${informações[i].to}:  ${informações[i].text}
    </div>
    `
        }
        else if (informações[i].type === 'status') {
            pagina.innerHTML += `
    <div class="mensagemStatus"> 
        (${informações[i].time})    <strong>${informações[i].from}</strong>  ${informações[i].text}
    </div>
    `
        }
        else if (informações[i].type === 'message') {
            pagina.innerHTML += `
    <div class="mensagemPrivada"> 
        (${informações[i].time})    <strong>${informações[i].from}</strong> para ${informações[i].to}:  ${informações[i].text}
    </div>
    `
        }
    }

    /* Requisição de mensagens concluidas;
    pegar o formato das mensagens;
    modificar o innerHTML do conteudo para renderizar mensagens dentro; */

}
/* 1 - Pedir o usuario;
2 - Ao clicar em enviar o usuário, fazer o post para o servidor;
3 -  */


function manterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
    promessa.then(verificarStatus);

}

function verificarStatus(parametro) {
}

function enviarMensagem () {

    const conteudo = document.querySelector('footer input').value;

    const mensagem = {
        from: nome1,
        to: 'Todos',
        text: conteudo,
        type: 'message' // ou "private_message" para o bônus
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    promessa.then(pegarMensagens);
}