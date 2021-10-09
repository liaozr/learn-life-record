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
var ResizerAPI;
(function (ResizerAPI) {
    var Tooltip;
    (function (Tooltip) {
        function _message(tabId, message) {
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, message, answer => resolve(chrome.runtime.lastError ? null : answer));
            });
        }
        Tooltip.HIDDEN = 'HIDDEN';
        Tooltip.VISIBLE = 'VISIBLE';
        function Enable(tabId) {
            return new Promise((resolve, reject) => {
                chrome.tabs.executeScript(tabId, { file: 'scripts/enable-tooltip.js' }, result => resolve(!chrome.runtime.lastError));
            });
        }
        Tooltip.Enable = Enable;
        function Disable(tabId) {
            return _message(tabId, 'DISABLE');
        }
        Tooltip.Disable = Disable;
        function GetStatus(tabId) {
            return _message(tabId, 'STATUS');
        }
        Tooltip.GetStatus = GetStatus;
        function Show(tabId) {
            return _message(tabId, 'SHOW');
        }
        Tooltip.Show = Show;
        function Hide(tabId) {
            return _message(tabId, 'HIDE');
        }
        Tooltip.Hide = Hide;
        function Toggle(tabId) {
            return _message(tabId, 'STATUS').then(status => {
                if (status === null) {
                    return Tooltip.Enable(tabId).then(result => {
                        setTimeout(() => Tooltip.Show(tabId), 100);
                        return result;
                    });
                }
                return _message(tabId, 'TOGGLE');
            });
        }
        Tooltip.Toggle = Toggle;
        function SetTimeout(tabId, timeout) {
            return _message(tabId, { command: 'SET_HIDE_DELAY', delay: timeout });
        }
        Tooltip.SetTimeout = SetTimeout;
        function EnableOnAllPages() {
            if (chrome.webNavigation && !chrome.webNavigation.onDOMContentLoaded.hasListener(enableOnNewTabs)) {
                chrome.webNavigation.onDOMContentLoaded.addListener(enableOnNewTabs);
            }
            chrome.tabs.query({}, tabs => {
                for (let tab of tabs) {
                    Enable(tab.id);
                }
            });
        }
        Tooltip.EnableOnAllPages = EnableOnAllPages;
        function DisableOnAllPages() {
            if (chrome.webNavigation) {
                while (chrome.webNavigation.onDOMContentLoaded.hasListener(enableOnNewTabs)) {
                    chrome.webNavigation.onDOMContentLoaded.removeListener(enableOnNewTabs);
                }
            }
            chrome.tabs.query({}, tabs => {
                for (let tab of tabs) {
                    Disable(tab.id);
                }
            });
        }
        Tooltip.DisableOnAllPages = DisableOnAllPages;
        function enableOnNewTabs(details) {
            if (details.tabId && !details.frameId) {
                Enable(details.tabId);
            }
        }
    })(Tooltip = ResizerAPI.Tooltip || (ResizerAPI.Tooltip = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var Settings;
    (function (Settings) {
        var PresetType = Core.PresetType;
        var PresetTarget = Core.PresetTarget;
        var PresetPosition = Core.PresetPosition;
        Settings.DefaultSettings = {
            alwaysCenterTheWindow: false,
            leftAlignWindow: false,
            alwaysShowTheTooltip: false,
            hideTooltipDelay: 3000,
            tooltipPosition: ['bottom', 'right'],
            popupIconStyle: 'dark+color',
            presetsIconsStyle: 'clear',
            alternatePresetsBg: false,
            autoClosePopup: false,
            presetsPrimaryLine: '',
            hidePresetsDescription: false,
            hidePopupTooltips: false,
            hideQuickResize: false,
            originalInstallDate: null,
            license: null,
            presets: []
        };
        function _getStore(local = false, force = false) {
            let store = local ? chrome.storage.local : chrome.storage.sync;
            if (force) {
                return Promise.resolve(store);
            }
            return new Promise((resolve, reject) => {
                chrome.storage.local.get({ disableSync: false }, settings => {
                    if (chrome.runtime.lastError) {
                        return reject(chrome.runtime.lastError);
                    }
                    let store = local || settings.disableSync ? chrome.storage.local : chrome.storage.sync;
                    resolve(store);
                });
            });
        }
        function _getLicense() {
            return new Promise((resolve, reject) => {
                return _getStore(false, true).then(store => {
                    store.get({ license: null }, data => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(data.license);
                    });
                });
            });
        }
        function Set(key, value, local = false) {
            let data = _normalize(key, value);
            if ('license' in data) {
                _getStore(false, true).then(store => {
                    store.set({ license: data.license });
                });
            }
            return _getStore(local).then(store => {
                return new Promise((resolve, reject) => {
                    store.set(data, () => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(data);
                    });
                });
            });
        }
        Settings.Set = Set;
        function Get(key, defaultValue, local = false) {
            let keys = _normalize(key, defaultValue);
            return _getLicense().then(license => _getStore(local).then(store => {
                return new Promise((resolve, reject) => {
                    store.get(keys, settings => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        settings.license = license;
                        if (typeof (key) === 'string') {
                            return resolve(settings[key]);
                        }
                        for (let k in Settings.DefaultSettings) {
                            if (!(k in settings)) {
                                settings[k] = Settings.DefaultSettings[k];
                            }
                        }
                        return resolve(settings);
                    });
                });
            }));
        }
        Settings.Get = Get;
        function Del(key, local = false) {
            let keys = (key instanceof Array) ? key : [key];
            return _getStore(local).then(store => {
                return new Promise((resolve, reject) => {
                    store.remove(keys, () => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        return resolve();
                    });
                });
            });
        }
        Settings.Del = Del;
        function _normalize(key, defaultValue) {
            let keys = {};
            if (typeof (key) === 'string') {
                if (defaultValue === undefined) {
                    defaultValue = Settings.DefaultSettings[key];
                }
                keys[key] = defaultValue;
            }
            else {
                keys = key;
            }
            return keys;
        }
        function _handler(resolve, reject) {
            return function (data) {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(data);
            };
        }
        function ParseV1(data) {
            if (!data) {
                return;
            }
            let settings = {};
            let presets = JSON.parse(data['WindowResizer.Rows']);
            settings.alwaysShowTheTooltip = data['WindowResizer.Tooltip'] != 1;
            settings.hideTooltipDelay = parseInt(data['WindowResizer.TooltipDelay'], 10) || Settings.DefaultSettings.hideTooltipDelay;
            settings.hidePresetsDescription = data['WindowResizer.PopupDescription'] == 1;
            settings.presets = [];
            for (let preset of presets) {
                settings.presets.push({
                    id: Core.Utils.UUID(),
                    width: _parseNumber(preset.width),
                    height: _parseNumber(preset.height),
                    top: _parseNumber(preset.Y),
                    left: _parseNumber(preset.X),
                    description: preset.title || null,
                    position: _parsePosition(preset.pos),
                    type: _parseType(preset.type),
                    target: _parseTarget(preset.target)
                });
            }
            return settings;
            function _parseNumber(value) {
                return parseInt(value, 10) || null;
            }
            function _parseTarget(value) {
                return value == 'window' ? PresetTarget.WINDOW : PresetTarget.VIEWPORT;
            }
            function _parsePosition(value) {
                let pos = parseInt(value, 10) || 0;
                switch (pos) {
                    case 1: return PresetPosition.CUSTOM;
                    case 3: return PresetPosition.CENTER;
                }
                return PresetPosition.DEFAULT;
            }
            function _parseType(value) {
                switch (value) {
                    case 'desktop': return PresetType.DESKTOP;
                    case 'laptop': return PresetType.LAPTOP;
                    case 'tablet': return PresetType.TABLET;
                    case 'smartphone': return PresetType.PHONE;
                    case 'featurephone': return PresetType.PHONE;
                }
                return PresetType.DESKTOP;
            }
        }
        Settings.ParseV1 = ParseV1;
        Settings.DefaultSettings.presets.push({
            id: 'D482CEBD-12DC-457D-8FCF-B15226DFEDD8',
            width: 320,
            height: 568,
            target: Core.PresetTarget.VIEWPORT,
            description: 'iPhone 5',
            type: Core.PresetType.PHONE
        });
        Settings.DefaultSettings.presets.push({
            id: 'A1D7D065-33B0-44BD-8F20-A15226DFF237',
            width: 375,
            height: 667,
            target: Core.PresetTarget.VIEWPORT,
            description: 'iPhone 6',
            type: Core.PresetType.PHONE
        });
        Settings.DefaultSettings.presets.push({
            id: 'FF3DE6CD-F560-4576-811F-E15226DFF45F',
            width: 1024,
            height: 768,
            target: Core.PresetTarget.VIEWPORT,
            description: 'iPad',
            type: Core.PresetType.TABLET
        });
        Settings.DefaultSettings.presets.push({
            id: '27ACDD9C-9A94-44F8-B333-C15226DFF5FF',
            width: 1440,
            height: 900,
            target: Core.PresetTarget.WINDOW,
            description: 'Laptop',
            type: Core.PresetType.LAPTOP
        });
        Settings.DefaultSettings.presets.push({
            id: '2256E7AD-B7BA-40B7-9969-415226DFF817',
            width: 1680,
            height: 1050,
            target: Core.PresetTarget.WINDOW,
            description: 'Desktop',
            type: Core.PresetType.DESKTOP
        });
        Settings.DefaultSettings.presets.push({
            id: '2256E7AD-B7BA-40B7-9969-415226DFF818',
            width: 1920,
            height: 1080,
            target: Core.PresetTarget.WINDOW,
            description: 'Desktop',
            type: Core.PresetType.DESKTOP
        });
        Settings.DefaultSettings.presets.push({
            id: 'C76F48DB-B2D2-4DEA-B35D-6152606F883D',
            width: 2560,
            height: 1440,
            target: Core.PresetTarget.WINDOW,
            description: 'Desktop',
            type: Core.PresetType.DESKTOP
        });
    })(Settings = ResizerAPI.Settings || (ResizerAPI.Settings = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var SettingsPage;
    (function (SettingsPage) {
        let currentPage = null;
        function Open(page = null) {
            page = page || '#settings';
            currentPage = page;
            return new Promise((resolve, reject) => {
                chrome.runtime.openOptionsPage(() => {
                    chrome.runtime.sendMessage({ showPage: page }, resolve);
                    return true;
                });
            });
        }
        SettingsPage.Open = Open;
        function Current() {
            return Promise.resolve(currentPage);
        }
        SettingsPage.Current = Current;
    })(SettingsPage = ResizerAPI.SettingsPage || (ResizerAPI.SettingsPage = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var Chrome;
    (function (Chrome) {
        var Windows;
        (function (Windows) {
            Windows.NONE = chrome.windows.WINDOW_ID_NONE;
            function Get(winId, config) {
                config = config || { populate: true };
                return new Promise((resolve, reject) => {
                    chrome.windows.get(winId, config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Windows.Get = Get;
            function All(config) {
                return new Promise((resolve, reject) => {
                    chrome.windows.getAll(config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Windows.All = All;
            function Create(config) {
                return new Promise((resolve, reject) => {
                    chrome.windows.create(config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Windows.Create = Create;
            function CreatePopup(url, config = {}) {
                config.url = url;
                config.type = 'popup';
                return Create(config);
            }
            Windows.CreatePopup = CreatePopup;
            function Update(winId, config) {
                return new Promise((resolve, reject) => {
                    chrome.windows.update(winId, config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Windows.Update = Update;
            function On(name, callback) {
                let event = chrome.windows['on' + name];
                event && !event.hasListener(callback) && event.addListener(callback);
            }
            Windows.On = On;
            function Off(name, callback) {
                let event = chrome.windows['on' + name];
                event && event.removeListener(callback);
            }
            Windows.Off = Off;
        })(Windows = Chrome.Windows || (Chrome.Windows = {}));
    })(Chrome = ResizerAPI.Chrome || (ResizerAPI.Chrome = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var Chrome;
    (function (Chrome) {
        var Tabs;
        (function (Tabs) {
            function Query(filter = {}) {
                return new Promise((resolve, reject) => {
                    function _done(tabs) {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        if (!(tabs instanceof Array)) {
                            tabs = [tabs];
                        }
                        resolve(tabs);
                    }
                    if (typeof filter === 'number') {
                        chrome.tabs.get(filter, _done);
                    }
                    else {
                        chrome.tabs.query(filter, _done);
                    }
                });
            }
            Tabs.Query = Query;
            function GetActive(winId) {
                let filter = {
                    active: true,
                    windowId: winId
                };
                return new Promise((resolve, reject) => {
                    chrome.tabs.query(filter, tabs => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(tabs[0]);
                    });
                });
            }
            Tabs.GetActive = GetActive;
            function Create(config) {
                return new Promise((resolve, reject) => {
                    chrome.windows.create(config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Tabs.Create = Create;
            function CreatePopup(url, config) {
                config.url = url;
                config.type = 'popup';
                return Create(config);
            }
            Tabs.CreatePopup = CreatePopup;
            function Update(winId, config) {
                return new Promise((resolve, reject) => {
                    chrome.windows.update(winId, config, win => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(win);
                    });
                });
            }
            Tabs.Update = Update;
            function Duplicate(tabId) {
                return new Promise((resolve, reject) => {
                    chrome.tabs.duplicate(tabId, tab => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(tab);
                    });
                });
            }
            Tabs.Duplicate = Duplicate;
            function GetZoom(tabId) {
                return new Promise((resolve, reject) => {
                    chrome.tabs.getZoom(tabId, zoom => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(zoom);
                    });
                });
            }
            Tabs.GetZoom = GetZoom;
        })(Tabs = Chrome.Tabs || (Chrome.Tabs = {}));
    })(Chrome = ResizerAPI.Chrome || (ResizerAPI.Chrome = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var Chrome;
    (function (Chrome) {
        var Runtime;
        (function (Runtime) {
            function Error() {
                return chrome.runtime.lastError;
            }
            Runtime.Error = Error;
            function Broadcast(message) {
                return new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage(message, response => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(response);
                    });
                });
            }
            Runtime.Broadcast = Broadcast;
            function On(name, callback) {
                let event = chrome.runtime['on' + name];
                event && !event.hasListener(callback) && event.addListener(callback);
            }
            Runtime.On = On;
            function Off(name, callback) {
                let event = chrome.runtime['on' + name];
                event && event.removeListener(callback);
            }
            Runtime.Off = Off;
        })(Runtime = Chrome.Runtime || (Chrome.Runtime = {}));
    })(Chrome = ResizerAPI.Chrome || (ResizerAPI.Chrome = {}));
})(ResizerAPI || (ResizerAPI = {}));
var ResizerAPI;
(function (ResizerAPI) {
    var Chrome;
    (function (Chrome) {
        var ContextMenus;
        (function (ContextMenus) {
            function Create(config) {
                return new Promise((resolve, reject) => {
                    chrome.contextMenus.create(config, () => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve();
                    });
                });
            }
            ContextMenus.Create = Create;
            function Update(itemId, config) {
                return new Promise((resolve, reject) => {
                    chrome.contextMenus.update(itemId, config, () => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve();
                    });
                });
            }
            ContextMenus.Update = Update;
            function Remove(itemId) {
                return new Promise((resolve, reject) => {
                    chrome.contextMenus.remove(itemId, () => {
                        if (chrome.runtime.lastError) {
                            return reject(chrome.runtime.lastError);
                        }
                        resolve();
                    });
                });
            }
            ContextMenus.Remove = Remove;
            function On(name, callback) {
                let event = chrome.contextMenus['on' + name];
                event && !event.hasListener(callback) && event.addListener(callback);
            }
            ContextMenus.On = On;
            function Off(name, callback) {
                let event = chrome.contextMenus['on' + name];
                event && event.removeListener(callback);
            }
            ContextMenus.Off = Off;
        })(ContextMenus = Chrome.ContextMenus || (Chrome.ContextMenus = {}));
    })(Chrome = ResizerAPI.Chrome || (ResizerAPI.Chrome = {}));
})(ResizerAPI || (ResizerAPI = {}));
/// <reference path="../../ResizerAPI/Chrome/Windows.ts" />
/// <reference path="../../ResizerAPI/Chrome/Tabs.ts" />
var ToolsPopup;
(function (ToolsPopup) {
    var Windows = ResizerAPI.Chrome.Windows;
    let _ID = null;
    function ID() {
        return _ID;
    }
    ToolsPopup.ID = ID;
    function Open() {
        let config = {
            url: 'views/popup.html#popup-view',
            type: 'popup',
            width: 360,
            height: 420
        };
        return Windows.Create(config).then(win => {
            _ID = win.id;
            Windows.On('Removed', _OnClose);
            return win;
        });
    }
    ToolsPopup.Open = Open;
    function Focus() {
        return Windows.Update(_ID, { focused: true });
    }
    ToolsPopup.Focus = Focus;
    function Blur() {
        return Windows.Update(_ID, { focused: false });
    }
    ToolsPopup.Blur = Blur;
    function AttachTo(mainWindow) {
        let focusPopup = _ID ? Focus() : Open();
        let newPosition = {
            top: mainWindow.top,
            left: mainWindow.left + mainWindow.width
        };
        return focusPopup.then(win => Windows.Update(win.id, newPosition));
    }
    ToolsPopup.AttachTo = AttachTo;
    function _OnClose(winId) {
        if (winId === _ID) {
            _ID = null;
            Windows.Off('Removed', _OnClose);
        }
    }
})(ToolsPopup || (ToolsPopup = {}));
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
/// <reference path="../../Core/Utils/UniqueStack.ts" />
/// <reference path="../../ResizerAPI/Chrome/Windows.ts" />
/// <reference path="./ToolsPopup.ts" />
var WindowsStack;
(function (WindowsStack) {
    var Windows = ResizerAPI.Chrome.Windows;
    let winStack = new Core.Utils.UniqueStack();
    function Current() {
        return winStack.current();
    }
    WindowsStack.Current = Current;
    function Append(winId) {
        return winStack.append(winId);
    }
    WindowsStack.Append = Append;
    function Remove(winId) {
        return winStack.remove(winId);
    }
    WindowsStack.Remove = Remove;
    function Init() {
        Windows.On('FocusChanged', winId => {
            if (winId === Windows.NONE || winId === ToolsPopup.ID()) {
                return;
            }
            winStack.append(winId);
        });
        Windows.On('Removed', winId => {
            winStack.remove(winId);
        });
        Windows.All().then(windows => {
            let focused = 0;
            for (let win of windows) {
                win.focused && (focused = win.id);
                winStack.append(win.id);
            }
            focused && winStack.append(focused);
        });
    }
    WindowsStack.Init = Init;
})(WindowsStack || (WindowsStack = {}));
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
/// <reference path="../../Core/Utils/Request.ts" />
/// <reference path="../../Core/Utils/Utils.ts" />
/// <reference path="../../ResizerAPI/Settings.ts" />
var Banner;
(function (Banner) {
    var Settings = ResizerAPI.Settings;
    var Request = Core.Utils.Request;
    var Utils = Core.Utils;
    function Get(id) {
        let license;
        return Settings.Get('license', false).then(details => {
            license = details;
            return Settings.Get('bannerHidden', null, true);
        }).then(hidden => {
            let timestamp = hidden ? (new Date(hidden)).getTime() : 0;
            let stayHidden = 2 * 24 * 3600 * 1000; // every 2 days
            // only show the banner once a week for non-Pro and non-Beta users
            if (license || Utils.IsBeta() || timestamp + stayHidden > Date.now()) {
                return Promise.resolve(null);
            }
            return Request.GetJSON('assets/affiliates/banners.json').then((banners) => {
                banners = banners.filter(banner => banner.enabled);
                if (id === undefined) {
                    id = Math.floor(Math.random() * banners.length);
                }
                return Promise.resolve(banners[id]);
            });
        });
    }
    Banner.Get = Get;
    function Status() {
        return Settings.Get('bannerHidden', null, true);
    }
    Banner.Status = Status;
    function Hide() {
        return Settings.Get('bannerHidden', null, true).then(hidden => {
            Settings.Set('bannerHidden', _today(), true);
            return Promise.resolve(!hidden);
        });
    }
    Banner.Hide = Hide;
    function _today() {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
})(Banner || (Banner = {}));
/// <reference path="../../ResizerAPI/Settings.ts" />
var CyclePresets;
(function (CyclePresets) {
    var Settings = ResizerAPI.Settings;
    let previous = -1;
    function GetNext() {
        return _getPreset(1);
    }
    CyclePresets.GetNext = GetNext;
    function GetPrev() {
        return _getPreset(-1);
    }
    CyclePresets.GetPrev = GetPrev;
    function _getPreset(direction) {
        return Settings.Get('presets').then(presets => {
            previous = (previous + direction + presets.length) % presets.length;
            return Promise.resolve(presets[previous]);
        });
    }
})(CyclePresets || (CyclePresets = {}));
var Updater;
(function (Updater) {
    var Runtime = ResizerAPI.Chrome.Runtime;
    var Settings = ResizerAPI.Settings;
    function Init() {
        chrome.runtime.setUninstallURL('http://coolx10.com/window-resizer/good-bye.php');
        Runtime.On('Installed', details => {
            Settings.Get('originalInstallDate').then(originalInstallDate => {
                if (!originalInstallDate) {
                    Settings.Set('originalInstallDate', Date.now());
                }
            });
            switch (details.reason) {
                case 'install':
                    Settings.Get('presets').then(presets => {
                        !presets && Background.SaveSettings(Settings.DefaultSettings);
                    });
                    chrome.tabs.create({
                        url: 'http://coolx10.com/window-resizer/welcome.php',
                        active: true
                    });
                    break;
                case 'update':
                    let previousVersion = parseInt(details.previousVersion);
                    // if (details.previousVersion.match(/^2\.5/)) {
                    // 	break;
                    // }
                    if (previousVersion == 1) {
                        // import settings from 1.x.x versions
                        let oldSettings = Settings.ParseV1(window.localStorage);
                        Background.SaveSettings(oldSettings);
                        window.localStorage.clear();
                    }
                    Settings.Get({ 'useMonochromeIcon': null }).then(old => {
                        if (old.useMonochromeIcon !== null) {
                            Settings.Del('useMonochromeIcon');
                            Settings.Set('popupIconStyle', 0);
                        }
                    });
                    window.localStorage['wasUpdated'] = previousVersion;
                    ShowBadge();
                    break;
            }
        });
        if (window.localStorage['wasUpdated']) {
            ShowBadge();
        }
    }
    Updater.Init = Init;
    function ShowBadge() {
        chrome.browserAction.setBadgeText({ text: 'new' });
        chrome.browserAction.setBadgeBackgroundColor({ color: '#77c35a' });
    }
    Updater.ShowBadge = ShowBadge;
    function HideBadge() {
        chrome.browserAction.setBadgeText({ text: '' });
    }
    Updater.HideBadge = HideBadge;
})(Updater || (Updater = {}));
/// <reference path="../../typings/ExtAPI.d.ts" />
/// <reference path="../Core/Utils/Enums.ts" />
/// <reference path="../Core/Utils/UUID.ts" />
/// <reference path="../Core/Utils/Request.ts" />
/// <reference path="../ResizerAPI/Tooltip.ts" />
/// <reference path="../ResizerAPI/Settings.ts" />
/// <reference path="../ResizerAPI/SettingsPage.ts" />
/// <reference path="../ResizerAPI/Chrome/Windows.ts" />
/// <reference path="../ResizerAPI/Chrome/Tabs.ts" />
/// <reference path="../ResizerAPI/Chrome/Runtime.ts" />
/// <reference path="../ResizerAPI/Chrome/ContextMenus.ts" />
/// <reference path="./background/ToolsPopup.ts" />
/// <reference path="./background/WindowsStack.ts" />
/// <reference path="./background/Banner.ts" />
/// <reference path="./background/CyclePresets.ts" />
/// <reference path="./background/Updater.ts" />
var Background;
(function (Background) {
    var EndpointVisibility = ExtAPI.Router.EndpointVisibility;
    var PresetTarget = Core.PresetTarget;
    var PresetPosition = Core.PresetPosition;
    var Tooltip = ResizerAPI.Tooltip;
    var Windows = ResizerAPI.Chrome.Windows;
    var Tabs = ResizerAPI.Chrome.Tabs;
    var Runtime = ResizerAPI.Chrome.Runtime;
    var ContextMenus = ResizerAPI.Chrome.ContextMenus;
    var Settings = ResizerAPI.Settings;
    var SettingsPage = ResizerAPI.SettingsPage;
    var Request = Core.Utils.Request;
    ExtAPI.init();
    ExtAPI.register({
        action: 'resize',
        visibility: EndpointVisibility.Public,
        handler: Resize
    });
    ExtAPI.register({
        action: 'open-url',
        visibility: EndpointVisibility.Private,
        handler: OpenUrl
    });
    ExtAPI.register({
        action: 'open-as-popup',
        visibility: EndpointVisibility.Private,
        handler: OpenAsPopup
    });
    ExtAPI.register({
        action: 'get-banner',
        visibility: EndpointVisibility.Private,
        handler: Banner.Get
    });
    ExtAPI.register({
        action: 'hide-banner',
        visibility: EndpointVisibility.Private,
        handler: Banner.Hide
    });
    ExtAPI.register({
        action: 'get-banner-status',
        visibility: EndpointVisibility.Private,
        handler: Banner.Status
    });
    ExtAPI.register({
        action: 'rotate-viewport',
        visibility: EndpointVisibility.Private,
        handler: RotateViewport
    });
    ExtAPI.register({
        action: 'open-settings',
        visibility: EndpointVisibility.Private,
        handler: OpenSettings
    });
    ExtAPI.register({
        action: 'open-presets-settings',
        visibility: EndpointVisibility.Private,
        handler: OpenPresetsSettings
    });
    ExtAPI.register({
        action: 'open-release-notes',
        visibility: EndpointVisibility.Private,
        handler: OpenReleaseNotes
    });
    ExtAPI.register({
        action: 'open-pro-page',
        visibility: EndpointVisibility.Private,
        handler: OpenProPage
    });
    ExtAPI.register({
        action: 'toggle-tooltip',
        visibility: EndpointVisibility.Private,
        handler: ToggleTooltip
    });
    ExtAPI.register({
        action: 'tooltip-hide-delay',
        visibility: EndpointVisibility.Private,
        handler: GetTooltipHideDelay
    });
    ExtAPI.register({
        action: 'tooltip-position',
        visibility: EndpointVisibility.Private,
        handler: GetTooltipPosition
    });
    ExtAPI.register({
        action: 'get-zoom',
        visibility: EndpointVisibility.Private,
        handler: GetZoom
    });
    ExtAPI.register({
        action: 'limit-popup',
        visibility: EndpointVisibility.Private,
        handler: LimitPopup
    });
    ExtAPI.register({
        action: 'get-presets',
        visibility: EndpointVisibility.Private,
        handler: GetPresets
    });
    ExtAPI.register({
        action: 'save-preset',
        visibility: EndpointVisibility.Private,
        handler: SavePreset
    });
    ExtAPI.register({
        action: 'get-sync-status',
        visibility: EndpointVisibility.Private,
        handler: GetSyncStatus
    });
    ExtAPI.register({
        action: 'toggle-sync',
        visibility: EndpointVisibility.Private,
        handler: ToggleSync
    });
    ExtAPI.register({
        action: 'default-settings',
        visibility: EndpointVisibility.Private,
        handler: GetDefaultSettings
    });
    ExtAPI.register({
        action: 'get-settings',
        visibility: EndpointVisibility.Private,
        handler: GetSettings
    });
    ExtAPI.register({
        action: 'save-settings',
        visibility: EndpointVisibility.Private,
        handler: SaveSettings
    });
    ExtAPI.register({
        action: 'import-settings',
        visibility: EndpointVisibility.Private,
        handler: ImportSettings
    });
    ExtAPI.register({
        action: 'settings:requested-page',
        visibility: EndpointVisibility.Private,
        handler: SettingsGetRequestedPage
    });
    ExtAPI.register({
        action: 'pro:checkout-url',
        visibility: EndpointVisibility.Private,
        handler: ProCheckoutUrl
    });
    ExtAPI.register({
        action: 'pro:activate-license',
        visibility: EndpointVisibility.Private,
        handler: ProActivateLicense
    });
    ExtAPI.register({
        action: '_debug',
        visibility: EndpointVisibility.Private,
        handler: _DEBUG
    });
    WindowsStack.Init();
    Updater.Init();
    function ProCheckoutUrl(params, sender) {
        return Request.PostJSON('https://coolx10.com/window-resizer/pro/checkout-url', { price: params.price });
    }
    function ProActivateLicense(params, sender) {
        return Request.PostJSON('https://coolx10.com/window-resizer/pro/activate-license', { key: params.key }).then(response => {
            if (!response.error) {
                return SaveSettings({ license: response.data });
            }
            return Promise.resolve(response);
        });
    }
    function _DEBUG(data) {
        console.log(data);
        return Promise.resolve(true);
    }
    function OpenUrl(params) {
        return Tabs.Create({ url: params.url });
    }
    chrome.commands.onCommand.addListener((command) => {
        switch (command) {
            case 'a-manual-tooltip-toggle':
                ToggleTooltip().catch(err => {
                    if (err.INVALID_PROTOCOL) {
                        alert('This feature only works on pages loaded using one of the "http://", "https://" or "file://" protocols!');
                    }
                    if (err.WEBSTORE_PERMISSION) {
                        alert('This feature doesn\'t work on this tab because extensions are not allowed to alter the Webstore pages!');
                    }
                });
                break;
            case 'b-rotate-viewport':
                RotateViewport();
                break;
            case 'c-cycle-presets':
                CyclePresets.GetNext().then(Resize);
                break;
            case 'd-cycle-presets-reverse':
                CyclePresets.GetPrev().then(Resize);
                break;
            default:
                let match = String(command).match(/presets\-(\d+)/);
                let index = match ? parseInt(match[1], 10) - 1 : -1;
                (index > -1) && Settings.Get('presets').then(presets => {
                    presets[index] && Resize(presets[index]);
                });
                break;
        }
    });
    Windows.On('FocusChanged', winId => {
        if (winId !== Windows.NONE) {
            Windows.Get(winId).then(win => {
                if (win.type == 'popup' && winId !== ToolsPopup.ID()) {
                    ContextMenus.Create({ id: 'context-menu-item', contexts: ['all'], title: 'Show the resizer window' }).catch(_silence);
                }
                else {
                    ContextMenus.Remove('context-menu-item').catch(_silence);
                }
            });
        }
    });
    ContextMenus.On('Clicked', (info, tab) => {
        Windows.Get(tab.windowId).then(_attachToolsPopup);
    });
    function OpenAsPopup(params) {
        params = params || {
            width: 800,
            height: 480,
            target: PresetTarget.VIEWPORT,
            position: PresetPosition.CENTER
        };
        return new Promise((resolve, reject) => {
            let details;
            _getDetails()
                .then(props => Promise.resolve(details = props))
                .then(props => Tabs.Duplicate(details.tabId))
                .then(tab => Windows.Create({ tabId: details.tabId, type: 'popup' }))
                .then(win => Resize(params))
                .then(win => _attachToolsPopup(win))
                .then(resolve)
                .catch(err => {
                reject();
            });
        });
    }
    function _attachToolsPopup(mainWindow) {
        return ToolsPopup.AttachTo(mainWindow).then(win => {
            WindowsStack.Remove(ToolsPopup.ID());
            return Promise.resolve(win);
        });
    }
    function GetPresets() {
        return Settings.Get('presets').then(presets => Promise.resolve(presets || []));
    }
    function SavePreset(preset) {
        return GetPresets().then(presets => {
            let existing = presets.findIndex(p => p.id === preset.id);
            if (existing > -1) {
                presets[existing] = preset;
            }
            else {
                presets.unshift(preset);
            }
            return SaveSettings({ presets: presets });
        });
    }
    function GetDefaultSettings() {
        return Promise.resolve(Settings.DefaultSettings);
    }
    function GetSettings(key) {
        return Settings.Get(key);
    }
    function GetSyncStatus() {
        return Settings.Get('disableSync', false, true);
    }
    function ToggleSync(status) {
        return Settings.Set('disableSync', status, true);
    }
    function SaveSettings(data) {
        Runtime.Broadcast({ UpdatedSettings: data }).catch(_silence);
        if ('popupIconStyle' in data) {
            setIconType(data.popupIconStyle);
        }
        if ('hideTooltipDelay' in data) {
            Tabs.Query().then(tabs => {
                tabs.forEach(tab => Tooltip.SetTimeout(tab.id, data.hideTooltipDelay));
            });
        }
        if ('alwaysShowTheTooltip' in data) {
            if (data.alwaysShowTheTooltip) {
                Tooltip.EnableOnAllPages();
            }
            else {
                Tooltip.DisableOnAllPages();
            }
        }
        return Settings.Set(data);
    }
    Background.SaveSettings = SaveSettings;
    function ImportSettings(data) {
        let settings = {};
        if ('settings' in data) {
            data['WindowResizer.Rows'] = JSON.stringify(data.presets);
            if (data.settings) {
                data['WindowResizer.Tooltip'] = data.settings.tooltip;
                data['WindowResizer.TooltipDelay'] = data.settings.tooltipDelay;
                data['WindowResizer.PopupDescription'] = data.settings.popupDescription;
            }
            settings = Settings.ParseV1(data);
        }
        else {
            for (let key in Settings.DefaultSettings) {
                if (key in data) {
                    settings[key] = data[key];
                }
            }
        }
        return Settings.Set(settings);
    }
    function RotateViewport() {
        return _getDetails().then(details => Resize({
            target: PresetTarget.VIEWPORT,
            width: details.innerHeight / details.zoom,
            height: details.innerWidth / details.zoom
        }));
    }
    function SettingsGetRequestedPage() {
        return SettingsPage.Current();
    }
    function OpenSettings(view = null) {
        return SettingsPage.Open(view);
    }
    function OpenPresetsSettings() {
        return SettingsPage.Open('#presets');
    }
    function OpenReleaseNotes() {
        return SettingsPage.Open('#help/release-notes');
    }
    function OpenProPage() {
        return SettingsPage.Open('#pro');
    }
    function ToggleTooltip() {
        let tab;
        return _getTab()
            .then(t => _validateUrl(tab = t))
            .then(p => Tooltip.Toggle(tab.id));
    }
    function GetTooltipHideDelay() {
        return Settings.Get('hideTooltipDelay');
    }
    function GetTooltipPosition() {
        return Settings.Get('tooltipPosition');
    }
    function GetZoom(params, sender) {
        let tabId = sender.tab.id;
        let tabs = chrome.tabs;
        return new Promise((resolve, reject) => {
            tabs.getZoom(tabId, zoom => resolve(zoom));
        });
    }
    function _getTab(winId) {
        return Tabs.GetActive(winId || WindowsStack.Current());
    }
    function _getDetails() {
        return Windows.Update(WindowsStack.Current(), { state: 'normal' })
            .then(win => _getTab(win.id)
            .then(tab => Tabs.GetZoom(tab.id)
            .then(zoom => {
            return Promise.resolve({
                id: win.id,
                tabId: tab.id,
                width: win.width,
                height: win.height,
                top: win.top,
                left: win.left,
                innerWidth: tab.width,
                innerHeight: tab.height,
                url: tab.url,
                zoom: zoom,
            });
        })));
    }
    function __computeOptions(params, win) {
        let options = {};
        for (let prop of ['width', 'height', 'top', 'left']) {
            isSet(params[prop]) && (options[prop] = params[prop]);
        }
        if (params.target === PresetTarget.VIEWPORT) {
            if (params.width) {
                options.width = win.width - win.innerWidth + Math.round(params.width * win.zoom);
            }
            if (params.height) {
                options.height = win.height - win.innerHeight + Math.round(params.height * win.zoom);
            }
        }
        return Settings.Get({ alwaysCenterTheWindow: false, leftAlignWindow: false }).then(settings => {
            let centered = settings.alwaysCenterTheWindow;
            let leftAligned = settings.leftAlignWindow;
            let screen = window.screen;
            if (centered || params.position === PresetPosition.CENTER) {
                // center the window if the global option is set or required by the preset
                options.left = Math.floor((screen.availWidth - options.width) / 2) + screen.availLeft;
                options.top = Math.floor((screen.availHeight - options.height) / 2) + screen.availTop;
            }
            else if (!leftAligned && isSet(options.width) && !isSet(options.left) && !isSet(options.top)) {
                // if the user hasn't selected the old behavior (window stays left aligned)
                // keep the right side of the window (where the extensions' icons are) in the same place
                options.left = win.left + win.width - options.width;
            }
            return Promise.resolve(options);
        });
    }
    function Resize(params) {
        let initial;
        let debug = {
            _: (new Date()).toISOString(),
            desired: {
                width: params.width,
                height: params.height,
                top: params.top,
                left: params.left,
                target: params.target,
            }
        };
        return _getDetails()
            .then(current => {
            debug.initial = {
                width: current.width,
                height: current.height,
                innerWidth: current.innerWidth,
                innerHeight: current.innerHeight,
                top: current.top,
                left: current.left,
                zoom: current.zoom,
            };
            return __computeOptions(params, initial = current);
        })
            .then(options => {
            debug.computed = options;
            return _resize(initial.id, options);
        })
            .catch(errors => {
            let actual = errors && errors.OUT_OF_BOUNDS && errors.OUT_OF_BOUNDS.actual ? errors.OUT_OF_BOUNDS.actual : {};
            debug.actual = {
                width: actual.width,
                height: actual.height,
                top: actual.top,
                left: actual.left,
                type: actual.type,
            };
            return Settings.Get({ alwaysCenterTheWindow: false, leftAlignWindow: false }).then(settings => {
                let top = initial.top;
                let left = initial.left - (actual.width - initial.width);
                let centered = settings.alwaysCenterTheWindow;
                let leftAligned = settings.leftAlignWindow;
                let screen = window.screen;
                if (leftAligned) {
                    left = initial.left;
                }
                if (debug.desired.top !== null) {
                    top = debug.desired.top;
                }
                if (debug.desired.left !== null) {
                    left = debug.desired.left;
                }
                if (centered || params.position === PresetPosition.CENTER) {
                    // center the window if the global option is set or required by the preset
                    left = Math.floor((screen.availWidth - actual.width) / 2) + screen.availLeft;
                    top = Math.floor((screen.availHeight - actual.height) / 2) + screen.availTop;
                }
                // reset window in case of failure
                Windows.Update(initial.id, { top, left });
                let log = [];
                try {
                    log = JSON.parse(window.localStorage['debugLog'] || '[]');
                }
                catch (ex) { }
                log.splice(9);
                log.unshift(debug);
                window.localStorage['debugLog'] = JSON.stringify(log);
                return Promise.reject({ errors, debug });
            });
        });
    }
    function LimitPopup(params) {
        return Windows.Update(ToolsPopup.ID(), params);
    }
    function _executeScript(code, tabId, inject) {
        return new Promise((resolve, reject) => {
            let getTabId = Promise.resolve(tabId);
            if (!tabId) {
                getTabId = _getTab().then(tab => Promise.resolve(tab.id));
            }
            getTabId.then(tabId => {
                let config = {};
                if (inject) {
                    config.code = code;
                }
                else {
                    config.file = code;
                }
                chrome.tabs.executeScript(tabId || null, config, result => {
                    if (Runtime.Error()) {
                        reject({ 'INVALID_TAB': Runtime.Error() });
                    }
                    else {
                        resolve(result[0]);
                    }
                });
            });
        });
    }
    function _resize(winId, options) {
        return Windows.Update(winId, options).then(updated => {
            let errors = [];
            if (options.width && options.width < updated.width) {
                errors.push('MIN_WIDTH');
            }
            if (options.height && options.height < updated.height) {
                errors.push('MIN_HEIGHT');
            }
            if (options.width && options.width > updated.width) {
                errors.push('MAX_WIDTH');
            }
            if (options.height && options.height > updated.height) {
                errors.push('MAX_HEIGHT');
            }
            if (errors.length) {
                return Promise.reject({ 'OUT_OF_BOUNDS': { keys: errors, target: options, actual: updated } });
            }
            // All good!
            return Promise.resolve(updated);
        });
    }
    function isSet(val) {
        return val !== null && val !== undefined;
    }
    function _validateUrl(tab) {
        let protocol = String(tab.url).split(':').shift();
        let allowed = ['http', 'https', 'file'];
        if (allowed.indexOf(protocol) < 0) {
            return Promise.reject({ 'INVALID_PROTOCOL': { protocol: protocol, tab: tab } });
        }
        return new Promise((resolve, reject) => {
            _executeScript(`(function() {return '${protocol}'})()`, tab.id, true)
                .then(resolve)
                .catch(err => {
                if (protocol === 'file') {
                    reject({ 'FILE_PROTOCOL_PERMISSION': { tab: tab, err: err } });
                }
                else {
                    reject({ 'WEBSTORE_PERMISSION': { tab: tab, err: err } });
                }
            });
        });
    }
    function _silence() { }
    function setIconType(style) {
        __setIcon(style);
    }
    GetSettings().then((settings) => {
        setIconType(settings.popupIconStyle);
        if (settings.alwaysShowTheTooltip) {
            Tooltip.EnableOnAllPages();
        }
    });
    function __setIcon(style) {
        style = String(style);
        if (style.match(/^\d+$/)) {
            const styles = ['grey', 'dark+color', 'light+color'];
            style = ['grey', 'dark+color', 'light+color'][style] || 'dark+color';
        }
        fetch(chrome.runtime.getURL('assets/icons/browser-icon-16.svg'))
            .then(response => response.text())
            .then(svg => _processColors(svg))
            .then(svg => {
            let data = `data:image/svg+xml;utf8,${svg}`;
            let light = style.match(/light/);
            return Promise.all([
                svg2ImgData(data, 16, light, 1),
                svg2ImgData(data, 32, light, 2)
            ]);
        }).then(([icon16, icon32]) => {
            chrome.browserAction.setIcon({ imageData: {
                    "16": icon16,
                    "32": icon32,
                } });
        });
        function _processColors(svg) {
            switch (style) {
                case 'light':
                    svg = svg.replace(/347f2b/, 'eee');
                case 'light+color':
                    svg = svg.replace(/333/, 'eee');
                    break;
                case 'dark':
                    svg = svg.replace(/347f2b/, '333');
                    break;
                case 'neutral':
                    svg = svg.replace(/347f2b/, '666');
                    svg = svg.replace(/333/, '666');
                    break;
            }
            return Promise.resolve(svg);
        }
    }
    function svg2ImgData(source, size, light, scale = 1) {
        return new Promise((resolve, reject) => {
            const cnv = document.createElement('canvas');
            const ctx = cnv.getContext('2d');
            const img = document.createElement('img');
            cnv.width = size;
            cnv.height = size;
            img.width = size;
            img.height = size;
            img.onload = _render;
            img.src = source;
            function _render() {
                let shadow = light ?
                    `rgba(255, 255, 255, ${0.075 * scale})` :
                    `rgba(0, 0, 0, ${0.05 * scale})`;
                ctx.shadowColor = shadow;
                ctx.shadowBlur = 1;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;
                ctx.drawImage(img, 0, 0);
                resolve(ctx.getImageData(0, 0, size, size));
            }
        });
    }
})(Background || (Background = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9Db3JlL1V0aWxzL0VudW1zLnRzIiwic3JjL0NvcmUvVXRpbHMvVVVJRC50cyIsInNyYy9Db3JlL1V0aWxzL1JlcXVlc3QudHMiLCJzcmMvUmVzaXplckFQSS9Ub29sdGlwLnRzIiwic3JjL1Jlc2l6ZXJBUEkvU2V0dGluZ3MudHMiLCJzcmMvUmVzaXplckFQSS9TZXR0aW5nc1BhZ2UudHMiLCJzcmMvUmVzaXplckFQSS9DaHJvbWUvV2luZG93cy50cyIsInNyYy9SZXNpemVyQVBJL0Nocm9tZS9UYWJzLnRzIiwic3JjL1Jlc2l6ZXJBUEkvQ2hyb21lL1J1bnRpbWUudHMiLCJzcmMvUmVzaXplckFQSS9DaHJvbWUvQ29udGV4dE1lbnVzLnRzIiwic3JjL1NjcmlwdHMvYmFja2dyb3VuZC9Ub29sc1BvcHVwLnRzIiwic3JjL0NvcmUvVXRpbHMvVW5pcXVlU3RhY2sudHMiLCJzcmMvU2NyaXB0cy9iYWNrZ3JvdW5kL1dpbmRvd3NTdGFjay50cyIsInNyYy9Db3JlL1V0aWxzL1V0aWxzLnRzIiwic3JjL1NjcmlwdHMvYmFja2dyb3VuZC9CYW5uZXIudHMiLCJzcmMvU2NyaXB0cy9iYWNrZ3JvdW5kL0N5Y2xlUHJlc2V0cy50cyIsInNyYy9TY3JpcHRzL2JhY2tncm91bmQvVXBkYXRlci50cyIsInNyYy9TY3JpcHRzL2JhY2tncm91bmQtcHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFPLElBQUksQ0F3QlY7QUF4QkQsV0FBTyxJQUFJO0lBQ1YsSUFBWSxVQUtYO0lBTEQsV0FBWSxVQUFVO1FBQ3JCLDZDQUFTLENBQUE7UUFDVCwrQ0FBTSxDQUFBO1FBQ04sK0NBQU0sQ0FBQTtRQUNOLGlEQUFPLENBQUE7SUFDUixDQUFDLEVBTFcsVUFBVSxHQUFWLGVBQVUsS0FBVixlQUFVLFFBS3JCO0lBRUQsSUFBWSxZQUdYO0lBSEQsV0FBWSxZQUFZO1FBQ3ZCLG1EQUFVLENBQUE7UUFDVix1REFBUSxDQUFBO0lBQ1QsQ0FBQyxFQUhX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LEdBQUcsTUFBTSxDQUFDO2dCQUN6QixHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNGLENBQUMsRUEzeEJNLFVBQVUsS0FBVixVQUFVLFFBMnhCaEIiLCJmaWxlIjoic2NyaXB0cy9iYWNrZ3JvdW5kLXByb2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubW9kdWxlIENvcmUge1xyXG5cdGV4cG9ydCBlbnVtIFByZXNldFR5cGUge1xyXG5cdFx0UEhPTkUgPSAwLFxyXG5cdFx0VEFCTEVULFxyXG5cdFx0TEFQVE9QLFxyXG5cdFx0REVTS1RPUFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGVudW0gUHJlc2V0VGFyZ2V0IHtcclxuXHRcdFdJTkRPVyA9IDAsXHJcblx0XHRWSUVXUE9SVFxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGVudW0gUHJlc2V0UG9zaXRpb24ge1xyXG5cdFx0REVGQVVMVCA9IDAsXHJcblx0XHRDVVNUT00sXHJcblx0XHRDRU5URVJcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBlbnVtIFBvcHVwSWNvblN0eWxlIHtcclxuXHRcdE1PTk9DSFJPTUUgPSAwLFxyXG5cdFx0Q09MT1JFRCxcclxuXHRcdENPTlRSQVNUXHJcblx0fVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvaHRtbDUuZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgQ29yZS5VdGlscyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFVVSUQoKTogc3RyaW5nIHtcclxuXHRcdGxldCB1dWlkOiBzdHJpbmc7XHJcblx0XHRsZXQgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDIxKSk7XHJcblx0XHRsZXQgaGV4ZWQgPSB2YWwgPT4gKHZhbCAlIDE2KS50b1N0cmluZygxNik7XHJcblxyXG5cdFx0Ynl0ZXNbMTJdID0gNDtcclxuXHRcdGJ5dGVzWzE2XSA9IGJ5dGVzWzE2XSAmIDB4MyB8IDB4ODtcclxuXHJcblx0XHR1dWlkID0gQXJyYXkuZnJvbShieXRlcywgaGV4ZWQpLmpvaW4oJycpO1xyXG5cdFx0dXVpZCA9IHV1aWQgKyBEYXRlLm5vdygpLnRvU3RyaW5nKDE2KTtcclxuXHRcdHV1aWQgPSB1dWlkLnJlcGxhY2UoL14oLns4fSkoLns0fSkoLns0fSkoLns0fSkvLCAnJDEtJDItJDMtJDQtJyk7XHJcblxyXG5cdFx0cmV0dXJuIHV1aWQudG9VcHBlckNhc2UoKTtcclxuXHR9XHJcbn0iLCJcclxubW9kdWxlIENvcmUuVXRpbHMuUmVxdWVzdCB7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKTtcclxuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgcmVqZWN0KTtcclxuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgcmVqZWN0KTtcclxuXHRcdFx0eGhyLm9wZW4oJ0dFVCcsIHVybCk7XHJcblx0XHRcdHhoci5zZW5kKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXRKU09OKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBHZXQodXJsKS50aGVuKGRhdGEgPT4gUHJvbWlzZS5yZXNvbHZlKEpTT04ucGFyc2UoZGF0YS50YXJnZXQucmVzcG9uc2VUZXh0KSkpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFBvc3QodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX3Bvc3QodXJsLCBkYXRhKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gUG9zdEpTT04odXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX3Bvc3QodXJsLCBkYXRhKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCBwYXJ0cyA9IFtdO1xyXG5cdFx0Zm9yIChsZXQgayBpbiBkYXRhKSB7XHJcblx0XHRcdGxldCBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGspO1xyXG5cdFx0XHRsZXQgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoZGF0YVtrXSk7XHJcblx0XHRcdHBhcnRzLnB1c2goYCR7bmFtZX09JHt2YWx1ZX1gKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGluaXQgPSB7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHRib2R5OiBwYXJ0cy5qb2luKCcmJyksXHJcblx0XHRcdGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwifVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gZmV0Y2godXJsLCBpbml0KTtcclxuXHR9XHJcbn0iLCJtb2R1bGUgUmVzaXplckFQSS5Ub29sdGlwIHtcclxuXHRmdW5jdGlvbiBfbWVzc2FnZSh0YWJJZDogbnVtYmVyLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UsIGFuc3dlciA9PiByZXNvbHZlKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciA/IG51bGwgOiBhbnN3ZXIpKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNvbnN0IEhJRERFTiAgPSAnSElEREVOJztcclxuXHRleHBvcnQgY29uc3QgVklTSUJMRSA9ICdWSVNJQkxFJztcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEVuYWJsZSh0YWJJZDogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtmaWxlOiAnc2NyaXB0cy9lbmFibGUtdG9vbHRpcC5qcyd9LCByZXN1bHQgPT4gcmVzb2x2ZSghY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBEaXNhYmxlKHRhYklkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIF9tZXNzYWdlKHRhYklkLCAnRElTQUJMRScpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEdldFN0YXR1cyh0YWJJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBfbWVzc2FnZSh0YWJJZCwgJ1NUQVRVUycpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFNob3codGFiSWQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gX21lc3NhZ2UodGFiSWQsICdTSE9XJyk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gSGlkZSh0YWJJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBfbWVzc2FnZSh0YWJJZCwgJ0hJREUnKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBUb2dnbGUodGFiSWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX21lc3NhZ2UodGFiSWQsICdTVEFUVVMnKS50aGVuKHN0YXR1cyA9PiB7XHJcblx0XHRcdGlmIChzdGF0dXMgPT09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gVG9vbHRpcC5FbmFibGUodGFiSWQpLnRoZW4ocmVzdWx0ID0+IHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PlRvb2x0aXAuU2hvdyh0YWJJZCksIDEwMCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gX21lc3NhZ2UodGFiSWQsICdUT0dHTEUnKTtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gU2V0VGltZW91dCh0YWJJZDogbnVtYmVyLCB0aW1lb3V0OiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIF9tZXNzYWdlKHRhYklkLCB7Y29tbWFuZDogJ1NFVF9ISURFX0RFTEFZJywgZGVsYXk6IHRpbWVvdXR9KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBFbmFibGVPbkFsbFBhZ2VzKCkge1xyXG5cdFx0aWYgKGNocm9tZS53ZWJOYXZpZ2F0aW9uICYmICFjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkRPTUNvbnRlbnRMb2FkZWQuaGFzTGlzdGVuZXIoZW5hYmxlT25OZXdUYWJzKSkge1xyXG5cdFx0XHRjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkRPTUNvbnRlbnRMb2FkZWQuYWRkTGlzdGVuZXIoZW5hYmxlT25OZXdUYWJzKTtcclxuXHRcdH1cclxuXHJcblx0XHRjaHJvbWUudGFicy5xdWVyeSh7fSwgdGFicyA9PiB7XHJcblx0XHRcdGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcblx0XHRcdFx0RW5hYmxlKHRhYi5pZCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gRGlzYWJsZU9uQWxsUGFnZXMoKSB7XHJcblx0XHRpZiAoY2hyb21lLndlYk5hdmlnYXRpb24pIHtcclxuXHRcdFx0d2hpbGUgKGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uRE9NQ29udGVudExvYWRlZC5oYXNMaXN0ZW5lcihlbmFibGVPbk5ld1RhYnMpKSB7XHJcblx0XHRcdFx0Y2hyb21lLndlYk5hdmlnYXRpb24ub25ET01Db250ZW50TG9hZGVkLnJlbW92ZUxpc3RlbmVyKGVuYWJsZU9uTmV3VGFicyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjaHJvbWUudGFicy5xdWVyeSh7fSwgdGFicyA9PiB7XHJcblx0XHRcdGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcblx0XHRcdFx0RGlzYWJsZSh0YWIuaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZW5hYmxlT25OZXdUYWJzKGRldGFpbHM6IGNocm9tZS53ZWJOYXZpZ2F0aW9uLldlYk5hdmlnYXRpb25GcmFtZWRDYWxsYmFja0RldGFpbHMpIHtcclxuXHRcdGlmIChkZXRhaWxzLnRhYklkICYmICFkZXRhaWxzLmZyYW1lSWQpIHtcclxuXHRcdFx0RW5hYmxlKGRldGFpbHMudGFiSWQpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIm1vZHVsZSBSZXNpemVyQVBJLlNldHRpbmdzIHtcclxuXHRpbXBvcnQgRW5kcG9pbnRWaXNpYmlsaXR5ID0gRXh0QVBJLlJvdXRlci5FbmRwb2ludFZpc2liaWxpdHk7XHJcblx0aW1wb3J0IFByZXNldFR5cGUgICAgICAgICA9IENvcmUuUHJlc2V0VHlwZTtcclxuXHRpbXBvcnQgUHJlc2V0VGFyZ2V0ICAgICAgID0gQ29yZS5QcmVzZXRUYXJnZXQ7XHJcblx0aW1wb3J0IFByZXNldFBvc2l0aW9uICAgICA9IENvcmUuUHJlc2V0UG9zaXRpb247XHJcblxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElLZXlzIHtcclxuXHRcdGFsd2F5c0NlbnRlclRoZVdpbmRvdz86IGJvb2xlYW47XHJcblx0XHRsZWZ0QWxpZ25XaW5kb3c/OiBib29sZWFuO1xyXG5cdFx0YWx3YXlzU2hvd1RoZVRvb2x0aXA/OiBib29sZWFuO1xyXG5cdFx0aGlkZVRvb2x0aXBEZWxheT86IG51bWJlcjtcclxuXHRcdHRvb2x0aXBQb3NpdGlvbj86IHN0cmluZ1tdO1xyXG5cdFx0cG9wdXBJY29uU3R5bGU/OiBzdHJpbmc7XHJcblx0XHRwcmVzZXRzSWNvbnNTdHlsZT86IHN0cmluZztcclxuXHRcdGFsdGVybmF0ZVByZXNldHNCZz86IGJvb2xlYW47XHJcblx0XHRhdXRvQ2xvc2VQb3B1cD86IGJvb2xlYW47XHJcblx0XHRwcmVzZXRzUHJpbWFyeUxpbmU/OiBzdHJpbmc7XHJcblx0XHRoaWRlUHJlc2V0c0Rlc2NyaXB0aW9uPzogYm9vbGVhbjtcclxuXHRcdGhpZGVQb3B1cFRvb2x0aXBzPzogYm9vbGVhbjtcclxuXHRcdGhpZGVRdWlja1Jlc2l6ZT86IGJvb2xlYW47XHJcblx0XHRvcmlnaW5hbEluc3RhbGxEYXRlPzogbnVtYmVyO1xyXG5cdFx0bGljZW5zZT86IGFueTtcclxuXHJcblx0XHRwcmVzZXRzPzogYW55W107XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIERlZmF1bHRTZXR0aW5nczogSUtleXMgPSB7XHJcblx0XHRhbHdheXNDZW50ZXJUaGVXaW5kb3cgIDogZmFsc2UsXHJcblx0XHRsZWZ0QWxpZ25XaW5kb3cgICAgICAgIDogZmFsc2UsXHJcblx0XHRhbHdheXNTaG93VGhlVG9vbHRpcCAgIDogZmFsc2UsXHJcblx0XHRoaWRlVG9vbHRpcERlbGF5ICAgICAgIDogMzAwMCxcclxuXHRcdHRvb2x0aXBQb3NpdGlvbiAgICAgICAgOiBbJ2JvdHRvbScsICdyaWdodCddLFxyXG5cdFx0cG9wdXBJY29uU3R5bGUgICAgICAgICA6ICdkYXJrK2NvbG9yJyxcclxuXHRcdHByZXNldHNJY29uc1N0eWxlICAgICAgOiAnY2xlYXInLFxyXG5cdFx0YWx0ZXJuYXRlUHJlc2V0c0JnICAgICA6IGZhbHNlLFxyXG5cdFx0YXV0b0Nsb3NlUG9wdXAgICAgICAgICA6IGZhbHNlLFxyXG5cdFx0cHJlc2V0c1ByaW1hcnlMaW5lICAgICA6ICcnLFxyXG5cdFx0aGlkZVByZXNldHNEZXNjcmlwdGlvbiA6IGZhbHNlLFxyXG5cdFx0aGlkZVBvcHVwVG9vbHRpcHMgICAgICA6IGZhbHNlLFxyXG5cdFx0aGlkZVF1aWNrUmVzaXplICAgICAgICA6IGZhbHNlLFxyXG5cdFx0b3JpZ2luYWxJbnN0YWxsRGF0ZSAgICA6IG51bGwsXHJcblx0XHRsaWNlbnNlICAgICAgICAgICAgICAgIDogbnVsbCxcclxuXHRcdHByZXNldHMgICAgICAgICAgICAgICAgOiBbXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2dldFN0b3JlKGxvY2FsOiBib29sZWFuID0gZmFsc2UsIGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGNocm9tZS5zdG9yYWdlLlN0b3JhZ2VBcmVhPiB7XHJcblx0XHRsZXQgc3RvcmUgPSBsb2NhbCA/IGNocm9tZS5zdG9yYWdlLmxvY2FsIDogY2hyb21lLnN0b3JhZ2Uuc3luYztcclxuXHJcblx0XHRpZiAoZm9yY2UpIHtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShzdG9yZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KHtkaXNhYmxlU3luYzogZmFsc2V9LCBzZXR0aW5ncyA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IHN0b3JlID0gbG9jYWwgfHwgc2V0dGluZ3MuZGlzYWJsZVN5bmMgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbCA6IGNocm9tZS5zdG9yYWdlLnN5bmM7XHJcblxyXG5cdFx0XHRcdHJlc29sdmUoc3RvcmUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2dldExpY2Vuc2UoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gX2dldFN0b3JlKGZhbHNlLCB0cnVlKS50aGVuKHN0b3JlID0+IHtcclxuXHRcdFx0XHRzdG9yZS5nZXQoe2xpY2Vuc2U6IG51bGx9LCBkYXRhID0+IHtcclxuXHRcdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJlc29sdmUoZGF0YS5saWNlbnNlKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBTZXQoa2V5OiBzdHJpbmd8YW55LCB2YWx1ZT86IGFueSwgbG9jYWw6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgZGF0YSA9IF9ub3JtYWxpemUoa2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0aWYgKCdsaWNlbnNlJyBpbiBkYXRhICkge1xyXG5cdFx0XHRfZ2V0U3RvcmUoZmFsc2UsIHRydWUpLnRoZW4oc3RvcmUgPT4ge1xyXG5cdFx0XHRcdHN0b3JlLnNldCh7bGljZW5zZTogZGF0YS5saWNlbnNlfSk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIF9nZXRTdG9yZShsb2NhbCkudGhlbihzdG9yZSA9PiB7XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdFx0c3RvcmUuc2V0KGRhdGEsICgpID0+IHtcclxuXHRcdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdFx0cmVzb2x2ZShkYXRhKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEdldChrZXk6IHN0cmluZ3xhbnksIGRlZmF1bHRWYWx1ZT86IGFueSwgbG9jYWw6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQga2V5cyAgPSBfbm9ybWFsaXplKGtleSwgZGVmYXVsdFZhbHVlKTtcclxuXHJcblx0XHRyZXR1cm4gX2dldExpY2Vuc2UoKS50aGVuKGxpY2Vuc2UgPT4gX2dldFN0b3JlKGxvY2FsKS50aGVuKHN0b3JlID0+IHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHRzdG9yZS5nZXQoa2V5cywgc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0c2V0dGluZ3MubGljZW5zZSA9IGxpY2Vuc2U7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZihrZXkpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShzZXR0aW5nc1trZXldKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKGxldCBrIGluIERlZmF1bHRTZXR0aW5ncykge1xyXG5cdFx0XHRcdFx0XHRpZiAoIShrIGluIHNldHRpbmdzKSkge1xyXG5cdFx0XHRcdFx0XHRcdHNldHRpbmdzW2tdID0gRGVmYXVsdFNldHRpbmdzW2tdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmUoc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBEZWwoa2V5OiBzdHJpbmd8c3RyaW5nW10sIGxvY2FsOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IGtleXMgID0gKGtleSBpbnN0YW5jZW9mIEFycmF5KSA/IGtleSA6IFtrZXldO1xyXG5cclxuXHRcdHJldHVybiBfZ2V0U3RvcmUobG9jYWwpLnRoZW4oc3RvcmUgPT4ge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdHN0b3JlLnJlbW92ZSg8c3RyaW5nW10+IGtleXMsICgpID0+IHtcclxuXHRcdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiByZXNvbHZlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfbm9ybWFsaXplKGtleTogc3RyaW5nfGFueSwgZGVmYXVsdFZhbHVlPzogYW55KTogYW55IHtcclxuXHRcdGxldCBrZXlzOiBhbnkgPSB7fTtcclxuXHJcblx0XHRpZiAodHlwZW9mKGtleSkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZSA9IERlZmF1bHRTZXR0aW5nc1trZXldO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrZXlzW2tleV0gPSBkZWZhdWx0VmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRrZXlzID0ga2V5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBrZXlzO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2hhbmRsZXIocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzb2x2ZShkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBQYXJzZVYxKGRhdGE6IGFueSk6IElLZXlzIHtcclxuXHRcdGlmICghZGF0YSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHNldHRpbmdzOiBhbnkgID0ge307XHJcblx0XHRsZXQgcHJlc2V0czogYW55W10gPSBKU09OLnBhcnNlKGRhdGFbJ1dpbmRvd1Jlc2l6ZXIuUm93cyddKTtcclxuXHJcblx0XHRzZXR0aW5ncy5hbHdheXNTaG93VGhlVG9vbHRpcCAgID0gZGF0YVsnV2luZG93UmVzaXplci5Ub29sdGlwJ10gIT0gMTtcclxuXHRcdHNldHRpbmdzLmhpZGVUb29sdGlwRGVsYXkgICAgICAgPSBwYXJzZUludChkYXRhWydXaW5kb3dSZXNpemVyLlRvb2x0aXBEZWxheSddLCAxMCkgfHwgRGVmYXVsdFNldHRpbmdzLmhpZGVUb29sdGlwRGVsYXk7XHJcblx0XHRzZXR0aW5ncy5oaWRlUHJlc2V0c0Rlc2NyaXB0aW9uID0gZGF0YVsnV2luZG93UmVzaXplci5Qb3B1cERlc2NyaXB0aW9uJ10gPT0gMTtcclxuXHJcblx0XHRzZXR0aW5ncy5wcmVzZXRzID0gW107XHJcblxyXG5cdFx0Zm9yIChsZXQgcHJlc2V0IG9mIHByZXNldHMpIHtcclxuXHRcdFx0c2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdFx0XHRpZCAgICAgICAgICA6IENvcmUuVXRpbHMuVVVJRCgpLFxyXG5cdFx0XHRcdHdpZHRoICAgICAgIDogX3BhcnNlTnVtYmVyKHByZXNldC53aWR0aCksXHJcblx0XHRcdFx0aGVpZ2h0ICAgICAgOiBfcGFyc2VOdW1iZXIocHJlc2V0LmhlaWdodCksXHJcblx0XHRcdFx0dG9wICAgICAgICAgOiBfcGFyc2VOdW1iZXIocHJlc2V0LlkpLFxyXG5cdFx0XHRcdGxlZnQgICAgICAgIDogX3BhcnNlTnVtYmVyKHByZXNldC5YKSxcclxuXHRcdFx0XHRkZXNjcmlwdGlvbiA6IHByZXNldC50aXRsZSB8fCBudWxsLFxyXG5cdFx0XHRcdHBvc2l0aW9uICAgIDogX3BhcnNlUG9zaXRpb24ocHJlc2V0LnBvcyksXHJcblx0XHRcdFx0dHlwZSAgICAgICAgOiBfcGFyc2VUeXBlKHByZXNldC50eXBlKSxcclxuXHRcdFx0XHR0YXJnZXQgICAgICA6IF9wYXJzZVRhcmdldChwcmVzZXQudGFyZ2V0KVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzZXR0aW5ncztcclxuXHJcblx0XHRmdW5jdGlvbiBfcGFyc2VOdW1iZXIodmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCkgfHwgbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfcGFyc2VUYXJnZXQodmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlID09ICd3aW5kb3cnID8gUHJlc2V0VGFyZ2V0LldJTkRPVyA6IFByZXNldFRhcmdldC5WSUVXUE9SVDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfcGFyc2VQb3NpdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRsZXQgcG9zID0gcGFyc2VJbnQodmFsdWUsIDEwKSB8fCAwO1xyXG5cclxuXHRcdFx0c3dpdGNoIChwb3MpIHtcclxuXHRcdFx0XHRjYXNlIDE6IHJldHVybiBQcmVzZXRQb3NpdGlvbi5DVVNUT007XHJcblx0XHRcdFx0Y2FzZSAzOiByZXR1cm4gUHJlc2V0UG9zaXRpb24uQ0VOVEVSO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gUHJlc2V0UG9zaXRpb24uREVGQVVMVDtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfcGFyc2VUeXBlKHZhbHVlKSB7XHJcblx0XHRcdHN3aXRjaCAodmFsdWUpIHtcclxuXHRcdFx0XHRjYXNlICdkZXNrdG9wJyAgICAgIDogcmV0dXJuIFByZXNldFR5cGUuREVTS1RPUDtcclxuXHRcdFx0XHRjYXNlICdsYXB0b3AnICAgICAgIDogcmV0dXJuIFByZXNldFR5cGUuTEFQVE9QO1xyXG5cdFx0XHRcdGNhc2UgJ3RhYmxldCcgICAgICAgOiByZXR1cm4gUHJlc2V0VHlwZS5UQUJMRVQ7XHJcblx0XHRcdFx0Y2FzZSAnc21hcnRwaG9uZScgICA6IHJldHVybiBQcmVzZXRUeXBlLlBIT05FO1xyXG5cdFx0XHRcdGNhc2UgJ2ZlYXR1cmVwaG9uZScgOiByZXR1cm4gUHJlc2V0VHlwZS5QSE9ORTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIFByZXNldFR5cGUuREVTS1RPUDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdERlZmF1bHRTZXR0aW5ncy5wcmVzZXRzLnB1c2goe1xyXG5cdFx0aWQ6ICdENDgyQ0VCRC0xMkRDLTQ1N0QtOEZDRi1CMTUyMjZERkVERDgnLFxyXG5cdFx0d2lkdGg6IDMyMCxcclxuXHRcdGhlaWdodDogNTY4LFxyXG5cdFx0dGFyZ2V0OiBDb3JlLlByZXNldFRhcmdldC5WSUVXUE9SVCxcclxuXHRcdGRlc2NyaXB0aW9uOiAnaVBob25lIDUnLFxyXG5cdFx0dHlwZTogQ29yZS5QcmVzZXRUeXBlLlBIT05FXHJcblx0fSlcclxuXHJcblx0RGVmYXVsdFNldHRpbmdzLnByZXNldHMucHVzaCh7XHJcblx0XHRpZDogJ0ExRDdEMDY1LTMzQjAtNDRCRC04RjIwLUExNTIyNkRGRjIzNycsXHJcblx0XHR3aWR0aDogMzc1LFxyXG5cdFx0aGVpZ2h0OiA2NjcsXHJcblx0XHR0YXJnZXQ6IENvcmUuUHJlc2V0VGFyZ2V0LlZJRVdQT1JULFxyXG5cdFx0ZGVzY3JpcHRpb246ICdpUGhvbmUgNicsXHJcblx0XHR0eXBlOiBDb3JlLlByZXNldFR5cGUuUEhPTkVcclxuXHR9KVxyXG5cclxuXHREZWZhdWx0U2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdGlkOiAnRkYzREU2Q0QtRjU2MC00NTc2LTgxMUYtRTE1MjI2REZGNDVGJyxcclxuXHRcdHdpZHRoOiAxMDI0LFxyXG5cdFx0aGVpZ2h0OiA3NjgsXHJcblx0XHR0YXJnZXQ6IENvcmUuUHJlc2V0VGFyZ2V0LlZJRVdQT1JULFxyXG5cdFx0ZGVzY3JpcHRpb246ICdpUGFkJyxcclxuXHRcdHR5cGU6IENvcmUuUHJlc2V0VHlwZS5UQUJMRVRcclxuXHR9KVxyXG5cclxuXHREZWZhdWx0U2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdGlkOiAnMjdBQ0REOUMtOUE5NC00NEY4LUIzMzMtQzE1MjI2REZGNUZGJyxcclxuXHRcdHdpZHRoOiAxNDQwLFxyXG5cdFx0aGVpZ2h0OiA5MDAsXHJcblx0XHR0YXJnZXQ6IENvcmUuUHJlc2V0VGFyZ2V0LldJTkRPVyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnTGFwdG9wJyxcclxuXHRcdHR5cGU6IENvcmUuUHJlc2V0VHlwZS5MQVBUT1BcclxuXHR9KVxyXG5cclxuXHREZWZhdWx0U2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdGlkOiAnMjI1NkU3QUQtQjdCQS00MEI3LTk5NjktNDE1MjI2REZGODE3JyxcclxuXHRcdHdpZHRoOiAxNjgwLFxyXG5cdFx0aGVpZ2h0OiAxMDUwLFxyXG5cdFx0dGFyZ2V0OiBDb3JlLlByZXNldFRhcmdldC5XSU5ET1csXHJcblx0XHRkZXNjcmlwdGlvbjogJ0Rlc2t0b3AnLFxyXG5cdFx0dHlwZTogQ29yZS5QcmVzZXRUeXBlLkRFU0tUT1BcclxuXHR9KVxyXG5cclxuXHREZWZhdWx0U2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdGlkOiAnMjI1NkU3QUQtQjdCQS00MEI3LTk5NjktNDE1MjI2REZGODE4JyxcclxuXHRcdHdpZHRoOiAxOTIwLFxyXG5cdFx0aGVpZ2h0OiAxMDgwLFxyXG5cdFx0dGFyZ2V0OiBDb3JlLlByZXNldFRhcmdldC5XSU5ET1csXHJcblx0XHRkZXNjcmlwdGlvbjogJ0Rlc2t0b3AnLFxyXG5cdFx0dHlwZTogQ29yZS5QcmVzZXRUeXBlLkRFU0tUT1BcclxuXHR9KVxyXG5cclxuXHREZWZhdWx0U2V0dGluZ3MucHJlc2V0cy5wdXNoKHtcclxuXHRcdGlkOiAnQzc2RjQ4REItQjJEMi00REVBLUIzNUQtNjE1MjYwNkY4ODNEJyxcclxuXHRcdHdpZHRoOiAyNTYwLFxyXG5cdFx0aGVpZ2h0OiAxNDQwLFxyXG5cdFx0dGFyZ2V0OiBDb3JlLlByZXNldFRhcmdldC5XSU5ET1csXHJcblx0XHRkZXNjcmlwdGlvbjogJ0Rlc2t0b3AnLFxyXG5cdFx0dHlwZTogQ29yZS5QcmVzZXRUeXBlLkRFU0tUT1BcclxuXHR9KVxyXG59IiwibW9kdWxlIFJlc2l6ZXJBUEkuU2V0dGluZ3NQYWdlIHtcclxuXHRsZXQgY3VycmVudFBhZ2UgPSBudWxsO1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gT3BlbihwYWdlOiBzdHJpbmcgPSBudWxsKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHBhZ2UgPSBwYWdlIHx8ICcjc2V0dGluZ3MnO1xyXG5cdFx0Y3VycmVudFBhZ2UgPSBwYWdlO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS5ydW50aW1lLm9wZW5PcHRpb25zUGFnZSgoKSA9PiB7XHJcblx0XHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe3Nob3dQYWdlOiBwYWdlfSwgcmVzb2x2ZSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBDdXJyZW50KCk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRQYWdlKTtcclxuXHR9XHJcbn0iLCJtb2R1bGUgUmVzaXplckFQSS5DaHJvbWUuV2luZG93cyB7XHJcblx0ZXhwb3J0IGNvbnN0IE5PTkUgPSBjaHJvbWUud2luZG93cy5XSU5ET1dfSURfTk9ORTtcclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJV2luZG93IGV4dGVuZHMgY2hyb21lLndpbmRvd3MuV2luZG93IHt9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXQod2luSWQ6IG51bWJlciwgY29uZmlnPzogY2hyb21lLndpbmRvd3MuR2V0SW5mbyk6IFByb21pc2U8SVdpbmRvdz4ge1xyXG5cdFx0Y29uZmlnID0gY29uZmlnIHx8IHtwb3B1bGF0ZTogdHJ1ZX07XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLndpbmRvd3MuZ2V0KHdpbklkLCBjb25maWcsIHdpbiA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVzb2x2ZSh3aW4pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gQWxsKGNvbmZpZz86IGNocm9tZS53aW5kb3dzLkdldEluZm8pOiBQcm9taXNlPElXaW5kb3dbXT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLndpbmRvd3MuZ2V0QWxsKGNvbmZpZywgd2luID0+IHtcclxuXHRcdFx0XHRpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXNvbHZlKHdpbik7XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZShjb25maWc6IGNocm9tZS53aW5kb3dzLkNyZWF0ZURhdGEpOiBQcm9taXNlPElXaW5kb3c+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS53aW5kb3dzLmNyZWF0ZShjb25maWcsIHdpbiA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVzb2x2ZSh3aW4pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBDcmVhdGVQb3B1cCh1cmw6IHN0cmluZywgY29uZmlnOiBjaHJvbWUud2luZG93cy5DcmVhdGVEYXRhID0ge30pOiBQcm9taXNlPElXaW5kb3c+IHtcclxuXHRcdGNvbmZpZy51cmwgID0gdXJsO1xyXG5cdFx0Y29uZmlnLnR5cGUgPSAncG9wdXAnO1xyXG5cclxuXHRcdHJldHVybiBDcmVhdGUoY29uZmlnKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBVcGRhdGUod2luSWQ6IG51bWJlciwgY29uZmlnOiBjaHJvbWUud2luZG93cy5VcGRhdGVJbmZvKTogUHJvbWlzZTxJV2luZG93PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjaHJvbWUud2luZG93cy51cGRhdGUod2luSWQsIGNvbmZpZywgd2luID0+IHtcclxuXHRcdFx0XHRpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXNvbHZlKHdpbik7XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIE9uKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRsZXQgZXZlbnQgPSBjaHJvbWUud2luZG93c1snb24nICsgbmFtZV07XHJcblxyXG5cdFx0ZXZlbnQgJiYgIWV2ZW50Lmhhc0xpc3RlbmVyKGNhbGxiYWNrKSAmJiBldmVudC5hZGRMaXN0ZW5lcihjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gT2ZmKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRsZXQgZXZlbnQgPSBjaHJvbWUud2luZG93c1snb24nICsgbmFtZV07XHJcblxyXG5cdFx0ZXZlbnQgJiYgZXZlbnQucmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2spO1xyXG5cdH1cclxufSIsIm1vZHVsZSBSZXNpemVyQVBJLkNocm9tZS5UYWJzIHtcclxuXHRleHBvcnQgaW50ZXJmYWNlIElUYWIgZXh0ZW5kcyBjaHJvbWUudGFicy5UYWIge31cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFF1ZXJ5KGZpbHRlcjogbnVtYmVyIHwgY2hyb21lLnRhYnMuUXVlcnlJbmZvID0ge30pOiBQcm9taXNlPElUYWJbXT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0ZnVuY3Rpb24gX2RvbmUodGFicykge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghKHRhYnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuXHRcdFx0XHRcdHRhYnMgPSBbdGFic107XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXNvbHZlKHRhYnMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIGZpbHRlciA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5nZXQoPG51bWJlcj5maWx0ZXIsIF9kb25lKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSg8Y2hyb21lLnRhYnMuUXVlcnlJbmZvPmZpbHRlciwgX2RvbmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXRBY3RpdmUod2luSWQ6IG51bWJlcik6IFByb21pc2U8SVRhYj4ge1xyXG5cdFx0bGV0IGZpbHRlciA9IHtcclxuXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG5cdFx0XHR3aW5kb3dJZCA6IHdpbklkXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS50YWJzLnF1ZXJ5KGZpbHRlciwgdGFicyA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVzb2x2ZSh0YWJzWzBdKTtcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gQ3JlYXRlKGNvbmZpZzogY2hyb21lLndpbmRvd3MuQ3JlYXRlRGF0YSk6IFByb21pc2U8Y2hyb21lLndpbmRvd3MuV2luZG93PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjaHJvbWUud2luZG93cy5jcmVhdGUoY29uZmlnLCB3aW4gPT4ge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlc29sdmUod2luKTtcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gQ3JlYXRlUG9wdXAodXJsOiBzdHJpbmcsIGNvbmZpZz86IGNocm9tZS53aW5kb3dzLkNyZWF0ZURhdGEpOiBQcm9taXNlPGNocm9tZS53aW5kb3dzLldpbmRvdz4ge1xyXG5cdFx0Y29uZmlnLnVybCAgPSB1cmw7XHJcblx0XHRjb25maWcudHlwZSA9ICdwb3B1cCc7XHJcblxyXG5cdFx0cmV0dXJuIENyZWF0ZShjb25maWcpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIFVwZGF0ZSh3aW5JZDogbnVtYmVyLCBjb25maWc6IGNocm9tZS53aW5kb3dzLkNyZWF0ZURhdGEpOiBQcm9taXNlPGNocm9tZS53aW5kb3dzLldpbmRvdz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLndpbmRvd3MudXBkYXRlKHdpbklkLCBjb25maWcsIHdpbiA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVzb2x2ZSh3aW4pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBEdXBsaWNhdGUodGFiSWQ6IG51bWJlcik6IFByb21pc2U8SVRhYj4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLnRhYnMuZHVwbGljYXRlKHRhYklkLCB0YWIgPT4ge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlc29sdmUodGFiKTtcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gR2V0Wm9vbSh0YWJJZDogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS50YWJzLmdldFpvb20odGFiSWQsIHpvb20gPT4ge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlc29sdmUoem9vbSk7XHJcblx0XHRcdH0pXHJcblx0XHR9KTtcclxuXHR9XHJcbn0iLCJtb2R1bGUgUmVzaXplckFQSS5DaHJvbWUuUnVudGltZSB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEVycm9yKCk6IGFueSB7XHJcblx0XHRyZXR1cm4gY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEJyb2FkY2FzdChtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobWVzc2FnZSwgcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gT24obmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGxldCBldmVudCA9IGNocm9tZS5ydW50aW1lWydvbicgKyBuYW1lXTtcclxuXHJcblx0XHRldmVudCAmJiAhZXZlbnQuaGFzTGlzdGVuZXIoY2FsbGJhY2spICYmIGV2ZW50LmFkZExpc3RlbmVyKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBPZmYobmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGxldCBldmVudCA9IGNocm9tZS5ydW50aW1lWydvbicgKyBuYW1lXTtcclxuXHJcblx0XHRldmVudCAmJiBldmVudC5yZW1vdmVMaXN0ZW5lcihjYWxsYmFjayk7XHJcblx0fVxyXG59IiwibW9kdWxlIFJlc2l6ZXJBUEkuQ2hyb21lLkNvbnRleHRNZW51cyB7XHJcblx0ZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZShjb25maWc6IGNocm9tZS5jb250ZXh0TWVudXMuQ3JlYXRlUHJvcGVydGllcyk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZShjb25maWcsICgpID0+IHtcclxuXHRcdFx0XHRpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0pXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBVcGRhdGUoaXRlbUlkOiBzdHJpbmcsIGNvbmZpZzogY2hyb21lLmNvbnRleHRNZW51cy5VcGRhdGVQcm9wZXJ0aWVzKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS5jb250ZXh0TWVudXMudXBkYXRlKGl0ZW1JZCwgY29uZmlnLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gUmVtb3ZlKGl0ZW1JZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNocm9tZS5jb250ZXh0TWVudXMucmVtb3ZlKGl0ZW1JZCwgKCkgPT4ge1xyXG5cdFx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSlcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIE9uKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRsZXQgZXZlbnQgPSBjaHJvbWUuY29udGV4dE1lbnVzWydvbicgKyBuYW1lXTtcclxuXHJcblx0XHRldmVudCAmJiAhZXZlbnQuaGFzTGlzdGVuZXIoY2FsbGJhY2spICYmIGV2ZW50LmFkZExpc3RlbmVyKGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBPZmYobmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGxldCBldmVudCA9IGNocm9tZS5jb250ZXh0TWVudXNbJ29uJyArIG5hbWVdO1xyXG5cclxuXHRcdGV2ZW50ICYmIGV2ZW50LnJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrKTtcclxuXHR9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vUmVzaXplckFQSS9DaHJvbWUvV2luZG93cy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9SZXNpemVyQVBJL0Nocm9tZS9UYWJzLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBUb29sc1BvcHVwIHtcclxuXHRpbXBvcnQgV2luZG93cyA9IFJlc2l6ZXJBUEkuQ2hyb21lLldpbmRvd3M7XHJcblx0aW1wb3J0IFRhYnMgPSBSZXNpemVyQVBJLkNocm9tZS5UYWJzO1xyXG5cclxuXHRsZXQgX0lEID0gbnVsbDtcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIElEKCkge1xyXG5cdFx0cmV0dXJuIF9JRDtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBPcGVuKCk6IFByb21pc2U8Y2hyb21lLndpbmRvd3MuV2luZG93PiB7XHJcblx0XHRsZXQgY29uZmlnID0ge1xyXG5cdFx0XHR1cmwgICAgOiAndmlld3MvcG9wdXAuaHRtbCNwb3B1cC12aWV3JyxcclxuXHRcdFx0dHlwZSAgIDogJ3BvcHVwJyxcclxuXHRcdFx0d2lkdGggIDogMzYwLFxyXG5cdFx0XHRoZWlnaHQgOiA0MjBcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIFdpbmRvd3MuQ3JlYXRlKGNvbmZpZykudGhlbih3aW4gPT4ge1xyXG5cdFx0XHRfSUQgPSB3aW4uaWQ7XHJcblx0XHRcdFdpbmRvd3MuT24oJ1JlbW92ZWQnLCBfT25DbG9zZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gd2luO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gRm9jdXMoKTogUHJvbWlzZTxjaHJvbWUud2luZG93cy5XaW5kb3c+IHtcclxuXHRcdHJldHVybiBXaW5kb3dzLlVwZGF0ZShfSUQsIHtmb2N1c2VkOiB0cnVlfSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gQmx1cigpOiBQcm9taXNlPGNocm9tZS53aW5kb3dzLldpbmRvdz4ge1xyXG5cdFx0cmV0dXJuIFdpbmRvd3MuVXBkYXRlKF9JRCwge2ZvY3VzZWQ6IGZhbHNlfSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gQXR0YWNoVG8obWFpbldpbmRvdzogY2hyb21lLndpbmRvd3MuV2luZG93KTogUHJvbWlzZTxjaHJvbWUud2luZG93cy5XaW5kb3c+IHtcclxuXHRcdGxldCBmb2N1c1BvcHVwICA9IF9JRCA/IEZvY3VzKCkgOiBPcGVuKCk7XHJcblx0XHRsZXQgbmV3UG9zaXRpb24gPSB7XHJcblx0XHRcdHRvcDogbWFpbldpbmRvdy50b3AsXHJcblx0XHRcdGxlZnQ6IG1haW5XaW5kb3cubGVmdCArIG1haW5XaW5kb3cud2lkdGhcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZm9jdXNQb3B1cC50aGVuKHdpbiA9PiBXaW5kb3dzLlVwZGF0ZSh3aW4uaWQsIG5ld1Bvc2l0aW9uKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfT25DbG9zZSh3aW5JZCkge1xyXG5cdFx0aWYgKHdpbklkID09PSBfSUQpIHtcclxuXHRcdFx0X0lEID0gbnVsbDtcclxuXHRcdFx0V2luZG93cy5PZmYoJ1JlbW92ZWQnLCBfT25DbG9zZSk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwibW9kdWxlIENvcmUuVXRpbHMge1xyXG5cdGV4cG9ydCBjbGFzcyBVbmlxdWVTdGFjayB7XHJcblx0XHRwcml2YXRlIF92YWx1ZXMgPSBbXTtcclxuXHJcblx0XHRwdWJsaWMgYXBwZW5kKHZhbHVlKSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlKHZhbHVlKTtcclxuXHRcdFx0dGhpcy5fdmFsdWVzLnB1c2godmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyByZW1vdmUodmFsdWUpIHtcclxuXHRcdFx0bGV0IGV4aXN0aW5nID0gdGhpcy5fdmFsdWVzLmluZGV4T2YodmFsdWUpO1xyXG5cdFx0XHQoZXhpc3RpbmcgPiAtMSkgJiYgdGhpcy5fdmFsdWVzLnNwbGljZShleGlzdGluZywgMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIGN1cnJlbnQoKSB7XHJcblx0XHRcdGxldCBsYXN0ID0gdGhpcy5fdmFsdWVzLmxlbmd0aCAtIDE7XHJcblx0XHRcdHJldHVybiB0aGlzLl92YWx1ZXNbbGFzdF07XHJcblx0XHR9XHJcblx0fVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL0NvcmUvVXRpbHMvVW5pcXVlU3RhY2sudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vUmVzaXplckFQSS9DaHJvbWUvV2luZG93cy50c1wiIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Ub29sc1BvcHVwLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBXaW5kb3dzU3RhY2sge1xyXG5cdGltcG9ydCBXaW5kb3dzID0gUmVzaXplckFQSS5DaHJvbWUuV2luZG93cztcclxuXHJcblx0bGV0IHdpblN0YWNrID0gbmV3IENvcmUuVXRpbHMuVW5pcXVlU3RhY2soKTtcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEN1cnJlbnQoKSB7XHJcblx0XHRyZXR1cm4gd2luU3RhY2suY3VycmVudCgpO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEFwcGVuZCh3aW5JZCkge1xyXG5cdFx0cmV0dXJuIHdpblN0YWNrLmFwcGVuZCh3aW5JZCk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gUmVtb3ZlKHdpbklkKSB7XHJcblx0XHRyZXR1cm4gd2luU3RhY2sucmVtb3ZlKHdpbklkKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBJbml0KCkge1xyXG5cdFx0V2luZG93cy5PbignRm9jdXNDaGFuZ2VkJywgd2luSWQgPT4ge1xyXG5cdFx0XHRpZiAod2luSWQgPT09IFdpbmRvd3MuTk9ORSB8fCB3aW5JZCA9PT0gVG9vbHNQb3B1cC5JRCgpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aW5TdGFjay5hcHBlbmQod2luSWQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0V2luZG93cy5PbignUmVtb3ZlZCcsIHdpbklkID0+IHtcclxuXHRcdFx0d2luU3RhY2sucmVtb3ZlKHdpbklkKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdFdpbmRvd3MuQWxsKCkudGhlbih3aW5kb3dzID0+IHtcclxuXHRcdFx0bGV0IGZvY3VzZWQgPSAwO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgd2luIG9mIHdpbmRvd3MpIHtcclxuXHRcdFx0XHR3aW4uZm9jdXNlZCAmJiAoZm9jdXNlZCA9IHdpbi5pZCk7XHJcblx0XHRcdFx0d2luU3RhY2suYXBwZW5kKHdpbi5pZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvY3VzZWQgJiYgd2luU3RhY2suYXBwZW5kKGZvY3VzZWQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59IiwibW9kdWxlIENvcmUuVXRpbHMge1xuXHRleHBvcnQgZnVuY3Rpb24gSXNCZXRhKCk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IG1hbmlmZXN0OiBhbnkgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuXHRcdGNvbnN0IGlzQmV0YTogYm9vbGVhbiA9IEJvb2xlYW4obWFuaWZlc3QudmVyc2lvbl9uYW1lLm1hdGNoKC9iZXRhL2kpKTtcblxuXHRcdHJldHVybiBpc0JldGE7XG5cdH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vQ29yZS9VdGlscy9SZXF1ZXN0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL0NvcmUvVXRpbHMvVXRpbHMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vUmVzaXplckFQSS9TZXR0aW5ncy50c1wiIC8+XHJcblxyXG5tb2R1bGUgQmFubmVyIHtcclxuXHRpbXBvcnQgU2V0dGluZ3MgPSBSZXNpemVyQVBJLlNldHRpbmdzO1xyXG5cdGltcG9ydCBSZXF1ZXN0ID0gQ29yZS5VdGlscy5SZXF1ZXN0O1xyXG5cdGltcG9ydCBVdGlscyA9IENvcmUuVXRpbHM7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXQoaWQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IGxpY2Vuc2U7XHJcblx0XHRyZXR1cm4gU2V0dGluZ3MuR2V0KCdsaWNlbnNlJywgZmFsc2UpLnRoZW4oZGV0YWlscyA9PiB7XHJcblx0XHRcdGxpY2Vuc2UgPSBkZXRhaWxzO1xyXG5cdFx0XHRyZXR1cm4gU2V0dGluZ3MuR2V0KCdiYW5uZXJIaWRkZW4nLCBudWxsLCB0cnVlKTtcclxuXHRcdH0pLnRoZW4oaGlkZGVuID0+IHtcclxuXHRcdFx0bGV0IHRpbWVzdGFtcCA9IGhpZGRlbiA/IChuZXcgRGF0ZShoaWRkZW4pKS5nZXRUaW1lKCkgOiAwO1xyXG5cdFx0XHRsZXQgc3RheUhpZGRlbiA9IDIgKiAyNCAqIDM2MDAgKiAxMDAwOyAvLyBldmVyeSAyIGRheXNcclxuXHJcblx0XHRcdC8vIG9ubHkgc2hvdyB0aGUgYmFubmVyIG9uY2UgYSB3ZWVrIGZvciBub24tUHJvIGFuZCBub24tQmV0YSB1c2Vyc1xyXG5cdFx0XHRpZiAobGljZW5zZSB8fCBVdGlscy5Jc0JldGEoKSB8fCB0aW1lc3RhbXAgKyBzdGF5SGlkZGVuID4gRGF0ZS5ub3coKSkge1xyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBSZXF1ZXN0LkdldEpTT04oJ2Fzc2V0cy9hZmZpbGlhdGVzL2Jhbm5lcnMuanNvbicpLnRoZW4oKGJhbm5lcnM6IGFueVtdKSA9PiB7XHJcblx0XHRcdFx0YmFubmVycyA9IGJhbm5lcnMuZmlsdGVyKGJhbm5lciA9PiBiYW5uZXIuZW5hYmxlZCk7XHJcblxyXG5cdFx0XHRcdGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJhbm5lcnMubGVuZ3RoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoYmFubmVyc1tpZF0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gU3RhdHVzKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gU2V0dGluZ3MuR2V0KCdiYW5uZXJIaWRkZW4nLCBudWxsLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBIaWRlKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gU2V0dGluZ3MuR2V0KCdiYW5uZXJIaWRkZW4nLCBudWxsLCB0cnVlKS50aGVuKGhpZGRlbiA9PiB7XHJcblx0XHRcdFNldHRpbmdzLlNldCgnYmFubmVySGlkZGVuJywgX3RvZGF5KCksIHRydWUpO1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCFoaWRkZW4pO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF90b2RheSgpOiBzdHJpbmcge1xyXG5cdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLScgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLScgKyBkYXRlLmdldERhdGUoKTtcclxuXHR9XHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1Jlc2l6ZXJBUEkvU2V0dGluZ3MudHNcIiAvPlxyXG5cclxubW9kdWxlIEN5Y2xlUHJlc2V0cyB7XHJcblx0aW1wb3J0IFNldHRpbmdzID0gUmVzaXplckFQSS5TZXR0aW5ncztcclxuXHJcblx0bGV0IHByZXZpb3VzID0gLTE7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXROZXh0KCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX2dldFByZXNldCgxKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBHZXRQcmV2KCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gX2dldFByZXNldCgtMSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfZ2V0UHJlc2V0KGRpcmVjdGlvbjogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBTZXR0aW5ncy5HZXQoJ3ByZXNldHMnKS50aGVuKHByZXNldHMgPT4ge1xyXG5cdFx0XHRwcmV2aW91cyA9IChwcmV2aW91cyArIGRpcmVjdGlvbiArIHByZXNldHMubGVuZ3RoKSAlIHByZXNldHMubGVuZ3RoO1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByZXNldHNbcHJldmlvdXNdKTtcclxuXHRcdH0pXHJcblx0fVxyXG59IiwiXHJcbm1vZHVsZSBVcGRhdGVyIHtcclxuXHRpbXBvcnQgUnVudGltZSAgPSBSZXNpemVyQVBJLkNocm9tZS5SdW50aW1lO1xyXG5cdGltcG9ydCBTZXR0aW5ncyA9IFJlc2l6ZXJBUEkuU2V0dGluZ3M7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBJbml0KCkge1xyXG5cdFx0Y2hyb21lLnJ1bnRpbWUuc2V0VW5pbnN0YWxsVVJMKCdodHRwOi8vY29vbHgxMC5jb20vd2luZG93LXJlc2l6ZXIvZ29vZC1ieWUucGhwJyk7XHJcblxyXG5cdFx0UnVudGltZS5PbignSW5zdGFsbGVkJywgZGV0YWlscyA9PiB7XHJcblx0XHRcdFNldHRpbmdzLkdldCgnb3JpZ2luYWxJbnN0YWxsRGF0ZScpLnRoZW4ob3JpZ2luYWxJbnN0YWxsRGF0ZSA9PiB7XHJcblx0XHRcdFx0aWYgKCFvcmlnaW5hbEluc3RhbGxEYXRlKSB7XHJcblx0XHRcdFx0XHRTZXR0aW5ncy5TZXQoJ29yaWdpbmFsSW5zdGFsbERhdGUnLCBEYXRlLm5vdygpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRzd2l0Y2ggKGRldGFpbHMucmVhc29uKSB7XHJcblx0XHRcdFx0Y2FzZSAnaW5zdGFsbCc6XHJcblx0XHRcdFx0XHRTZXR0aW5ncy5HZXQoJ3ByZXNldHMnKS50aGVuKHByZXNldHMgPT4ge1xyXG5cdFx0XHRcdFx0XHQhcHJlc2V0cyAmJiBCYWNrZ3JvdW5kLlNhdmVTZXR0aW5ncyhTZXR0aW5ncy5EZWZhdWx0U2V0dGluZ3MpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5jcmVhdGUoe1xyXG5cdFx0XHRcdFx0XHR1cmw6ICdodHRwOi8vY29vbHgxMC5jb20vd2luZG93LXJlc2l6ZXIvd2VsY29tZS5waHAnLFxyXG5cdFx0XHRcdFx0XHRhY3RpdmU6IHRydWVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICd1cGRhdGUnOlxyXG5cdFx0XHRcdFx0bGV0IHByZXZpb3VzVmVyc2lvbiA9IHBhcnNlSW50KGRldGFpbHMucHJldmlvdXNWZXJzaW9uKTtcclxuXHJcblx0XHRcdFx0XHQvLyBpZiAoZGV0YWlscy5wcmV2aW91c1ZlcnNpb24ubWF0Y2goL14yXFwuNS8pKSB7XHJcblx0XHRcdFx0XHQvLyBcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdGlmIChwcmV2aW91c1ZlcnNpb24gPT0gMSkge1xyXG5cdFx0XHRcdFx0XHQvLyBpbXBvcnQgc2V0dGluZ3MgZnJvbSAxLngueCB2ZXJzaW9uc1xyXG5cdFx0XHRcdFx0XHRsZXQgb2xkU2V0dGluZ3MgPSBTZXR0aW5ncy5QYXJzZVYxKHdpbmRvdy5sb2NhbFN0b3JhZ2UpO1xyXG5cdFx0XHRcdFx0XHRCYWNrZ3JvdW5kLlNhdmVTZXR0aW5ncyhvbGRTZXR0aW5ncyk7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRTZXR0aW5ncy5HZXQoeyd1c2VNb25vY2hyb21lSWNvbic6IG51bGx9KS50aGVuKG9sZCA9PiB7XHJcblx0XHRcdFx0XHRcdGlmIChvbGQudXNlTW9ub2Nocm9tZUljb24gIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRTZXR0aW5ncy5EZWwoJ3VzZU1vbm9jaHJvbWVJY29uJyk7XHJcblx0XHRcdFx0XHRcdFx0U2V0dGluZ3MuU2V0KCdwb3B1cEljb25TdHlsZScsIDApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ3dhc1VwZGF0ZWQnXSA9IHByZXZpb3VzVmVyc2lvbjtcclxuXHRcdFx0XHRcdFNob3dCYWRnZSgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGlmICh3aW5kb3cubG9jYWxTdG9yYWdlWyd3YXNVcGRhdGVkJ10pIHtcclxuXHRcdFx0U2hvd0JhZGdlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gU2hvd0JhZGdlKCkge1xyXG5cdFx0Y2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0IDogJ25ldyd9KTtcclxuXHRcdGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtjb2xvciA6ICcjNzdjMzVhJ30pO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIEhpZGVCYWRnZSgpIHtcclxuXHRcdGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dCA6ICcnfSk7XHJcblx0fVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0NvcmUvVXRpbHMvRW51bXMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vQ29yZS9VdGlscy9VVUlELnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0NvcmUvVXRpbHMvUmVxdWVzdC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9SZXNpemVyQVBJL1Rvb2x0aXAudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUmVzaXplckFQSS9TZXR0aW5ncy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9SZXNpemVyQVBJL1NldHRpbmdzUGFnZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9SZXNpemVyQVBJL0Nocm9tZS9XaW5kb3dzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL1Jlc2l6ZXJBUEkvQ2hyb21lL1RhYnMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vUmVzaXplckFQSS9DaHJvbWUvUnVudGltZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9SZXNpemVyQVBJL0Nocm9tZS9Db250ZXh0TWVudXMudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYmFja2dyb3VuZC9Ub29sc1BvcHVwLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYmFja2dyb3VuZC9XaW5kb3dzU3RhY2sudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9iYWNrZ3JvdW5kL0Jhbm5lci50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2JhY2tncm91bmQvQ3ljbGVQcmVzZXRzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYmFja2dyb3VuZC9VcGRhdGVyLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBCYWNrZ3JvdW5kIHtcclxuXHRpbXBvcnQgRW5kcG9pbnRWaXNpYmlsaXR5ID0gRXh0QVBJLlJvdXRlci5FbmRwb2ludFZpc2liaWxpdHk7XHJcblx0aW1wb3J0IFByZXNldFR5cGUgICAgICAgICA9IENvcmUuUHJlc2V0VHlwZTtcclxuXHRpbXBvcnQgUHJlc2V0VGFyZ2V0ICAgICAgID0gQ29yZS5QcmVzZXRUYXJnZXQ7XHJcblx0aW1wb3J0IFByZXNldFBvc2l0aW9uICAgICA9IENvcmUuUHJlc2V0UG9zaXRpb247XHJcblxyXG5cdGltcG9ydCBUb29sdGlwICAgICAgPSBSZXNpemVyQVBJLlRvb2x0aXA7XHJcblx0aW1wb3J0IFdpbmRvd3MgICAgICA9IFJlc2l6ZXJBUEkuQ2hyb21lLldpbmRvd3M7XHJcblx0aW1wb3J0IFRhYnMgICAgICAgICA9IFJlc2l6ZXJBUEkuQ2hyb21lLlRhYnM7XHJcblx0aW1wb3J0IFJ1bnRpbWUgICAgICA9IFJlc2l6ZXJBUEkuQ2hyb21lLlJ1bnRpbWU7XHJcblx0aW1wb3J0IENvbnRleHRNZW51cyA9IFJlc2l6ZXJBUEkuQ2hyb21lLkNvbnRleHRNZW51cztcclxuXHRpbXBvcnQgU2V0dGluZ3MgICAgID0gUmVzaXplckFQSS5TZXR0aW5ncztcclxuXHRpbXBvcnQgU2V0dGluZ3NQYWdlID0gUmVzaXplckFQSS5TZXR0aW5nc1BhZ2U7XHJcblxyXG5cdGltcG9ydCBSZXF1ZXN0ICAgICAgPSBDb3JlLlV0aWxzLlJlcXVlc3Q7XHJcblxyXG5cdEV4dEFQSS5pbml0KCk7XHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdyZXNpemUnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlB1YmxpYyxcclxuXHRcdGhhbmRsZXI6IFJlc2l6ZVxyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdvcGVuLXVybCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IE9wZW5VcmxcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnb3Blbi1hcy1wb3B1cCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IE9wZW5Bc1BvcHVwXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ2dldC1iYW5uZXInLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBCYW5uZXIuR2V0XHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ2hpZGUtYmFubmVyJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogQmFubmVyLkhpZGVcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnZ2V0LWJhbm5lci1zdGF0dXMnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBCYW5uZXIuU3RhdHVzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ3JvdGF0ZS12aWV3cG9ydCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IFJvdGF0ZVZpZXdwb3J0XHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ29wZW4tc2V0dGluZ3MnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBPcGVuU2V0dGluZ3NcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnb3Blbi1wcmVzZXRzLXNldHRpbmdzJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogT3BlblByZXNldHNTZXR0aW5nc1xyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdvcGVuLXJlbGVhc2Utbm90ZXMnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBPcGVuUmVsZWFzZU5vdGVzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ29wZW4tcHJvLXBhZ2UnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBPcGVuUHJvUGFnZVxyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICd0b2dnbGUtdG9vbHRpcCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IFRvZ2dsZVRvb2x0aXBcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAndG9vbHRpcC1oaWRlLWRlbGF5JyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogR2V0VG9vbHRpcEhpZGVEZWxheVxyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICd0b29sdGlwLXBvc2l0aW9uJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogR2V0VG9vbHRpcFBvc2l0aW9uXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ2dldC16b29tJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogR2V0Wm9vbVxyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdsaW1pdC1wb3B1cCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IExpbWl0UG9wdXBcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnZ2V0LXByZXNldHMnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBHZXRQcmVzZXRzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ3NhdmUtcHJlc2V0JyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogU2F2ZVByZXNldFxyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdnZXQtc3luYy1zdGF0dXMnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBHZXRTeW5jU3RhdHVzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ3RvZ2dsZS1zeW5jJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogVG9nZ2xlU3luY1xyXG5cdH0pXHJcblxyXG5cdEV4dEFQSS5yZWdpc3Rlcih7XHJcblx0XHRhY3Rpb246ICdkZWZhdWx0LXNldHRpbmdzJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogR2V0RGVmYXVsdFNldHRpbmdzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ2dldC1zZXR0aW5ncycsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IEdldFNldHRpbmdzXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ3NhdmUtc2V0dGluZ3MnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBTYXZlU2V0dGluZ3NcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnaW1wb3J0LXNldHRpbmdzJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogSW1wb3J0U2V0dGluZ3NcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAnc2V0dGluZ3M6cmVxdWVzdGVkLXBhZ2UnLFxyXG5cdFx0dmlzaWJpbGl0eTogRW5kcG9pbnRWaXNpYmlsaXR5LlByaXZhdGUsXHJcblx0XHRoYW5kbGVyOiBTZXR0aW5nc0dldFJlcXVlc3RlZFBhZ2VcclxuXHR9KVxyXG5cclxuXHRFeHRBUEkucmVnaXN0ZXIoe1xyXG5cdFx0YWN0aW9uOiAncHJvOmNoZWNrb3V0LXVybCcsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IFByb0NoZWNrb3V0VXJsXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ3BybzphY3RpdmF0ZS1saWNlbnNlJyxcclxuXHRcdHZpc2liaWxpdHk6IEVuZHBvaW50VmlzaWJpbGl0eS5Qcml2YXRlLFxyXG5cdFx0aGFuZGxlcjogUHJvQWN0aXZhdGVMaWNlbnNlXHJcblx0fSlcclxuXHJcblx0RXh0QVBJLnJlZ2lzdGVyKHtcclxuXHRcdGFjdGlvbjogJ19kZWJ1ZycsXHJcblx0XHR2aXNpYmlsaXR5OiBFbmRwb2ludFZpc2liaWxpdHkuUHJpdmF0ZSxcclxuXHRcdGhhbmRsZXI6IF9ERUJVR1xyXG5cdH0pXHJcblxyXG5cclxuXHRXaW5kb3dzU3RhY2suSW5pdCgpO1xyXG5cdFVwZGF0ZXIuSW5pdCgpO1xyXG5cclxuXHRmdW5jdGlvbiBQcm9DaGVja291dFVybChwYXJhbXM6IGFueSwgc2VuZGVyOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFJlcXVlc3QuUG9zdEpTT04oJ2h0dHBzOi8vY29vbHgxMC5jb20vd2luZG93LXJlc2l6ZXIvcHJvL2NoZWNrb3V0LXVybCcsIHtwcmljZTogcGFyYW1zLnByaWNlfSk7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIFByb0FjdGl2YXRlTGljZW5zZShwYXJhbXM6IGFueSwgc2VuZGVyOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFJlcXVlc3QuUG9zdEpTT04oJ2h0dHBzOi8vY29vbHgxMC5jb20vd2luZG93LXJlc2l6ZXIvcHJvL2FjdGl2YXRlLWxpY2Vuc2UnLCB7a2V5OiBwYXJhbXMua2V5fSkudGhlbihyZXNwb25zZSA9PiB7XHJcblx0XHRcdGlmICghcmVzcG9uc2UuZXJyb3IpIHtcclxuXHRcdFx0XHRyZXR1cm4gU2F2ZVNldHRpbmdzKHtsaWNlbnNlOiByZXNwb25zZS5kYXRhfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF9ERUJVRyhkYXRhOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3BlblVybChwYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gVGFicy5DcmVhdGUoe3VybDogcGFyYW1zLnVybH0pO1xyXG5cdH1cclxuXHJcblx0Y2hyb21lLmNvbW1hbmRzLm9uQ29tbWFuZC5hZGRMaXN0ZW5lcigoY29tbWFuZDogc3RyaW5nKSA9PiB7XHJcblx0XHRzd2l0Y2ggKGNvbW1hbmQpIHtcclxuXHRcdFx0Y2FzZSAnYS1tYW51YWwtdG9vbHRpcC10b2dnbGUnOlxyXG5cdFx0XHRcdFRvZ2dsZVRvb2x0aXAoKS5jYXRjaChlcnIgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVyci5JTlZBTElEX1BST1RPQ09MKSB7XHJcblx0XHRcdFx0XHRcdGFsZXJ0KCdUaGlzIGZlYXR1cmUgb25seSB3b3JrcyBvbiBwYWdlcyBsb2FkZWQgdXNpbmcgb25lIG9mIHRoZSBcImh0dHA6Ly9cIiwgXCJodHRwczovL1wiIG9yIFwiZmlsZTovL1wiIHByb3RvY29scyEnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZXJyLldFQlNUT1JFX1BFUk1JU1NJT04pIHtcclxuXHRcdFx0XHRcdFx0YWxlcnQoJ1RoaXMgZmVhdHVyZSBkb2VzblxcJ3Qgd29yayBvbiB0aGlzIHRhYiBiZWNhdXNlIGV4dGVuc2lvbnMgYXJlIG5vdCBhbGxvd2VkIHRvIGFsdGVyIHRoZSBXZWJzdG9yZSBwYWdlcyEnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdiLXJvdGF0ZS12aWV3cG9ydCc6XHJcblx0XHRcdFx0Um90YXRlVmlld3BvcnQoKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdjLWN5Y2xlLXByZXNldHMnOlxyXG5cdFx0XHRcdEN5Y2xlUHJlc2V0cy5HZXROZXh0KCkudGhlbihSZXNpemUpO1xyXG5cdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ2QtY3ljbGUtcHJlc2V0cy1yZXZlcnNlJzpcclxuXHRcdFx0XHRDeWNsZVByZXNldHMuR2V0UHJldigpLnRoZW4oUmVzaXplKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGxldCBtYXRjaCA9IFN0cmluZyhjb21tYW5kKS5tYXRjaCgvcHJlc2V0c1xcLShcXGQrKS8pO1xyXG5cdFx0XHRcdGxldCBpbmRleCA9IG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSAtIDEgOiAtMTtcclxuXHJcblx0XHRcdFx0KGluZGV4ID4gLTEpICYmIFNldHRpbmdzLkdldCgncHJlc2V0cycpLnRoZW4ocHJlc2V0cyA9PiB7XHJcblx0XHRcdFx0XHRwcmVzZXRzW2luZGV4XSAmJiBSZXNpemUocHJlc2V0c1tpbmRleF0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdFdpbmRvd3MuT24oJ0ZvY3VzQ2hhbmdlZCcsIHdpbklkID0+IHtcclxuXHRcdGlmICh3aW5JZCAhPT0gV2luZG93cy5OT05FKSB7XHJcblx0XHRcdFdpbmRvd3MuR2V0KHdpbklkKS50aGVuKHdpbiA9PiB7XHJcblx0XHRcdFx0aWYgKHdpbi50eXBlID09ICdwb3B1cCcgJiYgd2luSWQgIT09IFRvb2xzUG9wdXAuSUQoKSkge1xyXG5cdFx0XHRcdFx0Q29udGV4dE1lbnVzLkNyZWF0ZSh7aWQ6ICdjb250ZXh0LW1lbnUtaXRlbScsIGNvbnRleHRzOiBbJ2FsbCddLCB0aXRsZTogJ1Nob3cgdGhlIHJlc2l6ZXIgd2luZG93J30pLmNhdGNoKF9zaWxlbmNlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Q29udGV4dE1lbnVzLlJlbW92ZSgnY29udGV4dC1tZW51LWl0ZW0nKS5jYXRjaChfc2lsZW5jZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Q29udGV4dE1lbnVzLk9uKCdDbGlja2VkJywgKGluZm8sIHRhYikgPT4ge1xyXG5cdFx0V2luZG93cy5HZXQodGFiLndpbmRvd0lkKS50aGVuKF9hdHRhY2hUb29sc1BvcHVwKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gT3BlbkFzUG9wdXAocGFyYW1zPzogSVJlc2l6ZU9wdGlvbnMpOiBQcm9taXNlPFdpbmRvd3MuSVdpbmRvdz4ge1xyXG5cdFx0cGFyYW1zID0gcGFyYW1zIHx8IHtcclxuXHRcdFx0d2lkdGg6IDgwMCxcclxuXHRcdFx0aGVpZ2h0OiA0ODAsXHJcblx0XHRcdHRhcmdldDogUHJlc2V0VGFyZ2V0LlZJRVdQT1JULFxyXG5cdFx0XHRwb3NpdGlvbjogUHJlc2V0UG9zaXRpb24uQ0VOVEVSXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGxldCBkZXRhaWxzOiBJV2luZG93RGV0YWlscztcclxuXHJcblx0XHRcdF9nZXREZXRhaWxzKClcclxuXHRcdFx0XHQudGhlbihwcm9wcyA9PiBQcm9taXNlLnJlc29sdmUoZGV0YWlscyA9IHByb3BzKSlcclxuXHRcdFx0XHQudGhlbihwcm9wcyA9PiBUYWJzLkR1cGxpY2F0ZShkZXRhaWxzLnRhYklkKSlcclxuXHRcdFx0XHQudGhlbih0YWIgPT4gV2luZG93cy5DcmVhdGUoe3RhYklkOiBkZXRhaWxzLnRhYklkLCB0eXBlOiAncG9wdXAnfSkpXHJcblx0XHRcdFx0LnRoZW4od2luID0+IFJlc2l6ZShwYXJhbXMpKVxyXG5cdFx0XHRcdC50aGVuKHdpbiA9PiBfYXR0YWNoVG9vbHNQb3B1cCh3aW4pKVxyXG5cdFx0XHRcdC50aGVuKHJlc29sdmUpXHJcblx0XHRcdFx0LmNhdGNoKGVyciA9PiB7XHJcblx0XHRcdFx0XHRyZWplY3QoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF9hdHRhY2hUb29sc1BvcHVwKG1haW5XaW5kb3c6IFdpbmRvd3MuSVdpbmRvdyk6IFByb21pc2U8V2luZG93cy5JV2luZG93PiB7XHJcblx0XHRyZXR1cm4gVG9vbHNQb3B1cC5BdHRhY2hUbyhtYWluV2luZG93KS50aGVuKHdpbiA9PiB7XHJcblx0XHRcdFdpbmRvd3NTdGFjay5SZW1vdmUoVG9vbHNQb3B1cC5JRCgpKTtcclxuXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUod2luKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gR2V0UHJlc2V0cygpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzLkdldCgncHJlc2V0cycpLnRoZW4ocHJlc2V0cyA9PiBQcm9taXNlLnJlc29sdmUocHJlc2V0cyB8fCBbXSkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gU2F2ZVByZXNldChwcmVzZXQ6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gR2V0UHJlc2V0cygpLnRoZW4ocHJlc2V0cyA9PiB7XHJcblx0XHRcdGxldCBleGlzdGluZyA9IHByZXNldHMuZmluZEluZGV4KHAgPT4gcC5pZCA9PT0gcHJlc2V0LmlkKTtcclxuXHJcblx0XHRcdGlmIChleGlzdGluZyA+IC0xKSB7XHJcblx0XHRcdFx0cHJlc2V0c1tleGlzdGluZ10gPSBwcmVzZXQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cHJlc2V0cy51bnNoaWZ0KHByZXNldCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBTYXZlU2V0dGluZ3Moe3ByZXNldHM6IHByZXNldHN9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gR2V0RGVmYXVsdFNldHRpbmdzKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFNldHRpbmdzLkRlZmF1bHRTZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBHZXRTZXR0aW5ncyhrZXk/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzLkdldChrZXkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gR2V0U3luY1N0YXR1cygpIHtcclxuXHRcdHJldHVybiBTZXR0aW5ncy5HZXQoJ2Rpc2FibGVTeW5jJywgZmFsc2UsIHRydWUpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gVG9nZ2xlU3luYyhzdGF0dXMpIHtcclxuXHRcdHJldHVybiBTZXR0aW5ncy5TZXQoJ2Rpc2FibGVTeW5jJywgc3RhdHVzLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBTYXZlU2V0dGluZ3MoZGF0YTogU2V0dGluZ3MuSUtleXMpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0UnVudGltZS5Ccm9hZGNhc3Qoe1VwZGF0ZWRTZXR0aW5nczogZGF0YX0pLmNhdGNoKF9zaWxlbmNlKTtcclxuXHJcblx0XHRpZiAoJ3BvcHVwSWNvblN0eWxlJyBpbiBkYXRhKSB7XHJcblx0XHRcdHNldEljb25UeXBlKGRhdGEucG9wdXBJY29uU3R5bGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgnaGlkZVRvb2x0aXBEZWxheScgaW4gZGF0YSkge1xyXG5cdFx0XHRUYWJzLlF1ZXJ5KCkudGhlbih0YWJzID0+IHtcclxuXHRcdFx0XHR0YWJzLmZvckVhY2godGFiID0+IFRvb2x0aXAuU2V0VGltZW91dCh0YWIuaWQsIGRhdGEuaGlkZVRvb2x0aXBEZWxheSkpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgnYWx3YXlzU2hvd1RoZVRvb2x0aXAnIGluIGRhdGEpIHtcclxuXHRcdFx0aWYgKGRhdGEuYWx3YXlzU2hvd1RoZVRvb2x0aXApIHtcclxuXHRcdFx0XHRUb29sdGlwLkVuYWJsZU9uQWxsUGFnZXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRUb29sdGlwLkRpc2FibGVPbkFsbFBhZ2VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gU2V0dGluZ3MuU2V0KGRhdGEpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gSW1wb3J0U2V0dGluZ3MoZGF0YTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGxldCBzZXR0aW5nczogYW55ID0ge307XHJcblxyXG5cdFx0aWYgKCdzZXR0aW5ncycgaW4gZGF0YSkge1xyXG5cdFx0XHRkYXRhWydXaW5kb3dSZXNpemVyLlJvd3MnXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEucHJlc2V0cyk7XHJcblx0XHRcdGlmIChkYXRhLnNldHRpbmdzKSB7XHJcblx0XHRcdFx0ZGF0YVsnV2luZG93UmVzaXplci5Ub29sdGlwJ10gPSBkYXRhLnNldHRpbmdzLnRvb2x0aXA7XHJcblx0XHRcdFx0ZGF0YVsnV2luZG93UmVzaXplci5Ub29sdGlwRGVsYXknXSA9IGRhdGEuc2V0dGluZ3MudG9vbHRpcERlbGF5O1xyXG5cdFx0XHRcdGRhdGFbJ1dpbmRvd1Jlc2l6ZXIuUG9wdXBEZXNjcmlwdGlvbiddID0gZGF0YS5zZXR0aW5ncy5wb3B1cERlc2NyaXB0aW9uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXR0aW5ncyA9IFNldHRpbmdzLlBhcnNlVjEoZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gU2V0dGluZ3MuRGVmYXVsdFNldHRpbmdzKSB7XHJcblx0XHRcdFx0aWYgKGtleSBpbiBkYXRhKSB7XHJcblx0XHRcdFx0XHRzZXR0aW5nc1trZXldID0gZGF0YVtrZXldO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBTZXR0aW5ncy5TZXQoc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gUm90YXRlVmlld3BvcnQoKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBfZ2V0RGV0YWlscygpLnRoZW4oZGV0YWlscyA9PiBSZXNpemUoe1xyXG5cdFx0XHR0YXJnZXQgOiBQcmVzZXRUYXJnZXQuVklFV1BPUlQsXHJcblx0XHRcdHdpZHRoICA6IGRldGFpbHMuaW5uZXJIZWlnaHQgLyBkZXRhaWxzLnpvb20sXHJcblx0XHRcdGhlaWdodCA6IGRldGFpbHMuaW5uZXJXaWR0aCAvIGRldGFpbHMuem9vbVxyXG5cdFx0fSkpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBTZXR0aW5nc0dldFJlcXVlc3RlZFBhZ2UoKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBTZXR0aW5nc1BhZ2UuQ3VycmVudCgpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3BlblNldHRpbmdzKHZpZXc6IHN0cmluZyA9IG51bGwpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzUGFnZS5PcGVuKHZpZXcpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3BlblByZXNldHNTZXR0aW5ncygpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzUGFnZS5PcGVuKCcjcHJlc2V0cycpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3BlblJlbGVhc2VOb3RlcygpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzUGFnZS5PcGVuKCcjaGVscC9yZWxlYXNlLW5vdGVzJyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBPcGVuUHJvUGFnZSgpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzUGFnZS5PcGVuKCcjcHJvJyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBUb2dnbGVUb29sdGlwKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgdGFiOiBUYWJzLklUYWI7XHJcblxyXG5cdFx0cmV0dXJuIF9nZXRUYWIoKVxyXG5cdFx0XHQudGhlbih0ID0+IF92YWxpZGF0ZVVybCh0YWIgPSB0KSlcclxuXHRcdFx0LnRoZW4ocCA9PiBUb29sdGlwLlRvZ2dsZSh0YWIuaWQpKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gR2V0VG9vbHRpcEhpZGVEZWxheSgpOiBQcm9taXNlPG51bWJlcj4ge1xyXG5cdFx0cmV0dXJuIFNldHRpbmdzLkdldCgnaGlkZVRvb2x0aXBEZWxheScpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gR2V0VG9vbHRpcFBvc2l0aW9uKCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gU2V0dGluZ3MuR2V0KCd0b29sdGlwUG9zaXRpb24nKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIEdldFpvb20ocGFyYW1zLCBzZW5kZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG5cdFx0bGV0IHRhYklkOiBudW1iZXIgPSBzZW5kZXIudGFiLmlkO1xyXG5cdFx0bGV0IHRhYnM6IGFueSA9IGNocm9tZS50YWJzO1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRhYnMuZ2V0Wm9vbSh0YWJJZCwgem9vbSA9PiByZXNvbHZlKHpvb20pKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2dldFRhYih3aW5JZD86IG51bWJlcik6IFByb21pc2U8VGFicy5JVGFiPiB7XHJcblx0XHRyZXR1cm4gVGFicy5HZXRBY3RpdmUod2luSWQgfHwgV2luZG93c1N0YWNrLkN1cnJlbnQoKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfZ2V0RGV0YWlscygpOiBQcm9taXNlPElXaW5kb3dEZXRhaWxzPiB7XHJcblx0XHRyZXR1cm4gV2luZG93cy5VcGRhdGUoV2luZG93c1N0YWNrLkN1cnJlbnQoKSwge3N0YXRlOiAnbm9ybWFsJ30pXHJcblx0XHRcdC50aGVuKHdpbiA9PiBfZ2V0VGFiKHdpbi5pZClcclxuXHRcdFx0XHQudGhlbih0YWIgPT4gVGFicy5HZXRab29tKHRhYi5pZClcclxuXHRcdFx0XHRcdC50aGVuKHpvb20gPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcclxuXHRcdFx0XHRcdFx0XHRpZDogd2luLmlkLFxyXG5cdFx0XHRcdFx0XHRcdHRhYklkOiB0YWIuaWQsXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6IHdpbi53aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IHdpbi5oZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0dG9wOiB3aW4udG9wLFxyXG5cdFx0XHRcdFx0XHRcdGxlZnQ6IHdpbi5sZWZ0LFxyXG5cdFx0XHRcdFx0XHRcdGlubmVyV2lkdGg6IHRhYi53aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRpbm5lckhlaWdodDogdGFiLmhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHR1cmw6IHRhYi51cmwsXHJcblx0XHRcdFx0XHRcdFx0em9vbTogem9vbSxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdClcclxuXHRcdFx0KVxyXG5cdH1cclxuXHJcblx0aW50ZXJmYWNlIElXaW5kb3dEZXRhaWxzIHtcclxuXHRcdGlkOiBudW1iZXI7XHJcblx0XHR0YWJJZDogbnVtYmVyO1xyXG5cdFx0d2lkdGg6IG51bWJlcjtcclxuXHRcdGhlaWdodDogbnVtYmVyO1xyXG5cdFx0aW5uZXJXaWR0aDogbnVtYmVyO1xyXG5cdFx0aW5uZXJIZWlnaHQ6IG51bWJlcjtcclxuXHRcdHRvcDogbnVtYmVyO1xyXG5cdFx0bGVmdDogbnVtYmVyO1xyXG5cdFx0em9vbTogbnVtYmVyO1xyXG5cdFx0dXJsPzogc3RyaW5nO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX19jb21wdXRlT3B0aW9ucyhwYXJhbXM6IElSZXNpemVPcHRpb25zLCB3aW46IElXaW5kb3dEZXRhaWxzKTogUHJvbWlzZTxJUmVzaXplT3B0aW9ucz4ge1xyXG5cdFx0bGV0IG9wdGlvbnM6IElSZXNpemVPcHRpb25zID0ge307XHJcblxyXG5cdFx0Zm9yIChsZXQgcHJvcCBvZiBbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAnbGVmdCddKSB7XHJcblx0XHRcdGlzU2V0KHBhcmFtc1twcm9wXSkgJiYgKG9wdGlvbnNbcHJvcF0gPSBwYXJhbXNbcHJvcF0pXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHBhcmFtcy50YXJnZXQgPT09IFByZXNldFRhcmdldC5WSUVXUE9SVCkge1xyXG5cdFx0XHRpZiAocGFyYW1zLndpZHRoKSB7XHJcblx0XHRcdFx0b3B0aW9ucy53aWR0aCA9IHdpbi53aWR0aCAtIHdpbi5pbm5lcldpZHRoICsgTWF0aC5yb3VuZChwYXJhbXMud2lkdGggKiB3aW4uem9vbSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwYXJhbXMuaGVpZ2h0KSB7XHJcblx0XHRcdFx0b3B0aW9ucy5oZWlnaHQgPSB3aW4uaGVpZ2h0IC0gd2luLmlubmVySGVpZ2h0ICsgTWF0aC5yb3VuZChwYXJhbXMuaGVpZ2h0ICogd2luLnpvb20pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFNldHRpbmdzLkdldCh7YWx3YXlzQ2VudGVyVGhlV2luZG93OiBmYWxzZSwgbGVmdEFsaWduV2luZG93OiBmYWxzZX0pLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRsZXQgY2VudGVyZWQ6IGJvb2xlYW4gICAgPSBzZXR0aW5ncy5hbHdheXNDZW50ZXJUaGVXaW5kb3c7XHJcblx0XHRcdGxldCBsZWZ0QWxpZ25lZDogYm9vbGVhbiA9IHNldHRpbmdzLmxlZnRBbGlnbldpbmRvdztcclxuXHRcdFx0bGV0IHNjcmVlbjogYW55ICAgICAgICAgID0gd2luZG93LnNjcmVlbjtcclxuXHJcblx0XHRcdGlmIChjZW50ZXJlZCB8fCBwYXJhbXMucG9zaXRpb24gPT09IFByZXNldFBvc2l0aW9uLkNFTlRFUikge1xyXG5cdFx0XHRcdC8vIGNlbnRlciB0aGUgd2luZG93IGlmIHRoZSBnbG9iYWwgb3B0aW9uIGlzIHNldCBvciByZXF1aXJlZCBieSB0aGUgcHJlc2V0XHJcblx0XHRcdFx0b3B0aW9ucy5sZWZ0ID0gTWF0aC5mbG9vcigoc2NyZWVuLmF2YWlsV2lkdGggLSBvcHRpb25zLndpZHRoKSAvIDIpICsgc2NyZWVuLmF2YWlsTGVmdDtcclxuXHRcdFx0XHRvcHRpb25zLnRvcCAgPSBNYXRoLmZsb29yKChzY3JlZW4uYXZhaWxIZWlnaHQgLSBvcHRpb25zLmhlaWdodCkgLyAyKSArIHNjcmVlbi5hdmFpbFRvcDtcclxuXHRcdFx0fSBlbHNlIGlmICghbGVmdEFsaWduZWQgJiYgaXNTZXQob3B0aW9ucy53aWR0aCkgJiYgIWlzU2V0KG9wdGlvbnMubGVmdCkgJiYgIWlzU2V0KG9wdGlvbnMudG9wKSkge1xyXG5cdFx0XHRcdC8vIGlmIHRoZSB1c2VyIGhhc24ndCBzZWxlY3RlZCB0aGUgb2xkIGJlaGF2aW9yICh3aW5kb3cgc3RheXMgbGVmdCBhbGlnbmVkKVxyXG5cdFx0XHRcdC8vIGtlZXAgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHdpbmRvdyAod2hlcmUgdGhlIGV4dGVuc2lvbnMnIGljb25zIGFyZSkgaW4gdGhlIHNhbWUgcGxhY2VcclxuXHRcdFx0XHRvcHRpb25zLmxlZnQgPSB3aW4ubGVmdCArIHdpbi53aWR0aCAtIG9wdGlvbnMud2lkdGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUob3B0aW9ucyk7XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gUmVzaXplKHBhcmFtczogSVJlc2l6ZU9wdGlvbnMpOiBQcm9taXNlPFdpbmRvd3MuSVdpbmRvdz4ge1xyXG5cdFx0bGV0IGluaXRpYWw6IElXaW5kb3dEZXRhaWxzO1xyXG5cdFx0bGV0IGRlYnVnOiBhbnkgPSB7XHJcblx0XHRcdF8gOiAobmV3IERhdGUoKSkudG9JU09TdHJpbmcoKSxcclxuXHRcdFx0ZGVzaXJlZDoge1xyXG5cdFx0XHRcdHdpZHRoOiBwYXJhbXMud2lkdGgsXHJcblx0XHRcdFx0aGVpZ2h0OiBwYXJhbXMuaGVpZ2h0LFxyXG5cdFx0XHRcdHRvcDogcGFyYW1zLnRvcCxcclxuXHRcdFx0XHRsZWZ0OiBwYXJhbXMubGVmdCxcclxuXHRcdFx0XHR0YXJnZXQ6IHBhcmFtcy50YXJnZXQsXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIF9nZXREZXRhaWxzKClcclxuXHRcdFx0LnRoZW4oY3VycmVudCA9PiB7XHJcblx0XHRcdFx0ZGVidWcuaW5pdGlhbCA9IHtcclxuXHRcdFx0XHRcdHdpZHRoOiBjdXJyZW50LndpZHRoLFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiBjdXJyZW50LmhlaWdodCxcclxuXHRcdFx0XHRcdGlubmVyV2lkdGg6IGN1cnJlbnQuaW5uZXJXaWR0aCxcclxuXHRcdFx0XHRcdGlubmVySGVpZ2h0OiBjdXJyZW50LmlubmVySGVpZ2h0LFxyXG5cdFx0XHRcdFx0dG9wOiBjdXJyZW50LnRvcCxcclxuXHRcdFx0XHRcdGxlZnQ6IGN1cnJlbnQubGVmdCxcclxuXHRcdFx0XHRcdHpvb206IGN1cnJlbnQuem9vbSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHJldHVybiBfX2NvbXB1dGVPcHRpb25zKHBhcmFtcywgaW5pdGlhbCA9IGN1cnJlbnQpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQudGhlbihvcHRpb25zID0+IHtcclxuXHRcdFx0XHRkZWJ1Zy5jb21wdXRlZCA9IG9wdGlvbnM7XHJcblx0XHRcdFx0cmV0dXJuIF9yZXNpemUoaW5pdGlhbC5pZCwgb3B0aW9ucyk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaChlcnJvcnMgPT4ge1xyXG5cdFx0XHRcdGxldCBhY3R1YWwgPSBlcnJvcnMgJiYgZXJyb3JzLk9VVF9PRl9CT1VORFMgJiYgZXJyb3JzLk9VVF9PRl9CT1VORFMuYWN0dWFsID8gZXJyb3JzLk9VVF9PRl9CT1VORFMuYWN0dWFsIDoge307XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZGVidWcuYWN0dWFsID0ge1xyXG5cdFx0XHRcdFx0d2lkdGg6IGFjdHVhbC53aWR0aCxcclxuXHRcdFx0XHRcdGhlaWdodDogYWN0dWFsLmhlaWdodCxcclxuXHRcdFx0XHRcdHRvcDogYWN0dWFsLnRvcCxcclxuXHRcdFx0XHRcdGxlZnQ6IGFjdHVhbC5sZWZ0LFxyXG5cdFx0XHRcdFx0dHlwZTogYWN0dWFsLnR5cGUsXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIFNldHRpbmdzLkdldCh7YWx3YXlzQ2VudGVyVGhlV2luZG93OiBmYWxzZSwgbGVmdEFsaWduV2luZG93OiBmYWxzZX0pLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IHRvcCA9IGluaXRpYWwudG9wO1xyXG5cdFx0XHRcdFx0bGV0IGxlZnQgPSBpbml0aWFsLmxlZnQgLSAoYWN0dWFsLndpZHRoIC0gaW5pdGlhbC53aWR0aCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGxldCBjZW50ZXJlZDogYm9vbGVhbiAgICA9IHNldHRpbmdzLmFsd2F5c0NlbnRlclRoZVdpbmRvdztcclxuXHRcdFx0XHRcdGxldCBsZWZ0QWxpZ25lZDogYm9vbGVhbiA9IHNldHRpbmdzLmxlZnRBbGlnbldpbmRvdztcclxuXHRcdFx0XHRcdGxldCBzY3JlZW46IGFueSAgICAgICAgICA9IHdpbmRvdy5zY3JlZW47XHJcblxyXG5cdFx0XHRcdFx0aWYgKGxlZnRBbGlnbmVkKSB7XHJcblx0XHRcdFx0XHRcdGxlZnQgPSBpbml0aWFsLmxlZnQ7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRlYnVnLmRlc2lyZWQudG9wICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHRvcCA9IGRlYnVnLmRlc2lyZWQudG9wO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkZWJ1Zy5kZXNpcmVkLmxlZnQgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0bGVmdCA9IGRlYnVnLmRlc2lyZWQubGVmdDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoY2VudGVyZWQgfHwgcGFyYW1zLnBvc2l0aW9uID09PSBQcmVzZXRQb3NpdGlvbi5DRU5URVIpIHtcclxuXHRcdFx0XHRcdFx0Ly8gY2VudGVyIHRoZSB3aW5kb3cgaWYgdGhlIGdsb2JhbCBvcHRpb24gaXMgc2V0IG9yIHJlcXVpcmVkIGJ5IHRoZSBwcmVzZXRcclxuXHRcdFx0XHRcdFx0bGVmdCA9IE1hdGguZmxvb3IoKHNjcmVlbi5hdmFpbFdpZHRoIC0gYWN0dWFsLndpZHRoKSAvIDIpICsgc2NyZWVuLmF2YWlsTGVmdDtcclxuXHRcdFx0XHRcdFx0dG9wICA9IE1hdGguZmxvb3IoKHNjcmVlbi5hdmFpbEhlaWdodCAtIGFjdHVhbC5oZWlnaHQpIC8gMikgKyBzY3JlZW4uYXZhaWxUb3A7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gcmVzZXQgd2luZG93IGluIGNhc2Ugb2YgZmFpbHVyZVxyXG5cdFx0XHRcdFx0V2luZG93cy5VcGRhdGUoaW5pdGlhbC5pZCwge3RvcCwgbGVmdH0pO1xyXG5cdFx0XHRcdFx0bGV0IGxvZyA9IFtdO1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0bG9nID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlWydkZWJ1Z0xvZyddIHx8ICdbXScpO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHt9XHJcblx0XHRcdFx0XHRsb2cuc3BsaWNlKDkpO1xyXG5cdFx0XHRcdFx0bG9nLnVuc2hpZnQoZGVidWcpO1xyXG5cclxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2RlYnVnTG9nJ10gPSBKU09OLnN0cmluZ2lmeShsb2cpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7ZXJyb3JzLCBkZWJ1Z30pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gTGltaXRQb3B1cChwYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gV2luZG93cy5VcGRhdGUoVG9vbHNQb3B1cC5JRCgpLCBwYXJhbXMpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2V4ZWN1dGVTY3JpcHQoY29kZTogc3RyaW5nLCB0YWJJZD86IG51bWJlciwgaW5qZWN0PzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRsZXQgZ2V0VGFiSWQgPSBQcm9taXNlLnJlc29sdmUodGFiSWQpO1xyXG5cclxuXHRcdFx0aWYgKCF0YWJJZCkge1xyXG5cdFx0XHRcdGdldFRhYklkID0gX2dldFRhYigpLnRoZW4odGFiID0+IFByb21pc2UucmVzb2x2ZSh0YWIuaWQpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Z2V0VGFiSWQudGhlbih0YWJJZCA9PiB7XHJcblx0XHRcdFx0bGV0IGNvbmZpZzogYW55ID0ge307XHJcblxyXG5cdFx0XHRcdGlmIChpbmplY3QpIHtcclxuXHRcdFx0XHRcdGNvbmZpZy5jb2RlID0gY29kZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uZmlnLmZpbGUgPSBjb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCB8fCBudWxsLCBjb25maWcsIHJlc3VsdCA9PiB7XHJcblx0XHRcdFx0XHRpZiAoUnVudGltZS5FcnJvcigpKSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh7J0lOVkFMSURfVEFCJzogUnVudGltZS5FcnJvcigpfSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdFswXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfcmVzaXplKHdpbklkLCBvcHRpb25zKTogUHJvbWlzZTxXaW5kb3dzLklXaW5kb3c+IHtcclxuXHRcdHJldHVybiBXaW5kb3dzLlVwZGF0ZSh3aW5JZCwgb3B0aW9ucykudGhlbih1cGRhdGVkID0+IHtcclxuXHRcdFx0bGV0IGVycm9yczogc3RyaW5nW10gPSBbXTtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLndpZHRoICYmIG9wdGlvbnMud2lkdGggPCB1cGRhdGVkLndpZHRoKSB7XHJcblx0XHRcdFx0ZXJyb3JzLnB1c2goJ01JTl9XSURUSCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5oZWlnaHQgJiYgb3B0aW9ucy5oZWlnaHQgPCB1cGRhdGVkLmhlaWdodCkge1xyXG5cdFx0XHRcdGVycm9ycy5wdXNoKCdNSU5fSEVJR0hUJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLndpZHRoICYmIG9wdGlvbnMud2lkdGggPiB1cGRhdGVkLndpZHRoKSB7XHJcblx0XHRcdFx0ZXJyb3JzLnB1c2goJ01BWF9XSURUSCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5oZWlnaHQgJiYgb3B0aW9ucy5oZWlnaHQgPiB1cGRhdGVkLmhlaWdodCkge1xyXG5cdFx0XHRcdGVycm9ycy5wdXNoKCdNQVhfSEVJR0hUJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlcnJvcnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHsnT1VUX09GX0JPVU5EUyc6IHtrZXlzOiBlcnJvcnMsIHRhcmdldDogb3B0aW9ucywgYWN0dWFsOiB1cGRhdGVkfX0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBbGwgZ29vZCFcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGVkKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNTZXQodmFsOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB2YWwgIT09IG51bGwgJiYgdmFsICE9PSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfdmFsaWRhdGVVcmwodGFiOiBUYWJzLklUYWIpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0bGV0IHByb3RvY29sID0gU3RyaW5nKHRhYi51cmwpLnNwbGl0KCc6Jykuc2hpZnQoKTtcclxuXHRcdGxldCBhbGxvd2VkICA9IFsnaHR0cCcsICdodHRwcycsICdmaWxlJ107XHJcblxyXG5cdFx0aWYgKGFsbG93ZWQuaW5kZXhPZihwcm90b2NvbCkgPCAwKSB7XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCh7J0lOVkFMSURfUFJPVE9DT0wnIDoge3Byb3RvY29sOiBwcm90b2NvbCwgdGFiOiB0YWJ9fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0X2V4ZWN1dGVTY3JpcHQoYChmdW5jdGlvbigpIHtyZXR1cm4gJyR7cHJvdG9jb2x9J30pKClgLCB0YWIuaWQsIHRydWUpXHJcblx0XHRcdFx0LnRoZW4ocmVzb2x2ZSlcclxuXHRcdFx0XHQuY2F0Y2goZXJyID0+IHtcclxuXHRcdFx0XHRcdGlmIChwcm90b2NvbCA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRcdHJlamVjdCh7J0ZJTEVfUFJPVE9DT0xfUEVSTUlTU0lPTicgOiB7dGFiOiB0YWIsIGVycjogZXJyfX0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KHsnV0VCU1RPUkVfUEVSTUlTU0lPTicgOiB7dGFiOiB0YWIsIGVycjogZXJyfX0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfc2lsZW5jZSgpIHt9XHJcblxyXG5cdGZ1bmN0aW9uIHNldEljb25UeXBlKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdF9fc2V0SWNvbihzdHlsZSk7XHJcblx0fVxyXG5cclxuXHRpbnRlcmZhY2UgSVZpZXdwb3J0IHtcclxuXHRcdHdpZHRoOiBudW1iZXI7XHJcblx0XHRoZWlnaHQ6IG51bWJlcjtcclxuXHRcdGRwcjogbnVtYmVyO1xyXG5cdFx0em9vbTogbnVtYmVyO1xyXG5cdFx0c2NyZWVuOiB7XHJcblx0XHRcdGF2YWlsSGVpZ2h0OiBudW1iZXI7XHJcblx0XHRcdGF2YWlsV2lkdGg6IG51bWJlcjtcclxuXHRcdFx0YXZhaWxMZWZ0OiBudW1iZXI7XHJcblx0XHRcdGF2YWlsVG9wOiBudW1iZXI7XHJcblx0XHRcdGhlaWdodDogbnVtYmVyO1xyXG5cdFx0XHR3aWR0aDogbnVtYmVyO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGludGVyZmFjZSBJUmVzaXplT3B0aW9ucyB7XHJcblx0XHR0YXJnZXQ/OiBQcmVzZXRUYXJnZXQsXHJcblx0XHR3aWR0aD86IG51bWJlcixcclxuXHRcdGhlaWdodD86IG51bWJlcixcclxuXHRcdHBvc2l0aW9uPzogUHJlc2V0UG9zaXRpb24sXHJcblx0XHR0b3A/OiBudW1iZXIsXHJcblx0XHRsZWZ0PzogbnVtYmVyLFxyXG5cdFx0c2V0dGluZ3M/OiBhbnlcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdEdldFNldHRpbmdzKCkudGhlbigoc2V0dGluZ3M6IFNldHRpbmdzLklLZXlzKSA9PiB7XHJcblx0XHRzZXRJY29uVHlwZShzZXR0aW5ncy5wb3B1cEljb25TdHlsZSk7XHJcblxyXG5cdFx0aWYgKHNldHRpbmdzLmFsd2F5c1Nob3dUaGVUb29sdGlwKSB7XHJcblx0XHRcdFRvb2x0aXAuRW5hYmxlT25BbGxQYWdlcygpO1xyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdGZ1bmN0aW9uIF9fc2V0SWNvbihzdHlsZTogc3RyaW5nKSB7XHJcblx0XHRzdHlsZSA9IFN0cmluZyhzdHlsZSk7XHJcblxyXG5cdFx0aWYgKHN0eWxlLm1hdGNoKC9eXFxkKyQvKSkge1xyXG5cdFx0XHRjb25zdCBzdHlsZXMgPSBbJ2dyZXknLCAnZGFyaytjb2xvcicsICdsaWdodCtjb2xvciddO1xyXG5cdFx0XHRzdHlsZSA9IFsnZ3JleScsICdkYXJrK2NvbG9yJywgJ2xpZ2h0K2NvbG9yJ11bc3R5bGVdIHx8ICdkYXJrK2NvbG9yJztcclxuXHRcdH1cclxuXHJcblx0XHRmZXRjaChjaHJvbWUucnVudGltZS5nZXRVUkwoJ2Fzc2V0cy9pY29ucy9icm93c2VyLWljb24tMTYuc3ZnJykpXHJcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcclxuXHRcdFx0LnRoZW4oc3ZnID0+IF9wcm9jZXNzQ29sb3JzKHN2ZykpXHJcblx0XHRcdC50aGVuKHN2ZyA9PiB7XHJcblx0XHRcdFx0bGV0IGRhdGEgID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCR7c3ZnfWA7XHJcblx0XHRcdFx0bGV0IGxpZ2h0ID0gc3R5bGUubWF0Y2goL2xpZ2h0Lyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChbXHJcblx0XHRcdFx0XHRzdmcySW1nRGF0YShkYXRhLCAxNiwgbGlnaHQsIDEpLFxyXG5cdFx0XHRcdFx0c3ZnMkltZ0RhdGEoZGF0YSwgMzIsIGxpZ2h0LCAyKVxyXG5cdFx0XHRcdF0pO1xyXG5cdFx0XHR9KS50aGVuKChbaWNvbjE2LCBpY29uMzJdKSA9PiB7XHJcblx0XHRcdFx0Y2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7IGltYWdlRGF0YToge1xyXG5cdFx0XHRcdFx0XCIxNlwiIDogaWNvbjE2LFxyXG5cdFx0XHRcdFx0XCIzMlwiIDogaWNvbjMyLFxyXG5cdFx0XHRcdH19KTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiBfcHJvY2Vzc0NvbG9ycyhzdmcpIHtcclxuXHRcdFx0c3dpdGNoIChzdHlsZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2xpZ2h0JzpcclxuXHRcdFx0XHRcdHN2ZyA9IHN2Zy5yZXBsYWNlKC8zNDdmMmIvLCAnZWVlJyk7XHJcblx0XHRcdFx0Y2FzZSAnbGlnaHQrY29sb3InOlxyXG5cdFx0XHRcdFx0c3ZnID0gc3ZnLnJlcGxhY2UoLzMzMy8sICdlZWUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnZGFyayc6XHJcblx0XHRcdFx0XHRzdmcgPSBzdmcucmVwbGFjZSgvMzQ3ZjJiLywgJzMzMycpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICduZXV0cmFsJzpcclxuXHRcdFx0XHRcdHN2ZyA9IHN2Zy5yZXBsYWNlKC8zNDdmMmIvLCAnNjY2Jyk7XHJcblx0XHRcdFx0XHRzdmcgPSBzdmcucmVwbGFjZSgvMzMzLywgJzY2NicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN2Zyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzdmcySW1nRGF0YShzb3VyY2UsIHNpemUsIGxpZ2h0LCBzY2FsZSA9IDEpOiBQcm9taXNlPEltYWdlRGF0YT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y29uc3QgY252ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblx0XHRcdGNvbnN0IGN0eCA9IGNudi5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdFx0XHRjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcblx0XHRcdGNudi53aWR0aCAgPSBzaXplO1xyXG5cdFx0XHRjbnYuaGVpZ2h0ID0gc2l6ZTtcclxuXHJcblx0XHRcdGltZy53aWR0aCAgPSBzaXplO1xyXG5cdFx0XHRpbWcuaGVpZ2h0ID0gc2l6ZTtcclxuXHJcblx0XHRcdGltZy5vbmxvYWQgPSBfcmVuZGVyO1xyXG5cdFx0XHRpbWcuc3JjICAgID0gc291cmNlO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gX3JlbmRlcigpIHtcclxuXHRcdFx0XHRsZXQgc2hhZG93ID0gbGlnaHQgP1xyXG5cdFx0XHRcdFx0YHJnYmEoMjU1LCAyNTUsIDI1NSwgJHswLjA3NSAqIHNjYWxlfSlgIDpcclxuXHRcdFx0XHRcdGByZ2JhKDAsIDAsIDAsICR7MC4wNSAqIHNjYWxlfSlgO1xyXG5cclxuXHRcdFx0XHRjdHguc2hhZG93Q29sb3IgPSBzaGFkb3c7XHJcblx0XHRcdFx0Y3R4LnNoYWRvd0JsdXIgPSAxO1xyXG5cdFx0XHRcdGN0eC5zaGFkb3dPZmZzZXRYID0gMDtcclxuXHRcdFx0XHRjdHguc2hhZG93T2Zmc2V0WSA9IDE7XHJcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgc2l6ZSwgc2l6ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIl19
