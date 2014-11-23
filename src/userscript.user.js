// ==UserScript==
// @name        Tumblr. extend shortcut key
// @namespace   http://www.sharkpp.net/
// @version     0.1
// @description Tumblr. extend shortcut key
// @author      sharkpp
// @copyright   2014, sharkpp
// @license     MIT License
// @include     https://www.tumblr.com/dashboard*
// @include     https://www.tumblr.com/reblog/*
// @include     https://www.tumblr.com/blog/*
// @include     https://www.tumblr.com/tagged/*
// @include     https://www.tumblr.com/search/*
// ==/UserScript==
(function ()
{
    var blogs = [];
    var actionPublishNow, actionQueue, actionDraft, postButton;
    var onshortcutkey = function (e) {
            if (e.altKey) {
                if (0x31 <= e.keyCode && e.keyCode <= 0x39) { // Alt + '1'
                    var n = (e.keyCode - 0x30) - 1;
                    if (blogs[n])
                        blogs[n].click();
                    return false;
                } else if (0x52 == e.keyCode) { // Alt + 'r'
                    actionPublishNow.click();
                    postButton.click();
                    return false;
                } else if (0x45 == e.keyCode) { // Alt + 'e'
                    actionQueue.click();
                    postButton.click();
                    return false;
                } else if (0x44 == e.keyCode) { // Alt + 'd
                    actionDraft.click();
                    postButton.click();
                    return false;
                }
                return true;
            }
        };
    var onkeydown = function (e) {
            e = e || window.event; // for IE
            if (e.altKey) {
                if (0xE5 == e.keyCode) {
                    return false;
                } else {
                    return onshortcutkey(e);
                }
            }
        };
    var onkeyup = function (e) {
            e = e || window.event; // for IE
            if (e.altKey) {
                return onshortcutkey(e);
            }
        };
    var addShortcutKeyElements = function (elm, keys) {
            for (var i = 0, s; s = keys[i]; i++) {
                var span = document.createElement('span');
                    span.style.cssText = ['border:1px solid #ccc',
                                          'border-radius:5px',
                                          'border-width:1px 1px 5px 5px',
                                          'padding:2px'].join(';');
                    span.innerHTML = s;
                elm.appendChild(span);
                if (i + 1 < keys.length)
                    elm.appendChild(document.createTextNode(' + '));
            }
        };
    var fn = function () {
            var itemBlogs = document.evaluate('//*[@id="tumblelog_choices"]/div/div/ul/li', document,
                                              null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (itemBlogs.snapshotLength &&
                2 == itemBlogs.snapshotItem(0).firstChild.childNodes.length)
            {
                // get elements
                var items;
                items = document.evaluate('//*[@id="post_options"]/div/div/ul/li[1]/div', document, null, 
                                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                actionPublishNow = items.snapshotLength ? items.snapshotItem(0) : actionPublishNow;
                items = document.evaluate('//*[@id="post_options"]/div/div/ul/li[2]/div', document, null, 
                                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                actionQueue = items.snapshotLength ? items.snapshotItem(0) : actionQueue;
                items = document.evaluate('//*[@id="post_options"]/div/div/ul/li[4]/div', document, null, 
                                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                actionDraft = items.snapshotLength ? items.snapshotItem(0) : actionQueue;
                items = document.evaluate('//*[@id="create_post"]/button', document, null,
                                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
                postButton = items.snapshotLength ? items.snapshotItem(0) : postButton;
                // display shortcut key
                for (var i = 0, item; item = itemBlogs.snapshotItem(i); i++) {
                    var div = document.createElement('div');
                        div.style.cssText = ['margin-right:25px',
                                             'text-align:right',
                                             'height:100%',
                                             'line-height:25px'].join(';');
                        addShortcutKeyElements(div, ["alt", (i + 1).toString()]);
                    item.firstChild.appendChild(div);
                    // save blog list
                    blogs[i] = item.firstChild;
                }
                for (var i = 0, item, list = [actionPublishNow, actionQueue, actionDraft],
                         scList = ['R', 'E', 'D']; item = list[i]; i++) {
                    var div2 = document.createElement('div');
                        div2.style.cssText = ['text-align: right',
                                              'height: 100%',
                                              'line-height: 25px',
                                              'position: absolute',
                                              'top: 0px',
                                              'right: 10px'].join(';');
                        addShortcutKeyElements(div2, ["alt", scList[i]]);
                    var div = document.createElement('div');
                        div.style.cssText = ['width: 200px'].join(';');
                        div.appendChild(div2);
                    item.appendChild(div);
                }
                // register shortcut key event
                document.onkeydown = onkeydown;
                document.onkeyup = onkeyup;
                var fn2 = function () {
                        var tinymce = document.getElementById('post_two_ifr');
                        if (!tinymce)
                            setTimeout(fn2, 500);
                        else 
                            tinymce.contentWindow.document.onkeydown = onkeydown;
                            tinymce.contentWindow.document.onkeyup = onkeyup;
                    };
                setTimeout(fn2, 500);
            }
            setTimeout(fn, 1000);
        };
    setTimeout(fn, 1000);
})();
