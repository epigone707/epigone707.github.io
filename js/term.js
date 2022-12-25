


console.log("term.js loaded");
let username = "guest";

let dir_list = ['about/', 'life/', 'literature/', 'tech/', 'allposts/']

$('.my-terminal').terminal({
    iam: function (name) {
        username = name;
        this.echo('Hello, ' + name +
            '. Nice to meet you. I am Yanfu, currently a master\'s student in Computer Science at Umich. I also have two bachelor\'s degrees: ECE from SJTU and CS Umich. Type `boring` if you think this is a boring self-introduction.');
    },
    fuck: function () {
        this.echo('Hey ' + username + ', please do not say dirty words in my terminal.');
    },
    boring: function () {
        this.echo('I\'m Yanfu and I\'m currently a Solo Rank Diamond 1 player in League of Legends. I play games (especially PVP games like CSGO, Valorant), read manga (especially JP and KR), write novels (never published cuz they\'re all shit) and watch anime (of course JP animes, 99% Chinese animes are similar to my novels).');
    },
    help: function () {
        this.echo(
            'help    - Get help.\n' +
            'iam     - Introduce yourself. Pass your name as the argument.\n' +
            'clear   - Clear terminal.\n' +
            'history - Print bash history.\n' +
            'dark    - Enable dark mode.\n' +
            'light   - Enable light mode.\n' +
            'ls      - List all the directories.\n' +
            'cd      - Change directory. Pass the directory name as the argument.\n');
    },
    history: function () {
        bash_history = this.history().data();
        let output = '';
        for (let i = 0; i < bash_history.length; i++) {
            output += String(i).padStart(4, ' ') + " " + bash_history[i] + '\n';
        }
        this.echo(output);
    },
    dark: function () {
        enable();
    },
    light: function () {
        disable();
    },
    ls: function () {
        let out = "";
        for (let i = 0; i < dir_list.length; i++) {
            out += dir_list[i];
            out += '  ';
        }
        this.echo(out);
    },
    cd: function (dir) {
        if (dir == 'allposts') {
            window.open('/', '_blank');
        }
        else if (!dir_list.includes(dir + "/")) {
            this.echo('cd: No such file or directory: '+dir);
        } else {
            window.open('/' + dir + '/', '_blank');
        }
    },
}, {
    greetings: 'Connected to server epigone707\n'
        + 'This is a fake terminal for my blog.\n'
        + 'try running `help` to see the list of commands\n',
    prompt: '> ',
    history: true,
    // size of the history
    historySize: 20,
    // echoCommand:true,



});