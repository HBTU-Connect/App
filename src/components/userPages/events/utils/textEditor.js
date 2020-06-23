import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import isHotkey from 'is-hotkey'
import Prism from 'prismjs'
import './prism.css'
import { Editable, withReact, ReactEditor, useSlate, Slate, useFocused, useSelected, useEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Node, Point, Range ,Text } from 'slate'
import { withHistory } from 'slate-history'
import { IconButton } from '@material-ui/core'
import isUrl from 'is-url'
import { Code as CodeIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
    FormatUnderlined as FormatUnderlinedIcon,
    FormatListBulleted as FormatListBulletedIcon,
    FormatListNumbered as FormatListNumberedIcon,
    FormatQuote as FormatQuoteIcon, 
    PlayCircleOutline as PlayCircleOutlineIcon,
    FormatIndentIncrease as FormatIndentIncreaseIcon,
    ViewDay as ViewDayIcon,
    Image as ImageIcon,
    FormatAlignCenter as FormatAlignCenterIcon,
    ClosedCaption as ClosedCaptionIcon,
    ExpandMore as ExpandMoreIcon, 
    InsertLink as InsertLinkIcon,
} from '@material-ui/icons'


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '<>': 'code_block'
}

// eslint-disable-next-line
;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore
// var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(u){var c=/\blang(?:uage)?-([\w-]+)\b/i,n=0,C={manual:u.Prism&&u.Prism.manual,disableWorkerMessageHandler:u.Prism&&u.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof _?new _(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,r){var a,n,l=C.util.type(e);switch(r=r||{},l){case"Object":if(n=C.util.objId(e),r[n])return r[n];for(var i in a={},r[n]=a,e)e.hasOwnProperty(i)&&(a[i]=t(e[i],r));return a;case"Array":return n=C.util.objId(e),r[n]?r[n]:(a=[],r[n]=a,e.forEach(function(e,n){a[n]=t(e,r)}),a);default:return e}},getLanguage:function(e){for(;e&&!c.test(e.className);)e=e.parentElement;return e?(e.className.match(c)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var r in t)if(t[r].src==n)return t[r]}return null}}},languages:{extend:function(e,n){var t=C.util.clone(C.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(t,e,n,r){var a=(r=r||C.languages)[t],l={};for(var i in a)if(a.hasOwnProperty(i)){if(i==e)for(var o in n)n.hasOwnProperty(o)&&(l[o]=n[o]);n.hasOwnProperty(i)||(l[i]=a[i])}var s=r[t];return r[t]=l,C.languages.DFS(C.languages,function(e,n){n===s&&e!=t&&(this[e]=l)}),l},DFS:function e(n,t,r,a){a=a||{};var l=C.util.objId;for(var i in n)if(n.hasOwnProperty(i)){t.call(n,i,n[i],r||i);var o=n[i],s=C.util.type(o);"Object"!==s||a[l(o)]?"Array"!==s||a[l(o)]||(a[l(o)]=!0,e(o,t,i,a)):(a[l(o)]=!0,e(o,t,null,a))}}},plugins:{},highlightAll:function(e,n){C.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};C.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),C.hooks.run("before-all-elements-highlight",r);for(var a,l=0;a=r.elements[l++];)C.highlightElement(a,!0===n,r.callback)},highlightElement:function(e,n,t){var r=C.util.getLanguage(e),a=C.languages[r];e.className=e.className.replace(c,"").replace(/\s+/g," ")+" language-"+r;var l=e.parentNode;l&&"pre"===l.nodeName.toLowerCase()&&(l.className=l.className.replace(c,"").replace(/\s+/g," ")+" language-"+r);var i={element:e,language:r,grammar:a,code:e.textContent};function o(e){i.highlightedCode=e,C.hooks.run("before-insert",i),i.element.innerHTML=i.highlightedCode,C.hooks.run("after-highlight",i),C.hooks.run("complete",i),t&&t.call(i.element)}if(C.hooks.run("before-sanity-check",i),!i.code)return C.hooks.run("complete",i),void(t&&t.call(i.element));if(C.hooks.run("before-highlight",i),i.grammar)if(n&&u.Worker){var s=new Worker(C.filename);s.onmessage=function(e){o(e.data)},s.postMessage(JSON.stringify({language:i.language,code:i.code,immediateClose:!0}))}else o(C.highlight(i.code,i.grammar,i.language));else o(C.util.encode(i.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};return C.hooks.run("before-tokenize",r),r.tokens=C.tokenize(r.code,r.grammar),C.hooks.run("after-tokenize",r),_.stringify(C.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new l;return M(a,a.head,e),function e(n,t,r,a,l,i,o){for(var s in r)if(r.hasOwnProperty(s)&&r[s]){var u=r[s];u=Array.isArray(u)?u:[u];for(var c=0;c<u.length;++c){if(o&&o==s+","+c)return;var g=u[c],f=g.inside,h=!!g.lookbehind,d=!!g.greedy,v=0,p=g.alias;if(d&&!g.pattern.global){var m=g.pattern.toString().match(/[imsuy]*$/)[0];g.pattern=RegExp(g.pattern.source,m+"g")}g=g.pattern||g;for(var y=a.next,k=l;y!==t.tail;k+=y.value.length,y=y.next){var b=y.value;if(t.length>n.length)return;if(!(b instanceof _)){var x=1;if(d&&y!=t.tail.prev){g.lastIndex=k;var w=g.exec(n);if(!w)break;var A=w.index+(h&&w[1]?w[1].length:0),P=w.index+w[0].length,S=k;for(S+=y.value.length;S<=A;)y=y.next,S+=y.value.length;if(S-=y.value.length,k=S,y.value instanceof _)continue;for(var O=y;O!==t.tail&&(S<P||"string"==typeof O.value&&!O.prev.value.greedy);O=O.next)x++,S+=O.value.length;x--,b=n.slice(k,S),w.index-=k}else{g.lastIndex=0;var w=g.exec(b)}if(w){h&&(v=w[1]?w[1].length:0);var A=w.index+v,w=w[0].slice(v),P=A+w.length,E=b.slice(0,A),N=b.slice(P),j=y.prev;E&&(j=M(t,j,E),k+=E.length),W(t,j,x);var L=new _(s,f?C.tokenize(w,f):w,p,w,d);if(y=M(t,j,L),N&&M(t,y,N),1<x&&e(n,t,r,y.prev,k,!0,s+","+c),i)break}else if(i)break}}}}}(e,a,n,a.head,0),function(e){var n=[],t=e.head.next;for(;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=C.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=C.hooks.all[e];if(t&&t.length)for(var r,a=0;r=t[a++];)r(n)}},Token:_};function _(e,n,t,r,a){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length,this.greedy=!!a}function l(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function M(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function W(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;(n.next=r).prev=n,e.length-=a}if(u.Prism=C,_.stringify=function n(e,t){if("string"==typeof e)return e;if(Array.isArray(e)){var r="";return e.forEach(function(e){r+=n(e,t)}),r}var a={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},l=e.alias;l&&(Array.isArray(l)?Array.prototype.push.apply(a.classes,l):a.classes.push(l)),C.hooks.run("wrap",a);var i="";for(var o in a.attributes)i+=" "+o+'="'+(a.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+a.tag+' class="'+a.classes.join(" ")+'"'+i+">"+a.content+"</"+a.tag+">"},!u.document)return u.addEventListener&&(C.disableWorkerMessageHandler||u.addEventListener("message",function(e){var n=JSON.parse(e.data),t=n.language,r=n.code,a=n.immediateClose;u.postMessage(C.highlight(r,C.languages[t],t)),a&&u.close()},!1)),C;var e=C.util.currentScript();function t(){C.manual||C.highlightAll()}if(e&&(C.filename=e.src,e.hasAttribute("data-manual")&&(C.manual=!0)),!C.manual){var r=document.readyState;"loading"===r||"interactive"===r&&e&&e.defer?document.addEventListener("DOMContentLoaded",t):window.requestAnimationFrame?window.requestAnimationFrame(t):window.setTimeout(t,16)}return C}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
// eslint-disable-next-line
Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};n["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var t={};t[a]={pattern:RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",t)}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;
// eslint-disable-next-line
!function(s){var e=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,lookbehind:!0,alias:"selector"}}},url:{pattern:RegExp("url\\((?:"+e.source+"|[^\n\r()]*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/}},selector:RegExp("[^{}\\s](?:[^{};\"']|"+e.source+")*?(?=\\s*\\{)"),string:{pattern:e,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var t=s.languages.markup;t&&(t.tag.addInlined("style","css"),s.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:t.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:s.languages.css}},alias:"language-css"}},t.tag))}(Prism);
// eslint-disable-next-line
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
// eslint-disable-next-line
Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,function:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript;
// eslint-disable-next-line
!function(e){var t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,a=/\b[A-Z](?:\w*[a-z]\w*)?\b/;e.languages.java=e.languages.extend("clike",{"class-name":[a,/\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],keyword:t,function:[e.languages.clike.function,{pattern:/(\:\:)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0}}),e.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"}}),e.languages.insertBefore("java","class-name",{annotation:{alias:"punctuation",pattern:/(^|[^.])@\w+/,lookbehind:!0},namespace:{pattern:RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g,function(){return t.source})),lookbehind:!0,inside:{punctuation:/\./}},generics:{pattern:/<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,inside:{"class-name":a,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}}})}(Prism);
// eslint-disable-next-line
Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},"string-interpolation":{pattern:/(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^\s*)@\w+(?:\.\w+)*/im,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:True|False|None)\b/,number:/(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python;
// eslint-disable-next-line
!function(i){var t=i.util.clone(i.languages.javascript);i.languages.jsx=i.languages.extend("markup",t),i.languages.jsx.tag.pattern=/<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i,i.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/i,i.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i,i.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,i.languages.insertBefore("inside","attr-name",{spread:{pattern:/\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,inside:{punctuation:/\.{3}|[{}.]/,"attr-value":/\w+/}}},i.languages.jsx.tag),i.languages.insertBefore("inside","attr-value",{script:{pattern:/=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,inside:{"script-punctuation":{pattern:/^=(?={)/,alias:"punctuation"},rest:i.languages.jsx},alias:"language-javascript"}},i.languages.jsx.tag);var o=function(t){return t?"string"==typeof t?t:"string"==typeof t.content?t.content:t.content.map(o).join(""):""},p=function(t){for(var n=[],e=0;e<t.length;e++){var a=t[e],s=!1;if("string"!=typeof a&&("tag"===a.type&&a.content[0]&&"tag"===a.content[0].type?"</"===a.content[0].content[0].content?0<n.length&&n[n.length-1].tagName===o(a.content[0].content[1])&&n.pop():"/>"===a.content[a.content.length-1].content||n.push({tagName:o(a.content[0].content[1]),openedBraces:0}):0<n.length&&"punctuation"===a.type&&"{"===a.content?n[n.length-1].openedBraces++:0<n.length&&0<n[n.length-1].openedBraces&&"punctuation"===a.type&&"}"===a.content?n[n.length-1].openedBraces--:s=!0),(s||"string"==typeof a)&&0<n.length&&0===n[n.length-1].openedBraces){var g=o(a);e<t.length-1&&("string"==typeof t[e+1]||"plain-text"===t[e+1].type)&&(g+=o(t[e+1]),t.splice(e+1,1)),0<e&&("string"==typeof t[e-1]||"plain-text"===t[e-1].type)&&(g=o(t[e-1])+g,t.splice(e-1,1),e--),t[e]=new i.Token("plain-text",g,null,g)}a.content&&"string"!=typeof a.content&&p(a.content)}};i.hooks.add("after-tokenize",function(t){"jsx"!==t.language&&"tsx"!==t.language||p(t.tokens)})}(Prism);



const LIST_TYPES = ['numbered-list', 'bulleted-list', 'code_block']

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        console.log(mime)
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const withEmbeds = editor => {
  const { isVoid } = editor
  editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
  return editor
}

const withCodeBlockVoids = editor => {
  const { isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'code_block' ? false : isVoid(element)
  }


  const { deleteBackward } = editor

  editor.deleteBackward = (...args) => {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n =>  Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          block.type === 'code-line' &&
          Point.equals(selection.anchor, start) &&
          path[1] === 0
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'code-line') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'code_block',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}

const withEditableVoids = editor => {
  const { isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'editable-void' ? true : isVoid(element)
  }

  return editor
}

const withLinks = editor => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const withLayout = editor => {
    const { normalizeNode } = editor
    
  
    editor.normalizeNode = ([node, path]) => {
      if (path.length === 0) {
        if (editor.children.length < 1) {
          const title = { type: 'title', children: [{ text: 'Untitled' }] }
          Transforms.insertNodes(editor, title, { at: path.concat(0) })
        }
  
        if (editor.children.length < 2) {
          const paragraph = { type: 'paragraph', children: [{ text: ''}] }
          Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
        }
  
        for (const [child, childPath] of Node.children(editor, path)) {
          let type = childPath[0] === 0 ? 'title' : 'paragraph'
          if(child.type === 'paragraph' && childPath[0] === 2){
            Transforms.setNodes(editor, { placeholder: '' }, { at: childPath})
          }
          if(child.type === 'paragraph' && childPath[0] === 1){
            Transforms.setNodes(editor, { placeholder: 'Tell your story...' }, { at: childPath})
          }

          if ( child.type !== type) {
            if(child.type !== 'title' && childPath[0] === 0){
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type === 'title'){
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type !== 'paragraph' && child.type !== 'title'){
              type = child.type
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
            if(child.type === 'fig-caption' && childPath[0] === 1){
              type = 'paragraph'
              Transforms.setNodes(editor, { type }, { at: childPath })
            }
          }
        }
      }
  
      return normalizeNode([node, path])
    }
  
    return editor
}

const withShortcuts = editor => {
  const { deleteBackward, insertText } = editor

  editor.insertText = text => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(
          editor,
          { type },
          { match: n => Editor.isBlock(editor, n) }
        )

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          block.type !== 'paragraph' && block.type !== 'code-line' && 
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}


const TextEditor = () => {
  const [ value, setValue ] = useState(initialValue)
  const [ height, setHeight ] = useState(0)
  const [ position, setPosition ] = useState(0)
  const [ display, setDisplay ] = useState(false)
  const [ expand, setExpand ] = useState(false)
  const renderElement = useCallback(props => <Element {...props} setPosition={setPosition} setDisplay={setDisplay} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withShortcuts(withCodeBlockVoids(withLinks(withEditableVoids(withImages(withEmbeds(withLayout(withHistory(withReact(createEditor()))))))))), [])
  const header = useRef(null)
  const textEditor = useRef(null)

  useEffect(() => {
    header.current.style.transform = `translateY(${position}px)`
    if(!display){
      header.current.style.visibility = 'hidden'
    }
    else{
      header.current.style.visibility = 'visible'
    }
  }, [position, display])

  useEffect(() => {
    textEditor.current.scrollTo(0, height)
  }, [height])

  const onChange = (v) =>{
    setValue(v)
  }
  
  const decorate = useCallback(([node, path]) => {
    const ranges = []
    
    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = token => {
      if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }
    
    if(editor.selection && editor.children[editor.selection.anchor.path[0]].type === 'code_block'){

      const jsxTokens = Prism.tokenize(node.text, Prism.languages['javascript'])
      const pythonTokens =Prism.tokenize(node.text, Prism.languages['python'])
      const htmlTokens =Prism.tokenize(node.text, Prism.languages['html'])
      let start = 0

      for (const token of jsxTokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
          let type = token.type
          if(token.type === 'class-name') type = 'classname'
          ranges.push({
            [type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      }
      start = 0

      for (const token of pythonTokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
          let type = token.type
          if(token.type === 'class-name') type = 'classname'
          ranges.push({
            [type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      }
      start = 0

      for (const token of htmlTokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
          let type = token.type
          if(token.type === 'class-name') type = 'classname'
          ranges.push({
            [type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      }
    }
    else{
      const tokens = Prism.tokenize(node.text, Prism.languages['markdown'])
      let start = 0

      for (const token of tokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      }
    }
    
    return ranges
  }, [])

  const scroll = () => {
    const doc = document.getElementsByClassName('text-editor')[0]
    const docHeight = doc.scrollHeight
    setHeight(docHeight + 200)
  }
  return (
      <div className='body-container'>
        <Slate editor={editor} value={value} onChange={v => onChange(v)} >
          <div ref={textEditor} className='text-editor' onKeyDown={(e) => {if(e.keyCode === 13)scroll()}}>
            <div className='text-editor__header' ref={header}>
              <InsertButton expand={expand} setExpand={setExpand} title='Insert Image' size='medium' format='image' icon={<ImageIcon fontSize='large'/>}/>
              <InsertButton expand={expand} setExpand={setExpand} title='Insert Video' size='medium'  format='video' icon={<PlayCircleOutlineIcon fontSize='large'/>} />
              <CodeButton expand={expand} setExpand={setExpand} title='Insert Code Block' size='medium' format="code_block" icon={<CodeIcon fontSize='large'/>} />
              {!expand && <IconButton size='medium' onClick={() => setExpand(true)}><ExpandMoreIcon size='large' /></IconButton>}
              {expand && <>
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Ordered List' size='medium' format="numbered-list" icon={<FormatListNumberedIcon fontSize='large'/>} />
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Unordered List' size='medium' format="bulleted-list" icon={<FormatListBulletedIcon fontSize='large'/>} />
              <BlockButton expand={expand} setExpand={setExpand} title='Insert Quote' size='medium' format="block-quote" icon={<FormatQuoteIcon fontSize='large'/> } /> 
              </>} 
            </div>
            <HoveringToolbar />
            <Editable
              renderElement={renderElement}
              decorate={decorate}
              className='text-editor__editor'
              renderLeaf={renderLeaf}
              placeholder="Tell you story..."
              spellCheck
              autoFocus
              tabIndex={0}
              onKeyDown={event => {
                for (const hotkey in HOTKEYS) {
                    if (isHotkey(hotkey, event)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                    }
                }

                if(event.keyCode === 9){
                  event.preventDefault()
                  Transforms.insertText(editor, '    ')
                }

                if(event.ctrlKey && event.keyCode === 13 ){
                  console.log('in action')
                  insertParagraph(editor)
                  Transforms.unwrapNodes(editor, {
                    match: n => n.type === 'code_block',
                    split: true,
                  })
                }
              }}         
            />
          </div>
        </Slate>
    </div>
  )
}

const toggleCode = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isCodeBlock = format === 'code_block' ? true : false

  Transforms.unwrapNodes(editor, {
    match: n => n.type === 'code_block' ? true: false,
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isCodeBlock ? 'code-line'  : format,
  })

  if (!isActive && isCodeBlock) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)
  // const isCodeBlock = format === 'code_block' ? true : false
  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })
  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item'  : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })
  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props) => {
  const selected = useSelected()
  const focused = useFocused()
  const editor = useEditor()
  const { attributes, children, element, setPosition, setDisplay, } = props
  const input = useRef(null)

  useEffect(() => {
    if(selected && focused){
      if(attributes.ref.current.offsetTop < 250)
        setPosition(153)
      else
        setPosition(attributes.ref.current.offsetTop-50)
      if(element.type === 'video' || element.type === 'image' || element.type === 'code_block' || element.type === 'editable-void' || element.type === 'title'){
        setDisplay(false)
      }else{
        setDisplay(true)
      }
      if(element.type === 'editable-void'){
        input.current.focus()
      }
      if(editor.children[editor.selection.anchor.path[0] -1] && editor.children[editor.selection.anchor.path[0] -1].type === 'fig-caption' && element.type === 'fig-caption' ){
        const type = 'paragraph'
        Transforms.setNodes(editor, { type }, { hanging: true })
      }

    }
  })
  // placeholder[editor.children.length-1]
  if(element.placeholder){
    var addRule = (function(style){
      var sheet = document.head.appendChild(style).sheet;
      return function(selector, css){
          var propText = Object.keys(css).map(function(p){
              return p+":"+css[p]
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      }
    })(document.createElement("style"));

      addRule(`p.p-with-placeholder:before`, {
          position: "absolute",
          top: "0",
          left: "0",
          cursor: 'text',
          color: 'rgb(197, 197, 197)',
          content: `'${element.placeholder}'`
      });
  }

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code_block':
      return <div className='code_block' {...attributes}>{children}</div>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'code-line':
      return <pre {...attributes}>{children}</pre>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'title':
      return <h1 className={ `h1-title ${!element.children[0].text ? 'title-with-placeholder': null} ${(focused && selected ? 'title-active': null)}`} {...attributes}>{children}</h1>
    case 'video':
      return <VideoElement {...props} />
    case 'image':
      return <ImageElement {...props} />
    case 'editable-void':
      return <EditableVoidElement {...props} input={input} />
    // case 'code_block':
    //   return <CodeNode props={props} />
    // case 'code-line':
    //   return <pre {...attributes}> {children} </pre>
    case 'fig-caption':
      return <figcaption {...attributes} >{children}</figcaption>
    case 'link':
      return (
        <a {...attributes} name={element.url} href={element.url}>
          {/* <span className='title'>{element.url}</span> */}
          {children}
        </a>
      )
    default:
      return(<p {...attributes} className={!element.children[0].text && element.placeholder ? `p-with-placeholder`: 'p'}>
        {children}
        </p>)  
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  const type = Object.keys(leaf)[1]
  if(type){
    children = <span className={`token ${type}`}>{children}</span>
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.classname) {
    children = <span className='token class-name'>{children}</span>
  }
    

  return <span {...attributes}>{children}</span>
}

const CodeButton = ({ format, icon, size, setExpand, title }) => {
  const editor = useSlate()
  const active=isBlockActive(editor, format)
  return (
    <IconButton
      size={size} 
      style={{ marginLeft: '.2rem'}}
      className={active? 'active' : null}
      title={title? title : null}
      onMouseDown={event => {
        event.preventDefault()
        toggleCode(editor, format)
        if(setExpand)setExpand(false)
      }}
    >
      {icon}
    </IconButton>
  )
}

const BlockButton = ({ format, icon, size, setExpand, title }) => {
  const editor = useSlate()
  // const { normalizeNode } = editor
  const active=isBlockActive(editor, format)
  return (
    <IconButton
      size={size} 
      style={{ marginLeft: '.2rem'}}
      className={active? 'active' : null}
      title={title? title : null}
      onMouseDown={event => {
        event.preventDefault()
        console.log('performing action')
        toggleBlock(editor, format)
        if(setExpand)setExpand(false)
      }}
    >
      {icon}
    </IconButton>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  const active=isMarkActive(editor, format)
  return (
    <IconButton
      size='small'
      className={active? 'active' : null}
      style={{ marginLeft: '.2rem'}}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
    </IconButton>
  )
}

const InsertButton = ({format, icon, setExpand, title}) => {
  const editor = useEditor()
  return (
    <IconButton
      title={title? title : null}
      onMouseDown={event => {
        event.preventDefault()
        insertEditableVoid(editor, format)
        setExpand(false)
      }}
    >
      {icon}
    </IconButton>
  )
}

const HoveringToolbar = () => {
  const [ addLink, setAddLink ] = useState(false)
  const [ value, setValue ] =useState('')
  const [ savedSel, setSavedSel ] = useState(null)

  const ref = useRef()
  const inputel = useRef(null)
  const button = useRef(null)
  const editor = useSlate()
  let { selection } = editor

  const saveSelection = () => {
    if(window.getSelection){
      var sel = window.getSelection(), ranges = [];
        if (sel.rangeCount) {
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
        }
        return ranges;
    }
    else if(document.selection && document.selection.createRange){
      // eslint-disable-next-line
      var sel = document.selection;
        // eslint-disable-next-line
        return (sel.type != "None") ? sel.createRange() : null;
    }
  }

  const restoreSelection = (savedSelection) => {
    if(window.getSelection){
      var sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSelection.length; i < len; ++i) {
                sel.addRange(savedSelection[i]);
            }
            console.log('done')
    }
    else if(document.selection && document.selection.createRange){
      if (savedSelection) {
        savedSelection.select();
      }
    }
  }

  useEffect(() => {
    if(!addLink){
      var specialDiv = button.current

      specialDiv.onmousedown = function() {
        console.log('clicked')
        const temp = saveSelection()
        setSavedSel(temp)
        console.log('yes')
          // console.log(savedSel)
      }
    }

    const el = ref.current

    if (!el) {
      return
    }
    if(!addLink){
      if (
        !selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ''
      ) {
        el.removeAttribute('style')
        return
      }

      const domSelection = window.getSelection()
      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()
      el.style.opacity = 1
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
      el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`
    }
  })

  return (
    <Portal>
      <div
        ref={ref}
        className='text-editor__toolbar'
      >
         <>
        {!addLink &&<> 
        <div className='text-editor__toolbar-mark-button'>
          <MarkButton format="bold" icon={<FormatBoldIcon fontSize='large'/>} />
          <MarkButton format="italic" icon={<FormatItalicIcon fontSize='large'/>} />
          <MarkButton format="code" icon={<CodeIcon fontSize='large'/>} />
        </div>
        <div className='text-editor__toolbar-mark-button'>
          <BlockButton size='small' format="heading-one" icon={<span style={{ padding: '3px', fontSize: '1.8rem', fontWeight: '600'}}>T</span>} />
          <BlockButton size='small' format="heading-two" icon={<span style={{ padding: '3px', fontSize: '1.4rem'}}>T</span>} />
        </div>
        <div className='text-editor__toolbar-block-button'>
          <IconButton ref={button} size='small' onClick={() => setAddLink(true)} ><InsertLinkIcon fontSize='large' /> </IconButton>
        </div>
        </>}
        {addLink && <input
          ref={inputel}
          type='text'
          placeholder='Paste or type a link...'
          autoFocus
          spellCheck='false'
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={(e) => {e.stopPropagation(); console.log('input clicked') }}
          onClick={(e) => e.stopPropagation()}
          onKeyUp={(e) => {
            if(e.keyCode === 13){
              e.preventDefault()
              // ReactEditor.focus(peditor)
              console.log(savedSel)
              restoreSelection(savedSel)
              if(value){
                setTimeout(() => {
                  insertLink(editor, value)
                },100)
              }
              setAddLink(false)
              setValue('')
              // setSelectedText(null)
              
              
            }
          }}
        />}
        </>
        
      </div>
    </Portal>
  )
}

const EmbedMenu = ({className, setClassName, caption, setCaption}) => {
  const ref = useRef()
  return(
      <div id='embed-menu' className='embed-menu' ref={ref} >
        <IconButton size='medium' onClick={()=> setClassName('left-aligned')}>
          <FormatIndentIncreaseIcon fontSize='large'  style={className === 'left-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <IconButton size='medium' onClick={()=> setClassName('center-aligned')}>
          <ViewDayIcon fontSize='large'   style={className === 'center-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <IconButton size='medium' onClick={()=> setClassName('small-center-aligned')}>
          <FormatAlignCenterIcon fontSize='large'   style={className === 'small-center-aligned' ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>
        <div></div>
        <IconButton size='medium' onClick={()=> setCaption(!caption)}>
          <ClosedCaptionIcon fontSize='large'   style={caption ? { color: 'green'} :{ color: 'white'}}/>
        </IconButton>

      </div>
  )
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}
const insertVideo = (editor, url) => {
  const text = { text: '' }
  const video = { type: 'video', url, children: [text] }
  Transforms.insertNodes(editor, video)
}
// eslint-disable-next-line
const insertUrl = (editor, url) => {
  const text = { text: '' }
  const video = { type: 'url', url, children: [text] }
  Transforms.insertNodes(editor, video)
}

const insertEditableVoid = (editor, format) => {
  const text = { text: '' }
  let voidNode
  if(format === 'image' || format === 'video'){
  voidNode = { type: 'editable-void', format, children: [text] }
  }
  else{
    voidNode = { type: 'code_block', format, children: [text] }
  }
  if(editor.children[editor.selection.anchor.path[0]].children[0].text === ''){
    Transforms.removeNodes(editor, { hanging: true })
  }
  Transforms.insertNodes(editor, voidNode)
}
const insertParagraph = editor => {
  const text = { text: ''}
  const voidNode = { type: 'paragraph',placeholder: 'Add Text' , children: [text] }
  Transforms.insertNodes(editor, voidNode)
  ReactEditor.focus(editor)
}

const insertCaption = editor => {
  const text = { text: 'Add Caption for the embed'}
  const voidNode = { type: 'fig-caption', children: [text] }
  Transforms.insertNodes(editor, voidNode)
}

const insertParagraphText = (editor, data) => {
  const text = { text: data}
  const voidNode = { type: 'paragraph', children: [text] }
  Transforms.insertNodes(editor, voidNode)
  ReactEditor.focus(editor)
}
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
  return !!link
}

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const EditableVoidElement = ({ attributes, children, element, input}) => {
  const [inputValue, setInputValue] = useState('')
  const editor = useEditor()
  const format = element.format

  useEffect(()=> {
    ReactEditor.focus(editor)
    // eslint-disable-next-line
  },[])

  return (
    // Need contentEditable=false or Firefox has issues with certain input types.
    <div {...attributes} contentEditable={false}>
        <input
          ref={input}
          className={`text-editor__editor-link-input`}
          type="text"
          spellCheck='false'
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
          }}
          placeholder={format === 'video' ? 'Paste a YouTube, Vimeo video link here, and press Enter' : 'Paste a Image link from Unsplash here, and press Enter'}
          onKeyDown={(e) => {
            if(e.keyCode === 13){
              if(format === 'video'){
                Transforms.removeNodes(editor, { hanging: true})
                if(isVideoUrl(inputValue)){
                  insertVideo(editor, inputValue)
                  insertParagraph(editor)
                }else{
                  insertParagraphText(editor, inputValue)
                }
              }
              if(format === 'image'){
                Transforms.removeNodes(editor, { hanging: true})
                if(isImageUrl(inputValue)){
                  insertImage(editor, inputValue)
                  insertParagraph(editor)
                }else{
                  insertParagraphText(editor, inputValue)
                }
              }
            }
            if(e.keyCode === 8 && inputValue === ''){
              console.log('pressed')
              Transforms.removeNodes(editor, { hanging: true})
              ReactEditor.focus(editor)
            }
          }}
        />
        {children}
      </div>
  )
}

// const RenderElement = ({ attributes, children, element }) => {
//   if(element.type === 'paragraph'){
//     return <p {...attributes} >{children}</p>
//   }
//   return(
//     <pre {...attributes}>
//       {children}
//     </pre>
//   )
// }

// const RenderLeaf = ({ attributes, children, leaf }) => {
//   const type = Object.keys(leaf)[1]
//   // if (leaf.keyword) {
//   //   children = <span className='token keyword'>{children}</span>
//   // }
//   // if (leaf.punctuation) {
//   //   children = <span className='token punctuation'>{children}</span>
//   // }
  
//   // if (leaf.operator) {
//   //   children = <span className='token operator'>{children}</span>
//   // }
//   // if (leaf.string) {
//   //   children = <span className='token string'>{children}</span>
//   // }
//   // if (leaf.constant) {
//   //   children = <span className='token constant'>{children}</span>
//   // }
//   // if (leaf.tab) {
//   //   children = <span><span>{'\t'}</span>{children}</span>
//   // }

//   if(type){
//     children = <span className={`token ${type}`}>{children}</span>
//   }
//   if (leaf.classname) {
//     children = <span className='token class-name'>{children}</span>
//   }


//   return <span {...attributes}>{children}</span>
// }
// const codeInitialValue = [
//   {
//     type: 'pre',
//     children:[{text: ''}]
//   }
// ]

// const CodeNode = ({ attributes, children, element}) =>{
//   const [value, setValue] = useState(codeInitialValue)
//   const editor = useMemo(() => withHistory(withReact(createEditor())), [])
//   const renderElement = useCallback(props => <RenderElement {...props} />, [])
//   const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])
//   const parentEditor = useEditor()
//   const refEditor = useRef(null)

//   useEffect(() => {
//     if(refEditor.current)
//       refEditor.current.focus()
//     // eslint-disable-next-line
//   }, [refEditor])

//   const decorate = useCallback(([node, path]) => {
//     const ranges = []

//     if (!Text.isText(node)) {
//       return ranges
//     }

//     const getLength = token => {
//       if (typeof token === 'string') {
//         return token.length
//       } else if (typeof token.content === 'string') {
//         return token.content.length
//       } else {
//         return token.content.reduce((l, t) => l + getLength(t), 0)
//       }
//     }
//     const grammer = Prism.languages['jsx']

//     const tokens = Prism.tokenize(node.text, grammer)
//     let start = 0

//     for (const token of tokens) {
//       const length = getLength(token)
//       const end = start + length

//       if (typeof token !== 'string') {
//         console.log(token.type)
//         let type = token.type
//         if(token.type === 'class-name') type = 'classname'
//         ranges.push({
//           [type]: true,
//           anchor: { path, offset: start },
//           focus: { path, offset: end },
//         })
//       }

//       start = end
//     }

//     return ranges
//   }, [])
  
  
//   return(
//   <div className='code_block' {...attributes} contentEditable={false}>
    
//     <Slate editor={editor} value={value} onChange={value => setValue(value)}>
//       <Editable
//         ref ={refEditor}
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         decorate={decorate}
//         placeholder="#Type your code (Press CTRL+Enter to jump out of the code block)"
//         spellCheck={false}
//         autoFocus
//         autoCorrect='off'
//         autoComplete='off'
//         autoCapitalize='off'
//         onKeyDown={event => {
//           for (const hotkey in HOTKEYS) {
//             if (isHotkey(hotkey, event)) {
//               event.preventDefault()
//               const mark = HOTKEYS[hotkey]
//               toggleMark(editor, mark)
//             }
//           }

//           if(event.keyCode === 9){
//             event.preventDefault()
//             Transforms.insertText(editor, '     ')
//           }

//           if(event.keyCode === 8 && editor.children.length === 1 && editor.children[0].children[0].text === ''){
//             console.log(parentEditor)
//             Transforms.removeNodes(parentEditor, { hanging: true})
//             // Transforms.setNodes(editor, { type: 'paragraph' })
//             // Transforms.setNodes(parentEditor, { type: 'paragraph' }, {
//             //   match: n => n.type === 'code_block',
//             //   split: true,
//             // })
//           }
//         }}
//         onKeyUp={(event) =>{
//           if(event.ctrlKey && event.keyCode === 13 ){
//             console.log('in action')
//             insertParagraph(parentEditor)
//           }
//         }}
//       />
//     </Slate>
//     {children}
//   </div>
//   )
// }

const ImageElement = ({ attributes, children, element }) => {
  const [ className, setClassName ] = useState('center-aligned')
  const [ caption, setCaption ] = useState(false)
  const selected = useSelected()
  const focused = useFocused()
  const editor = useEditor()
  const url = element.url
  const temp = url.split('/')
  const name = temp[temp.length -1]
  const newUrl = `https://source.unsplash.com/${name}`

  useEffect(() => {
    if(caption && editor.children[editor.selection.anchor.path[0] +1].type !== 'fig-caption'){
      insertCaption(editor)
    }else{
      if(editor.children[editor.selection.anchor.path[0] +1] && editor.children[editor.selection.anchor.path[0] +1].type === 'fig-caption'){
        Transforms.removeNodes(editor, { at: [editor.selection.anchor.path[0]+1]})
      }
    }
    // eslint-disable-next-line
  }, [caption])

  return (
    <figure
      className={`image-container ${className}`} 
      contentEditable={false} 
      {...attributes} 
      style={{zIndex: '10000', display: 'flex', justifyContent: 'center'}}
      
    >
      {focused && selected && <EmbedMenu className={className} setClassName={setClassName} caption={caption} setCaption={setCaption} />}
      <div className={focused && selected ? `image-wrapper wrapper-active`: `image-wrapper`} style={{
            padding: '0 0 0 0',
            position: 'relative',
          }}
          
        >
        <img
          alt='block'
          src={newUrl}
        />
      </div>
        {children}
    </figure>
  )
}

const VideoElement = ({ attributes, children, element }) => {
  const [ className, setClassName ] = useState('center-aligned')
  const [ caption, setCaption ] = useState(false)

  const focused = useFocused()
  const selected = useSelected()
  const editor = useEditor()

  const { url } = element
  let tempUrl = url.split('watch?v=')
  let newurl = ''
  if(url.includes('youtube')){
    newurl = `${tempUrl[0]}embed/${tempUrl[1]}`
  }
  else{
    newurl = url
  }

  useEffect(() => {
    if(caption && editor.children[editor.selection.anchor.path[0] +1].type !== 'fig-caption'){
      insertCaption(editor)
    }else{
      if(editor.children[editor.selection.anchor.path[0] +1] && editor.children[editor.selection.anchor.path[0] +1].type === 'fig-caption'){
        Transforms.removeNodes(editor, { at: [editor.selection.anchor.path[0]+1]})
      }
    }
    // eslint-disable-next-line
  }, [caption])
  
  return (
    <div className={`video-container ${className}`} {...attributes} contentEditable={false} style={{zIndex: '10000', display: 'flex', justifyContent: 'center'}}>
      {focused && selected && <EmbedMenu className={className} setClassName={setClassName} caption={caption} setCaption={setCaption} />}
        <div 
        className={focused && selected ? `iframe-container wrapper-active`: `iframe-container `}
          style={{
            padding: '56% 0 0 0',
            position: 'relative',
          }}
        >
          <div className={`iframe-wrapper`}></div>
          <iframe
            title='title'
            src={`${newurl}`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
            allowFullScreen
          />
        </div>
      {children}
    </div>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).host
  return (ext === 'unsplash.com')
}

const isVideoUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).host
  return (ext === 'youtube.com'|| ext === 'http://www.youtube.com' || ext === 'www.youtube.com' || ext === 'vimeo.com')
}


const initialValue = [
    {
        type: 'title',
        children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      placeholder: 'Tell your story...',
      children: [
        { text: ''}
      ],  
    }
]

export default TextEditor