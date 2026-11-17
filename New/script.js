/**
 * FancyTexto - Lightweight, Fast, Vanilla JavaScript Fancy Text Generator
 * Inspried by LingoJam's Fancy Text Generator.
 * Pre-computes Unicode mapping tables for maximum real-time performance.
 */

(function () {
  'use strict';

  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const DIGITS = '0123456789';

  // --- Helper: Build mapping dictionary ---
  function createMap(upperList, lowerList, digitList) {
    const map = {};
    if (upperList) {
      for (let i = 0; i < 26; i++) {
        if (upperList[i]) map[UPPER[i]] = upperList[i];
      }
    }
    if (lowerList) {
      for (let i = 0; i < 26; i++) {
        if (lowerList[i]) map[LOWER[i]] = lowerList[i];
      }
    }
    if (digitList) {
      for (let i = 0; i < 10; i++) {
        if (digitList[i]) map[DIGITS[i]] = digitList[i];
      }
    }
    return map;
  }

  // Helper: generate code points array
  function range(start, count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(String.fromCodePoint(start + i));
    }
    return arr;
  }

  // --- 1. Mathematical Alphanumeric Characters ---

  // Bold Serif
  const mapBoldSerif = createMap(
    range(0x1D400, 26),
    range(0x1D41A, 26),
    range(0x1D7CE, 10)
  );

  // Italic Serif (Note: 'h' is U+210E)
  const italicLower = range(0x1D44E, 26);
  italicLower[7] = '\u210E'; // h
  const mapItalicSerif = createMap(
    range(0x1D434, 26),
    italicLower
  );

  // Bold Italic Serif
  const mapBoldItalicSerif = createMap(
    range(0x1D468, 26),
    range(0x1D482, 26)
  );

  // Sans-Serif Normal
  const mapSans = createMap(
    range(0x1D5A0, 26),
    range(0x1D5BA, 26),
    range(0x1D7E2, 10)
  );

  // Sans-Serif Bold
  const mapSansBold = createMap(
    range(0x1D5D4, 26),
    range(0x1D5EE, 26),
    range(0x1D7EC, 10)
  );

  // Sans-Serif Italic
  const mapSansItalic = createMap(
    range(0x1D608, 26),
    range(0x1D622, 26)
  );

  // Sans-Serif Bold Italic
  const mapSansBoldItalic = createMap(
    range(0x1D63C, 26),
    range(0x1D656, 26)
  );

  // Script / Cursive (Normal)
  const scriptUpper = range(0x1D49C, 26);
  scriptUpper[1] = '\u212C'; // B
  scriptUpper[4] = '\u2130'; // E
  scriptUpper[5] = '\u2131'; // F
  scriptUpper[7] = '\u210B'; // H
  scriptUpper[8] = '\u2110'; // I
  scriptUpper[11] = '\u2112'; // L
  scriptUpper[12] = '\u2133'; // M
  scriptUpper[17] = '\u211B'; // R
  const scriptLower = range(0x1D4B6, 26);
  scriptLower[4] = '\u212F'; // e
  scriptLower[6] = '\u210A'; // g
  scriptLower[14] = '\u2134'; // o
  const mapScript = createMap(scriptUpper, scriptLower);

  // Bold Script / Cursive
  const mapBoldScript = createMap(
    range(0x1D4D0, 26),
    range(0x1D4EA, 26)
  );

  // Fraktur / Old English (Normal)
  const frakturUpper = range(0x1D504, 26);
  frakturUpper[2] = '\u212D'; // C
  frakturUpper[7] = '\u210C'; // H
  frakturUpper[8] = '\u2111'; // I
  frakturUpper[17] = '\u211C'; // R
  frakturUpper[25] = '\u2128'; // Z
  const mapFraktur = createMap(
    frakturUpper,
    range(0x1D51E, 26)
  );

  // Bold Fraktur / Old English
  const mapBoldFraktur = createMap(
    range(0x1D56C, 26),
    range(0x1D586, 26)
  );

  // Double-Struck / Blackboard Bold
  const doubleStruckUpper = range(0x1D538, 26);
  doubleStruckUpper[2] = '\u2102'; // C
  doubleStruckUpper[7] = '\u210D'; // H
  doubleStruckUpper[13] = '\u2115'; // N
  doubleStruckUpper[15] = '\u2119'; // P
  doubleStruckUpper[16] = '\u211A'; // Q
  doubleStruckUpper[17] = '\u211D'; // R
  doubleStruckUpper[25] = '\u2124'; // Z
  const mapDoubleStruck = createMap(
    doubleStruckUpper,
    range(0x1D552, 26),
    range(0x1D7D8, 10)
  );

  // Monospace / Typewriter
  const mapMono = createMap(
    range(0x1D670, 26),
    range(0x1D68A, 26),
    range(0x1D7F6, 10)
  );

  // --- 2. Enclosed & Boxed Styles ---

  // Circled (Bubble)
  const circledDigits = ['\u24EA']; // 0
  for (let d = 1; d <= 9; d++) circledDigits.push(String.fromCodePoint(0x2460 + (d - 1)));
  const mapCircled = createMap(
    range(0x24B6, 26),
    range(0x24D0, 26),
    circledDigits
  );

  // Negative Circled (Dark Bubble)
  const negCircledDigits = ['\u24FF']; // 0
  for (let d = 1; d <= 9; d++) negCircledDigits.push(String.fromCodePoint(0x2776 + (d - 1)));
  const mapNegCircled = createMap(
    range(0x1F150, 26),
    range(0x1F150, 26),
    negCircledDigits
  );

  // Squared
  const mapSquared = createMap(
    range(0x1F130, 26),
    range(0x1F130, 26)
  );

  // Negative Squared
  const mapNegSquared = createMap(
    range(0x1F170, 26),
    range(0x1F170, 26)
  );

  // Parenthesized
  const parenDigits = ['0'];
  for (let d = 1; d <= 9; d++) parenDigits.push(String.fromCodePoint(0x2474 + (d - 1)));
  const mapParen = createMap(
    range(0x249C, 26),
    range(0x249C, 26),
    parenDigits
  );

  // --- 3. Phonetic, Small Caps & Scripts ---

  // Small Caps
  const mapSmallCaps = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ',
    'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
    'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
    's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
    'y': 'ʏ', 'z': 'ᴢ'
  };

  // Superscript
  const mapSuperscript = {
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ',
    'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ',
    'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ',
    't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ',
    'z': 'ᶻ',
    'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ', 'H': 'ᴴ',
    'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ',
    'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ',
    'W': 'ᵂ',
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵',
    '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻',
    '=': '⁼', '(': '⁽', ')': '⁾'
  };

  // Subscript
  const mapSubscript = {
    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ',
    'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ',
    's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ',
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅',
    '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋',
    '=': '₌', '(': '₍', ')': '₎'
  };

  // Curvy 1 (LingoJam signature style)
  const curvyUpper = ['Ą', 'ც', 'Ꭰ', 'Ɛ', 'F', 'Ɠ', 'H', 'I', 'Ꭻ', 'Ҡ', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'Ƭ', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const curvyLower = ['ą', 'ც', 'ɖ', 'ɛ', 'ʄ', 'ɠ', 'ɧ', 'ı', 'ʝ', 'ƙ', 'l', 'm', 'ŋ', 'o', 'ק', 'q', 'r', 'ʂ', 'ɬ', 'u', 'v', 'ῳ', 'ҳ', 'ყ', 'z'];
  const mapCurvy = createMap(curvyUpper, curvyLower);

  // Greek / Pseudo Math
  const mapGreek = {
    'a': 'α', 'b': 'в', 'c': '¢', 'd': '∂', 'e': 'є', 'f': 'f',
    'g': 'g', 'h': 'н', 'i': 'ι', 'j': 'נ', 'k': 'к', 'l': 'ℓ',
    'm': 'м', 'n': 'η', 'o': 'σ', 'p': 'ρ', 'q': 'q', 'r': 'я',
    's': 'ѕ', 't': 'т', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ',
    'y': 'у', 'z': 'z',
    'A': 'Α', 'B': 'Β', 'C': 'С', 'D': 'Δ', 'E': 'Ε', 'F': 'F',
    'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'J': 'J', 'K': 'Κ', 'L': 'L',
    'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Ρ', 'Q': 'Q', 'R': 'R',
    'S': 'Ѕ', 'T': 'Τ', 'U': 'U', 'V': 'V', 'W': 'Ω', 'X': 'Χ',
    'Y': 'Υ', 'Z': 'Ζ'
  };

  // Currency Symbols
  const mapCurrency = {
    'a': '₳', 'b': '฿', 'c': '₵', 'd': 'đ', 'e': 'ɇ', 'f': '₣',
    'g': '₲', 'h': 'ⱨ', 'i': 'ł', 'j': 'j', 'k': '₭', 'l': 'ⱡ',
    'm': '₥', 'n': '₦', 'o': 'ø', 'p': '₱', 'q': 'q', 'r': 'ɽ',
    's': '₴', 't': '₮', 'u': 'ʉ', 'v': 'v', 'w': 'w', 'x': 'ж',
    'y': 'ɏ', 'z': 'ƶ',
    'A': '₳', 'B': '฿', 'C': '₵', 'D': 'Đ', 'E': 'Ɇ', 'F': '₣',
    'G': '₲', 'H': 'Ⱨ', 'I': 'ł', 'J': 'J', 'K': '₭', 'L': 'Ⱡ',
    'M': 'M', 'N': '₦', 'O': 'Ø', 'P': '₱', 'Q': 'Q', 'R': 'Ɽ',
    'S': '₴', 'T': '₮', 'U': 'Ʉ', 'V': 'V', 'W': 'W', 'X': 'Ж',
    'Y': 'Ɏ', 'Z': 'Ƶ'
  };

  // Faux Cyrillic
  const mapCyrillic = {
    'a': 'а', 'b': 'ь', 'c': 'с', 'd': 'ԁ', 'e': 'е', 'f': 'f',
    'g': 'ԍ', 'h': 'һ', 'i': 'і', 'j': 'ј', 'k': 'к', 'l': 'ӏ',
    'm': 'м', 'n': 'п', 'o': 'о', 'p': 'р', 'q': 'ԛ', 'r': 'г',
    's': 'ѕ', 't': 'т', 'u': 'ц', 'v': 'ѵ', 'w': 'ԝ', 'x': 'х',
    'y': 'у', 'z': 'z',
    'A': 'А', 'B': 'В', 'C': 'С', 'D': 'D', 'E': 'Е', 'F': 'F',
    'G': 'G', 'H': 'Н', 'I': 'І', 'J': 'Ј', 'K': 'К', 'L': 'L',
    'M': 'М', 'N': 'И', 'O': 'О', 'P': 'Р', 'Q': 'Q', 'R': 'Я',
    'S': 'Ѕ', 'T': 'Т', 'U': 'Ц', 'V': 'V', 'W': 'Ш', 'X': 'Х',
    'Y': 'У', 'Z': 'Z'
  };

  // Asian / Symbol Character Lookalike
  const mapAsian = {
    'a': '丹', 'b': '阝', 'c': '匚', 'd': '口', 'e': '巨', 'f': '下',
    'g': '厶', 'h': '卄', 'i': '工', 'j': '丿', 'k': '长', 'l': '乚',
    'm': '从', 'n': '冂', 'o': '口', 'p': '尸', 'q': '🍳', 'r': '尺',
    's': '丂', 't': '丁', 'u': '凵', 'v': 'ᐯ', 'w': '山', 'x': '乂',
    'y': '丫', 'z': '乙',
    'A': '丹', 'B': '阝', 'C': '匚', 'D': '口', 'E': '巨', 'F': '下',
    'G': '厶', 'H': '卄', 'I': '工', 'J': '丿', 'K': '长', 'L': '乚',
    'M': '从', 'N': '冂', 'O': '口', 'P': '尸', 'Q': '🍳', 'R': '尺',
    'S': '丂', 'T': '丁', 'U': '凵', 'V': 'ᐯ', 'W': '山', 'X': '乂',
    'Y': '丫', 'Z': '乙'
  };

  // Flipped / Upside-down
  const mapFlipped = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
    'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ן',
    'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
    's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
    'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ',
    'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': '⋊', 'L': '˥',
    'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ',
    'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Ʌ', 'W': 'M', 'X': 'X',
    'Y': '⅄', 'Z': 'Z',
    '0': '0', '1': '⇂', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ',
    '6': '9', '7': 'L', '8': '8', '9': '6',
    '.': '˙', ',': "'", "'": ',', '"': '„', '?': '¿', '!': '¡',
    '&': '⅋', '_': '‾', '(': ')', ')': '(', '[': ']', ']': '[',
    '{': '}', '}': '{', '<': '>', '>': '<'
  };

  // Mirrored characters for reverse
  const mapMirror = {
    'A': 'A', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ',
    'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'Ⴑ', 'K': 'ʞ', 'L': '⅃',
    'M': 'M', 'N': 'Ͷ', 'O': 'O', 'P': 'ꟼ', 'Q': 'Ọ', 'R': 'Я',
    'S': 'Ƨ', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
    'Y': 'Y', 'Z': 'Ƶ',
    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ',
    'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'į', 'k': 'ʞ', 'l': 'l',
    'm': 'm', 'n': 'ᴎ', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ',
    's': 'ƨ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'ʏ', 'z': 'ƹ',
    '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
    '<': '>', '>': '<'
  };

  // Zalgo combining diacritics
  const ZALGO_UP = [
    '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311',
    '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307',
    '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a',
    '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
    '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313'
  ];
  const ZALGO_MID = [
    '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321',
    '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336',
    '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360',
    '\u0362', '\u0338', '\u0337'
  ];
  const ZALGO_DOWN = [
    '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d',
    '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326',
    '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e',
    '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
    '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348'
  ];

  // --- Translation Helpers ---

  function applyMap(text, map) {
    let out = '';
    for (const char of text) {
      out += map[char] !== undefined ? map[char] : char;
    }
    return out;
  }

  function applyFullwidth(text) {
    let out = '';
    for (const char of text) {
      const code = char.charCodeAt(0);
      if (char === ' ') {
        out += '　';
      } else if (code >= 33 && code <= 126) {
        out += String.fromCharCode(code + 65248);
      } else {
        out += char;
      }
    }
    return out;
  }

  function applySmallCaps(text) {
    let out = '';
    for (const char of text) {
      const lower = char.toLowerCase();
      out += mapSmallCaps[lower] !== undefined ? mapSmallCaps[lower] : char;
    }
    return out;
  }

  function applySuperscript(text) {
    let out = '';
    for (const char of text) {
      out += mapSuperscript[char] !== undefined ? mapSuperscript[char] : char;
    }
    return out;
  }

  function applySubscript(text) {
    let out = '';
    for (const char of text) {
      out += mapSubscript[char] !== undefined ? mapSubscript[char] : char;
    }
    return out;
  }

  function applyUpsideDown(text) {
    let out = '';
    const chars = Array.from(text);
    for (let i = chars.length - 1; i >= 0; i--) {
      const c = chars[i];
      out += mapFlipped[c] !== undefined ? mapFlipped[c] : c;
    }
    return out;
  }

  function applyReverse(text) {
    let out = '';
    const chars = Array.from(text);
    for (let i = chars.length - 1; i >= 0; i--) {
      const c = chars[i];
      out += mapMirror[c] !== undefined ? mapMirror[c] : c;
    }
    return out;
  }

  function applyCombining(text, mark) {
    let out = '';
    for (const char of text) {
      if (char === '\n' || char === '\r') {
        out += char;
      } else {
        out += char + mark;
      }
    }
    return out;
  }

  function applyZalgo(text) {
    let out = '';
    for (const char of text) {
      if (char === ' ' || char === '\n' || char === '\r') {
        out += char;
        continue;
      }
      out += char;
      const code = char.charCodeAt(0);
      const numUp = (code % 3) + 1;
      const numMid = (code >> 1) % 2;
      const numDown = ((code >> 2) % 3) + 1;

      for (let i = 0; i < numUp; i++) {
        out += ZALGO_UP[(code + i * 7) % ZALGO_UP.length];
      }
      for (let i = 0; i < numMid; i++) {
        out += ZALGO_MID[(code + i * 5) % ZALGO_MID.length];
      }
      for (let i = 0; i < numDown; i++) {
        out += ZALGO_DOWN[(code + i * 3) % ZALGO_DOWN.length];
      }
    }
    return out;
  }

  function applyEnclosedChars(text, open, close) {
    let out = '';
    for (const char of text) {
      if (char === ' ') {
        out += '  ';
      } else if (char === '\n' || char === '\r') {
        out += char;
      } else {
        out += open + char + close;
      }
    }
    return out;
  }

  function applySpace(text, delimiter) {
    return Array.from(text).join(delimiter);
  }

  // --- Main Generator Function ---
  function generateAllStyles(text) {
    if (!text || text.trim() === '') {
      return '';
    }

    // Pre-calculate base converted strings
    const script = applyMap(text, mapScript);
    const boldScript = applyMap(text, mapBoldScript);
    const fraktur = applyMap(text, mapFraktur);
    const boldFraktur = applyMap(text, mapBoldFraktur);
    const doubleStruck = applyMap(text, mapDoubleStruck);
    const boldSerif = applyMap(text, mapBoldSerif);
    const sansBold = applyMap(text, mapSansBold);
    const italicSerif = applyMap(text, mapItalicSerif);
    const sansItalic = applyMap(text, mapSansItalic);
    const boldItalicSerif = applyMap(text, mapBoldItalicSerif);
    const sansBoldItalic = applyMap(text, mapSansBoldItalic);
    const mono = applyMap(text, mapMono);
    const circled = applyMap(text, mapCircled);
    const negCircled = applyMap(text, mapNegCircled);
    const squared = applyMap(text, mapSquared);
    const negSquared = applyMap(text, mapNegSquared);
    const paren = applyMap(text.toLowerCase(), mapParen);
    const smallCaps = applySmallCaps(text);
    const fullwidth = applyFullwidth(text);
    const superscript = applySuperscript(text);
    const subscript = applySubscript(text);
    const upsideDown = applyUpsideDown(text);
    const reverse = applyReverse(text);
    const strike = applyCombining(text, '\u0336');
    const slash = applyCombining(text, '\u0338');
    const shortSlash = applyCombining(text, '\u0337');
    const underlineSingle = applyCombining(text, '\u0332');
    const underlineDouble = applyCombining(text, '\u0333');
    const overlineSingle = applyCombining(text, '\u0305');
    const overlineDouble = applyCombining(text, '\u033F');
    const tildeStrike = applyCombining(text, '\u0334');
    const crossStrike = applyCombining(text, '\u0335');
    const dottedAbove = applyCombining(text, '\u0307');
    const dottedBelow = applyCombining(text, '\u0323');
    const arrowBelow = applyCombining(text, '\u034E');
    const curvy = applyMap(text, mapCurvy);
    const greek = applyMap(text, mapGreek);
    const currency = applyMap(text, mapCurrency);
    const cyrillic = applyMap(text, mapCyrillic);
    const asian = applyMap(text, mapAsian);
    const zalgo = applyZalgo(text);

    // List of generated styles matching LingoJam's sequence
    const styles = [
      // Calligraphy & Mathematical Alphabets
      script,
      boldScript,
      fraktur,
      boldFraktur,
      doubleStruck,
      boldSerif,
      sansBold,
      italicSerif,
      sansItalic,
      boldItalicSerif,
      sansBoldItalic,
      mono,

      // Enclosed and Bubble text
      circled,
      negCircled,
      squared,
      negSquared,
      paren,

      // Width, Case & Orientation
      smallCaps,
      fullwidth,
      superscript,
      subscript,
      upsideDown,
      reverse,

      // Line Effects & Diacritics
      strike,
      slash,
      shortSlash,
      underlineSingle,
      underlineDouble,
      overlineSingle,
      overlineDouble,
      tildeStrike,
      crossStrike,
      dottedAbove,
      dottedBelow,
      arrowBelow,

      // Stylized alphabets
      curvy,
      greek,
      currency,
      cyrillic,
      asian,

      // Boxed & Bracketed Variations
      applyEnclosedChars(text, '[', ']'),
      applyEnclosedChars(text, '【', '】'),
      applyEnclosedChars(text, '『', '』'),
      applyEnclosedChars(text, '〖', '〗'),
      applyEnclosedChars(text, '〔', '〕'),
      applyEnclosedChars(text, '《', '》'),
      applyEnclosedChars(text, '[̲̅', '̲̅]'),

      // Spaced text
      applySpace(text, '  '),
      applySpace(text, ' • '),
      applySpace(text, ' ★ '),

      // Decorative Wings & Emoticon Borders (LingoJam Style)
      '꧁' + boldScript + '꧂',
      '★彡[' + text + ']彡★',
      'ıllıllı ' + text + ' ıllıllı',
      '✧･ﾟ: *✧･ﾟ:* ' + boldScript + ' *:･ﾟ✧*:･ﾟ✧',
      '乂❤ ' + text + ' ❤乂',
      '༺' + text + '༻',
      '♛ ' + boldFraktur + ' ♛',
      '╰☆☆ ' + boldSerif + ' ☆☆╮',
      '(¯`*•.¸,¤°´✿.｡.:* ' + text + ' *.:｡.✿`°¤,¸.•*´¯)',
      '░▒▓█ ' + text + ' █▓▒░',
      '▀▄▀▄▀▄ ' + text + ' ▄▀▄▀▄▀',
      '▌│█║▌║▌║ ' + text + ' ║▌║▌║█│▌',
      '｡o°✥✤✣ ' + boldScript + ' ✣✤✥°o｡',
      '•._.••´¯``•.¸¸.•` ' + text + ' `•.¸¸.•´´¯`••._.•',
      '⋆┈┈｡ﾟ𖥔*. ' + script + ' .*𖥔ﾟ｡┈┈⋆',
      '｡☆✼★━━━━━━━━━━━━★✼☆｡ ' + boldSerif + ' ｡☆✼★━━━━━━━━━━━━★✼☆｡',
      '༶•┈┈┈┈┈┈୨♡୧┈┈┈┈┈•༶ ' + script + ' ༶•┈┈┈┈┈┈୨♡୧┈┈┈┈┈•༶',
      '°°°·.°·..·°¯°·._.· ' + text + ' ·._.·°¯°·.·° .·°°°',
      '¸,ø¤º°`°º¤ø,¸¸,ø¤º° ' + boldScript + ' °º¤ø,¸¸,ø¤º°`°º¤ø,¸',

      // Creepy Zalgo Glitch
      zalgo
    ];

    // Every generated style on its own distinct line
    return styles.join('\n\n');
  }

  // --- Real-time Event Binding ---
  function initGenerator() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');

    if (!inputText || !outputText) {
      return;
    }

    function handleUpdate() {
      const value = inputText.value;
      if (!value || value.length === 0) {
        outputText.value = '';
      } else {
        outputText.value = generateAllStyles(value);
      }
    }

    // Real-time responsiveness on every single keystroke, paste, cut, or input event
    inputText.addEventListener('input', handleUpdate);
    inputText.addEventListener('keyup', handleUpdate);
    inputText.addEventListener('change', handleUpdate);

    // Initial populate if input already has value (e.g. browser cache)
    if (inputText.value) {
      handleUpdate();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGenerator);
  } else {
    initGenerator();
  }
})();
