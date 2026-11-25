// ============================================================
// CEMITÉRIO DA IGUALDADE - NOITE DE TERROR
// ============================================================

const MAPA = [
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,1,0,0,2,0,0,1,0,0,0,2,0,0,1,0,0,2,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,2,0,0,1,0,0,0,2,0,0,0,1,0,0,2,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,2,0,0,3],
  [3,0,1,0,0,0,2,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,3],
  [3,0,0,0,2,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,2,0,0,3],
  [3,0,2,0,0,1,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,3],
  [3,0,0,1,0,0,2,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,1,0,0,3],
  [3,0,0,0,2,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3],
  [3,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,2,0,3],
  [3,0,0,0,0,0,1,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,2,0,0,0,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,3],
  [3,0,1,0,0,2,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3],
  [3,0,0,0,1,0,0,2,0,0,1,0,0,0,0,0,1,0,0,0,0,0,4,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
];

const LARGURA_MAPA = MAPA[0].length;
const ALTURA_MAPA = MAPA.length;

const jogador = {
  x: 1.5,
  y: 1.5,
  angulo: 0,
  vida: 100,
  velocidade: 0.04,
  rotacaoVel: 0.04,
  pulo: 0,
  puloVel: 0,
  escondido: false,
  pistas: 0,
  kills: 0
};

let criaturas = [];

const TIPOS_CRIATURA = [
  { nome: 'Deadite', cor: '#8b0000', corOlho: '#ffff00', velocidade: 0.012, vida: 3, dano: 15 },
  { nome: 'Alma Penada', cor: '#2a0030', corOlho: '#ff00ff', velocidade: 0.015, vida: 2, dano: 10 },
  { nome: 'Coveiro Maldito', cor: '#3a2a1a', corOlho: '#ff4400', velocidade: 0.01, vida: 4, dano: 20 }
];

const PISTAS = [
  { x: 8.5, y: 3.5, titulo: '✟ Fundação (1859)', texto: 'O Cemitério da Igualdade foi fundado em 1859, durante o Segundo Reinado de D. Pedro II.' },
  { x: 18.5, y: 8.5, titulo: '✟ Arte Tumular', texto: 'Suas esculturas em mármore e bronze representam anjos, santos e figuras barrocas.' },
  { x: 5.5, y: 16.5, titulo: '✟ Luíza Amélia', texto: 'Luíza Amélia de Queiroz (1863-1904), primeira poetisa do Piauí, repousa aqui.' },
  { x: 20.5, y: 19.5, titulo: '✟ O Nome "Igualdade"', texto: 'O nome vem do princípio cristão: diante da morte, todos são iguais.' }
];

let pistasColetadas = [];
let pontuacao = 0;
let jogoAtivo = false;
let jogoPausado = false;

const teclas = {};

const controlesMobile = {
  cima: false,
  baixo: false,
  esquerda: false,
  direita: false,
  rotEsq: false,
  rotDir: false
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let W, H;

function redimensionarCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  W = Math.max(1, Math.floor(window.innerWidth * dpr));
  H = Math.max(1, Math.floor(window.innerHeight * dpr));

  canvas.width = W;
  canvas.height = H;

  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
}

window.addEventListener('resize', redimensionarCanvas);
redimensionarCanvas();


// ============================================================
// NAVEGAÇÃO
// ============================================================

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => {
    t.classList.remove('ativa');
  });

  document.getElementById(id).classList.add('ativa');
}

function mostrarHistoria() {
  mostrarTela('tela-historia');
}

function mostrarCreditos() {
  mostrarTela('tela-creditos');
}

function voltarInicio() {
  mostrarTela('tela-inicial');
}


// ============================================================
// INÍCIO DO JOGO
// ============================================================

function iniciarJogo() {
  console.log('Iniciando jogo...');

  mostrarTela('tela-jogo');
  resetarJogo();

  jogoAtivo = true;
  jogoPausado = false;

  ultimoTempo = performance.now();

  requestAnimationFrame(gameLoop);
}

function resetarJogo() {
  jogador.x = 1.5;
  jogador.y = 1.5;
  jogador.angulo = 0;
  jogador.vida = 100;
  jogador.pulo = 0;
  jogador.puloVel = 0;
  jogador.pistas = 0;
  jogador.kills = 0;

  pistasColetadas = [];
  pontuacao = 0;

  criaturas = [];

  const posicoesCriaturas = [
    { x: 10.5, y: 10.5 },
    { x: 18.5, y: 5.5 },
    { x: 5.5, y: 18.5 },
    { x: 15.5, y: 15.5 },
    { x: 20.5, y: 12.5 },
    { x: 8.5, y: 20.5 }
  ];

  posicoesCriaturas.forEach((p, i) => {
    const tipo = TIPOS_CRIATURA[i % TIPOS_CRIATURA.length];

    criaturas.push({
      x: p.x,
      y: p.y,
      tipo: tipo,
      vida: tipo.vida,
      angulo: Math.random() * Math.PI * 2,
      estado: 'vagar',
      tempoAtaque: 0,
      animacao: Math.random() * Math.PI * 2
    });
  });

  atualizarHUD();
}

