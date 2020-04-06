const Keyboard = {

  elements: {
    main: null,
    mainRU: null,
    keysContainer: null,
    CAPS: [],
    CAPSRU: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.textarea = document.createElement('textarea');
    this.main = document.createElement('div');
    this.mainRU = document.createElement('div');
    this.keysContainer = document.createElement('ul');
    this.keysContainerRU = document.createElement('ul');
    this.helptips = document.createElement('div');

    this.keysContainer.appendChild(this.createKeys());
    this.keysContainerRU.appendChild(this.createKeysRU());
    this.textarea.classList.add('textarea');
    this.main.classList.add('keyboard');
    this.mainRU.classList.add('keyboard2');
    this.keysContainer.classList.add('keyboard-keys');
    this.keysContainerRU.classList.add('keyboard-keys');
    this.helptips.classList.add('helptips');
    this.helptips.innerHTML = 'Ctrl + alt - change language <br> <span>create for windows by xcore33<span>';
    this.elements.CAPS = this.keysContainer.querySelectorAll('.keyboard-key');
    this.elements.CAPSRU = this.keysContainerRU.querySelectorAll('.keyboard-key');

    document.body.appendChild(this.textarea);
    this.main.appendChild(this.keysContainer);
    this.mainRU.appendChild(this.keysContainerRU);
    document.body.appendChild(this.main);
    document.body.appendChild(this.mainRU);
    document.body.appendChild(this.helptips);
    this.textarea.placeholder = 'For start working - please click here';

    document.querySelectorAll('textarea').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', '|', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'shiftR', 'up',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'down', 'right',
    ];

    const createIconHTML = (iconname) => `<i class="material-icons">${iconname}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('li');
      const insertLineBreak = ['backspace', ']', 'enter', 'up', 'ъ'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('backspace');
          this.key = '93';

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('keydown', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });


          break;

        case 'shift':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('mousedown', () => {
            this.toggleShiftEN();
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShiftEN();
            this.triggerEvent('oninput');
          });

          break;

        case 'shiftR':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('mousedown', () => {
            this.toggleShiftEN();
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShiftEN();
            this.triggerEvent('oninput');
          });

          break;

        case 'ctrl':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('CTRL');

          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '     ';
            this.triggerEvent('oninput');
          });

          break;

        case 'alt':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('ALT');

          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLockEN();
            keyElement.classList.toggle('keyboard-key-active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard-key-extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'win':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('menu');

          keyElement.addEventListener('mousedown', () => {
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('mouseup', () => {
            this.colorada();
            this.triggerEvent('oninput');
          });

          break;

        case 'up':
          keyElement.classList.add('keyboard-key-up');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2191}';
            this.triggerEvent('oninput');
          });

          break;

        case 'left':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2190}';
            this.triggerEvent('oninput');
          });

          break;

        case 'down':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_down');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2193}';
            this.triggerEvent('oninput');
          });

          break;

        case 'right':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2192}';
            this.triggerEvent('oninput');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
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


  createKeysRU() {
    const fragment = document.createDocumentFragment();

    const keyLayout = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '|', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', 'shiftR', 'up',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'down', 'right',
    ];

    const createIconHTML = (iconname) => `<i class="material-icons">${iconname}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('li');
      const insertLineBreak = ['backspace', ']', 'enter', 'up', 'ъ'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('backspace');
          this.key = '93';

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('keydown', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'shift':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            this.triggerEvent('oninput');
          });

          break;

        case 'shiftR':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('mousedown', () => {
            this.toggleShift();
            this.triggerEvent('oninput');
          });

          keyElement.addEventListener('mouseup', () => {
            this.toggleShift();
            this.triggerEvent('oninput');
          });

          break;

        case 'ctrl':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('CTRL');

          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '     ';
            this.triggerEvent('oninput');
          });

          break;

        case 'alt':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('ALT');

          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activatable');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard-key-active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard-key-extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'win':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('menu');

          keyElement.addEventListener('click', () => {
            this.triggerEvent('oninput');
          });

          break;

        case 'up':
          keyElement.classList.add('keyboard-key-up');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2191}';
            this.triggerEvent('oninput');
          });

          break;

        case 'left':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2190}';
            this.triggerEvent('oninput');
          });

          break;

        case 'down':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_down');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2193}';
            this.triggerEvent('oninput');
          });

          break;

        case 'right':
          keyElement.classList.add('keyboard-key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\u{2192}';
            this.triggerEvent('oninput');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
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

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLockEN() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.CAPS) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.CAPSRU) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleShiftEN() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.CAPS) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleShift() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.CAPSRU) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },

};

