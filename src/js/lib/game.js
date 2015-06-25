var Game = (function(world) {

    world.showGameOver = function() {

        var message = "Game Over, you suck.";

        var style = {
            font: '60px courier new',
            fill: '#ffffff'
        };

        var text = new PIXI.Text(message, style);
        text.x = 50;
        text.y = 100;
        world.stage.addChild(text);
    };

    world.showWin = function() {

        var message = "You won! yay!";

        var style = {
            font: '60px courier new',
            fill: '#ffffff'
        };

        var text = new PIXI.Text(message, style);
        text.x = 100;
        text.y = 100;
        world.stage.addChild(text);
        world.status.lives = 0;
    };

    /**
     * Here's where we will bind the events for our game
     */
    function bindEvents()
    {
        $(document).on('keydown', function(e) {

            e = e || window.event;

            if (e.keyCode == '38') {
                world.player.delta.y = -1;
                world.player.delta.x = 0;
                world.player.direction = 'u';
            } else if (e.keyCode == '40') {
                world.player.delta.y = 1
                world.player.delta.x = 0;
                world.player.direction = 'd';
            } else if (e.keyCode == '37') {
                world.player.delta.x = -1;
                world.player.delta.y = 0;
                world.player.direction = 'l';
            } else if (e.keyCode == '39') {
                world.player.delta.x = 1
                world.player.delta.y = 0;
                world.player.direction = 'r';
            }

        });
    }

    // Return public stuff
    return {
        world: world,
        bindEvents: bindEvents
    };

});