function reiniciarJogo() {
  iniciarJogo();
}

function sairJogo() {
  jogoAtivo = false;
  voltarInicio();
}

function pausarJogo() {
  jogoPausado = !jogoPausado;

  if (!jogoPausado) {
    requestAnimationFrame(gameLoop);
  }
}


// ============================================================
// CONTROLES - TECLADO
// ============================================================

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  teclas[key] = true;

  if (e.key === 'ArrowUp') teclas['arrowup'] = true;
  if (e.key === 'ArrowDown') teclas['arrowdown'] = true;
  if (e.key === 'ArrowLeft') teclas['arrowleft'] = true;
  if (e.key === 'ArrowRight') teclas['arrowright'] = true;

  if (e.key === ' ' || e.code === 'Space') {
    e.preventDefault();
    pular();
  }

  if (key === 'e') {
    interagir();
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();

  teclas[key] = false;

  if (e.key === 'ArrowUp') teclas['arrowup'] = false;
  if (e.key === 'ArrowDown') teclas['arrowdown'] = false;
  if (e.key === 'ArrowLeft') teclas['arrowleft'] = false;
  if (e.key === 'ArrowRight') teclas['arrowright'] = false;
});


// ============================================================
// CONTROLES - MOBILE
// ============================================================

function moverInicio(dir, e) {
  if (e) {
    e.preventDefault();

    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }

  controlesMobile[dir] = true;

  if (e && e.currentTarget) {
    e.currentTarget.classList.add('ativo');
  }
}

function moverFim(dir, e) {
  if (e) e.preventDefault();

  controlesMobile[dir] = false;

  if (e && e.currentTarget) {
    e.currentTarget.classList.remove('ativo');
  }
}

function rotacionarInicio(dir, e) {
  if (e) e.preventDefault();

  if (dir === 'esq') {
    controlesMobile.rotEsq = true;
  } else {
    controlesMobile.rotDir = true;
  }
}

function rotacionarFim(dir, e) {
  if (e) e.preventDefault();

  if (dir === 'esq') {
    controlesMobile.rotEsq = false;
  } else {
    controlesMobile.rotDir = false;
  }
}


// Controle de câmera pelo toque
let touchStartX = 0;
let touchAtivo = false;

canvas.addEventListener('touchstart', (e) => {
  if (e.cancelable) e.preventDefault();

  touchStartX = e.touches[0].clientX;
  touchAtivo = true;
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  if (e.cancelable) e.preventDefault();

  if (!touchAtivo) return;

  const dx = e.touches[0].clientX - touchStartX;

  jogador.angulo += dx * 0.005;
  touchStartX = e.touches[0].clientX;
}, { passive: false });

canvas.addEventListener('touchend', () => {
  touchAtivo = false;
});


// No computador: arraste o mouse sobre a tela para olhar ao redor.
let mouseArrastando = false;
let mouseAnteriorX = 0;

canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button === 0) {
    mouseArrastando = true;
    mouseAnteriorX = e.clientX;
  }
});

window.addEventListener('pointerup', () => {
  mouseArrastando = false;
});

canvas.addEventListener('pointermove', (e) => {
  if (!mouseArrastando || e.pointerType !== 'mouse') return;

  const dx = e.clientX - mouseAnteriorX;

  jogador.angulo += dx * 0.004;
  mouseAnteriorX = e.clientX;
});


// Solta todos os controles quando o dedo ou mouse sai da tela.
window.addEventListener('pointerup', () => {
  Object.keys(controlesMobile).forEach(k => {
    controlesMobile[k] = false;
  });

  document.querySelectorAll('.btn-dir.ativo').forEach(b => {
    b.classList.remove('ativo');
  });
});

window.addEventListener('blur', () => {
  Object.keys(controlesMobile).forEach(k => {
    controlesMobile[k] = false;
  });

  Object.keys(teclas).forEach(k => {
    teclas[k] = false;
  });
});


// ============================================================
// AÇÕES
// ============================================================

function pular() {
  if (jogador.pulo === 0) {
    jogador.puloVel = 0.12;
  }
}

