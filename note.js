import { Point } from "./point.js";

const FPS = 60 / 1000
const NOTE_WIDTH = 200
const NOTE_HEIGHT = NOTE_WIDTH
const STICKER_HEIGHT = 60

export class Note {
    constructor(x, y) {
        this.pos = new Point(x, y)
        this.target = new Point(x, y)
        this.grab = new Point()
    }

    resize(stageWidth, stageHeight) {
    }

    animate(ctx) {
        ctx.beginPath()
        ctx.fillStyle = 'rgb(255, 228, 109)'
        ctx.fillRect(this.pos.x, this.pos.y, NOTE_WIDTH, NOTE_HEIGHT)

        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(this.grab.x, this.grab.y, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = '#f00'
        ctx.arc(this.target.x, this.target.y, 5, 0, Math.PI * 2)
        ctx.fill()
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