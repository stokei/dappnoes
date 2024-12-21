// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DappnoesToken is ERC20 {
    constructor() ERC20("Dappnoes", "NOE") {
        _mint(msg.sender, 1000000 * (10 ** decimals()));
    }
}

contract DappnoesGame is Ownable {
    enum GameState {
        Waiting,
        Active,
        Finished
    }

    struct Room {
        uint256 id;
        address creator;
        uint256 entryFee;
        address[] players;
        uint8 maxPlayers;
        GameState state;
        uint256 lastMoveTimestamp;
    }

    mapping(uint256 => Room) public rooms;
    mapping(uint256 => mapping(address => bool)) public roomPlayers;
    mapping(uint256 => address) public roomWinner;

    DappnoesToken public token;
    uint256 public roomCounter;
    uint256 public inactivityTimeout = 1 hours;
    uint256 public moveTimeLimit = 5 minutes;

    event RoomCreated(
        uint256 roomId,
        address creator,
        uint256 entryFee,
        uint8 maxPlayers
    );
    event PlayerJoined(uint256 roomId, address player);
    event GameStarted(uint256 roomId);
    event MoveMade(uint256 roomId, address player, bytes move);
    event GameFinished(uint256 roomId, address winner);

    constructor(address _token) {
        token = DappnoesToken(_token);
    }

    modifier roomExists(uint256 roomId) {
        require(rooms[roomId].id == roomId, "Room does not exist");
        _;
    }

    modifier onlyActiveRoom(uint256 roomId) {
        require(rooms[roomId].state == GameState.Active, "Room is not active");
        _;
    }

    function createRoom(
        uint256 entryFee,
        uint8 maxPlayers
    ) external returns (uint256) {
        require(
            maxPlayers == 2 || maxPlayers == 3 || maxPlayers == 4,
            "Invalid number of players"
        );

        roomCounter++;
        Room storage room = rooms[roomCounter];
        room.id = roomCounter;
        room.creator = msg.sender;
        room.entryFee = entryFee;
        room.maxPlayers = maxPlayers;
        room.state = GameState.Waiting;

        emit RoomCreated(roomCounter, msg.sender, entryFee, maxPlayers);
        return roomCounter;
    }

    function joinRoom(uint256 roomId) external roomExists(roomId) {
        Room storage room = rooms[roomId];
        require(
            room.state == GameState.Waiting,
            "Room is not accepting players"
        );
        require(room.players.length < room.maxPlayers, "Room is full");
        require(!roomPlayers[roomId][msg.sender], "Already joined");

        if (room.entryFee > 0) {
            token.transferFrom(msg.sender, address(this), room.entryFee);
        }

        room.players.push(msg.sender);
        roomPlayers[roomId][msg.sender] = true;

        emit PlayerJoined(roomId, msg.sender);

        if (room.players.length == room.maxPlayers) {
            startGame(roomId);
        }
    }

    function startGame(uint256 roomId) internal roomExists(roomId) {
        Room storage room = rooms[roomId];
        require(room.state == GameState.Waiting, "Game already started");
        room.state = GameState.Active;
        room.lastMoveTimestamp = block.timestamp;

        emit GameStarted(roomId);
    }

    function makeMove(
        uint256 roomId,
        bytes calldata move
    ) external roomExists(roomId) onlyActiveRoom(roomId) {
        Room storage room = rooms[roomId];
        require(roomPlayers[roomId][msg.sender], "Not a player in this room");
        require(
            block.timestamp <= room.lastMoveTimestamp + moveTimeLimit,
            "Move time exceeded"
        );

        room.lastMoveTimestamp = block.timestamp;

        emit MoveMade(roomId, msg.sender, move);
    }

    function finishGame(
        uint256 roomId,
        address winner
    ) external onlyOwner roomExists(roomId) {
        Room storage room = rooms[roomId];
        require(room.state == GameState.Active, "Game is not active");
        require(roomPlayers[roomId][winner], "Winner is not a player");

        room.state = GameState.Finished;
        roomWinner[roomId] = winner;

        uint256 prizePool = room.entryFee * room.players.length;
        if (prizePool > 0) {
            token.transfer(winner, prizePool);
        }

        emit GameFinished(roomId, winner);
    }

    function closeInactiveRoom(uint256 roomId) external roomExists(roomId) {
        Room storage room = rooms[roomId];
        require(
            block.timestamp > room.lastMoveTimestamp + inactivityTimeout,
            "Room is still active"
        );
        require(room.state == GameState.Active, "Room is not active");

        room.state = GameState.Finished;
        emit GameFinished(roomId, address(0));
    }

    function setMoveTimeLimit(uint256 limit) external onlyOwner {
        moveTimeLimit = limit;
    }

    function setInactivityTimeout(uint256 timeout) external onlyOwner {
        inactivityTimeout = timeout;
    }
}
