var Collectable = (function(world, position,type) {

    var sprite

    switch (type)
    {
        case 'data-mine':
            sprite = new world.PIXI.Sprite.fromImage('/src/img/data-mine.png');
            break;
        case 'beer':
            sprite = new world.PIXI.Sprite.fromImage('/src/img/beer.png');
            break;
        default :
            var sprite = new world.PIXI.Sprite.fromImage('/src/img/box2.png');
            break;
    }

    // Reset the position of the sprite
    sprite.position = position;

    function onCollision() {

        var points;

        switch (type)
        {
            case 'data-mine':
                points = 50;
                break;
            case 'beer':
                points = 10;
                break;
            default:
                points = 1;
                break;
        }

        world.status.addPoints(points);
        world.collectables.splice(world.collectables.indexOf(this),1);
        world.stage.removeChild(sprite);

        if(world.collectables.length <= 0) {
            world.showWin();
        }
    }

    // Return public data
    return {
        sprite: sprite,
        onCollision: onCollision,
        update: function(){}
    };

});
