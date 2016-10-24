$(document).ready(function() {
    $('#click-priority').click(function () {
        var target = $('#target');
        var destination = $('#destination');

        target.replaceWith(destination.clone());
        destination.replaceWith(target);
    });
});