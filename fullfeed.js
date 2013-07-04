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
    var theoldreaderfullfeed = document.getElementById('theoldreaderfullfeed-icon');
    theoldreaderfullfeed.insertBefore(icon, theoldreaderfullfeed.firstChild);
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
    var exp = '//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//h3/a';
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
    var exp = '//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//div[contains(concat(" ", @class, " "), " content ")]';
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
  var e = $X('//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//div[contains(concat(" ", @class, " "), " content ")]')[0];
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
  $X('//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//div[contains(concat(" ", @class, " "), " content ")]')[0].className += ' fullfeed-loading ';
  port.postMessage({task: 'fullfeed', url: lastItem.url});
}

function request_update_siteinfo() {
  message("Fetching siteinfos : ......");
  port.postMessage({task: 'siteinfo'});
}

var timer = setTimeout(function() {
  if (timer) clearTimeout(timer);
  try {
    var exp = '//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]';
    if ($X(exp).length == 0) {
      lastItem.url = '';
      throw "nothing to do...";
    }

    exp = '//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//h3/a';
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

    var icon = document.getElementById('theoldreaderfullfeed-icon');
    if (icon) icon.parentNode.removeChild(icon);
    for (var n = 0; n < siteinfos.length; n++) {
      if ((new RegExp(siteinfos[n].url)).test(url)) {
        icon = document.createElement('span');
        icon.id = 'theoldreaderfullfeed-icon';
        icon.title = "ready to fetch full entry";
        icon.innerHTML = '<img src="' + icon_url + '" class="fullfeed-btn" width="19" height="19" />';
        icon.addEventListener('click', request_full_story, false);
        var container = $X('//div[contains(concat(" ", @class, " "), " list-post ") and not(contains(@style,"display: none"))]//h3')[0];
        container.appendChild(icon);
        lastItem.siteinfo = siteinfos[n];
        if (autoLoad) request_full_story();
		var entry = $X('//div[not(contains(@style,"display: none"))]//div[contains(concat(" ", @class, " "), " content ")]')[0];
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
        if (!document.getElementById('theoldreaderfullfeed-icon')) return;
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