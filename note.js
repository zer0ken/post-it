import { Point } from "./point.js";

const FPS = 60 / 1000

const NOTE_WIDTH = 200
export const HALF_WIDTH = NOTE_WIDTH / 2

const NOTE_HEIGHT = 200
export const HALF_HEIGHT = NOTE_HEIGHT / 2

const STICKER_HEIGHT = 60
const SPEED_COEFFICIENT = .008

export class Note {
    constructor(x, y) {
        this.pos = new Point(x, y)
        this.target = new Point(x, y)
        this.grab = new Point()
        this.prevPos = new Point(x, y)
        this.isDown = false
    }

    resize(stageWidth, stageHeight) {
        this.grab.x = this.pos.x + HALF_WIDTH
        this.grab.y = this.pos.y + HALF_HEIGHT
        this.target.x = Math.max(Math.min(stageWidth - NOTE_WIDTH, this.pos.x), 0) + halfX
        this.target.y = Math.max(Math.min(stageHeight - NOTE_HEIGHT, this.pos.y), 0) + halfY
    }

    animate(ctx) {
        ctx.fillStyle = 'rgb(255, 228, 109)'

        if (this.isDown) {
            ctx.shadowBlur = 12
            ctx.shadowColor = 'rgba(0, 0, 0, .4)'
            ctx.beginPath()
            ctx.fillRect(this.pos.x, this.pos.y, NOTE_WIDTH, NOTE_HEIGHT)
            ctx.initializeShadow()
        } else {
            ctx.beginPath()
            ctx.fillRect(this.pos.x, this.pos.y, NOTE_WIDTH, NOTE_HEIGHT)
        }

        const delta = this.target.sub(this.grab).mul(SPEED_COEFFICIENT)
        if (Math.abs(delta.x) > SPEED_COEFFICIENT || Math.abs(delta.y) > SPEED_COEFFICIENT || this.isDown) {

            this.followTarget(delta)

            ctx.fillStyle = '#fff'
            ctx.strokeStyle = '#fff'

            ctx.beginPath()
            ctx.moveTo(this.grab.x, this.grab.y)
            ctx.lineTo(this.target.x, this.target.y)
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(this.grab.x, this.grab.y, 5, 0, Math.PI * 2)
            ctx.fill()

            ctx.beginPath()
            ctx.arc(this.target.x, this.target.y, 5, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    followTarget(delta) {
        this.pos.x += delta.x / FPS
        this.pos.y += delta.y / FPS
        this.grab.x += delta.x / FPS
        this.grab.y += delta.y / FPS
    }

    isCollide(point) {
        return point.x >= this.pos.x
            && point.x <= this.pos.x + NOTE_WIDTH
            && point.y >= this.pos.y
            && point.y <= this.pos.y + NOTE_HEIGHT
    }

    isBaseOf(note) {
        return this.isCollide(note.pos)
            || this.isCollide(new Point(note.pos.x + NOTE_WIDTH, note.pos.y))
            || this.isCollide(new Point(note.pos.x, note.pos.y + STICKER_HEIGHT))
            || this.isCollide(new Point(note.pos.x + NOTE_WIDTH, note.pos.y + STICKER_HEIGHT))
    }
}