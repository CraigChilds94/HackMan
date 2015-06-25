var Collectable = (function(world, position,type) {

    var sprite

    switch (type)
    {
        case 'data-mine':
            sprite = new world.PIXI.Sprite.fromImage('/src/img/data-mine.png');
            break;
        default :
            var sprite = new PIXI.Graphics();
            sprite.beginFill(0xFFFFFFF);
            sprite.drawRect(position.x, position.y, 20, 20);
            // sprite.setAnchor(0.5,0.5);
            break;
    }

    // Reset the position of the sprite
    sprite.position = position;

    function onCollision() {
        world.status.addPoints(1);
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
