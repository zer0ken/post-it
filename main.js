let $note = null

$(window).ready(function () {
    $('#whiteboard').click(function (e) {
        console.log('board click')
        if ($note) {
            $note.removeClass('new')
            $note = null
        } else {
            $note = $('<div class="note new"></div>').appendTo('#whiteboard').click(noteClick)
        }
    })

    function noteClick(e) {
        console.log('note click')
        if ($note) {
            $note.removeClass('new')
            $note = null
        } else {
            $note = $('<div class="note new"></div>').appendTo('#whiteboard')
        }
        e.stopPropagation()
    }

    $(document).mousemove(function (e) {
        if (!$note) return
        const parent = $('#whiteboard').offset()
        $note.css({ left: e.pageX - parent.left, top: e.pageY - parent.top })
    })
})