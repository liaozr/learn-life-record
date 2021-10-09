/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings_1) {
        var $ = Core.Utils.DOM;
        class PageSettings extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
            init() {
                this.settings = new Settings(this.parent);
                ExtAPI.invoke('get-settings').then(settings => {
                    for (let key in settings) {
                        this.settings[key] = settings[key];
                    }
                }).catch(this.parent._log);
                let [page, tab] = window.location.hash.split('/', 2);
                tab = tab ? '.' + tab : '';
                this.parent.navigateToTab($.q('.tab-nav a' + tab));
            }
        }
        Settings_1.PageSettings = PageSettings;
        class Settings {
            constructor(view) {
                this.view = view;
                this._settings = {};
                this._hasPermission = false;
            }
            _get(key) {
                return this._settings[key];
            }
            _set(key, val, force = false) {
                if (!force && val === this._settings[key]) {
                    return;
                }
                if (key in this._settings) {
                    let saved = {};
                    saved[key] = val;
                    setTimeout(() => ExtAPI.invoke('save-settings', saved), 10);
                }
                this._settings[key] = val;
            }
            get alwaysCenterTheWindow() { return this._get('alwaysCenterTheWindow'); }
            set alwaysCenterTheWindow(val) { this._set('alwaysCenterTheWindow', val); }
            get leftAlignWindow() { return this._get('leftAlignWindow'); }
            set leftAlignWindow(val) { this._set('leftAlignWindow', val); }
            get hideTooltipDelay() { return this._get('hideTooltipDelay'); }
            set hideTooltipDelay(val) { this._set('hideTooltipDelay', parseInt(val, 10)); }
            get popupIconStyle() { return this._get('popupIconStyle'); }
            set popupIconStyle(val) { this._set('popupIconStyle', val); }
            get presetsIconsStyle() { return this._get('presetsIconsStyle'); }
            set presetsIconsStyle(val) { this._set('presetsIconsStyle', val); }
            get alternatePresetsBg() { return this._get('alternatePresetsBg'); }
            set alternatePresetsBg(val) { this._set('alternatePresetsBg', val); }
            get autoClosePopup() { return this._get('autoClosePopup'); }
            set autoClosePopup(val) { this._set('autoClosePopup', val); }
            get presetsPrimaryLine() { return this._get('presetsPrimaryLine'); }
            set presetsPrimaryLine(val) { this._set('presetsPrimaryLine', val); }
            get hidePresetsDescription() { return this._get('hidePresetsDescription'); }
            set hidePresetsDescription(val) { this._set('hidePresetsDescription', val); }
            get hidePopupTooltips() { return this._get('hidePopupTooltips'); }
            set hidePopupTooltips(val) { this._set('hidePopupTooltips', val); }
            get hideQuickResize() { return this._get('hideQuickResize'); }
            set hideQuickResize(val) { this._set('hideQuickResize', val); }
            get alwaysShowTheTooltip() { return this._get('alwaysShowTheTooltip'); }
            set alwaysShowTheTooltip(val) {
                if (!val) {
                    this._set('alwaysShowTheTooltip', false);
                    return;
                }
                // temporary set the value to true, so the binding system doesn't revert the checkbox to un-checked
                this._settings.alwaysShowTheTooltip = true;
                if (this._hasPermission) {
                    this._set('alwaysShowTheTooltip', val, true);
                    return; // permissions have already been checked
                }
                chrome.permissions.contains({ permissions: ['tabs', 'webNavigation'], origins: ['<all_urls>'] }, result => {
                    if (result) {
                        this._hasPermission = true;
                        return this._set('alwaysShowTheTooltip', val, true);
                    }
                    let view = this.view;
                    let actions = [];
                    let title = 'Insufficient permissions';
                    let message = `In order for the extension to be able to automatically show the tooltip on all opened pages,
				it needs to be able to inject custom code in the context of all pages, without user interaction.
				<br /><br />
				<em>If you're not comfortable granting those permissions, you can always manually enable the tooltip for any
				given page from the extension's popup menu</em>`;
                    actions.push({ title: 'Cancel', onDismiss: true, handler: () => {
                            view.dismissMessage();
                            this.alwaysShowTheTooltip = false;
                        } });
                    actions.push({ title: 'Grant permissions', main: true, handler: () => {
                            view.dismissMessage();
                            chrome.permissions.request({ permissions: ['tabs', 'webNavigation'], origins: ['<all_urls>'] }, granted => {
                                this.alwaysShowTheTooltip = granted;
                            });
                        } });
                    view.showMessage(title, message, actions);
                });
            }
        }
        Core.Components.create('wr-page-settings', {
            static: [],
            initialize: (el, data) => new PageSettings(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        var Preset = Core.Preset;
        var $ = Core.Utils.DOM;
        class PagePresets extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.presets = [];
                this.presetEdit = this.presetEdit.bind(this);
                this.presetDelete = this.presetDelete.bind(this);
            }
            init() {
                //this.template = $.q('.preset-item');
                ExtAPI.invoke('get-presets').then(presets => {
                    for (let p of presets) {
                        this.presets.push(new Preset(p));
                    }
                    Sortable.create($.q('#presetsSortList'), {
                        animation: 150,
                        forceFallback: true,
                        fallbackOnBody: true,
                        handle: 'wr-preset',
                        fallbackClass: 'sortable-mirror',
                        onEnd: evt => {
                            if (evt.newIndex === evt.oldIndex) {
                                return;
                            }
                            let presets = this.presets.slice();
                            let preset = presets.splice(evt.oldIndex, 1);
                            let views = this.parent.currentView.bindings[0].iterated;
                            let view = views.splice(evt.oldIndex, 1);
                            presets.splice(evt.newIndex, 0, preset[0]);
                            views.splice(evt.newIndex, 0, view[0]);
                            _reindex(views);
                            this.presets = presets;
                            ExtAPI.invoke('save-settings', { presets: presets });
                        }
                    });
                });
            }
            presetsDelete(evt, ctx) {
                let view = ctx.parent;
                let actions = [];
                let title = 'Warning';
                let message = `Are you sure you want to delete all the existing presets?`;
                actions.push({ title: 'Yes, I\'m sure', main: true, handler: () => {
                        ctx.presets = [];
                        ExtAPI.invoke('save-settings', { presets: ctx.presets });
                        view.dismissMessage();
                    } });
                actions.push({ title: 'No, don\'t do it', handler: () => view.dismissMessage() });
                view.showMessage(title, message, actions, { class: 'danger' });
            }
            presetsReset(evt, ctx) {
                const reset = () => {
                    ExtAPI.invoke('default-settings').then(defaults => {
                        ctx.presets = [];
                        ctx.presets = defaults.presets;
                        return ExtAPI.invoke('save-settings', { presets: defaults.presets });
                    }).catch(err => console.log(err));
                };
                if (!ctx.presets || !ctx.presets.length) {
                    return reset();
                }
                let view = ctx.parent;
                let actions = [];
                let title = 'Warning';
                let message = `Are you sure you want to replace all your existing presets with the default ones?`;
                actions.push({ title: 'Yes, I\'m sure', main: true, handler: () => {
                        reset();
                        view.dismissMessage();
                    } });
                actions.push({ title: 'No, don\'t do it', handler: () => view.dismissMessage() });
                view.showMessage(title, message, actions, { class: 'danger' });
            }
            presetAdd(evt, ctx) {
                ctx.parent.showSubPage('wr-page-edit-preset', 'add');
            }
            presetEdit(evt, ctx) {
                ctx.parent.showSubPage('wr-page-edit-preset', `edit=${ctx.item.id}`);
            }
            presetDelete(evt, ctx) {
                let index = ctx.index;
                let views = this.parent.currentView.bindings[0].iterated;
                let node = views[index].els[0];
                $.animate(node, 'puff-out', 'transform').then(n => {
                    $.animate(node, 'collapse', 'margin-top').then(n => {
                        views[index].unbind();
                        node.parentNode.removeChild(node);
                        views.splice(index, 1);
                        this.presets.splice(index, 1);
                        _reindex(views);
                        ExtAPI.invoke('save-settings', { presets: this.presets });
                    });
                });
            }
            _performUnbound(callback) {
                let binding = this.parent.currentView; //.bindings[0];
                binding.unbind();
                let result = callback();
                binding.bind();
                binding.sync();
                // for (let view of binding.iterated) {
                // 	view.sync();
                // }
                return result;
            }
        }
        Settings.PagePresets = PagePresets;
        function _reindex(views) {
            views.forEach((view, index) => {
                view.models.index = index;
            });
        }
        Core.Components.create('wr-page-presets', {
            static: [],
            initialize: (el, data) => new PagePresets(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../typings/rivets.d.ts" />
/// <reference path="../../../typings/ExtAPI.d.ts" />
/// <reference path="../../../typings/tab-nav.d.ts" />
/// <reference path="../../../typings/common.d.ts" />
/// <reference path="./pages/settings.ts" />
/// <reference path="./pages/presets.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        var ModalMessage = Views.Common.ModalMessage;
        var $ = Core.Utils.DOM;
        class SettingsView {
            constructor(id, title, element) {
                this.id = id;
                this.title = title;
                this.element = element;
                this.selected = false;
            }
        }
        Settings.SettingsView = SettingsView;
        class MainView {
            constructor() {
                this.menu = [
                    new SettingsView('#settings', 'settings', 'wr-page-settings'),
                    new SettingsView('#presets', 'presets', 'wr-page-presets'),
                    new SettingsView('#hotkeys', 'hotkeys', 'wr-page-hotkeys'),
                    new SettingsView('#sync', 'sync', 'wr-page-sync'),
                    new SettingsView('#help', 'about', 'wr-page-help')
                ];
                this.routes = [
                    new SettingsView('#help/release-notes', 'release-notes', 'wr-page-release-notes'),
                    new SettingsView('#pro', 'pro', 'wr-page-pro')
                ];
                this.license = null;
                this.presetsIconsStyle = '';
                this.navigateTo = this.navigateTo.bind(this);
                this.handleNavigateToTab = this.handleNavigateToTab.bind(this);
                this.showMessage = this.showMessage.bind(this);
                this.dismissMessage = this.dismissMessage.bind(this);
                ExtAPI.invoke('get-settings').then(settings => {
                    this.license = settings.license;
                    this.presetsIconsStyle = settings.presetsIconsStyle;
                    return ExtAPI.invoke('settings:requested-page');
                }).then(url => {
                    this._showView(url) || this.showView(this.menu[0]);
                    // this.showView(this._view('#pro'));
                });
                chrome.runtime.onMessage.addListener((msg, sender, respond) => {
                    if (msg && msg.showPage) {
                        let view = this._showView(msg.showPage);
                    }
                    if (msg && msg.UpdatedSettings) {
                        if ('license' in msg.UpdatedSettings) {
                            this.license = msg.UpdatedSettings.license;
                        }
                        if ('presetsIconsStyle' in msg.UpdatedSettings) {
                            this.presetsIconsStyle = msg.UpdatedSettings.presetsIconsStyle;
                        }
                    }
                });
            }
            _showView(url) {
                let [page, ...args] = (url || '').split('/');
                let view = this._view(url) || this._view(page);
                let params = '';
                if (args && args.length) {
                    params = args.join('/');
                }
                view && this.showView(view, params);
                return view;
            }
            showView(view, params = '') {
                this.selectedView = view;
                params = params || '';
                for (let item of this.menu) {
                    item.selected = view.id.indexOf(item.id) === 0;
                }
                $.hide('#content').then(_ => {
                    this.currentView && this.currentView.unbind();
                    this.currentView = rivets.init(view.element, null, { parent: this });
                    let model = this.currentView.models;
                    window.location.hash = `${view.id}/${params}`;
                    $.empty('#content');
                    $.q('#content').appendChild(this.currentView.els[0]);
                    model.init && model.init();
                    $.show('#content');
                });
            }
            showSubPage(element, id) {
                this.showView(new SettingsView(`${this.selectedView.id}/${id}`, id, element));
            }
            navigateTo(evt, ctx) {
                let item = ctx.item;
                if (!item) {
                    let target = evt.target;
                    while (target && !target.matches('a, button')) {
                        target = target.parentNode;
                    }
                    if (target) {
                        item = this._view(target.hash || target.getAttribute('data-hash'));
                    }
                }
                console.log(item);
                this.showView(item);
            }
            handleNavigateToTab(evt, ctx) {
                evt.preventDefault();
                this.navigateToTab(evt.target);
            }
            navigateToTab(target) {
                if (target.classList.contains('selected')) {
                    return;
                }
                let current = $.q('.selected', target.parentNode);
                let showNext = () => {
                    $.addClass(target, 'selected');
                    $.addClass(target.hash, 'visible');
                    setTimeout(() => { $.addClass(target.hash, 'selected'); }, 1);
                };
                if (!current) {
                    return showNext();
                }
                $.removeClass(current, 'selected');
                $.hide(current.hash, 'selected').then(_ => {
                    $.removeClass(current.hash, 'visible');
                    showNext();
                });
            }
            showMessage(title, message, actions, options = {}) {
                if (!actions || actions.length === 0) {
                    actions = [{ title: 'OK', onDismiss: true, handler: this.dismissMessage }];
                }
                this.currentMessage = new ModalMessage(title, message, false, actions, options);
            }
            dismissMessage() {
                this.currentMessage.hide().then(x => {
                    this.currentMessage = null;
                });
            }
            _view(id) {
                let routes = this.menu.concat(this.routes);
                for (let view of routes) {
                    if (view.id === id) {
                        return view;
                    }
                }
                return null;
            }
            _log(err) {
                console.log(err);
            }
        }
        Settings.MainView = MainView;
        Settings.mainView = new MainView();
        Settings.model = rivets.bind(document.body, Settings.mainView);
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        class TabContent extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
        }
        Settings.TabContent = TabContent;
        Core.Components.create('wr-tab-content', {
            static: [],
            initialize: (el, data) => new TabContent(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        class TabGroup extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
        }
        Settings.TabGroup = TabGroup;
        Core.Components.create('wr-tab-group', {
            static: [],
            initialize: (el, data) => new TabGroup(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        var $ = Core.Utils.DOM;
        var Preset = Core.Preset;
        var PresetPosition = Core.PresetPosition;
        class PageEditPreset extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.title = 'add preset';
                this.preset = new Preset({});
                this.formErrors = [];
            }
            init() {
                let params = window.location.hash.match(/edit=([^\/]+)/);
                this.id = params ? params[1] : '';
                if (this.id) {
                    this.title = 'edit preset';
                    ExtAPI.invoke('get-presets').then(presets => {
                        let data = presets.find(item => item.id === this.id);
                        this.preset = new Preset(data);
                        this.customPosition = this.preset.position;
                        this.customIcon = this.preset.type;
                    });
                }
            }
            useCurrentSize(evt, ctx) {
                chrome.windows.getCurrent({ populate: true }, win => {
                    let tab = win.tabs.filter(tab => tab.active).pop();
                    if (ctx.preset.target == 1) {
                        ctx.preset.width = tab.width;
                        ctx.preset.height = tab.height;
                    }
                    else {
                        ctx.preset.width = win.width;
                        ctx.preset.height = win.height;
                    }
                });
            }
            useCurrentPosition(evt, ctx) {
                chrome.windows.getCurrent(win => {
                    ctx.customPosition = PresetPosition.CUSTOM;
                    ctx.preset.left = win.left;
                    ctx.preset.top = win.top;
                });
            }
            get allowCustomPosition() {
                return this.preset.position === PresetPosition.CUSTOM;
            }
            set allowCustomPosition(newValue) {
                // placeholder setter
            }
            get customPosition() {
                return this.preset.position;
            }
            set customPosition(newValue) {
                newValue = parseInt(newValue, 10);
                this.preset.position = newValue;
                if (newValue !== PresetPosition.CUSTOM) {
                    this.preset.left = null;
                    this.preset.top = null;
                }
                this.allowCustomPosition = newValue;
            }
            get customIcon() {
                return this.preset.type;
            }
            set customIcon(newValue) {
                newValue = parseInt(newValue, 10);
                this.preset.type = newValue;
            }
            cancel(evt, ctx) {
                ctx.parent.showView(ctx.parent.menu[1]);
            }
            savePreset(evt, ctx) {
                evt.preventDefault();
                let preset = ctx.preset;
                ctx.formErrors = [];
                if (preset.width === null && preset.height === null) {
                    ctx.formErrors.push('You must provide at least one of the width and height values!');
                    $.q('#content').scrollTop = 0;
                }
                if (ctx.formErrors.length) {
                    return;
                }
                ExtAPI.invoke('save-preset', preset).then(data => {
                    ctx.parent.showView(ctx.parent.menu[1]);
                });
            }
        }
        Settings.PageEditPreset = PageEditPreset;
        Core.Components.create('wr-page-edit-preset', {
            static: [],
            initialize: (el, data) => new PageEditPreset(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        class PageHelp extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
            init() {
                let config = chrome.runtime.getManifest();
                this.friendlyVersion = config.version_name || config.version;
                this.completeVersion = config.version_name ? `(${config.version})` : '';
                let log = JSON.parse(window.localStorage['debugLog'] || '[]');
                let rows = [];
                for (let r = 0, l = log.length; r < l; r++) {
                    rows.push(JSON.stringify(log[r]));
                }
                this.debugLog = rows.length ? `[\n    ${rows.join(",\n    ")}\n]` : null;
            }
            showReleaseNotes(evt, ctx) {
                ctx.parent.showSubPage('wr-page-release-notes', 'release-notes');
            }
            showDebugLog(evt, ctx) {
                ctx.parent.showMessage('Errors log', `<pre>${ctx.debugLog}</pre>`, null, { class: 'danger' });
            }
        }
        Settings.PageHelp = PageHelp;
        Core.Components.create('wr-page-help', {
            static: [],
            initialize: (el, data) => new PageHelp(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        var $ = Core.Utils.DOM;
        class PageHotkeys extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.key_ShowPopup = '<not set>';
                this.key_ToggleTooltip = '<not set>';
                this.key_CyclePresets = '<not set>';
                this.key_CyclePresetsRev = '<not set>';
            }
            init() {
                this.parent.navigateToTab($.q('.tab-nav a'));
                chrome.commands.getAll(commands => this.globalShortcuts = commands);
            }
            configureShortcuts() {
                chrome.tabs.create({
                    url: 'chrome://extensions/configureCommands',
                    active: true
                });
            }
        }
        Settings.PageHotkeys = PageHotkeys;
        Core.Components.create('wr-page-hotkeys', {
            static: [],
            initialize: (el, data) => new PageHotkeys(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        class PagePro extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.defaultPrice = 4;
                this.payAmount = 4;
                this.minAmount = 3;
                this.licenseKey = '';
                this.error = '';
                this.busy = false;
                this.activate = () => {
                    if (!this.licenseKey.match(/^\s*[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\s*$/i)) {
                        this.error = 'Invalid license key!';
                        return;
                    }
                    this.error = '';
                    this.busy = true;
                    ExtAPI.invoke('pro:activate-license', { key: this.licenseKey })
                        .then(this._handleErrors)
                        .then(data => {
                        this.licenseKey = '';
                        // this.parent.license = data;
                    });
                };
                this.purchase = () => {
                    if (this.payAmount < this.minAmount) {
                        this.error = `The minimum amount is \$${this.minAmount.toFixed(2)}`;
                        return;
                    }
                    this.error = '';
                    this.busy = true;
                    ExtAPI.invoke('pro:checkout-url', { price: this.payAmount })
                        .then(this._handleErrors)
                        .then(data => {
                        window.open(data.url);
                    });
                };
                this._handleErrors = (response) => {
                    this.busy = false;
                    this.error = '';
                    if (response.error) {
                        this.error = response.error;
                        return Promise.reject(response.error);
                    }
                    return Promise.resolve(response.data);
                };
            }
            init() {
            }
        }
        Settings.PagePro = PagePro;
        Core.Components.create('wr-page-pro', {
            static: [],
            initialize: (el, data) => new PagePro(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings) {
        class PageReleaseNotes extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
            }
            cancel(evt, ctx) {
                ctx.parent.showView(ctx.parent.menu[4]);
            }
            goTo(evt, ctx) {
                var hash = evt.target.hash || evt.target.getAttribute('data-hash');
                ctx.parent.showView(ctx.parent._view(hash));
            }
        }
        Settings.PageReleaseNotes = PageReleaseNotes;
        Core.Components.create('wr-page-release-notes', {
            static: [],
            initialize: (el, data) => new PageReleaseNotes(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));
/// <reference path="../../../../typings/common.d.ts" />
/// <reference path="../../../../typings/ExtAPI.d.ts" />
var Views;
(function (Views) {
    var Settings;
    (function (Settings_2) {
        var $ = Core.Utils.DOM;
        class PageSync extends Core.CustomElement {
            constructor(node, data) {
                super(node, data);
                this.exportSettings = this.exportSettings.bind(this);
                this.importSettings = this.importSettings.bind(this);
            }
            init() {
                this.settings = new Settings();
                ExtAPI.invoke('get-sync-status').then(status => {
                    this.settings.syncSettings = !status;
                }).catch(this.parent._log);
            }
            exportSettings() {
                ExtAPI.invoke('get-settings').then(settings => {
                    let node = $.q('#importExportField');
                    node.value = JSON.stringify(settings);
                    node.focus();
                    node.select();
                });
            }
            importSettings() {
                let node = $.q('#importExportField');
                let data;
                let settings = {};
                try {
                    data = JSON.parse(node.value);
                }
                catch (ex) {
                    this.parent.showMessage('Error', 'The provided input is not a valid JSON object.');
                    return null;
                }
                ExtAPI.invoke('import-settings', data);
                this.parent.showMessage('Success', 'The new settings have been imported.');
                node.value = '';
            }
        }
        Settings_2.PageSync = PageSync;
        class Settings {
            constructor() {
                this._settings = {};
            }
            get syncSettings() { return this._settings.syncSettings; }
            set syncSettings(val) {
                if (val === this._settings.syncSettings) {
                    return;
                }
                this._settings.syncSettings = val;
                setTimeout(() => {
                    ExtAPI.invoke('toggle-sync', !val)
                        .then(() => ExtAPI.invoke('get-settings'))
                        .then(settings => ExtAPI.invoke('save-settings', settings));
                });
            }
        }
        Core.Components.create('wr-page-sync', {
            static: [],
            initialize: (el, data) => new PageSync(el, data)
        });
    })(Settings = Views.Settings || (Views.Settings = {}));
})(Views || (Views = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92aWV3cy9zZXR0aW5ncy9wYWdlcy9zZXR0aW5ncy50cyIsInNyYy92aWV3cy9zZXR0aW5ncy9wYWdlcy9wcmVzZXRzLnRzIiwic3JjL3ZpZXdzL3NldHRpbmdzL3NldHRpbmdzLnRzIiwic3JjL3ZpZXdzL3NldHRpbmdzL2NvbXBvbmVudHMvdGFiLWNvbnRlbnQudHMiLCJzcmMvdmlld3Mvc2V0dGluZ3MvY29tcG9uZW50cy90YWItZ3JvdXAudHMiLCJzcmMvdmlld3Mvc2V0dGluZ3MvcGFnZXMvZWRpdC1wcmVzZXQudHMiLCJzcmMvdmlld3Mvc2V0dGluZ3MvcGFnZXMvaGVscC50cyIsInNyYy92aWV3cy9zZXR0aW5ncy9wYWdlcy9ob3RrZXlzLnRzIiwic3JjL3ZpZXdzL3NldHRpbmdzL3BhZ2VzL3Byby50cyIsInNyYy92aWV3cy9zZXR0aW5ncy9wYWdlcy9yZWxlYXNlLW5vdGVzLnRzIiwic3JjL3ZpZXdzL3NldHRpbmdzL3BhZ2VzL3N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0RBQXdEO0FBQ3hELHdEQUF3RDtBQUV4RCxJQUFPLEtBQUssQ0F3SVg7QUF4SUQsV0FBTyxLQUFLO0lBQUMsSUFBQSxRQUFRLENBd0lwQjtJQXhJWSxXQUFBLFVBQVE7UUFDcEIsSUFBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFFMUIsa0JBQTBCLFNBQVEsSUFBSSxDQUFDLGFBQWE7WUFJbkQsWUFBWSxJQUFJLEVBQUUsSUFBSTtnQkFDckIsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDO1lBRUQsSUFBSTtnQkFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUTtvQkFDMUMsR0FBRyxDQUFDLENBQUMsSUFB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QUFVLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN0QyxNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQztTQUNoRCxDQUFDLENBQUE7SUFDSCxDQUFDLEVBM0VZLFFBQVEsR0FBUixjQUFRLEtBQVIsY0FBUSxRQTJFcEI7QUFBRCxDQUFDLEVBM0VNLEtBQUssS0FBTCxLQUFLLFFBMkVYIiwiZmlsZSI6InZpZXdzL3NldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvY29tbW9uLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy9FeHRBUEkuZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgVmlld3MuU2V0dGluZ3Mge1xyXG5cdGltcG9ydCAkID0gQ29yZS5VdGlscy5ET007XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQYWdlU2V0dGluZ3MgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0cHVibGljIHBhcmVudDogYW55OyAvLyBWaWV3cy5TZXR0aW5ncy5NYWluVmlldztcclxuXHRcdHB1YmxpYyBzZXR0aW5nczogU2V0dGluZ3M7XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xyXG5cdFx0XHRzdXBlcihub2RlLCBkYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbml0KCkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzID0gbmV3IFNldHRpbmdzKHRoaXMucGFyZW50KTtcclxuXHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2dldC1zZXR0aW5ncycpLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdGZvciAobGV0IGtleSBpbiBzZXR0aW5ncykge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5nc1trZXldID0gc2V0dGluZ3Nba2V5XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmNhdGNoKHRoaXMucGFyZW50Ll9sb2cpO1xyXG5cclxuXHRcdFx0bGV0IFtwYWdlLCB0YWJdID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoJy8nLCAyKTtcclxuXHRcdFx0dGFiID0gdGFiID8gJy4nICsgdGFiIDogJyc7XHJcblxyXG5cdFx0XHR0aGlzLnBhcmVudC5uYXZpZ2F0ZVRvVGFiKCQucSgnLnRhYi1uYXYgYScgKyB0YWIpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsYXNzIFNldHRpbmdzIHtcclxuXHRcdHByaXZhdGUgX3NldHRpbmdzOiBhbnkgPSB7fTtcclxuXHRcdHByaXZhdGUgX2hhc1Blcm1pc3Npb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IGFueSkge31cclxuXHJcblx0XHRwcml2YXRlIF9nZXQoa2V5KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9zZXR0aW5nc1trZXldO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgX3NldChrZXk6IHN0cmluZywgdmFsOiBhbnksIGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKCFmb3JjZSAmJiB2YWwgPT09IHRoaXMuX3NldHRpbmdzW2tleV0pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChrZXkgaW4gdGhpcy5fc2V0dGluZ3MpIHtcclxuXHRcdFx0XHRsZXQgc2F2ZWQgPSB7fTtcclxuXHRcdFx0XHRzYXZlZFtrZXldID0gdmFsO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IEV4dEFQSS5pbnZva2UoJ3NhdmUtc2V0dGluZ3MnLCBzYXZlZCksIDEwKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2V0dGluZ3Nba2V5XSA9IHZhbDtcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgYWx3YXlzQ2VudGVyVGhlV2luZG93KCkgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnYWx3YXlzQ2VudGVyVGhlV2luZG93Jyk7IH1cclxuXHRcdHNldCBhbHdheXNDZW50ZXJUaGVXaW5kb3codmFsKSAgeyB0aGlzLl9zZXQoJ2Fsd2F5c0NlbnRlclRoZVdpbmRvdycsIHZhbCk7IH1cclxuXHJcblx0XHRnZXQgbGVmdEFsaWduV2luZG93KCkgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnbGVmdEFsaWduV2luZG93Jyk7IH1cclxuXHRcdHNldCBsZWZ0QWxpZ25XaW5kb3codmFsKSAgICAgICAgeyB0aGlzLl9zZXQoJ2xlZnRBbGlnbldpbmRvdycsIHZhbCk7IH1cclxuXHJcblx0XHRnZXQgaGlkZVRvb2x0aXBEZWxheSgpICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnaGlkZVRvb2x0aXBEZWxheScpOyB9XHJcblx0XHRzZXQgaGlkZVRvb2x0aXBEZWxheSh2YWwpICAgICAgIHsgdGhpcy5fc2V0KCdoaWRlVG9vbHRpcERlbGF5JywgcGFyc2VJbnQodmFsLCAxMCkpOyB9XHJcblxyXG5cdFx0Z2V0IHBvcHVwSWNvblN0eWxlKCkgICAgICAgICAgICB7IHJldHVybiB0aGlzLl9nZXQoJ3BvcHVwSWNvblN0eWxlJyk7IH1cclxuXHRcdHNldCBwb3B1cEljb25TdHlsZSh2YWwpICAgICAgICAgeyB0aGlzLl9zZXQoJ3BvcHVwSWNvblN0eWxlJywgdmFsKTsgfVxyXG5cclxuXHRcdGdldCBwcmVzZXRzSWNvbnNTdHlsZSgpICAgICAgICAgeyByZXR1cm4gdGhpcy5fZ2V0KCdwcmVzZXRzSWNvbnNTdHlsZScpOyB9XHJcblx0XHRzZXQgcHJlc2V0c0ljb25zU3R5bGUodmFsKSAgICAgIHsgdGhpcy5fc2V0KCdwcmVzZXRzSWNvbnNTdHlsZScsIHZhbCk7IH1cclxuXHJcblx0XHRnZXQgYWx0ZXJuYXRlUHJlc2V0c0JnKCkgICAgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnYWx0ZXJuYXRlUHJlc2V0c0JnJyk7IH1cclxuXHRcdHNldCBhbHRlcm5hdGVQcmVzZXRzQmcodmFsKSAgICAgeyB0aGlzLl9zZXQoJ2FsdGVybmF0ZVByZXNldHNCZycsIHZhbCk7IH1cclxuXHJcblx0XHRnZXQgYXV0b0Nsb3NlUG9wdXAoKSAgICAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnYXV0b0Nsb3NlUG9wdXAnKTsgfVxyXG5cdFx0c2V0IGF1dG9DbG9zZVBvcHVwKHZhbCkgICAgICAgICB7IHRoaXMuX3NldCgnYXV0b0Nsb3NlUG9wdXAnLCB2YWwpOyB9XHJcblxyXG5cdFx0Z2V0IHByZXNldHNQcmltYXJ5TGluZSgpICAgICAgICB7IHJldHVybiB0aGlzLl9nZXQoJ3ByZXNldHNQcmltYXJ5TGluZScpOyB9XHJcblx0XHRzZXQgcHJlc2V0c1ByaW1hcnlMaW5lKHZhbCkgICAgIHsgdGhpcy5fc2V0KCdwcmVzZXRzUHJpbWFyeUxpbmUnLCB2YWwpOyB9XHJcblxyXG5cdFx0Z2V0IGhpZGVQcmVzZXRzRGVzY3JpcHRpb24oKSAgICB7IHJldHVybiB0aGlzLl9nZXQoJ2hpZGVQcmVzZXRzRGVzY3JpcHRpb24nKTsgfVxyXG5cdFx0c2V0IGhpZGVQcmVzZXRzRGVzY3JpcHRpb24odmFsKSB7IHRoaXMuX3NldCgnaGlkZVByZXNldHNEZXNjcmlwdGlvbicsIHZhbCk7IH1cclxuXHJcblx0XHRnZXQgaGlkZVBvcHVwVG9vbHRpcHMoKSAgICAgICAgIHsgcmV0dXJuIHRoaXMuX2dldCgnaGlkZVBvcHVwVG9vbHRpcHMnKTsgfVxyXG5cdFx0c2V0IGhpZGVQb3B1cFRvb2x0aXBzKHZhbCkgICAgICB7IHRoaXMuX3NldCgnaGlkZVBvcHVwVG9vbHRpcHMnLCB2YWwpOyB9XHJcblxyXG5cdFx0Z2V0IGhpZGVRdWlja1Jlc2l6ZSgpICAgICAgICAgICB7IHJldHVybiB0aGlzLl9nZXQoJ2hpZGVRdWlja1Jlc2l6ZScpOyB9XHJcblx0XHRzZXQgaGlkZVF1aWNrUmVzaXplKHZhbCkgICAgICAgIHsgdGhpcy5fc2V0KCdoaWRlUXVpY2tSZXNpemUnLCB2YWwpOyB9XHJcblxyXG5cdFx0Z2V0IGFsd2F5c1Nob3dUaGVUb29sdGlwKCkgICAgICB7IHJldHVybiB0aGlzLl9nZXQoJ2Fsd2F5c1Nob3dUaGVUb29sdGlwJyk7IH1cclxuXHRcdHNldCBhbHdheXNTaG93VGhlVG9vbHRpcCh2YWwpICAge1xyXG5cdFx0XHRpZiAoIXZhbCkge1xyXG5cdFx0XHRcdHRoaXMuX3NldCgnYWx3YXlzU2hvd1RoZVRvb2x0aXAnLCBmYWxzZSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyB0ZW1wb3Jhcnkgc2V0IHRoZSB2YWx1ZSB0byB0cnVlLCBzbyB0aGUgYmluZGluZyBzeXN0ZW0gZG9lc24ndCByZXZlcnQgdGhlIGNoZWNrYm94IHRvIHVuLWNoZWNrZWRcclxuXHRcdFx0dGhpcy5fc2V0dGluZ3MuYWx3YXlzU2hvd1RoZVRvb2x0aXAgPSB0cnVlO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2hhc1Blcm1pc3Npb24pIHtcclxuXHRcdFx0XHR0aGlzLl9zZXQoJ2Fsd2F5c1Nob3dUaGVUb29sdGlwJywgdmFsLCB0cnVlKTtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHBlcm1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGNoZWNrZWRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2hyb21lLnBlcm1pc3Npb25zLmNvbnRhaW5zKHtwZXJtaXNzaW9uczogWyd0YWJzJywgJ3dlYk5hdmlnYXRpb24nXSwgb3JpZ2luczogWyc8YWxsX3VybHM+J119LCByZXN1bHQgPT4ge1xyXG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2hhc1Blcm1pc3Npb24gPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3NldCgnYWx3YXlzU2hvd1RoZVRvb2x0aXAnLCB2YWwsIHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IHZpZXcgICAgPSB0aGlzLnZpZXc7XHJcblx0XHRcdFx0bGV0IGFjdGlvbnMgPSBbXTtcclxuXHRcdFx0XHRsZXQgdGl0bGUgICA9ICdJbnN1ZmZpY2llbnQgcGVybWlzc2lvbnMnO1xyXG5cdFx0XHRcdGxldCBtZXNzYWdlID0gYEluIG9yZGVyIGZvciB0aGUgZXh0ZW5zaW9uIHRvIGJlIGFibGUgdG8gYXV0b21hdGljYWxseSBzaG93IHRoZSB0b29sdGlwIG9uIGFsbCBvcGVuZWQgcGFnZXMsXHJcblx0XHRcdFx0aXQgbmVlZHMgdG8gYmUgYWJsZSB0byBpbmplY3QgY3VzdG9tIGNvZGUgaW4gdGhlIGNvbnRleHQgb2YgYWxsIHBhZ2VzLCB3aXRob3V0IHVzZXIgaW50ZXJhY3Rpb24uXHJcblx0XHRcdFx0PGJyIC8+PGJyIC8+XHJcblx0XHRcdFx0PGVtPklmIHlvdSdyZSBub3QgY29tZm9ydGFibGUgZ3JhbnRpbmcgdGhvc2UgcGVybWlzc2lvbnMsIHlvdSBjYW4gYWx3YXlzIG1hbnVhbGx5IGVuYWJsZSB0aGUgdG9vbHRpcCBmb3IgYW55XHJcblx0XHRcdFx0Z2l2ZW4gcGFnZSBmcm9tIHRoZSBleHRlbnNpb24ncyBwb3B1cCBtZW51PC9lbT5gO1xyXG5cclxuXHRcdFx0XHRhY3Rpb25zLnB1c2goe3RpdGxlOiAnQ2FuY2VsJywgb25EaXNtaXNzOiB0cnVlLCBoYW5kbGVyOiAoKSA9PiB7XHJcblx0XHRcdFx0XHR2aWV3LmRpc21pc3NNZXNzYWdlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmFsd2F5c1Nob3dUaGVUb29sdGlwID0gZmFsc2U7XHJcblx0XHRcdFx0fX0pXHJcblxyXG5cdFx0XHRcdGFjdGlvbnMucHVzaCh7dGl0bGU6ICdHcmFudCBwZXJtaXNzaW9ucycsIG1haW46IHRydWUsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRcdHZpZXcuZGlzbWlzc01lc3NhZ2UoKTtcclxuXHRcdFx0XHRcdGNocm9tZS5wZXJtaXNzaW9ucy5yZXF1ZXN0KHtwZXJtaXNzaW9uczogWyd0YWJzJywgJ3dlYk5hdmlnYXRpb24nXSwgb3JpZ2luczogWyc8YWxsX3VybHM+J119LCBncmFudGVkID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hbHdheXNTaG93VGhlVG9vbHRpcCA9IGdyYW50ZWQ7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH19KVxyXG5cclxuXHRcdFx0XHR2aWV3LnNob3dNZXNzYWdlKHRpdGxlLCBtZXNzYWdlLCBhY3Rpb25zKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRDb3JlLkNvbXBvbmVudHMuY3JlYXRlKCd3ci1wYWdlLXNldHRpbmdzJywge1xyXG5cdFx0c3RhdGljOiBbXSxcclxuXHRcdGluaXRpYWxpemU6IChlbCwgZGF0YSkgPT4gbmV3IFBhZ2VTZXR0aW5ncyhlbCwgZGF0YSlcclxuXHR9KVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIFZpZXdzLlNldHRpbmdzIHtcclxuXHRpbXBvcnQgUHJlc2V0ID0gQ29yZS5QcmVzZXQ7XHJcblx0aW1wb3J0ICQgPSBDb3JlLlV0aWxzLkRPTTtcclxuXHJcblx0ZGVjbGFyZSB2YXIgU29ydGFibGU6IGFueTtcclxuXHRkZWNsYXJlIHZhciBkcmFndWxhOiBhbnk7XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQYWdlUHJlc2V0cyBleHRlbmRzIENvcmUuQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRwdWJsaWMgcGFyZW50OiBhbnk7IC8vIFZpZXdzLlNldHRpbmdzLk1haW5WaWV3O1xyXG5cclxuXHRcdHB1YmxpYyBwcmVzZXRzOiBQcmVzZXRbXSA9ICBbXTtcclxuXHRcdHB1YmxpYyB0ZW1wbGF0ZTogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xyXG5cdFx0XHRzdXBlcihub2RlLCBkYXRhKTtcclxuXHJcblx0XHRcdHRoaXMucHJlc2V0RWRpdCA9IHRoaXMucHJlc2V0RWRpdC5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLnByZXNldERlbGV0ZSA9IHRoaXMucHJlc2V0RGVsZXRlLmJpbmQodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5pdCgpIHtcclxuXHRcdFx0Ly90aGlzLnRlbXBsYXRlID0gJC5xKCcucHJlc2V0LWl0ZW0nKTtcclxuXHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2dldC1wcmVzZXRzJykudGhlbihwcmVzZXRzID0+IHtcclxuXHRcdFx0XHRmb3IgKGxldCBwIG9mIHByZXNldHMpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJlc2V0cy5wdXNoKG5ldyBQcmVzZXQocCkpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0U29ydGFibGUuY3JlYXRlKCQucSgnI3ByZXNldHNTb3J0TGlzdCcpLCB7XHJcblx0XHRcdFx0XHRhbmltYXRpb246IDE1MCxcclxuXHRcdFx0XHRcdGZvcmNlRmFsbGJhY2s6IHRydWUsXHJcblx0XHRcdFx0XHRmYWxsYmFja09uQm9keTogdHJ1ZSxcclxuXHRcdFx0XHRcdGhhbmRsZTogJ3dyLXByZXNldCcsXHJcblx0XHRcdFx0XHRmYWxsYmFja0NsYXNzOiAnc29ydGFibGUtbWlycm9yJyxcclxuXHRcdFx0XHRcdG9uRW5kOiBldnQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoZXZ0Lm5ld0luZGV4ID09PSBldnQub2xkSW5kZXgpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGxldCBwcmVzZXRzID0gdGhpcy5wcmVzZXRzLnNsaWNlKCk7XHJcblx0XHRcdFx0XHRcdGxldCBwcmVzZXQgID0gcHJlc2V0cy5zcGxpY2UoZXZ0Lm9sZEluZGV4LCAxKTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCB2aWV3cyA9IHRoaXMucGFyZW50LmN1cnJlbnRWaWV3LmJpbmRpbmdzWzBdLml0ZXJhdGVkO1xyXG5cdFx0XHRcdFx0XHRsZXQgdmlldyAgPSB2aWV3cy5zcGxpY2UoZXZ0Lm9sZEluZGV4LCAxKTtcclxuXHJcblx0XHRcdFx0XHRcdHByZXNldHMuc3BsaWNlKGV2dC5uZXdJbmRleCwgMCwgcHJlc2V0WzBdKTtcclxuXHRcdFx0XHRcdFx0dmlld3Muc3BsaWNlKGV2dC5uZXdJbmRleCwgMCwgdmlld1swXSk7XHJcblxyXG5cdFx0XHRcdFx0XHRfcmVpbmRleCh2aWV3cyk7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLnByZXNldHMgPSBwcmVzZXRzO1xyXG5cclxuXHRcdFx0XHRcdFx0RXh0QVBJLmludm9rZSgnc2F2ZS1zZXR0aW5ncycsIHtwcmVzZXRzOiBwcmVzZXRzfSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cHJlc2V0c0RlbGV0ZShldnQsIGN0eCkge1xyXG5cdFx0XHRsZXQgdmlldyAgICA9IGN0eC5wYXJlbnQ7XHJcblx0XHRcdGxldCBhY3Rpb25zID0gW107XHJcblx0XHRcdGxldCB0aXRsZSAgID0gJ1dhcm5pbmcnO1xyXG5cdFx0XHRsZXQgbWVzc2FnZSA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGFsbCB0aGUgZXhpc3RpbmcgcHJlc2V0cz9gO1xyXG5cclxuXHRcdFx0YWN0aW9ucy5wdXNoKHt0aXRsZTogJ1llcywgSVxcJ20gc3VyZScsIG1haW46IHRydWUsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRjdHgucHJlc2V0cyA9IFtdO1xyXG5cdFx0XHRcdEV4dEFQSS5pbnZva2UoJ3NhdmUtc2V0dGluZ3MnLCB7cHJlc2V0czogY3R4LnByZXNldHN9KTtcclxuXHRcdFx0XHR2aWV3LmRpc21pc3NNZXNzYWdlKCk7XHJcblx0XHRcdH19KVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe3RpdGxlOiAnTm8sIGRvblxcJ3QgZG8gaXQnLCBoYW5kbGVyOiAoKSA9PiB2aWV3LmRpc21pc3NNZXNzYWdlKCl9KVxyXG5cclxuXHRcdFx0dmlldy5zaG93TWVzc2FnZSh0aXRsZSwgbWVzc2FnZSwgYWN0aW9ucywge2NsYXNzOiAnZGFuZ2VyJ30pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByZXNldHNSZXNldChldnQsIGN0eCkge1xyXG5cdFx0XHRjb25zdCByZXNldCA9ICgpID0+IHtcclxuXHRcdFx0XHRFeHRBUEkuaW52b2tlKCdkZWZhdWx0LXNldHRpbmdzJykudGhlbihkZWZhdWx0cyA9PiB7XHJcblx0XHRcdFx0XHRjdHgucHJlc2V0cyA9IFtdO1xyXG5cdFx0XHRcdFx0Y3R4LnByZXNldHMgPSBkZWZhdWx0cy5wcmVzZXRzO1xyXG5cdFx0XHRcdFx0cmV0dXJuIEV4dEFQSS5pbnZva2UoJ3NhdmUtc2V0dGluZ3MnLCB7cHJlc2V0czogZGVmYXVsdHMucHJlc2V0c30pXHJcblx0XHRcdFx0fSkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghY3R4LnByZXNldHMgfHwgIWN0eC5wcmVzZXRzLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybiByZXNldCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdmlldyAgICA9IGN0eC5wYXJlbnQ7XHJcblx0XHRcdGxldCBhY3Rpb25zID0gW107XHJcblx0XHRcdGxldCB0aXRsZSAgID0gJ1dhcm5pbmcnO1xyXG5cdFx0XHRsZXQgbWVzc2FnZSA9IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVwbGFjZSBhbGwgeW91ciBleGlzdGluZyBwcmVzZXRzIHdpdGggdGhlIGRlZmF1bHQgb25lcz9gO1xyXG5cclxuXHRcdFx0YWN0aW9ucy5wdXNoKHt0aXRsZTogJ1llcywgSVxcJ20gc3VyZScsIG1haW46IHRydWUsIGhhbmRsZXI6ICgpID0+IHtcclxuXHRcdFx0XHRyZXNldCgpO1xyXG5cdFx0XHRcdHZpZXcuZGlzbWlzc01lc3NhZ2UoKTtcclxuXHRcdFx0fX0pXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7dGl0bGU6ICdObywgZG9uXFwndCBkbyBpdCcsIGhhbmRsZXI6ICgpID0+IHZpZXcuZGlzbWlzc01lc3NhZ2UoKX0pXHJcblxyXG5cdFx0XHR2aWV3LnNob3dNZXNzYWdlKHRpdGxlLCBtZXNzYWdlLCBhY3Rpb25zLCB7Y2xhc3M6ICdkYW5nZXInfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJlc2V0QWRkKGV2dCwgY3R4KSB7XHJcblx0XHRcdGN0eC5wYXJlbnQuc2hvd1N1YlBhZ2UoJ3dyLXBhZ2UtZWRpdC1wcmVzZXQnLCAnYWRkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJlc2V0RWRpdChldnQsIGN0eCkge1xyXG5cdFx0XHRjdHgucGFyZW50LnNob3dTdWJQYWdlKCd3ci1wYWdlLWVkaXQtcHJlc2V0JywgYGVkaXQ9JHtjdHguaXRlbS5pZH1gKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcmVzZXREZWxldGUoZXZ0LCBjdHgpIHtcclxuXHRcdFx0bGV0IGluZGV4ID0gY3R4LmluZGV4O1xyXG5cdFx0XHRsZXQgdmlld3MgPSB0aGlzLnBhcmVudC5jdXJyZW50Vmlldy5iaW5kaW5nc1swXS5pdGVyYXRlZDtcclxuXHRcdFx0bGV0IG5vZGU6IEhUTUxFbGVtZW50ID0gdmlld3NbaW5kZXhdLmVsc1swXTtcclxuXHJcblx0XHRcdCQuYW5pbWF0ZShub2RlLCAncHVmZi1vdXQnLCAndHJhbnNmb3JtJykudGhlbihuID0+IHtcclxuXHRcdFx0XHQkLmFuaW1hdGUobm9kZSwgJ2NvbGxhcHNlJywgJ21hcmdpbi10b3AnKS50aGVuKG4gPT4ge1xyXG5cdFx0XHRcdFx0dmlld3NbaW5kZXhdLnVuYmluZCgpO1xyXG5cclxuXHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcclxuXHJcblx0XHRcdFx0XHR2aWV3cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0XHRcdFx0dGhpcy5wcmVzZXRzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG5cdFx0XHRcdFx0X3JlaW5kZXgodmlld3MpO1xyXG5cclxuXHRcdFx0XHRcdEV4dEFQSS5pbnZva2UoJ3NhdmUtc2V0dGluZ3MnLCB7cHJlc2V0czogdGhpcy5wcmVzZXRzfSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIF9wZXJmb3JtVW5ib3VuZChjYWxsYmFjayk6IGFueSB7XHJcblx0XHRcdGxldCBiaW5kaW5nID0gdGhpcy5wYXJlbnQuY3VycmVudFZpZXc7Ly8uYmluZGluZ3NbMF07XHJcblx0XHRcdGJpbmRpbmcudW5iaW5kKCk7XHJcblx0XHRcdGxldCByZXN1bHQgPSBjYWxsYmFjaygpO1xyXG5cdFx0XHRiaW5kaW5nLmJpbmQoKTtcclxuXHRcdFx0YmluZGluZy5zeW5jKCk7XHJcblxyXG5cdFx0XHQvLyBmb3IgKGxldCB2aWV3IG9mIGJpbmRpbmcuaXRlcmF0ZWQpIHtcclxuXHRcdFx0Ly8gXHR2aWV3LnN5bmMoKTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIF9yZWluZGV4KHZpZXdzOiBhbnlbXSk6IHZvaWQge1xyXG5cdFx0dmlld3MuZm9yRWFjaCgodmlldywgaW5kZXgpID0+IHtcclxuXHRcdFx0dmlldy5tb2RlbHMuaW5kZXggPSBpbmRleDtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRDb3JlLkNvbXBvbmVudHMuY3JlYXRlKCd3ci1wYWdlLXByZXNldHMnLCB7XHJcblx0XHRzdGF0aWM6IFtdLFxyXG5cdFx0aW5pdGlhbGl6ZTogKGVsLCBkYXRhKSA9PiBuZXcgUGFnZVByZXNldHMoZWwsIGRhdGEpXHJcblx0fSlcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9yaXZldHMuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL0V4dEFQSS5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdGFiLW5hdi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vcGFnZXMvc2V0dGluZ3MudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9wYWdlcy9wcmVzZXRzLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5TZXR0aW5ncyB7XHJcblx0aW1wb3J0IE1vZGFsTWVzc2FnZSA9IFZpZXdzLkNvbW1vbi5Nb2RhbE1lc3NhZ2U7XHJcblx0aW1wb3J0IE1vZGFsTWVzc2FnZUFjdGlvbiA9IFZpZXdzLkNvbW1vbi5Nb2RhbE1lc3NhZ2VBY3Rpb247XHJcblxyXG5cdGltcG9ydCAkID0gQ29yZS5VdGlscy5ET007XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBTZXR0aW5nc1ZpZXcge1xyXG5cdFx0cHVibGljIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoXHJcblx0XHRcdHB1YmxpYyBpZDogc3RyaW5nLFxyXG5cdFx0XHRwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuXHRcdFx0cHVibGljIGVsZW1lbnQ6IHN0cmluZ1xyXG5cdFx0KSB7fVxyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIE1haW5WaWV3IHtcclxuXHRcdG1lbnU6IFNldHRpbmdzVmlld1tdID0gW1xyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjc2V0dGluZ3MnLCAnc2V0dGluZ3MnLCAnd3ItcGFnZS1zZXR0aW5ncycpLFxyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjcHJlc2V0cycsICdwcmVzZXRzJywgJ3dyLXBhZ2UtcHJlc2V0cycpLFxyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjaG90a2V5cycsICdob3RrZXlzJywgJ3dyLXBhZ2UtaG90a2V5cycpLFxyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjc3luYycsICdzeW5jJywgJ3dyLXBhZ2Utc3luYycpLFxyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjaGVscCcsICdhYm91dCcsICd3ci1wYWdlLWhlbHAnKVxyXG5cdFx0XTtcclxuXHJcblx0XHRyb3V0ZXM6IFNldHRpbmdzVmlld1tdID0gW1xyXG5cdFx0XHRuZXcgU2V0dGluZ3NWaWV3KCcjaGVscC9yZWxlYXNlLW5vdGVzJywgJ3JlbGVhc2Utbm90ZXMnLCAnd3ItcGFnZS1yZWxlYXNlLW5vdGVzJyksXHJcblx0XHRcdG5ldyBTZXR0aW5nc1ZpZXcoJyNwcm8nLCAncHJvJywgJ3dyLXBhZ2UtcHJvJylcclxuXHRcdF1cclxuXHJcblx0XHRjdXJyZW50VmlldzogYW55OyAvLyByaXZldHMuXy5WaWV3XHJcblx0XHRzZWxlY3RlZFZpZXc6IFNldHRpbmdzVmlldztcclxuXHRcdGN1cnJlbnRNZXNzYWdlOiBNb2RhbE1lc3NhZ2U7XHJcblxyXG5cdFx0bGljZW5zZTogYW55ID0gbnVsbDtcclxuXHRcdHByZXNldHNJY29uc1N0eWxlOiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdFx0dGhpcy5uYXZpZ2F0ZVRvID0gdGhpcy5uYXZpZ2F0ZVRvLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuaGFuZGxlTmF2aWdhdGVUb1RhYiA9IHRoaXMuaGFuZGxlTmF2aWdhdGVUb1RhYi5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5zaG93TWVzc2FnZSA9IHRoaXMuc2hvd01lc3NhZ2UuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5kaXNtaXNzTWVzc2FnZSA9IHRoaXMuZGlzbWlzc01lc3NhZ2UuYmluZCh0aGlzKTtcclxuXHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2dldC1zZXR0aW5ncycpLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdHRoaXMubGljZW5zZSA9IHNldHRpbmdzLmxpY2Vuc2U7XHJcblx0XHRcdFx0dGhpcy5wcmVzZXRzSWNvbnNTdHlsZSA9IHNldHRpbmdzLnByZXNldHNJY29uc1N0eWxlO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gRXh0QVBJLmludm9rZSgnc2V0dGluZ3M6cmVxdWVzdGVkLXBhZ2UnKTtcclxuXHRcdFx0fSkudGhlbih1cmwgPT4ge1xyXG5cdFx0XHRcdHRoaXMuX3Nob3dWaWV3KHVybCkgfHwgdGhpcy5zaG93Vmlldyh0aGlzLm1lbnVbMF0pO1xyXG5cdFx0XHRcdC8vIHRoaXMuc2hvd1ZpZXcodGhpcy5fdmlldygnI3BybycpKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZywgc2VuZGVyLCByZXNwb25kKSA9PiB7XHJcblx0XHRcdFx0aWYgKG1zZyAmJiBtc2cuc2hvd1BhZ2UpIHtcclxuXHRcdFx0XHRcdGxldCB2aWV3ID0gdGhpcy5fc2hvd1ZpZXcobXNnLnNob3dQYWdlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChtc2cgJiYgbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdFx0aWYgKCdsaWNlbnNlJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubGljZW5zZSA9IG1zZy5VcGRhdGVkU2V0dGluZ3MubGljZW5zZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoJ3ByZXNldHNJY29uc1N0eWxlJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucHJlc2V0c0ljb25zU3R5bGUgPSBtc2cuVXBkYXRlZFNldHRpbmdzLnByZXNldHNJY29uc1N0eWxlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRfc2hvd1ZpZXcodXJsOiBzdHJpbmcpIHtcclxuXHRcdFx0bGV0IFtwYWdlLCAuLi5hcmdzXSA9ICh1cmwgfHwgJycpLnNwbGl0KCcvJyk7XHJcblx0XHRcdGxldCB2aWV3ID0gdGhpcy5fdmlldyh1cmwpIHx8IHRoaXMuX3ZpZXcocGFnZSk7XHJcblx0XHRcdGxldCBwYXJhbXMgPSAnJztcclxuXHJcblx0XHRcdGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoKSB7XHJcblx0XHRcdFx0cGFyYW1zID0gYXJncy5qb2luKCcvJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZpZXcgJiYgdGhpcy5zaG93Vmlldyh2aWV3LCBwYXJhbXMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHZpZXc7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd1ZpZXcodmlldzogU2V0dGluZ3NWaWV3LCBwYXJhbXM6IHN0cmluZyA9ICcnKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRWaWV3ID0gdmlldztcclxuXHRcdFx0cGFyYW1zID0gcGFyYW1zIHx8ICcnO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaXRlbSBvZiB0aGlzLm1lbnUpIHtcclxuXHRcdFx0XHRpdGVtLnNlbGVjdGVkID0gdmlldy5pZC5pbmRleE9mKGl0ZW0uaWQpID09PSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkLmhpZGUoJyNjb250ZW50JykudGhlbihfID0+IHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRWaWV3ICYmIHRoaXMuY3VycmVudFZpZXcudW5iaW5kKCk7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50VmlldyA9IHJpdmV0cy5pbml0KHZpZXcuZWxlbWVudCwgbnVsbCwge3BhcmVudDogdGhpc30pO1xyXG5cclxuXHRcdFx0XHRsZXQgbW9kZWwgPSB0aGlzLmN1cnJlbnRWaWV3Lm1vZGVscztcclxuXHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBgJHt2aWV3LmlkfS8ke3BhcmFtc31gO1xyXG5cclxuXHRcdFx0XHQkLmVtcHR5KCcjY29udGVudCcpO1xyXG5cdFx0XHRcdCQucSgnI2NvbnRlbnQnKS5hcHBlbmRDaGlsZCh0aGlzLmN1cnJlbnRWaWV3LmVsc1swXSk7XHJcblx0XHRcdFx0bW9kZWwuaW5pdCAmJiBtb2RlbC5pbml0KCk7XHJcblx0XHRcdFx0JC5zaG93KCcjY29udGVudCcpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dTdWJQYWdlKGVsZW1lbnQ6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG5cdFx0XHR0aGlzLnNob3dWaWV3KG5ldyBTZXR0aW5nc1ZpZXcoYCR7dGhpcy5zZWxlY3RlZFZpZXcuaWR9LyR7aWR9YCwgaWQsIGVsZW1lbnQpKTtcclxuXHRcdH1cclxuXHJcblx0XHRuYXZpZ2F0ZVRvKGV2dCwgY3R4KSB7XHJcblx0XHRcdGxldCBpdGVtID0gY3R4Lml0ZW07XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIWl0ZW0pIHtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAodGFyZ2V0ICYmICF0YXJnZXQubWF0Y2hlcygnYSwgYnV0dG9uJykpIHtcclxuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRhcmdldCkge1xyXG5cdFx0XHRcdFx0aXRlbSA9IHRoaXMuX3ZpZXcodGFyZ2V0Lmhhc2ggfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1oYXNoJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coaXRlbSlcclxuXHJcblx0XHRcdHRoaXMuc2hvd1ZpZXcoaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGFuZGxlTmF2aWdhdGVUb1RhYihldnQsIGN0eCkge1xyXG5cdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5uYXZpZ2F0ZVRvVGFiKGV2dC50YXJnZXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5hdmlnYXRlVG9UYWIodGFyZ2V0KSB7XHJcblx0XHRcdGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgY3VycmVudCA9IDxIVE1MQW5jaG9yRWxlbWVudD4gJC5xKCcuc2VsZWN0ZWQnLCB0YXJnZXQucGFyZW50Tm9kZSk7XHJcblx0XHRcdGxldCBzaG93TmV4dCA9ICgpID0+IHtcclxuXHRcdFx0XHQkLmFkZENsYXNzKHRhcmdldCwgJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0JC5hZGRDbGFzcyh0YXJnZXQuaGFzaCwgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHskLmFkZENsYXNzKHRhcmdldC5oYXNoLCAnc2VsZWN0ZWQnKX0sIDEpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWN1cnJlbnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gc2hvd05leHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JC5yZW1vdmVDbGFzcyhjdXJyZW50LCAnc2VsZWN0ZWQnKTtcclxuXHRcdFx0JC5oaWRlKGN1cnJlbnQuaGFzaCwgJ3NlbGVjdGVkJykudGhlbihfID0+IHtcclxuXHRcdFx0XHQkLnJlbW92ZUNsYXNzKGN1cnJlbnQuaGFzaCwgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRzaG93TmV4dCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG93TWVzc2FnZSh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGFjdGlvbnM/OiBNb2RhbE1lc3NhZ2VBY3Rpb25bXSwgb3B0aW9uczogYW55ID0ge30pIHtcclxuXHRcdFx0aWYgKCFhY3Rpb25zIHx8IGFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0YWN0aW9ucyA9IFt7dGl0bGU6ICdPSycsIG9uRGlzbWlzczogdHJ1ZSwgaGFuZGxlcjogdGhpcy5kaXNtaXNzTWVzc2FnZX1dO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlID0gbmV3IE1vZGFsTWVzc2FnZSh0aXRsZSwgbWVzc2FnZSwgZmFsc2UsIGFjdGlvbnMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRpc21pc3NNZXNzYWdlKCkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlLmhpZGUoKS50aGVuKHggPT4ge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSBudWxsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdF92aWV3KGlkOiBzdHJpbmcpOiBTZXR0aW5nc1ZpZXcge1xyXG5cdFx0XHRsZXQgcm91dGVzID0gdGhpcy5tZW51LmNvbmNhdCh0aGlzLnJvdXRlcyk7XHJcblxyXG5cdFx0XHRmb3IgKGxldCB2aWV3IG9mIHJvdXRlcykge1xyXG5cdFx0XHRcdGlmICh2aWV3LmlkID09PSBpZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHZpZXc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRfbG9nKGVycjogYW55KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIG1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCk7XHJcblx0ZXhwb3J0IHZhciBtb2RlbCA9IHJpdmV0cy5iaW5kKGRvY3VtZW50LmJvZHksIG1haW5WaWV3KTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5TZXR0aW5ncyB7XHJcblx0ZXhwb3J0IGNsYXNzIFRhYkNvbnRlbnQgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0Y29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xyXG5cdFx0XHRzdXBlcihub2RlLCBkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLXRhYi1jb250ZW50Jywge1xyXG5cdFx0c3RhdGljOiBbXSxcclxuXHRcdGluaXRpYWxpemU6IChlbCwgZGF0YSkgPT4gbmV3IFRhYkNvbnRlbnQoZWwsIGRhdGEpXHJcblx0fSlcclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgVmlld3MuU2V0dGluZ3Mge1xyXG5cdGV4cG9ydCBjbGFzcyBUYWJHcm91cCBleHRlbmRzIENvcmUuQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcblx0XHRcdHN1cGVyKG5vZGUsIGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Q29yZS5Db21wb25lbnRzLmNyZWF0ZSgnd3ItdGFiLWdyb3VwJywge1xyXG5cdFx0c3RhdGljOiBbXSxcclxuXHRcdGluaXRpYWxpemU6IChlbCwgZGF0YSkgPT4gbmV3IFRhYkdyb3VwKGVsLCBkYXRhKVxyXG5cdH0pXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvY29tbW9uLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy9FeHRBUEkuZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgVmlld3MuU2V0dGluZ3Mge1xyXG5cdGltcG9ydCAkID0gQ29yZS5VdGlscy5ET007XHJcblx0aW1wb3J0IFByZXNldCA9IENvcmUuUHJlc2V0O1xyXG5cdGltcG9ydCBQcmVzZXRUeXBlID0gQ29yZS5QcmVzZXRUeXBlO1xyXG5cdGltcG9ydCBQcmVzZXRUYXJnZXQgPSBDb3JlLlByZXNldFRhcmdldDtcclxuXHRpbXBvcnQgUHJlc2V0UG9zaXRpb24gPSBDb3JlLlByZXNldFBvc2l0aW9uO1xyXG5cclxuXHRpbXBvcnQgRm9ybWF0SW50ZWdlciA9IENvcmUuRm9ybWF0dGVycy5Ub0ludDtcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhZ2VFZGl0UHJlc2V0IGV4dGVuZHMgQ29yZS5DdXN0b21FbGVtZW50IHtcclxuXHRcdHB1YmxpYyBwYXJlbnQ6IGFueTsgLy8gVmlld3MuU2V0dGluZ3MuTWFpblZpZXc7XHJcblxyXG5cdFx0cHVibGljIHRpdGxlOiBzdHJpbmcgPSAnYWRkIHByZXNldCc7XHJcblx0XHRwdWJsaWMgaWQ6IHN0cmluZztcclxuXHJcblx0XHRwdWJsaWMgcHJlc2V0OiBQcmVzZXQgPSBuZXcgUHJlc2V0KHt9KTtcclxuXHJcblx0XHRwdWJsaWMgZm9ybUVycm9yczogc3RyaW5nW10gPSBbXTtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XHJcblx0XHRcdHN1cGVyKG5vZGUsIGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluaXQoKSB7XHJcblx0XHRcdGxldCBwYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCgvZWRpdD0oW15cXC9dKykvKTtcclxuXHRcdFx0dGhpcy5pZCA9IHBhcmFtcyA/IHBhcmFtc1sxXSA6ICcnO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuaWQpIHtcclxuXHRcdFx0XHR0aGlzLnRpdGxlID0gJ2VkaXQgcHJlc2V0JztcclxuXHJcblx0XHRcdFx0RXh0QVBJLmludm9rZSgnZ2V0LXByZXNldHMnKS50aGVuKHByZXNldHMgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IGRhdGEgPSBwcmVzZXRzLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSB0aGlzLmlkKTtcclxuXHRcdFx0XHRcdHRoaXMucHJlc2V0ID0gbmV3IFByZXNldChkYXRhKTtcclxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tUG9zaXRpb24gPSB0aGlzLnByZXNldC5wb3NpdGlvbjtcclxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tSWNvbiA9IHRoaXMucHJlc2V0LnR5cGU7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHVzZUN1cnJlbnRTaXplKGV2dCwgY3R4KSB7XHJcblx0XHRcdGNocm9tZS53aW5kb3dzLmdldEN1cnJlbnQoe3BvcHVsYXRlOiB0cnVlfSwgd2luID0+IHtcclxuXHRcdFx0XHRsZXQgdGFiOiBhbnkgPSB3aW4udGFicy5maWx0ZXIodGFiID0+IHRhYi5hY3RpdmUpLnBvcCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3R4LnByZXNldC50YXJnZXQgPT0gMSkge1xyXG5cdFx0XHRcdFx0Y3R4LnByZXNldC53aWR0aCAgPSB0YWIud2lkdGg7XHJcblx0XHRcdFx0XHRjdHgucHJlc2V0LmhlaWdodCA9IHRhYi5oZWlnaHQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGN0eC5wcmVzZXQud2lkdGggID0gd2luLndpZHRoO1xyXG5cdFx0XHRcdFx0Y3R4LnByZXNldC5oZWlnaHQgPSB3aW4uaGVpZ2h0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR1c2VDdXJyZW50UG9zaXRpb24oZXZ0LCBjdHgpIHtcclxuXHRcdFx0Y2hyb21lLndpbmRvd3MuZ2V0Q3VycmVudCh3aW4gPT4ge1xyXG5cdFx0XHRcdGN0eC5jdXN0b21Qb3NpdGlvbiA9IFByZXNldFBvc2l0aW9uLkNVU1RPTTtcclxuXHJcblx0XHRcdFx0Y3R4LnByZXNldC5sZWZ0ID0gd2luLmxlZnQ7XHJcblx0XHRcdFx0Y3R4LnByZXNldC50b3AgID0gd2luLnRvcDtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRnZXQgYWxsb3dDdXN0b21Qb3NpdGlvbigpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJlc2V0LnBvc2l0aW9uID09PSBQcmVzZXRQb3NpdGlvbi5DVVNUT007XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0IGFsbG93Q3VzdG9tUG9zaXRpb24obmV3VmFsdWUpIHtcclxuXHRcdFx0Ly8gcGxhY2Vob2xkZXIgc2V0dGVyXHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGN1c3RvbVBvc2l0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wcmVzZXQucG9zaXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0IGN1c3RvbVBvc2l0aW9uKG5ld1ZhbHVlOiBhbnkpIHtcclxuXHRcdFx0bmV3VmFsdWUgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xyXG5cdFx0XHR0aGlzLnByZXNldC5wb3NpdGlvbiA9IG5ld1ZhbHVlO1xyXG5cclxuXHRcdFx0aWYgKG5ld1ZhbHVlICE9PSBQcmVzZXRQb3NpdGlvbi5DVVNUT00pIHtcclxuXHRcdFx0XHR0aGlzLnByZXNldC5sZWZ0ID0gbnVsbDtcclxuXHRcdFx0XHR0aGlzLnByZXNldC50b3AgID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hbGxvd0N1c3RvbVBvc2l0aW9uID0gbmV3VmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0IGN1c3RvbUljb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnByZXNldC50eXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldCBjdXN0b21JY29uKG5ld1ZhbHVlOiBhbnkpIHtcclxuXHRcdFx0bmV3VmFsdWUgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xyXG5cdFx0XHR0aGlzLnByZXNldC50eXBlID0gbmV3VmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FuY2VsKGV2dCwgY3R4KSB7XHJcblx0XHRcdGN0eC5wYXJlbnQuc2hvd1ZpZXcoY3R4LnBhcmVudC5tZW51WzFdKTtcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlUHJlc2V0KGV2dCwgY3R4KSB7XHJcblx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0bGV0IHByZXNldCA9IGN0eC5wcmVzZXQ7XHJcblxyXG5cdFx0XHRjdHguZm9ybUVycm9ycyA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKHByZXNldC53aWR0aCA9PT0gbnVsbCAmJiBwcmVzZXQuaGVpZ2h0ID09PSBudWxsKSB7XHJcblx0XHRcdFx0Y3R4LmZvcm1FcnJvcnMucHVzaCgnWW91IG11c3QgcHJvdmlkZSBhdCBsZWFzdCBvbmUgb2YgdGhlIHdpZHRoIGFuZCBoZWlnaHQgdmFsdWVzIScpO1xyXG5cdFx0XHRcdCQucSgnI2NvbnRlbnQnKS5zY3JvbGxUb3AgPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3R4LmZvcm1FcnJvcnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdzYXZlLXByZXNldCcsIHByZXNldCkudGhlbihkYXRhID0+IHtcclxuXHRcdFx0XHRjdHgucGFyZW50LnNob3dWaWV3KGN0eC5wYXJlbnQubWVudVsxXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Q29yZS5Db21wb25lbnRzLmNyZWF0ZSgnd3ItcGFnZS1lZGl0LXByZXNldCcsIHtcclxuXHRcdHN0YXRpYzogW10sXHJcblx0XHRpbml0aWFsaXplOiAoZWwsIGRhdGEpID0+IG5ldyBQYWdlRWRpdFByZXNldChlbCwgZGF0YSlcclxuXHR9KVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIFZpZXdzLlNldHRpbmdzIHtcclxuXHRleHBvcnQgY2xhc3MgUGFnZUhlbHAgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0cHVibGljIGZyaWVuZGx5VmVyc2lvbjogc3RyaW5nO1xyXG5cdFx0cHVibGljIGNvbXBsZXRlVmVyc2lvbjogc3RyaW5nO1xyXG5cdFx0cHVibGljIGRlYnVnTG9nOiBzdHJpbmc7XHJcblxyXG5cdFx0Y29uc3RydWN0b3Iobm9kZSwgZGF0YSkge1xyXG5cdFx0XHRzdXBlcihub2RlLCBkYXRhKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbml0KCkge1xyXG5cdFx0XHRsZXQgY29uZmlnOiBhbnkgPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xyXG5cclxuXHRcdFx0dGhpcy5mcmllbmRseVZlcnNpb24gPSBjb25maWcudmVyc2lvbl9uYW1lIHx8IGNvbmZpZy52ZXJzaW9uO1xyXG5cdFx0XHR0aGlzLmNvbXBsZXRlVmVyc2lvbiA9IGNvbmZpZy52ZXJzaW9uX25hbWUgPyBgKCR7Y29uZmlnLnZlcnNpb259KWAgOiAnJztcclxuXHRcdFx0XHJcblx0XHRcdGxldCBsb2cgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2RlYnVnTG9nJ10gfHwgJ1tdJyk7XHJcblx0XHRcdGxldCByb3dzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGxldCByID0gMCwgbCA9IGxvZy5sZW5ndGg7IHIgPCBsOyByKyspIHtcclxuXHRcdFx0XHRyb3dzLnB1c2goSlNPTi5zdHJpbmdpZnkobG9nW3JdKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZGVidWdMb2cgPSByb3dzLmxlbmd0aCA/IGBbXFxuICAgICR7cm93cy5qb2luKFwiLFxcbiAgICBcIil9XFxuXWAgOiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dSZWxlYXNlTm90ZXMoZXZ0LCBjdHgpIHtcclxuXHRcdFx0Y3R4LnBhcmVudC5zaG93U3ViUGFnZSgnd3ItcGFnZS1yZWxlYXNlLW5vdGVzJywgJ3JlbGVhc2Utbm90ZXMnKTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG93RGVidWdMb2coZXZ0LCBjdHgpIHtcclxuXHRcdFx0Y3R4LnBhcmVudC5zaG93TWVzc2FnZSgnRXJyb3JzIGxvZycsIGA8cHJlPiR7Y3R4LmRlYnVnTG9nfTwvcHJlPmAsIG51bGwsIHtjbGFzczogJ2Rhbmdlcid9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLXBhZ2UtaGVscCcsIHtcclxuXHRcdHN0YXRpYzogW10sXHJcblx0XHRpbml0aWFsaXplOiAoZWwsIGRhdGEpID0+IG5ldyBQYWdlSGVscChlbCwgZGF0YSlcclxuXHR9KVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBWaWV3cy5TZXR0aW5ncyB7XHJcblx0aW1wb3J0ICQgPSBDb3JlLlV0aWxzLkRPTTtcclxuXHJcblx0ZXhwb3J0IGNsYXNzIFBhZ2VIb3RrZXlzIGV4dGVuZHMgQ29yZS5DdXN0b21FbGVtZW50IHtcclxuXHRcdHB1YmxpYyBwYXJlbnQ6IGFueTsgLy8gVmlld3MuU2V0dGluZ3MuTWFpblZpZXc7XHJcblxyXG5cdFx0cHVibGljIGtleV9TaG93UG9wdXA6IHN0cmluZyA9ICc8bm90IHNldD4nO1xyXG5cdFx0cHVibGljIGtleV9Ub2dnbGVUb29sdGlwOiBzdHJpbmcgPSAnPG5vdCBzZXQ+JztcclxuXHRcdHB1YmxpYyBrZXlfQ3ljbGVQcmVzZXRzOiBzdHJpbmcgPSAnPG5vdCBzZXQ+JztcclxuXHRcdHB1YmxpYyBrZXlfQ3ljbGVQcmVzZXRzUmV2OiBzdHJpbmcgPSAnPG5vdCBzZXQ+JztcclxuXHJcblx0XHRwdWJsaWMgZ2xvYmFsU2hvcnRjdXRzOiBjaHJvbWUuY29tbWFuZHMuQ29tbWFuZFtdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuXHRcdFx0c3VwZXIobm9kZSwgZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5pdCgpIHtcclxuXHRcdFx0dGhpcy5wYXJlbnQubmF2aWdhdGVUb1RhYigkLnEoJy50YWItbmF2IGEnKSk7XHJcblxyXG5cdFx0XHRjaHJvbWUuY29tbWFuZHMuZ2V0QWxsKGNvbW1hbmRzID0+IHRoaXMuZ2xvYmFsU2hvcnRjdXRzID0gY29tbWFuZHMpXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbmZpZ3VyZVNob3J0Y3V0cygpIHtcclxuXHRcdFx0Y2hyb21lLnRhYnMuY3JlYXRlKHtcclxuXHRcdFx0XHR1cmwgOiAnY2hyb21lOi8vZXh0ZW5zaW9ucy9jb25maWd1cmVDb21tYW5kcycsXHJcblx0XHRcdFx0YWN0aXZlIDogdHJ1ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Q29yZS5Db21wb25lbnRzLmNyZWF0ZSgnd3ItcGFnZS1ob3RrZXlzJywge1xyXG5cdFx0c3RhdGljOiBbXSxcclxuXHRcdGluaXRpYWxpemU6IChlbCwgZGF0YSkgPT4gbmV3IFBhZ2VIb3RrZXlzKGVsLCBkYXRhKVxyXG5cdH0pXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvY29tbW9uLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxuXG5tb2R1bGUgVmlld3MuU2V0dGluZ3Mge1xuXHRleHBvcnQgY2xhc3MgUGFnZVBybyBleHRlbmRzIENvcmUuQ3VzdG9tRWxlbWVudCB7XG5cdFx0cHVibGljIHBhcmVudDogYW55OyAvLyBWaWV3cy5TZXR0aW5ncy5NYWluVmlldztcblxuXHRcdHB1YmxpYyBkZWZhdWx0UHJpY2U6IG51bWJlciA9IDQ7XG5cdFx0cHVibGljIHBheUFtb3VudDogbnVtYmVyID0gNDtcblx0XHRwdWJsaWMgbWluQW1vdW50OiBudW1iZXIgPSAzO1xuXHRcdHB1YmxpYyBsaWNlbnNlS2V5OiBzdHJpbmcgPSAnJztcblx0XHRwdWJsaWMgZXJyb3I6IHN0cmluZyA9ICcnO1xuXHRcdHB1YmxpYyBidXN5OiBib29sZWFuID0gZmFsc2U7XG5cblx0XHRjb25zdHJ1Y3Rvcihub2RlLCBkYXRhKSB7XG5cdFx0XHRzdXBlcihub2RlLCBkYXRhKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0XG5cdFx0fVxuXG5cdFx0YWN0aXZhdGUgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMubGljZW5zZUtleS5tYXRjaCgvXlxccypbYS1mXFxkXXs4fS1bYS1mXFxkXXs0fS1bYS1mXFxkXXs0fS1bYS1mXFxkXXs0fS1bYS1mXFxkXXsxMn1cXHMqJC9pKSkge1xuXHRcdFx0XHR0aGlzLmVycm9yID0gJ0ludmFsaWQgbGljZW5zZSBrZXkhJztcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmVycm9yID0gJyc7XG5cdFx0XHR0aGlzLmJ1c3kgPSB0cnVlO1xuXHRcdFx0XG5cdFx0XHRFeHRBUEkuaW52b2tlKCdwcm86YWN0aXZhdGUtbGljZW5zZScsIHtrZXk6IHRoaXMubGljZW5zZUtleX0pXG5cdFx0XHRcdC50aGVuKHRoaXMuX2hhbmRsZUVycm9ycylcblx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5saWNlbnNlS2V5ID0gJyc7XG5cdFx0XHRcdFx0Ly8gdGhpcy5wYXJlbnQubGljZW5zZSA9IGRhdGE7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHB1cmNoYXNlID0gKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMucGF5QW1vdW50IDwgdGhpcy5taW5BbW91bnQpIHtcblx0XHRcdFx0dGhpcy5lcnJvciA9IGBUaGUgbWluaW11bSBhbW91bnQgaXMgXFwkJHt0aGlzLm1pbkFtb3VudC50b0ZpeGVkKDIpfWA7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5lcnJvciA9ICcnO1xuXHRcdFx0dGhpcy5idXN5ID0gdHJ1ZTtcblx0XHRcdFxuXHRcdFx0RXh0QVBJLmludm9rZSgncHJvOmNoZWNrb3V0LXVybCcsIHtwcmljZTogdGhpcy5wYXlBbW91bnR9KVxuXHRcdFx0XHQudGhlbih0aGlzLl9oYW5kbGVFcnJvcnMpXG5cdFx0XHRcdC50aGVuKGRhdGEgPT4ge1xuXHRcdFx0XHRcdHdpbmRvdy5vcGVuKGRhdGEudXJsKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0X2hhbmRsZUVycm9ycyA9IChyZXNwb25zZTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcblx0XHRcdHRoaXMuYnVzeSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9ICcnO1xuXG5cdFx0XHRpZiAocmVzcG9uc2UuZXJyb3IpIHtcblx0XHRcdFx0dGhpcy5lcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UuZXJyb3IpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdENvcmUuQ29tcG9uZW50cy5jcmVhdGUoJ3dyLXBhZ2UtcHJvJywge1xuXHRcdHN0YXRpYzogW10sXG5cdFx0aW5pdGlhbGl6ZTogKGVsLCBkYXRhKSA9PiBuZXcgUGFnZVBybyhlbCwgZGF0YSlcblx0fSlcbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIFZpZXdzLlNldHRpbmdzIHtcclxuXHRleHBvcnQgY2xhc3MgUGFnZVJlbGVhc2VOb3RlcyBleHRlbmRzIENvcmUuQ3VzdG9tRWxlbWVudCB7XHJcblx0XHRwdWJsaWMgcGFyZW50OiBhbnk7IC8vIFZpZXdzLlNldHRpbmdzLk1haW5WaWV3O1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuXHRcdFx0c3VwZXIobm9kZSwgZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FuY2VsKGV2dCwgY3R4KSB7XHJcblx0XHRcdGN0eC5wYXJlbnQuc2hvd1ZpZXcoY3R4LnBhcmVudC5tZW51WzRdKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Z29UbyhldnQsIGN0eCkge1xyXG5cdFx0XHR2YXIgaGFzaCA9IGV2dC50YXJnZXQuaGFzaCB8fCBldnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1oYXNoJyk7XHJcblx0XHRcdGN0eC5wYXJlbnQuc2hvd1ZpZXcoY3R4LnBhcmVudC5fdmlldyhoYXNoKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRDb3JlLkNvbXBvbmVudHMuY3JlYXRlKCd3ci1wYWdlLXJlbGVhc2Utbm90ZXMnLCB7XHJcblx0XHRzdGF0aWM6IFtdLFxyXG5cdFx0aW5pdGlhbGl6ZTogKGVsLCBkYXRhKSA9PiBuZXcgUGFnZVJlbGVhc2VOb3RlcyhlbCwgZGF0YSlcclxuXHR9KVxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL2NvbW1vbi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG5cclxubW9kdWxlIFZpZXdzLlNldHRpbmdzIHtcclxuXHRpbXBvcnQgJCA9IENvcmUuVXRpbHMuRE9NO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgUGFnZVN5bmMgZXh0ZW5kcyBDb3JlLkN1c3RvbUVsZW1lbnQge1xyXG5cdFx0cHVibGljIHBhcmVudDogYW55OyAvLyBWaWV3cy5TZXR0aW5ncy5NYWluVmlldztcclxuXHJcblx0XHRwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKG5vZGUsIGRhdGEpIHtcclxuXHRcdFx0c3VwZXIobm9kZSwgZGF0YSk7XHJcblxyXG5cdFx0XHR0aGlzLmV4cG9ydFNldHRpbmdzID0gdGhpcy5leHBvcnRTZXR0aW5ncy5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmltcG9ydFNldHRpbmdzID0gdGhpcy5pbXBvcnRTZXR0aW5ncy5iaW5kKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluaXQoKSB7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoKTtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgnZ2V0LXN5bmMtc3RhdHVzJykudGhlbihzdGF0dXMgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Muc3luY1NldHRpbmdzID0gIXN0YXR1cztcclxuXHRcdFx0fSkuY2F0Y2godGhpcy5wYXJlbnQuX2xvZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXhwb3J0U2V0dGluZ3MoKSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2dldC1zZXR0aW5ncycpLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdGxldCBub2RlID0gPEhUTUxUZXh0QXJlYUVsZW1lbnQ+ICQucSgnI2ltcG9ydEV4cG9ydEZpZWxkJyk7XHJcblxyXG5cdFx0XHRcdG5vZGUudmFsdWUgPSBKU09OLnN0cmluZ2lmeShzZXR0aW5ncyk7XHJcblx0XHRcdFx0bm9kZS5mb2N1cygpO1xyXG5cdFx0XHRcdG5vZGUuc2VsZWN0KCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0aW1wb3J0U2V0dGluZ3MoKSB7XHJcblx0XHRcdGxldCBub2RlID0gPEhUTUxUZXh0QXJlYUVsZW1lbnQ+ICQucSgnI2ltcG9ydEV4cG9ydEZpZWxkJyk7XHJcblx0XHRcdGxldCBkYXRhO1xyXG5cdFx0XHRsZXQgc2V0dGluZ3M6IGFueSA9IHt9O1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShub2RlLnZhbHVlKTtcclxuXHRcdFx0fSBjYXRjaChleCkge1xyXG5cdFx0XHRcdHRoaXMucGFyZW50LnNob3dNZXNzYWdlKCdFcnJvcicsICdUaGUgcHJvdmlkZWQgaW5wdXQgaXMgbm90IGEgdmFsaWQgSlNPTiBvYmplY3QuJyk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2ltcG9ydC1zZXR0aW5ncycsIGRhdGEpO1xyXG5cclxuXHRcdFx0dGhpcy5wYXJlbnQuc2hvd01lc3NhZ2UoJ1N1Y2Nlc3MnLCAnVGhlIG5ldyBzZXR0aW5ncyBoYXZlIGJlZW4gaW1wb3J0ZWQuJyk7XHJcblx0XHRcdG5vZGUudmFsdWUgPSAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsYXNzIFNldHRpbmdzIHtcclxuXHRcdHByaXZhdGUgX3NldHRpbmdzOiBhbnkgPSB7fTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdFx0Z2V0IHN5bmNTZXR0aW5ncygpICAgICB7IHJldHVybiB0aGlzLl9zZXR0aW5ncy5zeW5jU2V0dGluZ3M7IH1cclxuXHRcdHNldCBzeW5jU2V0dGluZ3ModmFsKSAge1xyXG5cdFx0XHRpZiAodmFsID09PSB0aGlzLl9zZXR0aW5ncy5zeW5jU2V0dGluZ3MpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3NldHRpbmdzLnN5bmNTZXR0aW5ncyA9IHZhbDtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0RXh0QVBJLmludm9rZSgndG9nZ2xlLXN5bmMnLCAhdmFsKVxyXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4gRXh0QVBJLmludm9rZSgnZ2V0LXNldHRpbmdzJykpXHJcblx0XHRcdFx0XHQudGhlbihzZXR0aW5ncyA9PiBFeHRBUEkuaW52b2tlKCdzYXZlLXNldHRpbmdzJywgc2V0dGluZ3MpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRDb3JlLkNvbXBvbmVudHMuY3JlYXRlKCd3ci1wYWdlLXN5bmMnLCB7XHJcblx0XHRzdGF0aWM6IFtdLFxyXG5cdFx0aW5pdGlhbGl6ZTogKGVsLCBkYXRhKSA9PiBuZXcgUGFnZVN5bmMoZWwsIGRhdGEpXHJcblx0fSlcclxufVxyXG4iXX0=
