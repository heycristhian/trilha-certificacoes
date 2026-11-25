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
  rodada: 15,
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
<p class="pequeno">A prova tem 45 minutos e aprovação com 700 de 1000. Existe em português, mas aqui as perguntas e alternativas (das checagens e da prova) estão em inglês, porque os nomes dos produtos são em inglês e a versão em inglês é atualizada primeiro. As explicações são em português, com o termo em inglês entre parênteses.</p>`
    },

    {
      secao: "",
      titulo: "Como a prova da Microsoft pergunta",
      html: `
<p>A prova não é só "escolha uma". Os formatos que mais aparecem nas provas Fundamentals:</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1</b> Múltipla escolha: uma alternativa certa.</div>
  <div class="degrau surge d2"><b>2</b> Várias certas: <i>"Choose two"</i>. Cada certa é parte da solução.</div>
  <div class="degrau surge d3"><b>3</b> Yes / No: três afirmações, e você marca cada uma.</div>
  <div class="degrau surge d4"><b>4</b> Associar <span class="en">(drag and drop)</span>: ligar conceito e descrição. Pode sobrar opção.</div>
  <div class="degrau surge d5"><b>5</b> Completar a frase <span class="en">(drop-down)</span>: escolher na lista a palavra que fecha a frase.</div>
</div>
<p>Este curso treina os cinco. Aqui só conta como certa se você acertar <b>tudo</b> na questão. Na prova real algumas questões podem dar ponto parcial, mas treinar com mais rigor é mais seguro.</p>
<div class="prova-dica">no Yes/No, julgue cada afirmação <b>sozinha</b>. As três podem ser Yes, as três podem ser No.</div>
<p class="pequeno">Experimente o formato Yes/No logo abaixo, com assuntos que você já conhece.</p>`,
      checagem: {
        tipo: "simnao",
        itens: [
          { t: "Authentication happens before authorization.", ok: true, porque: "Primeiro se prova quem é (authentication), depois se decide o que pode (authorization)." },
          { t: "Using two different passwords is multifactor authentication.", ok: false, porque: "As duas senhas são do mesmo tipo de fator (something you know). MFA exige categorias diferentes." },
          { t: "Single sign-on lets a user sign in once to access multiple applications.", ok: true, porque: "É a definição de SSO." }
        ]
      }
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
        q: "A company uses Microsoft 365 (SaaS). Who is responsible for deciding which users have accounts and what permissions they get?",
        opcoes: [
          { t: "The customer", ok: true, porque: "Contas e identidades (accounts and identities) ficam sempre com o cliente (customer), inclusive em SaaS." },
          { t: "Microsoft, because the service is SaaS", porque: "Em SaaS a Microsoft cuida da aplicação e da infraestrutura, mas não decide quem usa o serviço." },
          { t: "Both, in equal parts", porque: "A plataforma de identidade é da Microsoft, mas a decisão sobre contas e permissões é só do cliente." },
          { t: "No one: SaaS comes with the right permissions preconfigured", porque: "Nenhum provedor sabe quem na sua empresa deve acessar o quê." }
        ]
      }
    },

    {
      secao: "1.1",
      titulo: "Shared responsibility em IA",
      html: `
<p>O Microsoft Learn ganhou uma versão da responsabilidade compartilhada para <b>IA</b> (Copilot, Azure AI Foundry). São três camadas:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Camada</th><th>O que tem nela</th><th>Quem cuida</th></tr>
<tr><td><b>AI platform</b></td><td>Infraestrutura, modelo, hospedagem, controles de segurança da plataforma</td><td>Principalmente o provedor (em SaaS e PaaS)</td></tr>
<tr><td><b>AI application</b></td><td>Como o app é configurado: fontes de dados, conectores, plugins</td><td>Dividida; quanto mais o cliente constrói, mais é dele</td></tr>
<tr><td><b>AI usage</b></td><td>O que as pessoas digitam, regras de uso aceitável, supervisão</td><td><b>Cliente</b></td></tr>
</table></div>
<p>O que fica com o cliente, mesmo num SaaS como o Microsoft 365 Copilot:</p>
<ul>
<li>proteger os <b>dados</b> que a IA pode ler e usar;</li>
<li><b>identidade e acesso</b>: quem pode usar o app de IA;</li>
<li>configuração segura: usuários, conectores, logs, retenção;</li>
<li>riscos próprios de IA, como <span class="termo">prompt injection</span>;</li>
<li><b>treinar os usuários</b> e definir a política de uso aceitável <span class="en">(acceptable use policy)</span>.</li>
</ul>
<div class="prova-dica">a regra é a mesma do modelo clássico: o provedor pode fazer o trabalho, mas os dados, as identidades e o uso continuam sendo do cliente.</div>`,
      checagem: {
        q: "A company deploys Microsoft 365 Copilot. Who is responsible for defining an acceptable use policy and training employees on it?",
        opcoes: [
          { t: "The customer", ok: true, porque: "A camada de uso (AI usage) é do cliente: regras de uso aceitável, supervisão e treinamento." },
          { t: "Microsoft, because Copilot is a SaaS service", porque: "Em SaaS a Microsoft cuida da plataforma (AI platform), não de como seus funcionários usam a ferramenta." },
          { t: "The AI model itself", porque: "O modelo não define nem aplica a política da empresa." },
          { t: "Nobody: AI services don't need usage policies", porque: "Uso indevido, vazamento de dados e prompt injection são riscos reais que o cliente precisa tratar." }
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
        q: "A company applies the latest operating system patches to all its virtual machines. Which defense-in-depth layer does this belong to?",
        opcoes: [
          { t: "Compute", ok: true, porque: "Manter a VM atualizada e com o mínimo de portas abertas é a camada de processamento (compute)." },
          { t: "Network", porque: "A camada de rede (network) trata de segmentação e do tráfego entre recursos, não do sistema operacional." },
          { t: "Application", porque: "A camada de aplicação (application) é o código: validação de entrada, desenvolvimento seguro." },
          { t: "Perimeter", porque: "O perímetro (perimeter) é a borda: proteção contra DDoS e firewall na entrada da rede." }
        ]
      }
    },

    {
      secao: "1.1",
      titulo: "CIA: o que protege cada uma",
      html: `
