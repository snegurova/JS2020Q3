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
  },

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
  },

  _crateKeys(lang) {
    const fragment = document.createDocumentFragment();
    let keyLayout = [];
    const keyLayoutEn = [
      ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'],
      ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['{', '['], ['}', ']'],
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [':', ';'], ['"', '\''], 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ['<', ','], ['>', '.'], ['?', '/'],
      'done', 'EN', 'space', 'left', 'right'
    ];

    const keyLayoutRu = [
      ['!', '1'], ['"', '2'], ['№', '3'], [';', '4'], ['%', '5'],
      [':', '6'], ['?', '7'], ['*', '8'], ['(', '9'], [')', '0'], 'backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', [',', '.'],
      'done', 'RU', 'space', 'left', 'right'
    ];

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

          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
            this.elements.input.focus();
          });

          break;

          case 'shift':
            keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            keyElement.innerHTML = createIconHTML('upgrade');

            keyElement.addEventListener('click', () => {
              this._toggleShift();
              keyElement.classList.toggle('keyboard__key--active');
              this.elements.input.focus();
            });

            break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.insertValue('\n');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.insertValue(' ');
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
          });

          break;

        case 'EN':
          keyElement.innerHTML = key;
          keyElement.classList.add('keyboard__key--wide');

          keyElement.addEventListener('click', () => {
            keyLayout = this.properties.lang === 'en' ? keyLayoutRu : keyLayoutEn;
            this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';
            this.changeLang(keyLayout);
          });

          break;

          case 'left':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.innerHTML = createIconHTML('west');

            keyElement.addEventListener('click', () => {
              this.insertValue('', -1, -1);

            });

            break;

            case 'right':
              keyElement.classList.add('keyboard__key--wide');
              keyElement.innerHTML = createIconHTML('east');

              keyElement.addEventListener('click', () => {
                this.insertValue('', 1, 1);

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

          });

          break;
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