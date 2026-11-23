/* Trilha de Certificações — motor do curso.
 * Lê window.CATALOGO (conteudo/catalogo.js) e carrega o módulo pedido em ?m=<id>.
 * O módulo define window.MODULO = { id, cert, titulo, aprovacao, rodada, licoes: [...], banco: [...] }.
 * Formato completo do conteúdo: ver LEIA-ME.md.
 */
(function () {
  "use strict";

  // ---------- utilidades ----------
  const $ = (sel, raiz) => (raiz || document).querySelector(sel);
  const LETRAS = "ABCDEFGH";

  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const armazem = {
    ler(chave, padrao) {
      try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; }
    },
    gravar(chave, valor) {
      try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* sem armazenamento: segue sem salvar */ }
    }
  };

  // ---------- tema ----------
  const TEMAS = ["auto", "light", "dark"];
  const NOME_TEMA = { auto: "Tema: auto", light: "Tema: claro", dark: "Tema: escuro" };
  function aplicarTema(t) {
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    const b = $("#btn-tema"); if (b) b.textContent = NOME_TEMA[t];
  }
  function iniciarTema() {
    let atual = armazem.ler("trilha:tema", "auto");
    aplicarTema(atual);
    const b = $("#btn-tema");
    if (b) b.addEventListener("click", () => {
      atual = TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
      armazem.gravar("trilha:tema", atual); aplicarTema(atual);
    });
  }

  // ---------- progresso ----------
  const chaveModulo = (id) => "trilha:v1:" + id;
  function lerProgresso(id) {
    return armazem.ler(chaveModulo(id), { passo: 0, conceitos: {}, tentativas: [], aprovado: false });
  }
  function gravarProgresso(id, p) { armazem.gravar(chaveModulo(id), p); }

  // ---------- catálogo (index.html) ----------
  function todosModulos() {
    const lista = [];
    (window.CATALOGO || []).forEach((c) => (c.modulos || []).forEach((m) => lista.push(Object.assign({ cert: c }, m))));
    return lista;
  }

  function renderCatalogo() {
    const alvo = $("#catalogo");
    if (!alvo) return;
    alvo.innerHTML = "";
    (window.CATALOGO || []).forEach((c) => {
      const bloco = document.createElement("section");
      bloco.style.marginBottom = "28px";
      bloco.innerHTML = `<div class="rotulo">${c.numero} · ${c.nivel}</div><h2>${c.nome}</h2>` +
        (c.nota ? `<p class="pequeno">${c.nota}</p>` : "");
      const lista = document.createElement("div");
      lista.className = "lista-modulos";
      (c.modulos || []).forEach((m) => {
        const p = lerProgresso(m.id);
        const a = document.createElement("a");
        a.className = "card modulo" + (m.pronto ? "" : " bloqueado");
        a.href = m.pronto ? "curso.html?m=" + encodeURIComponent(m.id) : "#";
        let selo = "";
        if (!m.pronto) selo = `<span class="selo pendente">em breve</span>`;
        else if (p.aprovado) selo = `<span class="selo aprovado">aprovado</span>`;
        else if (p.tentativas.length) selo = `<span class="selo pendente">melhor nota ${Math.max(...p.tentativas.map((t) => t.nota))}%</span>`;
        a.innerHTML = `<strong>${m.titulo}</strong>${selo}<div class="meta">${m.descricao || ""}</div>`;
        lista.appendChild(a);
      });
      bloco.appendChild(lista);
      alvo.appendChild(bloco);
    });
  }

  // ---------- curso (curso.html) ----------
  let M = null;        // módulo carregado
  let P = null;        // progresso
  let estado = null;   // { modo: 'licao'|'quiz'|'resultado', ... }

  function carregarModulo() {
    const id = new URLSearchParams(location.search).get("m");
    const meta = todosModulos().find((m) => m.id === id && m.pronto);
    if (!meta) { mostrarErro("Módulo não encontrado. Volte ao início e escolha um módulo."); return; }
    const s = document.createElement("script");
    s.src = "conteudo/" + meta.arquivo;
    s.onload = () => {
      if (!window.MODULO) { mostrarErro("O arquivo do módulo não definiu window.MODULO."); return; }
      M = window.MODULO; M.id = meta.id;
      P = lerProgresso(M.id);
      document.title = M.titulo + " · Trilha";
      $(".titulo-modulo").textContent = M.cert + " · " + M.titulo;
      iniciarLicao(Math.min(P.passo || 0, M.licoes.length - 1));
    };
    s.onerror = () => mostrarErro("Não consegui carregar o conteúdo do módulo.");
    document.body.appendChild(s);
  }

  function mostrarErro(msg) {
    $("#palco").innerHTML = `<div class="card"><h2>Ops</h2><p>${msg}</p><p><a href="index.html">Voltar ao início</a></p></div>`;
    $(".nav").classList.add("oculto");
  }

  function progressoBarra(fracao) { $(".barra > i").style.width = Math.round(fracao * 100) + "%"; }

  function configurarNav(opcoes) {
    const ant = $("#btn-ant"), prox = $("#btn-prox"), cont = $("#contador");
    $(".nav").classList.remove("oculto");
    ant.textContent = opcoes.antTexto || "Voltar";
    prox.textContent = opcoes.proxTexto || "Avançar";
    ant.disabled = !opcoes.ant; prox.disabled = !opcoes.prox;
    ant.onclick = opcoes.ant || null; prox.onclick = opcoes.prox || null;
    ant.classList.toggle("oculto", !!opcoes.semAnt);
    cont.textContent = opcoes.contador || "";
  }

  // Renderiza uma pergunta (checagem da lição ou questão da prova).
  // Ao responder, mostra o porquê de TODAS as alternativas.
  function renderPergunta(caixa, variante, aoResponder) {
    const opcoes = embaralhar(variante.opcoes);
    caixa.innerHTML = `<p class="pergunta">${variante.q}</p><div class="opcoes"></div><div class="feedback oculto"></div>`;
    const lista = $(".opcoes", caixa);
    const botoes = opcoes.map((op, i) => {
      const b = document.createElement("button");
      b.className = "opcao";
      b.innerHTML = `<span class="letra">${LETRAS[i]}</span><span class="corpo-op"><span>${op.t}</span><span class="porque oculto"></span></span>`;
      b.addEventListener("click", () => responder(i));
      lista.appendChild(b);
      return b;
    });
    let respondida = false;
    function responder(i) {
      if (respondida) return;
      respondida = true;
      const acertou = !!opcoes[i].ok;
      botoes.forEach((b, k) => {
        b.disabled = true;
        if (opcoes[k].ok) b.classList.add("certa");
        else if (k === i) b.classList.add("errada");
        const pq = $(".porque", b);
        if (opcoes[k].porque) { pq.innerHTML = opcoes[k].porque; pq.classList.remove("oculto"); }
      });
      const fb = $(".feedback", caixa);
      fb.className = "feedback " + (acertou ? "ok" : "nok");
      fb.textContent = acertou ? "Certo!" : "Não foi dessa vez. Leia o porquê de cada alternativa.";
      if (aoResponder) aoResponder(acertou);
    }
    caixa._responderPorTecla = (i) => { if (i < botoes.length) responder(i); };
    return caixa;
  }

  // ----- lição -----
  function iniciarLicao(passo) {
    estado = { modo: "licao", passo };
    P.passo = passo; gravarProgresso(M.id, P);
    const L = M.licoes[passo];
    const palco = $("#palco");
    palco.innerHTML = "";
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<div class="rotulo"><b>${L.secao || ""}</b> ${L.secao ? "·" : ""} Parte ${passo + 1} de ${M.licoes.length}</div>` +
      `<h2>${L.titulo}</h2><div class="corpo">${L.html}</div>`;
    palco.appendChild(card);

    let liberado = true;
    if (L.checagem) {
      liberado = false;
      const ch = document.createElement("div");
      ch.className = "checagem";
      ch.innerHTML = `<div class="rotulo">Checagem rápida</div><div class="caixa-pergunta"></div>`;
      card.appendChild(ch);
      estado.caixa = renderPergunta($(".caixa-pergunta", ch), L.checagem, () => { liberado = true; atualizarNav(); });
    }
    window.scrollTo({ top: 0 });
    progressoBarra(passo / (M.licoes.length));

    const ultimo = passo === M.licoes.length - 1;
    function atualizarNav() {
      configurarNav({
        ant: passo > 0 ? () => iniciarLicao(passo - 1) : null,
        prox: liberado ? (ultimo ? iniciarQuiz : () => iniciarLicao(passo + 1)) : null,
        proxTexto: ultimo ? "Ir para a prova" : (liberado ? "Avançar" : "Responda para avançar"),
        contador: `${passo + 1}/${M.licoes.length}`
      });
    }
    atualizarNav();
  }

  // ----- prova -----
  // Sorteio ponderado: conceitos errados recentemente têm mais chance de voltar.
  function sortearConceitos(n, soErros) {
    let base = M.banco.slice();
    if (soErros) base = base.filter((c) => P.conceitos[c.id] && P.conceitos[c.id].ultimoErro);
    const peso = (c) => {
      const s = P.conceitos[c.id];
      if (!s) return 2;                       // nunca visto: prioridade média-alta
      return 1 + (s.ultimoErro ? 4 : 0) + Math.min(s.erros, 3) * 0.5;
    };
    const escolhidos = [];
    while (escolhidos.length < n && base.length) {
      const total = base.reduce((acc, c) => acc + peso(c), 0);
      let r = Math.random() * total, k = 0;
      for (; k < base.length - 1; k++) { r -= peso(base[k]); if (r <= 0) break; }
      escolhidos.push(base.splice(k, 1)[0]);
    }
    return escolhidos;
  }

  // Escolhe uma redação diferente da última vista para o conceito.
  function escolherVariante(conceito) {
    const s = P.conceitos[conceito.id];
    const idx = conceito.variantes.map((_, i) => i).filter((i) => !s || conceito.variantes.length === 1 || i !== s.ultimaVariante);
    const i = idx[Math.floor(Math.random() * idx.length)];
    return { i, v: conceito.variantes[i] };
  }

  function iniciarQuiz(soErros) {
    const n = Math.min(M.rodada || 10, M.banco.length);
    const conceitos = sortearConceitos(n, soErros === true);
    if (!conceitos.length) { iniciarQuiz(false); return; }
    const questoes = conceitos.map((c) => Object.assign({ conceito: c }, escolherVariante(c)));
    estado = { modo: "quiz", questoes, atual: 0, respostas: [], soErros: soErros === true };
    mostrarQuestao();
  }

  function mostrarQuestao() {
    const q = estado.questoes[estado.atual];
    const total = estado.questoes.length;
    const palco = $("#palco");
    palco.innerHTML = "";
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<div class="rotulo"><b>${estado.soErros ? "Revisão dos erros" : "Prova"}</b> · Questão ${estado.atual + 1} de ${total} · tópico ${q.conceito.topico}</div><div class="caixa-pergunta"></div>`;
    palco.appendChild(card);
    progressoBarra(estado.atual / total);
    window.scrollTo({ top: 0 });

    let respondeu = false;
    estado.caixa = renderPergunta($(".caixa-pergunta", card), q.v, (acertou) => {
      respondeu = true;
      estado.respostas[estado.atual] = acertou;
      const s = P.conceitos[q.conceito.id] || { acertos: 0, erros: 0 };
      if (acertou) s.acertos++; else s.erros++;
      s.ultimoErro = !acertou; s.ultimaVariante = q.i;
      P.conceitos[q.conceito.id] = s; gravarProgresso(M.id, P);
      nav();
    });
    function nav() {
      const ultimo = estado.atual === total - 1;
      configurarNav({
        semAnt: true,
        prox: respondeu ? (ultimo ? mostrarResultado : () => { estado.atual++; mostrarQuestao(); }) : null,
        proxTexto: respondeu ? (ultimo ? "Ver resultado" : "Próxima") : "Escolha uma alternativa",
        contador: `${estado.atual + 1}/${total}`
      });
    }
    nav();
  }

  function mostrarResultado() {
    const total = estado.questoes.length;
    const acertos = estado.respostas.filter(Boolean).length;
    const nota = Math.round((acertos / total) * 100);
    const corte = M.aprovacao || 70;
    const passou = nota >= corte;
    const data = new Date().toISOString().slice(0, 10);
    if (!estado.soErros) {
      P.tentativas.push({ data, nota, total });
      if (passou) P.aprovado = true;
    }
    gravarProgresso(M.id, P);
    estado.modo = "resultado";
    progressoBarra(1);

    // desempenho por tópico
    const porTopico = {};
    estado.questoes.forEach((q, i) => {
      const t = q.conceito.topico;
      porTopico[t] = porTopico[t] || { ok: 0, n: 0 };
      porTopico[t].n++; if (estado.respostas[i]) porTopico[t].ok++;
    });
    const nomes = M.topicos || {};
    const linhas = Object.keys(porTopico).sort().map((t) => {
      const v = porTopico[t]; const pct = Math.round((v.ok / v.n) * 100);
      return `<div class="topico-linha"><span>${t} ${nomes[t] || ""}</span><span class="trilho"><i class="${pct < corte ? "fraco" : ""}" style="width:${pct}%"></i></span><span>${v.ok}/${v.n}</span></div>`;
    }).join("");

    const erros = estado.questoes.filter((_, i) => !estado.respostas[i]);
    const listaErros = erros.length
      ? `<h3>Para revisar</h3><ul>${erros.map((q) => `<li>${q.conceito.resumo || q.conceito.id} <span class="pequeno">(tópico ${q.conceito.topico})</span></li>`).join("")}</ul>`
      : "";

    const certificado = passou && !estado.soErros
      ? `<div class="certificado"><div class="rotulo">Módulo concluído</div><div class="nome">${M.titulo}</div><div class="pequeno">${M.cert} · ${nota}% em ${data}</div></div>`
      : "";

    const temErros = M.banco.some((c) => P.conceitos[c.id] && P.conceitos[c.id].ultimoErro);
    $("#palco").innerHTML = `<article class="card">
      <div class="rotulo">${estado.soErros ? "Resultado da revisão" : "Resultado da prova"}</div>
      <div class="placar ${passou ? "" : "reprovado"}">${nota}%</div>
      <p>${acertos} de ${total} certas. Nota de corte: ${corte}%. ${passou ? "Aprovado!" : "Ainda não. As questões que você errou vão aparecer com mais frequência na próxima rodada."}</p>
      ${certificado}
      <h3>Por tópico</h3>${linhas}
      ${listaErros}
      <div class="acoes">
        <button class="btn primario" id="r-nova">Nova rodada</button>
        ${temErros ? `<button class="btn" id="r-erros">Treinar só os erros</button>` : ""}
        <button class="btn" id="r-licao">Rever a lição</button>
        <a class="btn" href="index.html" style="text-decoration:none">Início</a>
      </div>
      <p class="pequeno" style="margin-top:18px">Cada rodada sorteia ${Math.min(M.rodada || 10, M.banco.length)} de ${M.banco.length} conceitos, com redações diferentes e alternativas embaralhadas.</p>
    </article>`;
    $("#r-nova").onclick = () => iniciarQuiz(false);
    if ($("#r-erros")) $("#r-erros").onclick = () => iniciarQuiz(true);
    $("#r-licao").onclick = () => iniciarLicao(0);
    $(".nav").classList.add("oculto");
    window.scrollTo({ top: 0 });
  }

  // ---------- teclado ----------
  document.addEventListener("keydown", (e) => {
    if (!estado || e.ctrlKey || e.metaKey || e.altKey) return;
    const tecla = e.key.toUpperCase();
    const idx = LETRAS.indexOf(tecla) >= 0 && tecla.length === 1 ? LETRAS.indexOf(tecla) : ("1234".indexOf(e.key));
    if (idx >= 0 && estado.caixa && estado.caixa._responderPorTecla) { estado.caixa._responderPorTecla(idx); return; }
    if (e.key === "ArrowRight" || e.key === "Enter") { const b = $("#btn-prox"); if (b && !b.disabled && !$(".nav").classList.contains("oculto")) b.click(); }
    if (e.key === "ArrowLeft") { const b = $("#btn-ant"); if (b && !b.disabled && !b.classList.contains("oculto")) b.click(); }
  });

  // ---------- início ----------
  document.addEventListener("DOMContentLoaded", () => {
    iniciarTema();
    if ($("#catalogo")) renderCatalogo();
    if ($("#palco")) carregarModulo();
  });

  // exposto para testes automáticos
  window.__trilha = { embaralhar, sortearConceitos: (...a) => sortearConceitos(...a) };
})();
