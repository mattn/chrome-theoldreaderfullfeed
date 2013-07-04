if(window != top) return;

var remove_risks=function(htmldoc){var attr="allowscriptaccess";$X("descendant-or-self::embed[@allowscriptaccess]",htmldoc).forEach(function(elm){elm.setAttribute(attr,"never")});$X("descendant-or-self::param",htmldoc).forEach(function(elm){if(!elm.getAttribute("name")||elm.getAttribute("name").toLowerCase().indexOf(attr)<0){return}elm.setAttribute("value","never");});};function filter(a,f){for(var i=a.length;i-->0;f(a[i])||a.splice(i,1));}function path_resolver(base){var top=base.match(/^https?:\/\/[^\/]+/)[0],current=base.replace(/\/[^\/]+$/,'/');return function(url){if(url.match(/^https?:\/\//)){return url}else if(url.indexOf("/")===0){return top+url}else{var result=current;if(url.indexOf(".")===0){var count=15;while(url.indexOf(".")===0&&!(--count===0)){if(url.substring(0,3)==="../")result=result.replace(/\/[^\/]+\/$/,"/");url=url.replace(/^\.+\/?/,"")}}return result+url;}}}function parse(str, url){try{var htmldoc=document.implementation.createHTMLDocument('fullfeed');var df=$CF(str);nl=df.childNodes;htmldoc.body.appendChild(df);remove_risks(htmldoc);var resolver=path_resolver(url);rel2abs(resolver,htmldoc);postFilters.forEach(function(f){try{f(htmldoc,url)}catch(e){}});return htmldoc;}catch(e){console.info(e);throw 'Parse Error';}}var $CF=(function(){var range=document.createRange();range.selectNodeContents(document.body);return function(str){return range.createContextualFragment(str);}})();function rel2abs(resolver,htmldoc){$X("descendant-or-self::a[@href]",htmldoc).forEach(function(elm){elm.setAttribute("href",resolver(elm.getAttribute("href")));});$X("descendant-or-self::*[self::img[@src] or self::embed[@src]]",htmldoc).forEach(function(elm){elm.setAttribute("src",resolver(elm.getAttribute("src")));});$X("descendant-or-self::object[@data]",htmldoc).forEach(function(elm){elm.setAttribute("data",resolver(elm.getAttribute("data")));});}
// http://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/plugin/html-sanitizer.js
{var css={'properties':(function(){var s=['|left|center|right','|top|center|bottom','#(?:[\\da-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|rgb\\(\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\)','[+\\-]?\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset','[+\\-]?\\d+(?:\\.\\d+)?%','\\d+(?:\\.\\d+)?%','url\\(\"[^()\\\\\"\\r\\n]+\"\\)','repeat-x|repeat-y|(?:repeat|space|round|no-repeat)(?:\\s+(?:repeat|space|round|no-repeat)){0,2}'],c=[RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,2}\\s*$','i'),RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4}(?:\\s*\\/(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4})?\\s*$','i'),RegExp('^\\s*(?:\\s*none|(?:(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?)\\s*,)*(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?))\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|transparent|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[5]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:thin|medium|thick|0|'+s[3]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent|inherit)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit){0,2}|inherit)\\s*$','i'),/^\s*(?:none|inherit)\s*$/i,RegExp('^\\s*(?:'+s[8]+'|none|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|auto|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|none|inherit|auto)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit|auto)\\s*$','i'),/^\s*(?:0(?:\.\d+)?|\.\d+|1(?:\.0+)?|inherit)\s*$/i,RegExp('^\\s*(?:(?:'+s[2]+'|invert|inherit|'+s[5]+'|thin|medium|thick|0|'+s[3]+')(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+invert|\\s+inherit|\\s+(?:'+s[5]+'|inherit)|\\s+(?:thin|medium|thick|0|'+s[3]+'|inherit)){0,2}|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|invert|inherit)\\s*$','i'),/^\s*(?:visible|hidden|scroll|auto|no-display|no-content)\s*$/i,RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),/^\s*(?:auto|always|avoid|left|right|inherit)\s*$/i,RegExp('^\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+'|inherit)\\s*$','i'),/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|inherit)\s*$/i,/^\s*(?:clip|ellipsis)\s*$/i,RegExp('^\\s*(?:normal|0|'+s[3]+'|inherit)\\s*$','i')];return{'-moz-border-radius':c[1],'-moz-border-radius-bottomleft':c[0],'-moz-border-radius-bottomright':c[0],'-moz-border-radius-topleft':c[0],'-moz-border-radius-topright':c[0],'-moz-box-shadow':c[2],'-moz-opacity':c[12],'-moz-outline':c[13],'-moz-outline-color':c[14],'-moz-outline-style':c[4],'-moz-outline-width':c[5],'-o-text-overflow':c[20],'-webkit-border-bottom-left-radius':c[0],'-webkit-border-bottom-right-radius':c[0],'-webkit-border-radius':c[1],'-webkit-border-radius-bottom-left':c[0],'-webkit-border-radius-bottom-right':c[0],'-webkit-border-radius-top-left':c[0],'-webkit-border-radius-top-right':c[0],'-webkit-border-top-left-radius':c[0],'-webkit-border-top-right-radius':c[0],'-webkit-box-shadow':c[2],'azimuth':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind)(?:\s+(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind))?|leftwards|rightwards|inherit)\s*$/i,'background':RegExp('^\\s*(?:\\s*(?:'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,4}\\s*,)*\\s*(?:'+s[2]+'|transparent|inherit|'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit|\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,5}\\s*$','i'),'background-attachment':/^\s*(?:scroll|fixed|local)(?:\s*,\s*(?:scroll|fixed|local))*\s*$/i,'background-color':c[3],'background-image':RegExp('^\\s*(?:'+s[8]+'|none)(?:\\s*,\\s*(?:'+s[8]+'|none))*\\s*$','i'),'background-position':RegExp('^\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*,\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?))*\\s*$','i'),'background-repeat':RegExp('^\\s*(?:'+s[9]+')(?:\\s*,\\s*(?:'+s[9]+'))*\\s*$','i'),'border':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,2}|inherit)\\s*$','i'),'border-bottom':c[6],'border-bottom-color':c[3],'border-bottom-left-radius':c[0],'border-bottom-right-radius':c[0],'border-bottom-style':c[4],'border-bottom-width':c[5],'border-collapse':/^\s*(?:collapse|separate|inherit)\s*$/i,'border-color':RegExp('^\\s*(?:(?:'+s[2]+'|transparent)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,4}|inherit)\\s*$','i'),'border-left':c[6],'border-left-color':c[3],'border-left-style':c[4],'border-left-width':c[5],'border-radius':c[1],'border-right':c[6],'border-right-color':c[3],'border-right-style':c[4],'border-right-width':c[5],'border-spacing':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[3]+')){1,2}|\\s*inherit)\\s*$','i'),'border-style':RegExp('^\\s*(?:(?:'+s[5]+')(?:\\s+(?:'+s[5]+')){0,4}|inherit)\\s*$','i'),'border-top':c[6],'border-top-color':c[3],'border-top-left-radius':c[0],'border-top-right-radius':c[0],'border-top-style':c[4],'border-top-width':c[5],'border-width':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+')(?:\\s+(?:thin|medium|thick|0|'+s[3]+')){0,4}|inherit)\\s*$','i'),'bottom':c[9],'box-shadow':c[2],'caption-side':/^\s*(?:top|bottom|inherit)\s*$/i,'clear':/^\s*(?:none|left|right|both|inherit)\s*$/i,'clip':RegExp('^\\s*(?:rect\\(\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\)|auto|inherit)\\s*$','i'),'color':RegExp('^\\s*(?:'+s[2]+'|inherit)\\s*$','i'),'counter-increment':c[7],'counter-reset':c[7],'cue':RegExp('^\\s*(?:(?:'+s[8]+'|none|inherit)(?:\\s*'+s[8]+'|\\s+none|\\s+inherit)?|inherit)\\s*$','i'),'cue-after':c[8],'cue-before':c[8],'cursor':RegExp('^\\s*(?:(?:\\s*'+s[8]+'\\s*,)*\\s*(?:auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|progress|all-scroll|col-resize|hand|no-drop|not-allowed|row-resize|vertical-text)|\\s*inherit)\\s*$','i'),'direction':/^\s*(?:ltr|rtl|inherit)\s*$/i,'display':/^\s*(?:inline|block|list-item|run-in|inline-block|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|none|inherit|-moz-inline-box|-moz-inline-stack)\s*$/i,'elevation':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|below|level|above|higher|lower|inherit)\s*$/i,'empty-cells':/^\s*(?:show|hide|inherit)\s*$/i,'filter':RegExp('^\\s*(?:\\s*alpha\\(\\s*opacity\\s*=\\s*(?:0|'+s[6]+'|[+\\-]?\\d+(?:\\.\\d+)?)\\))+\\s*$','i'),'float':/^\s*(?:left|right|none|inherit)\s*$/i,'font':RegExp('^\\s*(?:(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)(?:\\s+(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)){0,2}\\s+(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)(?:\\s*\\/\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit))?(?:(?:\\s*\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|\\s+(?:serif|sans-serif|cursive|fantasy|monospace))(?:\\s*,\\s*(?:\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|serif|sans-serif|cursive|fantasy|monospace))*|\\s+inherit)|caption|icon|menu|message-box|small-caption|status-bar|inherit)\\s*$','i'),'font-family':/^\s*(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)(?:\s*,\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace))*|inherit)\s*$/i,'font-size':RegExp('^\\s*(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'font-stretch':/^\s*(?:normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded)\s*$/i,'font-style':/^\s*(?:normal|italic|oblique|inherit)\s*$/i,'font-variant':/^\s*(?:normal|small-caps|inherit)\s*$/i,'font-weight':/^\s*(?:normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)\s*$/i,'height':c[9],'left':c[9],'letter-spacing':c[21],'line-height':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'list-style':RegExp('^\\s*(?:(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit|inside|outside|'+s[8]+')(?:\\s+(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)|\\s+(?:inside|outside|inherit)|\\s*'+s[8]+'|\\s+none|\\s+inherit){0,2}|inherit)\\s*$','i'),'list-style-image':c[8],'list-style-position':/^\s*(?:inside|outside|inherit)\s*$/i,'list-style-type':/^\s*(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)\s*$/i,'margin':RegExp('^\\s*(?:(?:0|'+s[3]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[3]+'|'+s[6]+'|auto)){0,4}|inherit)\\s*$','i'),'margin-bottom':c[9],'margin-left':c[9],'margin-right':c[9],'margin-top':c[9],'max-height':c[10],'max-width':c[10],'min-height':c[11],'min-width':c[11],'opacity':c[12],'outline':c[13],'outline-color':c[14],'outline-style':c[4],'outline-width':c[5],'overflow':/^\s*(?:visible|hidden|scroll|auto|inherit)\s*$/i,'overflow-x':c[15],'overflow-y':c[15],'padding':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[4]+'|'+s[7]+')){1,4}|\\s*inherit)\\s*$','i'),'padding-bottom':c[16],'padding-left':c[16],'padding-right':c[16],'padding-top':c[16],'page-break-after':c[17],'page-break-before':c[17],'page-break-inside':/^\s*(?:avoid|auto|inherit)\s*$/i,'pause':RegExp('^\\s*(?:(?:\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+')){1,2}|\\s*inherit)\\s*$','i'),'pause-after':c[18],'pause-before':c[18],'pitch':/^\s*(?:0|\d+(?:\.\d+)?k?Hz|x-low|low|medium|high|x-high|inherit)\s*$/i,'pitch-range':c[19],'play-during':RegExp('^\\s*(?:'+s[8]+'\\s*(?:mix|repeat)(?:\\s+(?:mix|repeat))?|auto|none|inherit)\\s*$','i'),'position':/^\s*(?:static|relative|absolute|inherit)\s*$/i,'quotes':c[7],'richness':c[19],'right':c[9],'speak':/^\s*(?:normal|none|spell-out|inherit)\s*$/i,'speak-header':/^\s*(?:once|always|inherit)\s*$/i,'speak-numeral':/^\s*(?:digits|continuous|inherit)\s*$/i,'speak-punctuation':/^\s*(?:code|none|inherit)\s*$/i,'speech-rate':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|x-slow|slow|medium|fast|x-fast|faster|slower|inherit)\s*$/i,'stress':c[19],'table-layout':/^\s*(?:auto|fixed|inherit)\s*$/i,'text-align':/^\s*(?:left|right|center|justify|inherit)\s*$/i,'text-decoration':/^\s*(?:none|(?:underline|overline|line-through|blink)(?:\s+(?:underline|overline|line-through|blink)){0,3}|inherit)\s*$/i,'text-indent':RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|inherit)\\s*$','i'),'text-overflow':c[20],'text-shadow':c[2],'text-transform':/^\s*(?:capitalize|uppercase|lowercase|none|inherit)\s*$/i,'text-wrap':/^\s*(?:normal|unrestricted|none|suppress)\s*$/i,'top':c[9],'unicode-bidi':/^\s*(?:normal|embed|bidi-override|inherit)\s*$/i,'vertical-align':RegExp('^\\s*(?:baseline|sub|super|top|text-top|middle|bottom|text-bottom|0|'+s[6]+'|'+s[3]+'|inherit)\\s*$','i'),'visibility':/^\s*(?:visible|hidden|collapse|inherit)\s*$/i,'voice-family':/^\s*(?:(?:\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)\s*,)*\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)|\s*inherit)\s*$/i,'volume':RegExp('^\\s*(?:0|\\d+(?:\\.\\d+)?|'+s[7]+'|silent|x-soft|soft|medium|loud|x-loud|inherit)\\s*$','i'),'white-space':/^\s*(?:normal|pre|nowrap|pre-wrap|pre-line|inherit|-o-pre-wrap|-moz-pre-wrap|-pre-wrap)\s*$/i,'width':RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|auto|inherit)\\s*$','i'),'word-spacing':c[21],'word-wrap':/^\s*(?:normal|break-word)\s*$/i,'z-index':/^\s*(?:auto|-?\d+|inherit)\s*$/i,'zoom':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[7]+')\\s*$','i')}})(),'alternates':{'MozBoxShadow':['boxShadow'],'WebkitBoxShadow':['boxShadow'],'float':['cssFloat','styleFloat']},'HISTORY_INSENSITIVE_STYLE_WHITELIST':{'display':true,'filter':true,'float':true,'height':true,'left':true,'opacity':true,'overflow':true,'position':true,'right':true,'top':true,'visibility':true,'width':true,'padding-left':true,'padding-right':true,'padding-top':true,'padding-bottom':true}},html,html4;html4={},html4

