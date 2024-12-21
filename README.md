# Jogo Dominó com Blockchain (Ethereum)

## Requisitos

### Funcionalidades Básicas
- [ ] O usuário pode criar salas com ingresso gratuito ou com algum valor em criptomoeda.
- [ ] Deve ser registrado cada jogada de cada usuário na blockchain para garantir transparência e imutabilidade.
- [ ] O usuário pode entrar em uma sala, desde que cumpra os requisitos (gratuita ou pagamento do ingresso).
- [ ] Cada jogador tem um limite de tempo para realizar sua jogada.
- [ ] Deve haver validação automática das jogadas para garantir que estão de acordo com as regras do dominó.
- [ ] Quando um jogo é concluído, o resultado deve ser registrado na blockchain.

### Salas e Jogo
- [ ] As salas podem ter limite de jogadores (2, 3 ou 4).
- [ ] O estado atual do jogo (peças na mesa, peças nas mãos dos jogadores, próxima jogada) deve ser sincronizado para todos os jogadores em tempo real.
- [ ] Salas inativas por um tempo definido devem ser automaticamente encerradas.

### Blockchain e Tokens
- [ ] Todas as transações financeiras (ingresso para as salas, prêmios) devem ser processadas via smart contract.
- [ ] Deve haver um token ERC-20 nativo para o jogo, utilizado para apostas ou prêmios.
- [ ] Taxas de entrada serão acumuladas e distribuídas ao vencedor.

### Interações e Segurança
- [ ] Os smart contracts devem ser auditados para evitar vulnerabilidades, como reentrância ou overflow.
- [ ] O jogo deve ser resistente a fraudes, como manipulação de jogadas ou desconexões intencionais.
- [ ] Deve ser implementada uma função de “pausa” no smart contract para emergências.
- [ ] Todas as jogadas e eventos do jogo devem ser emitidos como logs no blockchain para consulta futura.

### Interface de Usuário
- [ ] A integração com carteiras Ethereum, como MetaMask, deve permitir login, criação de salas e transações.
- [ ] O histórico de partidas (jogadas, vencedores, prêmios) deve estar disponível para consulta pública.
- [ ] O design deve ser responsivo, suportando dispositivos móveis e desktop.

---

### Extras
- [ ] Estatísticas globais devem ser exibidas, como jogadores ativos, jogos concluídos e valor total em prêmios distribuídos.
- [ ] Jogadores podem criar avatares ou personalizar seus perfis dentro da plataforma.

---
