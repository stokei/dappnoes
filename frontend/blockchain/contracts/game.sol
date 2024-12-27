// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DominoGame {
    enum GameStatus { PENDING, WAITING_FOR_PLAYERS, PLAYING, CANCELED, COMPLETED, DRAW }

    struct Game {
        uint256 id;
        address owner;
        GameStatus status;
        uint256 entryFee;
        uint256 prizePool;
        address[] players;
        address[] activePlayers;
        mapping(address => uint256[]) playerPieces;
        uint256[] deck;
        uint256[] board;
        uint256 currentPlayerIndex;
    }

    uint256 public gameCounter;
    mapping(uint256 => Game) public games;
    mapping(address => uint256) public balances;

    event GameCreated(uint256 gameId, address owner, uint256 entryFee);
    event PlayerJoined(uint256 gameId, address player);
    event GameStarted(uint256 gameId);
    event PlayerMoved(uint256 gameId, address player, uint256 piece);
    event GameCompleted(uint256 gameId, address winner);
    event GameCanceled(uint256 gameId);
    event GameDraw(uint256 gameId);

    modifier onlyOwner(uint256 gameId) {
        require(games[gameId].owner == msg.sender, "Not the game owner");
        _;
    }

    modifier onlyActivePlayer(uint256 gameId) {
        require(isActivePlayer(gameId, msg.sender), "Not an active player");
        _;
    }

    function createGame(uint256 entryFee) external {
        gameCounter++;
        Game storage newGame = games[gameCounter];
        newGame.id = gameCounter;
        newGame.owner = msg.sender;
        newGame.status = GameStatus.PENDING;
        newGame.entryFee = entryFee;

        emit GameCreated(gameCounter, msg.sender, entryFee);
    }

    function joinGame(uint256 gameId) external payable {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PENDING || game.status == GameStatus.WAITING_FOR_PLAYERS, "Game not accepting players");
        require(msg.value == game.entryFee, "Incorrect entry fee");
        require(game.players.length < 4, "Game is full");

        game.players.push(msg.sender);
        game.activePlayers.push(msg.sender);
        game.prizePool += msg.value;

        emit PlayerJoined(gameId, msg.sender);
    }

    function requestStartGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PENDING, "Game already started");
        require(game.players.length >= 2, "Not enough players");

        game.status = GameStatus.WAITING_FOR_PLAYERS;
    }

    function cancelRequestStartGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.WAITING_FOR_PLAYERS, "Game already started");

        game.status = GameStatus.PENDING;
    }

    function startGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.players.length >= 2, "Not enough players");
        require(game.status == GameStatus.WAITING_FOR_PLAYERS, "Game not ready to start");

        game.deck = generateDeck();
        shuffleDeck(game.deck);

        for (uint256 i = 0; i < game.players.length; i++) {
            for (uint256 j = 0; j < 7; j++) {
                game.playerPieces[game.players[i]].push(game.deck[game.deck.length - 1]);
                game.deck.pop();
            }
        }

        game.status = GameStatus.PLAYING;
        game.currentPlayerIndex = 0;

        emit GameStarted(gameId);
    }

    function makeMove(uint256 gameId, uint256 piece) external onlyActivePlayer(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "Game is not active");
        require(hasPiece(game.playerPieces[msg.sender], piece), "Player does not have the piece");

        removePiece(game.playerPieces[msg.sender], piece);
        game.board.push(piece);

        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.activePlayers.length;

        emit PlayerMoved(gameId, msg.sender, piece);
    }

    function endGame(uint256 gameId, address winner) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "Game is not active");

        game.status = GameStatus.COMPLETED;
        balances[winner] += game.prizePool;

        emit GameCompleted(gameId, winner);
    }

    function cancelGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status != GameStatus.COMPLETED && game.status != GameStatus.DRAW, "Game already finalized");

        game.status = GameStatus.CANCELED;
        for (uint256 i = 0; i < game.players.length; i++) {
            balances[game.players[i]] += game.entryFee;
        }

        emit GameCanceled(gameId);
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function generateDeck() internal pure returns (uint256[] memory) {
        uint256[] memory deck = new uint256[](28);
        uint256 index = 0;
        for (uint256 i = 0; i <= 6; i++) {
            for (uint256 j = i; j <= 6; j++) {
                deck[index++] = i * 10 + j;
            }
        }
        return deck;
    }

    function shuffleDeck(uint256[] storage deck) internal {
        for (uint256 i = 0; i < deck.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % (deck.length - i);
            uint256 temp = deck[n];
            deck[n] = deck[i];
            deck[i] = temp;
        }
    }

    function hasPiece(uint256[] storage pieces, uint256 piece) internal view returns (bool) {
        for (uint256 i = 0; i < pieces.length; i++) {
            if (pieces[i] == piece) {
                return true;
            }
        }
        return false;
    }

    function removePiece(uint256[] storage pieces, uint256 piece) internal {
        for (uint256 i = 0; i < pieces.length; i++) {
            if (pieces[i] == piece) {
                pieces[i] = pieces[pieces.length - 1];
                pieces.pop();
                break;
            }
        }
    }

    function isActivePlayer(uint256 gameId, address player) internal view returns (bool) {
        Game storage game = games[gameId];
        for (uint256 i = 0; i < game.activePlayers.length; i++) {
            if (game.activePlayers[i] == player) {
                return true;
            }
        }
        return false;
    }
}
