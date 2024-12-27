# **Jogo Dominó com Blockchain (Ethereum)**

### **REGRAS**

---

## **CRIAÇÃO DO JOGO**  

1. Jogos podem ter 2, 3 ou 4 jogadores.  
2. Ao criar o jogo:  
   - Gerar e embaralhar a lista completa de peças.  
   - Definir o status inicial como **PENDENTE**.  
   - Informar que haverá um custo por jogada.  
3. Status possíveis do jogo:  
   - **PENDENTE, AGUARDANDO_JOGADORES, JOGANDO, CANCELADO, CONCLUÍDO, EMPATADO**.

---

## **ENTRAR NO JOGO**

1. Todos os jogadores devem:  
   - Comprar ingresso (valor adicionado ao prêmio).  
   - Estar com status **ATIVO** para participar.  
2. Jogadores entram sem peças inicialmente.  

---

## **INICIAR JOGO**

1. Condições para iniciar:  
   - Mínimo de 2 jogadores com status **PRONTO**.  
   - Cada jogador recebe 7 peças no início.  
2. O dono da sala solicita o início, e os jogadores têm até **15 minutos** para confirmar.  
   - Jogadores que não confirmarem serão removidos e reembolsados.

---

## **CANCELAR SOLICITAÇÃO DE INÍCIO**  

- Se o jogo estiver em **AGUARDANDO_JOGADORES**, o dono pode cancelar a solicitação e retornar o status para **PENDENTE**.

---

## **REALIZAR JOGADA**

1. Jogadas só podem ocorrer com o jogo ativo (**JOGANDO**).  
2. Cada jogador tem um tempo limite por jogada:  
   - Não jogou a tempo? Uma jogada automática será gerada.  
3. Regras para jogadas:  
   - Peça jogada é movida da mão para o tabuleiro.  
   - Sem peça válida? Comprar uma da pilha do baralho.  
4. Caso o baralho acabe e ninguém consiga jogar, o jogo entra em **EMPATE**.  

---

## **CANCELAR JOGO**  

- Antes do início, o dono pode cancelar o jogo, reembolsando todos os jogadores.

---

## **SAIR DO JOGO**

1. **Status PENDENTE**:  
   - O jogador pode sair e solicitar reembolso.  
2. **Status JOGANDO**:  
   - Jogadores podem sair, mas perdem o direito ao prêmio.  

---

## **FINALIZAÇÃO DO JOGO**

1. O prêmio é acumulado das taxas de entrada e distribuído ao vencedor.  
2. Em caso de empate:  
   - O prêmio é dividido igualmente entre os jogadores restantes.  

---

// GAME
// PEÇAS
  - game/gameId
    - peças para comprar
    - peças no tabuleiro
    - as peças de cada ponta (lado direito/esquerdo)
    - jogadores
    - quem é o proximo jogador
    - o total do premio 
