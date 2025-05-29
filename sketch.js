// Variáveis para as animações de fluxo
let fluxoAlimentoX = 0;
let fluxoAlimentoY = 0;
let fluxoTecnologiaX = 0;
let fluxoTecnologiaY = 0;

// Variáveis para a animação do botão Agradecer
let agradecerAnimacaoAtiva = false;
let particulasAgradecer = [];

function setup() {
  createCanvas(900, 600); // Aumentei um pouco o tamanho do canvas
  // Definir o ponto inicial do fluxo de alimento (do campo)
  fluxoAlimentoX = width / 4; // Centro do campo
  fluxoAlimentoY = height / 2;
  // Definir o ponto inicial do fluxo de tecnologia (da cidade)
  fluxoTecnologiaX = width * 3 / 4; // Centro da cidade
  fluxoTecnologiaY = height / 2;
}

function draw() {
  background(240); // Fundo quase branco

  // --- Desenha o cenário de Campo e Cidade ---
  desenhaCenario();

  // --- Desenha os elementos do Campo ---
  desenhaCampoElementos();

  // --- Desenha os elementos da Cidade ---
  desenhaCidadeElementos();

  // --- Animação do Fluxo de Recursos ---
  animaFluxoRecursos();

  // --- Desenha e gerencia o botão de Agradecer ---
  desenhaBotaoAgradecer();

  // --- Gerencia a animação das partículas de agradecimento ---
  gerenciaParticulasAgradecer();

  // --- Exemplo de informação ao passar o mouse ---
  exibeInformacoesHover();
}

function desenhaCenario() {
  noStroke();

  // Campo (lado esquerdo)
  fill(140, 200, 100); // Verde vibrante
  rect(0, 0, width / 2, height);

  // Cidade (lado direito)
  fill(180, 190, 200); // Cinza azulado claro
  rect(width / 2, 0, width / 2, height);

  // Linha divisória central
  stroke(120);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
}

function desenhaCampoElementos() {
  noStroke();

  // Plantação de Milho (amarelo)
  fill(255, 200, 0);
  rect(50, 150, 80, 60);
  triangle(50, 150, 90, 100, 130, 150); // Folhas simbólicas
  fill(0);
  textSize(12);
  text("Milho", 80, 180);

  // Plantação de Feijão (verde escuro)
  fill(80, 150, 50);
  rect(180, 250, 70, 50);
  fill(0);
  text("Feijão", 215, 280);

  // Vaca
  fill(139, 69, 19); // Marrom
  ellipse(100, 400, 60, 45); // Corpo
  ellipse(130, 390, 25, 20); // Cabeça
  fill(255);
  ellipse(135, 388, 5, 5); // Olho
  fill(0);
  textSize(12);
  text("Leite", 100, 430);

  // Trator
  fill(200, 50, 50); // Vermelho forte
  rect(220, 480, 70, 40);
  fill(50);
  ellipse(235, 520, 25, 25);
  ellipse(275, 520, 25, 25);
  fill(0);
  textSize(12);
  text("Trator", 255, 550);
}

function desenhaCidadeElementos() {
  noStroke();

  // Prédios
  fill(150, 160, 170); // Cinza médio
  rect(width - 150, 100, 80, 200); // Prédio alto
  rect(width - 250, 200, 70, 150); // Prédio médio
  fill(0);
  textSize(12);
  text("Moradias", width - 110, 290);
  text("Serviços", width - 215, 340);


  // Fábrica (simbolizando produção tecnológica)
  fill(100, 110, 120); // Cinza escuro
  rect(width - 350, 400, 90, 80);
  rect(width - 330, 380, 20, 20); // Chaminé
  fill(0);
  textSize(12);
  text("Tecnologia", width - 305, 470);

  // Carro (simbolizando transporte)
  fill(50, 100, 200); // Azul escuro
  rect(width - 120, 450 + sin(frameCount * 0.05) * 5, 50, 25); // Carro animado
  fill(0);
  text("Transporte", width - 95, 490);

  // Supermercado/Feira
  fill(220, 200, 150); // Creme
  rect(width - 450, 150, 120, 80);
  fill(0);
  textSize(14);
  text("Supermercado", width - 390, 185);
}

