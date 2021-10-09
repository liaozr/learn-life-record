var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="./Utils/Dictionaries.ts" />
var Core;
(function (Core) {
    class TemplateRegistry {
        static getTemplate(id) {
            if (!TemplateRegistry._cache[id]) {
                TemplateRegistry._cache[id] = document.getElementById(id);
            }
            return TemplateRegistry._cache[id].cloneNode(true);
        }
    }
    TemplateRegistry._cache = {};
    Core.TemplateRegistry = TemplateRegistry;
})(Core || (Core = {}));
/// <reference path="../../typings/rivets.d.ts" />
/// <reference path="./TemplateRegistry.ts" />
var Core;
(function (Core) {
    var Components;
    (function (Components) {
        // function template(): string {
        // 	return Core.TemplateRegistry.getTemplate(this.component.name);
        // }
        function initialize(element, data) {
            return data;
        }
        function create(name, config) {
            config = config || {
                name: null,
                static: null,
                template: null,
                initialize: null,
            };
            return rivets.components[name] = {
                name: name,
                static: config.static || [],
                template: config.template || function (el) {
                    el = el || this.el;
                    let children = [].slice.call(el ? el.children : []);
                    let template = Core.TemplateRegistry.getTemplate(name);
                    let content = template.content.querySelector('content');
                    if (children && content) {
                        for (let node of children) {
                            content.parentNode.insertBefore(node, content);
                        }
                    }
                    content && content.parentNode.removeChild(content);
                    return template.innerHTML;
                },
                initialize: config.initialize || initialize
            };
        }
        Components.create = create;
    })(Components = Core.Components || (Core.Components = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    class CustomElement {
        constructor(node, data) {
            node._data = node._data || {};
            this._node = node;
            for (let key in data) {
                if (node._data[key] === undefined) {
                    node._data[key] = data[key];
                }
                this[key] = this.getData(key);
            }
            let self = this.constructor;
            for (let attr of self._attributes) {
                this._linkAttr(attr);
            }
        }
        getData(key) {
            return this._node._data[key];
        }
        setData(key, val) {
            if (this._node._data[key] !== val) {
                this._node._data[key] = val;
                this._node.dispatchEvent(new CustomEvent(key + '-change'));
            }
        }
        _linkAttr(key) {
            this[key] = this.getData(key);
            this._node.addEventListener(key + '-update', (e) => {
                this[key] = this.getData(key);
            }, false);
        }
    }
    CustomElement._attributes = [];
    Core.CustomElement = CustomElement;
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Decorators;
    (function (Decorators) {
        function ComputedFrom(...keys) {
            return function ComputedFrom(target, key, descriptor) {
                target.__dependencies = target.__dependencies || {};
                target.__dependencies[key] = keys;
            };
        }
        Decorators.ComputedFrom = ComputedFrom;
        var Observe = rivets._.Binding.prototype.observe;
        rivets._.Binding.prototype.observe = function (obj, keypath, callback) {
            var path = keypath.split('.');
            var root, prop;
            if (path.length < 2) {
                root = obj;
                prop = path[0];
            }
            else {
                root = obj[path[0]];
                prop = path[1];
            }
            if (root && root.__dependencies) {
                this.options = this.options || {};
                this.options.dependencies = this.options.dependencies || root.__dependencies[prop];
            }
            return Observe.call(this, obj, keypath, callback);
        };
    })(Decorators = Core.Decorators || (Core.Decorators = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    let PresetType;
    (function (PresetType) {
        PresetType[PresetType["PHONE"] = 0] = "PHONE";
        PresetType[PresetType["TABLET"] = 1] = "TABLET";
        PresetType[PresetType["LAPTOP"] = 2] = "LAPTOP";
        PresetType[PresetType["DESKTOP"] = 3] = "DESKTOP";
    })(PresetType = Core.PresetType || (Core.PresetType = {}));
    let PresetTarget;
    (function (PresetTarget) {
        PresetTarget[PresetTarget["WINDOW"] = 0] = "WINDOW";
        PresetTarget[PresetTarget["VIEWPORT"] = 1] = "VIEWPORT";
    })(PresetTarget = Core.PresetTarget || (Core.PresetTarget = {}));
    let PresetPosition;
    (function (PresetPosition) {
        PresetPosition[PresetPosition["DEFAULT"] = 0] = "DEFAULT";
        PresetPosition[PresetPosition["CUSTOM"] = 1] = "CUSTOM";
        PresetPosition[PresetPosition["CENTER"] = 2] = "CENTER";
    })(PresetPosition = Core.PresetPosition || (Core.PresetPosition = {}));
    let PopupIconStyle;
    (function (PopupIconStyle) {
        PopupIconStyle[PopupIconStyle["MONOCHROME"] = 0] = "MONOCHROME";
        PopupIconStyle[PopupIconStyle["COLORED"] = 1] = "COLORED";
        PopupIconStyle[PopupIconStyle["CONTRAST"] = 2] = "CONTRAST";
    })(PopupIconStyle = Core.PopupIconStyle || (Core.PopupIconStyle = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/html5.d.ts" />
var Core;
(function (Core) {
    var Utils;
    (function (Utils) {
        function UUID() {
            let uuid;
            let bytes = crypto.getRandomValues(new Uint8Array(21));
            let hexed = val => (val % 16).toString(16);
            bytes[12] = 4;
            bytes[16] = bytes[16] & 0x3 | 0x8;
            uuid = Array.from(bytes, hexed).join('');
            uuid = uuid + Date.now().toString(16);
            uuid = uuid.replace(/^(.{8})(.{4})(.{4})(.{4})/, '$1-$2-$3-$4-');
            return uuid.toUpperCase();
        }
        Utils.UUID = UUID;
    })(Utils = Core.Utils || (Core.Utils = {}));
})(Core || (Core = {}));
/// <reference path="./Decorators/ComputedFrom.ts" />
/// <reference path="./Utils/Enums.ts" />
/// <reference path="./Utils/UUID.ts" />
var Core;
(function (Core) {
    var ComputedFrom = Core.Decorators.ComputedFrom;
    class Preset {
        constructor(data) {
            this.id = data.id || Core.Utils.UUID();
            this.width = data.width || null;
            this.height = data.height || null;
            this.top = isNaN(parseInt(data.top, 10)) ? null : data.top;
            this.left = isNaN(parseInt(data.left, 10)) ? null : data.left;
            this.description = data.description || null;
            this.position = data.position || Core.PresetPosition.DEFAULT;
            this.type = parseInt(data.type, 10) == data.type ? data.type : Core.PresetType.DESKTOP;
            this.target = data.target || Core.PresetTarget.WINDOW;
        }
        title() {
            let title = this.width + ' &times; ' + this.height;
            if (!this.width) {
                title = '<em>Height:</em> ' + this.height;
            }
            if (!this.height) {
                title = '<em>Width:</em> ' + this.width;
            }
            return title;
        }
        icon() {
            let icon = '';
            switch (this.type) {
                case Core.PresetType.PHONE:
                    icon = '#icon-phone';
                    break;
                case Core.PresetType.TABLET:
                    icon = '#icon-tablet';
                    break;
                case Core.PresetType.LAPTOP:
                    icon = '#icon-laptop';
                    break;
                default:
                    icon = '#icon-desktop';
                    break;
            }
            return icon;
        }
    }
    __decorate([
        ComputedFrom('width', 'height'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Preset.prototype, "title", null);
    __decorate([
        ComputedFrom('type'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Preset.prototype, "icon", null);
    Core.Preset = Preset;
})(Core || (Core = {}));
/// <reference path="../../Core/CustomElement.ts" />
var Views;
(function (Views) {
    var Common;
    (function (Common) {
        class Icon extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.src = data.src;
            }
            get src() {
                return this.getData('src');
            }
            set src(val) {
                this.setData('src', val);
                this._setSrc(val);
            }
            _setSrc(val) {
                var svg, use;
                svg = this._node.querySelector('svg');
                if (val && val[0] == '#') {
                    val = '../assets/icons/sprite.svg' + val;
                }
                while (svg.firstChild) {
                    svg.removeChild(svg.firstChild);
                }
                if (val) {
                    use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', val);
                    svg.appendChild(use);
                }
            }
        }
        Icon._attributes = [];
        Common.Icon = Icon;
        Core.Components.create('wr-icon', {
            static: ['class', 'src'],
            initialize: function (el, data) {
                data.src = data.src || el.getAttribute('src');
                return new Icon(el, data);
            }
        });
    })(Common = Views.Common || (Views.Common = {}));
})(Views || (Views = {}));
var Core;
(function (Core) {
    var Utils;
    (function (Utils) {
        var DOM;
        (function (DOM) {
            function q(selector, context) {
                if (typeof selector !== 'string') {
                    return selector;
                }
                return (context || document).querySelector(selector);
            }
            DOM.q = q;
            function qAll(selector, context) {
                let result = selector;
                if (typeof selector === 'string') {
                    result = (context || document).querySelectorAll(selector);
                }
                return [].slice.call(result);
            }
            DOM.qAll = qAll;
            function on(event, target, listener, capture) {
                let node = q(target);
                capture = !!capture;
                if (node) {
                    node.addEventListener(event, listener, capture);
                }
            }
            DOM.on = on;
            function trigger(event, target, config) {
                let node = q(target);
                if (node) {
                    node.dispatchEvent(new CustomEvent(event, config));
                }
            }
            DOM.trigger = trigger;
            function remove(selector, context) {
                let node = q(selector);
                node && node.parentNode.removeChild(node);
                return node;
            }
            DOM.remove = remove;
            function addClass(target, className) {
                let node = q(target);
                if (node) {
                    node.classList.add(className);
                }
            }
            DOM.addClass = addClass;
            function removeClass(target, className) {
                let node = q(target);
                if (node) {
                    node.classList.remove(className);
                }
            }
            DOM.removeClass = removeClass;
            function toggleClass(target, className) {
                let node = q(target);
                if (node) {
                    node.classList.toggle(className);
                }
                return hasClass(node, className);
            }
            DOM.toggleClass = toggleClass;
            function hasClass(target, className) {
                let node = q(target);
                if (node) {
                    return node.classList.contains(className);
                }
            }
            DOM.hasClass = hasClass;
            function empty(target) {
                let node = q(target);
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
            }
            DOM.empty = empty;
            function hide(target, className, waitFor) {
                return _toggleClass(target, false, className, waitFor);
            }
            DOM.hide = hide;
            function show(target, className, waitFor) {
                return _toggleClass(target, true, className, waitFor);
            }
            DOM.show = show;
            function animate(target, className, propertyName) {
                return _toggleClass(target, true, className, null, propertyName);
            }
            DOM.animate = animate;
            function _hasTransition(node) {
                let duration = window.getComputedStyle(node).transitionDuration.split(',');
                for (let part of duration) {
                    if (parseFloat(part) > 0) {
                        return true;
                    }
                }
                return false;
            }
            function _toggleClass(target, state, className = 'visible', waitFor, propertyName) {
                var node = q(target);
                var action = state ? 'add' : 'remove';
                waitFor = waitFor || node;
                if (!node) {
                    return Promise.resolve(null);
                }
                if (!_hasTransition(waitFor)) {
                    node.classList[action](className);
                    return Promise.resolve(node);
                }
                return new Promise((resolve, reject) => {
                    function transitionEnded(evt) {
                        if ((!propertyName || propertyName === evt.propertyName) && waitFor === evt.target) {
                            waitFor.removeEventListener('transitionend', transitionEnded);
                            resolve(waitFor);
                        }
                    }
                    waitFor.addEventListener('transitionend', transitionEnded);
                    node.classList[action](className);
                });
            }
            function eventPath(evt) {
                let node = evt.relatedTarget;
                let path = [];
                while (node = node.parentNode) {
                    path.push(node);
                }
                return path;
            }
            DOM.eventPath = eventPath;
        })(DOM = Utils.DOM || (Utils.DOM = {}));
    })(Utils = Core.Utils || (Core.Utils = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/tab-nav.d.ts" />
/// <reference path="../../Core/Utils/DOM.ts" />
var Views;
(function (Views) {
    var Common;
    (function (Common) {
        var $ = Core.Utils.DOM;
        const KEY_ESC = 27;
        class ModalMessage {
            constructor(title, message, blocking = false, actions = [], options = {}) {
                this.title = title;
                this.message = message;
                this.blocking = blocking;
                this.actions = actions;
                this.options = options;
                this.visible = false;
                this.onClose = new ModalEventRegistry();
                this.show();
            }
            show() {
                return $.show(document.body, 'wr_modal_visible').then(_ => {
                    let modal = $.q('.WR_modal');
                    let action = $.q('.WR_modal_actions .main', modal) || $.q('.WR_modal_actions button:last-child', modal);
                    if (this.options.class) {
                        $.addClass(modal, this.options.class);
                    }
                    action && action.focus();
                    this.visible = true;
                    TabNav.limitTo(modal);
                    if (!this.blocking) {
                        this._dismiss = (evt) => {
                            if (evt.keyCode === KEY_ESC) {
                                evt.preventDefault();
                                evt.stopPropagation();
                                for (let action of this.actions) {
                                    action.onDismiss && action.handler();
                                }
                                this.hide();
                                return false;
                            }
                        };
                        document.addEventListener('keyup', this._dismiss);
                    }
                    return Promise.resolve();
                });
            }
            hide() {
                return $.hide(document.body, 'wr_modal_visible', $.q('.WR_modal')).then(_ => {
                    this.visible = false;
                    document.removeEventListener('keyup', this._dismiss);
                    TabNav.reset();
                    this.onClose.trigger();
                    return Promise.resolve();
                });
            }
        }
        Common.ModalMessage = ModalMessage;
        class ModalEventRegistry {
            constructor() {
                this._handlers = [];
            }
            addListener(handler) {
                let handlers = this._handlers;
                let existing = handlers.indexOf(handler);
                if (existing > -1) {
                    return false;
                }
                handlers.push(handler);
                return true;
            }
            removeListener(handler) {
                let handlers = this._handlers;
                let existing = handlers.indexOf(handler);
                if (existing === -1) {
                    return false;
                }
                handlers.splice(existing, 1);
                return true;
            }
            removeAllListeners() {
                this._handlers = [];
            }
            trigger(context, data) {
                for (let handler of this._handlers) {
                    handler.call(context, data);
                }
            }
        }
        Common.ModalEventRegistry = ModalEventRegistry;
    })(Common = Views.Common || (Views.Common = {}));
})(Views || (Views = {}));
var Core;
(function (Core) {
    var Input;
    (function (Input) {
        Input.Keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            ALT: 18,
            ESCAPE: 27,
            SPACE: 32,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46,
            ARROWS: [37, 40],
            DIGITS: [48, 57],
            NUMPAD: [96, 105],
            FUNC: [112, 123]
        };
    })(Input = Core.Input || (Core.Input = {}));
})(Core || (Core = {}));
/// <reference path="../../Core/CustomElement.ts" />
/// <reference path="../../Core/Components.ts" />
/// <reference path="../../Core/Input/Keys.ts" />
var Views;
(function (Views) {
    var Common;
    (function (Common) {
        var Keys = Core.Input.Keys;
        class NumericInput extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                node.onkeydown = filterKeys;
            }
            get val() {
                return this.getData('val');
            }
            set val(val) {
                this.setData('val', val);
            }
        }
        NumericInput._attributes = ['val'];
        Common.NumericInput = NumericInput;
        function filterKeys(e) {
            var key = e.keyCode;
            switch (true) {
                case !e.shiftKey && (key >= Keys.DIGITS[0] && key <= Keys.DIGITS[1]):
                case (key >= Keys.NUMPAD[0] && key <= Keys.NUMPAD[1]):
                case (key >= Keys.FUNC[0] && key <= Keys.FUNC[1]):
                case key == Keys.LEFT:
                case key == Keys.RIGHT:
                case key == Keys.TAB:
                case key == Keys.BACKSPACE:
                case key == Keys.DELETE:
                case key == Keys.ENTER:
                case key == Keys.HOME:
                case key == Keys.END:
                case key == Keys.ESCAPE:
                case e.ctrlKey || e.metaKey:
                    // allowed
                    break;
                default:
                    return _cancel(e);
                    break;
            }
        }
        function _cancel(e) {
            e.preventDefault();
            return false;
        }
        Core.Components.create('wr-numeric-input', {
            static: ['maxlength', 'placeholder', 'val'],
            initialize: function (el, data) {
                return new NumericInput(el, data);
            }
        });
    })(Common = Views.Common || (Views.Common = {}));
})(Views || (Views = {}));
var Views;
(function (Views) {
    var Common;
    (function (Common) {
        Core.Components.create('wr-preset', {
            static: [],
            initialize: function (el, data) {
                if (!(data.preset instanceof Core.Preset)) {
                    data.preset = new Core.Preset(data.preset);
                }
                return data;
            }
        });
    })(Common = Views.Common || (Views.Common = {}));
})(Views || (Views = {}));
/// <reference path="../../Core/CustomElement.ts" />
/// <reference path="../../Core/Components.ts" />
var Views;
(function (Views) {
    var Common;
    (function (Common) {
        class StatusToggle extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
            get ischecked() {
                return this.getData('ischecked');
            }
            set ischecked(val) {
                this.setData('ischecked', val);
            }
        }
        StatusToggle._attributes = ['ischecked'];
        Common.StatusToggle = StatusToggle;
        Core.Components.create('wr-status-toggle', {
            static: ['on', 'off', 'ischecked'],
            initialize: function (el, data) {
                return new StatusToggle(el, data);
            }
        });
    })(Common = Views.Common || (Views.Common = {}));
})(Views || (Views = {}));
var Core;
(function (Core) {
    var Binders;
    (function (Binders) {
        class BaseBinding {
            publish() {
            }
            formattedValue(val) {
            }
        }
        Binders.BaseBinding = BaseBinding;
    })(Binders = Core.Binders || (Core.Binders = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
/// <reference path="./BaseBinding.ts" />
var Core;
(function (Core) {
    var Binders;
    (function (Binders) {
        function AttributeBinding(el, value) {
            let bindings = this.view.bindings;
            for (let i = 0, l = bindings.length; i < l; i++) {
                if (el === bindings[i].el && bindings[i].componentView) {
                    let view = bindings[i].componentView;
                    view.models = view.models || [];
                    view.models[this.type] = value;
                }
            }
            if (value) {
                el.setAttribute(this.type, value);
            }
            else {
                el.removeAttribute(this.type);
            }
        }
        Binders.AttributeBinding = AttributeBinding;
        rivets.binders['*'] = AttributeBinding;
    })(Binders = Core.Binders || (Core.Binders = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
/// <reference path="./BaseBinding.ts" />
var Core;
(function (Core) {
    var Binders;
    (function (Binders) {
        class DeepBinding extends Binders.BaseBinding {
            constructor() {
                super(...arguments);
                this.publishes = true;
                this.priority = 3000;
            }
            bind(el) {
                this.model && el.addEventListener(this.args[0] + '-change', this.publish, false);
            }
            unbind(el) {
                el.removeEventListener(this.args[0] + '-change', this.publish, false);
            }
            routine(el, value) {
                if (!this.model) {
                    return false;
                }
                el._data = el._data || {};
                el._data[this.args[0]] = this.formattedValue(value);
                el.dispatchEvent(new CustomEvent(this.args[0] + '-update'));
            }
            getValue(el) {
                return this.formattedValue(el._data ? el._data[this.args[0]] : null);
            }
        }
        Binders.DeepBinding = DeepBinding;
        rivets.binders['deep-*'] = new DeepBinding();
    })(Binders = Core.Binders || (Core.Binders = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        function FriendlyCmdShortcut(value) {
            return String(value)
                .replace(/\+/g, ' + ')
                .replace('Command', 'Cmd')
                .replace(' Arrow', '')
                || '<not set>';
        }
        Formatters.FriendlyCmdShortcut = FriendlyCmdShortcut;
        function FriendlyCmdDescription(cmd) {
            if (cmd.name === '_execute_browser_action') {
                return 'Show extension popup';
            }
            return cmd.description || cmd.shortcut;
        }
        Formatters.FriendlyCmdDescription = FriendlyCmdDescription;
        rivets.formatters['FriendlyCmdShortcut'] = FriendlyCmdShortcut;
        rivets.formatters['FriendlyCmdDescription'] = FriendlyCmdDescription;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        function FriendlyDate(value) {
            var d = new Date(`${value} +00:00`);
            return d.toLocaleString();
        }
        Formatters.FriendlyDate = FriendlyDate;
        rivets.formatters['FriendlyDate'] = FriendlyDate;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        Formatters.IntAndNull = {
            read: function (value) {
                let val = parseInt(value, 10);
                return isNaN(val) ? null : val;
            },
            publish: function (value) {
                let val = parseInt(value, 10);
                return isNaN(val) ? null : val;
            }
        };
        rivets.formatters['IntAndNull'] = Formatters.IntAndNull;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        Formatters.IntOrNull = {
            read: function (value) {
                return parseInt(value, 10) || null;
            },
            publish: function (value) {
                return parseInt(value, 10) || null;
            }
        };
        rivets.formatters['IntOrNull'] = Formatters.IntOrNull;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        function Negate(value) {
            return !value;
        }
        Formatters.Negate = Negate;
        rivets.formatters['Negate'] = Negate;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        Formatters.Nullify = {
            read: function (value) {
                return value || null;
            },
            publish: function (value) {
                return value || null;
            }
        };
        rivets.formatters['Nullify'] = Formatters.Nullify;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        function Stringify(value) {
            return JSON.stringify(value);
        }
        Formatters.Stringify = Stringify;
        rivets.formatters['Stringify'] = Stringify;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        function ToBool(value) {
            return !!value;
        }
        Formatters.ToBool = ToBool;
        function ArrayNotEmpty(value) {
            return value && value.length;
        }
        Formatters.ArrayNotEmpty = ArrayNotEmpty;
        Formatters.IntToBool = {
            read: function (value) {
                return !!value;
            },
            publish: function (value) {
                return value ? 1 : 0;
            }
        };
        rivets.formatters['ToBool'] = ToBool;
        rivets.formatters['IntToBool'] = Formatters.IntToBool;
        rivets.formatters['ArrayNotEmpty'] = ArrayNotEmpty;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
/// <reference path="../../../typings/rivets.d.ts" />
var Core;
(function (Core) {
    var Formatters;
    (function (Formatters) {
        Formatters.ToInt = {
            read: function (value) {
                return parseInt(value, 10) || 0;
            },
            publish: function (value) {
                return parseInt(value, 10) || 0;
            }
        };
        rivets.formatters['ToInt'] = Formatters.ToInt;
    })(Formatters = Core.Formatters || (Core.Formatters = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Utils;
    (function (Utils) {
        var Request;
        (function (Request) {
            function Get(url) {
                return new Promise((resolve, reject) => {
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', resolve);
                    xhr.addEventListener('error', reject);
                    xhr.addEventListener('abort', reject);
                    xhr.open('GET', url);
                    xhr.send();
                });
            }
            Request.Get = Get;
            function GetJSON(url) {
                return Get(url).then(data => Promise.resolve(JSON.parse(data.target.responseText)));
            }
            Request.GetJSON = GetJSON;
            function Post(url, data) {
                return _post(url, data).then(response => response.text());
            }
            Request.Post = Post;
            function PostJSON(url, data) {
                return _post(url, data).then(response => response.json());
            }
            Request.PostJSON = PostJSON;
            function _post(url, data) {
                let parts = [];
                for (let k in data) {
                    let name = encodeURIComponent(k);
                    let value = encodeURIComponent(data[k]);
                    parts.push(`${name}=${value}`);
                }
                const init = {
                    method: 'POST',
                    body: parts.join('&'),
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                };
                return fetch(url, init);
            }
        })(Request = Utils.Request || (Utils.Request = {}));
    })(Utils = Core.Utils || (Core.Utils = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Utils;
    (function (Utils) {
        class UniqueStack {
            constructor() {
                this._values = [];
            }
            append(value) {
                this.remove(value);
                this._values.push(value);
            }
            remove(value) {
                let existing = this._values.indexOf(value);
                (existing > -1) && this._values.splice(existing, 1);
            }
            current() {
                let last = this._values.length - 1;
                return this._values[last];
            }
        }
        Utils.UniqueStack = UniqueStack;
    })(Utils = Core.Utils || (Core.Utils = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Utils;
    (function (Utils) {
        function IsBeta() {
            const manifest = chrome.runtime.getManifest();
            const isBeta = Boolean(manifest.version_name.match(/beta/i));
            return isBeta;
        }
        Utils.IsBeta = IsBeta;
    })(Utils = Core.Utils || (Core.Utils = {}));
})(Core || (Core = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL1RlbXBsYXRlUmVnaXN0cnkudHMiLCJzcmMvY29yZS9Db21wb25lbnRzLnRzIiwic3JjL2NvcmUvQ3VzdG9tRWxlbWVudC50cyIsInNyYy9jb3JlL0RlY29yYXRvcnMvQ29tcHV0ZWRGcm9tLnRzIiwic3JjL2NvcmUvVXRpbHMvRW51bXMudHMiLCJzcmMvY29yZS9VdGlscy9VVUlELnRzIiwic3JjL2NvcmUvUHJlc2V0LnRzIiwic3JjL3ZpZXdzL2NvbW1vbi9pY29uLnRzIiwic3JjL2NvcmUvVXRpbHMvRE9NLnRzIiwic3JjL3ZpZXdzL2NvbW1vbi9Nb2RhbC50cyIsInNyYy9jb3JlL0lucHV0L0tleXMudHMiLCJzcmMvdmlld3MvY29tbW9uL251bWVyaWMtaW5wdXQudHMiLCJzcmMvdmlld3MvY29tbW9uL3ByZXNldC50cyIsInNyYy92aWV3cy9jb21tb24vc3RhdHVzLXRvZ2dsZS50cyIsInNyYy9jb3JlL0JpbmRlcnMvQmFzZUJpbmRpbmcudHMiLCJzcmMvY29yZS9CaW5kZXJzL0F0dHJpYnV0ZUJpbmRpbmcudHMiLCJzcmMvY29yZS9CaW5kZXJzL0RlZXBCaW5kaW5nLnRzIiwic3JjL2NvcmUvRm9ybWF0dGVycy9GcmllbmRseUNvbW1hbmRzLnRzIiwic3JjL2NvcmUvRm9ybWF0dGVycy9GcmllbmRseURhdGUudHMiLCJzcmMvY29yZS9Gb3JtYXR0ZXJzL0ludEFuZE51bGwudHMiLCJzcmMvY29yZS9Gb3JtYXR0ZXJzL0ludE9yTnVsbC50cyIsInNyYy9jb3JlL0Zvcm1hdHRlcnMvTmVnYXRlLnRzIiwic3JjL2NvcmUvRm9ybWF0dGVycy9OdWxsaWZ5LnRzIiwic3JjL2NvcmUvRm9ybWF0dGVycy9TdHJpbmdpZnkudHMiLCJzcmMvY29yZS9Gb3JtYXR0ZXJzL1RvQm9vbC50cyIsInNyYy9jb3JlL0Zvcm1hdHRlcnMvVG9JbnQudHMiLCJzcmMvY29yZS9VdGlscy9SZXF1ZXN0LnRzIiwic3JjL2NvcmUvVXRpbHMvVW5pcXVlU3RhY2su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LCJmaWxlIjoiY29yZS9jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9VdGlscy9EaWN0aW9uYXJpZXMudHNcIiAvPlxyXG5cclxubW9kdWxlIENvcmUge1xyXG5cdGltcG9ydCBJRGljdCA9IENvcmUuVXRpbHMuSURpY3Q7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBUZW1wbGF0ZVJlZ2lzdHJ5IHtcclxuXHRcdHN0YXRpYyBfY2FjaGU6IElEaWN0PEhUTUxFbGVtZW50PiA9IHt9O1xyXG5cclxuXHRcdHN0YXRpYyBnZXRUZW1wbGF0ZShpZDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHRpZiAoIVRlbXBsYXRlUmVnaXN0cnkuX2NhY2hlW2lkXSkge1xyXG5cdFx0XHRcdFRlbXBsYXRlUmVnaXN0cnkuX2NhY2hlW2lkXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIDxIVE1MRWxlbWVudD4gVGVtcGxhdGVSZWdpc3RyeS5fY2FjaGVbaWRdLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9UZW1wbGF0ZVJlZ2lzdHJ5LnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkNvbXBvbmVudHMge1xyXG5cdC8vIGZ1bmN0aW9uIHRlbXBsYXRlKCk6IHN0cmluZyB7XHJcblx0Ly8gXHRyZXR1cm4gQ29yZS5UZW1wbGF0ZVJlZ2lzdHJ5LmdldFRlbXBsYXRlKHRoaXMuY29tcG9uZW50Lm5hbWUpO1xyXG5cdC8vIH1cclxuXHJcblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZShlbGVtZW50OiBIVE1MRWxlbWVudCwgZGF0YTogYW55KTogYW55IHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShuYW1lOiBzdHJpbmcsIGNvbmZpZz86IGFueSk6IHJpdmV0cy5Db21wb25lbnQge1xyXG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHtcclxuXHRcdFx0bmFtZTogbnVsbCxcclxuXHRcdFx0c3RhdGljOiBudWxsLFxyXG5cdFx0XHR0ZW1wbGF0ZTogbnVsbCxcclxuXHRcdFx0aW5pdGlhbGl6ZTogbnVsbCxcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcml2ZXRzLmNvbXBvbmVudHNbbmFtZV0gPSB7XHJcblx0XHRcdG5hbWU6IG5hbWUsXHJcblx0XHRcdHN0YXRpYzogY29uZmlnLnN0YXRpYyB8fCBbXSxcclxuXHRcdFx0dGVtcGxhdGU6IGNvbmZpZy50ZW1wbGF0ZSB8fCBmdW5jdGlvbihlbCkge1xyXG5cdFx0XHRcdGVsID0gZWwgfHwgdGhpcy5lbDtcclxuXHJcblx0XHRcdFx0bGV0IGNoaWxkcmVuOiBOb2RlW10gPSBbXS5zbGljZS5jYWxsKGVsID8gZWwuY2hpbGRyZW4gOiBbXSk7XHJcblx0XHRcdFx0bGV0IHRlbXBsYXRlOiBhbnkgICAgPSBDb3JlLlRlbXBsYXRlUmVnaXN0cnkuZ2V0VGVtcGxhdGUobmFtZSk7XHJcblx0XHRcdFx0bGV0IGNvbnRlbnQ6IE5vZGUgICAgPSB0ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvbnRlbnQnKTtcclxuXHJcblx0XHRcdFx0aWYgKGNoaWxkcmVuICYmIGNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IG5vZGUgb2YgY2hpbGRyZW4pIHtcclxuXHRcdFx0XHRcdFx0Y29udGVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBjb250ZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGNvbnRlbnQgJiYgY29udGVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNvbnRlbnQpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGVtcGxhdGUuaW5uZXJIVE1MO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbml0aWFsaXplOiBjb25maWcuaW5pdGlhbGl6ZSB8fCBpbml0aWFsaXplXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgQ29yZSB7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBFbmhhbmNlZEhUTUxFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG5cdFx0X2RhdGE6IGFueTtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRfYXR0cmlidXRlczogc3RyaW5nW107XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRwcm90ZWN0ZWQgX25vZGU6IEVuaGFuY2VkSFRNTEVsZW1lbnQ7XHJcblx0XHRzdGF0aWMgX2F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xyXG5cdFx0XHRub2RlLl9kYXRhID0gbm9kZS5fZGF0YSB8fCB7fTtcclxuXHRcdFx0dGhpcy5fbm9kZSA9IG5vZGU7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG5cdFx0XHRcdGlmIChub2RlLl9kYXRhW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0bm9kZS5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpc1trZXldID0gdGhpcy5nZXREYXRhKGtleSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBzZWxmOiBJQ3VzdG9tRWxlbWVudCA9IDxhbnk+IHRoaXMuY29uc3RydWN0b3I7XHJcblx0XHRcdGZvciAobGV0IGF0dHIgb2Ygc2VsZi5fYXR0cmlidXRlcykge1xyXG5cdFx0XHRcdHRoaXMuX2xpbmtBdHRyKGF0dHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0RGF0YShrZXkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX25vZGUuX2RhdGFba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXREYXRhKGtleSwgdmFsKSB7XHJcblx0XHRcdGlmICh0aGlzLl9ub2RlLl9kYXRhW2tleV0gIT09IHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuX25vZGUuX2RhdGFba2V5XSA9IHZhbDtcclxuXHRcdFx0XHR0aGlzLl9ub2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGtleSArICctY2hhbmdlJykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0X2xpbmtBdHRyKGtleSkge1xyXG5cdFx0XHR0aGlzW2tleV0gPSB0aGlzLmdldERhdGEoa2V5KTtcclxuXHJcblx0XHRcdHRoaXMuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcihrZXkgKyAnLXVwZGF0ZScsIChlKSA9PiB7XHJcblx0XHRcdFx0dGhpc1trZXldID0gdGhpcy5nZXREYXRhKGtleSk7XHJcblx0XHRcdH0sIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCJcclxuXHJcbm1vZHVsZSBDb3JlLkRlY29yYXRvcnMge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBDb21wdXRlZEZyb20oLi4ua2V5czogc3RyaW5nW10pOiBNZXRob2REZWNvcmF0b3Ige1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIENvbXB1dGVkRnJvbSh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IGFueSk6IHZvaWQge1xyXG5cdFx0XHR0YXJnZXQuX19kZXBlbmRlbmNpZXMgPSB0YXJnZXQuX19kZXBlbmRlbmNpZXMgfHwge307XHJcblx0XHRcdHRhcmdldC5fX2RlcGVuZGVuY2llc1trZXldID0ga2V5cztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBPYnNlcnZlID0gcml2ZXRzLl8uQmluZGluZy5wcm90b3R5cGUub2JzZXJ2ZTtcclxuXHRyaXZldHMuXy5CaW5kaW5nLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24ob2JqOiBhbnksIGtleXBhdGg6IGFueSwgY2FsbGJhY2s6IGFueSk6IGFueSB7XHJcblx0XHR2YXIgcGF0aCA9IGtleXBhdGguc3BsaXQoJy4nKTtcclxuXHRcdHZhciByb290LCBwcm9wO1xyXG5cclxuXHRcdGlmIChwYXRoLmxlbmd0aCA8IDIpIHtcclxuXHRcdFx0cm9vdCA9IG9iajtcclxuXHRcdFx0cHJvcCA9IHBhdGhbMF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyb290ID0gb2JqW3BhdGhbMF1dO1xyXG5cdFx0XHRwcm9wID0gcGF0aFsxXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocm9vdCAmJiByb290Ll9fZGVwZW5kZW5jaWVzKSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmRlcGVuZGVuY2llcyA9IHRoaXMub3B0aW9ucy5kZXBlbmRlbmNpZXMgfHwgcm9vdC5fX2RlcGVuZGVuY2llc1twcm9wXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBPYnNlcnZlLmNhbGwodGhpcywgb2JqLCBrZXlwYXRoLCBjYWxsYmFjayk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5tb2R1bGUgQ29yZSB7XHJcblx0ZXhwb3J0IGVudW0gUHJlc2V0VHlwZSB7XHJcblx0XHRQSE9ORSA9IDAsXHJcblx0XHRUQUJMRVQsXHJcblx0XHRMQVBUT1AsXHJcblx0XHRERVNLVE9QXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZW51bSBQcmVzZXRUYXJnZXQge1xyXG5cdFx0V0lORE9XID0gMCxcclxuXHRcdFZJRVdQT1JUXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZW51bSBQcmVzZXRQb3NpdGlvbiB7XHJcblx0XHRERUZBVUxUID0gMCxcclxuXHRcdENVU1RPTSxcclxuXHRcdENFTlRFUlxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGVudW0gUG9wdXBJY29uU3R5bGUge1xyXG5cdFx0TU9OT0NIUk9NRSA9IDAsXHJcblx0XHRDT0xPUkVELFxyXG5cdFx0Q09OVFJBU1RcclxuXHR9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9odG1sNS5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLlV0aWxzIHtcclxuXHRleHBvcnQgZnVuY3Rpb24gVVVJRCgpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHV1aWQ6IHN0cmluZztcclxuXHRcdGxldCBieXRlcyA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMjEpKTtcclxuXHRcdGxldCBoZXhlZCA9IHZhbCA9PiAodmFsICUgMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcblx0XHRieXRlc1sxMl0gPSA0O1xyXG5cdFx0Ynl0ZXNbMTZdID0gYnl0ZXNbMTZdICYgMHgzIHwgMHg4O1xyXG5cclxuXHRcdHV1aWQgPSBBcnJheS5mcm9tKGJ5dGVzLCBoZXhlZCkuam9pbignJyk7XHJcblx0XHR1dWlkID0gdXVpZCArIERhdGUubm93KCkudG9TdHJpbmcoMTYpO1xyXG5cdFx0dXVpZCA9IHV1aWQucmVwbGFjZSgvXiguezh9KSguezR9KSguezR9KSguezR9KS8sICckMS0kMi0kMy0kNC0nKTtcclxuXHJcblx0XHRyZXR1cm4gdXVpZC50b1VwcGVyQ2FzZSgpO1xyXG5cdH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0RlY29yYXRvcnMvQ29tcHV0ZWRGcm9tLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1V0aWxzL0VudW1zLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1V0aWxzL1VVSUQudHNcIiAvPlxuXG5tb2R1bGUgQ29yZSB7XG5cdGltcG9ydCBDb21wdXRlZEZyb20gPSBDb3JlLkRlY29yYXRvcnMuQ29tcHV0ZWRGcm9tO1xuXG5cdGV4cG9ydCBjbGFzcyBQcmVzZXQge1xuXHRcdGlkOiBzdHJpbmc7XG5cdFx0d2lkdGg6IG51bWJlcjtcblx0XHRoZWlnaHQ6IG51bWJlcjtcblx0XHR0b3A6IG51bWJlcjtcblx0XHRsZWZ0OiBudW1iZXI7XG5cdFx0ZGVzY3JpcHRpb246IHN0cmluZztcblx0XHRwb3NpdGlvbjogUHJlc2V0UG9zaXRpb247XG5cdFx0dHlwZTogUHJlc2V0VHlwZTtcblx0XHR0YXJnZXQ6IFByZXNldFRhcmdldDtcblxuXHRcdGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xuXHRcdFx0dGhpcy5pZCA9IGRhdGEuaWQgfHwgQ29yZS5VdGlscy5VVUlEKCk7XG5cdFx0XHR0aGlzLndpZHRoID0gZGF0YS53aWR0aCB8fCBudWxsO1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBkYXRhLmhlaWdodCB8fCBudWxsO1xuXHRcdFx0dGhpcy50b3AgPSBpc05hTihwYXJzZUludChkYXRhLnRvcCwgMTApKSA/IG51bGwgOiBkYXRhLnRvcDtcblx0XHRcdHRoaXMubGVmdCA9IGlzTmFOKHBhcnNlSW50KGRhdGEubGVmdCwgMTApKSA/IG51bGwgOiBkYXRhLmxlZnQ7XG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbiB8fCBudWxsO1xuXHRcdFx0dGhpcy5wb3NpdGlvbiA9IGRhdGEucG9zaXRpb24gfHwgUHJlc2V0UG9zaXRpb24uREVGQVVMVDtcblx0XHRcdHRoaXMudHlwZSA9IHBhcnNlSW50KGRhdGEudHlwZSwgMTApID09IGRhdGEudHlwZSA/IGRhdGEudHlwZSA6IFByZXNldFR5cGUuREVTS1RPUDtcblx0XHRcdHRoaXMudGFyZ2V0ID0gZGF0YS50YXJnZXQgfHwgUHJlc2V0VGFyZ2V0LldJTkRPVztcblx0XHR9XG5cblx0XHRAQ29tcHV0ZWRGcm9tKCd3aWR0aCcsICdoZWlnaHQnKVxuXHRcdHRpdGxlKCkge1xuXHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgPSB0aGlzLndpZHRoICsgJyAmdGltZXM7ICcgKyB0aGlzLmhlaWdodDtcblxuXHRcdFx0aWYgKCF0aGlzLndpZHRoKSB7XG5cdFx0XHRcdHRpdGxlID0gJzxlbT5IZWlnaHQ6PC9lbT4gJyArIHRoaXMuaGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMuaGVpZ2h0KSB7XG5cdFx0XHRcdHRpdGxlID0gJzxlbT5XaWR0aDo8L2VtPiAnICsgdGhpcy53aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRpdGxlO1xuXHRcdH1cblxuXHRcdEBDb21wdXRlZEZyb20oJ3R5cGUnKVxuXHRcdGljb24oKSB7XG5cdFx0XHRsZXQgaWNvbiA9ICcnO1xuXG5cdFx0XHRzd2l0Y2ggKHRoaXMudHlwZSkge1xuXHRcdFx0XHRjYXNlIFByZXNldFR5cGUuUEhPTkUgOlxuXHRcdFx0XHRcdGljb24gPSAnI2ljb24tcGhvbmUnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIFByZXNldFR5cGUuVEFCTEVUIDpcblx0XHRcdFx0XHRpY29uID0gJyNpY29uLXRhYmxldCc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgUHJlc2V0VHlwZS5MQVBUT1AgOlxuXHRcdFx0XHRcdGljb24gPSAnI2ljb24tbGFwdG9wJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpY29uID0gJyNpY29uLWRlc2t0b3AnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGljb247XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJUHJlc2V0IHtcblx0XHRpZD86IHN0cmluZztcblx0XHR3aWR0aD86IG51bWJlcjtcblx0XHRoZWlnaHQ/OiBudW1iZXI7XG5cdFx0ZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cdFx0cG9zaXRpb24/OiBQcmVzZXRQb3NpdGlvbjtcblx0XHR0eXBlPzogUHJlc2V0VHlwZTtcblx0XHR0YXJnZXQ/OiBQcmVzZXRUYXJnZXQ7XG5cdH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vQ29yZS9DdXN0b21FbGVtZW50LnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5Db21tb24ge1xyXG5cdGV4cG9ydCBjbGFzcyBJY29uIGV4dGVuZHMgQ29yZS5DdXN0b21FbGVtZW50IHtcclxuXHRcdHN0YXRpYyBfYXR0cmlidXRlcyA9IFtdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuXHRcdFx0c3VwZXIobm9kZSwgZGF0YSk7XHJcblx0XHRcdHRoaXMuc3JjID0gZGF0YS5zcmM7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IHNyYygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgnc3JjJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0IHNyYyh2YWwpIHtcclxuXHRcdFx0dGhpcy5zZXREYXRhKCdzcmMnLCB2YWwpO1xyXG5cdFx0XHR0aGlzLl9zZXRTcmModmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIF9zZXRTcmModmFsKSB7XHJcblx0XHRcdHZhciBzdmcsIHVzZTtcclxuXHJcblx0XHRcdHN2ZyA9IHRoaXMuX25vZGUucXVlcnlTZWxlY3Rvcignc3ZnJyk7XHJcblxyXG5cdFx0XHRpZiAodmFsICYmIHZhbFswXSA9PSAnIycpIHtcclxuXHRcdFx0XHR2YWwgPSAnLi4vYXNzZXRzL2ljb25zL3Nwcml0ZS5zdmcnICsgdmFsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aGlsZSAoc3ZnLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRzdmcucmVtb3ZlQ2hpbGQoc3ZnLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsKSB7XHJcblx0XHRcdFx0dXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICd1c2UnKTtcclxuXHRcdFx0XHR1c2Uuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCAnaHJlZicsIHZhbCk7XHJcblx0XHRcdFx0c3ZnLmFwcGVuZENoaWxkKHVzZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLWljb24nLCB7XHJcblx0XHRzdGF0aWM6IFsnY2xhc3MnLCAnc3JjJ10sXHJcblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbihlbCwgZGF0YSkge1xyXG5cdFx0XHRkYXRhLnNyYyA9IGRhdGEuc3JjIHx8IGVsLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblx0XHRcdHJldHVybiBuZXcgSWNvbihlbCwgZGF0YSk7XHJcblx0XHR9XHJcblx0fSlcclxufSIsIm1vZHVsZSBDb3JlLlV0aWxzLkRPTSB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHEoc2VsZWN0b3I6IHN0cmluZyB8IEhUTUxFbGVtZW50LCBjb250ZXh0PzogRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiBzZWxlY3RvcjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gPEhUTUxFbGVtZW50PiAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3Rvcig8c3RyaW5nPiBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gcUFsbChzZWxlY3Rvcjogc3RyaW5nIHwgTm9kZUxpc3QgfCBIVE1MRWxlbWVudFtdLCBjb250ZXh0PzogRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHNlbGVjdG9yO1xyXG5cclxuXHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJlc3VsdCA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKDxzdHJpbmc+IHNlbGVjdG9yKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChyZXN1bHQpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG9uKGV2ZW50OiBzdHJpbmcsIHRhcmdldDogc3RyaW5nIHwgTm9kZSwgbGlzdGVuZXI6IEZ1bmN0aW9uLCBjYXB0dXJlPzogYm9vbGVhbikge1xyXG5cdFx0bGV0IG5vZGUgPSBxKDxIVE1MRWxlbWVudD4gdGFyZ2V0KTtcclxuXHRcdGNhcHR1cmUgPSAhIWNhcHR1cmU7XHJcblxyXG5cdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCA8RXZlbnRMaXN0ZW5lcj4gbGlzdGVuZXIsIGNhcHR1cmUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIoZXZlbnQ6IHN0cmluZywgdGFyZ2V0OiBzdHJpbmcgfCBOb2RlLCBjb25maWc/OiBhbnkpIHtcclxuXHRcdGxldCBub2RlID0gcSg8SFRNTEVsZW1lbnQ+IHRhcmdldCk7XHJcblxyXG5cdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0bm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudCwgY29uZmlnKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gcmVtb3ZlKHNlbGVjdG9yOiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY29udGV4dD86IEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRsZXQgbm9kZSA9IHEoPEhUTUxFbGVtZW50PiBzZWxlY3Rvcik7XHJcblxyXG5cdFx0bm9kZSAmJiBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGU7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3ModGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuXHRcdGxldCBub2RlID0gcSh0YXJnZXQpO1xyXG5cclxuXHRcdGlmIChub2RlKSB7XHJcblx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKHRhcmdldDogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcblx0XHRsZXQgbm9kZSA9IHEodGFyZ2V0KTtcclxuXHJcblx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyh0YXJnZXQ6IHN0cmluZyB8IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xyXG5cdFx0bGV0IG5vZGUgPSBxKHRhcmdldCk7XHJcblxyXG5cdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0bm9kZS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3ModGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuXHRcdGxldCBub2RlID0gcSh0YXJnZXQpO1xyXG5cclxuXHRcdGlmIChub2RlKSB7XHJcblx0XHRcdHJldHVybiBub2RlLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KHRhcmdldDogc3RyaW5nIHwgSFRNTEVsZW1lbnQpIHtcclxuXHRcdGxldCBub2RlID0gcSh0YXJnZXQpO1xyXG5cclxuXHRcdHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0bm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGhpZGUodGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nLCB3YWl0Rm9yPzogSFRNTEVsZW1lbnQpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIF90b2dnbGVDbGFzcyh0YXJnZXQsIGZhbHNlLCBjbGFzc05hbWUsIHdhaXRGb3IpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIHNob3codGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY2xhc3NOYW1lPzogc3RyaW5nLCB3YWl0Rm9yPzogSFRNTEVsZW1lbnQpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIF90b2dnbGVDbGFzcyh0YXJnZXQsIHRydWUsIGNsYXNzTmFtZSwgd2FpdEZvcik7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gYW5pbWF0ZSh0YXJnZXQ6IHN0cmluZyB8IEhUTUxFbGVtZW50LCBjbGFzc05hbWU/OiBzdHJpbmcsIHByb3BlcnR5TmFtZT86IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX3RvZ2dsZUNsYXNzKHRhcmdldCwgdHJ1ZSwgY2xhc3NOYW1lLCBudWxsLCBwcm9wZXJ0eU5hbWUpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2hhc1RyYW5zaXRpb24obm9kZTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdGxldCBkdXJhdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLnRyYW5zaXRpb25EdXJhdGlvbi5zcGxpdCgnLCcpO1xyXG5cclxuXHRcdGZvciAobGV0IHBhcnQgb2YgZHVyYXRpb24pIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQocGFydCkgPiAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfdG9nZ2xlQ2xhc3ModGFyZ2V0OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgc3RhdGU6IGJvb2xlYW4sIGNsYXNzTmFtZTogc3RyaW5nID0gJ3Zpc2libGUnLCB3YWl0Rm9yPzogSFRNTEVsZW1lbnQsIHByb3BlcnR5TmFtZT86IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnQ+IHtcclxuXHRcdHZhciBub2RlID0gcSh0YXJnZXQpO1xyXG5cdFx0dmFyIGFjdGlvbiA9IHN0YXRlID8gJ2FkZCcgOiAncmVtb3ZlJztcclxuXHJcblx0XHR3YWl0Rm9yID0gd2FpdEZvciB8fCBub2RlO1xyXG5cclxuXHRcdGlmICghbm9kZSkge1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghX2hhc1RyYW5zaXRpb24od2FpdEZvcikpIHtcclxuXHRcdFx0bm9kZS5jbGFzc0xpc3RbYWN0aW9uXShjbGFzc05hbWUpO1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGZ1bmN0aW9uIHRyYW5zaXRpb25FbmRlZChldnQpIHtcclxuXHRcdFx0XHRpZiAoKCFwcm9wZXJ0eU5hbWUgfHwgcHJvcGVydHlOYW1lID09PSBldnQucHJvcGVydHlOYW1lKSAmJiB3YWl0Rm9yID09PSBldnQudGFyZ2V0KSB7XHJcblx0XHRcdFx0XHR3YWl0Rm9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kZWQpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh3YWl0Rm9yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdhaXRGb3IuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRyYW5zaXRpb25FbmRlZCk7XHJcblx0XHRcdG5vZGUuY2xhc3NMaXN0W2FjdGlvbl0oY2xhc3NOYW1lKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIGV2ZW50UGF0aChldnQ6IEV2ZW50KTogSFRNTEVsZW1lbnRbXSB7XHJcblx0XHRsZXQgbm9kZTpOb2RlID0gPE5vZGU+ICg8TW91c2VFdmVudD4gZXZ0KS5yZWxhdGVkVGFyZ2V0O1xyXG5cdFx0bGV0IHBhdGg6Tm9kZVtdID0gW107XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpIHtcclxuXHRcdFx0cGF0aC5wdXNoKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiA8SFRNTEVsZW1lbnRbXT4gcGF0aDtcclxuXHR9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90YWItbmF2LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vQ29yZS9VdGlscy9ET00udHNcIiAvPlxyXG5cclxuXHJcbm1vZHVsZSBWaWV3cy5Db21tb24ge1xyXG5cdGltcG9ydCAkID0gQ29yZS5VdGlscy5ET007XHJcblxyXG5cdGNvbnN0IEtFWV9FU0MgPSAyNztcclxuXHJcblx0ZXhwb3J0IGNsYXNzIE1vZGFsTWVzc2FnZSB7XHJcblx0XHRwdWJsaWMgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0cHJpdmF0ZSBfZGlzbWlzczogRXZlbnRMaXN0ZW5lcjtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihcclxuXHRcdFx0cHVibGljIHRpdGxlOiBzdHJpbmcsXHJcblx0XHRcdHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcsXHJcblx0XHRcdHB1YmxpYyBibG9ja2luZzogYm9vbGVhbiA9IGZhbHNlLFxyXG5cdFx0XHRwdWJsaWMgYWN0aW9uczogTW9kYWxNZXNzYWdlQWN0aW9uW10gPSBbXSxcclxuXHRcdFx0cHVibGljIG9wdGlvbnM6IGFueSA9IHt9LFxyXG5cdFx0KSB7IHRoaXMuc2hvdygpOyB9XHJcblxyXG5cdFx0b25DbG9zZSA9IG5ldyBNb2RhbEV2ZW50UmVnaXN0cnkoKTtcclxuXHJcblx0XHRzaG93KCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRcdHJldHVybiAkLnNob3coZG9jdW1lbnQuYm9keSwgJ3dyX21vZGFsX3Zpc2libGUnKS50aGVuKF8gPT4ge1xyXG5cdFx0XHRcdGxldCBtb2RhbCAgPSAkLnEoJy5XUl9tb2RhbCcpO1xyXG5cdFx0XHRcdGxldCBhY3Rpb24gPSAkLnEoJy5XUl9tb2RhbF9hY3Rpb25zIC5tYWluJywgbW9kYWwpIHx8ICQucSgnLldSX21vZGFsX2FjdGlvbnMgYnV0dG9uOmxhc3QtY2hpbGQnLCBtb2RhbCk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuY2xhc3MpIHtcclxuXHRcdFx0XHRcdCQuYWRkQ2xhc3MobW9kYWwsIHRoaXMub3B0aW9ucy5jbGFzcyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhY3Rpb24gJiYgYWN0aW9uLmZvY3VzKCk7XHJcblx0XHRcdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRUYWJOYXYubGltaXRUbyhtb2RhbCk7XHJcblxyXG5cdFx0XHRcdGlmICghdGhpcy5ibG9ja2luZykge1xyXG5cdFx0XHRcdFx0dGhpcy5fZGlzbWlzcyA9IChldnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKGV2dC5rZXlDb2RlID09PSBLRVlfRVNDKSB7XHJcblx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBhY3Rpb24gb2YgdGhpcy5hY3Rpb25zKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRhY3Rpb24ub25EaXNtaXNzICYmIGFjdGlvbi5oYW5kbGVyKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLl9kaXNtaXNzKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZSgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0XHRyZXR1cm4gJC5oaWRlKGRvY3VtZW50LmJvZHksICd3cl9tb2RhbF92aXNpYmxlJywgJC5xKCcuV1JfbW9kYWwnKSkudGhlbihfID0+IHtcclxuXHRcdFx0XHR0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuX2Rpc21pc3MpO1xyXG5cdFx0XHRcdFRhYk5hdi5yZXNldCgpO1xyXG5cdFx0XHRcdHRoaXMub25DbG9zZS50cmlnZ2VyKCk7XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgTW9kYWxFdmVudEhhbmRsZXIge1xyXG5cdFx0KGRhdGE/OiBhbnkpOiBhbnk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgTW9kYWxFdmVudFJlZ2lzdHJ5IHtcclxuXHRcdHByaXZhdGUgX2hhbmRsZXJzOiBNb2RhbEV2ZW50SGFuZGxlcltdID0gW107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRcdGFkZExpc3RlbmVyKGhhbmRsZXI6IE1vZGFsRXZlbnRIYW5kbGVyKTogYm9vbGVhbiB7XHJcblx0XHRcdGxldCBoYW5kbGVycyA9IHRoaXMuX2hhbmRsZXJzO1xyXG5cdFx0XHRsZXQgZXhpc3RpbmcgPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xyXG5cclxuXHRcdFx0aWYgKGV4aXN0aW5nID4gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmVMaXN0ZW5lcihoYW5kbGVyOiBNb2RhbEV2ZW50SGFuZGxlcik6IGJvb2xlYW4ge1xyXG5cdFx0XHRsZXQgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVycztcclxuXHRcdFx0bGV0IGV4aXN0aW5nID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcclxuXHJcblx0XHRcdGlmIChleGlzdGluZyA9PT0gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGhhbmRsZXJzLnNwbGljZShleGlzdGluZywgMSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XHJcblx0XHRcdHRoaXMuX2hhbmRsZXJzID0gW107XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlcihjb250ZXh0PzogYW55LCBkYXRhPzogYW55KTogdm9pZCB7XHJcblx0XHRcdGZvciAobGV0IGhhbmRsZXIgb2YgdGhpcy5faGFuZGxlcnMpIHtcclxuXHRcdFx0XHRoYW5kbGVyLmNhbGwoY29udGV4dCwgZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgTW9kYWxNZXNzYWdlQWN0aW9uIHtcclxuXHRcdHRpdGxlOiBzdHJpbmc7XHJcblx0XHRpY29uPzogc3RyaW5nO1xyXG5cdFx0aGFuZGxlcjogRnVuY3Rpb247XHJcblx0XHRtYWluPzogYm9vbGVhbjtcclxuXHRcdG9uRGlzbWlzcz86IGJvb2xlYW47XHJcblx0fVxyXG59IiwiXHJcbm1vZHVsZSBDb3JlLklucHV0IHtcclxuXHRleHBvcnQgY29uc3QgS2V5cyA9IHtcclxuXHRcdEJBQ0tTUEFDRSA6IDgsXHJcblx0XHRUQUIgICAgICAgOiA5LFxyXG5cdFx0RU5URVIgICAgIDogMTMsXHJcblx0XHRTSElGVCAgICAgOiAxNixcclxuXHRcdEFMVCAgICAgICA6IDE4LFxyXG5cdFx0RVNDQVBFICAgIDogMjcsXHJcblx0XHRTUEFDRSAgICAgOiAzMixcclxuXHRcdEVORCAgICAgICA6IDM1LFxyXG5cdFx0SE9NRSAgICAgIDogMzYsXHJcblx0XHRMRUZUICAgICAgOiAzNyxcclxuXHRcdFVQICAgICAgICA6IDM4LFxyXG5cdFx0UklHSFQgICAgIDogMzksXHJcblx0XHRET1dOICAgICAgOiA0MCxcclxuXHRcdERFTEVURSAgICA6IDQ2LFxyXG5cdFx0QVJST1dTICAgIDogWzM3LCA0MF0sXHJcblx0XHRESUdJVFMgICAgOiBbNDgsIDU3XSxcclxuXHRcdE5VTVBBRCAgICA6IFs5NiwgMTA1XSxcclxuXHRcdEZVTkMgICAgICA6IFsxMTIsIDEyM11cclxuXHR9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vQ29yZS9DdXN0b21FbGVtZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL0NvcmUvQ29tcG9uZW50cy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9Db3JlL0lucHV0L0tleXMudHNcIiAvPlxyXG5cclxubW9kdWxlIFZpZXdzLkNvbW1vbiB7XHJcblx0aW1wb3J0IEtleXMgPSBDb3JlLklucHV0LktleXM7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBOdW1lcmljSW5wdXQgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0c3RhdGljIF9hdHRyaWJ1dGVzID0gWyd2YWwnXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcblx0XHRcdHN1cGVyKG5vZGUsIGRhdGEpO1xyXG5cclxuXHRcdFx0bm9kZS5vbmtleWRvd24gPSBmaWx0ZXJLZXlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCB2YWwoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldERhdGEoJ3ZhbCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldCB2YWwodmFsKSB7XHJcblx0XHRcdHRoaXMuc2V0RGF0YSgndmFsJywgdmFsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZpbHRlcktleXMoZSkge1xyXG5cdFx0dmFyIGtleSA9IGUua2V5Q29kZTtcclxuXHJcblx0XHRzd2l0Y2ggKHRydWUpIHtcclxuXHRcdFx0Y2FzZSAhZS5zaGlmdEtleSAmJiAoa2V5ID49IEtleXMuRElHSVRTWzBdICYmIGtleSA8PSBLZXlzLkRJR0lUU1sxXSk6XHJcblx0XHRcdGNhc2UgKGtleSA+PSBLZXlzLk5VTVBBRFswXSAmJiBrZXkgPD0gS2V5cy5OVU1QQURbMV0pOlxyXG5cdFx0XHRjYXNlIChrZXkgPj0gS2V5cy5GVU5DWzBdICYmIGtleSA8PSBLZXlzLkZVTkNbMV0pOlxyXG5cdFx0XHRjYXNlIGtleSA9PSBLZXlzLkxFRlQ6XHJcblx0XHRcdGNhc2Uga2V5ID09IEtleXMuUklHSFQ6XHJcblx0XHRcdGNhc2Uga2V5ID09IEtleXMuVEFCOlxyXG5cdFx0XHRjYXNlIGtleSA9PSBLZXlzLkJBQ0tTUEFDRTpcclxuXHRcdFx0Y2FzZSBrZXkgPT0gS2V5cy5ERUxFVEU6XHJcblx0XHRcdGNhc2Uga2V5ID09IEtleXMuRU5URVI6XHJcblx0XHRcdGNhc2Uga2V5ID09IEtleXMuSE9NRTpcclxuXHRcdFx0Y2FzZSBrZXkgPT0gS2V5cy5FTkQ6XHJcblx0XHRcdGNhc2Uga2V5ID09IEtleXMuRVNDQVBFOlxyXG5cdFx0XHRjYXNlIGUuY3RybEtleSB8fCBlLm1ldGFLZXk6XHJcblx0XHRcdFx0Ly8gYWxsb3dlZFxyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIF9jYW5jZWwoZSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2NhbmNlbChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRDb3JlLkNvbXBvbmVudHMuY3JlYXRlKCd3ci1udW1lcmljLWlucHV0Jywge1xyXG5cdFx0c3RhdGljOiBbJ21heGxlbmd0aCcsICdwbGFjZWhvbGRlcicsICd2YWwnXSxcclxuXHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uKGVsLCBkYXRhKSB7XHJcblx0XHRcdHJldHVybiBuZXcgTnVtZXJpY0lucHV0KGVsLCBkYXRhKTtcclxuXHRcdH1cclxuXHR9KVxyXG59IiwiXHJcbm1vZHVsZSBWaWV3cy5Db21tb24ge1xyXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLXByZXNldCcsIHtcclxuXHRcdHN0YXRpYzogW10sXHJcblx0XHRpbml0aWFsaXplOiBmdW5jdGlvbihlbCwgZGF0YSkge1xyXG5cdFx0XHRpZiAoIShkYXRhLnByZXNldCBpbnN0YW5jZW9mIENvcmUuUHJlc2V0KSkge1xyXG5cdFx0XHRcdGRhdGEucHJlc2V0ID0gbmV3IENvcmUuUHJlc2V0KGRhdGEucHJlc2V0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblx0fSlcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9Db3JlL0N1c3RvbUVsZW1lbnQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vQ29yZS9Db21wb25lbnRzLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5Db21tb24ge1xyXG5cdGV4cG9ydCBjbGFzcyBTdGF0dXNUb2dnbGUgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0c3RhdGljIF9hdHRyaWJ1dGVzID0gWydpc2NoZWNrZWQnXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcblx0XHRcdHN1cGVyKG5vZGUsIGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGdldCBpc2NoZWNrZWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldERhdGEoJ2lzY2hlY2tlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldCBpc2NoZWNrZWQodmFsKSB7XHJcblx0XHRcdHRoaXMuc2V0RGF0YSgnaXNjaGVja2VkJywgdmFsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLXN0YXR1cy10b2dnbGUnLCB7XHJcblx0XHRzdGF0aWM6IFsnb24nLCAnb2ZmJywgJ2lzY2hlY2tlZCddLFxyXG5cdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oZWwsIGRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTdGF0dXNUb2dnbGUoZWwsIGRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn0iLCJcclxuXHJcbm1vZHVsZSBDb3JlLkJpbmRlcnMge1xyXG5cdGV4cG9ydCBjbGFzcyBCYXNlQmluZGluZyB7XHJcblx0XHRtb2RlbDogYW55O1xyXG5cdFx0YXJnczogc3RyaW5nW107XHJcblxyXG5cdFx0cHVibGlzaCgpIHtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9ybWF0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9yaXZldHMuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0Jhc2VCaW5kaW5nLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkJpbmRlcnMge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBBdHRyaWJ1dGVCaW5kaW5nKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xyXG5cdFx0bGV0IGJpbmRpbmdzID0gdGhpcy52aWV3LmJpbmRpbmdzO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwLCBsID0gYmluZGluZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdGlmIChlbCA9PT0gYmluZGluZ3NbaV0uZWwgJiYgYmluZGluZ3NbaV0uY29tcG9uZW50Vmlldykge1xyXG5cdFx0XHRcdGxldCB2aWV3ID0gYmluZGluZ3NbaV0uY29tcG9uZW50VmlldztcclxuXHRcdFx0XHR2aWV3Lm1vZGVscyA9IHZpZXcubW9kZWxzIHx8IFtdO1xyXG5cdFx0XHRcdHZpZXcubW9kZWxzW3RoaXMudHlwZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJpdmV0cy5iaW5kZXJzWycqJ10gPSBBdHRyaWJ1dGVCaW5kaW5nO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9CYXNlQmluZGluZy50c1wiIC8+XHJcblxyXG5tb2R1bGUgQ29yZS5CaW5kZXJzIHtcclxuXHRleHBvcnQgY2xhc3MgRGVlcEJpbmRpbmcgZXh0ZW5kcyBCYXNlQmluZGluZyB7XHJcblx0XHRwdWJsaXNoZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdFx0cHJpb3JpdHk6IG51bWJlciA9IDMwMDA7XHJcblxyXG5cdFx0YmluZChlbCkge1xyXG5cdFx0XHR0aGlzLm1vZGVsICYmIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdICsgJy1jaGFuZ2UnLCB0aGlzLnB1Ymxpc2gsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHR1bmJpbmQoZWwpIHtcclxuXHRcdFx0ZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0gKyAnLWNoYW5nZScsIHRoaXMucHVibGlzaCwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJvdXRpbmUoZWwsIHZhbHVlKSB7XHJcblx0XHRcdGlmICghdGhpcy5tb2RlbCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWwuX2RhdGEgPSBlbC5fZGF0YSB8fCB7fTtcclxuXHRcdFx0ZWwuX2RhdGFbdGhpcy5hcmdzWzBdXSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xyXG5cclxuXHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodGhpcy5hcmdzWzBdICsgJy11cGRhdGUnKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0VmFsdWUoZWwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZm9ybWF0dGVkVmFsdWUoZWwuX2RhdGEgPyBlbC5fZGF0YVt0aGlzLmFyZ3NbMF1dIDogbnVsbCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyaXZldHMuYmluZGVyc1snZGVlcC0qJ10gPSBuZXcgRGVlcEJpbmRpbmcoKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkZvcm1hdHRlcnMge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBGcmllbmRseUNtZFNob3J0Y3V0KHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuXHRcdFx0LnJlcGxhY2UoL1xcKy9nLCAnICsgJylcclxuXHRcdFx0LnJlcGxhY2UoJ0NvbW1hbmQnLCAnQ21kJylcclxuXHRcdFx0LnJlcGxhY2UoJyBBcnJvdycsICcnKVxyXG5cdFx0XHR8fCAnPG5vdCBzZXQ+JztcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBGcmllbmRseUNtZERlc2NyaXB0aW9uKGNtZDogYW55KTogc3RyaW5nIHtcclxuXHRcdGlmIChjbWQubmFtZSA9PT0gJ19leGVjdXRlX2Jyb3dzZXJfYWN0aW9uJykge1xyXG5cdFx0XHRyZXR1cm4gJ1Nob3cgZXh0ZW5zaW9uIHBvcHVwJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY21kLmRlc2NyaXB0aW9uIHx8IGNtZC5zaG9ydGN1dDtcclxuXHR9XHJcblxyXG5cclxuXHRyaXZldHMuZm9ybWF0dGVyc1snRnJpZW5kbHlDbWRTaG9ydGN1dCddID0gRnJpZW5kbHlDbWRTaG9ydGN1dDtcclxuXHRyaXZldHMuZm9ybWF0dGVyc1snRnJpZW5kbHlDbWREZXNjcmlwdGlvbiddID0gRnJpZW5kbHlDbWREZXNjcmlwdGlvbjtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cblxubW9kdWxlIENvcmUuRm9ybWF0dGVycyB7XG5cdGV4cG9ydCBmdW5jdGlvbiBGcmllbmRseURhdGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0dmFyIGQgPSBuZXcgRGF0ZShgJHt2YWx1ZX0gKzAwOjAwYCk7XG5cdFx0cmV0dXJuIGQudG9Mb2NhbGVTdHJpbmcoKTtcblx0fVxuXG5cdHJpdmV0cy5mb3JtYXR0ZXJzWydGcmllbmRseURhdGUnXSA9IEZyaWVuZGx5RGF0ZTtcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9yaXZldHMuZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgQ29yZS5Gb3JtYXR0ZXJzIHtcclxuXHRleHBvcnQgY29uc3QgSW50QW5kTnVsbCA9IHtcclxuXHRcdHJlYWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdGxldCB2YWwgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xyXG5cdFx0XHRyZXR1cm4gaXNOYU4odmFsKSA/IG51bGwgOiB2YWw7XHJcblx0XHR9LFxyXG5cclxuXHRcdHB1Ymxpc2g6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdGxldCB2YWwgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xyXG5cdFx0XHRyZXR1cm4gaXNOYU4odmFsKSA/IG51bGwgOiB2YWw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyaXZldHMuZm9ybWF0dGVyc1snSW50QW5kTnVsbCddID0gSW50QW5kTnVsbDtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkZvcm1hdHRlcnMge1xyXG5cdGV4cG9ydCBjb25zdCBJbnRPck51bGwgPSB7XHJcblx0XHRyZWFkOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKSB8fCBudWxsO1xyXG5cdFx0fSxcclxuXHJcblx0XHRwdWJsaXNoOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKSB8fCBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cml2ZXRzLmZvcm1hdHRlcnNbJ0ludE9yTnVsbCddID0gSW50T3JOdWxsO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIENvcmUuRm9ybWF0dGVycyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIE5lZ2F0ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIXZhbHVlO1xyXG5cdH1cclxuXHJcblx0cml2ZXRzLmZvcm1hdHRlcnNbJ05lZ2F0ZSddID0gTmVnYXRlO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIENvcmUuRm9ybWF0dGVycyB7XHJcblx0ZXhwb3J0IGNvbnN0IE51bGxpZnkgPSB7XHJcblx0XHRyZWFkOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgfHwgbnVsbDtcclxuXHRcdH0sXHJcblxyXG5cdFx0cHVibGlzaDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIHx8IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyaXZldHMuZm9ybWF0dGVyc1snTnVsbGlmeSddID0gTnVsbGlmeTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkZvcm1hdHRlcnMge1xyXG5cdGV4cG9ydCBmdW5jdGlvbiBTdHJpbmdpZnkodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0cml2ZXRzLmZvcm1hdHRlcnNbJ1N0cmluZ2lmeSddID0gU3RyaW5naWZ5O1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3Mvcml2ZXRzLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIENvcmUuRm9ybWF0dGVycyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFRvQm9vbCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gISF2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBBcnJheU5vdEVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY29uc3QgSW50VG9Cb29sID0ge1xyXG5cdFx0cmVhZDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuICEhdmFsdWU7XHJcblx0XHR9LFxyXG5cclxuXHRcdHB1Ymxpc2g6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSA/IDEgOiAwO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cml2ZXRzLmZvcm1hdHRlcnNbJ1RvQm9vbCddID0gVG9Cb29sO1xyXG5cdHJpdmV0cy5mb3JtYXR0ZXJzWydJbnRUb0Jvb2wnXSA9IEludFRvQm9vbDtcclxuXHRyaXZldHMuZm9ybWF0dGVyc1snQXJyYXlOb3RFbXB0eSddID0gQXJyYXlOb3RFbXB0eTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBDb3JlLkZvcm1hdHRlcnMge1xyXG5cdGV4cG9ydCBjb25zdCBUb0ludCA9IHtcclxuXHRcdHJlYWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApIHx8IDA7XHJcblx0XHR9LFxyXG5cclxuXHRcdHB1Ymxpc2g6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApIHx8IDA7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyaXZldHMuZm9ybWF0dGVyc1snVG9JbnQnXSA9IFRvSW50O1xyXG59IiwiXHJcbm1vZHVsZSBDb3JlLlV0aWxzLlJlcXVlc3Qge1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gR2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVzb2x2ZSk7XHJcblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHJlamVjdCk7XHJcblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIHJlamVjdCk7XHJcblx0XHRcdHhoci5vcGVuKCdHRVQnLCB1cmwpO1xyXG5cdFx0XHR4aHIuc2VuZCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gR2V0SlNPTih1cmw6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gR2V0KHVybCkudGhlbihkYXRhID0+IFByb21pc2UucmVzb2x2ZShKU09OLnBhcnNlKGRhdGEudGFyZ2V0LnJlc3BvbnNlVGV4dCkpKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBQb3N0KHVybDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIF9wb3N0KHVybCwgZGF0YSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFBvc3RKU09OKHVybDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIF9wb3N0KHVybCwgZGF0YSkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX3Bvc3QodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcGFydHMgPSBbXTtcclxuXHRcdGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG5cdFx0XHRsZXQgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChrKTtcclxuXHRcdFx0bGV0IHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFba10pO1xyXG5cdFx0XHRwYXJ0cy5wdXNoKGAke25hbWV9PSR7dmFsdWV9YCk7XHJcblx0XHR9XHJcblx0XHRjb25zdCBpbml0ID0ge1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0Ym9keTogcGFydHMuam9pbignJicpLFxyXG5cdFx0XHRoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIn1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIGZldGNoKHVybCwgaW5pdCk7XHJcblx0fVxyXG59IiwibW9kdWxlIENvcmUuVXRpbHMge1xyXG5cdGV4cG9ydCBjbGFzcyBVbmlxdWVTdGFjayB7XHJcblx0XHRwcml2YXRlIF92YWx1ZXMgPSBbXTtcclxuXHJcblx0XHRwdWJsaWMgYXBwZW5kKHZhbHVlKSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlKHZhbHVlKTtcclxuXHRcdFx0dGhpcy5fdmFsdWVzLnB1c2godmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyByZW1vdmUodmFsdWUpIHtcclxuXHRcdFx0bGV0IGV4aXN0aW5nID0gdGhpcy5fdmFsdWVzLmluZGV4T2YodmFsdWUpO1xyXG5cdFx0XHQoZXhpc3RpbmcgPiAtMSkgJiYgdGhpcy5fdmFsdWVzLnNwbGljZShleGlzdGluZywgMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIGN1cnJlbnQoKSB7XHJcblx0XHRcdGxldCBsYXN0ID0gdGhpcy5fdmFsdWVzLmxlbmd0aCAtIDE7XHJcblx0XHRcdHJldHVybiB0aGlzLl92YWx1ZXNbbGFzdF07XHJcblx0XHR9XHJcblx0fVxyXG59IiwibW9kdWxlIENvcmUuVXRpbHMge1xuXHRleHBvcnQgZnVuY3Rpb24gSXNCZXRhKCk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IG1hbmlmZXN0OiBhbnkgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuXHRcdGNvbnN0IGlzQmV0YTogYm9vbGVhbiA9IEJvb2xlYW4obWFuaWZlc3QudmVyc2lvbl9uYW1lLm1hdGNoKC9iZXRhL2kpKTtcblxuXHRcdHJldHVybiBpc0JldGE7XG5cdH1cbn0iXX0=