<p>As camadas da defesa em profundidade existem para proteger a tríade <b>CIA</b>. O Learn associa controles a cada uma:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Objetivo</th><th>Significa</th><th>Controles típicos</th></tr>
<tr><td><b>Confidentiality</b></td><td>Só quem tem autorização vê</td><td>Criptografia, controle de acesso, transmissão segura</td></tr>
<tr><td><b>Integrity</b></td><td>O dado só muda por processo autorizado</td><td>Hash, assinatura digital, logs de auditoria, transações de banco</td></tr>
<tr><td><b>Availability</b></td><td>Quem tem acesso consegue usar quando precisa</td><td>Redundância, balanceamento, failover, backup testado, proteção contra DDoS</td></tr>
</table></div>
<p class="surge d1">Os três podem <b>conflitar</b>. Exemplo do Learn: se você criptografa tudo (confidencialidade) e <b>perde a chave</b>, o dado fica indisponível (availability).</p>
<div class="prova-dica">ransomware ataca principalmente a <b>availability</b> (o dado fica inacessível), mesmo que também exista vazamento.</div>`,
      checagem: {
        tipo: "ligar",
        q: "Match each control to the security objective it MAINLY protects.",
        pares: [
          { a: "Encrypting customer records", b: "Confidentiality", porque: "Criptografia impede que quem não tem a chave leia o dado: confidencialidade (confidentiality)." },
          { a: "Verifying a file's hash after download", b: "Integrity", porque: "O hash mostra se o arquivo foi alterado: integridade (integrity)." },
          { a: "Keeping tested backups and a failover site", b: "Availability", porque: "Backup e failover servem para o sistema voltar a funcionar: disponibilidade (availability)." }
        ],
        extras: ["Non-repudiation"]
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
        q: "A company splits its network into small segments so that an attacker on one machine cannot reach the others. Which Zero Trust principle is this?",
        opcoes: [
          { t: "Assume breach", ok: true, porque: "Segmentar para limitar o estrago parte da ideia de que a invasão vai acontecer (assume breach)." },
          { t: "Verify explicitly", porque: "Verificar explicitamente (verify explicitly) é usar todos os sinais na hora de autenticar e autorizar." },
          { t: "Use least privileged access", porque: "Privilégio mínimo (least privileged access) limita as permissões de cada identidade; segmentar a rede é a resposta a 'assume breach'." },
          { t: "Defense in depth", porque: "Defesa em profundidade (defense in depth) é outro conceito, não um dos três princípios do Zero Trust." }
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
        q: "Which of the following is NOT one of Microsoft's Zero Trust pillars?",
        opcoes: [
          { t: "Firewalls", ok: true, porque: "Firewall é uma ferramenta, não um pilar. Os pilares são identities, devices, applications, data, infrastructure, networks e visibility/automation/orchestration." },
          { t: "Devices", porque: "Dispositivos (devices) é um pilar: a saúde e a conformidade do dispositivo entram na decisão." },
          { t: "Data", porque: "Dados (data) é um pilar: classificar, rotular e criptografar." },
          { t: "Identities", porque: "Identidades (identities) é o primeiro pilar e o plano de controle principal (primary control plane)." }
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
        q: "A database in Azure is encrypted on disk. Which state of data is being protected?",
        opcoes: [
          { t: "At rest", ok: true, porque: "Dado guardado (disco, banco, storage) é dado em repouso (at rest)." },
          { t: "In transit", porque: "Dado em trânsito (in transit) é o que passa pela rede, protegido por TLS ou VPN." },
          { t: "In use", porque: "Dado em uso (in use) é o que está na memória durante o processamento." },
          { t: "Hashing", porque: "Hash não é um estado do dado e não pode ser revertido: não serviria para guardar um banco que precisa ser lido." }
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
        q: "Why is a salt added to a password before hashing it?",
        opcoes: [
          { t: "So identical passwords produce different hashes and rainbow tables don't work", ok: true, porque: "O salt é único por senha, então o hash pré-calculado de uma senha comum (rainbow table) não serve mais." },
          { t: "So the original password can be recovered later", porque: "Hash continua sendo só de ida (one-way), com ou sem salt." },
          { t: "To turn the hash into symmetric encryption", porque: "O salt não é chave (key) e não muda a natureza do hash." },
          { t: "To make the hash shorter", porque: "O hash tem tamanho fixo (fixed-length); o salt não muda isso." }
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
        q: "A company buys insurance against cyber incidents. Which risk response is this?",
        opcoes: [
          { t: "Transfer", ok: true, porque: "O seguro passa o impacto financeiro para outra parte: transferir (transfer)." },
          { t: "Mitigate", porque: "Mitigar (mitigate) é reduzir a chance ou o impacto com controles. O seguro não reduz nada, só paga." },
          { t: "Accept", porque: "Aceitar (accept) seria não fazer nada e arcar com o risco." },
          { t: "Avoid", porque: "Evitar (avoid) seria deixar de fazer a atividade que gera o risco." }
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
        q: "Data about European customers stored in a German datacenter is subject to German and EU law. Which concept is this?",
        opcoes: [
          { t: "Data sovereignty", ok: true, porque: "Soberania de dados (data sovereignty) é a regra de que o dado segue a lei do lugar onde é coletado ou guardado." },
          { t: "Data residency", porque: "Residência de dados (data residency) é sobre onde o dado fica. Aqui a pergunta é qual lei se aplica." },
          { t: "Data privacy", porque: "Privacidade (data privacy) trata do uso correto de dado pessoal, não de qual jurisdição vale." },
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
        q: "Which pillar of identity infrastructure covers creating a new employee's account and disabling it when they leave?",
        opcoes: [
          { t: "Administration", ok: true, porque: "Criar, alterar e remover identidades (o ciclo de vida) é administração (administration)." },
          { t: "Authentication", porque: "Autenticação (authentication) é provar a identidade no login, não criar a conta." },
          { t: "Authorization", porque: "Autorização (authorization) decide o que a identidade pode fazer, depois que ela existe." },
          { t: "Auditing", porque: "Auditoria (auditing) registra e investiga o que aconteceu." }
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
        q: "What is the main benefit of single sign-on (SSO)?",
        opcoes: [
          { t: "Users sign in once and access multiple applications", ok: true, porque: "É a definição de SSO: um login, vários apps que confiam no mesmo provedor de identidade (identity provider)." },
          { t: "It removes the need for authorization", porque: "Cada app continua decidindo o que o usuário pode fazer (authorization)." },
          { t: "It replaces multifactor authentication", porque: "SSO e MFA se combinam; um não substitui o outro." },
          { t: "Passwords never expire", porque: "A política de senha (password policy) não tem relação com SSO." }
        ]
      }
    },

    {
      secao: "1.2",
      titulo: "Autorização: papéis, permissões e atributos",
      html: `
