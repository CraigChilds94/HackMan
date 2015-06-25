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
    graphics.beginFill(0x0000DB);
    graphics.drawRect(position.x, position.y, size.width, size.height);

    function checkPlayerCollision()
    {
        var playerSprite = world.player.sprite;
        var xdist = (playerSprite.x + world.player.delta.x) - position.x;

        var collidingWith = world.player.collidingWith.indexOf(this) !== -1;

        if(xdist > -playerSprite.width && xdist < size.width)
		{
			var ydist = (playerSprite.position.y + world.player.delta.y) - position.y;

			if(ydist > -playerSprite.height && ydist < size.height)
			{
                if (!collidingWith) {
    				onCollision(world.player);
                    world.player.collidingWith.push(this);
                }
                return;
			}
		}

        if (collidingWith) {
            world.player.hitWall = false;
            world.player.collidingWith.splice(world.player.collidingWith.indexOf(this), 1);
        }
    }

    function checkGhostCollision()
    {
        for (index in world.ghosts)
        {
            var ghost = world.ghosts[index];
            var xdist = (ghost.sprite.x + ghost.delta.x) - position.x;

            var collidingWith = ghost.collidingWith.indexOf(this) !== -1;

            if (collidingWith)
            {
                ghost.hitWall = false;
                ghost.collidingWith.splice(ghost.collidingWith.indexOf(this),1);
            }

            if (xdist > -ghost.sprite.width && xdist < size.width)
            {
                var ydist = (ghost.sprite.y + ghost.delta.y) - position.y;

                if (ydist > -ghost.sprite.height && ydist < size.height)
                {
                    if (!collidingWith)
                    {
                        onCollision(ghost);
                        ghost.collidingWith.push(this);
                    }
                    return;
                }
            }
        }
    }

    function onCollision(object)
    {
        object.hitWall = true;
    }

    return {
        position: position,
        size: size,
        rectangle: graphics,
        checkPlayerCollision: checkPlayerCollision,
        checkGhostCollision: checkGhostCollision
    };

});