document.addEventListener('keydown', (event) => {
  if (event.code === 'Backquote') {
    document.querySelectorAll('li.keyboard-key:nth-child(1)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit1') {
    document.querySelectorAll('li.keyboard-key:nth-child(2)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit2') {
    document.querySelectorAll('li.keyboard-key:nth-child(3)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit3') {
    document.querySelectorAll('li.keyboard-key:nth-child(4)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit4') {
    document.querySelectorAll('li.keyboard-key:nth-child(5)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit5') {
    document.querySelectorAll('li.keyboard-key:nth-child(6)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit6') {
    document.querySelectorAll('li.keyboard-key:nth-child(7)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit7') {
    document.querySelectorAll('li.keyboard-key:nth-child(8)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit8') {
    document.querySelectorAll('li.keyboard-key:nth-child(9)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit9') {
    document.querySelectorAll('li.keyboard-key:nth-child(10)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Digit0') {
    document.querySelectorAll('li.keyboard-key:nth-child(11)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Minus') {
    document.querySelectorAll('li.keyboard-key:nth-child(12)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Equal') {
    document.querySelectorAll('li.keyboard-key:nth-child(13)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Backspace') {
    document.querySelectorAll('li.keyboard-key:nth-child(14)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Tab') {
    document.querySelectorAll('li.keyboard-key:nth-child(16)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyQ') {
    document.querySelectorAll('li.keyboard-key:nth-child(17)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyW') {
    document.querySelectorAll('li.keyboard-key:nth-child(18)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyE') {
    document.querySelectorAll('li.keyboard-key:nth-child(19)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyR') {
    document.querySelectorAll('li.keyboard-key:nth-child(20)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyT') {
    document.querySelectorAll('li.keyboard-key:nth-child(21)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyY') {
    document.querySelectorAll('li.keyboard-key:nth-child(22)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyU') {
    document.querySelectorAll('li.keyboard-key:nth-child(23)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyI') {
    document.querySelectorAll('li.keyboard-key:nth-child(24)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyO') {
    document.querySelectorAll('li.keyboard-key:nth-child(25)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyP') {
    document.querySelectorAll('li.keyboard-key:nth-child(26)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'BracketLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(27)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'BracketRight') {
    document.querySelectorAll('li.keyboard-key:nth-child(28)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyA') {
    document.querySelectorAll('li.keyboard-key:nth-child(31)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyS') {
    document.querySelectorAll('li.keyboard-key:nth-child(32)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyD') {
    document.querySelectorAll('li.keyboard-key:nth-child(33)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyF') {
    document.querySelectorAll('li.keyboard-key:nth-child(34)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyG') {
    document.querySelectorAll('li.keyboard-key:nth-child(35)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyH') {
    document.querySelectorAll('li.keyboard-key:nth-child(36)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyJ') {
    document.querySelectorAll('li.keyboard-key:nth-child(37)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyK') {
    document.querySelectorAll('li.keyboard-key:nth-child(38)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyL') {
    document.querySelectorAll('li.keyboard-key:nth-child(39)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Semicolon') {
    document.querySelectorAll('li.keyboard-key:nth-child(40)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Quote') {
    document.querySelectorAll('li.keyboard-key:nth-child(41)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Backslash') {
    document.querySelectorAll('li.keyboard-key:nth-child(42)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Enter') {
    document.querySelectorAll('li.keyboard-key:nth-child(43)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ShiftLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(45)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyZ') {
    document.querySelectorAll('li.keyboard-key:nth-child(46)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyX') {
    document.querySelectorAll('li.keyboard-key:nth-child(47)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyC') {
    document.querySelectorAll('li.keyboard-key:nth-child(48)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyV') {
    document.querySelectorAll('li.keyboard-key:nth-child(49)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyB') {
    document.querySelectorAll('li.keyboard-key:nth-child(50)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyN') {
    document.querySelectorAll('li.keyboard-key:nth-child(51)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'KeyM') {
    document.querySelectorAll('li.keyboard-key:nth-child(52)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Comma') {
    document.querySelectorAll('li.keyboard-key:nth-child(53)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Period') {
    document.querySelectorAll('li.keyboard-key:nth-child(54)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Slash') {
    document.querySelectorAll('li.keyboard-key:nth-child(55)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ShiftRight') {
    document.querySelectorAll('li.keyboard-key:nth-child(56)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ArrowUp') {
    document.querySelectorAll('li.keyboard-key:nth-child(57)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ControlLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(59)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'MetaLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(60)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'AltLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(61)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'Space') {
    document.querySelectorAll('li.keyboard-key:nth-child(62)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'AltRight') {
    document.querySelectorAll('li.keyboard-key:nth-child(63)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ControlRight') {
    document.querySelectorAll('li.keyboard-key:nth-child(64)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ArrowLeft') {
    document.querySelectorAll('li.keyboard-key:nth-child(65)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ArrowDown') {
    document.querySelectorAll('li.keyboard-key:nth-child(66)').forEach((el) => el.classList.add('push'));
  }
  if (event.code === 'ArrowRight') {
    document.querySelectorAll('li.keyboard-key:nth-child(67)').forEach((el) => el.classList.add('push'));
  }
  setTimeout(() => document.querySelectorAll('li.keyboard-key').forEach((el) => el.classList.remove('push')), 300);
});

function runOnKeys(func, ...codes) {
  const pressed = new Set();

  document.addEventListener('keydown', (event2) => {
    pressed.add(event2.key);

    for (const code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();

    func();
  });

  document.addEventListener('keyup', (event2) => {
    pressed.delete(event2.key);
  });
}

let visible = true;

runOnKeys(
  () => {
    if (visible) {
      (document.querySelectorAll('.keyboard').forEach((el) => el.style.display = 'none')),
      (document.querySelectorAll('.keyboard2').forEach((el) => el.style.display = 'block')),
      visible = false;
    } else {
      (document.querySelectorAll('.keyboard').forEach((el) => el.style.display = 'block')),
      (document.querySelectorAll('.keyboard2').forEach((el) => el.style.display = 'none')),
      visible = true;
    }
  },
  'Control',
  'Alt',
);



document.addEventListener('keyup', (event) => {
  if (event.getModifierState('CapsLock')) {
    document.querySelectorAll('.keyboard-key-activatable').forEach((el) => el.classList.add('keyboard-key-active'));
  } else {
    document.querySelectorAll('.keyboard-key-activatable').forEach((el) => el.classList.remove('keyboard-key-active'));
  }
});

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
