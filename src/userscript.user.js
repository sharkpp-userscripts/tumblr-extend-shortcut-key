// ==UserScript==
// @name        Tumblr. extend shortcut key
// @namespace   http://www.sharkpp.net/
// @version     0.2
// @description Tumblr. extend shortcut key for blog select and reblog button
// @author      sharkpp
// @copyright   2014-2015, sharkpp
// @license     MIT License
// @include     https://www.tumblr.com/dashboard*
// @include     https://www.tumblr.com/reblog/*
// @include     https://www.tumblr.com/blog/*
// @include     https://www.tumblr.com/tagged/*
// @include     https://www.tumblr.com/search/*
// ==/UserScript==
(function ()
{
    var getPostForm = function() {
        var postForm = jQuery('[data-subview="postForm"]');
        return 0 < postForm.length && 0 < postForm[0].childNodes.length
               ? postForm[0] : null;
    };
    var isBlogSelectMenuVisibled = function() {
        return 0 < jQuery('[data-js-tumblelogchoice]').length;
    };
    var isActionSelectMenuVisibled = function() {
        return 0 < jQuery('[data-js-publish]').length;
    };
    var popupPostForm = function() {
        var k = Tumblr.KeyCommands, i;
        k.update_post_positions();
        k.current_position = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) ||
                              document.body.scrollTop) + k.scroll_offset;
        for (i in k.post_positions) {
            if (k.check_offset(k.post_positions[i])) {
                jQuery('[data-pageable="' + i + '"] [data-subview="reblog"]').click();
            }
        }
    };
    var selectBlog = function(n) {
        var menuVisibled = isBlogSelectMenuVisibled();
        if (!menuVisibled)
            jQuery('[data-js-clickabletumbleloglabel]')[0].click();
        jQuery('[data-js-tumblelogchoice]:eq(' + n + ')').click();
        if (menuVisibled)
            jQuery('[data-js-clickabletumbleloglabel]')[0].click();
    };
    var actionSelect = function(act){
        var menuVisibled = isActionSelectMenuVisibled();
        if (!menuVisibled)
            jQuery('[data-js-clickablesavedropdown]')[0].click();
        jQuery('[data-js-' + act + ']').click();
        jQuery('[data-js-clickablesave]')[0].click();
    };
    var onshortcutkey = function (e) {
            if (e.altKey) {
                if (49 <= e.keyCode && e.keyCode <= 57) { // Alt + '1' ... Alt + '9'
                    var n = (e.keyCode - 0x30) - 1;
                    selectBlog(n);
                    return false;
                } else if (82 == e.keyCode) { // Alt + 'r'
                    actionSelect('publish');
                    return false;
                } else if (69 == e.keyCode) { // Alt + 'e'
                    actionSelect('queue');
                    return false;
                } else if (68 == e.keyCode) { // Alt + 'd'
                    actionSelect('draft');
                    return false;
                } else if (80 == e.keyCode) { // Alt + 'p'
                    actionSelect('private');
                    return false;
                }
                return true;
//          } else if (82 == e.keyCode) { // 'r'
//                popupPostForm();
//                console.log('************');
//                return false;
            }
        };
    var onkeydown = function (e) {//console.log(e);
            e = e || window.event; // for IE
            if (e.altKey) {
                if (0xE5 == e.keyCode) {
                    return false;
                } else {
                    return onshortcutkey(e);
                }
            } else {
                return onshortcutkey(e);
            }
        };
    var addShortcutKeyElements = function (elm, keys) {
            for (var i = 0, s; s = keys[i]; i++) {
                var span = document.createElement('span');
                    span.style.cssText = ['background-color:#fff',
                                          'border:1px solid #ccc',
                                          'border-radius:5px',
                                          'border-width:1px 1px 5px 5px',
                                          'padding:1px'].join(';');
                    span.innerHTML = s;
                elm.appendChild(span);
                if (i + 1 < keys.length)
                    elm.appendChild(document.createTextNode(' + '));
            }
        };
    var mo = new MutationObserver(function(mr){
        if (isBlogSelectMenuVisibled() &&
            !jQuery('[data-js-tumblelogchoice]').attr('_6588-attr2'))
        {
            jQuery('[data-js-tumblelogchoice]')
                .attr('_6588-attr2', '1')
                .each(function(i){
                    var div = document.createElement('div');
                        div.style.cssText = ['margin-right:5px',
                                             'text-align:right',
                                             'height:100%',
                                             'line-height:25px',
                                             'position:absolute',
                                             'right:0',
                                             'top:5px'].join(';');
                    addShortcutKeyElements(div, ["alt", (i + 1).toString()]);
                    jQuery(this).children('div').append(div);
                });
        }
        if (isActionSelectMenuVisibled() &&
            !jQuery('[data-js-publish]').attr('_6588-attr3'))
        {
            jQuery('[data-js-publish],[data-js-queue],[data-js-draft],[data-js-private]')
                .attr('_6588-attr3', '1')
                .each(function(i){
                    var div2 = document.createElement('div');
                        div2.style.cssText = ['text-align: right',
                                              'height: 100%',
                                              'line-height: 25px',
                                              'position: absolute',
                                              'top: 0px',
                                              'right: 10px'].join(';');
                    addShortcutKeyElements(div2, ["alt", ['R', 'E', 'D', 'P'][i]]);
                    var div = document.createElement('div');
                        div.style.cssText = ['width: 200px'].join(';');
                        div.appendChild(div2);
                    jQuery(this).append(div2)
                        .parent().parent().css('width', '230px');
                });
        }
    });
    mo.observe(document.body, {childList: true, subtree:true});
    document.onkeydown = onkeydown;
})();