var icon_url = 'data:image/png;base64,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';

function flashMessage(msg) {
  var el = document.getElementById('flash-message');
  if (!el) {
    el = document.createElement('div');
    el.id = 'flash-message';
    el.style.opacity = 0;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  (function(i) {
    i = i || 0;
    if (i == 100) {
      el.style.opacity = 0;
      return;
    } else el.style.opacity = Math.min(20, 50 - Math.abs(i - 50)) * 3 * 0.01;
	var self = arguments.callee;
    setTimeout(function() { self(i + 2); }, 100);
  })();
};

function message(msg){
  if (console) console.info(msg);
  flashMessage(msg);
}

var siteinfos = [];
var lastItem = {};
var autoLoad = false;
var preFilters = [
  (function(doc, url) {
    url = url.replace(/#/g, '%23');
    icon = document.createElement('span');
    icon.innerHTML = '<a href="http://b.hatena.ne.jp/entry/' + url + '" title="Hatena Bookmark" target="_blank">'
        + '<img src="http://b.hatena.ne.jp/entry/image/' + url + '" class="hatena-bookmark-counter"/>'
        + '</a>';
    var feedlyfullfeed = document.getElementById('feedlyfullfeed-icon');
    feedlyfullfeed.insertBefore(icon, feedlyfullfeed.firstChild);
  })
], postFilters = [
  (function(doc, url) {
    var anchors = $X('descendant-or-self::a', doc);
    if (anchors) {
      anchors.forEach(function(i) {
        i.target = '_blank';
      });
    }
  })
];

var port = chrome.extension.connect();
var task = {}

task["update-siteinfo"] = function(data){
  message("Fetching siteinfos : ...");
  port.postMessage({task: 'siteinfo'});
};

task["siteinfo"] = function(data){
  if(data.result){
    message("Fetching siteinfos : Done");
    siteinfos = data.content;
  }else{
    message("Fetching siteinfos : Failed(" + data.reason + ")")
  }
};

task["expand"] = function(data){
  if(data.result){
    message("Expanding URL : Done");
    var exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
    $X(exp)[0].href = data.content;
  } else {
    message("Expanding URL : Failed(" + data.reason + ")")
  }
}

task["fullfeed"] = function(data){
  if (data.result){
    message("Fetching full story : Done");
    var text = data.content;
    text = html_sanitize(text, function(u){if(/^(?:https?:\/\/|\.|\/)/.test(u))return u}, function(d){return d});
    /*
    text = text.replace(/(<[^>]+?[\s"'])on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi, "$1");
    text = text.replace(/<iframe(?:\s[^>]+?)?>[\S\s]*?<\/iframe\s*>/gi, "");
    */
    var htmldoc = parse(text, data.url);
    var exp = '//div[contains(concat(" ", @class, " "), " inlineFrame ")]//div[contains(concat(" ", @class, " "), " entryBody ")]';
    var body = $X(exp)[0];
    while(body.firstChild){ body.removeChild(body.firstChild) }
    var entry = $X(lastItem.siteinfo.xpath, htmldoc);
    var content = document.createDocumentFragment();
    entry.map(function(i) {
      try{
        i = document.adoptNode(i, true);
      }catch(e){
        i = document.importNode(i, true);
      }
      content.appendChild(i);
    });
    body.appendChild(content);
  }else{
    message("Fetching full story : Failed(" + data.reason + ")")
  }
  var e = $X('//div[contains(concat(" ", @class, " "), " inlineFrame ")]')[0];
  e.className = e.className.replace(/ fullfeed-loading /g, '');
};

port.onMessage.addListener(function(data){
  try {
    task[data.task].call(data, data)
  } catch(e) {
    message("Failed to task : " + JSON.stringify(data));
  }
});

function request_full_story() {
  message("Fetching full story : ...");
  $X('//div[contains(concat(" ", @class, " "), " inlineFrame ")]')[0].className += ' fullfeed-loading ';
  port.postMessage({task: 'fullfeed', url: lastItem.url});
}

function request_update_siteinfo() {
  message("Fetching siteinfos : ......");
  port.postMessage({task: 'siteinfo'});
}

var timer = setTimeout(function() {
  if (timer) clearTimeout(timer);
  try {
    var exp = '//div[contains(concat(" ", @class, " "), " inlineFrame ")]';
    if ($X(exp).length == 0) {
      lastItem.url = '';
      throw "nothing to do...";
    }

    exp = '//div[contains(concat(" ", @class, " "), " inlineFrame ")]//a[contains(concat(" ", @class, " "), " entryTitle ")]';
    var url =  $X(exp)[0].href;
    if (lastItem.url == url) throw "nothing to do..."
    lastItem.url = url;

    [
      /^http:\/\/www\.pheedo\.jp\/click\.phdo\?/,
      /^http:\/\/feedproxy\.google\.com\/\~r\//,
    ].forEach(function(i) {
      if (url.match(i)) {
        message("Exapding URL : ...");
        port.postMessage({task: 'expand', url: url});
        throw "nothing to do...";
      }
    });

    var icon = document.getElementById('feedlyfullfeed-icon');
    if (icon) icon.parentNode.removeChild(icon);
    for (var n = 0; n < siteinfos.length; n++) {
      if ((new RegExp(siteinfos[n].url)).test(url)) {
        icon = document.createElement('span');
        icon.id = 'feedlyfullfeed-icon';
        icon.title = "ready to fetch full entry";
        icon.innerHTML = '<img src="' + icon_url + '" class="fullfeed-btn" width="19" height="19" />';
        icon.addEventListener('click', request_full_story, false);
        var container = $X('//div[contains(concat(" ", @class, " "), " inlineFrame ")]//div[contains(concat(" ", @class, " "), " entryHeader ")]')[0];
        container.appendChild(icon);
        lastItem.siteinfo = siteinfos[n];
        if (autoLoad) request_full_story();
        var entry = $X('//div[contains(concat(" ", @class, " "), " inlineFrame ")]')[0];
        preFilters.forEach(function(f) { try{ f(entry, url) }catch(e){  } });
        break;
      }
    }
  } catch(e) {}
  timer = setTimeout(arguments.callee, 200);
});

setTimeout(function() {
  message("Fetching siteinfos : ...");
  port.postMessage({task: 'siteinfo'});
  if(!!document["listenerAdded"]){ return }
  document.addEventListener('keydown', function(e){
    if(e.target.tagName.toLowerCase() == "input" || e.target.tagName.toLowerCase() == "textarea")
      return
    if(e.keyCode == 90) {
      // Z
      if(e.ctrlKey){
        autoLoad = !autoLoad;
        message('AutoLoad : ' + (autoLoad ? 'on' : 'off'));
      }else if(e.shiftKey){
        request_update_siteinfo();
      }else{
        if (!document.getElementById('feedlyfullfeed-icon')) return;
        request_full_story();
      }
    }else{
      return;
    }
    e.preventDefault();
  }, false);
  document["listenerAdded"] = true;
}, 500);


// simple version of $X
// $X(exp);
// $X(exp, context);
// @source http://gist.github.com/3242.txt
// @author id:os0x
function $X (exp, context) {
  context || (context = document);
  var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
    return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
      context.namespaceURI || document.documentElement.namespaceURI || "";
  });

  var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
      // not ensure the order.
      var ret = [], i = null;
      while (i = result.iterateNext()) ret.push(i);
      return ret;
  }
  return null;
}