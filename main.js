let $newNote = null

$(window).ready(function () {
    const $whiteboard = $('.whiteboard')
    let $hold = null
    let $newNote = $('<div class="note new hidden">hi</div>')
    let offset = $whiteboard.offset()

    console.log(offset)

    $whiteboard.click(function () {
        console.log('clicked')
        $whiteboard.append($newNote)
        if ($hold) {
            $hold.removeClass('new')
        }
        $newNote.removeClass('hidden')
        $hold = $newNote
        $newNote = $(`<div class="note new hidden">hi</div>`)
    })

    $(document).mousemove(function (e) {
        offset = $whiteboard.offset()
        if ($hold) {
            $hold.css({left: e.pageX - offset.left, top: e.pageY - offset.top})
        }
    })
})