function interagir() {
  PISTAS.forEach((pista, idx) => {
    if (pistasColetadas.includes(idx)) return;

    const dx = jogador.x - pista.x;
    const dy = jogador.y - pista.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1.5) {
      pistasColetadas.push(idx);
      jogador.pistas++;
      pontuacao += 10;

      mostrarPistaModal(pista);
      atualizarHUD();
    }
  });
}

function mostrarPistaModal(pista) {
  document.getElementById('titulo-pista').textContent = pista.titulo;
  document.getElementById('texto-pista').textContent = pista.texto;

  document.getElementById('modal-pista').classList.remove('oculto');

  jogoPausado = true;
}

function fecharModal() {
  document.querySelectorAll('.modal').forEach(m => {
    m.classList.add('oculto');
  });

  jogoPausado = false;

  if (jogoAtivo) {
    requestAnimationFrame(gameLoop);
  }
}

function mostrarMapa() {
  jogoPausado = true;

  document.getElementById('modal-mapa').classList.remove('oculto');

  desenharMiniMapa();
}

function mostrarPistas() {
  jogoPausado = true;

  const lista = document.getElementById('lista-pistas');

  if (pistasColetadas.length === 0) {
    lista.innerHTML = '<p style="text-align:center;color:#888;">Nenhuma pista encontrada ainda...</p>';
  } else {
    lista.innerHTML = pistasColetadas.map(idx => {
      const p = PISTAS[idx];

      return `<div class="pista-item"><b>${p.titulo}</b><br>${p.texto}</div>`;
    }).join('');
  }

  document.getElementById('modal-pistas-lista').classList.remove('oculto');
}

function desenharMiniMapa() {
  const mc = document.getElementById('miniMapa');
  const mctx = mc.getContext('2d');

  const tam = 300;
  const celula = tam / LARGURA_MAPA;

  mctx.fillStyle = '#000';
  mctx.fillRect(0, 0, tam, tam);

  for (let y = 0; y < ALTURA_MAPA; y++) {
    for (let x = 0; x < LARGURA_MAPA; x++) {
      const c = MAPA[y][x];

      if (c === 1) mctx.fillStyle = '#555';
      else if (c === 2) mctx.fillStyle = '#0a3a0a';
      else if (c === 3) mctx.fillStyle = '#3a2a1a';
      else if (c === 4) mctx.fillStyle = '#ffcc00';
      else if (c === 5) mctx.fillStyle = '#8b0000';
      else if (c === 6) mctx.fillStyle = '#4a4a4a';
      else mctx.fillStyle = '#1a0000';

      mctx.fillRect(x * celula, y * celula, celula, celula);
    }
  }

  PISTAS.forEach((p, i) => {
    if (!pistasColetadas.includes(i)) {
      mctx.fillStyle = '#ff00ff';
      mctx.beginPath();
      mctx.arc(p.x * celula, p.y * celula, 4, 0, Math.PI * 2);
      mctx.fill();
    }
  });

  mctx.fillStyle = '#ff0000';

  criaturas.forEach(c => {
    mctx.beginPath();
    mctx.arc(c.x * celula, c.y * celula, 4, 0, Math.PI * 2);
    mctx.fill();
  });

  mctx.fillStyle = '#00ff00';
  mctx.beginPath();
  mctx.arc(jogador.x * celula, jogador.y * celula, 5, 0, Math.PI * 2);
  mctx.fill();
}


// ============================================================
// ATUALIZAÇÃO
// ============================================================

