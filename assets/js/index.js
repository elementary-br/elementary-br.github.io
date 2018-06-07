var mediumApiGatewayUrl = 'https://elementary-br-medium-api-gateway.now.sh/';

$(function () {
    PreencheHtmlComPosts(3);
    AdicionaBotoesMenu();
});

AdicionaBotoesMenu = function () {
    var menu = $('.nav-content > div > ul');
    var clickInterval;
    var scrollLeft = 0;
    var setaDireita = $('.nav-content > div > ul > li.btnRight');
    var setaEsquerda = $('.nav-content > div > ul > li.btnLeft').hide();
    menu.scroll(function() {
        if(menu.scrollLeft() == 0)
            setaEsquerda.hide();
        else
            setaEsquerda.show();
        if(menu.scrollLeft() + menu.innerWidth() >= menu[0].scrollWidth)
            setaDireita.hide();
        else
            setaDireita.show();
    });
    setaDireita.on('mousedown touchstart', function () {
        clickInterval = setInterval(function () {
            menu.scrollLeft(scrollLeft += 10);
        }, 50);
    
        return false;
    }).on('mouseup mouseout touchend', function () {
        clearInterval(clickInterval);
        return false;
    });
    setaEsquerda.on('mousedown touchstart', function () {
        clickInterval = setInterval(function () {
            menu.scrollLeft(scrollLeft -= 10);
        }, 50);
    
        return false;
    }).on('mouseup mouseout touchend', function () {
        clearInterval(clickInterval);
        return false;
    });
}


RetornaPostsMediumHtml = function (numPosts, callback) {
    $.get(mediumApiGatewayUrl).done(function (res) {
        var htmlCode = '';
        for (var i = 0; i < numPosts; i++) {
            htmlCode += '<h4 class="posttitle"><a href="https://medium.com/elementarybr/' + res.payload.posts[i].uniqueSlug + '" title="' + res.payload.posts[i].title + '" target="_blank">' + res.payload.posts[i].title + '</a></h4>';
            htmlCode += '<p class="postexcerpt">' + res.payload.posts[i].virtuals.subtitle + '</p>';

            if (i < numPosts - 1) {
                htmlCode += '<hr />';
            }
        }
        callback(htmlCode);
    });
};

PreencheHtmlComPosts = function (numPosts) {
    RetornaPostsMediumHtml(numPosts, function (html) {
        $("#post-area").html(html);
    });
};
