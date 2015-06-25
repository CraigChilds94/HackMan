var Collectable = (function(world, position) {

    // Load in a player image
    var sprite = new world.PIXI.Sprite.fromImage('http://placekitten.com/g/150/150');    

    // Reset the position of the sprite
    sprite.position = position; 

    function onCollision() {
        world.score++;
        world.stage.removeChild(sprite);
    }   

    // Return public data
    return {
        sprite: sprite,        
        onCollision: onCollision
    };

});