<p>Depois da autenticação, a autorização decide o que a identidade pode fazer. O Learn cita três bases para essa decisão:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Base</th><th>Exemplo</th><th>Nome do modelo</th></tr>
<tr><td><b>Roles</b> (papéis)</td><td>"Quem é do papel Auditor pode ler os relatórios"</td><td>RBAC · role-based access control</td></tr>
<tr><td><b>Permissions</b></td><td>Ler, escrever, apagar</td><td>As ações concedidas</td></tr>
<tr><td><b>Attributes</b> (atributos)</td><td>Departamento, local, cargo, horário</td><td>ABAC · attribute-based access control</td></tr>
</table></div>
<p>E sempre com <span class="termo">least privilege</span>: só o necessário para a tarefa. Para acesso privilegiado, a Microsoft acrescenta <b>JIT</b> (just-in-time: a permissão existe só quando precisa) e <b>JEA</b> (just-enough-access: só o tamanho certo).</p>
<div class="nota">No domínio 2 você vai ver isso em produto: <b>Microsoft Entra roles e RBAC</b>, e o <b>Privileged Identity Management</b> (PIM) para o JIT.</div>
<div class="ponte">as regras de acesso do PingAccess podem decidir por grupo (papel) ou por atributo do usuário e da requisição. É RBAC e ABAC na prática.</div>`,
      checagem: {
        tipo: "completar",
        q: "Granting access to a report only to users whose department is Finance and who are in Brazil is an example of ___ access control.",
        opcoes: [
          { t: "attribute-based", ok: true, porque: "Departamento e país são atributos da identidade: controle baseado em atributos (ABAC)." },
          { t: "role-based", porque: "No baseado em papéis (RBAC) o acesso vem do papel atribuído, não de atributos como país." },
          { t: "federated", porque: "Federação (federation) é confiança entre IdPs; não decide permissões." },
          { t: "multifactor", porque: "Multifator (MFA) é sobre autenticação, não autorização." }
        ]
      }
    },

    {
      secao: "1.2",
      titulo: "Tokens e claims",
      html: `
<p>No modern authentication, o IdP entrega ao app um <span class="termo">security token</span>. Dentro dele vão as <span class="termo">claims</span>: afirmações sobre a identidade.</p>
<div class="degraus">
  <div class="degrau surge d1"><b>·</b> identificador único do usuário</div>
  <div class="degrau surge d2"><b>·</b> nome e e-mail</div>
  <div class="degrau surge d3"><b>·</b> papéis ou grupos</div>
  <div class="degrau surge d4"><b>·</b> quando foi emitido e quando expira</div>
  <div class="degrau surge d5"><b>·</b> permissões concedidas</div>
