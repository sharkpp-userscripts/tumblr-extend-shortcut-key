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
(function () {
    var evaluate = function(xpath, resultOnce) {
        resultOnce = undefined == typeof resultOnce ? false : resultOnce;
        var items = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (resultOnce)
            return items.snapshotLength ? items.snapshotItem(0) : null;
        var results = [];
        for (var i = 0; i < items.snapshotLength; i++)
            results[results.length] = items.snapshotItem(i);
        return results;
    };
    var clickByXPath = function(xpath) {
        var elm = evaluate(xpath, true);
        if (elm)
            elm.click();
    };

    var getBlogSelectMenuItem = function() {
        return evaluate('//*[@data-js-tumblelogchoice]', false);
    };
    var getActionSelectMenuItem = function() {
        return evaluate('//*[@data-js-publish or @data-js-queue or @data-js-draft or @data-js-private]', false);
    };
    var selectBlog = function(n) {
        var menuVisibled = 0 < getBlogSelectMenuItem().length;
        if (!menuVisibled)
            clickByXPath('//*[@data-js-clickabletumbleloglabel]');
        clickByXPath('//*[@data-js-tumblelogchoice][' + (n + 1) + ']');
        if (menuVisibled)
            clickByXPath('//*[@data-js-clickabletumbleloglabel]');
    };
    var actionSelect = function(act){
        var menuVisibled = 0 < getActionSelectMenuItem().length;
        if (!menuVisibled)
            clickByXPath('//*[@data-js-clickablesavedropdown]');
        clickByXPath('//*[@data-js-' + act + ']');
        clickByXPath('//*[@data-js-clickablesave]');
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
        // append shortcut key for blog select menu when create menu
        var items1 = getBlogSelectMenuItem();
        if (items1.length &&
            !items1[0].getAttribute('_6588-flag1'))
        {
            items1[0].setAttribute('_6588-flag1', '1');
            // append shortcut key
            for (var i = 0, item; item = items1[i]; i++)
            {
                var div = document.createElement('div');
                    div.style.cssText = ['margin-right:5px',
                                         'text-align:right',
                                         'height:100%',
                                         'line-height:25px',
                                         'position:absolute',
                                         'right:0',
                                         'top:5px'].join(';');
                addShortcutKeyElements(div, ["alt", (i + 1).toString()]);
                item.lastChild.appendChild(div);
            }
        }
        // append shortcut key for reblog action menu when create menu
        var items2 = getActionSelectMenuItem();
        if (items2.length &&
            !items2[0].getAttribute('_6588-flag2'))
        {
            items2[0].setAttribute('_6588-flag2', '1');
            // append shortcut key
            for (var i = 0, item; item = items2[i]; i++)
            {
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
                item.appendChild(div2);
                item.parentNode.parentNode.style.cssText = 'width:230px';
            }
        }
    });
    mo.observe(document.body, {childList: true, subtree:true});
    document.onkeydown = onkeydown;
})();