function atualizar() {
  if (!jogoAtivo || jogoPausado) return;

  if (teclas['arrowleft'] || controlesMobile.rotEsq) {
    jogador.angulo -= jogador.rotacaoVel;
  }

  if (teclas['arrowright'] || controlesMobile.rotDir) {
    jogador.angulo += jogador.rotacaoVel;
  }

  let moveX = 0;
  let moveY = 0;

  if (teclas['w'] || teclas['arrowup'] || controlesMobile.cima) {
    moveX += Math.cos(jogador.angulo) * jogador.velocidade;
    moveY += Math.sin(jogador.angulo) * jogador.velocidade;
  }

  if (teclas['s'] || teclas['arrowdown'] || controlesMobile.baixo) {
    moveX -= Math.cos(jogador.angulo) * jogador.velocidade;
    moveY -= Math.sin(jogador.angulo) * jogador.velocidade;
  }

  if (teclas['a'] || controlesMobile.esquerda) {
    moveX += Math.cos(jogador.angulo - Math.PI / 2) * jogador.velocidade;
    moveY += Math.sin(jogador.angulo - Math.PI / 2) * jogador.velocidade;
  }

  if (teclas['d'] || controlesMobile.direita) {
    moveX += Math.cos(jogador.angulo + Math.PI / 2) * jogador.velocidade;
    moveY += Math.sin(jogador.angulo + Math.PI / 2) * jogador.velocidade;
  }

  const margem = 0.2;

  const novaX = jogador.x + moveX;
  const novaY = jogador.y + moveY;

  const celulaX = Math.floor(novaX + (moveX > 0 ? margem : -margem));
  const celulaYAtual = Math.floor(jogador.y);

  if (
    celulaX >= 0 &&
    celulaX < LARGURA_MAPA &&
    celulaYAtual >= 0 &&
    celulaYAtual < ALTURA_MAPA
  ) {
    const celula = MAPA[celulaYAtual][celulaX];

    if (celula === 0 || celula === 4) {
      jogador.x = novaX;
    }
  }

  const celulaY = Math.floor(novaY + (moveY > 0 ? margem : -margem));
  const celulaXAtual = Math.floor(jogador.x);

  if (
    celulaXAtual >= 0 &&
    celulaXAtual < LARGURA_MAPA &&
    celulaY >= 0 &&
    celulaY < ALTURA_MAPA
  ) {
    const celula = MAPA[celulaY][celulaXAtual];

    if (celula === 0 || celula === 4) {
      jogador.y = novaY;
    }
  }

  if (jogador.pulo > 0 || jogador.puloVel !== 0) {
    jogador.pulo += jogador.puloVel;
    jogador.puloVel -= 0.008;

    if (jogador.pulo < 0) {
      jogador.pulo = 0;
      jogador.puloVel = 0;
    }
  }

  jogador.escondido = false;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const cx = Math.floor(jogador.x) + dx;
      const cy = Math.floor(jogador.y) + dy;

      if (
        cy >= 0 &&
        cy < ALTURA_MAPA &&
        cx >= 0 &&
        cx < LARGURA_MAPA
      ) {
        if (MAPA[cy][cx] === 1) {
          const distX = Math.abs(jogador.x - (cx + 0.5));
          const distY = Math.abs(jogador.y - (cy + 0.5));

          if (distX < 1.3 && distY < 1.3) {
            jogador.escondido = true;
          }
        }
      }
    }
  }

  const msgEscondido = document.getElementById('msg-escondido');

  if (jogador.escondido) {
    msgEscondido.classList.add('ativo');
  } else {
    msgEscondido.classList.remove('ativo');
  }

  let pistaProxima = false;

  PISTAS.forEach((p, i) => {
    if (pistasColetadas.includes(i)) return;

    const dx = jogador.x - p.x;
    const dy = jogador.y - p.y;

    if (Math.sqrt(dx * dx + dy * dy) < 1.5) {
      pistaProxima = true;
    }
  });

  const msgInt = document.getElementById('msg-interacao');

  if (pistaProxima) {
    msgInt.classList.add('ativo');
  } else {
    msgInt.classList.remove('ativo');
  }

  const celulaAtual = MAPA[Math.floor(jogador.y)][Math.floor(jogador.x)];

  if (celulaAtual === 4) {
    if (jogador.pistas >= 4) {
      vencer();
    } else {
      const msgPista = document.getElementById('msg-pista');

      msgPista.textContent = `Você precisa de todas as 4 pistas! (${jogador.pistas}/4)`;
      msgPista.classList.add('ativo');

      setTimeout(() => {
        msgPista.classList.remove('ativo');
      }, 2000);
    }
  }

  atualizarCriaturas();
}

function atualizarCriaturas() {
  criaturas.forEach(c => {
    c.animacao += 0.05;

    const dx = jogador.x - c.x;
    const dy = jogador.y - c.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const podeVer = !jogador.escondido && dist < 8;
    const temLinhaVisao = podeVer && verificarLinhaVisao(c.x, c.y, jogador.x, jogador.y);

    if (temLinhaVisao) {
      c.estado = 'perseguir';
    } else if (c.estado === 'perseguir' && dist > 10) {
      c.estado = 'vagar';
    }

    if (c.estado === 'perseguir') {
      const ang = Math.atan2(dy, dx);

      const nx = c.x + Math.cos(ang) * c.tipo.velocidade;
      const ny = c.y + Math.sin(ang) * c.tipo.velocidade;

      if (MAPA[Math.floor(ny)][Math.floor(nx)] === 0) {
        c.x = nx;
        c.y = ny;
      } else {
        if (MAPA[Math.floor(c.y)][Math.floor(nx)] === 0) c.x = nx;
        else if (MAPA[Math.floor(ny)][Math.floor(c.x)] === 0) c.y = ny;
      }

      if (dist < 0.8) {
        c.tempoAtaque++;

        if (c.tempoAtaque > 40) {
          jogador.vida -= c.tipo.dano;
          c.tempoAtaque = 0;

          atualizarHUD();

          if (jogador.vida <= 0) {
            gameOver();
          }
        }
      } else {
        c.tempoAtaque = 0;
      }
    } else {
      if (Math.random() < 0.02) {
        c.angulo = Math.random() * Math.PI * 2;
      }

      const nx = c.x + Math.cos(c.angulo) * c.tipo.velocidade * 0.5;
      const ny = c.y + Math.sin(c.angulo) * c.tipo.velocidade * 0.5;

      if (MAPA[Math.floor(ny)][Math.floor(nx)] === 0) {
        c.x = nx;
        c.y = ny;
      } else {
        c.angulo = Math.random() * Math.PI * 2;
      }
    }
  });
}

