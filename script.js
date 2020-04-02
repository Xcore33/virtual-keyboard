const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        CAPS: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {


        // Create main elements
        let textarea = document.createElement("textarea");
        let main = document.createElement("div");
        let keysContainer = document.createElement("div");

        // Setup main elements
        textarea.classList.add("textarea");
        main.classList.add("keyboard");
        keysContainer.classList.add("keyboard-keys");
        keysContainer.appendChild(this._createKeys());

        this.elements.CAPS = keysContainer.querySelectorAll(".keyboard-key");

        // Add to DOM
        document.body.appendChild(textarea);
        main.appendChild(keysContainer);
        document.body.appendChild(main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll("textarea").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "|", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shiftR", "up",
            "ctrl", "win", "alt", "space", "alt", "ctrl", "left", "down", "right"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "up"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    this.key = '93';

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    keyElement.addEventListener("keydown", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });


                    break;

                case "shift":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("arrow_upward");

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleShift();
                        this._triggerEvent("oninput");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this._toggleShift();
                        this._triggerEvent("oninput");
                    });

                    break;

                case "shiftR":
                    keyElement.classList.add("keyboard-key");
                    keyElement.innerHTML = createIconHTML("arrow_upward");

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleShift();
                        this._triggerEvent("oninput");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        this._toggleShift();
                        this._triggerEvent("oninput");
                    });

                    break;

                case "ctrl":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("CTRL");

                    keyElement.addEventListener("click", () => {

                        this._triggerEvent("oninput");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "     ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "alt":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("ALT");

                    keyElement.addEventListener("click", () => {

                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard-key-extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "win":
                    keyElement.classList.add("keyboard-key");
                    keyElement.innerHTML = createIconHTML("menu");

                    keyElement.addEventListener("click", () => {

                        this._triggerEvent("oninput");
                    });

                    break;

                case "up":
                    keyElement.classList.add("keyboard-key-up");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\u{2191}";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "left":
                    keyElement.classList.add("keyboard-key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\u{2190}";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "down":
                    keyElement.classList.add("keyboard-key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\u{2193}";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "right":
                    keyElement.classList.add("keyboard-key");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\u{2192}";
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.CAPS) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleShift() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.CAPS) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();

            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        // this.eventHandlers.onclose = onclose;
    },

};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

