sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.disintegrate, 500)
    otherSprite.destroy()
    info.changeScoreBy(1)
    hayobjetivo = false
    music.powerUp.play()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado > -1) {
        estado += -1
    }
    pintatabla(estado)
})
function pintatabla (num: number) {
    if (estado == -1) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . d e . . . . 
            . . . . . . . . . d e . . . . . 
            . . . . . . . d e e . . . . . . 
            . . . . . d e e . . . . . . . . 
            . . . . d e . d . . . . . . . . 
            . . . d e . d e e . . . . . . . 
            . . . . . d e e e e . . . . . . 
            . . . . d e e e e e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        if (estado == 1) {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . e d . . . . . . . . . . . 
                . . . . e d . . . . . . . . . . 
                . . . . . e e . . . . . . . . . 
                . . . . . . . e e d . . . . . . 
                . . . . . . . d . e d . . . . . 
                . . . . . . d e e . e d . . . . 
                . . . . . d e e e e . . . . . . 
                . . . . d e e e e e e . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        } else {
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . e e e e e e e e e . . . . 
                . . . . . . . d . . . . . . . . 
                . . . . . . d e e . . . . . . . 
                . . . . . d e e e e . . . . . . 
                . . . . d e e e e e e . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (estado < 1) {
        estado += 1
    }
    pintatabla(estado)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (estado == -1) {
        sprite.vx += -25
    } else {
        if (estado == 1) {
            sprite.vx += 25
        } else {
            sprite.vx += 0
        }
    }
    sprite.vy = -1 * sprite.vy
    music.pewPew.play()
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (sprite.y >= 124) {
        info.changeLifeBy(-1)
        music.jumpDown.play()
        sprite.destroy()
        ball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . 6 6 6 6 6 . . . . . . 
            . . . . 6 9 9 6 6 6 6 . . . . . 
            . . . 6 6 9 6 6 6 6 6 6 . . . . 
            . . . 6 6 6 6 6 6 6 6 6 . . . . 
            . . . 6 6 6 6 6 6 6 6 6 . . . . 
            . . . . 6 6 6 6 6 6 6 . . . . . 
            . . . . . 6 6 6 6 6 . . . . . . 
            . . . . . . 6 6 6 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        ball.setPosition(randint(10, 140), 0)
        ball.setVelocity(randint(-50, 50), 0)
        ball.ay = 20
    } else {
        if (sprite.y < 15) {
            sprite.vy = -1 * sprite.vy
        }
    }
})
let objetivo: Sprite = null
let hayobjetivo = false
let estado = 0
let ball: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(0)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . e e e e e e e e e . . . . 
    . . . . . . . d . . . . . . . . 
    . . . . . . d e e . . . . . . . 
    . . . . . d e e e e . . . . . . 
    . . . . d e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(80, 105)
controller.moveSprite(mySprite, 100, 0)
ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 . . . . . . . 
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . 6 9 9 6 6 6 6 . . . . . 
    . . . 6 6 9 6 6 6 6 6 6 . . . . 
    . . . 6 6 6 6 6 6 6 6 6 . . . . 
    . . . 6 6 6 6 6 6 6 6 6 . . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . . . 6 6 6 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
ball.setPosition(randint(10, 140), 5)
ball.setVelocity(randint(-50, 50), 0)
ball.ay = 20
mySprite.setFlag(SpriteFlag.StayInScreen, true)
ball.setFlag(SpriteFlag.BounceOnWall, true)
estado = 0
hayobjetivo = false
info.setLife(3)
tiles.setTilemap(tiles.createTilemap(hex`0a000900010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010303030303030303030302020202020202020202`, img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,sprites.builtin.brick,sprites.builtin.oceanSand6,sprites.builtin.oceanSand2], TileScale.Sixteen))
game.onUpdateInterval(2000, function () {
    if (ball.vx > 0) {
        ball.vx += 10
    } else {
        ball.vx += -10
    }
    if (ball.vy > 0) {
        ball.vy += 10
    } else {
        ball.vy += -10
    }
})
game.onUpdateInterval(1000, function () {
    if (!(hayobjetivo)) {
        objetivo = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 . . . . . 
            . . . 2 1 1 1 1 1 1 1 2 . . . . 
            . . 2 1 1 1 1 1 1 1 1 1 2 . . . 
            . 2 1 1 1 2 2 2 2 2 1 1 1 2 . . 
            . 2 1 1 2 1 1 1 1 1 2 1 1 2 . . 
            . 2 1 1 2 1 2 2 2 1 2 1 1 2 . . 
            . 2 1 1 2 1 2 2 2 1 2 1 1 2 . . 
            . 2 1 1 2 1 2 2 2 1 2 1 1 2 . . 
            . 2 1 1 2 1 1 1 1 1 2 1 1 2 . . 
            . 2 1 1 1 2 2 2 2 2 1 1 1 2 . . 
            . . 2 1 1 1 1 1 1 1 1 1 2 . . . 
            . . . 2 1 1 1 1 1 1 1 2 . . . . 
            . . . . 2 2 2 2 2 2 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        objetivo.setPosition(randint(0, 160), randint(0, 80))
        hayobjetivo = true
    }
})
