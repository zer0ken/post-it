let $whiteboard = null
let $notes = null
let $newNote = null


$(window).ready(function () {
    $whiteboard = $('.whiteboard')
    $notes = $('.notes')

    $whiteboard.click(function () {
        if ($newNote == null) {
            $newNote = $(`<div class="note new hidden">hi</div>`)
            $notes.append($newNote)
            setTimeout(() => {
                $newNote.removeClass('hidden')
            }, 100);
        } else {
            $newNote.removeClass('new')
            $newNote.click(function () {
                console.log('wow!')
            })
            $newNote = null;
        }
    })

    $(document).mousemove(function (e) {
        if ($newNote) {
            const offset = $whiteboard.offset()
            const [w, h] = [$newNote.width(), $newNote.height()]
            $newNote.css({ left: e.pageX - offset.left - w / 2, top: e.pageY - offset.top + h / 2})
        }
    })

})