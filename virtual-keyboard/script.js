const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    input: null,
  },

  properties: {
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.input = document.querySelector('.use-keyboard-input');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._crateKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Use keyboard for element with .use-keyboard-input
    this.elements.input.addEventListener('focus', () => {
      this.open();
    });
  },

  _crateKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'space',
    ];

    // Creates HTML for an icon
    const createIconHTML = (iconName) => {
      return `<i class="material-icons">${iconName}</i>`;
    };

    // Create keys
    keyLayout.forEach(key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

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
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
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

        default:
          keyElement.innerHTML = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.insertValue(`${this.properties.capsLock ?
              key.toUpperCase() : key.toLowerCase()}`);
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

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
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