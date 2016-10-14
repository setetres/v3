$(document).ready(function(){

    var soundtrack = $('#soundtrack')[0];
    var soundtrackUp = $('#soundtrack-up')[0];
    var elements = $('.social li');

    // mute controls

    $('#mute').bind('click', function(){
        $(this).hide(0);
        $('#unmute').show(0);
        soundtrack.volume=0;
        soundtrackUp.volume=0;
    });

    $('#unmute').bind('click', function(){
        $(this).hide(0);
        $('#mute').show(0);
        soundtrack.volume=1;
        soundtrackUp.volume=1;
    });

    // target blank

    $('a[rel=external]').attr('target', '_blank');

    // x

    $('.x').mouseenter(function(){
        soundtrack.pause();
        soundtrackUp.play();
        $('.c15').css({display: 'none'});
    }).mouseleave(function(){
        soundtrack.play();
        soundtrackUp.pause();
        $('.c15').css({display: 'inline'});
    }).click(function(){
        $('.center').addClass('active');
        var term = new Terminal('#input-line .cmdline', '#wr output');
        term.initFS(false);
    });

    // social glitch

    $('.social li').mouseenter(function(){
        soundtrack.pause();
        soundtrackUp.play();
        $('.c' + elements.index($(this))).css({display: 'none'});
    }).mouseleave(function(){
        soundtrack.play();
        soundtrackUp.pause();
        $('.c' + elements.index($(this))).css({display: 'inline'});
    });

    // window load

    $(window).load(function(){
        soundtrack.play();
    });

});