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
  },
  {
    // Pesos: study guide oficial do SC-900, "skills measured as of October 21, 2026" (conferido em 2026-11-25).
    numero: "02",
    nivel: "fácil",
    nome: "Microsoft SC-900: Security, Compliance, and Identity Fundamentals",
    nota: "Prova de 45 minutos, aprovação com 700 de 1000, disponível em português. As perguntas aqui são em inglês, porque os produtos têm nome em inglês, e as explicações em português.",
    modulos: [
      { id: "02-sc-900/d1", arquivo: "02-sc-900/d1-conceitos.js", pronto: true,
        titulo: "Domínio 1 · Security, compliance and identity concepts", descricao: "10–15% da prova · responsabilidade compartilhada, Zero Trust, criptografia, GRC, identidade e federação" },
      { id: "02-sc-900/d2", pronto: false, titulo: "Domínio 2 · Microsoft Entra", descricao: "25–30% da prova" },
      { id: "02-sc-900/d3", pronto: false, titulo: "Domínio 3 · Microsoft security solutions", descricao: "35–40% da prova" },
      { id: "02-sc-900/d4", pronto: false, titulo: "Domínio 4 · Microsoft compliance solutions", descricao: "20–25% da prova" }
    ]
  }
];
