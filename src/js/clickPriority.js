$(document).ready(function() {
    $('#priority-click').click(function () {
        var target = $('#target');
        var destination = $('#destination');

        target.replaceWith(destination.clone());
        destination.replaceWith(target);
    });
});