function animaFluxoRecursos() {
  // --- Fluxo de Alimento (Campo para Cidade) ---
  stroke(50, 180, 50, 200); // Verde transparente
  strokeWeight(3);
  let targetAlimentoX = width - 390; // Centro do supermercado
  let targetAlimentoY = 190;
  let startAlimentoX = 90; // Da plantação de milho
  let startAlimentoY = 180;

  // Animação da seta
  fluxoAlimentoX = lerp(startAlimentoX, targetAlimentoX, (frameCount % 120) / 120);
  fluxoAlimentoY = lerp(startAlimentoY, targetAlimentoY, (frameCount % 120) / 120);
  line(startAlimentoX, startAlimentoY, fluxoAlimentoX, fluxoAlimentoY);

  // Ponta da seta
  push();
  translate(fluxoAlimentoX, fluxoAlimentoY);
  let angleAlimento = atan2(targetAlimentoY - startAlimentoY, targetAlimentoX - startAlimentoX);
  rotate(angleAlimento);
  triangle(-8, -4, -8, 4, 0, 0); // Ponta da seta
  pop();


  // --- Fluxo de Tecnologia (Cidade para Campo) ---
  stroke(50, 100, 200, 200); // Azul transparente
  strokeWeight(3);
  let targetTecnologiaX = 255; // Para o trator
  let targetTecnologiaY = 500;
  let startTecnologiaX = width - 305; // Da fábrica
  let startTecnologiaY = 440;

  // Animação da seta
  fluxoTecnologiaX = lerp(startTecnologiaX, targetTecnologiaX, (frameCount % 150) / 150);
  fluxoTecnologiaY = lerp(startTecnologiaY, targetTecnologiaY, (frameCount % 150) / 150);
  line(startTecnologiaX, startTecnologiaY, fluxoTecnologiaX, fluxoTecnologiaY);

  // Ponta da seta
  push();
  translate(fluxoTecnologiaX, fluxoTecnologiaY);
  let angleTecnologia = atan2(targetTecnologiaY - startTecnologiaY, targetTecnologiaX - startTecnologiaX);
  rotate(angleTecnologia);
  triangle(-8, -4, -8, 4, 0, 0); // Ponta da seta
  pop();
}

function desenhaBotaoAgradecer() {
  let buttonX = width / 2 - 75;
  let buttonY = height - 80;
  let buttonWidth = 150;
  let buttonHeight = 40;

  // Efeito hover no botão
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
      mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    fill(255, 120, 20, 220); // Laranja mais claro no hover
    cursor(HAND); // Mudar cursor para mão
  } else {
    fill(255, 100, 0); // Laranja normal
    cursor(ARROW); // Cursor normal
  }

  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Botão arredondado

  fill(255); // Texto branco
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Agradecer!", width / 2, height - 60);
}

function mouseClicked() {
  let buttonX = width / 2 - 75;
  let buttonY = height - 80;
  let buttonWidth = 150;
  let buttonHeight = 40;

  // Verifica se o clique foi no botão
  if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
      mouseY > buttonY && mouseY < buttonY + buttonHeight) {
    agradecerAnimacaoAtiva = true;
    // Cria novas partículas para a animação
    for (let i = 0; i < 30; i++) {
      particulasAgradecer.push(new Particula(width / 2, height - 60));
    }
    // Remove as partículas após um tempo para não sobrecarregar
    setTimeout(() => {
      agradecerAnimacaoAtiva = false;
      particulasAgradecer = [];
    }, 1500); // 1.5 segundos
  }
}

function gerenciaParticulasAgradecer() {
  if (agradecerAnimacaoAtiva) {
    for (let i = particulasAgradecer.length - 1; i >= 0; i--) {
      let p = particulasAgradecer[i];
      p.update();
      p.display();
      if (p.isFinished()) {
        particulasAgradecer.splice(i, 1);
      }
    }
  }
}

// Classe para as partículas da animação de agradecimento
class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-3, -1);
    this.alpha = 255;
    this.size = random(8, 15);
    this.color = color(random(200, 255), random(100, 200), random(0, 50), this.alpha);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5; // Desaparecer com o tempo
    this.vy += 0.05; // Pequena gravidade
  }

  display() {
    noStroke();
    this.color.setAlpha(this.alpha);
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  isFinished() {
    return this.alpha < 0;
  }
}

function exibeInformacoesHover() {
  textSize(14);
  fill(0); // Texto preto
  noStroke();

  // Info Milho
  if (mouseX > 50 && mouseX < 130 && mouseY > 150 && mouseY < 210) {
    text("O milho do campo alimenta a cidade!", mouseX + 10, mouseY - 10);
  }
  // Info Vaca
  if (dist(mouseX, mouseY, 100, 400) < 30) {
    text("O leite vai para sua mesa!", mouseX + 10, mouseY - 10);
  }
  // Info Supermercado
  if (mouseX > width - 450 && mouseX < width - 330 && mouseY > 150 && mouseY < 230) {
    text("Aqui chegam os produtos do campo!", mouseX + 10, mouseY - 10);
  }
  // Info Fábrica/Tecnologia
  if (mouseX > width - 350 && mouseX < width - 260 && mouseY > 400 && mouseY < 480) {
    text("Tecnologia da cidade ajuda o campo!", mouseX - 100, mouseY - 10);
  }
}