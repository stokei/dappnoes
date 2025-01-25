# **Domino Game with Blockchain (Ethereum)**

### **RULES**

---

## **GAME CREATION**  

1. Games can have 2, 3, or 4 players.  
2. When creating a game:  
   - Generate and shuffle the complete set of tiles.  
   - Set the initial status to **PENDING**.  
   - Indicate that there will be a cost per move.  
3. Possible game statuses:  
   - **PENDING, WAITING_FOR_PLAYERS, PLAYING, CANCELED, FINISHED, TIED**.

---

## **JOIN THE GAME**

1. All players must:  
   - Purchase a ticket (the value is added to the prize pool).  
   - Have an **ACTIVE** status to participate.  
2. Players join without tiles initially.  

---

## **START GAME**

1. Conditions to start:  
   - A minimum of 2 players with **READY** status.  
   - Each player receives 7 tiles at the start.  
2. The room owner requests to start, and players have up to **15 minutes** to confirm.  
   - Players who do not confirm will be removed and refunded.

---

## **MAKE A MOVE**

1. Moves can only happen if the game is active (**PLAYING**).  
2. Each player has a time limit per move:  
   - Didn’t move in time? An automatic move will be made.  
3. Rules for moves:  
   - Played tiles are moved from the hand to the board.  
   - No valid tiles? Draw one from the pile.  
4. If the pile is empty and no one can play, the game results in a **TIE**.  

---

## **CANCEL GAME**  

- Before starting, the owner can cancel the game, refunding all players.

---

## **LEAVE THE GAME**

1. **PENDING Status**:  
   - Players can leave and request a refund.  
2. **PLAYING Status**:  
   - Players can leave but lose their right to the prize.  

---

## **GAME COMPLETION**

1. The prize pool accumulates entry fees and is awarded to the winner.  
2. In case of a tie:  
   - The prize pool is equally divided among the remaining players.  

---
