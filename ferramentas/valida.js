global.window = {}; require(require("path").resolve(process.argv[2])); const M = window.MODULO;
const prob = []; const tipos = {}; let n = 0;
function checa(v, onde) {
  const t = v.tipo || "multipla"; tipos[t] = (tipos[t] || 0) + 1;
  if (t === "multipla") { if (!v.q || v.opcoes.length !== 4 || v.opcoes.filter(o => o.ok).length !== 1 || v.opcoes.some(o => !o.porque)) prob.push(onde); }
  else if (t === "varias") { if (!v.q || v.opcoes.filter(o => o.ok).length < 2 || v.opcoes.some(o => !o.porque)) prob.push(onde); }
  else if (t === "simnao") { if (!v.itens || v.itens.length < 2 || v.itens.some(i => !i.porque || typeof i.ok !== "boolean")) prob.push(onde); }
  else if (t === "ligar") { const bs = v.pares.map(p => p.b); if (!v.q || v.pares.length < 2 || new Set(bs).size !== bs.length || v.pares.some(p => !p.porque) || (v.extras||[]).some(e => bs.includes(e))) prob.push(onde); }
  else if (t === "completar") { if (!v.q || v.q.split("___").length !== 2 || v.opcoes.filter(o => o.ok).length !== 1 || v.opcoes.some(o => !o.porque)) prob.push(onde); }
  else prob.push(onde + " tipo?");
}
M.licoes.forEach((l, i) => l.checagem && checa(l.checagem, "licao " + i));
const ids = new Set();
M.banco.forEach(c => { if (ids.has(c.id)) prob.push("id dup " + c.id); ids.add(c.id); if (!M.topicos[c.topico]) prob.push("topico " + c.id); if (c.variantes.length < 3) prob.push("poucas " + c.id); c.variantes.forEach((v, i) => { n++; checa(v, c.id + " " + i); }); });
console.log(M.licoes.length, "partes,", M.banco.length, "conceitos,", n, "perguntas", JSON.stringify(tipos), prob.length ? prob : "sem problemas");
