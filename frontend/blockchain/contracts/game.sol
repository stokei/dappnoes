// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DominoGame {
    enum GameStatus {
        PENDING,
        PLAYING,
        CANCELED,
        COMPLETED,
        DRAW
    }

    struct Game {
        uint256 id;
        string name;
        address owner;
        address winner;
        GameStatus status;
        uint256 entryFee;
        uint256 prizePool;
        uint256 maxPlayers;
        address[] players;
        address[] activePlayers;
        mapping(address => uint256[]) playerDeck;
        uint256[] gameDeck;
        uint256[] boardDeck;
        uint256 currentPlayerIndex;
    }

    struct GameResponse {
        uint256 id;
        string name;
        address owner;
        address winner;
        GameStatus status;
        uint256 entryFee;
        uint256 prizePool;
        uint256 maxPlayers;
        address[] players;
        address[] activePlayers;
        uint256[] gameDeck;
        uint256[] boardDeck;
        uint256[] playerDeck;
    }

    struct CurrentPlayer {
        uint256 playerIndex;
        uint256[] playerDeck;
        GameStatus gameStatus;
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
        require(games[gameId].owner == msg.sender, "notTheGameOwner");
        _;
    }

    modifier onlyActivePlayer(uint256 gameId) {
        require(isActivePlayer(gameId, msg.sender), "notAnActivePlayer");
        _;
    }

    function joinGame(uint256 gameId) public payable {
        Game storage game = games[gameId];
        require(
            game.status == GameStatus.PENDING,
            "gameNotAcceptingPlayers"
        );
        require(msg.value == game.entryFee, "incorrectEntryFee");
        require(game.players.length < game.maxPlayers, "gameIsFull");
        for (uint256 i = 0; i < game.players.length; i++) {
            require(game.players[i] != msg.sender, "playerAlreadyInGame");
        }

        game.players.push(msg.sender);
        game.activePlayers.push(msg.sender);
        game.prizePool += msg.value;

        emit PlayerJoined(gameId, msg.sender);
    }

    function createGame(
        string memory name,
        uint256 entryFee,
        bool isPlayer
    ) external payable {
        Game storage newGame = games[gameCounter];
        newGame.id = gameCounter;
        newGame.name = name;
        newGame.maxPlayers = 4;
        newGame.owner = msg.sender;
        newGame.status = GameStatus.PENDING;
        newGame.entryFee = entryFee;

        emit GameCreated(gameCounter, msg.sender, entryFee);

        gameCounter++;

        if (isPlayer) {
            joinGame(newGame.id);
        }
    }

    function startGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.players.length >= 2, "notEnoughPlayers");
        require(
            game.status == GameStatus.PENDING,
            "gameNotReadyToStart"
        );

        game.gameDeck = generateDeck();
        shuffleDeck(game.gameDeck);

        for (uint256 i = 0; i < game.players.length; i++) {
            for (uint256 j = 0; j <= 6; j++) {
                uint256 piece = game.gameDeck[game.gameDeck.length - 1];
                game.playerDeck[game.players[i]].push(piece);
                game.gameDeck.pop();
            }
        }

        game.status = GameStatus.PLAYING;
        game.currentPlayerIndex = 0;

        emit GameStarted(gameId);
    }

    function endGame(uint256 gameId, address winner) internal {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "gameIsNotActive");

        game.status = GameStatus.COMPLETED;
        balances[winner] += game.prizePool;
        game.winner = winner;

        emit GameCompleted(gameId, winner);
    }

    function checkMovesAvailable(
        Game storage game
    ) internal view returns (bool) {
        for (uint256 i = 0; i < game.activePlayers.length; i++) {
            address player = game.activePlayers[i];
            uint256[] storage playerDeck = game.playerDeck[player];

            for (uint256 j = 0; j < playerDeck.length; j++) {
                uint256 piece = playerDeck[j];
                uint256 left = piece / 10;
                uint256 right = piece % 10;

                uint256 boardStart = game.boardDeck[0];
                uint256 boardEnd = game.boardDeck[game.boardDeck.length - 1];

                if (
                    left == boardStart / 10 ||
                    right == boardStart / 10 ||
                    left == boardEnd % 10 ||
                    right == boardEnd % 10
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    function endGameAsDraw(uint256 gameId) internal {
        Game storage game = games[gameId];
        game.status = GameStatus.DRAW;

        for (uint256 i = 0; i < game.players.length; i++) {
            balances[game.players[i]] += game.entryFee;
        }

        emit GameDraw(gameId);
    }

    function makeMove(
        uint256 gameId,
        uint256 left,
        uint256 right
    ) external onlyActivePlayer(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "gameIsNotActive");

        uint256 piece = left * 10 + right;
        require(
            hasPiece(game.playerDeck[msg.sender], piece),
            "playerDoesNotHaveThePiece"
        );

        removePiece(game.playerDeck[msg.sender], piece);
        game.boardDeck.push(piece);

        if (game.playerDeck[msg.sender].length == 0) {
            endGame(gameId, msg.sender);
            return;
        }

        bool movesAvailable = checkMovesAvailable(game);
        if (!movesAvailable) {
            endGameAsDraw(gameId);
            return;
        }

        game.currentPlayerIndex =
            (game.currentPlayerIndex + 1) %
            game.activePlayers.length;

        emit PlayerMoved(gameId, msg.sender, piece);
    }

    function cancelGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(
            game.status != GameStatus.COMPLETED &&
                game.status != GameStatus.DRAW,
            "gameAlreadyFinalized"
        );

        game.status = GameStatus.CANCELED;
        for (uint256 i = 0; i < game.players.length; i++) {
            balances[game.players[i]] += game.entryFee;
        }

        emit GameCanceled(gameId);
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "noBalanceToWithdraw");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function generateDeck() internal pure returns (uint256[] memory) {
        uint256[] memory deck = new uint256[](28);
        uint256 index = 0;
        for (uint256 i = 0; i <= 6; i++) {
            for (uint256 j = i; j <= 6; j++) {
                deck[index] = i * 10 + j;
                index++;
            }
        }
        return deck;
    }

    function shuffleDeck(uint256[] storage deck) internal {
        for (uint256 i = 0; i < deck.length; i++) {
            uint256 n = i +
                (uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.prevrandao)
                    )
                ) % (deck.length - i));
            uint256 temp = deck[n];
            deck[n] = deck[i];
            deck[i] = temp;
        }
    }

    function hasPiece(
        uint256[] storage pieces,
        uint256 piece
    ) internal view returns (bool) {
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

    function isActivePlayer(
        uint256 gameId,
        address player
    ) internal view returns (bool) {
        Game storage game = games[gameId];
        for (uint256 i = 0; i < game.activePlayers.length; i++) {
            if (game.activePlayers[i] == player) {
                return true;
            }
        }
        return false;
    }

    function getGame(
        uint256 gameId
    ) external view returns (GameResponse memory) {
        Game storage game = games[gameId];

        require(game.owner != address(0), "gameNotFound");

        uint256[] memory playerDeck = game.playerDeck[msg.sender];

        return
            GameResponse({
                id: game.id,
                name: game.name,
                owner: game.owner,
                winner: game.winner,
                status: game.status,
                entryFee: game.entryFee,
                prizePool: game.prizePool,
                maxPlayers: game.maxPlayers,
                players: game.players,
                activePlayers: game.activePlayers,
                gameDeck: game.gameDeck,
                boardDeck: game.boardDeck,
                playerDeck: playerDeck
            });
    }

    function getAllGames() external view returns (GameResponse[] memory) {
        GameResponse[] memory gamesResponse = new GameResponse[](gameCounter);

        for (uint256 i = 0; i < gameCounter; i++) {
            Game storage game = games[i];
            uint256[] memory playerDeck = game.playerDeck[msg.sender];

            gamesResponse[i] = GameResponse({
                id: game.id,
                name: game.name,
                owner: game.owner,
                winner: game.winner,
                status: game.status,
                entryFee: game.entryFee,
                prizePool: game.prizePool,
                maxPlayers: game.maxPlayers,
                players: game.players,
                activePlayers: game.activePlayers,
                gameDeck: game.gameDeck,
                boardDeck: game.boardDeck,
                playerDeck: playerDeck
            });
        }

        return gamesResponse;
    }
}
