var Game = (function(world) {

    /**
     * Here's where we will bind the events for our game
     */
    function bindEvents()
    {
        document.body.onkeypress = function(e) {
            console.log(e);
        }
    }

    // Return public stuff
    return {
        world: world,
        bindEvents: bindEvents
    };

});
