/* Microsoft SC-900 · Domínio 1 · Concepts of security, compliance, and identity (10–15%)
 * Base: study guide oficial do SC-900, "skills measured as of October 21, 2026" (conferido em 2026-11-25),
 * e os módulos do Microsoft Learn "Describe security concepts and methodologies" e "Describe identity concepts".
 * Conteúdo escrito do zero. Não contém perguntas reais da prova.
 * Lições em português (termos da prova em inglês). Perguntas da prova em inglês; explicações em português.
 */
window.MODULO = {
  cert: "SC-900",
  titulo: "Domínio 1 · Security, compliance and identity concepts",
  aprovacao: 70,
  rodada: 10,
  topicos: {
    "1.1": "Conceitos de segurança e conformidade",
    "1.2": "Conceitos de identidade"
  },

  licoes: [
    // ------------------------------------------------------------------ abertura
    {
      secao: "",
      titulo: "O que tem neste módulo",
      html: `
<p>A SC-900 tem quatro áreas. Este módulo é a primeira, a de <span class="termo">conceitos</span>. Vale <b>10 a 15%</b> da prova, mas é a base das outras três.</p>
<div class="degraus">
  <div class="degrau cheio surge d1"><b>1</b> Conceitos de segurança, conformidade e identidade · 10–15% <span class="pequeno">(este módulo)</span></div>
  <div class="degrau surge d2"><b>2</b> Microsoft Entra · 25–30%</div>
  <div class="degrau surge d3"><b>3</b> Soluções de segurança (Azure, Defender, Sentinel) · 35–40%</div>
  <div class="degrau surge d4"><b>4</b> Soluções de conformidade (Purview) · 20–25%</div>
</div>
<p>Aqui são duas partes:</p>
<ul>
<li><b>1.1</b> Segurança e conformidade: responsabilidade compartilhada, defesa em profundidade, Zero Trust, criptografia e hash, GRC.</li>
<li><b>1.2</b> Identidade: identidade como perímetro, autenticação e autorização, IdP, diretório e Active Directory, federação.</li>
</ul>
<div class="nota">Muita coisa você já viu na ISC2 CC ou faz no trabalho. A SC-900 cobra do <b>jeito da Microsoft</b>: listas com nomes e quantidades exatas (7 camadas, 3 princípios, 4 pilares). É isso que este módulo treina.</div>
<p class="pequeno">A prova tem 45 minutos e aprovação com 700 de 1000. Existe em português, mas as perguntas aqui estão em inglês, porque os nomes dos produtos são em inglês e a versão em inglês é atualizada primeiro.</p>`
    },

    // ------------------------------------------------------------------ 1.1 shared responsibility
    {
      secao: "1.1",
      titulo: "Shared responsibility model",
      html: `
<p>Na nuvem, a segurança é dividida entre o <span class="termo">provedor</span> (Microsoft) e o <span class="termo">cliente</span>. Quanto mais "pronto" é o serviço, mais coisa fica com o provedor.</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Camada</th><th>On-premises</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr>
<tr><td>Datacenter, rede física, hosts</td><td>Cliente</td><td>Provedor</td><td>Provedor</td><td>Provedor</td></tr>
<tr><td>Sistema operacional</td><td>Cliente</td><td><b>Cliente</b></td><td>Provedor</td><td>Provedor</td></tr>
<tr><td>Aplicação e controles de rede dela</td><td>Cliente</td><td>Cliente</td><td><b>Cliente</b> (código e config)</td><td>Provedor</td></tr>
<tr><td><b>Dados, identidades, dispositivos, configuração</b></td><td>Cliente</td><td>Cliente</td><td>Cliente</td><td><b>Cliente</b></td></tr>
</table></div>
<p>A última linha é a pegadinha preferida da prova. Em <b>qualquer</b> modelo, o cliente continua dono de:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Dados <span class="en">(information and data)</span></div>
  <div class="degrau surge d2"><b>2</b> Contas e identidades <span class="en">(accounts and identities)</span></div>
  <div class="degrau surge d3"><b>3</b> Dispositivos <span class="en">(devices / endpoints)</span></div>
  <div class="degrau surge d4"><b>4</b> Configurações que ele escolhe <span class="en">(tenant settings, permissions)</span></div>
</div>
<div class="prova-dica">o provedor pode fazer o trabalho, mas a <b>responsabilidade</b> (accountability) pelos dados e identidades nunca é transferida.</div>
<p class="pequeno">O Learn agora também fala de responsabilidade compartilhada em IA, com três camadas: plataforma, aplicação e uso. Proteger os dados que vão para o modelo, quem acessa o app e o treinamento dos usuários continua com o cliente.</p>`,
      checagem: {
        q: "Uma empresa usa o Microsoft 365 (SaaS). Quem é responsável por definir quem tem conta e com quais permissões?",
        opcoes: [
          { t: "O cliente", ok: true, porque: "Contas e identidades ficam sempre com o cliente, inclusive em SaaS." },
          { t: "A Microsoft, porque o serviço é SaaS", porque: "Em SaaS a Microsoft cuida da aplicação e da infraestrutura, mas não decide quem usa o serviço." },
          { t: "Os dois, em partes iguais", porque: "A plataforma de identidade é da Microsoft, mas a decisão sobre contas e permissões é só do cliente." },
          { t: "Ninguém: o SaaS já vem com as permissões certas", porque: "Nenhum provedor sabe quem na sua empresa deve acessar o quê." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 defense in depth
    {
      secao: "1.1",
      titulo: "Defense in depth: as 7 camadas",
      html: `
<p><span class="termo">Defesa em profundidade</span> <span class="en">(defense in depth)</span> são várias camadas de proteção. Se uma falhar, a próxima segura o atacante. A Microsoft usa <b>sete camadas</b>, de fora para dentro:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Physical security: acesso ao prédio e ao hardware</div>
  <div class="degrau surge d2"><b>2</b> Identity and access: MFA, RBAC, Conditional Access</div>
  <div class="degrau surge d3"><b>3</b> Perimeter: proteção contra DDoS, firewall de borda</div>
  <div class="degrau surge d4"><b>4</b> Network: segmentação, NSGs, limitar a comunicação entre recursos</div>
  <div class="degrau surge d5"><b>5</b> Compute: patches, fechar portas, restringir acesso às VMs</div>
  <div class="degrau surge d6"><b>6</b> Application: desenvolvimento seguro, validação de entrada</div>
  <div class="degrau cheio surge d7"><b>7</b> Data: o que todas as outras protegem</div>
</div>
<p>As camadas servem para proteger a <b>CIA</b> que você já conhece da ISC2: <b>Confidentiality</b>, <b>Integrity</b> e <b>Availability</b>.</p>
<div class="prova-dica">se a pergunta descreve uma proteção e pede a camada, pense no que ela protege. DDoS é <b>perimeter</b>; segmentar sub-redes é <b>network</b>; patch na VM é <b>compute</b>; MFA é <b>identity and access</b>.</div>`,
      checagem: {
        q: "Uma empresa aplica os patches mais recentes do sistema operacional em todas as máquinas virtuais. Em qual camada da defesa em profundidade isso se encaixa?",
        opcoes: [
          { t: "Compute", ok: true, porque: "Manter a VM atualizada e com o mínimo de portas abertas é a camada de compute." },
          { t: "Network", porque: "Network trata de segmentação e do tráfego entre recursos, não do sistema operacional." },
          { t: "Application", porque: "Application é o código da aplicação (validação de entrada, desenvolvimento seguro)." },
          { t: "Perimeter", porque: "Perimeter é a borda: DDoS e firewall na entrada da rede." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 zero trust princípios
    {
      secao: "1.1",
      titulo: "Zero Trust: os 3 princípios",
      html: `
<p>O modelo antigo era o <span class="termo">castelo com fosso</span>: quem está dentro da rede é confiável. Com nuvem, trabalho remoto e celular pessoal, esse "dentro" deixou de existir. O <span class="termo">Zero Trust</span> é uma <b>estratégia</b> (não um produto) que parte do contrário: <i>nunca confie, sempre verifique</i>.</p>
<svg class="anim" viewBox="0 0 400 250" role="img" aria-label="Três princípios do Zero Trust">
  <g class="surge d1"><rect class="caixa" x="10" y="10" width="380" height="66" rx="12" style="stroke:var(--destaque);stroke-width:2"/>
    <text x="200" y="38" text-anchor="middle" font-weight="600" font-size="17">Verify explicitly</text>
    <text class="tx2" x="200" y="62" text-anchor="middle" font-size="14">decida com todos os sinais disponíveis</text></g>
  <g class="surge d2"><rect class="caixa" x="10" y="92" width="380" height="66" rx="12" style="stroke:var(--coral);stroke-width:2"/>
    <text x="200" y="120" text-anchor="middle" font-weight="600" font-size="17">Use least privileged access</text>
    <text class="tx2" x="200" y="144" text-anchor="middle" font-size="14">só o necessário, só pelo tempo necessário</text></g>
  <g class="surge d3"><rect class="caixa" x="10" y="174" width="380" height="66" rx="12" style="stroke:var(--roxo);stroke-width:2"/>
    <text x="200" y="202" text-anchor="middle" font-weight="600" font-size="17">Assume breach</text>
    <text class="tx2" x="200" y="226" text-anchor="middle" font-size="14">aja como se o atacante já estivesse dentro</text></g>
</svg>
<div class="tabela-rolagem"><table class="t">
<tr><th>Princípio</th><th>Na prática</th></tr>
<tr><td><b>Verify explicitly</b></td><td>Autenticar e autorizar com <b>todos os sinais</b>: identidade, localização, saúde do dispositivo, aplicativo, classificação do dado, anomalias.</td></tr>
<tr><td><b>Least privileged access</b></td><td><b>JIT</b> (just-in-time) e <b>JEA</b> (just-enough-access), políticas adaptativas por risco.</td></tr>
<tr><td><b>Assume breach</b></td><td>Segmentar o acesso para diminuir o estrago <span class="en">(blast radius)</span>, criptografar de ponta a ponta, monitorar e analisar.</td></tr>
</table></div>
<div class="ponte">quando uma política do PingFederate ou do PingAccess decide pelo contexto (rede, dispositivo, risco) e não só pela senha, isso é "verify explicitly".</div>`,
      checagem: {
        q: "Uma empresa divide a rede em segmentos pequenos para que um invasor numa máquina não alcance as outras. Qual princípio do Zero Trust é esse?",
        opcoes: [
          { t: "Assume breach", ok: true, porque: "Segmentar para limitar o estrago parte da ideia de que a invasão vai acontecer." },
          { t: "Verify explicitly", porque: "Verify explicitly é sobre usar todos os sinais na hora de autenticar e autorizar." },
          { t: "Use least privileged access", porque: "Least privilege limita as permissões de cada identidade; a segmentação de rede é a resposta a 'assume breach'." },
          { t: "Defense in depth", porque: "Defesa em profundidade é outro conceito, não um dos três princípios do Zero Trust." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 zero trust pilares
    {
      secao: "1.1",
      titulo: "Zero Trust: os pilares",
      html: `
<p>Os princípios são aplicados em <span class="termo">pilares</span> <span class="en">(foundational pillars)</span>. O Microsoft Learn atual lista <b>sete</b>:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Identities: usuários, serviços e dispositivos. É o plano de controle principal.</div>
  <div class="degrau surge d2"><b>2</b> Devices: dispositivo fora da conformidade é bloqueado ou limitado.</div>
  <div class="degrau surge d3"><b>3</b> Applications: visibilidade, inclusive de <i>shadow IT</i>, e das permissões dos apps.</div>
  <div class="degrau surge d4"><b>4</b> Data: classificar, rotular e criptografar.</div>
  <div class="degrau surge d5"><b>5</b> Infrastructure: versões em dia, configuração correta, acesso de admin JIT, telemetria.</div>
  <div class="degrau surge d6"><b>6</b> Networks: segmentação, microssegmentação, criptografia, monitoramento.</div>
  <div class="degrau cheio surge d7"><b>7</b> Visibility, automation and orchestration: junta os sinais dos outros seis (SIEM) e responde automaticamente (SOAR).</div>
</div>
<div class="nota">Materiais mais antigos falam em <b>seis</b> pilares: os de 1 a 6. O sétimo é o que integra os outros. Se aparecer "six foundational pillars" numa pergunta, a lista é a de 1 a 6.</div>
<div class="prova-dica">Identities é o pilar que costuma ser chamado de <b>plano de controle</b>. É por isso que se diz que a identidade é o novo perímetro (parte 1.2).</div>`,
      checagem: {
        q: "Qual destes NÃO é um pilar do Zero Trust na lista da Microsoft?",
        opcoes: [
          { t: "Firewalls", ok: true, porque: "Firewall é uma ferramenta, não um pilar. Os pilares são identities, devices, applications, data, infrastructure, networks e visibility/automation/orchestration." },
          { t: "Devices", porque: "Devices é um pilar: a saúde e a conformidade do dispositivo entram na decisão." },
          { t: "Data", porque: "Data é um pilar: classificar, rotular e criptografar." },
          { t: "Identities", porque: "Identities é o primeiro pilar e o plano de controle principal." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 criptografia
    {
      secao: "1.1",
      titulo: "Criptografia: tipos e estados",
      html: `
<p><span class="termo">Criptografia</span> <span class="en">(encryption)</span> deixa o dado ilegível para quem não tem a chave. Existem dois tipos:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Tipo</th><th>Chaves</th><th>Característica</th></tr>
<tr><td><b>Symmetric</b></td><td>A <b>mesma</b> chave cifra e decifra</td><td>Rápida, boa para muito dado. O problema é entregar a chave com segurança.</td></tr>
<tr><td><b>Asymmetric</b></td><td><b>Par</b> de chaves: pública e privada</td><td>O que a pública cifra, só a privada decifra. Usada no HTTPS e em e-mail.</td></tr>
</table></div>
<p>E o dado pode estar em três <span class="termo">estados</span>:</p>
<svg class="anim" viewBox="0 0 400 150" role="img" aria-label="Três estados do dado: at rest, in transit, in use">
  <g class="surge d1"><rect class="caixa" x="5" y="10" width="120" height="130" rx="12" style="stroke:var(--destaque);stroke-width:2"/>
    <text x="65" y="45" text-anchor="middle" font-weight="600" font-size="16">At rest</text>
    <text class="tx2" x="65" y="75" text-anchor="middle" font-size="14">disco, banco,</text>
    <text class="tx2" x="65" y="93" text-anchor="middle" font-size="14">storage</text></g>
  <g class="surge d2"><rect class="caixa" x="140" y="10" width="120" height="130" rx="12" style="stroke:var(--coral);stroke-width:2"/>
    <text x="200" y="45" text-anchor="middle" font-weight="600" font-size="16">In transit</text>
    <text class="tx2" x="200" y="75" text-anchor="middle" font-size="14">pela rede:</text>
    <text class="tx2" x="200" y="93" text-anchor="middle" font-size="14">TLS, VPN</text></g>
  <g class="surge d3"><rect class="caixa" x="275" y="10" width="120" height="130" rx="12" style="stroke:var(--roxo);stroke-width:2"/>
    <text x="335" y="45" text-anchor="middle" font-weight="600" font-size="16">In use</text>
    <text class="tx2" x="335" y="75" text-anchor="middle" font-size="14">na memória:</text>
    <text class="tx2" x="335" y="93" text-anchor="middle" font-size="14">confidential</text>
    <text class="tx2" x="335" y="111" text-anchor="middle" font-size="14">computing</text></g>
</svg>
<p><b>Gestão de chaves:</b> guardar a chave longe do dado, usar <span class="termo">HSM</span> (hardware à prova de violação), fazer rotação e controlar quem acessa. No Azure, o serviço para isso é o <b>Azure Key Vault</b> (aparece no domínio 3).</p>
<div class="prova-dica"><b>In use</b> é o estado novo: proteger o dado enquanto ele é processado, inclusive do sistema operacional e do hypervisor, com <b>enclaves seguros</b>.</div>`,
      checagem: {
        q: "Um banco de dados no Azure fica criptografado no disco. Que estado do dado está protegido?",
        opcoes: [
          { t: "At rest", ok: true, porque: "Dado guardado (disco, banco, storage) é dado em repouso." },
          { t: "In transit", porque: "In transit é o dado passando pela rede, protegido por TLS ou VPN." },
          { t: "In use", porque: "In use é o dado na memória durante o processamento." },
          { t: "Hashing", porque: "Hash não é um estado do dado, e não dá para reverter: não serviria para guardar um banco que precisa ser lido." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 hash e assinatura
    {
      secao: "1.1",
      titulo: "Hash, salt e assinatura digital",
      html: `
<p><span class="termo">Hash</span> <span class="en">(hashing)</span> não é criptografia. A diferença cai na prova:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th></th><th>Encryption</th><th>Hashing</th></tr>
<tr><td>Usa chave?</td><td>Sim</td><td><b>Não</b></td></tr>
<tr><td>Dá para voltar ao original?</td><td>Sim, com a chave</td><td><b>Não</b> (só ida)</td></tr>
<tr><td>Tamanho da saída</td><td>Varia com a entrada</td><td><b>Fixo</b></td></tr>
<tr><td>Mesma entrada, mesma saída?</td><td>Depende</td><td><b>Sempre</b></td></tr>
<tr><td>Uso típico</td><td>Sigilo</td><td>Guardar senha, detectar alteração</td></tr>
</table></div>
<p>Como o hash é sempre igual para a mesma entrada, um atacante pode pré-calcular hashes de senhas comuns (<span class="termo">rainbow tables</span>). Por isso se usa <span class="termo">salt</span>: um valor aleatório e único por senha, somado antes de calcular o hash. Duas pessoas com a mesma senha ficam com hashes diferentes.</p>
<p><span class="termo">Assinatura digital</span>: o remetente assina com a chave <b>privada</b> e qualquer um confere com a chave <b>pública</b>. Garante <b>autenticidade</b> (veio de quem diz) e <b>integridade</b> (não foi alterado).</p>
<div class="ponte">é exatamente o que acontece quando o PingFederate assina um token: assina com a chave privada, e o app confere com a pública (o JWKS que você já conhece).</div>`,
      checagem: {
        q: "Por que se adiciona um salt antes de calcular o hash de uma senha?",
        opcoes: [
          { t: "Para que senhas iguais gerem hashes diferentes e as rainbow tables não funcionem", ok: true, porque: "O salt é único por senha, então o hash pré-calculado de uma senha comum não serve mais." },
          { t: "Para permitir recuperar a senha original depois", porque: "Hash continua sendo só de ida, com ou sem salt." },
          { t: "Para transformar o hash em criptografia simétrica", porque: "O salt não é chave e não muda a natureza do hash." },
          { t: "Para deixar o hash menor", porque: "O tamanho do hash é fixo; o salt não muda isso." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 GRC
    {
      secao: "1.1",
      titulo: "GRC: Governance, Risk, Compliance",
      html: `
<p><span class="termo">GRC</span> é a forma organizada de lidar com regras, riscos e obrigações.</p>
<div class="degraus">
  <div class="degrau surge d1"><b>G</b> Governance: as regras, práticas e processos que <b>dirigem e controlam</b> a organização. Políticas, padrões de acesso, quem aprova acesso privilegiado, quem é dono de cada controle.</div>
  <div class="degrau surge d2"><b>R</b> Risk management: identificar, avaliar, responder e monitorar os riscos.</div>
  <div class="degrau surge d3"><b>C</b> Compliance: cumprir <b>leis, regulações, normas e políticas</b>. Exemplos: HIPAA (saúde nos EUA), ISO 27001, SOC 2, LGPD, GDPR.</div>
</div>
<p>O ciclo de risco tem quatro passos:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Passo</th><th>O que é</th></tr>
<tr><td><b>Identify</b></td><td>Listar o que pode dar errado</td></tr>
<tr><td><b>Assess</b></td><td>Impacto × probabilidade = nota do risco</td></tr>
<tr><td><b>Respond</b></td><td><b>Accept</b> (aceitar), <b>mitigate</b> (reduzir), <b>transfer</b> (seguro), <b>avoid</b> (deixar de fazer)</td></tr>
<tr><td><b>Monitor</b></td><td>Acompanhar, porque o risco muda</td></tr>
</table></div>
<div class="prova-dica">"compliance não é segurança". Cumprir uma norma é o mínimo exigido, não a garantia de estar protegido.</div>`,
      checagem: {
        q: "Uma empresa contrata um seguro contra incidentes cibernéticos. Qual resposta ao risco é essa?",
        opcoes: [
          { t: "Transfer", ok: true, porque: "O seguro passa o impacto financeiro para outra parte." },
          { t: "Mitigate", porque: "Mitigar é reduzir a chance ou o impacto com controles. O seguro não reduz nada, só paga." },
          { t: "Accept", porque: "Aceitar seria não fazer nada e arcar com o risco." },
          { t: "Avoid", porque: "Evitar seria deixar de fazer a atividade que gera o risco." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 residency, sovereignty, privacy
    {
      secao: "1.1",
      titulo: "Data residency, sovereignty e privacy",
      html: `
<p>Três termos parecidos que a prova adora trocar:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Termo</th><th>Pergunta que responde</th></tr>
<tr><td><b>Data residency</b></td><td><b>Onde</b> o dado fica guardado fisicamente, e como pode ser transferido, processado ou acessado entre países.</td></tr>
<tr><td><b>Data sovereignty</b></td><td><b>Qual lei vale</b>: o dado está sujeito às leis do país ou região onde é coletado, guardado ou processado.</td></tr>
<tr><td><b>Data privacy</b></td><td><b>Como tratar dado pessoal</b>: transparência, consentimento, direitos do titular (acessar, corrigir, apagar), proteção contra acesso indevido.</td></tr>
</table></div>
<p class="surge d1">Um jeito de lembrar: <b>residency</b> = residência = endereço. <b>Sovereignty</b> = soberania = lei do país. <b>Privacy</b> = a pessoa dona do dado.</p>
<div class="ponte">a LGPD é uma lei de <b>privacy</b>. Quando um cliente exige que os dados fiquem em datacenter no Brasil, isso é <b>residency</b>.</div>`,
      checagem: {
        q: "Dados de clientes europeus guardados num datacenter da Alemanha ficam sujeitos às leis alemãs e da UE. Que conceito é esse?",
        opcoes: [
          { t: "Data sovereignty", ok: true, porque: "Soberania é a regra de que o dado segue a lei do lugar onde é coletado ou guardado." },
          { t: "Data residency", porque: "Residency é sobre onde o dado fica. Aqui a pergunta é qual lei se aplica." },
          { t: "Data privacy", porque: "Privacy trata do uso correto de dado pessoal, não de qual jurisdição vale." },
          { t: "Zero Trust", porque: "Zero Trust é um modelo de segurança, nada a ver com jurisdição." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.2 identidade como perímetro
    {
      secao: "1.2",
      titulo: "Identity como o perímetro principal",
      html: `
<p>O perímetro de rede (firewall, VPN) perdeu força por cinco motivos: <b>apps em nuvem e SaaS</b>, <b>trabalho remoto e híbrido</b>, <b>dispositivos pessoais</b> (BYOD), <b>acesso de parceiros e clientes</b> e <b>IoT</b>. O que sobra em comum em todo acesso é a identidade. Por isso: <span class="termo">identity is the primary security perimeter</span>.</p>
<p>Tipos de identidade que o Learn cita: <b>humana</b>, <b>dispositivo</b>, <b>workload</b> (apps e serviços) e, agora, <b>agentes de IA</b>.</p>
<p>A infraestrutura de identidade se apoia em <b>quatro pilares</b>:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Administration: criar, alterar e remover identidades (ciclo de vida) e as políticas que as governam</div>
  <div class="degrau surge d2"><b>2</b> Authentication: provar quem é</div>
  <div class="degrau surge d3"><b>3</b> Authorization: o que a identidade pode fazer, inclusive pelo contexto do pedido</div>
  <div class="degrau surge d4"><b>4</b> Auditing: logs de entrada, relatórios, alertas de anomalia, investigação</div>
</div>
<div class="prova-dica">os quatro pilares da identidade começam todos com "A". Na ISC2 era AAA (com Accounting); aqui é <b>Administration, Authentication, Authorization, Auditing</b>.</div>`,
      checagem: {
        q: "Qual pilar da infraestrutura de identidade cuida de criar a conta de um funcionário novo e de desativá-la quando ele sai?",
        opcoes: [
          { t: "Administration", ok: true, porque: "Criar, alterar e remover identidades (o ciclo de vida) é administration." },
          { t: "Authentication", porque: "Authentication é provar a identidade no login, não criar a conta." },
          { t: "Authorization", porque: "Authorization decide o que a identidade pode fazer, depois que ela existe." },
          { t: "Auditing", porque: "Auditing registra e investiga o que aconteceu." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.2 authn, authz, IdP
    {
      secao: "1.2",
      titulo: "Authentication, authorization e o identity provider",
      html: `
<p>Esta parte é o seu dia a dia, então vai rápido. O que a prova cobra:</p>
<ul>
<li><b>Authentication</b> (AuthN): "quem é você?". Vem <b>sempre antes</b>.</li>
<li><b>Authorization</b> (AuthZ): "o que você pode fazer?". Por papéis, permissões e atributos, com <b>least privilege</b>.</li>
<li><b>MFA:</b> dois ou mais fatores de <b>categorias diferentes</b> (sabe, tem, é).</li>
</ul>
<p><span class="termo">Modern authentication</span>: os apps não autenticam ninguém sozinhos. Quem faz isso é um serviço central, o <span class="termo">identity provider (IdP)</span>, que emite um <b>token</b> em que o app confia.</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Protocolo</th><th>Para quê, no jeito do Learn</th></tr>
<tr><td><b>OpenID Connect</b></td><td>Autenticação (em cima do OAuth 2.0). Gera o <b>ID token</b>.</td></tr>
<tr><td><b>OAuth 2.0</b></td><td>Autorização. Gera o <b>access token</b>.</td></tr>
<tr><td><b>SAML</b></td><td>Apps corporativos e mais antigos, e federação entre organizações.</td></tr>
</table></div>
<p><span class="termo">Single sign-on (SSO)</span>: entra uma vez e acessa todos os apps que confiam no mesmo IdP. Benefícios: menos senhas, melhor experiência e controle central (desativou a conta, perdeu o acesso a tudo).</p>
<div class="ponte">o PingFederate é um IdP. No mundo Microsoft, o IdP é o <b>Microsoft Entra ID</b>. Outros que o Learn cita: Google, Amazon, LinkedIn, GitHub.</div>`,
      checagem: {
        q: "Qual é o principal benefício do single sign-on?",
        opcoes: [
          { t: "O usuário se autentica uma vez e acessa vários aplicativos", ok: true, porque: "É a definição de SSO: uma credencial, um login, vários apps que confiam no mesmo IdP." },
          { t: "Elimina a necessidade de autorização", porque: "Cada app continua decidindo o que o usuário pode fazer." },
          { t: "Substitui o MFA", porque: "SSO e MFA se combinam; um não substitui o outro." },
          { t: "Faz a senha nunca expirar", porque: "A política de senha não tem relação com SSO." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.2 directory e AD
    {
      secao: "1.2",
      titulo: "Directory services: AD DS e Entra ID",
      html: `
<p>Um <span class="termo">diretório</span> guarda objetos (usuários, grupos, dispositivos, apps, políticas). O <span class="termo">directory service</span> é o software que guarda e entrega esses dados.</p>
<p>O <b>Active Directory Domain Services (AD DS)</b> é o diretório on-premises da Microsoft, desde o Windows 2000 Server. O servidor que roda o AD DS é o <span class="termo">domain controller (DC)</span>. Ele autentica com <b>Kerberos</b> e <b>NTLM</b>, organiza objetos em <b>OUs</b> e aplica <b>Group Policy</b>.</p>
<p>O AD DS foi feito para a rede interna. As limitações que o Learn lista:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Não autentica nativamente apps em nuvem e SaaS</div>
  <div class="degrau surge d2"><b>2</b> Não gerencia nativamente iOS, Android e outros não-Windows</div>
  <div class="degrau surge d3"><b>3</b> Não suporta nativamente OAuth 2.0 nem OpenID Connect</div>
  <div class="degrau surge d4"><b>4</b> Usuário remoto precisa de VPN</div>
</div>
<p>O <b>Microsoft Entra ID</b> (antigo Azure AD) é o diretório e IdP <b>na nuvem</b>, no modelo <span class="termo">IDaaS</span> (Identity as a Service): suporta os protocolos modernos, qualquer dispositivo, apps SaaS, e não precisa de VPN.</p>
<p><span class="termo">Hybrid identity</span>: sincronizar o AD DS com o Entra ID para a pessoa usar a mesma credencial nos dois lados. Detalhes no módulo 2.</p>
<div class="ponte">o PingDirectory também é um directory service (LDAP). O AD DS é o equivalente da Microsoft para a rede interna.</div>`,
      checagem: {
        q: "Uma empresa precisa de um serviço de identidade que funcione para apps SaaS e para usuários remotos sem VPN. O que atende melhor?",
        opcoes: [
          { t: "Microsoft Entra ID", ok: true, porque: "É o IdP em nuvem: suporta SaaS, protocolos modernos e não depende de VPN." },
          { t: "Active Directory Domain Services sozinho", porque: "O AD DS não autentica SaaS nativamente e exige VPN para usuários remotos." },
          { t: "Mais um domain controller", porque: "Outro DC continua sendo AD DS on-premises, com as mesmas limitações." },
          { t: "Group Policy", porque: "Group Policy configura máquinas Windows no domínio. Não é um IdP." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.2 federação
    {
      secao: "1.2",
      titulo: "Federation",
      html: `
<p><span class="termo">Federação</span> <span class="en">(federation)</span> permite acessar recursos de outra organização sem criar conta nela. Isso funciona por uma <b>relação de confiança</b> <span class="en">(trust)</span> entre os IdPs.</p>
<svg class="anim" viewBox="0 0 400 190" role="img" aria-label="Organização A confia na organização B; usuários de B acessam recursos de A">
  <g class="surge d1"><rect class="caixa" x="10" y="20" width="150" height="80" rx="12" style="stroke:var(--destaque);stroke-width:2"/>
    <text x="85" y="52" text-anchor="middle" font-weight="600" font-size="16">Org A</text>
    <text class="tx2" x="85" y="76" text-anchor="middle" font-size="14">tem o recurso</text></g>
  <g class="surge d2"><rect class="caixa" x="240" y="20" width="150" height="80" rx="12" style="stroke:var(--coral);stroke-width:2"/>
    <text x="315" y="52" text-anchor="middle" font-weight="600" font-size="16">Org B</text>
    <text class="tx2" x="315" y="76" text-anchor="middle" font-size="14">autentica o usuário</text></g>
  <path class="traco desenha d3" pathLength="1" d="M162 60 H 236"/>
  <text class="surge d3" x="200" y="50" text-anchor="middle" font-size="14" font-weight="600">confia em</text>
  <text class="tx2 surge d4" x="200" y="140" text-anchor="middle" font-size="14">usuário de B entra com a conta de B</text>
  <text class="tx2 surge d4" x="200" y="160" text-anchor="middle" font-size="14">e acessa o recurso de A</text>
  <text class="surge d5" x="200" y="184" text-anchor="middle" font-size="14" font-weight="600">A confiar em B não faz B confiar em A</text>
</svg>
<ul>
<li>A confiança <b>não é automaticamente nos dois sentidos</b>. A via de volta tem de ser configurada.</li>
<li>Cenários: <b>B2B</b> entre empresas, login com <b>identidade social</b> (Google, GitHub), e integração com o AD on-premises via <b>AD FS</b> (Active Directory Federation Services).</li>
</ul>
<div class="ponte">uma conexão SAML entre o PingFederate e um parceiro é federação: o SP confia nas asserções do IdP.</div>`,
      checagem: {
        q: "A organização A configurou federação confiando na organização B. O que isso permite?",
        opcoes: [
          { t: "Usuários de B acessam recursos de A com a conta de B", ok: true, porque: "Quem confia (A) aceita a autenticação feita por B." },
          { t: "Usuários de A acessam recursos de B automaticamente", porque: "A confiança não é automaticamente nos dois sentidos. Isso exigiria B confiar em A." },
          { t: "As contas de B são copiadas para o diretório de A", porque: "Federação existe justamente para não precisar copiar ou criar contas." },
          { t: "As duas organizações passam a ter um único IdP", porque: "Cada uma mantém o seu IdP. Só existe uma relação de confiança entre eles." }
        ]
      }
    }
  ],

  // ==================================================================== banco da prova
  banco: [
    {
      id: "sr-cliente", topico: "1.1", resumo: "Responsabilidade compartilhada: o que é sempre do cliente",
      variantes: [
        { q: "In the shared responsibility model, which responsibility ALWAYS remains with the customer, regardless of the cloud service type?",
          opcoes: [
            { t: "Information and data", ok: true, porque: "Dados, identidades, dispositivos e configuração ficam sempre com o cliente." },
            { t: "Physical hosts", porque: "Em qualquer serviço de nuvem, os hosts físicos são do provedor." },
            { t: "Operating system", porque: "O SO é do cliente em IaaS, mas passa ao provedor em PaaS e SaaS." },
            { t: "Physical network", porque: "A rede física do datacenter é sempre do provedor na nuvem." }
          ] },
        { q: "A company moves its email to a SaaS solution. Which item is still the company's responsibility?",
          opcoes: [
            { t: "Managing user accounts and identities", ok: true, porque: "Contas e identidades nunca passam para o provedor." },
            { t: "Patching the mail server operating system", porque: "Em SaaS o provedor cuida do SO e da aplicação." },
            { t: "Physical security of the datacenter", porque: "Na nuvem, a segurança física é sempre do provedor." },
            { t: "Maintaining the network hardware", porque: "O hardware de rede do datacenter é do provedor." }
          ] },
        { q: "Which statement BEST describes accountability in the shared responsibility model?",
          opcoes: [
            { t: "The customer can delegate work to the provider, but remains accountable for its data and identities", ok: true, porque: "O trabalho pode ser delegado; a responsabilidade pelos dados e identidades não." },
            { t: "With SaaS, the provider becomes accountable for all customer data", porque: "Mesmo em SaaS os dados continuam sendo responsabilidade do cliente." },
            { t: "Accountability moves to the provider once data is encrypted", porque: "Criptografar não transfere a responsabilidade pelos dados." },
            { t: "The provider is accountable for which users can access the tenant", porque: "Quem acessa o tenant é decisão do cliente." }
          ] }
      ]
    },
    {
      id: "sr-modelos", topico: "1.1", resumo: "Responsabilidade compartilhada: IaaS, PaaS e SaaS",
      variantes: [
        { q: "In which cloud model is the customer responsible for patching the operating system?",
          opcoes: [
            { t: "IaaS", ok: true, porque: "Em IaaS o cliente recebe a VM e cuida do SO dela." },
            { t: "PaaS", porque: "Em PaaS o provedor cuida do SO e do runtime." },
            { t: "SaaS", porque: "Em SaaS o provedor cuida de toda a pilha da aplicação." },
            { t: "None, the provider always patches the OS in the cloud", porque: "Em IaaS o SO é do cliente." }
          ] },
        { q: "Which cloud model places the LEAST security responsibility on the customer?",
          opcoes: [
            { t: "SaaS", ok: true, porque: "Em SaaS o provedor cuida de quase tudo; sobram dados, identidades, dispositivos e configuração." },
            { t: "IaaS", porque: "Em IaaS o cliente cuida do SO, das aplicações e mais." },
            { t: "PaaS", porque: "Em PaaS o cliente ainda cuida do código e da configuração da aplicação." },
            { t: "On-premises", porque: "On-premises tudo é do cliente; é o que mais exige dele." }
          ] },
        { q: "A developer deploys code to a managed application platform where the provider runs the OS and runtime. Which model is this, and what does the developer still own?",
          opcoes: [
            { t: "PaaS; the application code, its configuration and data", ok: true, porque: "Em PaaS o provedor cuida do SO e do runtime; o cliente cuida do código, da configuração e dos dados." },
            { t: "IaaS; the OS and everything above it", porque: "Em IaaS o cliente cuidaria do SO, mas aqui é o provedor que roda o SO." },
            { t: "SaaS; nothing at all", porque: "Não é SaaS (o cliente publica código), e o cliente sempre tem alguma responsabilidade." },
            { t: "PaaS; the physical servers", porque: "Servidores físicos são do provedor em qualquer serviço de nuvem." }
          ] }
      ]
    },
    {
      id: "did-camadas", topico: "1.1", resumo: "Defense in depth: as camadas",
      variantes: [
        { q: "In the defense-in-depth model, which layer includes protection against distributed denial-of-service (DDoS) attacks?",
          opcoes: [
            { t: "Perimeter", ok: true, porque: "DDoS e firewall de borda são a camada de perímetro." },
            { t: "Compute", porque: "Compute trata das VMs: patches, portas, acesso." },
            { t: "Application", porque: "Application é o código: desenvolvimento seguro, validação de entrada." },
            { t: "Data", porque: "Data é a camada mais interna, o que as outras protegem." }
          ] },
        { q: "Which defense-in-depth layer focuses on limiting communication between resources through segmentation?",
          opcoes: [
            { t: "Network", ok: true, porque: "Segmentação e controle de tráfego entre recursos é a camada de rede." },
            { t: "Perimeter", porque: "Perimeter é a borda (DDoS, firewall de entrada), não o tráfego interno." },
            { t: "Physical security", porque: "Physical é acesso ao prédio e ao hardware." },
            { t: "Identity and access", porque: "Identity and access é MFA, RBAC, Conditional Access." }
          ] },
        { q: "Requiring multifactor authentication for administrators belongs to which defense-in-depth layer?",
          opcoes: [
            { t: "Identity and access", ok: true, porque: "MFA, RBAC e Conditional Access estão na camada de identidade e acesso." },
            { t: "Compute", porque: "Compute é a proteção das VMs." },
            { t: "Network", porque: "Network é segmentação e tráfego." },
            { t: "Perimeter", porque: "Perimeter é DDoS e firewall de borda." }
          ] },
        { q: "Which layer is at the CENTER of the defense-in-depth model, the one all other layers ultimately protect?",
          opcoes: [
            { t: "Data", ok: true, porque: "Data é a camada mais interna; todas as outras existem para protegê-la." },
            { t: "Application", porque: "Application fica logo antes de data, mas não é o centro." },
            { t: "Identity and access", porque: "Identity and access é a segunda camada, de fora para dentro." },
            { t: "Physical security", porque: "Physical é a camada mais externa." }
          ] }
      ]
    },
    {
      id: "did-conceito", topico: "1.1", resumo: "Defense in depth: o conceito",
      variantes: [
        { q: "What is the main idea behind defense in depth?",
          opcoes: [
            { t: "Use multiple layers of protection so that if one fails, others still slow down or stop an attack", ok: true, porque: "Camadas sobrepostas: uma falha não deixa o atacante chegar direto ao dado." },
            { t: "Concentrate all investment in one very strong perimeter firewall", porque: "É o contrário: depender de uma barra só é o modelo castelo com fosso." },
            { t: "Never trust any user, even after authentication", porque: "Isso lembra o Zero Trust, que é outro conceito." },
            { t: "Encrypt all data so other controls are unnecessary", porque: "Criptografia é só uma das camadas." }
          ] },
        { q: "Which of the following is an example of a defense-in-depth approach?",
          opcoes: [
            { t: "Combining physical access control, MFA, network segmentation and data encryption", ok: true, porque: "Vários controles em camadas diferentes." },
            { t: "Storing all servers in a single location behind one firewall", porque: "Um ponto único de proteção é o oposto de defesa em profundidade." },
            { t: "Allowing all internal traffic because it is behind the firewall", porque: "Rede sem segmentação: uma camada a menos." },
            { t: "Relying only on antivirus on each workstation", porque: "Um controle só, numa camada só." }
          ] },
        { q: "Which security objective is MOST directly protected by DDoS protection, redundancy and backups?",
          opcoes: [
            { t: "Availability", ok: true, porque: "Tudo isso serve para o sistema continuar no ar ou voltar rápido." },
            { t: "Confidentiality", porque: "Confidencialidade é sigilo, protegido por criptografia e controle de acesso." },
            { t: "Integrity", porque: "Integridade é impedir alteração, com hash e assinatura." },
            { t: "Non-repudiation", porque: "Não repúdio é provar quem fez a ação." }
          ] }
      ]
    },
    {
      id: "zt-principios", topico: "1.1", resumo: "Zero Trust: os 3 princípios",
      variantes: [
        { q: "Which of the following is one of the three guiding principles of Zero Trust?",
          opcoes: [
            { t: "Verify explicitly", ok: true, porque: "Os três são verify explicitly, use least privileged access e assume breach." },
            { t: "Trust but verify", porque: "É o oposto: Zero Trust não parte da confiança." },
            { t: "Defense in depth", porque: "Defesa em profundidade é outro modelo, não um princípio do Zero Trust." },
            { t: "Secure the perimeter", porque: "O Zero Trust justamente deixa de depender do perímetro." }
          ] },
        { q: "An access decision considers the user's identity, location, device health and the sensitivity of the data. Which Zero Trust principle is this?",
          opcoes: [
            { t: "Verify explicitly", ok: true, porque: "Usar todos os sinais disponíveis para decidir é verify explicitly." },
            { t: "Assume breach", porque: "Assume breach é segmentar, criptografar e monitorar como se já houvesse invasão." },
            { t: "Use least privileged access", porque: "Least privilege é dar o mínimo de permissão, não avaliar sinais." },
            { t: "Shared responsibility", porque: "Isso é o modelo de divisão com o provedor de nuvem." }
          ] },
        { q: "Granting administrators elevated permissions only when needed and only for a limited time applies which Zero Trust principle?",
          opcoes: [
            { t: "Use least privileged access", ok: true, porque: "Just-in-time e just-enough-access são least privilege." },
            { t: "Verify explicitly", porque: "Verify explicitly é sobre os sinais usados na decisão." },
            { t: "Assume breach", porque: "Assume breach é limitar o estrago de uma invasão (segmentação, monitoramento)." },
            { t: "Defense in depth", porque: "Não é um dos princípios do Zero Trust." }
          ] },
        { q: "Segmenting access, encrypting end to end and using analytics to detect threats are associated with which Zero Trust principle?",
          opcoes: [
            { t: "Assume breach", ok: true, porque: "Tudo isso parte da ideia de que a invasão já aconteceu e precisa ser contida." },
            { t: "Verify explicitly", porque: "Verify explicitly trata da decisão de autenticar e autorizar." },
            { t: "Use least privileged access", porque: "Least privilege trata do tamanho das permissões." },
            { t: "Castle-and-moat", porque: "É o modelo antigo que o Zero Trust substitui." }
          ] }
      ]
    },
    {
      id: "zt-pilares", topico: "1.1", resumo: "Zero Trust: pilares",
      variantes: [
        { q: "In Microsoft's Zero Trust model, which pillar is described as the primary control plane?",
          opcoes: [
            { t: "Identities", ok: true, porque: "Identidades são o plano de controle principal; todo acesso passa por uma." },
            { t: "Networks", porque: "No Zero Trust a rede deixa de ser o controle principal." },
            { t: "Infrastructure", porque: "Infrastructure é um pilar, mas não o plano de controle." },
            { t: "Data", porque: "Data é o que se protege no fim, não o plano de controle." }
          ] },
        { q: "Which Zero Trust pillar involves discovering shadow IT and controlling permissions that apps request?",
          opcoes: [
            { t: "Applications", ok: true, porque: "O pilar de apps trata da visibilidade dos apps em uso e das permissões deles." },
            { t: "Devices", porque: "Devices trata da saúde e conformidade do dispositivo." },
            { t: "Networks", porque: "Networks trata de segmentação e tráfego." },
            { t: "Identities", porque: "Identities trata da autenticação forte de quem acessa." }
          ] },
        { q: "Which of these is NOT one of the Zero Trust foundational pillars?",
          opcoes: [
            { t: "Perimeter", ok: true, porque: "Perímetro é camada da defesa em profundidade, não pilar do Zero Trust." },
            { t: "Devices", porque: "Devices é um pilar." },
            { t: "Data", porque: "Data é um pilar." },
            { t: "Infrastructure", porque: "Infrastructure é um pilar." }
          ] }
      ]
    },
    {
      id: "cripto-tipos", topico: "1.1", resumo: "Criptografia simétrica e assimétrica",
      variantes: [
        { q: "Which type of encryption uses the same key to encrypt and decrypt data?",
          opcoes: [
            { t: "Symmetric encryption", ok: true, porque: "Simétrica: uma chave só para as duas operações." },
            { t: "Asymmetric encryption", porque: "Assimétrica usa um par de chaves, pública e privada." },
            { t: "Hashing", porque: "Hash não usa chave e não é reversível." },
            { t: "Digital signature", porque: "Assinatura usa chave privada para assinar e pública para conferir." }
          ] },
        { q: "In asymmetric encryption, data encrypted with a public key can be decrypted only with which key?",
          opcoes: [
            { t: "The matching private key", ok: true, porque: "O par funciona assim: o que a pública cifra, só a privada decifra." },
            { t: "The same public key", porque: "Isso seria criptografia simétrica." },
            { t: "Any key held by the recipient", porque: "Tem de ser a chave privada do mesmo par." },
            { t: "A hash of the public key", porque: "Hash não decifra nada." }
          ] },
        { q: "What is the MAIN challenge of symmetric encryption?",
          opcoes: [
            { t: "Securely sharing the key with the other party", ok: true, porque: "Como a chave é a mesma dos dois lados, ela precisa chegar ao outro lado sem vazar." },
            { t: "It is too slow for large amounts of data", porque: "Simétrica é rápida; a lenta é a assimétrica." },
            { t: "It cannot be reversed", porque: "Quem não pode ser revertido é o hash." },
            { t: "It requires a key pair", porque: "Par de chaves é a assimétrica." }
          ] }
      ]
    },
    {
      id: "cripto-estados", topico: "1.1", resumo: "Estados do dado: at rest, in transit, in use",
      variantes: [
        { q: "TLS protects data in which state?",
          opcoes: [
            { t: "In transit", ok: true, porque: "TLS protege o dado passando pela rede." },
            { t: "At rest", porque: "At rest é dado guardado em disco ou banco." },
            { t: "In use", porque: "In use é dado na memória durante o processamento." },
            { t: "Archived", porque: "Não é um dos três estados cobrados." }
          ] },
        { q: "A company wants to protect sensitive data while it is being processed in memory, even from the hypervisor. What addresses this?",
          opcoes: [
            { t: "Encryption in use with confidential computing / secure enclaves", ok: true, porque: "Confidential computing protege o dado em uso, inclusive do SO e do hypervisor." },
            { t: "Encryption at rest", porque: "At rest protege o dado guardado, não o que está na memória." },
            { t: "Encryption in transit with TLS", porque: "TLS protege o dado na rede." },
            { t: "Hashing the data", porque: "Hash destrói o dado original; não daria para processá-lo." }
          ] },
        { q: "Which mechanism protects data stored on disks and in databases?",
          opcoes: [
            { t: "Encryption at rest", ok: true, porque: "Dado guardado é dado em repouso." },
            { t: "Encryption in transit", porque: "In transit protege o dado na rede." },
            { t: "Single sign-on", porque: "SSO é sobre login, não sobre proteger dado guardado." },
            { t: "Federation", porque: "Federação é confiança entre IdPs." }
          ] }
      ]
    },
    {
      id: "hash", topico: "1.1", resumo: "Hash, salt e assinatura digital",
      variantes: [
        { q: "Which statement about hashing is TRUE?",
          opcoes: [
            { t: "It produces a fixed-length output and cannot be reversed to obtain the original data", ok: true, porque: "Hash é só de ida e tem saída de tamanho fixo." },
            { t: "It uses a private key to produce the output", porque: "Hash não usa chave." },
            { t: "The same input produces a different hash each time", porque: "Sem salt, a mesma entrada dá sempre o mesmo hash." },
            { t: "It is the preferred way to keep data confidential and readable later", porque: "Não dá para ler de volta; para isso se usa criptografia." }
          ] },
        { q: "Why are passwords salted before hashing?",
          opcoes: [
            { t: "To make identical passwords produce different hashes and defeat precomputed (rainbow table) attacks", ok: true, porque: "O salt único por senha invalida tabelas pré-calculadas." },
            { t: "To allow administrators to recover forgotten passwords", porque: "Hash, com ou sem salt, não é reversível." },
            { t: "To encrypt the password with a symmetric key", porque: "Salt não é chave de criptografia." },
            { t: "To reduce the storage size of the hash", porque: "O hash tem tamanho fixo." }
          ] },
        { q: "A digital signature provides which TWO assurances about a message?",
          opcoes: [
            { t: "Authenticity of the sender and integrity of the content", ok: true, porque: "Assinatura prova quem enviou e que o conteúdo não mudou." },
            { t: "Confidentiality and availability", porque: "A assinatura não esconde o conteúdo nem garante que o sistema esteja no ar." },
            { t: "Confidentiality and integrity", porque: "Assinatura não dá sigilo: a mensagem continua legível." },
            { t: "Availability and authenticity", porque: "Disponibilidade não tem relação com assinatura." }
          ] }
      ]
    },
    {
      id: "grc", topico: "1.1", resumo: "GRC: governance, risk, compliance",
      variantes: [
        { q: "Which term describes the rules, practices and processes an organization uses to direct and control its activities?",
          opcoes: [
            { t: "Governance", ok: true, porque: "Governança é como a organização dirige e controla o que faz." },
            { t: "Compliance", porque: "Compliance é cumprir leis e normas." },
            { t: "Risk management", porque: "Gestão de risco é identificar, avaliar, responder e monitorar riscos." },
            { t: "Data sovereignty", porque: "Soberania é qual lei vale para o dado." }
          ] },
        { q: "An organization must adhere to HIPAA, ISO 27001 and its own internal policies. Which GRC element does this describe?",
          opcoes: [
            { t: "Compliance", ok: true, porque: "Cumprir leis, regulações, normas e políticas é compliance." },
            { t: "Governance", porque: "Governança define as regras internas; cumprir obrigações externas é compliance." },
            { t: "Risk management", porque: "Gestão de risco não é sobre cumprir normas." },
            { t: "Zero Trust", porque: "Zero Trust é um modelo de segurança." }
          ] },
        { q: "An organization decides to stop offering a risky service entirely. Which risk response is this?",
          opcoes: [
            { t: "Avoid", ok: true, porque: "Deixar de fazer a atividade elimina o risco: evitar." },
            { t: "Transfer", porque: "Transferir é passar o impacto para outro, como num seguro." },
            { t: "Mitigate", porque: "Mitigar é reduzir com controles, mantendo a atividade." },
            { t: "Accept", porque: "Aceitar é manter a atividade e arcar com o risco." }
          ] },
        { q: "Which statement about compliance and security is MOST accurate?",
          opcoes: [
            { t: "Being compliant sets a minimum baseline but does not guarantee the organization is secure", ok: true, porque: "Compliance é o mínimo exigido, não a garantia de segurança." },
            { t: "A compliant organization cannot suffer a breach", porque: "Empresas em conformidade também sofrem incidentes." },
            { t: "Compliance and security are the same thing", porque: "São coisas diferentes, que se ajudam." },
            { t: "Security is only needed when no regulation applies", porque: "Segurança é necessária sempre." }
          ] }
      ]
    },
    {
      id: "residencia", topico: "1.1", resumo: "Data residency, sovereignty e privacy",
      variantes: [
        { q: "Which concept refers to the regulations that govern the physical location where data can be stored and how it can be transferred across borders?",
          opcoes: [
            { t: "Data residency", ok: true, porque: "Residency é onde o dado fica e como pode cruzar fronteiras." },
            { t: "Data sovereignty", porque: "Soberania é qual lei vale para o dado." },
            { t: "Data privacy", porque: "Privacy é o tratamento correto do dado pessoal." },
            { t: "Data classification", porque: "Classificação é rotular o dado pela sensibilidade." }
          ] },
        { q: "Which concept states that data is subject to the laws of the country or region where it is collected, held or processed?",
          opcoes: [
            { t: "Data sovereignty", ok: true, porque: "É a definição de soberania de dados." },
            { t: "Data residency", porque: "Residency fala de onde o dado fica, não de qual lei vale." },
            { t: "Zero Trust", porque: "Zero Trust é um modelo de segurança." },
            { t: "Shared responsibility", porque: "É a divisão de tarefas com o provedor." }
          ] },
        { q: "Giving people transparency and the right to access, correct or delete their personal information is part of which concept?",
          opcoes: [
            { t: "Data privacy", ok: true, porque: "Privacidade trata dos direitos do titular e do uso correto do dado pessoal." },
            { t: "Data residency", porque: "Residency é sobre localização." },
            { t: "Data sovereignty", porque: "Soberania é sobre jurisdição." },
            { t: "Governance", porque: "Governança é como a empresa se dirige; os direitos do titular são privacy." }
          ] }
      ]
    },
    {
      id: "perimetro", topico: "1.2", resumo: "Identidade como perímetro principal",
      variantes: [
        { q: "Why is identity considered the primary security perimeter today?",
          opcoes: [
            { t: "Users access cloud apps from many devices and locations, so the network boundary no longer contains all access", ok: true, porque: "Nuvem, trabalho remoto e BYOD tiraram o acesso de dentro da rede; a identidade é o que todo acesso tem em comum." },
            { t: "Firewalls have been replaced by biometric readers", porque: "Biometria é só um fator de autenticação." },
            { t: "All access now happens only inside the corporate network", porque: "É justamente o contrário." },
            { t: "Identities cannot be compromised", porque: "Identidades são o alvo preferido dos ataques." }
          ] },
        { q: "Which factor has contributed MOST to the erosion of the traditional network perimeter?",
          opcoes: [
            { t: "Adoption of SaaS applications and remote work", ok: true, porque: "Apps fora da rede e pessoas fora do escritório acabam com o 'dentro e fora'." },
            { t: "Increased use of on-premises domain controllers", porque: "DCs on-premises reforçam o modelo de rede interna." },
            { t: "Stronger perimeter firewalls", porque: "Firewalls melhores não resolvem o acesso fora da rede." },
            { t: "Fewer mobile devices in the workplace", porque: "Há cada vez mais dispositivos móveis, não menos." }
          ] },
        { q: "Which type of identity represents an application, service or script that needs to authenticate?",
          opcoes: [
            { t: "Workload identity", ok: true, porque: "Software, serviços e scripts usam workload identities." },
            { t: "Human identity", porque: "Human identity é uma pessoa." },
            { t: "Guest identity", porque: "Guest é uma pessoa de fora da organização." },
            { t: "Federated identity", porque: "Federated descreve de onde vem a autenticação, não o tipo de identidade." }
          ] }
      ]
    },
    {
      id: "quatro-pilares", topico: "1.2", resumo: "Os 4 pilares da infraestrutura de identidade",
      variantes: [
        { q: "Which of the following lists the four pillars of an identity infrastructure?",
          opcoes: [
            { t: "Administration, authentication, authorization, auditing", ok: true, porque: "São os quatro 'A' do Learn." },
            { t: "Authentication, authorization, accounting, availability", porque: "Mistura AAA com a tríade CIA." },
            { t: "Identity, device, network, data", porque: "Isso lembra os pilares do Zero Trust." },
            { t: "Confidentiality, integrity, availability, auditing", porque: "É a tríade CIA mais um item." }
          ] },
        { q: "Reviewing sign-in logs and investigating anomalous activity belongs to which identity pillar?",
          opcoes: [
            { t: "Auditing", ok: true, porque: "Logs, relatórios, alertas e investigação são auditing." },
            { t: "Administration", porque: "Administration é criar, alterar e remover identidades." },
            { t: "Authorization", porque: "Authorization é decidir o que a identidade pode fazer." },
            { t: "Authentication", porque: "Authentication é provar a identidade." }
          ] },
        { q: "Provisioning and deprovisioning user accounts is part of which identity pillar?",
          opcoes: [
            { t: "Administration", ok: true, porque: "O ciclo de vida da identidade é administration." },
            { t: "Auditing", porque: "Auditing registra o que aconteceu." },
            { t: "Authentication", porque: "Authentication é o momento do login." },
            { t: "Authorization", porque: "Authorization são as permissões depois do login." }
          ] }
      ]
    },
    {
      id: "authn-authz", topico: "1.2", resumo: "Autenticação vs autorização",
      variantes: [
        { q: "What is authentication?",
          opcoes: [
            { t: "The process of proving that a person or service is who or what it claims to be", ok: true, porque: "Autenticar é provar a identidade." },
            { t: "The process of granting permissions to resources", porque: "Isso é autorização." },
            { t: "The process of recording user activity", porque: "Isso é auditoria." },
            { t: "The process of creating a trust between organizations", porque: "Isso é federação." }
          ] },
        { q: "After signing in, a user can read a file but not delete it. Which process determined this?",
          opcoes: [
            { t: "Authorization", ok: true, porque: "Decidir o que a identidade pode fazer é autorização." },
            { t: "Authentication", porque: "Authentication só provou quem é o usuário." },
            { t: "Federation", porque: "Federação é confiança entre IdPs." },
            { t: "Auditing", porque: "Auditing registra; não decide." }
          ] },
        { q: "Which combination is an example of multifactor authentication?",
          opcoes: [
            { t: "A password and a code from an authenticator app on the user's phone", ok: true, porque: "Algo que você sabe mais algo que você tem." },
            { t: "A password and a security question", porque: "Os dois são algo que você sabe." },
            { t: "A username and a password", porque: "Usuário é identificação; só a senha autentica." },
            { t: "Two different passwords", porque: "Dois fatores da mesma categoria." }
          ] }
      ]
    },
    {
      id: "idp-sso", topico: "1.2", resumo: "Identity provider, modern auth e SSO",
      variantes: [
        { q: "In modern authentication, what role does the identity provider play?",
          opcoes: [
            { t: "It centrally authenticates users and issues security tokens that applications trust", ok: true, porque: "O IdP autentica no lugar do app e entrega um token." },
            { t: "It stores the application's business data", porque: "O IdP cuida de identidade, não dos dados do app." },
            { t: "It replaces the need for authorization", porque: "Os apps continuam autorizando." },
            { t: "It filters network traffic at the perimeter", porque: "Isso é papel de firewall." }
          ] },
        { q: "What is a benefit of single sign-on (SSO)?",
          opcoes: [
            { t: "Users sign in once to access multiple applications that trust the same identity provider", ok: true, porque: "É a definição de SSO." },
            { t: "Passwords never need to be changed", porque: "SSO não muda a política de senha." },
            { t: "Applications no longer need to check permissions", porque: "Autorização continua existindo." },
            { t: "It removes the need for an identity provider", porque: "SSO depende de um IdP." }
          ] },
        { q: "According to Microsoft Learn, which protocol is used for authentication and issues an ID token?",
          opcoes: [
            { t: "OpenID Connect", ok: true, porque: "OIDC é a camada de autenticação sobre o OAuth 2.0 e emite o ID token." },
            { t: "OAuth 2.0 alone", porque: "OAuth 2.0 é de autorização e emite access tokens." },
            { t: "Kerberos", porque: "Kerberos é o protocolo do AD DS on-premises." },
            { t: "LDAP", porque: "LDAP é um protocolo de consulta a diretório." }
          ] },
        { q: "With SSO in place, an employee leaves the company and their account is disabled in the identity provider. What happens?",
          opcoes: [
            { t: "They lose access to all applications that rely on that identity provider", ok: true, porque: "O controle central é um dos benefícios do SSO." },
            { t: "Each application must be updated separately to block the user", porque: "Com SSO, desativar no IdP já corta o acesso." },
            { t: "Nothing changes until their password expires", porque: "A conta desativada não consegue mais entrar." },
            { t: "Only applications using SAML are affected", porque: "Todos os apps que confiam no IdP são afetados." }
          ] }
      ]
    },
    {
      id: "adds", topico: "1.2", resumo: "Directory services e AD DS",
      variantes: [
        { q: "What is a server running Active Directory Domain Services (AD DS) called?",
          opcoes: [
            { t: "A domain controller", ok: true, porque: "O servidor com AD DS é o domain controller." },
            { t: "An identity provider tenant", porque: "Tenant é um conceito do Entra ID na nuvem." },
            { t: "A federation server", porque: "Federation server é o AD FS, outro papel." },
            { t: "A key vault", porque: "Key Vault é o serviço de chaves do Azure." }
          ] },
        { q: "Which is a limitation of AD DS described by Microsoft?",
          opcoes: [
            { t: "It doesn't natively support modern protocols like OAuth 2.0 and OpenID Connect", ok: true, porque: "O AD DS usa Kerberos e NTLM; não fala OAuth/OIDC nativamente." },
            { t: "It cannot store user accounts", porque: "Guardar contas é a função principal dele." },
            { t: "It doesn't support Group Policy", porque: "Group Policy é um recurso do AD DS." },
            { t: "It only works in the cloud", porque: "O AD DS é on-premises." }
          ] },
        { q: "What does a directory service do?",
          opcoes: [
            { t: "Stores and provides information about objects such as users, groups and devices", ok: true, porque: "É o repositório e o serviço que entrega esses objetos." },
            { t: "Encrypts data in transit", porque: "Isso é TLS." },
            { t: "Blocks DDoS attacks", porque: "Isso é proteção de perímetro." },
            { t: "Classifies documents by sensitivity", porque: "Isso é classificação de dados (Purview)." }
          ] }
      ]
    },
    {
      id: "entra-vs-adds", topico: "1.2", resumo: "Entra ID vs AD DS e hybrid identity",
      variantes: [
        { q: "An organization needs a single identity service for both cloud SaaS applications and remote users without VPN. Which should it use?",
          opcoes: [
            { t: "Microsoft Entra ID", ok: true, porque: "IdP em nuvem com protocolos modernos e sem VPN." },
            { t: "Active Directory Domain Services", porque: "AD DS não autentica SaaS nativamente e pede VPN." },
            { t: "An additional domain controller", porque: "Mais um DC é mais AD DS." },
            { t: "Group Policy", porque: "Group Policy não é IdP." }
          ] },
        { q: "Microsoft Entra ID is delivered in which model?",
          opcoes: [
            { t: "Identity as a Service (IDaaS)", ok: true, porque: "A Microsoft opera a infraestrutura; o cliente consome o serviço." },
            { t: "Infrastructure as a Service (IaaS)", porque: "O cliente não recebe VMs para rodar o Entra ID." },
            { t: "An on-premises server role", porque: "Isso descreve o AD DS." },
            { t: "A hardware security module", porque: "HSM é hardware para chaves." }
          ] },
        { q: "What is hybrid identity?",
          opcoes: [
            { t: "Synchronizing on-premises AD DS with Microsoft Entra ID so users have one identity for both", ok: true, porque: "Hybrid identity liga o diretório local ao Entra ID." },
            { t: "Using two passwords for each user", porque: "O objetivo é o contrário: uma credencial só." },
            { t: "Combining MFA and SSO", porque: "Isso não é identidade híbrida." },
            { t: "Federating with social identity providers", porque: "Isso é federação com identidade social." }
          ] }
      ]
    },
    {
      id: "federacao", topico: "1.2", resumo: "Federação e trust",
      variantes: [
        { q: "What establishes federation between two organizations?",
          opcoes: [
            { t: "A trust relationship between their identity providers", ok: true, porque: "Federação é confiança entre IdPs." },
            { t: "Copying all user accounts into both directories", porque: "Federação existe para evitar isso." },
            { t: "A shared password database", porque: "Cada organização mantém suas credenciais." },
            { t: "A site-to-site VPN", porque: "VPN liga redes; não cria confiança entre IdPs." }
          ] },
        { q: "Organization A trusts Organization B in a federation. Which statement is TRUE?",
          opcoes: [
            { t: "Users from B can access A's resources; A's users can't access B unless B also trusts A", ok: true, porque: "A confiança não é automaticamente nos dois sentidos." },
            { t: "The trust is automatically bidirectional", porque: "A via de volta precisa ser configurada." },
            { t: "Users from A can access B's resources", porque: "Para isso, B teria de confiar em A." },
            { t: "Users from B must create new accounts in A", porque: "Federação dispensa contas novas." }
          ] },
        { q: "Which Microsoft server role issues tokens to cloud services after users authenticate against on-premises Active Directory?",
          opcoes: [
            { t: "Active Directory Federation Services (AD FS)", ok: true, porque: "AD FS federa o AD on-premises com serviços externos." },
            { t: "Domain controller", porque: "O DC autentica na rede local com Kerberos/NTLM." },
            { t: "Azure Key Vault", porque: "Key Vault guarda chaves e segredos." },
            { t: "Group Policy", porque: "Group Policy configura máquinas Windows." }
          ] }
      ]
    }
  ]
};
