const jogador = document.querySelector ('.jogador');
const area_de_jogo = document.querySelector ('#area_de_jogo');
const inimigo_img = ['arquivos/css/zombie1.gif', 'arquivos/css/zombie2.gif'];
const instrucao = document.querySelector('.dicas');
const botao_iniciar = document.querySelector('.botao_iniciar');
let tempo_inim;

function mover(event) {
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        move_cima();
    } else if(event.key === 'ArrowDown'){
        event.preventDefault();
        move_baixo();
    } else if(event.key === ' '){
        event.preventDefault();
        disparar();
    }
}

function move_cima(){
    let pos_cima = getComputedStyle(jogador).getPropertyValue('top');
    if(pos_cima === '34px'){
        return
    } else {
        let position = parseInt(pos_cima);
        position -= 68;
        jogador.style.top = position + 'px';
    }
}

function move_baixo(){
    let pos_cima = getComputedStyle(jogador).getPropertyValue('top');
    if(pos_cima === '306px'){
        return
    } else {
        let position = parseInt(pos_cima);
        position += 68;
        jogador.style.top = position + 'px';
    }
}

function disparar(){
    let disparo = cria_disparo();
    area_de_jogo.appendChild(disparo);
    move_disparo(disparo);
}

function cria_disparo(){
    let pos_x = parseInt(window.getComputedStyle(jogador).getPropertyValue('left'));
    let pos_y = parseInt(window.getComputedStyle(jogador).getPropertyValue('top'));
    let novo_disp = document.createElement('img');
    novo_disp.src = 'arquivos/css/shoot.png';
    novo_disp.classList.add('disparo');
    novo_disp.style.left = `${pos_x - 10}px`;
    novo_disp.style.top = `${pos_y - 52.5}px`;
    return novo_disp;
}

function move_disparo(disparo){
    let tempo_disp = setInterval(() => {
        let pos_x = parseInt(disparo.style.left);
        let inimigos = document.querySelectorAll('.inimigo');
        inimigos.forEach((inimigo) => {
            if(confere_acerto(disparo, inimigo)) {
                inimigo.src = 'arquivos/css/boom.png';
                inimigo.classList.remove('inimigo');
                inimigo.classList.add('inimigo_derrotado');
            }
        })
    if (pos_x === 900) {
        disparo.remove();
    } else {    
        disparo.style.left = `${pos_x + 10}px`;
    }
    }, 15); 
}

function cria_inimigo(){
    let novo_inim = document.createElement('img');
    let sorteio_inim = inimigo_img[Math.floor(Math.random() * inimigo_img.length)];
    novo_inim.src = sorteio_inim;
    novo_inim.classList.add('inimigo');
    novo_inim.classList.add('anima_inim');
    novo_inim.style.left = '900px';
    novo_inim.style.top = `${Math.floor(Math.random() * 68) + 68}px`;
    area_de_jogo.appendChild(novo_inim);
    move_inim(novo_inim);
}

function move_inim(inimigo){
    let tempo_mov = setInterval(() => {
        let pos_x = parseInt(window.getComputedStyle(inimigo).getPropertyValue('left'));
        if (pos_x <= 5) {
            if (Array.from(inimigo.classlist).includes('inimigo_derrotado')){
                inimigo.remove();
            } else {
                fim_de_jogo();
            }
        } else {
            inimigo.style.left = `${xPosition - 40}px`;
        }
    }, 30);
}

function confere_acerto(disparo, inimigo){
    let disparo_cima = parseInt(disparo.style.top);
    let disparo_esquerda = parseInt(disparo.style.left);
    let disparo_baixo = disparo_cima - 20;
    let inimigo_cima = parseInt(inimigo.style.top);
    let inimigo_esquerda = parseInt(inimigo.style.left);
    let inimigo_baixo = inimigo_cima - 30;
    if (disparo_esquerda != 340 && disparo_esquerda + 40 >= inimigo_esquerda) {
        if (disparo_cima <= inimigo_cima && disparo_cima >= inimigo_baixo) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

botao_iniciar.addEventListener('click', (event) => {
    jogar();
})

function jogar(){
    botao_iniciar.style.display = 'none';
    instrucao.style.display = 'none';
    window.addEventListener('keydown', mover);
    tempo_inim = setInterval(() => {
        cria_inimigo();
    }, 2000);
}

function fim_de_jogo(){
    window.removeEventListener('keydown', mover);
    clearInterval(tempo_inim);
    let inimigos = document.querySelectorAll('.inimigo');
    inimigos.forEach((inimigo) => inimigo.remove());
    let disparos = document.querySelectorAll('.disparo');
    disparos.forEach((disparo) => disparo.remove());
    setTimeout(() => {
        alert('Fim de jogo!');
        jogador.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
window.addEventListener('keydown', mover);