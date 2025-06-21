export default class GameServer {
  /**
   *
   * @param {import("socket.io").Socket<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>} socket
   */
  constructor(socket) {
    this.socket = socket;

    /*
      key: roomId 
      value: {
      playerA: playerId,
      playerB: playerId,
      abilities: {
        playerA: {
          freeze: {
            activeCell: "r4:c3",
            cooldown: 0,
          },
          bomb: {
            cooldown: 0,
          },
          swap: {
            cooldown: 0,
          },
        },
        playerB: {
          freeze: {
            activeCell: "r1:c1",
            cooldown: 0,
          },
          bomb: {
            cooldown: 0,
          },
          swap: {
            cooldown: 0,
          },
        },
      },
      cells: {
        r1: {
          c1: {
            freezed: false,
            player: null,
          },
          c2: {
            freezed: false,
            player: null,
          },
          c3: {
            freezed: false,
            player: null,
          },
          c4: {
            freezed: false,
            player: null,
          },
        },
        r2: {
          c1: {
            freezed: false,
            player: null,
          },
          c2: {
            freezed: false,
            player: null,
          },
          c3: {
            freezed: false,
            player: null,
          },
          c4: {
            freezed: false,
            player: null,
          },
        },
        r3: {
          c1: {
            freezed: false,
            player: null,
          },
          c2: {
            freezed: false,
            player: null,
          },
          c3: {
            freezed: false,
            player: null,
          },
          c4: {
            freezed: false,
            player: null,
          },
        },
        r4: {
          c1: {
            freezed: false,
            player: null,
          },
          c2: {
            freezed: false,
            player: null,
          },
          c3: {
            freezed: false,
            player: null,
          },
          c4: {
            freezed: false,
            player: null,
          },
        },
      },
    }
    */
    this.rooms = new Map();
    this.players = new Set();

    // add matchmaking
    // add private rooms

    this.initHandlers();
  }

  initHandlers() {
    this.socket.on("new-game", this.newGameHandler);
    this.socket.on("join-game", this.joinGameHandler);
    this.socket.on("move", this.moveHandler);
    this.socket.on("ability", this.abilityHandler);
    this.socket.on("matchmaking", this.matchmakingHandler);
  }

  newGameHandler({ player }) {}
  joinGameHandler({ gameId, player }) {}
  moveHandler({ gameId, player, cell }) {}
  abilityHandler({ gameId, player, cell, ability }) {}
  matchmakingHandler({ player }) {}
}
