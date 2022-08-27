/* deuCerto = login com sucesso (novo nome se usuário);
deuErrado = login sem sucesso (criar outro usuário);
deuCerto > pegarMensagens = faz o requisito do banco de dados do servidor;
pegarMensagens > renderizarMensagens = renderiza as mensagems no html;
enviarMensagem = envia mensgaem pro banco de dados e chama pegarMensagens para pegar o banco atualizado;
scrollMensagem = pega a ultima mensagem da div conteudo e scrolla pra ela.
manterConexao = faz um post com seu nome para o 'status' do servidor para saber que você está online;
 */


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
    manterConexao();
    const idInterval = setInterval(manterConexao, 5000);
    setInterval(atualizarMensagens, 3000);


}

function pegarMensagens() {
    pagina = document.querySelector('.conteudo');
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(renderizarMensagens);
}

function deuErrado() {
    let aviso = document.querySelector('.aviso');
    aviso.innerHTML = "Nome de usuário em uso ou em branco,  tente outra vez."
}

let pagina;
let informações;
function renderizarMensagens(parametro) {
    informações = parametro.data;
    pagina = document.querySelector('.conteudo');
    pagina.innerHTML = '';


    for (let i = 0; i < informações.length; i++) {
        if (informações[i].type === 'message') {
            pagina.innerHTML += `
    <div class="mensagem"> 
        (${informações[i].time})\u00A0\u00A0<strong>${informações[i].from}</strong>\u00A0\u00A0para\u00A0\u00A0<strong>${informações[i].to}</strong>:\u00A0\u00A0${informações[i].text}
        </div>
    `
        }
        else if (informações[i].type === 'status') {
            pagina.innerHTML += `
    <div class="mensagemStatus"> 
        (${informações[i].time})\u00A0\u00A0<strong>${informações[i].from}</strong>\u00A0\u00A0${informações[i].text}
        </div>
    `
        }

        /*        else if (informações[i].type === 'private_message') {
                   pagina.innerHTML += `
           <div class="mensagemPrivada"> 
               (${informações[i].time})    <strong>${informações[i].from}</strong> para <strong>${informações[i].to}</strong>:   ${informações[i].text}
           </div>
           `
               } */
    }
    scrollMensagem();
}

function scrollMensagem() {

    let scroll = document.querySelector('.conteudo');
    scroll.lastElementChild.scrollIntoView();
}



function manterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
    promessa.then(verificarStatus);
}

function atualizarMensagens() {
    pegarMensagens();
}

function verificarStatus(parametro) {
    /*     usuariosOn(); */
}

let conteudo;
function enviarMensagem() {

    conteudo = document.querySelector('footer input');

    if (conteudo.value === '' || conteudo.value === null) {
        return;
    }

    const mensagem = {
        from: nome1,
        to: 'Todos',
        text: conteudo.value,
        type: 'message' // ou "private_message" para o bônus
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    promessa.then(pegarMensagens);
    promessa.catch(erroMensagem);

    conteudo.value = '';  
}

function erroMensagem(erro) {
    window.location.reload()
}
/* 

function usuariosOn() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then (teste1);
}

let element;
function teste1(parametro) {
    element = document.querySelector('.usuariosOn');
    element.innerHTML = '';

    for (let i =0; i < parametro.data.length; i++) {
     element.innerHTML += `<li><img src="imgs/pessoa.png" alt="">  ${parametro.data[i].name}</li>
     `
    }
    console.log(parametro.data);
}

function menuLateral () {
    const elemento = document.querySelector('.menuLateral');
    elemento.classList.remove('esconder');
}
 */