</div>
<div class="tabela-rolagem"><table class="t">
<tr><th>Token</th><th>Para quê</th><th>Protocolo</th></tr>
<tr><td><b>ID token</b></td><td>Prova que o usuário <b>entrou</b> (autenticação)</td><td>OpenID Connect</td></tr>
<tr><td><b>Access token</b></td><td>Dá <b>acesso</b> a um recurso, como uma API (autorização)</td><td>OAuth 2.0</td></tr>
</table></div>
<p>Tokens têm <b>validade curta</b> <span class="en">(time-limited)</span> e são <b>assinados</b> pelo IdP; o app confere a assinatura para confiar neles.</p>
<div class="ponte">é o JWT que você conhece. A prova só cobra esse nível: o que é claim, ID token × access token, e que tokens expiram.</div>`,
      checagem: {
        tipo: "ligar",
        q: "Match each term to its description.",
        pares: [
          { a: "ID token", b: "Proves that the user signed in", porque: "O ID token (OpenID Connect) é a prova da autenticação." },
          { a: "Access token", b: "Allows an app to call a protected resource such as an API", porque: "O access token (OAuth 2.0) é a autorização para acessar o recurso." },
          { a: "Claim", b: "A piece of information about the identity inside a token", porque: "Claims são as afirmações dentro do token: nome, papéis, validade." }
        ],
        extras: ["Encrypts data stored on disk"]
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
        q: "A company needs an identity service that works for SaaS apps and for remote users without a VPN. Which option fits BEST?",
        opcoes: [
          { t: "Microsoft Entra ID", ok: true, porque: "É o provedor de identidade em nuvem: suporta SaaS, protocolos modernos e não depende de VPN." },
          { t: "Active Directory Domain Services on its own", porque: "O AD DS não autentica SaaS nativamente e exige VPN para usuários remotos." },
          { t: "An additional domain controller", porque: "Outro controlador de domínio (domain controller) continua sendo AD DS on-premises, com as mesmas limitações." },
          { t: "Group Policy", porque: "Group Policy configura máquinas Windows no domínio. Não é um provedor de identidade (IdP)." }
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
        q: "Organization A has set up federation trusting Organization B. What does this allow?",
        opcoes: [
          { t: "Users from B access A's resources with their B accounts", ok: true, porque: "Quem confia (A) aceita a autenticação feita por B." },
          { t: "Users from A access B's resources automatically", porque: "A confiança (trust) não é automaticamente nos dois sentidos. Isso exigiria B confiar em A." },
          { t: "B's accounts are copied into A's directory", porque: "Federação existe justamente para não precisar copiar ou criar contas." },
          { t: "Both organizations now share a single identity provider", porque: "Cada uma mantém o seu provedor de identidade (IdP). Só existe uma relação de confiança entre eles." }
        ]
      }
    },

    {
      secao: "",
      titulo: "Resumo: as listas que a prova cobra",
      html: `
