/* ISC2 CC · Domínio 1 · Security Principles (24%)
 * Base: exam outline oficial da ISC2, vigente desde 2026-09-01 (tópicos 1.1 a 1.5).
 * Conteúdo escrito do zero. Não contém perguntas reais da prova.
 * Lições em português (termos da prova em inglês). Perguntas da prova em inglês; explicações em português.
 */
window.MODULO = {
  cert: "ISC2 CC",
  titulo: "Domínio 1 · Security Principles",
  aprovacao: 70,
  rodada: 10,
  topicos: {
    "1.1": "Conceitos de segurança",
    "1.2": "Gestão de risco",
    "1.3": "Governança",
    "1.4": "Controles",
    "1.5": "Ética e conduta"
  },

  licoes: [
    // ------------------------------------------------------------------ abertura
    {
      secao: "",
      titulo: "O que tem neste módulo",
      html: `
<p>O domínio 1 vale <span class="termo">24% da prova</span>, o maior peso da CC. São cinco tópicos, cada um com partes curtas e algumas checagens rápidas. No fim vem a prova do módulo.</p>
<div class="degraus">
  <div class="degrau surge d1"><b>1.1</b> Conceitos: CIA, AAA, não repúdio, privacidade</div>
  <div class="degrau surge d2"><b>1.2</b> Gestão de risco: ciclo de vida e processos</div>
  <div class="degrau surge d3"><b>1.3</b> Governança: leis, frameworks, políticas</div>
  <div class="degrau surge d4"><b>1.4</b> Controles: técnicos, administrativos, físicos</div>
  <div class="degrau surge d5"><b>1.5</b> Ética: due care, due diligence, código da ISC2</div>
</div>
<div class="nota">A prova é em <b>inglês</b>. Por isso os termos aparecem nos dois idiomas, e as perguntas da prova deste módulo são em inglês.</div>
<p class="pequeno">Dica de foco: faça uma parte, respire, faça a próxima. Seu progresso fica salvo, dá para parar e voltar depois.</p>`
    },

    // ------------------------------------------------------------------ 1.1 CIA
    {
      secao: "1.1",
      titulo: "A tríade CIA",
      html: `
<p>Quase toda pergunta de segurança volta para três objetivos. Decore o nome em inglês, porque é assim que aparece na prova.</p>
<svg class="anim" viewBox="0 0 400 310" role="img" aria-label="Triângulo com Confidentiality, Integrity e Availability">
  <polygon class="traco desenha s-destaque" pathLength="1" points="200,70 80,220 320,220" style="stroke-width:3"/>
  <g class="surge d1"><circle class="f-destaque" cx="200" cy="70" r="24"/><text class="tx-branco" x="200" y="77" text-anchor="middle" font-weight="700" font-size="20">C</text>
    <text x="200" y="22" text-anchor="middle" font-weight="600" font-size="17">Confidentiality</text><text class="tx2" x="200" y="40" text-anchor="middle" font-size="14">só quem pode, vê</text></g>
  <g class="surge d2"><circle class="f-coral" cx="80" cy="220" r="24"/><text class="tx-branco" x="80" y="227" text-anchor="middle" font-weight="700" font-size="20">I</text>
    <text x="80" y="270" text-anchor="middle" font-weight="600" font-size="17">Integrity</text><text class="tx2" x="80" y="288" text-anchor="middle" font-size="14">ninguém altera</text><text class="tx2" x="80" y="304" text-anchor="middle" font-size="14">sem permissão</text></g>
  <g class="surge d3"><circle class="f-roxo" cx="320" cy="220" r="24"/><text class="tx-branco" x="320" y="227" text-anchor="middle" font-weight="700" font-size="20">A</text>
    <text x="320" y="270" text-anchor="middle" font-weight="600" font-size="17">Availability</text><text class="tx2" x="320" y="288" text-anchor="middle" font-size="14">está lá quando</text><text class="tx2" x="320" y="304" text-anchor="middle" font-size="14">precisa</text></g>
</svg>
<div class="tabela-rolagem"><table class="t">
<tr><th>Objetivo</th><th>O ataque contra ele</th><th>Como proteger</th></tr>
<tr><td><b>Confidentiality</b></td><td>Divulgação <span class="en">(disclosure)</span>: vazamento, olhar por cima do ombro</td><td>Criptografia, controle de acesso, classificação de dados</td></tr>
<tr><td><b>Integrity</b></td><td>Alteração <span class="en">(alteration)</span>: mudar um valor, adulterar um log</td><td>Hash, assinatura digital, controle de versões</td></tr>
<tr><td><b>Availability</b></td><td>Destruição ou indisponibilidade <span class="en">(destruction / denial)</span>: DoS, ransomware</td><td>Redundância, backup, plano de continuidade</td></tr>
</table></div>
<div class="prova-dica">o contrário da CIA às vezes aparece como <b>DAD</b>: Disclosure, Alteration, Destruction.</div>`,
      checagem: {
        q: "Um atacante muda o valor de uma transferência de R$ 100 para R$ 10.000 antes de ela ser gravada. Qual objetivo foi violado?",
        opcoes: [
          { t: "Integridade", ok: true, porque: "O dado foi alterado sem autorização. Isso é ataque à integridade." },
          { t: "Confidencialidade", porque: "Ninguém precisou ver o dado para alterá-lo. O problema não é divulgação." },
          { t: "Disponibilidade", porque: "O sistema continuou funcionando. O dado só ficou errado." },
          { t: "Não repúdio", porque: "Não repúdio é sobre provar quem fez algo. Aqui o problema é a alteração em si." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 AAA
    {
      secao: "1.1",
      titulo: "AAA: Authentication, Authorization, Accounting",
      html: `
<p>Antes do AAA existe um passo zero: a <span class="termo">identificação</span> <span class="en">(identification)</span>. É quando você <i>diz</i> quem é, por exemplo digitando o usuário. Depois vem o AAA:</p>
<svg class="anim" viewBox="0 0 400 200" role="img" aria-label="Fluxo identificação, autenticação, autorização e accounting">
  <g class="surge d1"><rect class="caixa" x="10" y="10" width="170" height="70" rx="12"/><text x="95" y="40" text-anchor="middle" font-weight="600" font-size="17">0 · Identificar</text><text class="tx2" x="95" y="63" text-anchor="middle" font-size="14">"sou a Ana"</text></g>
  <path class="traco desenha d2" pathLength="1" d="M182 45 H 218"/>
  <g class="surge d2"><rect class="caixa" x="220" y="10" width="170" height="70" rx="12" style="stroke:var(--destaque);stroke-width:2"/><text x="305" y="40" text-anchor="middle" font-weight="600" font-size="17">Authentication</text><text class="tx2" x="305" y="63" text-anchor="middle" font-size="14">"prove que é"</text></g>
  <path class="traco desenha d3" pathLength="1" d="M305 82 V 100 H 95 V 118"/>
  <g class="surge d3"><rect class="caixa" x="10" y="120" width="170" height="70" rx="12" style="stroke:var(--coral);stroke-width:2"/><text x="95" y="150" text-anchor="middle" font-weight="600" font-size="17">Authorization</text><text class="tx2" x="95" y="173" text-anchor="middle" font-size="14">"pode fazer isso?"</text></g>
  <path class="traco desenha d4" pathLength="1" d="M182 155 H 218"/>
  <g class="surge d4"><rect class="caixa" x="220" y="120" width="170" height="70" rx="12" style="stroke:var(--roxo);stroke-width:2"/><text x="305" y="150" text-anchor="middle" font-weight="600" font-size="17">Accounting</text><text class="tx2" x="305" y="173" text-anchor="middle" font-size="14">"registre tudo"</text></g>
</svg>
<ul>
<li><b>Authentication:</b> provar a identidade. Usa um ou mais <span class="termo">fatores</span>:
  <ul><li>algo que você <b>sabe</b> <span class="en">(something you know)</span>: senha, PIN</li>
  <li>algo que você <b>tem</b> <span class="en">(something you have)</span>: celular, token, smart card</li>
  <li>algo que você <b>é</b> <span class="en">(something you are)</span>: digital, rosto</li></ul></li>
<li><b>Authorization:</b> decidir o que a identidade autenticada pode fazer.</li>
<li><b>Accounting:</b> registrar o que foi feito (logs, trilha de auditoria). É o que permite investigar depois.</li>
</ul>
<div class="prova-dica"><b>MFA</b> exige fatores de <b>tipos diferentes</b>. Senha + PIN são dois "algo que você sabe", então <b>não</b> é MFA.</div>
<div class="ponte">o PingFederate autentica o usuário; o PingAccess decide se a requisição pode passar (autorização); os logs dos dois são o accounting.</div>`,
      checagem: {
        q: "Qual combinação é MFA de verdade?",
        opcoes: [
          { t: "Senha + código enviado ao celular cadastrado", ok: true, porque: "Algo que você sabe (senha) + algo que você tem (celular). Dois tipos diferentes." },
          { t: "Senha + pergunta de segurança", porque: "As duas são algo que você sabe. É autenticação em duas etapas, mas com um tipo só de fator." },
          { t: "Senha + PIN", porque: "Dois fatores do mesmo tipo (conhecimento) não formam MFA." },
          { t: "Usuário + senha", porque: "O usuário é identificação, não autenticação. Só a senha autentica." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 não repúdio
    {
      secao: "1.1",
      titulo: "Não repúdio",
      html: `
<p><span class="termo">Não repúdio</span> <span class="en">(non-repudiation)</span> é garantir que alguém <b>não consiga negar</b> que fez uma ação, como enviar uma mensagem ou aprovar uma transação.</p>
<p>Ele depende de duas coisas juntas:</p>
<ul>
<li><b>Ligar a ação a uma identidade única.</b> Conta compartilhada destrói o não repúdio: se três pessoas usam o mesmo login, ninguém prova quem fez.</li>
<li><b>Uma prova que só aquela pessoa poderia produzir.</b> O exemplo clássico é a <span class="termo">assinatura digital</span>: só o dono da chave privada consegue assinar.</li>
</ul>
<div class="prova-dica">se a pergunta fala em "provar quem enviou" ou "o remetente não pode negar", a resposta é <b>non-repudiation</b>, normalmente via <b>digital signature</b>. Criptografia simétrica sozinha não dá não repúdio, porque os dois lados têm a mesma chave.</div>
<div class="ponte">um JWT assinado com RS256 tem esse efeito: só quem tem a chave privada do emissor consegue gerar aquela assinatura.</div>`,
      checagem: {
        q: "Uma equipe de suporte usa a mesma conta de administrador. Qual princípio fica mais prejudicado?",
        opcoes: [
          { t: "Não repúdio (e accounting)", ok: true, porque: "Com conta compartilhada, os logs não mostram qual pessoa agiu. Ninguém pode ser responsabilizado." },
          { t: "Disponibilidade", porque: "A conta compartilhada não derruba nenhum sistema." },
          { t: "Integridade", porque: "Pode até facilitar alterações indevidas, mas o efeito direto é perder a ligação ação ↔ pessoa." },
          { t: "Privacidade", porque: "Privacidade trata de dados pessoais de titulares, não de quem operou o sistema." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.1 privacidade
    {
      secao: "1.1",
      titulo: "Privacidade",
      html: `
<p><span class="termo">Privacidade</span> <span class="en">(privacy)</span> é o direito da pessoa de controlar como os dados <b>dela</b> são coletados, usados e compartilhados.</p>
<p>Ela é diferente de confidencialidade:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th></th><th>Confidencialidade</th><th>Privacidade</th></tr>
<tr><td>Protege</td><td>Qualquer informação sensível (segredo industrial, chave, contrato)</td><td>Dados <b>pessoais</b> <span class="en">(PII)</span></td></tr>
<tr><td>Pergunta central</td><td>Quem pode ver?</td><td>A pessoa sabe e concordou com o uso?</td></tr>
</table></div>
<p><span class="termo">PII</span> <span class="en">(Personally Identifiable Information)</span> é qualquer dado que identifica uma pessoa, sozinho ou combinado: nome, CPF, e-mail, endereço, biometria.</p>
<p>Leis de privacidade, como a <b>GDPR</b> (Europa) e a <b>LGPD</b> (Brasil), dão direitos ao titular: saber o que é coletado, corrigir, pedir exclusão, e exigem uma base legal (como o consentimento) para tratar os dados.</p>
<div class="ponte">em CIAM, consentimento, finalidade da coleta e exclusão de conta são o dia a dia. Você protege a confidencialidade dos dados do cliente <i>e</i> respeita a privacidade dele.</div>`
    },

    // ------------------------------------------------------------------ 1.2 vocabulário de risco
    {
      secao: "1.2",
      titulo: "O vocabulário do risco",
      html: `
<p>A prova cobra muito a diferença entre estes termos. Vale ler devagar.</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Termo</th><th>O que é</th><th>Exemplo</th></tr>
<tr><td><b>Asset</b> (ativo)</td><td>Algo de valor que precisa ser protegido</td><td>Base de clientes</td></tr>
<tr><td><b>Vulnerability</b></td><td>Uma fraqueza</td><td>Servidor sem patch</td></tr>
<tr><td><b>Threat</b> (ameaça)</td><td>Algo que pode explorar a fraqueza</td><td>Grupo de ransomware</td></tr>
<tr><td><b>Threat vector</b></td><td>O caminho usado pela ameaça</td><td>E-mail de phishing</td></tr>
<tr><td><b>Likelihood</b></td><td>Chance de acontecer</td><td>Alta: o exploit é público</td></tr>
<tr><td><b>Impact</b></td><td>O tamanho do estrago</td><td>Vazamento de 2 milhões de registros</td></tr>
</table></div>
<svg class="anim" viewBox="0 0 400 90" role="img" aria-label="Risco é probabilidade vezes impacto">
  <g class="surge d1"><rect class="caixa" x="4" y="15" width="90" height="60" rx="10"/><text x="49" y="51" text-anchor="middle" font-weight="700" font-size="18">Risk</text></g>
  <text class="surge d2" x="104" y="55" font-size="26">=</text>
  <g class="surge d3"><rect class="caixa" x="130" y="15" width="120" height="60" rx="10" style="stroke:var(--destaque);stroke-width:2"/><text x="190" y="51" text-anchor="middle" font-weight="700" font-size="17">Likelihood</text></g>
  <text class="surge d4" x="258" y="55" font-size="26">×</text>
  <g class="surge d5"><rect class="caixa" x="284" y="15" width="112" height="60" rx="10" style="stroke:var(--coral);stroke-width:2"/><text x="340" y="51" text-anchor="middle" font-weight="700" font-size="17">Impact</text></g>
</svg>
<div class="prova-dica">a gente controla as <b>vulnerabilidades</b> (corrigindo), mas quase nunca controla as <b>ameaças</b>. Sem vulnerabilidade ou sem ameaça, não há risco.</div>`,
      checagem: {
        q: "\"Senhas guardadas em texto puro no banco\" é exemplo de quê?",
        opcoes: [
          { t: "Vulnerabilidade", ok: true, porque: "É uma fraqueza do sistema, que alguém pode explorar." },
          { t: "Ameaça", porque: "A ameaça seria o atacante que rouba e usa essas senhas." },
          { t: "Impacto", porque: "O impacto é a consequência (contas invadidas), não a fraqueza." },
          { t: "Ativo", porque: "O ativo é o que se protege (as contas, o banco). O texto puro é a fraqueza dele." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.2 ciclo de vida
    {
      secao: "1.2",
      titulo: "O ciclo de vida da gestão de risco",
      html: `
<p>Gestão de risco não é um projeto com fim. É um <b>ciclo</b> que se repete.</p>
<svg class="anim" viewBox="0 0 400 330" role="img" aria-label="Ciclo: identificar, avaliar, tratar, monitorar">
  <circle class="traco gira" cx="200" cy="165" r="110" style="stroke-dasharray:8 10;stroke:var(--destaque);stroke-width:2.5"/>
  <g class="surge d1"><rect class="caixa" x="115" y="8" width="170" height="64" rx="12"/><text x="200" y="35" text-anchor="middle" font-weight="700" font-size="17">1 · Identify</text><text class="tx2" x="200" y="57" text-anchor="middle" font-size="13">o que pode dar errado?</text></g>
  <g class="surge d2"><rect class="caixa" x="245" y="133" width="150" height="64" rx="12"/><text x="320" y="160" text-anchor="middle" font-weight="700" font-size="17">2 · Assess</text><text class="tx2" x="320" y="182" text-anchor="middle" font-size="13">chance × impacto</text></g>
  <g class="surge d3"><rect class="caixa" x="115" y="258" width="170" height="64" rx="12"/><text x="200" y="285" text-anchor="middle" font-weight="700" font-size="17">3 · Treat</text><text class="tx2" x="200" y="307" text-anchor="middle" font-size="13">evitar, mitigar, transferir…</text></g>
  <g class="surge d4"><rect class="caixa" x="5" y="133" width="150" height="64" rx="12"/><text x="80" y="160" text-anchor="middle" font-weight="700" font-size="17">4 · Monitor</text><text class="tx2" x="80" y="182" text-anchor="middle" font-size="13">o risco mudou?</text></g>
</svg>
<p>Na etapa de avaliação <span class="en">(assessment)</span> existem dois estilos:</p>
<ul>
<li><b>Qualitativo:</b> usa escalas como baixo, médio e alto, ou uma matriz de cores. Rápido e subjetivo.</li>
<li><b>Quantitativo:</b> usa números e dinheiro (por exemplo, "perda esperada de R$ 200 mil por ano"). Mais preciso, mais trabalhoso.</li>
</ul>
<p class="pequeno">Você vai ver nomes diferentes para as etapas conforme a fonte. O NIST SP 800-39, por exemplo, usa Frame, Assess, Respond e Monitor. A ideia é a mesma.</p>`
    },

    // ------------------------------------------------------------------ 1.2 tratamento
    {
      secao: "1.2",
      titulo: "Tratar o risco: as quatro respostas",
      html: `
<div class="tabela-rolagem"><table class="t">
<tr><th>Resposta</th><th>O que significa</th><th>Exemplo</th></tr>
<tr><td><b>Avoid</b> (evitar)</td><td>Parar a atividade que gera o risco</td><td>Desistir de guardar dados de cartão</td></tr>
<tr><td><b>Mitigate / Reduce</b></td><td>Aplicar controles para diminuir probabilidade ou impacto</td><td>Ativar MFA, aplicar patches</td></tr>
<tr><td><b>Transfer / Share</b></td><td>Passar o impacto financeiro para outro</td><td>Seguro cibernético, terceirizar</td></tr>
<tr><td><b>Accept</b> (aceitar)</td><td>Decidir conviver com o risco, de forma consciente</td><td>Risco baixo, controle mais caro que a perda</td></tr>
</table></div>
<p>Mais três termos que caem bastante:</p>
<ul>
<li><b>Risk appetite:</b> quanto risco a organização <i>quer</i> assumir para atingir seus objetivos, de forma geral.</li>
<li><b>Risk tolerance:</b> quanto desvio ela aguenta em um caso específico.</li>
<li><b>Residual risk:</b> o risco que <b>sobra</b> depois de aplicar os controles. Nunca é zero.</li>
</ul>
<div class="prova-dica">transferir <b>não</b> elimina o risco. O seguro paga o prejuízo, mas o vazamento e o dano à reputação continuam sendo seus. E ignorar o risco não é "aceitar": aceitar é uma decisão documentada da gestão.</div>`,
      checagem: {
        q: "A empresa contratou um seguro contra ataques de ransomware. Que tratamento de risco é esse?",
        opcoes: [
          { t: "Transferência", ok: true, porque: "O impacto financeiro passa para a seguradora." },
          { t: "Mitigação", porque: "O seguro não reduz a chance do ataque nem o dano técnico. Mitigar seria, por exemplo, ter backup offline." },
          { t: "Aceitação", porque: "Aceitar seria não fazer nada de forma consciente. Aqui houve uma ação." },
          { t: "Evitar", porque: "Evitar seria parar a atividade que gera o risco." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.3 hierarquia
    {
      secao: "1.3",
      titulo: "Governança: de leis a procedimentos",
      html: `
<p>Governança é o conjunto de regras que dirigem a segurança. Elas vêm em camadas, da mais ampla para a mais detalhada:</p>
<div class="piramide">
  <div class="surge d1">Leis e regulações</div>
  <div class="surge d2">Policies</div>
  <div class="surge d3">Standards</div>
  <div class="surge d4">Procedures</div>
  <div class="surge d5">Guidelines <span class="pequeno">recomendação, não obrigatória</span></div>
</div>
<p class="pequeno centro surge d6">De cima para baixo: do mais amplo para o mais detalhado. Só a última camada é opcional.</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Camada</th><th>Responde</th><th>Exemplo</th></tr>
<tr><td><b>Leis e regulações</b></td><td>O que o governo exige</td><td>LGPD, GDPR</td></tr>
<tr><td><b>Policy</b></td><td>O quê e por quê, em alto nível, aprovado pela alta gestão</td><td>"Todo acesso remoto exige autenticação forte"</td></tr>
<tr><td><b>Standard</b></td><td>Qual regra específica e obrigatória</td><td>"MFA com app ou chave FIDO2; SMS não é aceito"</td></tr>
<tr><td><b>Procedure</b></td><td>Como fazer, passo a passo</td><td>"Para cadastrar o MFA, siga os passos 1 a 6"</td></tr>
<tr><td><b>Guideline</b></td><td>Uma recomendação, não obrigatória</td><td>"Prefira gerenciador de senhas"</td></tr>
</table></div>`,
      checagem: {
        q: "\"Para revogar o acesso de um funcionário desligado: 1) desative a conta, 2) revogue os tokens, 3) registre o chamado.\" Que documento é este?",
        opcoes: [
          { t: "Procedure", ok: true, porque: "É um passo a passo de como executar uma tarefa." },
          { t: "Policy", porque: "Uma política diria o quê e por quê ('acessos de desligados devem ser revogados em 24h'), sem os passos." },
          { t: "Guideline", porque: "Guideline é recomendação. Este texto é uma instrução obrigatória." },
          { t: "Standard", porque: "Um padrão define uma regra técnica específica, não uma sequência de passos." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.3 exemplos
    {
      secao: "1.3",
      titulo: "Leis, frameworks e padrões que você precisa reconhecer",
      html: `
<h3>Leis e regulações (obrigatórias)</h3>
<ul>
<li><b>GDPR</b>: privacidade de dados pessoais na União Europeia. Vale para empresas de fora que tratam dados de pessoas de lá.</li>
<li><b>LGPD</b>: a lei brasileira de proteção de dados, muito inspirada na GDPR.</li>
<li><b>HIPAA</b>: dados de saúde nos EUA.</li>
</ul>
<h3>Frameworks e guias (adotados voluntariamente, salvo contrato ou lei)</h3>
<ul>
<li><b>NIST Cybersecurity Framework (CSF) 2.0</b>: organiza a segurança em seis funções: Govern, Identify, Protect, Detect, Respond, Recover.</li>
<li><b>ISO/IEC 27001</b>: requisitos de um sistema de gestão de segurança da informação (ISMS). Uma empresa pode ser <b>certificada</b> nela.</li>
<li><b>ISO/IEC 27002</b>: catálogo de controles que apoia a 27001.</li>
<li><b>CIS Controls</b>: lista priorizada de controles práticos, do Center for Internet Security.</li>
</ul>
<div class="prova-dica"><b>PCI DSS</b> (dados de cartão) não é lei: é um padrão do setor de cartões. Ele vira obrigatório por <b>contrato</b> para quem aceita cartão.</div>
<div class="nota">O outline novo também tem um domínio inteiro de governança (o domínio 2). Aqui é a base. Lá o assunto aprofunda.</div>`
    },

    // ------------------------------------------------------------------ 1.4 tipos de controle
    {
      secao: "1.4",
      titulo: "Controles: técnicos, administrativos e físicos",
      html: `
<p>Um <span class="termo">controle</span> <span class="en">(control / safeguard / countermeasure)</span> é qualquer medida que reduz risco. O outline classifica pela <b>natureza</b> do controle:</p>
<div class="tabela-rolagem"><table class="t">
<tr><th>Tipo</th><th>Também chamado</th><th>Exemplos</th></tr>
<tr><td><b>Technical</b></td><td>Logical</td><td>Firewall, criptografia, MFA, antivírus, ACL de sistema</td></tr>
<tr><td><b>Administrative</b></td><td>Managerial</td><td>Políticas, treinamento de conscientização, verificação de antecedentes, segregação de funções, férias obrigatórias</td></tr>
<tr><td><b>Physical</b></td><td>—</td><td>Catraca, crachá, câmera, cadeado, guarda, cerca</td></tr>
</table></div>
<div class="prova-dica">pense <b>onde</b> o controle é aplicado. É código ou configuração de sistema? Técnico. É regra ou processo de pessoas? Administrativo. Dá para tocar? Físico. Uma câmera é física, mesmo sendo digital.</div>
<h3>Bônus: o que o controle faz</h3>
<p>Além do tipo, os materiais de estudo também classificam controles pela <b>função</b>. O outline só cita os três tipos acima, mas as perguntas costumam usar estes nomes:</p>
<ul>
<li><b>Preventive:</b> impede (MFA, fechadura).</li>
<li><b>Detective:</b> descobre depois (log, alarme, câmera gravando).</li>
<li><b>Corrective:</b> conserta (restaurar backup, aplicar patch).</li>
<li><b>Deterrent:</b> desencoraja (placa "área monitorada").</li>
<li><b>Compensating:</b> substitui um controle que não dá para aplicar (monitorar de perto um sistema legado que não aceita MFA).</li>
</ul>`,
      checagem: {
        q: "Um treinamento anual obrigatório sobre phishing é um controle de que tipo?",
        opcoes: [
          { t: "Administrativo", ok: true, porque: "É um processo voltado a pessoas, definido pela gestão." },
          { t: "Técnico", porque: "Um filtro de e-mail seria técnico. O treinamento atua nas pessoas." },
          { t: "Físico", porque: "Não há barreira física envolvida." },
          { t: "Corretivo", porque: "Corretivo é uma função, não um tipo. E o treinamento age antes do problema (preventivo)." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.5 due care / diligence
    {
      secao: "1.5",
      titulo: "Due diligence e due care",
      html: `
<p>Esses dois termos aparecem juntos e confundem muita gente. Um jeito fácil de separar:</p>
<svg class="anim" viewBox="0 0 400 130" role="img" aria-label="Due diligence é pensar, due care é fazer">
  <g class="surge d1"><rect class="caixa" x="4" y="10" width="172" height="110" rx="12" style="stroke:var(--destaque);stroke-width:2"/>
    <text x="90" y="44" text-anchor="middle" font-weight="700" font-size="17">Due diligence</text>
    <text x="90" y="72" text-anchor="middle" class="tx2" font-size="14">investigar, planejar</text>
    <text x="90" y="98" text-anchor="middle" font-weight="700" font-size="16">"saber"</text></g>
  <path class="traco desenha d2" pathLength="1" d="M180 65 H 218" style="stroke:var(--destaque);stroke-width:3"/>
  <g class="surge d3"><rect class="caixa" x="224" y="10" width="172" height="110" rx="12" style="stroke:var(--coral);stroke-width:2"/>
    <text x="310" y="44" text-anchor="middle" font-weight="700" font-size="17">Due care</text>
    <text x="310" y="72" text-anchor="middle" class="tx2" font-size="14">agir com prudência</text>
    <text x="310" y="98" text-anchor="middle" font-weight="700" font-size="16">"fazer"</text></g>
</svg>
<ul>
<li><b>Due diligence:</b> avaliar um fornecedor antes de contratar, fazer análise de risco, pesquisar vulnerabilidades conhecidas.</li>
<li><b>Due care:</b> aplicar os patches, manter os controles funcionando, cumprir a política no dia a dia.</li>
</ul>
<div class="prova-dica">se a empresa não fez o que qualquer empresa razoável faria e houve um incidente, ela pode ser acusada de <b>negligência</b>: faltou due care.</div>`,
      checagem: {
        q: "Antes de contratar um provedor de nuvem, o time revisa os relatórios de auditoria e as certificações dele. Isso é:",
        opcoes: [
          { t: "Due diligence", ok: true, porque: "É investigação feita antes da decisão: conhecer o risco." },
          { t: "Due care", porque: "Due care seria manter os controles funcionando depois da contratação." },
          { t: "Aceitação de risco", porque: "Ainda nem houve decisão sobre o risco. O time está levantando informação." },
          { t: "Controle compensatório", porque: "Não há nenhum controle substituindo outro aqui." }
        ]
      }
    },

    // ------------------------------------------------------------------ 1.5 código de ética
    {
      secao: "1.5",
      titulo: "O Código de Ética da ISC2",
      html: `
<p>Todo certificado ISC2 se compromete com o código. Ele tem um preâmbulo e <b>quatro cânones</b>, e a <b>ordem importa</b>: quando dois conflitam, vale o que vem antes.</p>
<div class="degraus">
  <div class="degrau cheio surge d1"><b>1</b> Proteger a sociedade, o bem comum, a confiança pública e a infraestrutura</div>
  <div class="degrau surge d2"><b>2</b> Agir com honra, honestidade, justiça, responsabilidade e legalidade</div>
  <div class="degrau surge d3"><b>3</b> Prestar serviço diligente e competente aos <i>principals</i></div>
  <div class="degrau surge d4"><b>4</b> Promover e proteger a profissão</div>
</div>
<p class="pequeno centro">↑ maior prioridade no topo</p>
<ul>
<li><b>Principals</b> são as pessoas e organizações para quem você trabalha: empregador, clientes.</li>
<li>O cânone 1 vem antes do 3: proteger a sociedade pesa mais do que atender o empregador.</li>
</ul>
<div class="prova-dica">em perguntas de dilema ético, procure a alternativa que protege as pessoas e a sociedade, e que é honesta e legal. Desconfie de respostas que "resolvem" escondendo informação, ou que agem por conta própria fora da lei (por exemplo, "invadir o sistema do atacante").</div>
<p class="pequeno">Texto oficial completo: página "ISC2 Code of Ethics" no site da ISC2.</p>`,
      checagem: {
        q: "Qual cânone tem a MAIOR prioridade?",
        opcoes: [
          { t: "Proteger a sociedade, o bem comum e a infraestrutura", ok: true, porque: "É o primeiro cânone e prevalece sobre os outros em caso de conflito." },
          { t: "Prestar serviço diligente e competente aos principals", porque: "É o terceiro. Atender o empregador vem depois de proteger a sociedade e de agir com honestidade." },
          { t: "Promover e proteger a profissão", porque: "É o quarto, o de menor prioridade." },
          { t: "Agir com honra, honestidade, justiça e legalidade", porque: "É o segundo. Importante, mas vem depois do primeiro." }
        ]
      }
    },

    // ------------------------------------------------------------------ fechamento
    {
      secao: "",
      titulo: "Resumo antes da prova",
      html: `
<div class="tabela-rolagem"><table class="t">
<tr><th>Tópico</th><th>Leve isto para a prova</th></tr>
<tr><td>1.1</td><td>CIA (e o contrário, DAD). Identificação ≠ autenticação. MFA = tipos diferentes. Não repúdio = assinatura digital + identidade única. Privacidade = dados pessoais e direitos do titular.</td></tr>
<tr><td>1.2</td><td>Risco = probabilidade × impacto. Identify → Assess → Treat → Monitor. Avoid, mitigate, transfer, accept. Sempre sobra risco residual.</td></tr>
<tr><td>1.3</td><td>Lei &gt; policy &gt; standard &gt; procedure. Guideline é opcional. PCI DSS não é lei.</td></tr>
<tr><td>1.4</td><td>Technical, administrative, physical. Funções: preventive, detective, corrective, deterrent, compensating.</td></tr>
<tr><td>1.5</td><td>Diligence = saber; care = fazer. Quatro cânones, nesta ordem: sociedade, honestidade, principals, profissão.</td></tr>
</table></div>
<p>A prova deste módulo sorteia <b>10 conceitos</b>, em inglês, como na prova real. Para passar, acerte <b>70%</b>. Cada conceito tem várias redações, e as alternativas mudam de lugar a cada rodada.</p>`
    }
  ],

  // ==================================================================== BANCO
  // Cada conceito tem várias redações (variantes). A prova sorteia conceitos e uma variante de cada.
  banco: [
    {
      id: "conf", topico: "1.1", resumo: "Confidencialidade",
      variantes: [
        { q: "An employee photographs a screen displaying customer records and posts it online. Which security objective was MOST directly violated?",
          opcoes: [
            { t: "Confidentiality", ok: true, porque: "Os dados foram expostos a quem não deveria vê-los: divulgação." },
            { t: "Integrity", porque: "Os registros não foram alterados." },
            { t: "Availability", porque: "O sistema continuou acessível para quem precisa." },
            { t: "Non-repudiation", porque: "Não se trata de provar a autoria de uma ação." }
          ] },
        { q: "Which control PRIMARILY protects the confidentiality of data stored on a lost laptop?",
          opcoes: [
            { t: "Full-disk encryption", ok: true, porque: "Sem a chave, quem acha o notebook não consegue ler os dados." },
            { t: "Regular backups", porque: "Backup protege a disponibilidade (você recupera os dados), mas não impede outra pessoa de lê-los." },
            { t: "File hashing", porque: "Hash detecta alteração (integridade); não esconde o conteúdo." },
            { t: "Redundant power supply", porque: "Isso é disponibilidade, e de um servidor, não do notebook." }
          ] },
        { q: "Data classification labels such as 'Public', 'Internal' and 'Restricted' mainly support which principle?",
          opcoes: [
            { t: "Confidentiality", ok: true, porque: "A classificação define quem pode ver cada informação." },
            { t: "Availability", porque: "Rótulos de classificação não deixam o dado mais acessível." },
            { t: "Accounting", porque: "Accounting é o registro do que foi feito, não quem pode ver." },
            { t: "Integrity", porque: "A classificação trata de sigilo, não de impedir alterações." }
          ] }
      ]
    },
    {
      id: "integ", topico: "1.1", resumo: "Integridade (hash, alteração)",
      variantes: [
        { q: "A software vendor publishes a SHA-256 value next to each download. What does this help users verify?",
          opcoes: [
            { t: "Integrity of the file", ok: true, porque: "Se o hash calculado bate com o publicado, o arquivo não foi alterado." },
            { t: "Confidentiality of the file", porque: "O hash não esconde nada; o arquivo continua legível por qualquer um." },
            { t: "Availability of the download server", porque: "O hash nada diz sobre o servidor estar no ar." },
            { t: "Identity of the person who downloaded it", porque: "O hash é do arquivo, não de quem baixou." }
          ] },
        { q: "An attacker modifies log entries to hide their activity. Which objective is MOST affected?",
          opcoes: [
            { t: "Integrity", ok: true, porque: "Os logs foram alterados sem autorização." },
            { t: "Confidentiality", porque: "O problema não é alguém ler os logs, e sim mudá-los." },
            { t: "Availability", porque: "Os logs continuam lá, só que errados." },
            { t: "Privacy", porque: "Logs de atividade não são o foco; a questão é a adulteração." }
          ] },
        { q: "Which of the following is the BEST example of an integrity control?",
          opcoes: [
            { t: "Digital signatures on transactions", ok: true, porque: "Qualquer alteração invalida a assinatura. Bônus: também dá não repúdio." },
            { t: "Load balancers", porque: "Balanceador ajuda a disponibilidade." },
            { t: "Privacy notices", porque: "Aviso de privacidade informa o titular; não detecta alterações." },
            { t: "Screen filters", porque: "Filtro de tela protege a confidencialidade contra olhares por cima do ombro." }
          ] }
      ]
    },
    {
      id: "disp", topico: "1.1", resumo: "Disponibilidade",
      variantes: [
        { q: "A distributed denial-of-service (DDoS) attack PRIMARILY targets which objective?",
          opcoes: [
            { t: "Availability", ok: true, porque: "O objetivo do DDoS é deixar o serviço fora do ar para usuários legítimos." },
            { t: "Confidentiality", porque: "O DDoS típico não rouba dados." },
            { t: "Integrity", porque: "O DDoS típico não altera dados." },
            { t: "Non-repudiation", porque: "O DDoS não mexe com a prova de autoria." }
          ] },
        { q: "Which measure MOST directly improves availability?",
          opcoes: [
            { t: "Redundant servers in different locations", ok: true, porque: "Se um cai, o outro atende." },
            { t: "Encrypting the database", porque: "Melhora a confidencialidade." },
            { t: "Requiring MFA for administrators", porque: "Fortalece a autenticação. Não mantém o serviço no ar." },
            { t: "Hashing passwords", porque: "Protege as senhas armazenadas (confidencialidade)." }
          ] },
        { q: "Ransomware encrypts a company's file server and the files cannot be opened. Which objective is MOST directly impacted?",
          opcoes: [
            { t: "Availability", ok: true, porque: "A empresa perdeu o acesso aos próprios dados. Ransomware moderno também rouba dados, mas o efeito direto descrito é a indisponibilidade." },
            { t: "Confidentiality", porque: "A pergunta descreve arquivos inacessíveis, não vazados." },
            { t: "Accounting", porque: "Accounting é registro de atividades; não é o alvo aqui." },
            { t: "Authorization", porque: "As permissões não mudaram; o arquivo é que não pode ser usado." }
          ] }
      ]
    },
    {
      id: "aaa", topico: "1.1", resumo: "Authentication × Authorization × Accounting",
      variantes: [
        { q: "After logging in successfully, a user tries to open the payroll report and receives 'Access denied'. Which process made that decision?",
          opcoes: [
            { t: "Authorization", ok: true, porque: "O usuário já está autenticado. Decidir o que ele pode acessar é autorização." },
            { t: "Authentication", porque: "A autenticação já aconteceu e deu certo no login." },
            { t: "Accounting", porque: "Accounting registraria a tentativa, mas não decide." },
            { t: "Identification", porque: "Identificação é dizer quem você é, antes de autenticar." }
          ] },
        { q: "Which part of AAA allows an investigator to reconstruct what a user did last Tuesday?",
          opcoes: [
            { t: "Accounting", ok: true, porque: "Os registros de atividade (logs, trilha de auditoria) são o accounting." },
            { t: "Authorization", porque: "Autorização decide o acesso no momento; não guarda histórico." },
            { t: "Authentication", porque: "Autenticação prova a identidade no login; não registra as ações seguintes." },
            { t: "Availability", porque: "Não faz parte do AAA; é um objetivo da tríade CIA." }
          ] },
        { q: "Entering a username is an example of which step?",
          opcoes: [
            { t: "Identification", ok: true, porque: "Você apenas afirma quem é. Ainda não provou." },
            { t: "Authentication", porque: "Autenticação é provar a identidade afirmada, por exemplo com a senha." },
            { t: "Authorization", porque: "Autorização vem depois da autenticação." },
            { t: "Accounting", porque: "Accounting registra ações; digitar o usuário não é registro." }
          ] }
      ]
    },
    {
      id: "mfa", topico: "1.1", resumo: "Fatores de autenticação e MFA",
      variantes: [
        { q: "Which combination is an example of multi-factor authentication?",
          opcoes: [
            { t: "A smart card and a PIN", ok: true, porque: "Algo que você tem (cartão) + algo que você sabe (PIN)." },
            { t: "A password and a security question", porque: "Os dois são algo que você sabe: um tipo só." },
            { t: "A fingerprint and a face scan", porque: "Os dois são algo que você é: um tipo só." },
            { t: "A username and a password", porque: "Usuário é identificação. Só há um fator (a senha)." }
          ] },
        { q: "A hardware security key (e.g., a FIDO2 token) is which type of authentication factor?",
          opcoes: [
            { t: "Something you have", ok: true, porque: "É um objeto físico que você possui." },
            { t: "Something you know", porque: "Você não precisa memorizar nada que esteja na chave." },
            { t: "Something you are", porque: "Isso seria biometria." },
            { t: "Somewhere you are", porque: "Localização é outro tipo de atributo, não um objeto." }
          ] },
        { q: "Why is 'password + PIN' NOT considered multi-factor authentication?",
          opcoes: [
            { t: "Both are the same factor type (something you know)", ok: true, porque: "MFA exige tipos diferentes de fator." },
            { t: "PINs are too short to be secure", porque: "O tamanho não é o critério; o tipo do fator é." },
            { t: "Passwords cannot be combined with other factors", porque: "Senha combina com outros fatores, sim (ex.: senha + token)." },
            { t: "Only biometrics count as a second factor", porque: "Qualquer tipo diferente conta: algo que você tem também." }
          ] }
      ]
    },
    {
      id: "nonrep", topico: "1.1", resumo: "Não repúdio",
      variantes: [
        { q: "Which mechanism BEST provides non-repudiation for an email?",
          opcoes: [
            { t: "Digital signature using the sender's private key", ok: true, porque: "Só o remetente tem a chave privada, então ele não pode negar que assinou." },
            { t: "Symmetric encryption with a shared key", porque: "Os dois lados têm a mesma chave: qualquer um deles poderia ter gerado a mensagem." },
            { t: "Sending over TLS", porque: "TLS protege o transporte, mas não gera prova de autoria guardada com a mensagem." },
            { t: "Compressing the message", porque: "Compressão não tem relação com segurança." }
          ] },
        { q: "A customer claims they never approved a payment. Which security principle helps the company prove otherwise?",
          opcoes: [
            { t: "Non-repudiation", ok: true, porque: "É justamente impedir que alguém negue uma ação que realizou." },
            { t: "Availability", porque: "Não ajuda a provar quem aprovou." },
            { t: "Least privilege", porque: "Limita permissões; não prova autoria." },
            { t: "Confidentiality", porque: "Sigilo não prova quem fez a ação." }
          ] },
        { q: "Which practice MOST weakens non-repudiation?",
          opcoes: [
            { t: "Shared administrator accounts", ok: true, porque: "Com conta compartilhada, não dá para ligar a ação a uma pessoa." },
            { t: "Unique user IDs", porque: "IDs únicos fortalecem o não repúdio." },
            { t: "Centralized logging", porque: "Logs centralizados ajudam a provar quem fez o quê." },
            { t: "Digital certificates for users", porque: "Certificados por usuário permitem assinaturas individuais: fortalecem." }
          ] }
      ]
    },
    {
      id: "priv", topico: "1.1", resumo: "Privacidade e PII",
      variantes: [
        { q: "Which statement BEST describes privacy?",
          opcoes: [
            { t: "The right of individuals to control how their personal information is collected and used", ok: true, porque: "Privacidade é sobre o titular e os dados dele." },
            { t: "Keeping any company information secret", porque: "Isso é confidencialidade, que vale para qualquer informação sensível." },
            { t: "Ensuring systems are available to authorized users", porque: "Isso é disponibilidade." },
            { t: "Preventing unauthorized changes to data", porque: "Isso é integridade." }
          ] },
        { q: "Which of the following is personally identifiable information (PII)?",
          opcoes: [
            { t: "A customer's national ID number", ok: true, porque: "Identifica diretamente uma pessoa." },
            { t: "The company's quarterly revenue", porque: "É confidencial, mas não identifica uma pessoa." },
            { t: "A server's IP address in a data center", porque: "Identifica uma máquina da empresa, não um indivíduo." },
            { t: "The source code of an internal application", porque: "É propriedade intelectual, não dado pessoal." }
          ] },
        { q: "A regulation gives citizens the right to request deletion of their personal data. This is PRIMARILY a matter of:",
          opcoes: [
            { t: "Privacy", ok: true, porque: "Direitos do titular sobre os próprios dados são o centro da privacidade (ex.: GDPR, LGPD)." },
            { t: "Availability", porque: "Apagar dados não tem a ver com mantê-los acessíveis." },
            { t: "Integrity", porque: "Integridade é sobre alterações indevidas." },
            { t: "Non-repudiation", porque: "Não se trata de provar autoria." }
          ] }
      ]
    },
    {
      id: "vocab", topico: "1.2", resumo: "Ameaça × vulnerabilidade × risco",
      variantes: [
        { q: "An unpatched web server is BEST described as a:",
          opcoes: [
            { t: "Vulnerability", ok: true, porque: "É uma fraqueza que pode ser explorada." },
            { t: "Threat", porque: "A ameaça seria quem ou o que explora a falta de patch." },
            { t: "Risk", porque: "Risco é a combinação de probabilidade e impacto de a ameaça explorar a fraqueza." },
            { t: "Control", porque: "A falta de patch é o oposto de um controle." }
          ] },
        { q: "Risk is MOST commonly expressed as a combination of:",
          opcoes: [
            { t: "Likelihood and impact", ok: true, porque: "Risco = probabilidade × impacto." },
            { t: "Threats and controls", porque: "Controles reduzem o risco, mas não fazem parte da definição." },
            { t: "Assets and users", porque: "Ativos entram na análise, mas a fórmula é probabilidade × impacto." },
            { t: "Confidentiality and integrity", porque: "São objetivos de segurança, não componentes do risco." }
          ] },
        { q: "A criminal group that sends phishing emails to steal credentials is an example of a:",
          opcoes: [
            { t: "Threat actor", ok: true, porque: "É quem pode causar o dano." },
            { t: "Vulnerability", porque: "A vulnerabilidade seria, por exemplo, usuários sem treinamento." },
            { t: "Asset", porque: "O ativo é o que eles querem: as credenciais." },
            { t: "Residual risk", porque: "Risco residual é o que sobra depois dos controles." }
          ] }
      ]
    },
    {
      id: "trat", topico: "1.2", resumo: "Tratamento de risco (avoid, mitigate, transfer, accept)",
      variantes: [
        { q: "A company buys cyber insurance to cover losses from a data breach. Which risk treatment is this?",
          opcoes: [
            { t: "Transfer", ok: true, porque: "O impacto financeiro passa para a seguradora." },
            { t: "Mitigate", porque: "O seguro não reduz a chance do incidente." },
            { t: "Avoid", porque: "A atividade continua acontecendo." },
            { t: "Accept", porque: "Houve uma ação (contratar seguro), não só aceitar." }
          ] },
        { q: "A company decides to stop storing credit card numbers entirely because the risk is too high. Which treatment is this?",
          opcoes: [
            { t: "Avoid", ok: true, porque: "Eliminou a atividade que gerava o risco." },
            { t: "Transfer", porque: "Transferir seria passar o impacto para outro, por exemplo com seguro." },
            { t: "Mitigate", porque: "Mitigar seria continuar guardando, mas com controles." },
            { t: "Accept", porque: "Aceitar seria continuar guardando sem mudar nada." }
          ] },
        { q: "Deploying MFA to reduce the likelihood of account takeover is an example of risk:",
          opcoes: [
            { t: "Mitigation", ok: true, porque: "Um controle que diminui a probabilidade é mitigação." },
            { t: "Avoidance", porque: "Evitar seria deixar de oferecer login." },
            { t: "Transference", porque: "Ninguém mais passou a arcar com o impacto." },
            { t: "Acceptance", porque: "Houve ação para reduzir o risco." }
          ] }
      ]
    },
    {
      id: "residual", topico: "1.2", resumo: "Risco residual, apetite e aceitação",
      variantes: [
        { q: "The risk that remains after controls have been applied is called:",
          opcoes: [
            { t: "Residual risk", ok: true, porque: "É o risco que sobra. Nunca chega a zero." },
            { t: "Inherent risk", porque: "Risco inerente é o risco ANTES dos controles." },
            { t: "Risk appetite", porque: "Apetite é quanto risco a organização está disposta a assumir." },
            { t: "Total risk", porque: "Não é o termo usado para o que sobra depois dos controles." }
          ] },
        { q: "The overall amount of risk an organization is willing to take on in pursuit of its goals is its:",
          opcoes: [
            { t: "Risk appetite", ok: true, porque: "É a disposição geral da organização para correr riscos." },
            { t: "Residual risk", porque: "Residual é o que sobra depois dos controles." },
            { t: "Risk register", porque: "É o documento onde os riscos são registrados." },
            { t: "Vulnerability", porque: "Vulnerabilidade é uma fraqueza, não uma disposição." }
          ] },
        { q: "Management reviews a low-impact risk, decides the fix costs more than the possible loss, and formally documents the decision. This is:",
          opcoes: [
            { t: "Risk acceptance", ok: true, porque: "Uma decisão consciente e documentada de conviver com o risco." },
            { t: "Ignoring the risk", porque: "Ignorar é não decidir nada. Aqui houve análise e registro." },
            { t: "Risk avoidance", porque: "Evitar seria parar a atividade." },
            { t: "Risk transfer", porque: "Ninguém mais assumiu o impacto." }
          ] }
      ]
    },
    {
      id: "qualquant", topico: "1.2", resumo: "Análise qualitativa × quantitativa",
      variantes: [
        { q: "A risk assessment rates each risk as 'low', 'medium' or 'high' on a color matrix. This is a:",
          opcoes: [
            { t: "Qualitative assessment", ok: true, porque: "Usa escalas descritivas, não valores numéricos." },
            { t: "Quantitative assessment", porque: "Quantitativa usaria números e dinheiro." },
            { t: "Penetration test", porque: "Teste de invasão é técnico; não classifica riscos numa matriz." },
            { t: "Business impact analysis", porque: "BIA é outra análise (de impacto na continuidade), não esta classificação." }
          ] },
        { q: "Which approach expresses risk in monetary values, such as expected annual loss?",
          opcoes: [
            { t: "Quantitative", ok: true, porque: "Atribui números e valores financeiros." },
            { t: "Qualitative", porque: "Qualitativa usa categorias como alto, médio e baixo." },
            { t: "Heuristic", porque: "Não é a classificação usada para análise de risco." },
            { t: "Descriptive", porque: "Não é o termo correto; o par é qualitativo × quantitativo." }
          ] },
        { q: "What is a main advantage of qualitative risk analysis?",
          opcoes: [
            { t: "It is faster and does not require precise financial data", ok: true, porque: "É a vantagem principal, com a desvantagem de ser mais subjetiva." },
            { t: "It produces exact monetary loss figures", porque: "Isso é a quantitativa." },
            { t: "It removes all subjectivity", porque: "Pelo contrário: a qualitativa é mais subjetiva." },
            { t: "It eliminates residual risk", porque: "Nenhuma análise elimina o risco residual." }
          ] }
      ]
    },
    {
      id: "docs", topico: "1.3", resumo: "Policy × standard × procedure × guideline",
      variantes: [
        { q: "Which document provides step-by-step instructions to complete a task?",
          opcoes: [
            { t: "Procedure", ok: true, porque: "Procedimento é o passo a passo." },
            { t: "Policy", porque: "Política diz o quê e por quê, em alto nível." },
            { t: "Standard", porque: "Padrão define uma regra específica e obrigatória, não os passos." },
            { t: "Guideline", porque: "Diretriz é uma recomendação, não obrigatória." }
          ] },
        { q: "Which governance element is a recommendation and NOT mandatory?",
          opcoes: [
            { t: "Guideline", ok: true, porque: "É a única opcional da lista." },
            { t: "Policy", porque: "Política é obrigatória." },
            { t: "Standard", porque: "Padrão é obrigatório." },
            { t: "Regulation", porque: "Regulação é obrigatória por lei." }
          ] },
        { q: "A high-level statement approved by senior management saying 'All sensitive data must be protected' is a:",
          opcoes: [
            { t: "Policy", ok: true, porque: "Declaração de alto nível, aprovada pela alta gestão." },
            { t: "Procedure", porque: "Não há passos de execução." },
            { t: "Guideline", porque: "É obrigatória ('must'), então não é recomendação." },
            { t: "Baseline", porque: "Baseline é uma configuração mínima detalhada, não uma declaração geral." }
          ] }
      ]
    },
    {
      id: "leis", topico: "1.3", resumo: "Leis × frameworks × padrões do setor",
      variantes: [
        { q: "Which of the following is a LAW, rather than a framework or industry standard?",
          opcoes: [
            { t: "GDPR", ok: true, porque: "É um regulamento da União Europeia, com força de lei." },
            { t: "NIST Cybersecurity Framework", porque: "É um framework voluntário." },
            { t: "ISO/IEC 27001", porque: "É uma norma internacional; a adoção é voluntária." },
            { t: "PCI DSS", porque: "É padrão do setor de cartões, obrigatório por contrato, não por lei." }
          ] },
        { q: "PCI DSS becomes mandatory for a merchant PRIMARILY because of:",
          opcoes: [
            { t: "Contractual agreements with the card brands and banks", ok: true, porque: "Não é lei: a obrigação vem do contrato para aceitar cartões." },
            { t: "International law", porque: "Não existe lei internacional que imponha o PCI DSS." },
            { t: "ISO certification requirements", porque: "A ISO 27001 não exige PCI DSS." },
            { t: "The NIST framework", porque: "O NIST CSF é voluntário e não impõe o PCI DSS." }
          ] },
        { q: "An organization wants to be formally certified for its information security management system. Which standard fits?",
          opcoes: [
            { t: "ISO/IEC 27001", ok: true, porque: "Define os requisitos de um ISMS, e a empresa pode ser auditada e certificada nela." },
            { t: "ISO/IEC 27002", porque: "É um catálogo de controles de apoio; não é a norma certificável." },
            { t: "HIPAA", porque: "É lei de saúde dos EUA, não uma norma de certificação." },
            { t: "CIS Controls", porque: "São boas práticas priorizadas, sem certificação formal de ISMS." }
          ] }
      ]
    },
    {
      id: "tipos", topico: "1.4", resumo: "Tipos de controle (técnico, administrativo, físico)",
      variantes: [
        { q: "A security awareness training program is which type of control?",
          opcoes: [
            { t: "Administrative", ok: true, porque: "É processo e regra voltada a pessoas." },
            { t: "Technical", porque: "Não é implementado em sistema." },
            { t: "Physical", porque: "Não é uma barreira física." },
            { t: "Logical", porque: "Lógico é sinônimo de técnico." }
          ] },
        { q: "A firewall rule blocking inbound traffic on port 23 is which type of control?",
          opcoes: [
            { t: "Technical", ok: true, porque: "Implementado em sistema/rede." },
            { t: "Administrative", porque: "Uma política poderia mandar bloquear, mas a regra em si é técnica." },
            { t: "Physical", porque: "Não há barreira física." },
            { t: "Managerial", porque: "Managerial é sinônimo de administrativo." }
          ] },
        { q: "Badge readers at the data center door are which type of control?",
          opcoes: [
            { t: "Physical", ok: true, porque: "Controlam o acesso físico ao local." },
            { t: "Administrative", porque: "A regra de quem recebe crachá é administrativa; o leitor na porta é físico." },
            { t: "Corrective", porque: "Corretivo é uma função, e o leitor previne, não corrige." },
            { t: "Logical", porque: "Lógico é sinônimo de técnico." }
          ] }
      ]
    },
    {
      id: "funcoes", topico: "1.4", resumo: "Funções de controle (preventivo, detectivo, corretivo...)",
      variantes: [
        { q: "Reviewing security logs to find suspicious activity is an example of a:",
          opcoes: [
            { t: "Detective control", ok: true, porque: "Descobre algo que já aconteceu." },
            { t: "Preventive control", porque: "Revisar logs não impede o ataque." },
            { t: "Deterrent control", porque: "Não desencoraja o atacante, ele nem sabe da revisão." },
            { t: "Corrective control", porque: "Corretivo seria consertar o dano." }
          ] },
        { q: "Restoring a system from backup after a ransomware attack is a:",
          opcoes: [
            { t: "Corrective control", ok: true, porque: "Corrige o estado do sistema depois do incidente." },
            { t: "Preventive control", porque: "O ataque já aconteceu." },
            { t: "Detective control", porque: "Não descobre nada; conserta." },
            { t: "Deterrent control", porque: "Não desencoraja nada." }
          ] },
        { q: "A legacy system cannot support MFA, so the team adds network isolation and extra monitoring instead. These are:",
          opcoes: [
            { t: "Compensating controls", ok: true, porque: "Substituem um controle que não pôde ser aplicado." },
            { t: "Deterrent controls", porque: "O objetivo não é desencorajar; é cobrir a falta do MFA." },
            { t: "Directive controls", porque: "Diretivos são regras que orientam comportamento." },
            { t: "Physical controls", porque: "Isolamento de rede e monitoramento são técnicos." }
          ] }
      ]
    },
    {
      id: "due", topico: "1.5", resumo: "Due care × due diligence",
      variantes: [
        { q: "Researching a vendor's security posture before signing a contract is an example of:",
          opcoes: [
            { t: "Due diligence", ok: true, porque: "Investigar e entender o risco antes de decidir." },
            { t: "Due care", porque: "Due care é agir de forma prudente no dia a dia, depois." },
            { t: "Risk transfer", porque: "Avaliar o fornecedor não passa o impacto para ninguém." },
            { t: "Non-repudiation", porque: "Não tem relação com provar autoria." }
          ] },
        { q: "Applying security patches promptly, as a reasonable organization would, demonstrates:",
          opcoes: [
            { t: "Due care", ok: true, porque: "É fazer o que uma pessoa prudente faria." },
            { t: "Due diligence", porque: "Due diligence é a pesquisa e o planejamento antes." },
            { t: "Risk avoidance", porque: "Aplicar patch reduz o risco (mitigação), não evita a atividade." },
            { t: "Separation of duties", porque: "Não envolve dividir tarefas entre pessoas." }
          ] },
        { q: "A company suffers a breach because it ignored a well-known critical vulnerability for a year. It may be accused of:",
          opcoes: [
            { t: "Negligence, for failing to exercise due care", ok: true, porque: "Não fez o que qualquer organização razoável faria." },
            { t: "Excessive due diligence", porque: "O problema foi justamente a falta de ação." },
            { t: "Risk transfer", porque: "Não houve transferência de nada." },
            { t: "Violating non-repudiation", porque: "Não é o conceito em jogo." }
          ] }
      ]
    },
    {
      id: "canones", topico: "1.5", resumo: "Os quatro cânones da ISC2 e sua ordem",
      variantes: [
        { q: "According to the ISC2 Code of Ethics, which canon comes FIRST?",
          opcoes: [
            { t: "Protect society, the common good, necessary public trust and confidence, and the infrastructure", ok: true, porque: "É o primeiro cânone e tem prioridade sobre os demais." },
            { t: "Provide diligent and competent service to principals", porque: "É o terceiro." },
            { t: "Advance and protect the profession", porque: "É o quarto." },
            { t: "Act honorably, honestly, justly, responsibly, and legally", porque: "É o segundo." }
          ] },
        { q: "Which canon of the ISC2 Code of Ethics has the LOWEST priority?",
          opcoes: [
            { t: "Advance and protect the profession", ok: true, porque: "É o quarto, o último da ordem." },
            { t: "Protect society and the infrastructure", porque: "É o primeiro, o de maior prioridade." },
            { t: "Act honorably, honestly, justly, responsibly, and legally", porque: "É o segundo." },
            { t: "Provide diligent and competent service to principals", porque: "É o terceiro." }
          ] },
        { q: "In the ISC2 Code of Ethics, 'principals' refers to:",
          opcoes: [
            { t: "Employers and clients the professional serves", ok: true, porque: "São as pessoas e organizações para quem você trabalha." },
            { t: "Senior ISC2 board members", porque: "Não é esse o sentido no código." },
            { t: "The main security principles (CIA)", porque: "Confusão comum de palavras: principals ≠ principles." },
            { t: "Government regulators", porque: "Reguladores não são os principals do profissional." }
          ] }
      ]
    },
    {
      id: "dilema", topico: "1.5", resumo: "Dilemas éticos",
      variantes: [
        { q: "Your manager asks you to hide a security breach from affected customers to protect the company's reputation. According to the ISC2 Code of Ethics, what should you do?",
          opcoes: [
            { t: "Refuse and push for proper disclosure, because protecting society and acting honestly come before serving the employer", ok: true, porque: "Os cânones 1 e 2 têm prioridade sobre o 3 (servir o empregador)." },
            { t: "Comply, because you must serve your principals", porque: "Servir o empregador é o terceiro cânone e não se sobrepõe à honestidade e à proteção da sociedade." },
            { t: "Post the details on social media immediately", porque: "Agir por conta própria e de forma impulsiva não é a resposta ética esperada; o caminho é pelos canais adequados." },
            { t: "Ignore the request and do nothing", porque: "Omitir-se não protege os clientes afetados." }
          ] },
        { q: "During a contract, you discover a way into a competitor's system. What is the MOST ethical action?",
          opcoes: [
            { t: "Do not access it, and report the vulnerability through appropriate channels", ok: true, porque: "É honesto, legal e protege a sociedade." },
            { t: "Explore it to gather evidence before reporting", porque: "Acessar sem autorização é ilegal, mesmo com boa intenção." },
            { t: "Share it with your employer to gain an advantage", porque: "Viola a honestidade e a legalidade." },
            { t: "Sell the information to a security research firm", porque: "Antiético e possivelmente ilegal." }
          ] },
        { q: "A colleague is falsely claiming to hold a certification they do not have. Which canon is MOST related to this behavior?",
          opcoes: [
            { t: "Advance and protect the profession", ok: true, porque: "Fraudar credenciais prejudica a credibilidade da profissão (e também fere a honestidade)." },
            { t: "Provide diligent service to principals", porque: "Até pode afetar os clientes, mas o foco é a integridade da profissão." },
            { t: "Protect the infrastructure", porque: "Não há ameaça direta à infraestrutura." },
            { t: "It is not an ethics issue", porque: "Mentir sobre credenciais é questão ética, sim." }
          ] }
      ]
    }
  ]
};
