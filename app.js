import { Note, HALF_WIDTH , HALF_HEIGHT } from "./note.js"
import { Point } from "./point.js"

class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1
        this.ctx = this.canvas.getContext('2d')
        this.ctx.initializeShadow = () => {
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 3
            this.ctx.shadowBlur = 6
            this.ctx.shadowColor = 'rgba(0, 0, 0, .2)'
        }

        this.notes = []
        this.selected = null

        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        window.addEventListener('mousedown', this.onDown.bind(this), false)
        window.addEventListener('mousemove', this.onMove.bind(this), false)
        window.addEventListener('mouseup', this.onUp.bind(this), false)

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth
        this.canvas.height = this.stageHeight
        this.ctx.scale(this.pixelRatio, this.pixelRatio)
    
        this.ctx.initializeShadow()

        this.notes.forEach(note => {
            note.resize(this.stageWidth, this.stageHeight)
        });
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        this.notes.forEach(element => {
            element.animate(this.ctx)
        });
    }

    onDown(e) {
        this.isDown = true
        this.downPos = new Point(e.clientX, e.clientY)
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i]
            if (note.isCollide(this.downPos)) {
                this.selected = this.notes.splice(i, 1)[0]
                break
            }
        }
        if (!this.selected) {
            this.selected = new Note(e.clientX - HALF_WIDTH, e.clientY - HALF_HEIGHT)
        }
        this.notes.push(this.selected)
        this.selected.grab = this.downPos
        this.selected.target.x = e.clientX
        this.selected.target.y = e.clientY
        this.selected.isDown = true
    }

    onMove(e) {
        if (this.isDown && this.selected) {
            this.selected.target.x = e.clientX
            this.selected.target.y = e.clientY
        }
    }

    onUp(e) {
        this.isDown = false
        this.selected.isDown = false
        this.selected = null
    }
}

window.onload = () => {
    new App()
}