<p>Antes da prova, confira se você lembra de cada lista sem olhar:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Lista</th><th>Itens</th></tr>
<tr><td>Sempre do cliente (shared responsibility)</td><td>Dados · contas e identidades · dispositivos · configurações</td></tr>
<tr><td>Shared responsibility em IA (3)</td><td>AI platform · AI application · AI usage</td></tr>
<tr><td>Defense in depth (7, de fora para dentro)</td><td>Physical · Identity and access · Perimeter · Network · Compute · Application · Data</td></tr>
<tr><td>CIA (3)</td><td>Confidentiality · Integrity · Availability</td></tr>
<tr><td>Zero Trust, princípios (3)</td><td>Verify explicitly · Use least privileged access · Assume breach</td></tr>
<tr><td>Zero Trust, pilares (7)</td><td>Identities · Devices · Applications · Data · Infrastructure · Networks · Visibility, automation and orchestration</td></tr>
<tr><td>Estados do dado (3)</td><td>At rest · In transit · In use</td></tr>
<tr><td>Criptografia (2)</td><td>Symmetric (1 chave) · Asymmetric (par pública/privada)</td></tr>
<tr><td>GRC (3)</td><td>Governance · Risk · Compliance</td></tr>
<tr><td>Risco (4 passos)</td><td>Identify · Assess · Respond · Monitor</td></tr>
<tr><td>Respostas ao risco (4)</td><td>Accept · Mitigate · Transfer · Avoid</td></tr>
<tr><td>Dados e lei (3)</td><td>Residency (onde) · Sovereignty (qual lei) · Privacy (dado pessoal)</td></tr>
<tr><td>Pilares da identidade (4)</td><td>Administration · Authentication · Authorization · Auditing</td></tr>
<tr><td>Tipos de identidade</td><td>Human · Device · Workload · Agent (IA)</td></tr>
<tr><td>Fatores de autenticação (3)</td><td>Something you know · have · are</td></tr>
<tr><td>Protocolos</td><td>OIDC (authN, ID token) · OAuth 2.0 (authZ, access token) · SAML (corporativo, federação)</td></tr>
<tr><td>Limitações do AD DS (4)</td><td>Sem SaaS nativo · sem não-Windows nativo · sem OAuth/OIDC · remoto precisa de VPN</td></tr>
<tr><td>Federação, cenários (3)</td><td>B2B · identidade social · AD FS (on-premises)</td></tr>
</table></div>
<p>Se travou em alguma, volte à parte dela antes da prova. Depois, faça a prova até passar e use "Treinar só os erros".</p>
<div class="nota">Para conferir de outro jeito, faça também o <b>practice assessment</b> gratuito da Microsoft: <a href="https://aka.ms/SC900-PA" target="_blank" rel="noopener">aka.ms/SC900-PA</a>. É da própria Microsoft e mostra o estilo das perguntas.</div>`
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
          ] },
        { tipo: "simnao",
          itens: [
            { t: "In SaaS, the customer is responsible for managing user accounts and identities.", ok: true, porque: "Contas e identidades (accounts and identities) são sempre do cliente." },
            { t: "In IaaS, the cloud provider is responsible for patching the guest operating system.", ok: false, porque: "Em IaaS o sistema operacional da VM é do cliente." },
            { t: "In every cloud model, the provider is responsible for the physical datacenter.", ok: true, porque: "A segurança física (physical security) na nuvem é sempre do provedor." }
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
          ] },
        { tipo: "ligar",
          q: "Match each control to the defense-in-depth layer it belongs to.",
          pares: [
            { a: "DDoS protection at the network edge", b: "Perimeter", porque: "Proteção contra DDoS e firewall de borda são a camada de perímetro (perimeter)." },
            { a: "Network security groups between subnets", b: "Network", porque: "Segmentar e filtrar tráfego entre recursos é a camada de rede (network)." },
            { a: "Keeping VMs patched and closing unused ports", b: "Compute", porque: "A proteção da VM é a camada de processamento (compute)." },
            { a: "Conditional Access and MFA", b: "Identity and access", porque: "MFA, RBAC e Conditional Access são identidade e acesso (identity and access)." }
          ],
          extras: ["Data", "Physical security"] }
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
          ] },
        { tipo: "varias",
          q: "Which TWO measures are examples of a defense-in-depth approach? (Choose two.)",
          opcoes: [
            { t: "Requiring MFA in addition to network segmentation", ok: true, porque: "Controles em camadas diferentes (identity and access + network)." },
            { t: "Encrypting data and also restricting physical access to servers", ok: true, porque: "Camadas data e physical se somando." },
            { t: "Relying on a single perimeter firewall for all protection", porque: "Uma barreira só é o oposto de defesa em profundidade." },
            { t: "Allowing all traffic between internal servers", porque: "Rede interna sem segmentação tira uma camada." }
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
          ] },
        { tipo: "ligar",
          q: "Match each practice to the Zero Trust principle it applies.",
          pares: [
            { a: "Evaluating user location and device health at every sign-in", b: "Verify explicitly", porque: "Usar todos os sinais para decidir é verificar explicitamente (verify explicitly)." },
            { a: "Granting admin rights just-in-time for two hours", b: "Use least privileged access", porque: "JIT e JEA são privilégio mínimo (least privileged access)." },
            { a: "Segmenting the network to limit the blast radius", b: "Assume breach", porque: "Limitar o estrago parte da ideia de que já houve invasão (assume breach)." }
          ],
          extras: ["Defense in depth"] }
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
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Zero Trust is a security strategy, not a single product.", ok: true, porque: "O Learn descreve Zero Trust como estratégia (strategy), aplicada com vários produtos." },
            { t: "In a Zero Trust model, devices inside the corporate network are trusted by default.", ok: false, porque: "Zero Trust não confia em nada só por estar 'dentro'; isso é o modelo castelo com fosso (castle-and-moat)." },
            { t: "Visibility, automation and orchestration collects signals from the other Zero Trust pillars.", ok: true, porque: "Esse sétimo pilar junta os sinais (SIEM) e automatiza a resposta (SOAR)." }
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
          ] },
        { tipo: "completar",
          q: "Protecting data while it is being processed in memory, using secure enclaves, is called encryption ___.",
          opcoes: [
            { t: "in use", ok: true, porque: "Dado na memória durante o processamento é dado em uso (in use), protegido por confidential computing." },
            { t: "at rest", porque: "Em repouso (at rest) é o dado guardado em disco ou banco." },
            { t: "in transit", porque: "Em trânsito (in transit) é o dado passando pela rede." },
            { t: "by hashing", porque: "Hash não é criptografia e não deixa o dado utilizável para processamento." }
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
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Hashing uses a secret key to produce its output.", ok: false, porque: "Hash não usa chave (key). Quem usa chave é a criptografia." },
            { t: "A hash cannot be reversed to obtain the original data.", ok: true, porque: "Hash é só de ida (one-way)." },
            { t: "Without a salt, the same input always produces the same hash.", ok: true, porque: "Hash é determinístico; é por isso que se usa salt nas senhas." }
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
          ] },
        { tipo: "ligar",
          q: "Match each concept to its description.",
          pares: [
            { a: "Data residency", b: "Where data is physically stored and how it can cross borders", porque: "Residência (residency) é sobre o lugar." },
            { a: "Data sovereignty", b: "Data is subject to the laws of the country where it is collected or held", porque: "Soberania (sovereignty) é sobre qual lei vale." },
            { a: "Data privacy", b: "Transparency, consent and individuals' rights over their personal data", porque: "Privacidade (privacy) é sobre o titular do dado pessoal." }
          ],
          extras: ["Encrypting data in transit"] }
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
          ] },
        { tipo: "ligar",
          q: "Match each activity to the pillar of identity infrastructure.",
          pares: [
            { a: "Disabling the account of an employee who left", b: "Administration", porque: "Ciclo de vida da conta é administração (administration)." },
            { a: "Verifying a user's password and MFA code", b: "Authentication", porque: "Provar a identidade é autenticação (authentication)." },
            { a: "Deciding the user can read but not delete a file", b: "Authorization", porque: "Decidir permissões é autorização (authorization)." },
            { a: "Reviewing sign-in logs after a suspicious event", b: "Auditing", porque: "Logs e investigação são auditoria (auditing)." }
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
          ] },
        { tipo: "completar",
          q: "The process of proving that a person or service is who it claims to be is called ___.",
          opcoes: [
            { t: "authentication", ok: true, porque: "Provar a identidade é autenticação (authentication)." },
            { t: "authorization", porque: "Autorização (authorization) decide o que a identidade pode fazer." },
            { t: "federation", porque: "Federação (federation) é confiança entre IdPs." },
            { t: "auditing", porque: "Auditoria (auditing) registra o que aconteceu." }
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
          ] },
        { tipo: "varias",
          q: "Which TWO are benefits of single sign-on (SSO)? Each correct answer presents a complete solution. (Choose two.)",
          opcoes: [
            { t: "Users have fewer credentials to remember and fewer sign-in prompts", ok: true, porque: "Uma credencial e um login para vários apps." },
            { t: "Disabling an account in the identity provider removes access to all connected apps", ok: true, porque: "Controle central é um dos benefícios do SSO." },
            { t: "Applications no longer need to authorize users", porque: "Cada app continua fazendo a autorização (authorization)." },
            { t: "Multifactor authentication is no longer needed", porque: "SSO e MFA se combinam; um não substitui o outro." }
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
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Microsoft Entra ID is a cloud-based identity and access management service.", ok: true, porque: "O Entra ID é o serviço de identidade em nuvem, no modelo IDaaS." },
            { t: "Active Directory Domain Services natively supports OpenID Connect and OAuth 2.0.", ok: false, porque: "O AD DS usa Kerberos e NTLM; não suporta OAuth/OIDC nativamente." },
            { t: "Remote users usually need a VPN to authenticate against on-premises AD DS.", ok: true, porque: "É uma das limitações do AD DS que o Learn lista." }
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
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Federation requires users to create a new account in each partner organization.", ok: false, porque: "Federação existe para dispensar contas novas: o parceiro aceita a autenticação feita na origem." },
            { t: "A federation trust is automatically two-way.", ok: false, porque: "A confiança (trust) não é automaticamente nos dois sentidos; a volta precisa ser configurada." },
            { t: "Signing in to a website with a Google or GitHub account is an example of federation.", ok: true, porque: "Login com identidade social (social identity provider) é um dos cenários de federação do Learn." }
          ] }
      ]
    },
    {
      id: "sr-ia", topico: "1.1", resumo: "Responsabilidade compartilhada em IA",
      variantes: [
        { q: "In the AI shared responsibility model, which layer includes the inputs users type and the organization's acceptable use policies?",
          opcoes: [
            { t: "AI usage", ok: true, porque: "A camada de uso (AI usage) trata do que as pessoas fazem com a IA; é do cliente." },
            { t: "AI platform", porque: "A plataforma (AI platform) é a infraestrutura e o modelo." },
            { t: "AI application", porque: "A aplicação (AI application) é a configuração: fontes de dados, conectores, plugins." },
            { t: "AI perimeter", porque: "Não existe essa camada no modelo." }
          ] },
        { q: "An organization uses Microsoft 365 Copilot. Which responsibility remains with the organization?",
          opcoes: [
            { t: "Controlling which users can access Copilot and what data it can reach", ok: true, porque: "Identidade, acesso e dados continuam sendo do cliente, mesmo em IA como SaaS." },
            { t: "Hosting and patching the underlying AI model", porque: "Hospedar e manter o modelo é da plataforma (AI platform), do provedor." },
            { t: "Securing the physical datacenter", porque: "Segurança física é sempre do provedor na nuvem." },
            { t: "Building the platform safety controls of the model", porque: "Os controles da plataforma são do provedor." }
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Protecting against prompt injection is something the customer must consider when using AI apps.", ok: true, porque: "O Learn cita riscos próprios de IA, como prompt injection, entre as responsabilidades do cliente." },
            { t: "When using an AI SaaS product, the provider becomes responsible for the data users share with it.", ok: false, porque: "A responsabilidade pelos dados (data) nunca passa para o provedor." },
            { t: "The AI shared responsibility model has three layers: platform, application and usage.", ok: true, porque: "São as três camadas: AI platform, AI application, AI usage." }
          ] }
      ]
    },
    {
      id: "cia", topico: "1.1", resumo: "CIA e os controles de cada uma",
      variantes: [
        { q: "A ransomware attack encrypts a company's file servers so employees can't open their files. Which objective is MOST directly affected?",
          opcoes: [
            { t: "Availability", ok: true, porque: "Os arquivos ficaram inacessíveis para quem tem direito: disponibilidade (availability)." },
            { t: "Confidentiality", porque: "O efeito direto é não conseguir usar os arquivos, não alguém lê-los." },
            { t: "Integrity", porque: "O ransomware altera os arquivos, mas o efeito principal é eles ficarem inacessíveis (availability)." },
            { t: "Authentication", porque: "Autenticação não é um dos objetivos da CIA." }
          ] },
        { q: "Digital signatures and audit logs are controls that mainly support which objective?",
          opcoes: [
            { t: "Integrity", ok: true, porque: "Os dois servem para garantir e provar que o dado não foi alterado indevidamente (integrity)." },
            { t: "Availability", porque: "Disponibilidade é protegida por redundância e backup." },
            { t: "Confidentiality", porque: "Assinatura não esconde o conteúdo." },
            { t: "Data residency", porque: "Residência é sobre onde o dado fica." }
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Losing an encryption key can make data unavailable.", ok: true, porque: "O Learn usa esse exemplo: confidencialidade e disponibilidade podem conflitar." },
            { t: "Load balancing and failover mainly protect confidentiality.", ok: false, porque: "Eles mantêm o serviço funcionando: disponibilidade (availability)." },
            { t: "Encryption is the main control for confidentiality.", ok: true, porque: "Criptografia é o controle central da confidencialidade (confidentiality), junto com controle de acesso." }
          ] }
      ]
    },
    {
      id: "chaves", topico: "1.1", resumo: "Gestão de chaves (HSM, rotação, Key Vault)",
      variantes: [
        { q: "Which practice is recommended for managing encryption keys?",
          opcoes: [
            { t: "Store keys separately from the data they protect", ok: true, porque: "Se a chave fica junto do dado, quem rouba um leva o outro." },
            { t: "Store keys in the same database as the encrypted data for convenience", porque: "É exatamente o que não se deve fazer." },
            { t: "Never rotate keys so applications don't break", porque: "A recomendação é rotacionar as chaves (key rotation) regularmente." },
            { t: "Share keys with all administrators by email", porque: "O acesso às chaves deve ser restrito e controlado." }
          ] },
        { q: "What is a hardware security module (HSM)?",
          opcoes: [
            { t: "Tamper-resistant hardware designed to protect cryptographic keys", ok: true, porque: "HSM é hardware resistente a violação (tamper-resistant) para guardar e usar chaves." },
            { t: "A firewall that inspects encrypted traffic", porque: "Firewall filtra tráfego; não é cofre de chaves." },
            { t: "A tool that hashes passwords", porque: "Hash não depende de HSM." },
            { t: "A backup appliance for databases", porque: "Backup não tem relação com proteger chaves." }
          ] },
        { tipo: "varias",
          q: "Which TWO are good key management practices? (Choose two.)",
          opcoes: [
            { t: "Rotate keys regularly", ok: true, porque: "A rotação (rotation) limita o estrago se uma chave vazar." },
            { t: "Tightly control who can access the keys", ok: true, porque: "O acesso às chaves deve ser mínimo e auditado." },
            { t: "Hard-code keys in application source code", porque: "Chave no código vaza junto com o código." },
            { t: "Use the same key for every system", porque: "Uma chave para tudo aumenta o estrago de um vazamento." }
          ] }
      ]
    },
    {
      id: "risco", topico: "1.1", resumo: "Gestão de risco: passos e avaliação",
      variantes: [
        { q: "In risk management, how is a risk typically scored during assessment?",
          opcoes: [
            { t: "By combining its impact and its likelihood", ok: true, porque: "Impacto × probabilidade (impact × likelihood) dá a nota do risco." },
            { t: "By counting the number of controls in place", porque: "Quantidade de controles não mede o risco." },
            { t: "By the cost of the affected asset only", porque: "Valor do ativo é parte do impacto, mas falta a probabilidade." },
            { t: "By how many users report it", porque: "Não é assim que se avalia risco." }
          ] },
        { tipo: "completar",
          q: "After identifying, assessing and responding to risks, an organization must ___ them because risks change over time.",
          opcoes: [
            { t: "monitor", ok: true, porque: "O quarto passo é monitorar (monitor)." },
            { t: "ignore", porque: "Risco muda; ignorar não faz parte do ciclo." },
            { t: "encrypt", porque: "Criptografar é um controle, não um passo da gestão de risco." },
            { t: "federate", porque: "Federação é sobre identidade." }
          ] },
        { tipo: "ligar",
          q: "Match each action to the risk response.",
          pares: [
            { a: "Buying cyber insurance", b: "Transfer", porque: "Passar o impacto financeiro para a seguradora é transferir (transfer)." },
            { a: "Deploying MFA to reduce account takeover", b: "Mitigate", porque: "Reduzir a chance com um controle é mitigar (mitigate)." },
            { a: "Shutting down a risky legacy service", b: "Avoid", porque: "Deixar de fazer a atividade é evitar (avoid)." },
            { a: "Documenting a low risk and taking no action", b: "Accept", porque: "Decidir conscientemente conviver com o risco é aceitar (accept)." }
          ] }
      ]
    },
    {
      id: "authz-modelos", topico: "1.2", resumo: "Autorização: RBAC, ABAC, least privilege",
      variantes: [
        { q: "A company grants permissions to users by assigning them to job functions such as 'Helpdesk' or 'Auditor'. Which model is this?",
          opcoes: [
            { t: "Role-based access control (RBAC)", ok: true, porque: "Permissões vindas de um papel (role) são RBAC." },
            { t: "Attribute-based access control (ABAC)", porque: "ABAC decide por atributos como departamento ou local." },
            { t: "Federation", porque: "Federação é confiança entre IdPs." },
            { t: "Single sign-on", porque: "SSO é sobre login, não sobre permissões." }
          ] },
        { q: "Which principle states that users should receive only the permissions needed to perform their tasks?",
          opcoes: [
            { t: "Least privilege", ok: true, porque: "É a definição de privilégio mínimo (least privilege)." },
            { t: "Defense in depth", porque: "Defesa em profundidade é sobre camadas." },
            { t: "Assume breach", porque: "Assume breach é segmentar e monitorar como se já houvesse invasão." },
            { t: "Separation of duties", porque: "Separação de funções divide uma tarefa entre pessoas; não é a definição pedida." }
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Authorization can be based on attributes such as department and location.", ok: true, porque: "O Learn cita papéis, permissões e atributos (attributes)." },
            { t: "Just-in-time access means privileged permissions are available permanently.", ok: false, porque: "JIT é o contrário: a permissão existe só quando precisa." },
            { t: "Authorization happens only after successful authentication.", ok: true, porque: "Primeiro authentication, depois authorization." }
          ] }
      ]
    },
    {
      id: "tokens", topico: "1.2", resumo: "Tokens e claims (ID token, access token)",
      variantes: [
        { q: "What is a claim in a security token?",
          opcoes: [
            { t: "A piece of information about the identity, such as name, role or expiration", ok: true, porque: "Claims são as afirmações dentro do token." },
            { t: "The password of the user", porque: "Senha nunca vai no token." },
            { t: "A trust relationship between two organizations", porque: "Isso é federação (trust)." },
            { t: "The encryption key used for data at rest", porque: "Não tem relação com tokens." }
          ] },
        { q: "Which token is used by an application to call a protected API on behalf of the user?",
          opcoes: [
            { t: "Access token", ok: true, porque: "O access token (OAuth 2.0) dá acesso ao recurso." },
            { t: "ID token", porque: "O ID token prova o login; não é para chamar APIs." },
            { t: "Refresh token", porque: "O refresh token serve para obter novos access tokens; não é ele que chama a API." },
            { t: "SAML metadata", porque: "Metadata descreve a configuração da federação; não autoriza chamadas." }
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Security tokens issued by an identity provider are time-limited.", ok: true, porque: "Tokens têm validade (expiration) e precisam ser renovados." },
            { t: "An ID token is used to prove that a user signed in.", ok: true, porque: "O ID token (OpenID Connect) é a prova de autenticação." },
            { t: "Applications must store the user's password to validate a token.", ok: false, porque: "O app confere a assinatura do IdP; nunca precisa da senha." }
          ] }
      ]
    },
    {
      id: "protocolos", topico: "1.2", resumo: "Protocolos: OIDC, OAuth 2.0, SAML",
      variantes: [
        { tipo: "ligar",
          q: "Match each protocol to how Microsoft Learn describes it.",
          pares: [
            { a: "OpenID Connect", b: "Authentication layer built on OAuth 2.0", porque: "OIDC faz a autenticação e emite o ID token." },
            { a: "OAuth 2.0", b: "Authorization framework that issues access tokens", porque: "OAuth 2.0 é de autorização." },
            { a: "SAML", b: "Used by many enterprise and older apps and for federation", porque: "SAML é o protocolo clássico de federação corporativa." }
          ],
          extras: ["Network-level encryption between datacenters"] },
        { q: "Which protocol does Microsoft Learn describe as an authentication layer built on top of OAuth 2.0?",
          opcoes: [
            { t: "OpenID Connect", ok: true, porque: "OIDC adiciona a autenticação sobre o OAuth 2.0." },
            { t: "SAML", porque: "SAML é independente do OAuth." },
            { t: "Kerberos", porque: "Kerberos é o protocolo do AD DS." },
            { t: "NTLM", porque: "NTLM é um protocolo antigo do Windows." }
          ] },
        { tipo: "completar",
          q: "A company's older enterprise web apps rely on XML-based assertions for federation. These apps most likely use ___.",
          opcoes: [
            { t: "SAML", ok: true, porque: "SAML usa asserções em XML e é comum em apps corporativos e federação." },
            { t: "OpenID Connect", porque: "OIDC usa tokens JSON (JWT), não asserções XML." },
            { t: "OAuth 2.0", porque: "OAuth 2.0 é de autorização e usa access tokens." },
            { t: "Kerberos", porque: "Kerberos é para a rede interna do AD DS." }
          ] }
      ]
    },
    {
      id: "tipos-identidade", topico: "1.2", resumo: "Tipos de identidade (humana, dispositivo, workload, agente)",
      variantes: [
        { tipo: "ligar",
          q: "Match each example to the type of identity.",
          pares: [
            { a: "An employee signing in to email", b: "Human", porque: "Uma pessoa é identidade humana (human)." },
            { a: "A laptop registered in the directory", b: "Device", porque: "Dispositivo (device) também tem identidade." },
            { a: "A backend service calling an API", b: "Workload", porque: "Software e serviços usam identidade de workload (workload identity)." },
            { a: "An AI agent acting on tasks for users", b: "Agent", porque: "O Learn agora cita identidades de agentes de IA (agent)." }
          ] },
        { q: "A script running in Azure needs to authenticate to read a storage account. What type of identity should it use?",
          opcoes: [
            { t: "A workload identity", ok: true, porque: "Apps, serviços e scripts usam identidade de workload." },
            { t: "A shared human user account", porque: "Conta humana compartilhada para script é má prática e quebra a rastreabilidade." },
            { t: "A guest identity", porque: "Guest é uma pessoa de fora da organização." },
            { t: "A device identity", porque: "Device identity é do dispositivo, não do software." }
          ] },
        { tipo: "simnao",
          itens: [
            { t: "Devices can have identities in a directory.", ok: true, porque: "Identidade de dispositivo (device identity) é um dos tipos." },
            { t: "Only humans can have identities.", ok: false, porque: "Dispositivos, workloads e agentes também têm." },
            { t: "AI agents may need their own identities to access resources.", ok: true, porque: "O Learn cita identidades de agente (agent identities)." }
          ] }
      ]
    },
    {
      id: "adds-recursos", topico: "1.2", resumo: "AD DS: Kerberos/NTLM, OUs, Group Policy",
      variantes: [
        { q: "Which authentication protocols does on-premises AD DS use?",
          opcoes: [
            { t: "Kerberos and NTLM", ok: true, porque: "São os protocolos do AD DS na rede interna." },
            { t: "OAuth 2.0 and OpenID Connect", porque: "Esses são os protocolos modernos que o AD DS não suporta nativamente." },
            { t: "SAML only", porque: "SAML é de federação, com AD FS por exemplo, não do AD DS em si." },
            { t: "SMTP and IMAP", porque: "São protocolos de e-mail." }
          ] },
        { tipo: "ligar",
          q: "Match each AD DS feature to its description.",
          pares: [
            { a: "Domain controller", b: "Server that runs AD DS and verifies sign-ins", porque: "O servidor com AD DS é o controlador de domínio (domain controller)." },
            { a: "Organizational unit (OU)", b: "Container used to organize directory objects", porque: "OUs organizam usuários, grupos e computadores." },
            { a: "Group Policy", b: "Applies configuration settings to Windows computers and users", porque: "Group Policy aplica configurações às máquinas do domínio." }
          ],
          extras: ["Issues access tokens for cloud APIs"] },
        { tipo: "simnao",
          itens: [
            { t: "Active Directory was first released with Windows 2000 Server.", ok: true, porque: "É o histórico que o Learn cita." },
            { t: "AD DS natively manages iOS and Android devices.", ok: false, porque: "Não suportar dispositivos não-Windows nativamente é uma das limitações do AD DS." },
            { t: "AD DS can be synchronized with Microsoft Entra ID to create a hybrid identity.", ok: true, porque: "É a identidade híbrida (hybrid identity)." }
          ] }
      ]
    }
  ]
};