function verificarLinhaVisao(x1, y1, x2, y2) {
  const passos = 20;

  for (let i = 1; i < passos; i++) {
    const t = i / passos;

    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;

    const c = MAPA[Math.floor(y)][Math.floor(x)];

    if (c !== 0 && c !== 4) {
      return false;
    }
  }

  return true;
}


// ============================================================
// RENDERIZAÇÃO
// ============================================================

function renderizar() {
  const gradCeu = ctx.createLinearGradient(0, 0, 0, H / 2);

  gradCeu.addColorStop(0, '#1a0000');
  gradCeu.addColorStop(0.5, '#2a0505');
  gradCeu.addColorStop(1, '#0a0000');

  ctx.fillStyle = gradCeu;
  ctx.fillRect(0, 0, W, H / 2);

  const luaX = W * 0.75;
  const luaY = H * 0.2;
  const luaR = Math.min(W, H) * 0.08;

  const gradLua = ctx.createRadialGradient(luaX, luaY, 0, luaX, luaY, luaR);

  gradLua.addColorStop(0, '#ffcccc');
  gradLua.addColorStop(0.3, '#ff6666');
  gradLua.addColorStop(0.7, '#8b0000');
  gradLua.addColorStop(1, 'rgba(139,0,0,0)');

  ctx.fillStyle = gradLua;
  ctx.beginPath();
  ctx.arc(luaX, luaY, luaR * 1.5, 0, Math.PI * 2);
  ctx.fill();

  const gradChao = ctx.createLinearGradient(0, H / 2, 0, H);

  gradChao.addColorStop(0, '#0a0000');
  gradChao.addColorStop(0.5, '#1a0a0a');
  gradChao.addColorStop(1, '#050000');

  ctx.fillStyle = gradChao;
  ctx.fillRect(0, H / 2, W, H / 2);

  const tempo = Date.now() * 0.0003;

  ctx.fillStyle = 'rgba(80, 20, 20, 0.1)';

  for (let i = 0; i < 5; i++) {
    const nx = (Math.sin(tempo + i) * 0.5 + 0.5) * W;
    const ny = H * 0.4 + Math.cos(tempo + i * 0.7) * 30;

    ctx.beginPath();
    ctx.arc(nx, ny, 100, 0, Math.PI * 2);
    ctx.fill();
  }

  const FOV = Math.PI / 3;
  const numRaios = Math.min(W, 400);
  const distProjecao = (W / 2) / Math.tan(FOV / 2);

  const zBuffer = new Array(numRaios);

  for (let i = 0; i < numRaios; i++) {
    const angRay = jogador.angulo - FOV / 2 + (i / numRaios) * FOV;

    const resultado = lancarRaio(jogador.x, jogador.y, angRay);

    if (resultado.dist > 0) {
      const distCorrigida = resultado.dist * Math.cos(angRay - jogador.angulo);

      zBuffer[i] = distCorrigida;

      const alturaParede = (1 / distCorrigida) * distProjecao;
      const topo = (H - alturaParede) / 2 - jogador.pulo * 100;
      const larguraColuna = W / numRaios + 1;
      const xPos = i * (W / numRaios);

      let corBase, corEscura;

      const tipo = MAPA[resultado.mapY][resultado.mapX];

      if (tipo === 1) {
        corBase = '#7a6a5a';
        corEscura = '#4a3a2a';
      } else if (tipo === 2) {
        corBase = '#2a4a2a';
        corEscura = '#1a2a1a';
      } else if (tipo === 3) {
        corBase = '#4a3a2a';
        corEscura = '#2a1a0a';
      } else if (tipo === 4) {
        corBase = '#aa8822';
        corEscura = '#554411';
      } else if (tipo === 5) {
        corBase = '#5a2a2a';
        corEscura = '#2a0a0a';
      } else if (tipo === 6) {
        corBase = '#6a6a6a';
        corEscura = '#3a3a3a';
      }

      const lado = resultado.lado;
      const cor = lado === 0 ? corBase : corEscura;
      const sombra = Math.max(0.2, 1 - distCorrigida / 15);

      const gradParede = ctx.createLinearGradient(0, topo, 0, topo + alturaParede);

      gradParede.addColorStop(0, escurecer(cor, sombra * 0.5));
      gradParede.addColorStop(0.5, escurecer(cor, sombra));
      gradParede.addColorStop(1, escurecer(cor, sombra * 0.3));

      ctx.fillStyle = gradParede;
      ctx.fillRect(xPos, topo, larguraColuna, alturaParede);

      if (tipo === 1 && distCorrigida < 8) {
        const cx = xPos + larguraColuna / 2;

        ctx.fillStyle = escurecer('#8a7a6a', sombra);
        ctx.beginPath();
        ctx.arc(cx, topo + alturaParede * 0.15, larguraColuna * 1.5, 0, Math.PI, true);
        ctx.fill();

        ctx.fillStyle = escurecer('#6a5a4a', sombra);
        ctx.fillRect(
          cx - larguraColuna * 1.5,
          topo + alturaParede * 0.15,
          larguraColuna * 3,
          alturaParede * 0.7
        );

        if (distCorrigida < 4) {
          ctx.fillStyle = escurecer('#2a1a0a', sombra);

          const cruzY = topo + alturaParede * 0.3;

          ctx.fillRect(cx - 2, cruzY, 4, alturaParede * 0.35);
          ctx.fillRect(cx - 10, cruzY + alturaParede * 0.1, 20, 3);
        }
      }

      if (tipo === 2 && distCorrigida < 10) {
        const cx = xPos + larguraColuna / 2;

        ctx.fillStyle = escurecer('#3a2a1a', sombra);

        const troncoLargura = larguraColuna * 0.8;

        ctx.fillRect(
          cx - troncoLargura / 2,
          topo + alturaParede * 0.4,
          troncoLargura,
          alturaParede * 0.6
        );

        ctx.fillStyle = escurecer('#1a3a1a', sombra);

        const copaTopo = topo;
        const copaAltura = alturaParede * 0.45;
        const copaLargura = larguraColuna * 3;

        for (let camada = 0; camada < 3; camada++) {
          const offset = camada * 5;

          ctx.beginPath();
          ctx.ellipse(
            cx,
            copaTopo + copaAltura * 0.3 + offset,
            copaLargura - offset,
            copaAltura * 0.6 - offset,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      if (tipo === 4) {
        const pulso = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;

        ctx.fillStyle = `rgba(255, 200, 0, ${0.4 * pulso * sombra})`;
        ctx.fillRect(xPos, topo, larguraColuna, alturaParede);
      }
    } else {
      zBuffer[i] = 999;
    }
  }

  renderizarCriaturas(zBuffer, numRaios, FOV, distProjecao);
  renderizarPistas(zBuffer, numRaios, FOV, distProjecao);

  const gradVinheta = ctx.createRadialGradient(
    W / 2,
    H / 2,
    Math.min(W, H) * 0.3,
    W / 2,
    H / 2,
    Math.max(W, H) * 0.7
  );

  gradVinheta.addColorStop(0, 'rgba(0,0,0,0)');
  gradVinheta.addColorStop(1, 'rgba(0,0,0,0.8)');

  ctx.fillStyle = gradVinheta;
  ctx.fillRect(0, 0, W, H);

  if (jogador.vida < 40) {
    const alpha =
      (1 - jogador.vida / 40) *
      0.3 *
      (Math.sin(Date.now() * 0.01) * 0.5 + 0.5);

    ctx.fillStyle = `rgba(139, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, W, H);
  }

  ctx.strokeStyle = 'rgba(200, 150, 100, 0.5)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(W / 2 - 10, H / 2);
  ctx.lineTo(W / 2 + 10, H / 2);
  ctx.moveTo(W / 2, H / 2 - 10);
  ctx.lineTo(W / 2, H / 2 + 10);
  ctx.stroke();
}

function lancarRaio(ox, oy, ang) {
  const cos = Math.cos(ang);
  const sin = Math.sin(ang);

  let mapX = Math.floor(ox);
  let mapY = Math.floor(oy);

  const deltaDistX = Math.abs(1 / cos);
  const deltaDistY = Math.abs(1 / sin);

  let stepX, stepY, sideDistX, sideDistY;

  if (cos < 0) {
    stepX = -1;
    sideDistX = (ox - mapX) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - ox) * deltaDistX;
  }

  if (sin < 0) {
    stepY = -1;
    sideDistY = (oy - mapY) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - oy) * deltaDistY;
  }

  let hit = false;
  let lado = 0;
  let iter = 0;

  while (!hit && iter < 50) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapX += stepX;
      lado = 0;
    } else {
      sideDistY += deltaDistY;
      mapY += stepY;
      lado = 1;
    }

    if (
      mapX < 0 ||
      mapX >= LARGURA_MAPA ||
      mapY < 0 ||
      mapY >= ALTURA_MAPA
    ) {
      break;
    }

    if (MAPA[mapY][mapX] > 0) {
      hit = true;
    }

    iter++;
  }

  if (!hit) return { dist: 0 };

  let dist;

  if (lado === 0) {
    dist = (mapX - ox + (1 - stepX) / 2) / cos;
  } else {
    dist = (mapY - oy + (1 - stepY) / 2) / sin;
  }

  return {
    dist: dist,
    mapX: mapX,
    mapY: mapY,
    lado: lado
  };
}

function renderizarCriaturas(zBuffer, numRaios, FOV, distProjecao) {
  const criaturasOrdenadas = criaturas.map(c => {
    const dx = c.x - jogador.x;
    const dy = c.y - jogador.y;

    return {
      c,
      dist: Math.sqrt(dx * dx + dy * dy)
    };
  }).sort((a, b) => b.dist - a.dist);

  criaturasOrdenadas.forEach(({ c, dist }) => {
    const dx = c.x - jogador.x;
    const dy = c.y - jogador.y;

    let angCriatura = Math.atan2(dy, dx) - jogador.angulo;

    while (angCriatura > Math.PI) angCriatura -= Math.PI * 2;
    while (angCriatura < -Math.PI) angCriatura += Math.PI * 2;

    if (Math.abs(angCriatura) > FOV / 2 + 0.3) return;

    const telaX = (W / 2) + (angCriatura / (FOV / 2)) * (W / 2);
    const tamanho = (1 / dist) * distProjecao * 0.8;
    const topo = (H - tamanho) / 2 - jogador.pulo * 100;

    const colInicio = Math.max(
      0,
      Math.floor((telaX - tamanho / 2) / (W / numRaios))
    );

    const colFim = Math.min(
      numRaios - 1,
      Math.floor((telaX + tamanho / 2) / (W / numRaios))
    );

    let visivel = false;

    for (let i = colInicio; i <= colFim; i++) {
      if (zBuffer[i] > dist) {
        visivel = true;
        break;
      }
    }

    if (!visivel) return;

    desenharCriatura(c, telaX, topo, tamanho, dist);
  });
}

function desenharCriatura(c, telaX, topo, tamanho, dist) {
  const cx = telaX;
  const cy = topo + tamanho / 2;

  const sombra = Math.max(0.3, 1 - dist / 12);
  const balanco = Math.sin(c.animacao) * tamanho * 0.05;

  const gradAura = ctx.createRadialGradient(
    cx,
    cy,
    0,
    cx,
    cy,
    tamanho * 0.8
  );

  gradAura.addColorStop(0, `rgba(139, 0, 0, ${0.3 * sombra})`);
  gradAura.addColorStop(1, 'rgba(139, 0, 0, 0)');

  ctx.fillStyle = gradAura;
  ctx.beginPath();
  ctx.arc(cx, cy, tamanho * 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = escurecer(c.tipo.cor, sombra);

  ctx.beginPath();
  ctx.arc(
    cx + balanco,
    topo + tamanho * 0.15,
    tamanho * 0.15,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillRect(
    cx - tamanho * 0.15 + balanco,
    topo + tamanho * 0.25,
    tamanho * 0.3,
    tamanho * 0.4
  );

  ctx.save();
  ctx.translate(cx + balanco, topo + tamanho * 0.3);
  ctx.rotate(Math.sin(c.animacao * 2) * 0.3);

  ctx.fillRect(-tamanho * 0.4, 0, tamanho * 0.3, tamanho * 0.08);
  ctx.fillRect(tamanho * 0.1, 0, tamanho * 0.3, tamanho * 0.08);

  ctx.restore();

  ctx.fillRect(
    cx - tamanho * 0.12 + balanco,
    topo + tamanho * 0.65,
    tamanho * 0.1,
    tamanho * 0.3
  );

  ctx.fillRect(
    cx + tamanho * 0.02 + balanco,
    topo + tamanho * 0.65,
    tamanho * 0.1,
    tamanho * 0.3
  );

  ctx.fillStyle = c.tipo.corOlho;
  ctx.shadowColor = c.tipo.corOlho;
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.arc(
    cx - tamanho * 0.05 + balanco,
    topo + tamanho * 0.13,
    tamanho * 0.025,
    0,
    Math.PI * 2
  );

  ctx.arc(
    cx + tamanho * 0.05 + balanco,
    topo + tamanho * 0.13,
    tamanho * 0.025,
    0,
    Math.PI * 2
  );

  ctx.fill();
  ctx.shadowBlur = 0;
}

function renderizarPistas(zBuffer, numRaios, FOV, distProjecao) {
  PISTAS.forEach((p, idx) => {
    if (pistasColetadas.includes(idx)) return;

    const dx = p.x - jogador.x;
    const dy = p.y - jogador.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let ang = Math.atan2(dy, dx) - jogador.angulo;

    while (ang > Math.PI) ang -= Math.PI * 2;
    while (ang < -Math.PI) ang += Math.PI * 2;

    if (Math.abs(ang) > FOV / 2) return;

    const telaX = (W / 2) + (ang / (FOV / 2)) * (W / 2);
    const tamanho = (1 / dist) * distProjecao * 0.3;
    const topo = (H - tamanho) / 2 - jogador.pulo * 100 + tamanho * 0.3;

    const col = Math.floor(telaX / (W / numRaios));

    if (col < 0 || col >= numRaios) return;
    if (zBuffer[col] < dist) return;

    const pulso = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;

    const grad = ctx.createRadialGradient(
      telaX,
      topo,
      0,
      telaX,
      topo,
      tamanho
    );

    grad.addColorStop(0, `rgba(255, 100, 255, ${0.8 * pulso})`);
    grad.addColorStop(0.5, `rgba(139, 0, 139, ${0.4 * pulso})`);
    grad.addColorStop(1, 'rgba(139, 0, 139, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(telaX, topo, tamanho, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(212, 197, 160, ${pulso})`;

    ctx.fillRect(
      telaX - tamanho * 0.3,
      topo - tamanho * 0.4,
      tamanho * 0.6,
      tamanho * 0.8
    );

    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 2;

    ctx.strokeRect(
      telaX - tamanho * 0.3,
      topo - tamanho * 0.4,
      tamanho * 0.6,
      tamanho * 0.8
    );

    ctx.fillStyle = '#8b0000';
    ctx.font = `${tamanho * 0.5}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✟', telaX, topo + tamanho * 0.1);
  });
}

function escurecer(corHex, fator) {
  const r = parseInt(corHex.substr(1, 2), 16);
  const g = parseInt(corHex.substr(3, 2), 16);
  const b = parseInt(corHex.substr(5, 2), 16);

  return `rgb(${Math.floor(r * fator)}, ${Math.floor(g * fator)}, ${Math.floor(b * fator)})`;
}

function atualizarHUD() {
  document.getElementById('vida').textContent = Math.max(0, Math.floor(jogador.vida));
  document.getElementById('pistas').textContent = jogador.pistas;
  document.getElementById('kills').textContent = jogador.kills;
}

function gameOver() {
  jogoAtivo = false;

  document.getElementById('pontuacao-final').textContent = pontuacao;

  mostrarTela('tela-gameover');
}

function vencer() {
  jogoAtivo = false;
  pontuacao += 100;

  document.getElementById('pontuacao-vitoria').textContent = pontuacao;

  mostrarTela('tela-vitoria');
}

let ultimoTempo = 0;

function gameLoop(tempo) {
  if (!jogoAtivo) return;
  if (jogoPausado) return;

  atualizar();
  renderizar();

  requestAnimationFrame(gameLoop);
}


// Evita que a página role enquanto o jogador usa os controles.
document.addEventListener('touchmove', (e) => {
  if (document.getElementById('tela-jogo').classList.contains('ativa')) {
    if (
      e.target.tagName !== 'BUTTON' &&
      !e.target.closest('.scroll-historia') &&
      !e.target.closest('.modal-conteudo')
    ) {
      e.preventDefault();
    }
  }
}, { passive: false });


// Limpa controles presos ao soltar o toque ou perder o foco.
window.addEventListener('pointerup', () => {
  Object.keys(controlesMobile).forEach(k => {
    controlesMobile[k] = false;
  });

  document.querySelectorAll('.btn-dir.ativo').forEach(b => {
    b.classList.remove('ativo');
  });
});

window.addEventListener('blur', () => {
  Object.keys(controlesMobile).forEach(k => {
    controlesMobile[k] = false;
  });

  Object.keys(teclas).forEach(k => {
    teclas[k] = false;
  });
});

console.log('✟ Cemitério da Igualdade - Noite de Terror ✟');
console.log('Controles: WASD/Setas para mover, ESPAÇO para pular, E para interagir');