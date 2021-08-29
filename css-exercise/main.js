let $note = null
let mousePosition = { x: 0, y: 0 }

$(window).ready(function () {
    $('#whiteboard').click(boardClick)

    $(document).mousemove(function (e) {
        mousePosition = { x: e.pageX, y: e.pageY }
        if (!$note) return
        $note.css(getNotePosition())
    })

    function getNotePosition() {
        const parent = $('#whiteboard').offset()
        return { left: mousePosition.x - parent.left, top: mousePosition.y - parent.top }
    }

    function boardClick(e) {
        if ($note) {
            $note.removeClass('new')
            $note = null
        } else {
            const parent = $('#whiteboard').offset()
            $note = $('<div class="note new hidden"></div>')
                .appendTo('#whiteboard')
                .click(noteClick)
                .css(getNotePosition())
                .removeClass('hidden')
        }
    }

    function noteClick(e) {
        if ($note) {
            $note.removeClass('new')
            $note = null
        } else {
            $note = $(e.target).addClass('new')
        }
        e.stopPropagation()
    }
})