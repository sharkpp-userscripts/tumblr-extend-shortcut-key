# Tumblr. extend shortcut key

このスクリプトは [Tumblr.](https://www.tumblr.com/)™ のダッシュボードで有効なショートカットキーを拡張します。

主な機能は、ブログ選択と投稿指示の方法を変更することが出来ます。

## インストール

このスクリプトは [Greasy Fork](https://greasyfork.org/ja/scripts/6588-tumblr-extend-shortcut-key) のページからインストールすることが出来ます。

インストールおよび実行するには下記のような拡張が必要になります。

* [Tampermonkey - Chrome ウェブストア](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)
* [Greasemonkey :: Add-ons for Firefox](https://addons.mozilla.org/ja/firefox/addon/greasemonkey/) ※動作未確認

## アンインストール

それぞれの拡張のヘルプを参照してください。

## ショートカットキーの一覧

### 投稿フォームで有効なショートカットキー

<table>
  <tr>
    <th>ショートカットキー</th>
    <th>機能</th>
  </tr>
  <tr>
    <td><tt>alt + [数字キー]</tt></td>
    <td>ブログを選択</td>
  </tr>
  <tr>
    <td><tt>alt + R</tt></td>
    <td>今すぐ投稿(リブログ)</td>
  </tr>
  <tr>
    <td><tt>alt + E</tt></td>
    <td>予約投稿に追加</td>
  </tr>
  <tr>
    <td><tt>alt + D</tt></td>
    <td>下書きに追加</td>
  </tr>
  <tr>
    <td><tt>alt + P</tt></td>
    <td>非公開で投稿</td>
  </tr>
</table>

## 機能の詳細

### ブログの選択

ブログが複数有る場合は `alt + [数字キー]` で、`[数字キー]` で指定したブログに切り替えることができます。

数字キーとブログの対応付けについては、投稿フォームのブログ一覧に表示されているので、一覧を表示することで確認することが出来ます。

![ブログの選択](https://raw.githubusercontent.com/sharkpp-userscripts/tumblr-extend-shortcut-key/master/img/blog-select.png)

## 投稿指示

投稿指示は、「今すぐ投稿」と「予約投稿に追加」「下書きに追加」と「非公開で投稿」に、それぞれショートカットキーが割り当てられています。

ブログの選択と同じように、一覧を表示することでショートカットキーの確認が出来ます。

![リブログボタン](https://raw.githubusercontent.com/sharkpp-userscripts/tumblr-extend-shortcut-key/master/img/reblog-button.png)

## ライセンス

The MIT License (MIT)

Copyright (c) 2014-2015 sharkpp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
