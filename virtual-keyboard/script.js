const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    input: null,
  },

  properties: {
    capsLock: false,
    shift: false,
    lang: 'en',
    sound: true,
    voice: false,
  },

  characters: {
    en: [
      ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'],
      ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['{', '['], ['}', ']'],
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [':', ';'], ['"', '\''], 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ['<', ','], ['>', '.'], ['?', '/'],
      'done', 'sound', 'voice', 'EN', 'space', 'left', 'right'
    ],
    ru: [
      ['!', '1'], ['"', '2'], ['№', '3'], [';', '4'], ['%', '5'],
      [':', '6'], ['?', '7'], ['*', '8'], ['(', '9'], [')', '0'], 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', [',', '.'],
      'done', 'sound', 'voice', 'RU', 'space', 'left', 'right'
    ]
  },

  recognition: null,

  init() {
    // Create main elements
    this.elements.input = document.querySelector('.use-keyboard-input');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._crateKeys(this.properties.lang));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Use keyboard for element with .use-keyboard-input
    this.elements.input.addEventListener('focus', () => {
      this.open();
    });
    document.addEventListener('keypress', (e) => {
      this.highlightButton(e);
    });
    document.addEventListener('keydown', (e) => {
      this.highlightFnButton(e);
    });
    document.addEventListener('keyup', (e) => {
      this.removeShift(e);
    });

    // Speech recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;

    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');


      if (e.results[0].isFinal) {
        this.insertValue(transcript);
        this.insertValue('\n');
      }
    });
    // this.recognition.addEventListener('end', this.recognition.start);

    // this.recognition.start();
  },

  _crateKeys(lang) {
    const fragment = document.createDocumentFragment();
    let keyLayout = [];
    const keyLayoutEn = this.characters.en;

    const keyLayoutRu = this.characters.ru;

    if (lang === 'en') {
      keyLayout = keyLayoutEn;
    } else {
      keyLayout = keyLayoutRu;
    }

    // Creates HTML for an icon
    const createIconHTML = (iconName) => {
      return `<i class="material-icons">${iconName}</i>`;
    };

    const createCharsHTML = (charsArr) => {
      return `<div class="top">${charsArr[0]}</div>
      <div class="bottom active">${charsArr[1]}</div>`;
    };

    // Create keys
    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      keyElement.title = key;
      let insertLineBreak = ['backspace', 'enter', 'ъ'].indexOf(key) !== -1;
      if ([']', '/'].indexOf(key[1]) !== -1) {
        insertLineBreak = true;
      }
      if (['.'].indexOf(key[1]) !== -1 && this.properties.lang === 'ru') {
        insertLineBreak = true;
      }

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            if (this.elements.input.selectionStart === this.elements.input.selectionEnd) {
              this.insertValue('', -1);
            } else {
              this.insertValue('');
            }
            this.playSound('backspace');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
            this.elements.input.focus();
            this.playSound('caps');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('upgrade');

          keyElement.addEventListener('click', () => {
            this._toggleShift();
            keyElement.classList.toggle('keyboard__key--active');
            this.elements.input.focus();
            this.playSound('shift');
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.insertValue('\n');
            this.playSound('enter');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.insertValue(' ');
            this.playSound('key');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
            this.playSound('key');
          });

          break;

        case 'sound':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('volume_up');

          keyElement.addEventListener('click', () => {
            this.playSound('key');
            this.properties.sound = !this.properties.sound;
            keyElement.querySelector('i').textContent =
              keyElement.querySelector('i').textContent === 'volume_up' ?
                'volume_off' : 'volume_up';
          });

          break;

        case 'voice':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('mic_off');

          keyElement.addEventListener('click', () => {
            this.playSound('key');
            this.properties.voice = !this.properties.voice;
            keyElement.querySelector('i').textContent =
              keyElement.querySelector('i').textContent === 'mic' ?
                'mic_off' : 'mic';
            if (this.properties.voice) {
              this.recognition.lang = this.properties.lang === 'en' ?
                'en-US' : 'ru-RU';
              this.recognition.start();
              this.recognition.addEventListener('end', this.recognition.start);
            } else {
              this.recognition.removeEventListener('end', this.recognition.start);
              this.recognition.stop();
            }

          });

          break;

        case 'EN':
          keyElement.innerHTML = key;
          keyElement.classList.add('keyboard__key--wide');

          keyElement.addEventListener('click', () => {
            keyLayout = this.properties.lang === 'en' ? keyLayoutRu : keyLayoutEn;
            this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';
            this.changeLang(keyLayout);
            this.playSound('key');
          });

          break;

        case 'left':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('west');

          keyElement.addEventListener('click', () => {
            this.insertValue('', -1, -1);
            this.playSound('key');
          });

          break;

        case 'right':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('east');

          keyElement.addEventListener('click', () => {
            this.insertValue('', 1, 1);
            this.playSound('key');
          });

          break;

        default:
          if (Array.isArray(key)) {
            keyElement.innerHTML = createCharsHTML(key);
          } else {
            keyElement.innerHTML = key.toLowerCase();
          }


          keyElement.addEventListener('click', () => {
            if (keyElement.querySelectorAll('.active')[0]) {
              this.insertValue(`${this.properties.capsLock ?
                keyElement.querySelectorAll('.active')[0].innerText.toUpperCase() :
                keyElement.querySelectorAll('.active')[0].innerText.toLowerCase()}`);
            } else {
              this.insertValue(`${this.properties.capsLock ?
                keyElement.innerText.toUpperCase() :
                keyElement.innerText.toLowerCase()}`);
            }
            this.playSound('key');
          });

      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  insertValue(value, shiftStart = 0, shiftEnd = 0) {
    this.elements.input.setRangeText(value,
      this.elements.input.selectionStart + shiftStart,
      this.elements.input.selectionEnd + shiftEnd, "end");
    this.elements.input.focus();
  },

  changeLang(keyArr) {

    this.elements.keys.forEach((it, ind) => {
      if (Array.isArray(keyArr[ind])) {
        it.querySelectorAll('div')[0].textContent = keyArr[ind][0];
        it.querySelectorAll('div')[1].textContent = keyArr[ind][1];
      } else {
        if (it.childElementCount === 0) {
          it.textContent = this.properties.capsLock ? keyArr[ind].toUpperCase() : keyArr[ind];
        }
      }
    });
    this.elements.input.focus();
  },

  highlightButton(e) {
    // console.log(e.key);
    this.elements.keys.forEach(it => {
      if (e.key === it.textContent ||
        this.characters.ru[this.characters.en.indexOf(e.key)] === it.textContent ||
        this.characters.en[this.characters.ru.indexOf(e.key)] === it.textContent) {
        it.classList.add('highlighted');
      }
      if (it.childElementCount === 2) {
        if (e.key === it.querySelector('.active').textContent) {
          it.classList.add('highlighted');
        }
      }
      if (it.childElementCount === 1) {
        if (e.key === 'Enter' && it.querySelector('i').textContent === 'keyboard_return') {
          it.classList.add('highlighted');
        }
      }

      setTimeout(() => { it.classList.remove('highlighted') }, 200);
    });


  },

  highlightFnButton(e) {
    // console.log('fn' + e.key);
    // 'Backspace', 'ArrowLeft', 'ArrowRight'
    if (e.key === 'Backspace') {
      this.lightBtn('backspace');
    }
    if (e.key === 'ArrowLeft') {
      this.lightBtn('left');
    }
    if (e.key === 'ArrowRight') {
      this.lightBtn('right');
    }
    if (e.key === 'CapsLock') {
      this.lightBtn('caps');
      this._toggleCapsLock();
    }
    if (e.key === 'Shift') {
      const btn = this.elements.keys[this.characters[this.properties.lang].indexOf('shift')];
      btn.classList.add('highlighted');
      btn.classList.toggle('keyboard__key--active');
      this._toggleShift()
    }
  },

  removeShift(e) {
    if (e.key === 'Shift') {
      const btn = this.elements.keys[this.characters[this.properties.lang].indexOf('shift')];
      btn.classList.remove('highlighted');
      btn.classList.toggle('keyboard__key--active');
      this._toggleShift()
    }
  },

  lightBtn(btnName) {
    const btn = this.elements.keys[this.characters[this.properties.lang].indexOf(btnName)];
    btn.classList.add('highlighted');
    if (btnName === 'caps' || btnName === 'shift') {
      btn.classList.toggle('keyboard__key--active');
    }
    if (btnName !== 'shift') {
      setTimeout(() => { btn.classList.remove('highlighted') }, 200);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    this._toggleCapsLock();

    for (const key of this.elements.keys) {
      if (key.childElementCount === 2) {
        key.querySelectorAll('div').forEach(it => {
          it.classList.toggle('active');
        });
      }
    }
  },

  playSound(key) {
    if (this.properties.sound) {
      const audio = document.querySelector(`audio[data-key="${key}"][data-lang="${this.properties.lang}"]`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
    }
  },

  open() {
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.elements.main.classList.add('keyboard--hidden');
  }
};

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});

