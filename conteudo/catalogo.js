/* Lista de certificações e módulos. Só módulos com pronto: true aparecem clicáveis.
 * Pesos dos domínios: exam outline oficial da ISC2, vigente desde 2026-09-01 (conferido em 2026-11-23). */
window.CATALOGO = [
  {
    numero: "01",
    nivel: "fácil",
    nome: "ISC2 Certified in Cybersecurity (CC)",
    nota: "Prova em inglês: 100 a 125 itens, 2 horas, aprovação com 700 de 1000. As perguntas aqui também são em inglês, e as explicações em português.",
    modulos: [
      { id: "01-isc2-cc/d1", arquivo: "01-isc2-cc/d1-security-principles.js", pronto: true,
        titulo: "Domínio 1 · Security Principles", descricao: "24% da prova · CIA, AAA, risco, governança, controles e ética" },
      { id: "01-isc2-cc/d2", pronto: false, titulo: "Domínio 2 · Security Governance", descricao: "17,3% da prova" },
      { id: "01-isc2-cc/d3", pronto: false, titulo: "Domínio 3 · IAM Concepts", descricao: "20% da prova" },
      { id: "01-isc2-cc/d4", pronto: false, titulo: "Domínio 4 · Networking and Cloud Security", descricao: "21,3% da prova" },
      { id: "01-isc2-cc/d5", pronto: false, titulo: "Domínio 5 · Security Operations and Incident Response", descricao: "17,3% da prova" }
    ]
  }
];
