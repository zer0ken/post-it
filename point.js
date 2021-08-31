export class Point {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    add(point) {
        const result = this.clone()
        result.x += point.x
        result.y += point.y
        return result
    }

    sub(point) {
        const result = this.clone()
        result.x -= point.x
        result.y -= point.y
        return result
    }

    mul(value) {
        const result = this.clone()
        result.x *= value
        result.y *= value
        return result
    }

    clone() {
        return new Point(this.x, this.y)
    }
}