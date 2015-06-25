var Game = (function(world) {

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
