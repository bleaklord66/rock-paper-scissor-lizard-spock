'use strict';

const choices = {
    rock: {
        win: ['lizard', 'scissor'],
        lose: ['paper', 'spock']
    },
    paper: {
        win: ['rock', 'spock'],
        lose: ['scissor', 'lizard']
    },
    scissor: {
        win: ['paper', 'lizard'],
        lose: ['rock', 'spock']
    },
    spock: {
        win: ['scissor', 'rock'],
        lose: ['paper', 'lizard']
    },
    lizard: {
        win: ['spock', 'paper'],
        lose: ['scissor', 'rock']
    }
}

let play = null;
let score = {
    player1Score: 0,
    player2Score: 0,
}

const init = function () {
    play = {
        playerNumber: 1,
        player1Choice: null,
        player2Choice: null,
        player1WinTakes: null,
        player2WinTakes: null,
        player1LoseTakes: null,
        player2LoseTakes: null,
        roundStatus: null,
        playing: function () {
            this[`player${play.playerNumber}WinTakes`] = choices[this[`player${play.playerNumber}Choice`]].win;
            this[`player${play.playerNumber}LoseTakes`] = choices[this[`player${play.playerNumber}Choice`]].lose;
            this.playerNumber = 2;
        }
    }

    document.querySelector('#rules').innerHTML = '<strong>RULES:</strong><br>The one who gets 3 points win!<br>Use the picture to see what option defeats and is defeated by other options.<br>When you are ready, player one can begin.<br><br><strong>CONTROLS:<br></strong>1 is rock<br>2 is paper<br>3 is scissor<br>4 is spock<br>5 is lizard<br>Press R to start a new game'
    document.querySelector('#console').innerHTML = 'Player one chooses:'
    document.querySelector('#imgRule').classList.remove('hidden');
    document.querySelector('#imgGame').classList.add('hidden');
    document.querySelector('#end').classList.add('hidden');

};

init();

document.addEventListener('keydown', function firstPlay(e) {
    if (e.key === 'r') {
        score = {
            player1Score: 0,
            player2Score: 0,
        };
        init();
        document.querySelector('#console').innerHTML = 'Game is restarted. Player 1 chooses:';
        return;
    }

    if (score.player1Score === 3 || score.player2Score === 3) return;
    if (play.player1Choice !== null & play.player2Choice !== null) init();

    if (play.player1Choice === null || play.player2Choice === null) {
        document.querySelector('#imgRule').classList.remove('hidden');
        document.querySelector('#imgGame').classList.add('hidden');
    }


    if (play.player2Choice === null) document.querySelector('#console').innerHTML = 'Player two chooses:';
    if (document.querySelector('#console').textContent.includes('Player one played')) document.querySelector('#console').textContent = 'Player two chooses:';

    switch (e.key) {
        case '1':
            play[`player${play.playerNumber}Choice`] = 'rock'
            break;
        case '2':
            play[`player${play.playerNumber}Choice`] = 'paper'
            break;
        case '3':
            play[`player${play.playerNumber}Choice`] = 'scissor'
            break;
        case '4':
            play[`player${play.playerNumber}Choice`] = 'spock'
            break;
        case '5':
            play[`player${play.playerNumber}Choice`] = 'lizard'
            break;
        default:
            document.querySelector('#console').innerHTML = 'Choose valid key!';
    }

    play.playing();

    if (play.player1Choice !== null && play.player2Choice !== null) {
        let win1 = null;
        let win2 = null;
        let lose1 = null;
        let lose2 = null;
        let result = 0;

        play.player1WinTakes.includes(play.player2Choice) ? win1 = 1 : win1 = 0
        play.player2WinTakes.includes(play.player1Choice) ? win2 = 1 : win2 = 0
        play.player1LoseTakes.includes(play.player2Choice) ? lose1 = 1 : lose1 = 0
        play.player2LoseTakes.includes(play.player1Choice) ? lose2 = 1 : lose2 = 0

        if (win1 === 1 && lose2 == 1) {
            result = 1;
            score.player1Score++;
        }
        else if (win2 === 1 && lose1 == 1) {
            result = 2
            score.player2Score++
        }

        document.querySelector('#console').innerHTML = `Player one played ${play.player1Choice}.<br>Player two played ${play.player2Choice}.<br>${result > 0 ? `Thus player ${result} wins this round and gets one point!` : 'Noone gets a point, its a draw!'}<br>Player 1 has ${score.player1Score} points.<br>Player 2 has ${score.player2Score} points.<br><br> ${score.player1Score === 3 || score.player2Score === 3 ? '' : 'Player one chooses:'}`;

    }

    if (document.querySelector('#console').textContent.includes('Player one played')) {
        document.querySelector('#img1').src = `${play.player1Choice}.png`;
        document.querySelector('#img2').src = `${play.player2Choice}.png`;
        document.querySelector('#imgRule').classList.add('hidden');
        document.querySelector('#imgGame').classList.remove('hidden');
    }

    if (score.player1Score === 3 || score.player2Score === 3) {
        setTimeout(() => {
            document.querySelector('#console').innerHTML = `Player ${score.player1Score === 3 ? 1 : 2} won the game!<br>Press R to start again`;
            document.querySelector('#imgGame').classList.add('hidden');
            document.querySelector('#end').classList.remove('hidden');
        }, 1700)
    }
});