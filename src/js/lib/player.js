var Player = (function(world, position) {

    // Load in a player image
    var sprite = new world.PIXI.Sprite.fromImage('http://placekitten.com/g/150/150');

    // deltas
    var delta = {
        x: 0,
        y: 1
    };

    // Reset the position of the sprite
    sprite.position = position;

    // Handle updating the player
    function update()
    {
        sprite.position.x += delta.x;
        sprite.position.y += delta.y;
    }

    // Return public data
    return {
        sprite: sprite,
        speed: 5,
        delta: delta,
        update: update
    };

});
