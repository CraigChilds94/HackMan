var Wall = (function(world, properties) {

    var position = {
        x: properties.x,
        y: properties.y
    };

    var size = {
        width: properties.width,
        height: properties.height
    };

    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(position.x, position.y, size.width, size.height);

    function checkPlayerCollision()
    {
        var playerSprite = world.player.sprite;
        var xdist = (playerSprite.x + world.player.delta.x) - position.x;

		if(xdist > -playerSprite.width && xdist < size.width)
		{
			var ydist = (playerSprite.position.y + world.player.delta.y) - position.y;

			if(ydist > -playerSprite.height && ydist + size.height*2 < playerSprite.height)
			{
				world.player.hitWall = true;
                return;
			}
		}

        world.player.hitWall = false;
    }

    return {
        position: position,
        size: size,
        rectangle: graphics,
        checkPlayerCollision: checkPlayerCollision
    };

});
