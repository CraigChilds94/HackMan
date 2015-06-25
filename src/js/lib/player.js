var Player = (function(world, position) {

    // Load in a player image
    var sprite = new world.PIXI.Sprite.fromImage('http://placekitten.com/g/150/150');

    var hitWall = false;

    // deltas
    var delta = {
        x: 0,
        y: 1
    };

    sprite.scale = {x: 0.5, y: 0.5};

    // Reset the position of the sprite
    sprite.position = position;

    // Handle updating the player
    function update()
    {
        if(!world.player.hitWall && inBounds()) {
            sprite.position.x += delta.x;
            sprite.position.y += delta.y;
        }
    }

    // Check if player in bounds
    function inBounds()
    {
        var xPos = sprite.position.x + delta.x;
        var yPos = sprite.position.y + delta.y;

        return (xPos >= 0 && xPos + sprite.width <= 800)
            && (yPos >= 0 && yPos + sprite.height <= 600);
    }

    // Return public data
    return {
        sprite: sprite,
        speed: 5,
        delta: delta,
        update: update,
        collidingWith: [],
        hitWall: hitWall
    };

});
