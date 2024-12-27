// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DominoGame {
    enum GameStatus {
        PENDING,
        WAITING_FOR_PLAYERS,
        PLAYING,
        CANCELED,
        COMPLETED,
        DRAW
    }

    struct Game {
        uint256 id;
        string name;
        address owner;
        GameStatus status;
        uint256 entryFee;
        uint256 prizePool;
        uint256 maxPlayers;
        address[] players;
        address[] activePlayers;
        mapping(address => uint256[]) playerPieces;
        uint256[] deck;
        uint256[] board;
        uint256 currentPlayerIndex;
    }

    struct GameResponse {
        uint256 id;
        string name;
        address owner;
        GameStatus status;
        uint256 entryFee;
        uint256 prizePool;
        uint256 maxPlayers;
        address[] players;
        address[] activePlayers;
        uint256[] deck;
        uint256[] board;
        uint256[] playerPieces;
    }

    struct CurrentPlayer {
        uint256 playerIndex;
        uint256[] playerPieces;
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
            game.status == GameStatus.PENDING ||
                game.status == GameStatus.WAITING_FOR_PLAYERS,
            "gameNotAcceptingPlayers"
        );
        require(msg.value == game.entryFee, "incorrectEntryFee");
        require(game.players.length < game.maxPlayers, "gameIsFull");

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

        gameCounter++;

        emit GameCreated(gameCounter, msg.sender, entryFee);

        if (isPlayer) {
            joinGame(newGame.id);
        }
    }

    function requestStartGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PENDING, "gameAlreadyStarted");
        require(game.players.length > 1, "notEnoughPlayers");

        game.status = GameStatus.WAITING_FOR_PLAYERS;
    }

    function cancelRequestStartGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(
            game.status == GameStatus.WAITING_FOR_PLAYERS,
            "gameAlreadyStarted"
        );

        game.status = GameStatus.PENDING;
    }

    function startGame(uint256 gameId) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.players.length >= 2, "notEnoughPlayers");
        require(
            game.status == GameStatus.WAITING_FOR_PLAYERS,
            "gameNotReadyToStart"
        );

        game.deck = generateDeck();
        shuffleDeck(game.deck);

        for (uint256 i = 0; i < game.players.length; i++) {
            for (uint256 j = 0; j <= 6; j++) {
                uint256 piece = game.deck[game.deck.length - 1];
                game.playerPieces[game.players[i]].push(piece);
                game.deck.pop();
            }
        }

        game.status = GameStatus.PLAYING;
        game.currentPlayerIndex = 0;

        emit GameStarted(gameId);
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
            hasPiece(game.playerPieces[msg.sender], piece),
            "playerDoesNotHaveThePiece"
        );

        removePiece(game.playerPieces[msg.sender], piece);
        game.board.push(piece);

        game.currentPlayerIndex =
            (game.currentPlayerIndex + 1) %
            game.activePlayers.length;

        emit PlayerMoved(gameId, msg.sender, piece);
    }

    function makeAutomaticMove(
        uint256 gameId
    ) external onlyActivePlayer(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "gameIsNotActive");
        require(game.board.length > 0, "noPiecesOnTheBoardYet");

        uint256[] storage playerPieces = game.playerPieces[msg.sender];
        uint256 boardStart = game.board[0];
        uint256 boardEnd = game.board[game.board.length - 1];

        bool moveMade = false;

        for (uint256 i = 0; i < playerPieces.length; i++) {
            uint256 piece = playerPieces[i];

            if (piece / 10 == boardEnd % 10 || piece % 10 == boardEnd % 10) {
                game.board.push(piece);
                removePiece(playerPieces, piece);

                emit PlayerMoved(gameId, msg.sender, piece);
                moveMade = true;
                break;
            } else if (
                piece / 10 == boardStart / 10 || piece % 10 == boardStart % 10
            ) {
                uint256[] memory newBoard = new uint256[](
                    game.board.length + 1
                );
                newBoard[0] = piece;

                for (uint256 j = 0; j < game.board.length; j++) {
                    newBoard[j + 1] = game.board[j];
                }

                game.board = newBoard;
                removePiece(playerPieces, piece);

                emit PlayerMoved(gameId, msg.sender, piece);
                moveMade = true;
                break;
            }
        }

        require(moveMade, "noValidMoveAvailable");

        game.currentPlayerIndex =
            (game.currentPlayerIndex + 1) %
            game.activePlayers.length;
    }

    function endGame(
        uint256 gameId,
        address winner
    ) external onlyOwner(gameId) {
        Game storage game = games[gameId];
        require(game.status == GameStatus.PLAYING, "gameIsNotActive");

        game.status = GameStatus.COMPLETED;
        balances[winner] += game.prizePool;

        emit GameCompleted(gameId, winner);
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

    function getCurrentPlayer(
        uint256 gameId
    ) external view returns (CurrentPlayer memory) {
        Game storage game = games[gameId];
        require(isActivePlayer(gameId, msg.sender), "playerNotInGame");

        uint256 playerIndex;
        for (uint256 i = 0; i < game.activePlayers.length; i++) {
            if (game.activePlayers[i] == msg.sender) {
                playerIndex = i;
                break;
            }
        }

        uint256[] memory playerPieces = new uint256[](
            game.playerPieces[msg.sender].length
        );
        for (uint256 i = 0; i < game.playerPieces[msg.sender].length; i++) {
            playerPieces[i] = game.playerPieces[msg.sender][i];
        }

        return
            CurrentPlayer({
                playerIndex: playerIndex,
                playerPieces: playerPieces,
                gameStatus: game.status
            });
    }

    function getGame(
        uint256 gameId
    ) external view returns (GameResponse memory) {
        Game storage game = games[gameId];
        uint256[] memory playerPieces = game.playerPieces[msg.sender];

        return
            GameResponse({
                id: game.id,
                name: game.name,
                owner: game.owner,
                status: game.status,
                entryFee: game.entryFee,
                prizePool: game.prizePool,
                maxPlayers: game.maxPlayers,
                players: game.players,
                activePlayers: game.activePlayers,
                deck: game.deck,
                board: game.board,
                playerPieces: playerPieces
            });
    }

    function getAllGames() external view returns (GameResponse[] memory) {
        GameResponse[] memory gamesResponse = new GameResponse[](gameCounter);

        for (uint256 i = 0; i < gameCounter; i++) {
            Game storage game = games[i];
            uint256[] memory playerPieces = game.playerPieces[msg.sender];

            gamesResponse[i] = GameResponse({
                id: game.id,
                name: game.name,
                owner: game.owner,
                status: game.status,
                entryFee: game.entryFee,
                prizePool: game.prizePool,
                maxPlayers: game.maxPlayers,
                players: game.players,
                activePlayers: game.activePlayers,
                deck: game.deck,
                board: game.board,
                playerPieces: playerPieces
            });
        }

        return gamesResponse;
    }
}
