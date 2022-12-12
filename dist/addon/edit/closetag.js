// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/5/LICENSE

/**
 * Tag-closer extension for CodeMirror.
 *
 * This extension adds an "autoCloseTags" option that can be set to
 * either true to get the default behavior, or an object to further
 * configure its behavior.
 *
 * These are supported options:
 *
 * `whenClosing` (default true)
 *   Whether to autoclose when the '/' of a closing tag is typed.
 * `whenOpening` (default true)
 *   Whether to autoclose the tag when the final '>' of an opening
 *   tag is typed.
 * `dontCloseTags` (default is empty tags for HTML, none for XML)
 *   An array of tag names that should not be autoclosed.
 * `indentTags` (default is block tags for HTML, none for XML)
 *   An array of tag names that should, when opened, cause a
 *   blank line to be added inside the tag, and the blank line and
 *   closing line to be indented.
 * `emptyTags` (default is none)
 *   An array of XML tag names that should be autoclosed with '/>'.
 *
 * See demos/closetag.html for a usage example.
 */
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../fold/xml-fold"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../fold/xml-fold"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  CodeMirror.defineOption("autoCloseTags", false, function(cm, val, old) {
    if (old != CodeMirror.Init && old)
      cm.removeKeyMap("autoCloseTags");
    if (!val) return;
    let map = {name: "autoCloseTags"};
    if (typeof val != "object" || val.whenClosing !== false)
      map["'/'"] = function(cm) { return autoCloseSlash(cm); };
    if (typeof val != "object" || val.whenOpening !== false)
      map["'>'"] = function(cm) { return autoCloseGT(cm); };
    cm.addKeyMap(map);
  });

  let htmlDontClose = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param","source", "track", "wbr"];
  let htmlIndent = ["html",
"base",
"head",
"link", 
"meta",
"style",
"title",
"body",
"address",
"article",
"aside",
"footer",
"header",
"h1",
"h2",
"h3",
"h4",
"h5",   
"h6",
"main",
"nav",
"section",
"blockquote",
"dd",
"div",
"dl",
"dt",
"figcaption",
"figure",
"hr",
"li",
"menu",
"ol",
"p",
"pre",
"ul",
"a",
"abbr",
"b",
"bdi",
"bdo",
"br",
"cite",
"code",
"data",
"dfn",
"em",
"i",
"kbd",
"mark",
"q",
"rq",
"rt",
"ruby",
"s",
"samp",
"small",
"span",
"strong",
"sub",
"time",
"u",
"var",
"wbr",
"area",
"audio",
"img",
"map",
"track",
"embed",
"iframe",
"object",
"picture",
"portal",
"svg",
"math",
"canvas",
"noscript",
"script",
"del",
"ins",
"caption",
"col",
"colgroup",
"table",
"tbody",
"tfoot",
"th",
"thead",
"tr",
"button",
"dialog",
"fieldset",
"form",
"input",
"label",
"legend",
"meter",
"optgroup",
"option",
"output",
"progress",
"select",
"textarea",
"details",
"dialog",
"sammury",
"form",
"input",
"label",
"legend",
"meter",
"optgroup",
"option",
"output",
"progress",
"select",
"textarea",
"slot",
"template",
"acronym",
"applet",
"bgsound",
"big",
"blink",
"center",
"dir",
"font",
"frame",
"framset",
"image",
"keygen",
"marquee",
"menuitem",
"nobr",
"noembed",
"noframes",
"param",
"plaintext",
"rb",
"rtc",
"shadow",
"spacer",
"strike",
"tt",
"xmp",
];

  function autoCloseGT(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    let ranges = cm.listSelections(), replacements = [];
    let opt = cm.getOption("autoCloseTags");
    for (let i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      let pos = ranges[i].head, tok = cm.getTokenAt(pos);
      let inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
      let tagInfo = inner.mode.xmlCurrentTag && inner.mode.xmlCurrentTag(state)
      let tagName = tagInfo && tagInfo.name
      if (!tagName) return CodeMirror.Pass

      let html = inner.mode.configuration == "html";
      let dontCloseTags = (typeof opt == "object" && opt.dontCloseTags) || (html && htmlDontClose);
      let indentTags = (typeof opt == "object" && opt.indentTags) || (html && htmlIndent);

      if (tok.end > pos.ch) tagName = tagName.slice(0, tagName.length - tok.end + pos.ch);
      let lowerTagName = tagName.toLowerCase();
      // Don't process the '>' at the end of an end-tag or self-closing tag
      if (!tagName ||
          tok.type == "string" && (tok.end != pos.ch || !/[\"\']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1) ||
          tok.type == "tag" && tagInfo.close ||
          tok.string.indexOf("/") == (pos.ch - tok.start - 1) || // match something like <someTagName />
          dontCloseTags && indexOf(dontCloseTags, lowerTagName) > -1 ||
          closingTagExists(cm, inner.mode.xmlCurrentContext && inner.mode.xmlCurrentContext(state) || [], tagName, pos, true))
        return CodeMirror.Pass;

      let emptyTags = typeof opt == "object" && opt.emptyTags;
      if (emptyTags && indexOf(emptyTags, tagName) > -1) {
        replacements[i] = { text: "/>", newPos: CodeMirror.Pos(pos.line, pos.ch + 2) };
        continue;
      }

      let indent = indentTags && indexOf(indentTags, lowerTagName) > -1;
      replacements[i] = {indent: indent,
                         text: ">" + (indent ? "\n\n" : "") + "</" + tagName + ">",
                         newPos: indent ? CodeMirror.Pos(pos.line + 1, 0) : CodeMirror.Pos(pos.line, pos.ch + 1)};
    }

    let dontIndentOnAutoClose = (typeof opt == "object" && opt.dontIndentOnAutoClose);
    for (let i = ranges.length - 1; i >= 0; i--) {
      let info = replacements[i];
      cm.replaceRange(info.text, ranges[i].head, ranges[i].anchor, "+insert");
      let sel = cm.listSelections().slice(0);
      sel[i] = {head: info.newPos, anchor: info.newPos};
      cm.setSelections(sel);
      if (!dontIndentOnAutoClose && info.indent) {
        cm.indentLine(info.newPos.line, null, true);
        cm.indentLine(info.newPos.line + 1, null, true);
      }
    }
  }

  function autoCloseCurrent(cm, typingSlash) {
    let ranges = cm.listSelections(), replacements = [];
    let head = typingSlash ? "/" : "</";
    let opt = cm.getOption("autoCloseTags");
    let dontIndentOnAutoClose = (typeof opt == "object" && opt.dontIndentOnSlash);
    for (let i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      let pos = ranges[i].head, tok = cm.getTokenAt(pos);
      let inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
      if (typingSlash && (tok.type == "string" || tok.string.charAt(0) != "<" ||
                          tok.start != pos.ch - 1))
        return CodeMirror.Pass;
      // Kludge to get around the fact that we are not in XML mode
      // when completing in JS/CSS snippet in htmlmixed mode. Does not
      // work for other XML embedded languages (there is no general
      // way to go from a mixed mode to its current XML state).
      let replacement, mixed = inner.mode.name != "xml" && cm.getMode().name == "htmlmixed"
      if (mixed && inner.mode.name == "javascript") {
        replacement = head + "script";
      } else if (mixed && inner.mode.name == "css") {
        replacement = head + "style";
      } else {
        let context = inner.mode.xmlCurrentContext && inner.mode.xmlCurrentContext(state)
        let top = context.length ? context[context.length - 1] : ""
        if (!context || (context.length && closingTagExists(cm, context, top, pos)))
          return CodeMirror.Pass;
        replacement = head + top
      }
      if (cm.getLine(pos.line).charAt(tok.end) != ">") replacement += ">";
      replacements[i] = replacement;
    }
    cm.replaceSelections(replacements);
    ranges = cm.listSelections();
    if (!dontIndentOnAutoClose) {
        for (let i = 0; i < ranges.length; i++)
            if (i == ranges.length - 1 || ranges[i].head.line < ranges[i + 1].head.line)
                cm.indentLine(ranges[i].head.line);
    }
  }

  function autoCloseSlash(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    return autoCloseCurrent(cm, true);
  }

  CodeMirror.commands.closeTag = function(cm) { return autoCloseCurrent(cm); };

  function indexOf(collection, elt) {
    if (collection.indexOf) return collection.indexOf(elt);
    for (let i = 0, e = collection.length; i < e; ++i)
      if (collection[i] == elt) return i;
    return -1;
  }

  // If xml-fold is loaded, we use its functionality to try and verify
  // whether a given tag is actually unclosed.
  function closingTagExists(cm, context, tagName, pos, newTag) {
    if (!CodeMirror.scanForClosingTag) return false;
    let end = Math.min(cm.lastLine() + 1, pos.line + 500);
    let nextClose = CodeMirror.scanForClosingTag(cm, pos, null, end);
    if (!nextClose || nextClose.tag != tagName) return false;
    // If the immediate wrapping context contains onCx instances of
    // the same tag, a closing tag only exists if there are at least
    // that many closing tags of that type following.
    let onCx = newTag ? 1 : 0
    for (let i = context.length - 1; i >= 0; i--) {
      if (context[i] == tagName) ++onCx
      else break
    }
    pos = nextClose.to;
    for (let i = 1; i < onCx; i++) {
      let next = CodeMirror.scanForClosingTag(cm, pos, null, end);
      if (!next || next.tag != tagName) return false;
      pos = next.to;
    }
    return true;
  }
});
