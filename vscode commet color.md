<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2020-09-15 18:12:35
 * @LastEditTime 2020-09-15 19:00:33
 * @Email Lengchars@gmail.com
-->
ctrl + ,

open setting (JSON)

trigger suggest

"editor.tokenColorCustomizations" : {
    "[Community Material Theme High Contrast]": {
        "textMateRules": [
            {
                "name": "Comment",
                "scope": [
                    "comment",
                    "comment punctuation",
                    "comment keyword",
                    "comment storage.type",
                    "comment entity.name"
                ],
                "settings": {
                    "fontStyle": "italic",
                    "foreground": "#6a7980"
                }
              },
              {
                "name": "Comment",
                "scope": [
                    "comment variable",
                ],
                "settings": {
                    "fontStyle": "italic",
                    "foreground": "#10800e"
                }
              }
        ]
    }
}


glassit
https://marketplace.visualstudio.com/items?itemName=s-nlf-fh.glassit
https://juejin.im/post/6844903841603797006#heading-3
https://marketplace.visualstudio.com/items?itemName=eyhn.vscode-vibrancy