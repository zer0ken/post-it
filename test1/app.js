import { Point } from './point.js'
import { Note } from './note.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas')

        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

        this.mousePos = new Point()
        this.selected = null
        this.notes = [new Note(), new Note(), new Note()]


        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        window.requestAnimationFrame(this.animate.bind(this))

        document.addEventListener('pointerdown', this.onDown.bind(this), false)
        document.addEventListener('pointermove', this.onMove.bind(this), false)
        document.addEventListener('pointerup', this.onUp.bind(this), false)
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)

        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 3
        this.ctx.shadowBlur = 6
        this.ctx.shadowColor = 'rgba(0, 0, 0, .1)'
        this.ctx.lineWidth = 2

        for (const note of this.notes) {
            note.resize(this.stageWidth, this.stageHeight)
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        for (const note of this.notes) {
            note.animate(this.ctx)
        }

        if (this.selected) {
            this.ctx.fillStyle = '#ff4338'
            this.ctx.strokeStyle = '#ff4338'
            
            this.ctx.beginPath()
            this.ctx.arc(this.selected.centerPos.x, this.selected.centerPos.y, 8, 0, Math.PI * 2)
            this.ctx.fill()

            this.ctx.beginPath()
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math.PI * 2)
            this.ctx.fill()

            this.ctx.beginPath()
            this.ctx.moveTo(this.selected.centerPos.x, this.selected.centerPos.y)
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
            this.ctx.stroke()
        }
    }

    onDown(e) {
        this.mousePos.x = e.clientX
        this.mousePos.y = e.clientY
        
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const selected = this.notes[i].down(this.mousePos)
            if (selected) {
                this.selected = selected
                this.notes.push(this.notes.splice(i, 1)[0])
                break
            }
        }
    }

    onMove(e) {
        this.mousePos.x = e.clientX
        this.mousePos.y = e.clientY

        for (const note of this.notes) {
            note.move(this.mousePos)
        }
    }

    onUp(e) {
        this.selected = null

        for (const note of this.notes) {
            note.up()
        }
    }
}

window.onload = () => {
    new App()
}