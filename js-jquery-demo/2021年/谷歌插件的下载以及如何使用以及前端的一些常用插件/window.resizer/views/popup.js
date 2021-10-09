/// <reference path="../../../typings/rivets.d.ts" />
/// <reference path="../../../typings/ExtAPI.d.ts" />
/// <reference path="../../../typings/tab-nav.d.ts" />
/// <reference path="../../../typings/common.d.ts" />
var Views;
(function (Views) {
    var Popup;
    (function (Popup_1) {
        var Keys = Core.Input.Keys;
        var $ = Core.Utils.DOM;
        var ModalMessage = Views.Common.ModalMessage;
        class AffiliateBanner {
            constructor(url, image, caption, accent = '#eee') {
                this.url = url;
                this.image = image;
                this.caption = caption;
                this.accent = accent;
            }
        }
        Popup_1.AffiliateBanner = AffiliateBanner;
        class Popup {
            constructor() {
                this.presets = [];
                this.quick = { width: null, height: null, target: 0 };
                this.showKeys = false;
                this.alternatePresetsBg = false;
                this.autoClosePopup = false;
                this.hidePresetsDescription = false;
                this.hidePopupTooltips = false;
                this.hideQuickResize = false;
                this._panels = [];
                this._clickFocus = false;
                this.license = null;
                this.collapsedSidebar = false;
                this.errorMessage = null;
                this.errorMessageTimeout = null;
                this.showQuickTips = false;
                this.presetsIconsStyle = '';
                this.presetsPrimaryLine = '';
                this.hideError = () => {
                    clearTimeout(this.errorMessageTimeout);
                    this.errorMessageTimeout = null;
                };
                this.hideQuickTips = () => {
                    this.showQuickTips = false;
                    window.localStorage['showQuickTips'] = '0';
                };
                this.presets = [];
                this.collapsedSidebar = window.localStorage['collapsed-sidebar'] === '1';
                this.hideQuickResize = window.localStorage['hideQuickResize'] === '1';
                this.showQuickTips = window.localStorage['showQuickTips'] !== '0';
                this._initPanels();
                this.quickResize = this._preventDefault(this.quickResize);
                this.handlePresetClick = this.handlePresetClick.bind(this);
                this.handleToolsClick = this.handleToolsClick.bind(this);
                this.toggleResizeInfo = this.toggleResizeInfo.bind(this);
                this.rotateViewport = this.rotateViewport.bind(this);
                this.handleKeyDown = this.handleKeyDown.bind(this);
                this.handleKeyUp = this.handleKeyUp.bind(this);
                this._showKeys = this._showKeys.bind(this);
                this._hideKeys = this._hideKeys.bind(this);
                this.dismissMessage = this.dismissMessage.bind(this);
                this.hideBanner = this.hideBanner.bind(this);
                ExtAPI.invoke('get-banner').then(b => this.showBanner(b)).catch(LOG_ERROR);
                ExtAPI.invoke('get-settings').then(settings => {
                    this.presetsIconsStyle = settings.presetsIconsStyle;
                    this.presetsPrimaryLine = settings.presetsPrimaryLine;
                    this.alternatePresetsBg = settings.alternatePresetsBg;
                    this.autoClosePopup = settings.autoClosePopup;
                    this.hidePresetsDescription = settings.hidePresetsDescription;
                    this.hidePopupTooltips = settings.hidePopupTooltips;
                    this.hideQuickResize = settings.hideQuickResize;
                    window.localStorage['hideQuickResize'] = settings.hideQuickResize ? 1 : 0;
                    this.license = settings.license;
                    for (let presetData of settings.presets) {
                        this.presets.push(new Core.Preset(presetData));
                    }
                    this._showTheUpdateMessage();
                }).catch(LOG_ERROR);
            }
            _showTheUpdateMessage() {
                let updated = window.localStorage['wasUpdated'];
                if (updated) {
                    this.showMessage('UPDATED', '');
                    let modalMsg = document.createElement('div');
                    const _cleanup = () => {
                        modalView.unbind();
                        window.localStorage.removeItem('wasUpdated');
                        chrome.browserAction.setBadgeText({ text: '' });
                    };
                    if (updated == 1) {
                        modalMsg.innerHTML = `
						<p>
							Window Resizer has just received a major update, bringing lots of 
							changes like a new UI, a rotate tool, better control of the resize 
							tooltip and plenty more!
						</p>
		
						<a rv-on-click="showReleaseNotes" href="#">&raquo; Read more</a>
					`;
                    }
                    else {
                        modalMsg.innerHTML = `
					<ul>
						<li><b>Added</b> a new icon theme for the presets.</li>
						<li><b>Added</b> a setting to display the description as the preset's title.</li>
					</ul>
		
					<a rv-on-click="showReleaseNotes" href="#">&raquo; Find out more</a>
					`;
                    }
                    if (!this.license) {
                        modalMsg.innerHTML += `
						<div style="text-align: center; margin: 14px 0 -10px; padding: 14px 0 0; border-top: 1px solid #ddd;">
							<strong>Want to support this extension?</strong>
						</div>
						<style>.WR_modal_actions{text-align:center}</style>
					`;
                        this.currentMessage.actions[0].title = 'Ok, whatever!';
                        this.currentMessage.actions[0].title = 'Nah, I\'m good';
                        this.currentMessage.actions.unshift({ title: 'Buy Pro', icon: '#icon-cart', main: true, handler: () => {
                                _cleanup();
                                this.showProPage({}, this);
                            } });
                    }
                    let modalView = rivets.bind(modalMsg, this);
                    $.q('.WR_modal_message').appendChild(modalMsg);
                    this.currentMessage.onClose.addListener(_cleanup);
                }
            }
            dismissMessage() {
                TabNav.reset();
                this.currentMessage.hide().then(x => {
                    this.currentMessage = null;
                });
            }
            _createMessage(title, message) {
                let modal = new ModalMessage(title, message);
                modal.onClose.addListener(() => {
                    this._panel.focus();
                });
                return modal;
            }
            showMessage(title, message) {
                this.currentMessage = this._createMessage(title, message);
                this.currentMessage.actions.push({ title: 'OK', handler: this.dismissMessage });
            }
            showReleaseNotes(evt, ctx) {
                ctx.currentMessage.hide().then(() => {
                    chrome.browserAction.setBadgeText({ text: '' });
                    ExtAPI.invoke('open-release-notes').catch(error => {
                        ctx._handleCommonErrors(error);
                    });
                });
            }
            showProPage(evt, ctx) {
                ExtAPI.invoke('open-pro-page').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            showError(message) {
                clearTimeout(this.errorMessageTimeout);
                this.errorMessage = message;
                this.errorMessageTimeout = setTimeout(() => this.hideError(), 2000);
            }
            showBanner(banner) {
                this.currentBanner = banner;
                if (banner) {
                    let sheet = window.document.styleSheets[0];
                    sheet.insertRule(`#promo .banner:hover .dim { color: ${banner.accent}; }`, sheet.cssRules.length);
                    $.addClass('#promo', 'visible');
                }
            }
            hideBanner() {
                $.hide('#promo');
                $.addClass('#info', 'empty');
                //this.currentBanner = null;
                ExtAPI.invoke('hide-banner').then(firstTime => {
                    if (!firstTime)
                        return;
                    // this.showMessage('Notice', 'No more recommendations for you today!<br />See you again tomorrow! :)');
                });
            }
            quickResize(evt, ctx) {
                this._resize(this.quick);
            }
            resizePreset(ctx) {
                this._resize(ctx.item);
            }
            openPresetsSettings(evt, ctx) {
                ExtAPI.invoke('open-presets-settings').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            openSettings(evt, ctx) {
                ExtAPI.invoke('open-settings').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            bugReport(evt, ctx) {
                ExtAPI.invoke('open-url', {
                    url: 'https://windowresizer.userecho.com/'
                }).catch(LOG_ERROR);
            }
            toggleResizeInfo(evt, ctx) {
                ExtAPI.invoke('toggle-tooltip').catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            openAsPopup(evt, ctx) {
                ExtAPI.invoke('open-as-popup').then(response => {
                    !isStandalonePopup() && window.close();
                }).catch(error => {
                    ctx._handleCommonErrors(error);
                });
            }
            rotateViewport() {
                ExtAPI.invoke('rotate-viewport').catch(error => {
                    this._handleCommonErrors(error);
                });
            }
            toggleSidebar(evt, ctx) {
                ctx.collapsedSidebar = !ctx.collapsedSidebar;
                window.localStorage['collapsed-sidebar'] = ctx.collapsedSidebar ? 1 : 0;
                ctx._focusPanel(0);
            }
            _resize(config) {
                this.hideError();
                ExtAPI.invoke('resize', config).catch(error => {
                    console.log(error);
                    this._handleCommonErrors(error);
                });
            }
            _preventDefault(method) {
                return (evt, ctx) => {
                    evt.preventDefault();
                    method.call(this, evt, ctx);
                };
            }
            _handleCommonErrors(error) {
                this._handleOOBError(error.errors);
                this._handleProtocolError(error);
                if (error.FILE_PROTOCOL_PERMISSION) {
                    let title = 'Insufficient permissions';
                    let message = 'You need to explicitly allow access to <em>file://</em> URLs on the extensions management page.';
                    let action = { title: 'OK', handler: () => {
                            this.dismissMessage();
                            chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
                        } };
                    this.currentMessage = this._createMessage(title, message);
                    this.currentMessage.actions.push(action);
                }
                if (error.WEBSTORE_PERMISSION) {
                    let title = 'Permissions error';
                    let message = 'The tooltip can\'t be displayed on this tab because extensions are not allowed to alter the content of the Chrome Webstore pages.';
                    let action = { title: 'OK', handler: this.dismissMessage };
                    this.currentMessage = this._createMessage(title, message);
                    this.currentMessage.actions.push(action);
                }
            }
            _handleOOBError(error) {
                if (error && error.OUT_OF_BOUNDS) {
                    this.showError(`Chrome couldn't apply the exact desired dimensions!`);
                    return;
                    // var keys = error.OUT_OF_BOUNDS.keys;
                    // var errs = [];
                    // if (keys.indexOf('MAX_HEIGHT') > -1) {
                    // 	errs.push('the target <b>height</b> is greater than the maximum allowed by your current screen resolution');
                    // }
                    // if (keys.indexOf('MAX_WIDTH') > -1) {
                    // 	errs.push('the target <b>width</b> is greater than the maximum allowed by your current screen resolution');
                    // }
                    // if (keys.indexOf('MIN_HEIGHT') > -1) {
                    // 	errs.push('the target <b>height</b> is lower than the minimum allowed by your browser window');
                    // }
                    // if (keys.indexOf('MIN_WIDTH') > -1) {
                    // 	errs.push('the target <b>width</b> is lower than the maximum allowed by your browser window');
                    // }
                    // this.showMessage('ERROR', '<ul><li>' + errs.join('</li><li>') + '</li></ul><b>HINT:</b> Adjust the zoom level then try again. (Zoom in for fewer and zoom out for more CSS pixels)');
                }
            }
            _handleProtocolError(error) {
                if (error.INVALID_PROTOCOL) {
                    var err = error.INVALID_PROTOCOL;
                    if (!err.tab.url) {
                        let title = 'Insufficient permissions';
                        let message = 'In order for the extension to work on regular windows in <em>detached</em> mode, it needs to be able to inject custom code in the context of all pages, without user interaction.';
                        this.currentMessage = this._createMessage(title, message);
                        this.currentMessage.actions.push({ title: 'Cancel', handler: this.dismissMessage });
                        this.currentMessage.actions.push({ title: 'Grant permissions', main: true, handler: () => {
                                this.dismissMessage();
                                chrome.permissions.request({ permissions: ['tabs'], origins: ['<all_urls>'] }, granted => { });
                            } });
                    }
                    else {
                        this.showMessage('Invalid protocol: <b>' + String(err.protocol) + '://</b>', 'This feature only works on pages loaded using one of the following protocols: <br /><b>http://</b>, <b>https://</b> or <b>file://</b>');
                    }
                }
            }
            _showKeys() {
                this.showKeys = true;
            }
            _hideKeys() {
                this.showKeys = false;
            }
            _initPanels() {
                this._panels.push(new ListPanel('#presetsPanel', 'wr-preset'));
                this._panels.push(new ListPanel('#toolsPanel', 'button'));
                this._panel = this._panels[0];
            }
            _focusPanel(idx) {
                if (idx === 1 && this.collapsedSidebar) {
                    return;
                }
                let panel = this._panels[idx];
                if (panel != this._panel) {
                    this._panel && this._panel.blur();
                    this._panel = panel;
                    this._panel.focus();
                }
            }
            handleBannerClick(evt, ctx) {
                const target = evt.currentTarget;
                const url = target.getAttribute('data-url');
                const action = target.getAttribute('data-action');
                if (url) {
                    ExtAPI.invoke('open-url', { url }).catch(LOG_ERROR);
                }
                else {
                    ctx[action]();
                }
            }
            handlePresetClick(evt, ctx) {
                this._focusPanel(0);
                //this._panel.reset();
                this._panel.selectItem(evt.currentTarget);
                this.resizePreset(ctx);
                this.autoClosePopup && !isStandalonePopup() && window.close();
            }
            handleToolsClick(evt, ctx) {
                if (evt.target instanceof HTMLButtonElement) {
                    this._focusPanel(1);
                    this._panel.selectItem(evt.target);
                }
            }
            handleKeyDown(evt, ctx) {
                let keyCode = evt.keyCode;
                let handled = true;
                switch (keyCode) {
                    case Keys.SHIFT:
                        if (!this.showKeys) {
                            this.showKeys = true;
                        }
                        break;
                    case Keys.SPACE:
                    case Keys.ENTER:
                        $.addClass(this._panel.currentNode(), 'active');
                        break;
                    case Keys.UP:
                        this._panel.prev();
                        break;
                    case Keys.DOWN:
                        this._panel.next();
                        break;
                    case Keys.RIGHT:
                        this._focusPanel(1);
                        break;
                    case Keys.LEFT:
                        this._focusPanel(0);
                        break;
                    default:
                        handled = false;
                        break;
                }
                let node = _getPresetByKeyCode(keyCode);
                if (node) {
                    this._panel.focus();
                    this._focusPanel(0);
                    this._panel.selectItem(node);
                    $.addClass(node, 'active');
                    handled = true;
                }
                if (!handled) {
                    let char = String.fromCharCode(keyCode);
                    let node = $.q(`[data-key="${char}"]`);
                    if (node) {
                        this._panel.focus();
                        this._focusPanel(1);
                        this._panel.selectItem(node);
                        $.addClass(node, 'active');
                        handled = true;
                    }
                }
                if (handled) {
                    evt.preventDefault();
                }
            }
            handleKeyUp(evt, ctx) {
                let keyCode = evt.keyCode;
                let handled = true;
                switch (keyCode) {
                    case Keys.SHIFT:
                        if (this.showKeys) {
                            this.showKeys = false;
                        }
                        break;
                    case Keys.SPACE:
                    case Keys.ENTER:
                        $.removeClass(this._panel.currentNode(), 'active');
                        $.trigger('click', this._panel.currentNode());
                        break;
                    default:
                        handled = false;
                        break;
                }
                let node = _getPresetByKeyCode(keyCode);
                if (node) {
                    $.removeClass(node, 'active');
                    $.trigger('click', node);
                    handled = true;
                }
                if (!handled) {
                    let char = String.fromCharCode(keyCode);
                    let node = $.q(`[data-key="${char}"]`);
                    if (node) {
                        $.removeClass(node, 'active');
                        $.trigger('click', node);
                        handled = true;
                    }
                }
                if (handled) {
                    evt.preventDefault();
                }
            }
            initNavigation() {
                let main = $.q('#main');
                $.on('keydown', main, this.handleKeyDown, true);
                $.on('keyup', main, this.handleKeyUp, true);
                let h = new FocusHandler(main);
                main.focus();
            }
        }
        Popup_1.Popup = Popup;
        class FocusHandler {
            constructor(target) {
                this.ignore = false;
                this.focused = false;
                this.target = target;
                this.__initHandlers();
                $.on('focus', this.target, this.onFocus, true);
                $.on('blur', this.target, this.onBlur, true);
                $.on('mousedown', this.target, this.onMouseDown, true);
                $.on('keydown', document, this.onKeyDown, true);
            }
            __initHandlers() {
                var handlers = ['onFocus', 'onBlur', 'onKeyDown', 'onMouseDown'];
                for (var method of handlers) {
                    this[method] = __eventHandler(this, this[method]);
                }
                function __eventHandler(context, method) {
                    return function (evt) {
                        return method.call(context, evt, this);
                    };
                }
            }
            onBlur(evt) {
                if (!this.target.contains(evt.relatedTarget)) {
                    $.removeClass(this.target, 'focused');
                }
                this.focused = false;
            }
            onFocus(evt) {
                if (!this.ignore) {
                    $.addClass(this.target, 'focused');
                }
                this.focused = true;
            }
            onKeyDown(evt) {
                this.ignore = false;
                if (this.focused) {
                    $.addClass(this.target, 'focused');
                }
            }
            onMouseDown(evt) {
                $.removeClass(this.target, 'focused');
                this.ignore = true;
            }
        }
        function _stealFocus(evt, ctx) {
            evt.preventDefault();
            evt.stopPropagation();
            this.focus();
        }
        function _getPresetByKeyCode(keyCode) {
            var node;
            if ((keyCode >= Keys.DIGITS[0] && keyCode <= Keys.DIGITS[1])
                || (keyCode >= Keys.NUMPAD[0] && keyCode <= Keys.NUMPAD[1])) {
                let idx = (keyCode % 48) || 10;
                node = $.q(`wr-preset:nth-of-type(${idx})`);
            }
            return node;
        }
        class ListPanel {
            constructor(parent, list) {
                this.parent = null;
                this.list = null;
                this.current = -1;
                this.autoInit = true;
                this._selected = 'selected';
                this._focused = 'focused';
                this.parent = $.q(parent);
                this.list = list;
            }
            next() {
                let nodes = $.qAll(this.list, this.parent);
                let next = (this.current + 1) % nodes.length;
                this.select(next, nodes);
            }
            prev() {
                let nodes = $.qAll(this.list, this.parent);
                let prev = (nodes.length + this.current - 1) % nodes.length;
                this.select(prev, nodes);
            }
            select(next, nodes, noFocus) {
                for (let i = 0, l = nodes.length; i < l; i++) {
                    let node = nodes[i];
                    node.classList.remove(this._selected);
                }
                let node = nodes[next];
                this._selectNode(node);
                this.current = next;
                if (!noFocus) {
                    this.focus();
                }
            }
            focus() {
                this.parent.classList.add('focused');
                if (this.autoInit && this.current < 0) {
                    this.next();
                }
                this._selectNode(this.currentNode());
            }
            blur() {
                this.parent.classList.remove('focused');
            }
            reset() {
                let nodes = $.qAll(this.list, this.parent);
                for (let i = 0, l = nodes.length; i < l; i++) {
                    let node = nodes[i];
                    node.classList.remove(this._selected);
                }
                this.current = -1;
            }
            selectItem(item) {
                let nodes = $.qAll(this.list, this.parent);
                let found = -1;
                for (let i = 0, l = nodes.length; i < l; i++) {
                    if (item == nodes[i]) {
                        found = i;
                    }
                }
                if (found > -1 && found != this.current) {
                    let node = nodes[found];
                    this.reset();
                    this._selectNode(node);
                    this.current = found;
                }
            }
            currentNode() {
                let nodes = $.qAll(this.list, this.parent);
                return nodes[this.current];
            }
            _selectNode(node) {
                node.classList.add(this._selected);
                node.setAttribute('tabindex', '0');
                node.focus();
                node.setAttribute('tabindex', '-1');
            }
        }
        Popup_1.view = new Popup();
        var binding = rivets.bind(document.body, Popup_1.view);
        Popup_1.view.initNavigation();
        chrome.runtime.onMessage.addListener(msg => {
            if (msg.UpdatedSettings) {
                if ('license' in msg.UpdatedSettings) {
                    Popup_1.view.currentBanner = null;
                }
                if ('presetsIconsStyle' in msg.UpdatedSettings) {
                    Popup_1.view.presetsIconsStyle = msg.UpdatedSettings.presetsIconsStyle;
                }
                if ('presetsPrimaryLine' in msg.UpdatedSettings) {
                    Popup_1.view.presetsPrimaryLine = msg.UpdatedSettings.presetsPrimaryLine;
                }
                if ('alternatePresetsBg' in msg.UpdatedSettings) {
                    Popup_1.view.alternatePresetsBg = msg.UpdatedSettings.alternatePresetsBg;
                }
                if ('autoClosePopup' in msg.UpdatedSettings) {
                    Popup_1.view.autoClosePopup = msg.UpdatedSettings.autoClosePopup;
                }
                if ('hidePresetsDescription' in msg.UpdatedSettings) {
                    Popup_1.view.hidePresetsDescription = msg.UpdatedSettings.hidePresetsDescription;
                }
                if ('hidePopupTooltips' in msg.UpdatedSettings) {
                    Popup_1.view.hidePopupTooltips = msg.UpdatedSettings.hidePopupTooltips;
                }
                if ('hideQuickResize' in msg.UpdatedSettings) {
                    Popup_1.view.hideQuickResize = msg.UpdatedSettings.hideQuickResize;
                    window.localStorage['hideQuickResize'] = msg.UpdatedSettings.hideQuickResize ? 1 : 0;
                }
                if ('presets' in msg.UpdatedSettings) {
                    Popup_1.view.presets = [];
                    for (let presetData of msg.UpdatedSettings.presets) {
                        Popup_1.view.presets.push(new Core.Preset(presetData));
                    }
                }
            }
        });
        function LOG_ERROR(err) {
            console.log(err);
        }
        function isStandalonePopup() {
            return window.location.hash.indexOf('popup-view') > -1;
        }
        function _constrainWindowSize() {
            var limit = {};
            if (window.innerWidth < 340) {
                limit.width = 340 + window.outerWidth - window.innerWidth;
            }
            if (window.innerHeight < 400) {
                limit.height = 400 + window.outerHeight - window.innerHeight;
            }
            if (limit.width || limit.height) {
                ExtAPI.invoke('limit-popup', limit);
            }
        }
        if (isStandalonePopup()) {
            window.addEventListener('resize', _constrainWindowSize);
        }
    })(Popup = Views.Popup || (Views.Popup = {}));
})(Views || (Views = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy92aWV3cy9wb3B1cC9wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFFckQsSUFBTyxLQUFLLENBb3lCWDtBQXB5QkQsV0FBTyxLQUFLO0lBQUMsSUFBQSxLQUFLLENBb3lCakI7SUFweUJZLFdBQUEsT0FBSztRQUNqQixJQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUUxQixJQUFPLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUdoRDtZQUNDLFlBQ1EsR0FBVyxFQUNYLEtBQWEsRUFDYixPQUFlLEVBQ2YsU0FBaUIsTUFBTTtnQkFIdkIsUUFBRyxHQUFILEdBQUcsQ0FBUTtnQkFDWCxVQUFLLEdBQUwsS0FBSyxDQUFRO2dCQUNiLFlBQU8sR0FBUCxPQUFPLENBQVE7Z0JBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7WUFDNUIsQ0FBQztTQUNKO1FBUFksdUJBQWUsa0JBTzNCLENBQUE7UUFFRDtZQTJCQztnQkExQkEsWUFBTyxHQUFVLEVBQUUsQ0FBQztnQkFDcEIsVUFBSyxHQUFHLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztnQkFDL0MsYUFBUSxHQUFHLEtBQUssQ0FBQztnQkFLakIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO2dCQUNwQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztnQkFDaEMsMkJBQXNCLEdBQVksS0FBSyxDQUFDO2dCQUN4QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7Z0JBQ25DLG9CQUFlLEdBQVksS0FBSyxDQUFDO2dCQUd2QixZQUFPLEdBQWdCLEVBQUUsQ0FBQztnQkFDMUIsZ0JBQVcsR0FB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QUFnQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pELENBQUM7SUFDRixDQUFDLEVBcHlCWSxLQUFLLEdBQUwsV0FBSyxLQUFMLFdBQUssUUFveUJqQjtBQUFELENBQUMsRUFweUJNLEtBQUssS0FBTCxLQUFLLFFBb3lCWCIsImZpbGUiOiJ2aWV3cy9wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3JpdmV0cy5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvRXh0QVBJLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90YWItbmF2LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5tb2R1bGUgVmlld3MuUG9wdXAge1xyXG5cdGltcG9ydCBLZXlzID0gQ29yZS5JbnB1dC5LZXlzO1xyXG5cdGltcG9ydCAkID0gQ29yZS5VdGlscy5ET007XHJcblxyXG5cdGltcG9ydCBNb2RhbE1lc3NhZ2UgPSBWaWV3cy5Db21tb24uTW9kYWxNZXNzYWdlO1xyXG5cdGltcG9ydCBNb2RhbE1lc3NhZ2VBY3Rpb24gPSBWaWV3cy5Db21tb24uTW9kYWxNZXNzYWdlQWN0aW9uO1xyXG5cclxuXHRleHBvcnQgY2xhc3MgQWZmaWxpYXRlQmFubmVyIHtcclxuXHRcdGNvbnN0cnVjdG9yKFxyXG5cdFx0XHRwdWJsaWMgdXJsOiBzdHJpbmcsXHJcblx0XHRcdHB1YmxpYyBpbWFnZTogc3RyaW5nLFxyXG5cdFx0XHRwdWJsaWMgY2FwdGlvbjogc3RyaW5nLFxyXG5cdFx0XHRwdWJsaWMgYWNjZW50OiBzdHJpbmcgPSAnI2VlZSdcclxuXHRcdCkge31cclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBQb3B1cCB7XHJcblx0XHRwcmVzZXRzOiBhbnlbXSA9IFtdO1xyXG5cdFx0cXVpY2sgPSB7d2lkdGg6IG51bGwsIGhlaWdodDogbnVsbCwgdGFyZ2V0OiAwfTtcclxuXHRcdHNob3dLZXlzID0gZmFsc2U7XHJcblxyXG5cdFx0Y3VycmVudE1lc3NhZ2U6IE1vZGFsTWVzc2FnZTtcclxuXHRcdGN1cnJlbnRCYW5uZXI6IEFmZmlsaWF0ZUJhbm5lcjtcclxuXHJcblx0XHRhbHRlcm5hdGVQcmVzZXRzQmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdGF1dG9DbG9zZVBvcHVwOiBib29sZWFuID0gZmFsc2U7XHJcblx0XHRoaWRlUHJlc2V0c0Rlc2NyaXB0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblx0XHRoaWRlUG9wdXBUb29sdGlwczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0aGlkZVF1aWNrUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0cHJvdGVjdGVkIF9wYW5lbDogTGlzdFBhbmVsO1xyXG5cdFx0cHJvdGVjdGVkIF9wYW5lbHM6IExpc3RQYW5lbFtdID0gW107XHJcblx0XHRwcm90ZWN0ZWQgX2NsaWNrRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRwdWJsaWMgbGljZW5zZTogYW55ID0gbnVsbDtcclxuXHRcdHB1YmxpYyBjb2xsYXBzZWRTaWRlYmFyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0cHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nID0gbnVsbDtcclxuXHRcdHB1YmxpYyBlcnJvck1lc3NhZ2VUaW1lb3V0OiBhbnkgPSBudWxsO1xyXG5cdFx0cHVibGljIHNob3dRdWlja1RpcHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdHB1YmxpYyBwcmVzZXRzSWNvbnNTdHlsZTogc3RyaW5nID0gJyc7XHJcblx0XHRwdWJsaWMgcHJlc2V0c1ByaW1hcnlMaW5lOiBzdHJpbmcgPSAnJztcclxuXHJcblx0XHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdFx0dGhpcy5wcmVzZXRzID0gW107XHJcblx0XHRcdHRoaXMuY29sbGFwc2VkU2lkZWJhciA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2NvbGxhcHNlZC1zaWRlYmFyJ10gPT09ICcxJztcclxuXHRcdFx0dGhpcy5oaWRlUXVpY2tSZXNpemUgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydoaWRlUXVpY2tSZXNpemUnXSA9PT0gJzEnO1xyXG5cdFx0XHR0aGlzLnNob3dRdWlja1RpcHMgPSB3aW5kb3cubG9jYWxTdG9yYWdlWydzaG93UXVpY2tUaXBzJ10gIT09ICcwJztcclxuXHJcblx0XHRcdHRoaXMuX2luaXRQYW5lbHMoKTtcclxuXHJcblx0XHRcdHRoaXMucXVpY2tSZXNpemUgPSB0aGlzLl9wcmV2ZW50RGVmYXVsdCh0aGlzLnF1aWNrUmVzaXplKTtcclxuXHJcblx0XHRcdHRoaXMuaGFuZGxlUHJlc2V0Q2xpY2sgPSB0aGlzLmhhbmRsZVByZXNldENsaWNrLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuaGFuZGxlVG9vbHNDbGljayAgPSB0aGlzLmhhbmRsZVRvb2xzQ2xpY2suYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy50b2dnbGVSZXNpemVJbmZvICA9IHRoaXMudG9nZ2xlUmVzaXplSW5mby5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLnJvdGF0ZVZpZXdwb3J0ICAgID0gdGhpcy5yb3RhdGVWaWV3cG9ydC5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuaGFuZGxlS2V5VXAgPSB0aGlzLmhhbmRsZUtleVVwLmJpbmQodGhpcyk7XHJcblxyXG5cdFx0XHR0aGlzLl9zaG93S2V5cyA9IHRoaXMuX3Nob3dLZXlzLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuX2hpZGVLZXlzID0gdGhpcy5faGlkZUtleXMuYmluZCh0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuZGlzbWlzc01lc3NhZ2UgPSB0aGlzLmRpc21pc3NNZXNzYWdlLmJpbmQodGhpcyk7XHJcblx0XHRcdHRoaXMuaGlkZUJhbm5lciA9IHRoaXMuaGlkZUJhbm5lci5iaW5kKHRoaXMpO1xyXG5cclxuXHRcdFx0RXh0QVBJLmludm9rZSgnZ2V0LWJhbm5lcicpLnRoZW4oYiA9PiB0aGlzLnNob3dCYW5uZXIoYikpLmNhdGNoKExPR19FUlJPUik7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2dldC1zZXR0aW5ncycpLnRoZW4oc2V0dGluZ3MgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJlc2V0c0ljb25zU3R5bGUgPSBzZXR0aW5ncy5wcmVzZXRzSWNvbnNTdHlsZTtcclxuXHRcdFx0XHR0aGlzLnByZXNldHNQcmltYXJ5TGluZSA9IHNldHRpbmdzLnByZXNldHNQcmltYXJ5TGluZTtcclxuXHRcdFx0XHR0aGlzLmFsdGVybmF0ZVByZXNldHNCZyA9IHNldHRpbmdzLmFsdGVybmF0ZVByZXNldHNCZztcclxuXHRcdFx0XHR0aGlzLmF1dG9DbG9zZVBvcHVwID0gc2V0dGluZ3MuYXV0b0Nsb3NlUG9wdXA7XHJcblx0XHRcdFx0dGhpcy5oaWRlUHJlc2V0c0Rlc2NyaXB0aW9uID0gc2V0dGluZ3MuaGlkZVByZXNldHNEZXNjcmlwdGlvbjtcclxuXHRcdFx0XHR0aGlzLmhpZGVQb3B1cFRvb2x0aXBzID0gc2V0dGluZ3MuaGlkZVBvcHVwVG9vbHRpcHM7XHJcblx0XHRcdFx0dGhpcy5oaWRlUXVpY2tSZXNpemUgPSBzZXR0aW5ncy5oaWRlUXVpY2tSZXNpemU7XHJcblx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZVsnaGlkZVF1aWNrUmVzaXplJ10gPSBzZXR0aW5ncy5oaWRlUXVpY2tSZXNpemUgPyAxIDogMDtcclxuXHRcdFx0XHR0aGlzLmxpY2Vuc2UgPSBzZXR0aW5ncy5saWNlbnNlO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBwcmVzZXREYXRhIG9mIHNldHRpbmdzLnByZXNldHMpIHtcclxuXHRcdFx0XHRcdHRoaXMucHJlc2V0cy5wdXNoKG5ldyBDb3JlLlByZXNldChwcmVzZXREYXRhKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl9zaG93VGhlVXBkYXRlTWVzc2FnZSgpO1xyXG5cdFx0XHR9KS5jYXRjaChMT0dfRVJST1IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9zaG93VGhlVXBkYXRlTWVzc2FnZSgpIHtcclxuXHRcdFx0bGV0IHVwZGF0ZWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlWyd3YXNVcGRhdGVkJ107XHJcblx0XHRcclxuXHRcdFx0aWYgKHVwZGF0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlKCdVUERBVEVEJywgJycpO1xyXG5cdFx0XHRcdGxldCBtb2RhbE1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdGNvbnN0IF9jbGVhbnVwID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0bW9kYWxWaWV3LnVuYmluZCgpO1xyXG5cdFx0XHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd3YXNVcGRhdGVkJyk7XHJcblx0XHRcdFx0XHRjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoe3RleHQgOiAnJ30pO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcclxuXHRcdFx0XHRpZiAodXBkYXRlZCA9PSAxKSB7XHJcblx0XHRcdFx0XHRtb2RhbE1zZy5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRcdFdpbmRvdyBSZXNpemVyIGhhcyBqdXN0IHJlY2VpdmVkIGEgbWFqb3IgdXBkYXRlLCBicmluZ2luZyBsb3RzIG9mIFxyXG5cdFx0XHRcdFx0XHRcdGNoYW5nZXMgbGlrZSBhIG5ldyBVSSwgYSByb3RhdGUgdG9vbCwgYmV0dGVyIGNvbnRyb2wgb2YgdGhlIHJlc2l6ZSBcclxuXHRcdFx0XHRcdFx0XHR0b29sdGlwIGFuZCBwbGVudHkgbW9yZSFcclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHJcblx0XHRcdFx0XHRcdDxhIHJ2LW9uLWNsaWNrPVwic2hvd1JlbGVhc2VOb3Rlc1wiIGhyZWY9XCIjXCI+JnJhcXVvOyBSZWFkIG1vcmU8L2E+XHJcblx0XHRcdFx0XHRgO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtb2RhbE1zZy5pbm5lckhUTUwgPSBgXHJcblx0XHRcdFx0XHQ8dWw+XHJcblx0XHRcdFx0XHRcdDxsaT48Yj5BZGRlZDwvYj4gYSBuZXcgaWNvbiB0aGVtZSBmb3IgdGhlIHByZXNldHMuPC9saT5cclxuXHRcdFx0XHRcdFx0PGxpPjxiPkFkZGVkPC9iPiBhIHNldHRpbmcgdG8gZGlzcGxheSB0aGUgZGVzY3JpcHRpb24gYXMgdGhlIHByZXNldCdzIHRpdGxlLjwvbGk+XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHJcblx0XHRcdFx0XHQ8YSBydi1vbi1jbGljaz1cInNob3dSZWxlYXNlTm90ZXNcIiBocmVmPVwiI1wiPiZyYXF1bzsgRmluZCBvdXQgbW9yZTwvYT5cclxuXHRcdFx0XHRcdGA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0aWYgKCF0aGlzLmxpY2Vuc2UpIHtcclxuXHRcdFx0XHRcdG1vZGFsTXNnLmlubmVySFRNTCArPSBgXHJcblx0XHRcdFx0XHRcdDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbjogMTRweCAwIC0xMHB4OyBwYWRkaW5nOiAxNHB4IDAgMDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XCI+XHJcblx0XHRcdFx0XHRcdFx0PHN0cm9uZz5XYW50IHRvIHN1cHBvcnQgdGhpcyBleHRlbnNpb24/PC9zdHJvbmc+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8c3R5bGU+LldSX21vZGFsX2FjdGlvbnN7dGV4dC1hbGlnbjpjZW50ZXJ9PC9zdHlsZT5cclxuXHRcdFx0XHRcdGA7XHJcblx0XHRcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9uc1swXS50aXRsZSA9ICdPaywgd2hhdGV2ZXIhJztcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9uc1swXS50aXRsZSA9ICdOYWgsIElcXCdtIGdvb2QnO1xyXG5cdFx0XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlLmFjdGlvbnMudW5zaGlmdCh7dGl0bGU6ICdCdXkgUHJvJywgaWNvbjogJyNpY29uLWNhcnQnLCBtYWluOiB0cnVlLCBoYW5kbGVyOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdF9jbGVhbnVwKCk7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2hvd1Byb1BhZ2Uoe30sIHRoaXMpO1xyXG5cdFx0XHRcdFx0fX0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0bGV0IG1vZGFsVmlldyA9IHJpdmV0cy5iaW5kKG1vZGFsTXNnLCB0aGlzKTtcclxuXHRcdFx0XHQkLnEoJy5XUl9tb2RhbF9tZXNzYWdlJykuYXBwZW5kQ2hpbGQobW9kYWxNc2cpO1xyXG5cdFx0XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5vbkNsb3NlLmFkZExpc3RlbmVyKF9jbGVhbnVwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRpc21pc3NNZXNzYWdlKCkge1xyXG5cdFx0XHRUYWJOYXYucmVzZXQoKTtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuaGlkZSgpLnRoZW4oeCA9PiB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZSA9IG51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9jcmVhdGVNZXNzYWdlKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IE1vZGFsTWVzc2FnZSB7XHJcblx0XHRcdGxldCBtb2RhbCA9IG5ldyBNb2RhbE1lc3NhZ2UodGl0bGUsIG1lc3NhZ2UpO1xyXG5cclxuXHRcdFx0bW9kYWwub25DbG9zZS5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwuZm9jdXMoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbW9kYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd01lc3NhZ2UodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSB0aGlzLl9jcmVhdGVNZXNzYWdlKHRpdGxlLCBtZXNzYWdlKTtcclxuXHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5hY3Rpb25zLnB1c2goe3RpdGxlOiAnT0snLCBoYW5kbGVyOiB0aGlzLmRpc21pc3NNZXNzYWdlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2hvd1JlbGVhc2VOb3RlcyhldnQsIGN0eCkge1xyXG5cdFx0XHRjdHguY3VycmVudE1lc3NhZ2UuaGlkZSgpLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dCA6ICcnfSk7XHJcblxyXG5cdFx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tcmVsZWFzZS1ub3RlcycpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2hvd1Byb1BhZ2UoZXZ0LCBjdHgpIHtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgnb3Blbi1wcm8tcGFnZScpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRjdHguX2hhbmRsZUNvbW1vbkVycm9ycyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dFcnJvcihtZXNzYWdlKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmVycm9yTWVzc2FnZVRpbWVvdXQpO1xyXG5cdFx0XHR0aGlzLmVycm9yTWVzc2FnZSA9IG1lc3NhZ2U7XHJcblx0XHRcdHRoaXMuZXJyb3JNZXNzYWdlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlRXJyb3IoKSwgMjAwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGlkZUVycm9yID0gKCkgPT4ge1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5lcnJvck1lc3NhZ2VUaW1lb3V0KTtcclxuXHRcdFx0dGhpcy5lcnJvck1lc3NhZ2VUaW1lb3V0ID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRoaWRlUXVpY2tUaXBzID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnNob3dRdWlja1RpcHMgPSBmYWxzZTtcclxuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZVsnc2hvd1F1aWNrVGlwcyddID0gJzAnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dCYW5uZXIoYmFubmVyOiBBZmZpbGlhdGVCYW5uZXIpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50QmFubmVyID0gYmFubmVyO1xyXG5cclxuXHRcdFx0aWYgKGJhbm5lcikge1xyXG5cdFx0XHRcdGxldCBzaGVldCA9IDxDU1NTdHlsZVNoZWV0PiB3aW5kb3cuZG9jdW1lbnQuc3R5bGVTaGVldHNbMF07XHJcblx0XHRcdFx0c2hlZXQuaW5zZXJ0UnVsZShgI3Byb21vIC5iYW5uZXI6aG92ZXIgLmRpbSB7IGNvbG9yOiAke2Jhbm5lci5hY2NlbnR9OyB9YCwgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0JC5hZGRDbGFzcygnI3Byb21vJywgJ3Zpc2libGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGhpZGVCYW5uZXIoKSB7XHJcblx0XHRcdCQuaGlkZSgnI3Byb21vJyk7XHJcblx0XHRcdCQuYWRkQ2xhc3MoJyNpbmZvJywgJ2VtcHR5Jyk7XHJcblx0XHRcdC8vdGhpcy5jdXJyZW50QmFubmVyID0gbnVsbDtcclxuXHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ2hpZGUtYmFubmVyJykudGhlbihmaXJzdFRpbWUgPT4ge1xyXG5cdFx0XHRcdGlmICghZmlyc3RUaW1lKSByZXR1cm47XHJcblxyXG5cdFx0XHRcdC8vIHRoaXMuc2hvd01lc3NhZ2UoJ05vdGljZScsICdObyBtb3JlIHJlY29tbWVuZGF0aW9ucyBmb3IgeW91IHRvZGF5ITxiciAvPlNlZSB5b3UgYWdhaW4gdG9tb3Jyb3chIDopJyk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cXVpY2tSZXNpemUoZXZ0LCBjdHgpIHtcclxuXHRcdFx0dGhpcy5fcmVzaXplKHRoaXMucXVpY2spO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlc2l6ZVByZXNldChjdHgpIHtcclxuXHRcdFx0dGhpcy5fcmVzaXplKGN0eC5pdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRvcGVuUHJlc2V0c1NldHRpbmdzKGV2dCwgY3R4KSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tcHJlc2V0cy1zZXR0aW5ncycpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRjdHguX2hhbmRsZUNvbW1vbkVycm9ycyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9wZW5TZXR0aW5ncyhldnQsIGN0eCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdvcGVuLXNldHRpbmdzJykuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGN0eC5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YnVnUmVwb3J0KGV2dCwgY3R4KSB7XHJcblx0XHRcdEV4dEFQSS5pbnZva2UoJ29wZW4tdXJsJywge1xyXG5cdFx0XHRcdHVybDogJ2h0dHBzOi8vd2luZG93cmVzaXplci51c2VyZWNoby5jb20vJ1xyXG5cdFx0XHR9KS5jYXRjaChMT0dfRVJST1IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRvZ2dsZVJlc2l6ZUluZm8oZXZ0LCBjdHgpIHtcclxuXHRcdFx0RXh0QVBJLmludm9rZSgndG9nZ2xlLXRvb2x0aXAnKS5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0Y3R4Ll9oYW5kbGVDb21tb25FcnJvcnMoZXJyb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRvcGVuQXNQb3B1cChldnQsIGN0eCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdvcGVuLWFzLXBvcHVwJykudGhlbihyZXNwb25zZSA9PiB7XHJcblx0XHRcdFx0IWlzU3RhbmRhbG9uZVBvcHVwKCkgJiYgd2luZG93LmNsb3NlKCk7XHJcblx0XHRcdH0pLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRjdHguX2hhbmRsZUNvbW1vbkVycm9ycyhlcnJvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJvdGF0ZVZpZXdwb3J0KCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdyb3RhdGUtdmlld3BvcnQnKS5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0dGhpcy5faGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9nZ2xlU2lkZWJhcihldnQsIGN0eCkge1xyXG5cdFx0XHRjdHguY29sbGFwc2VkU2lkZWJhciA9ICFjdHguY29sbGFwc2VkU2lkZWJhcjtcclxuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZVsnY29sbGFwc2VkLXNpZGViYXInXSA9IGN0eC5jb2xsYXBzZWRTaWRlYmFyID8gMSA6IDA7XHJcblx0XHRcdGN0eC5fZm9jdXNQYW5lbCgwKTtcclxuXHRcdH1cclxuXHJcblx0XHRfcmVzaXplKGNvbmZpZykge1xyXG5cdFx0XHR0aGlzLmhpZGVFcnJvcigpO1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdyZXNpemUnLCBjb25maWcpLmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcilcclxuXHRcdFx0XHR0aGlzLl9oYW5kbGVDb21tb25FcnJvcnMoZXJyb3IpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRfcHJldmVudERlZmF1bHQobWV0aG9kKSB7XHJcblx0XHRcdHJldHVybiAoZXZ0LCBjdHgpID0+IHtcclxuXHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRtZXRob2QuY2FsbCh0aGlzLCBldnQsIGN0eCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRfaGFuZGxlQ29tbW9uRXJyb3JzKGVycm9yKSB7XHJcblx0XHRcdHRoaXMuX2hhbmRsZU9PQkVycm9yKGVycm9yLmVycm9ycyk7XHJcblx0XHRcdHRoaXMuX2hhbmRsZVByb3RvY29sRXJyb3IoZXJyb3IpO1xyXG5cclxuXHRcdFx0aWYgKGVycm9yLkZJTEVfUFJPVE9DT0xfUEVSTUlTU0lPTikge1xyXG5cdFx0XHRcdGxldCB0aXRsZSAgID0gJ0luc3VmZmljaWVudCBwZXJtaXNzaW9ucyc7XHJcblx0XHRcdFx0bGV0IG1lc3NhZ2UgPSAnWW91IG5lZWQgdG8gZXhwbGljaXRseSBhbGxvdyBhY2Nlc3MgdG8gPGVtPmZpbGU6Ly88L2VtPiBVUkxzIG9uIHRoZSBleHRlbnNpb25zIG1hbmFnZW1lbnQgcGFnZS4nO1xyXG5cdFx0XHRcdGxldCBhY3Rpb24gID0ge3RpdGxlOiAnT0snLCBoYW5kbGVyOiAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmRpc21pc3NNZXNzYWdlKCk7XHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5jcmVhdGUoe3VybDogJ2Nocm9tZTovL2V4dGVuc2lvbnMvP2lkPScgKyBjaHJvbWUucnVudGltZS5pZH0pO1xyXG5cdFx0XHRcdH19XHJcblxyXG5cdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSB0aGlzLl9jcmVhdGVNZXNzYWdlKHRpdGxlLCBtZXNzYWdlKTtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlLmFjdGlvbnMucHVzaChhY3Rpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZXJyb3IuV0VCU1RPUkVfUEVSTUlTU0lPTikge1xyXG5cdFx0XHRcdGxldCB0aXRsZSAgID0gJ1Blcm1pc3Npb25zIGVycm9yJztcclxuXHRcdFx0XHRsZXQgbWVzc2FnZSA9ICdUaGUgdG9vbHRpcCBjYW5cXCd0IGJlIGRpc3BsYXllZCBvbiB0aGlzIHRhYiBiZWNhdXNlIGV4dGVuc2lvbnMgYXJlIG5vdCBhbGxvd2VkIHRvIGFsdGVyIHRoZSBjb250ZW50IG9mIHRoZSBDaHJvbWUgV2Vic3RvcmUgcGFnZXMuJztcclxuXHRcdFx0XHRsZXQgYWN0aW9uICA9IHt0aXRsZTogJ09LJywgaGFuZGxlcjogdGhpcy5kaXNtaXNzTWVzc2FnZX07XHJcblxyXG5cdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSB0aGlzLl9jcmVhdGVNZXNzYWdlKHRpdGxlLCBtZXNzYWdlKTtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRNZXNzYWdlLmFjdGlvbnMucHVzaChhY3Rpb24pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0X2hhbmRsZU9PQkVycm9yKGVycm9yKSB7XHJcblx0XHRcdGlmIChlcnJvciAmJiBlcnJvci5PVVRfT0ZfQk9VTkRTKSB7XHJcblx0XHRcdFx0dGhpcy5zaG93RXJyb3IoYENocm9tZSBjb3VsZG4ndCBhcHBseSB0aGUgZXhhY3QgZGVzaXJlZCBkaW1lbnNpb25zIWApO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0Ly8gdmFyIGtleXMgPSBlcnJvci5PVVRfT0ZfQk9VTkRTLmtleXM7XHJcblx0XHRcdFx0Ly8gdmFyIGVycnMgPSBbXTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgKGtleXMuaW5kZXhPZignTUFYX0hFSUdIVCcpID4gLTEpIHtcclxuXHRcdFx0XHQvLyBcdGVycnMucHVzaCgndGhlIHRhcmdldCA8Yj5oZWlnaHQ8L2I+IGlzIGdyZWF0ZXIgdGhhbiB0aGUgbWF4aW11bSBhbGxvd2VkIGJ5IHlvdXIgY3VycmVudCBzY3JlZW4gcmVzb2x1dGlvbicpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0Ly8gaWYgKGtleXMuaW5kZXhPZignTUFYX1dJRFRIJykgPiAtMSkge1xyXG5cdFx0XHRcdC8vIFx0ZXJycy5wdXNoKCd0aGUgdGFyZ2V0IDxiPndpZHRoPC9iPiBpcyBncmVhdGVyIHRoYW4gdGhlIG1heGltdW0gYWxsb3dlZCBieSB5b3VyIGN1cnJlbnQgc2NyZWVuIHJlc29sdXRpb24nKTtcclxuXHRcdFx0XHQvLyB9XHJcblxyXG5cdFx0XHRcdC8vIGlmIChrZXlzLmluZGV4T2YoJ01JTl9IRUlHSFQnKSA+IC0xKSB7XHJcblx0XHRcdFx0Ly8gXHRlcnJzLnB1c2goJ3RoZSB0YXJnZXQgPGI+aGVpZ2h0PC9iPiBpcyBsb3dlciB0aGFuIHRoZSBtaW5pbXVtIGFsbG93ZWQgYnkgeW91ciBicm93c2VyIHdpbmRvdycpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0Ly8gaWYgKGtleXMuaW5kZXhPZignTUlOX1dJRFRIJykgPiAtMSkge1xyXG5cdFx0XHRcdC8vIFx0ZXJycy5wdXNoKCd0aGUgdGFyZ2V0IDxiPndpZHRoPC9iPiBpcyBsb3dlciB0aGFuIHRoZSBtYXhpbXVtIGFsbG93ZWQgYnkgeW91ciBicm93c2VyIHdpbmRvdycpO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0Ly8gdGhpcy5zaG93TWVzc2FnZSgnRVJST1InLCAnPHVsPjxsaT4nICsgZXJycy5qb2luKCc8L2xpPjxsaT4nKSArICc8L2xpPjwvdWw+PGI+SElOVDo8L2I+IEFkanVzdCB0aGUgem9vbSBsZXZlbCB0aGVuIHRyeSBhZ2Fpbi4gKFpvb20gaW4gZm9yIGZld2VyIGFuZCB6b29tIG91dCBmb3IgbW9yZSBDU1MgcGl4ZWxzKScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0X2hhbmRsZVByb3RvY29sRXJyb3IoZXJyb3IpIHtcclxuXHRcdFx0aWYgKGVycm9yLklOVkFMSURfUFJPVE9DT0wpIHtcclxuXHRcdFx0XHR2YXIgZXJyID0gZXJyb3IuSU5WQUxJRF9QUk9UT0NPTDtcclxuXHJcblx0XHRcdFx0aWYgKCFlcnIudGFiLnVybCkge1xyXG5cdFx0XHRcdFx0bGV0IHRpdGxlID0gJ0luc3VmZmljaWVudCBwZXJtaXNzaW9ucyc7XHJcblx0XHRcdFx0XHRsZXQgbWVzc2FnZSA9ICdJbiBvcmRlciBmb3IgdGhlIGV4dGVuc2lvbiB0byB3b3JrIG9uIHJlZ3VsYXIgd2luZG93cyBpbiA8ZW0+ZGV0YWNoZWQ8L2VtPiBtb2RlLCBpdCBuZWVkcyB0byBiZSBhYmxlIHRvIGluamVjdCBjdXN0b20gY29kZSBpbiB0aGUgY29udGV4dCBvZiBhbGwgcGFnZXMsIHdpdGhvdXQgdXNlciBpbnRlcmFjdGlvbi4nO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UgPSB0aGlzLl9jcmVhdGVNZXNzYWdlKHRpdGxlLCBtZXNzYWdlKTtcclxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1lc3NhZ2UuYWN0aW9ucy5wdXNoKHt0aXRsZTogJ0NhbmNlbCcsIGhhbmRsZXI6IHRoaXMuZGlzbWlzc01lc3NhZ2V9KVxyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50TWVzc2FnZS5hY3Rpb25zLnB1c2goe3RpdGxlOiAnR3JhbnQgcGVybWlzc2lvbnMnLCBtYWluOiB0cnVlLCBoYW5kbGVyOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGlzbWlzc01lc3NhZ2UoKTtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnBlcm1pc3Npb25zLnJlcXVlc3Qoe3Blcm1pc3Npb25zOiBbJ3RhYnMnXSwgb3JpZ2luczogWyc8YWxsX3VybHM+J119LCBncmFudGVkID0+IHt9KTtcclxuXHRcdFx0XHRcdH19KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlKFxyXG5cdFx0XHRcdFx0XHQnSW52YWxpZCBwcm90b2NvbDogPGI+JyArIFN0cmluZyhlcnIucHJvdG9jb2wpICsgJzovLzwvYj4nLFxyXG5cdFx0XHRcdFx0XHQnVGhpcyBmZWF0dXJlIG9ubHkgd29ya3Mgb24gcGFnZXMgbG9hZGVkIHVzaW5nIG9uZSBvZiB0aGUgZm9sbG93aW5nIHByb3RvY29sczogPGJyIC8+PGI+aHR0cDovLzwvYj4sIDxiPmh0dHBzOi8vPC9iPiBvciA8Yj5maWxlOi8vPC9iPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0X3Nob3dLZXlzKCkge1xyXG5cdFx0XHR0aGlzLnNob3dLZXlzID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdF9oaWRlS2V5cygpIHtcclxuXHRcdFx0dGhpcy5zaG93S2V5cyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9pbml0UGFuZWxzKCkge1xyXG5cdFx0XHR0aGlzLl9wYW5lbHMucHVzaChuZXcgTGlzdFBhbmVsKCcjcHJlc2V0c1BhbmVsJywgJ3dyLXByZXNldCcpKTtcclxuXHRcdFx0dGhpcy5fcGFuZWxzLnB1c2gobmV3IExpc3RQYW5lbCgnI3Rvb2xzUGFuZWwnLCAnYnV0dG9uJykpO1xyXG5cclxuXHRcdFx0dGhpcy5fcGFuZWwgPSB0aGlzLl9wYW5lbHNbMF07XHJcblx0XHR9XHJcblxyXG5cdFx0X2ZvY3VzUGFuZWwoaWR4OiBudW1iZXIpIHtcclxuXHRcdFx0aWYgKGlkeCA9PT0gMSAmJiB0aGlzLmNvbGxhcHNlZFNpZGViYXIpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwYW5lbCA9IHRoaXMuX3BhbmVsc1tpZHhdO1xyXG5cclxuXHRcdFx0aWYgKHBhbmVsICE9IHRoaXMuX3BhbmVsKSB7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwgJiYgdGhpcy5fcGFuZWwuYmx1cigpO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9wYW5lbCA9IHBhbmVsO1xyXG5cdFx0XHRcdHRoaXMuX3BhbmVsLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRoYW5kbGVCYW5uZXJDbGljayhldnQsIGN0eCkge1xyXG5cdFx0XHRjb25zdCB0YXJnZXQgPSBldnQuY3VycmVudFRhcmdldDtcclxuXHRcdFx0Y29uc3QgdXJsID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcclxuXHRcdFx0Y29uc3QgYWN0aW9uID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKTtcclxuXHJcblx0XHRcdGlmICh1cmwpIHtcclxuXHRcdFx0XHRFeHRBUEkuaW52b2tlKCdvcGVuLXVybCcsIHt1cmx9KS5jYXRjaChMT0dfRVJST1IpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGN0eFthY3Rpb25dKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRoYW5kbGVQcmVzZXRDbGljayhldnQsIGN0eCkge1xyXG5cdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDApO1xyXG5cdFx0XHQvL3RoaXMuX3BhbmVsLnJlc2V0KCk7XHJcblx0XHRcdHRoaXMuX3BhbmVsLnNlbGVjdEl0ZW0oZXZ0LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuXHRcdFx0dGhpcy5yZXNpemVQcmVzZXQoY3R4KTtcclxuXHJcblx0XHRcdHRoaXMuYXV0b0Nsb3NlUG9wdXAgJiYgIWlzU3RhbmRhbG9uZVBvcHVwKCkgJiYgd2luZG93LmNsb3NlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aGFuZGxlVG9vbHNDbGljayhldnQsIGN0eCkge1xyXG5cdFx0XHRpZiAoZXZ0LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcblx0XHRcdFx0dGhpcy5fZm9jdXNQYW5lbCgxKTtcclxuXHRcdFx0XHR0aGlzLl9wYW5lbC5zZWxlY3RJdGVtKGV2dC50YXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aGFuZGxlS2V5RG93bihldnQsIGN0eCkge1xyXG5cdFx0XHRsZXQga2V5Q29kZSA9IGV2dC5rZXlDb2RlO1xyXG5cdFx0XHRsZXQgaGFuZGxlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGtleUNvZGUpIHtcclxuXHRcdFx0XHRjYXNlIEtleXMuU0hJRlQ6XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuc2hvd0tleXMpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zaG93S2V5cyA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgS2V5cy5TUEFDRTpcclxuXHRcdFx0XHRjYXNlIEtleXMuRU5URVI6XHJcblx0XHRcdFx0XHQkLmFkZENsYXNzKHRoaXMuX3BhbmVsLmN1cnJlbnROb2RlKCksICdhY3RpdmUnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBLZXlzLlVQOlxyXG5cdFx0XHRcdFx0dGhpcy5fcGFuZWwucHJldigpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlIEtleXMuRE9XTjpcclxuXHRcdFx0XHRcdHRoaXMuX3BhbmVsLm5leHQoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBLZXlzLlJJR0hUOlxyXG5cdFx0XHRcdFx0dGhpcy5fZm9jdXNQYW5lbCgxKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSBLZXlzLkxFRlQ6XHJcblx0XHRcdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDApO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aGFuZGxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbm9kZSA9IF9nZXRQcmVzZXRCeUtleUNvZGUoa2V5Q29kZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dGhpcy5fcGFuZWwuZm9jdXMoKTtcclxuXHRcdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDApO1xyXG5cdFx0XHRcdHRoaXMuX3BhbmVsLnNlbGVjdEl0ZW0obm9kZSk7XHJcblxyXG5cdFx0XHRcdCQuYWRkQ2xhc3Mobm9kZSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWhhbmRsZWQpIHtcclxuXHRcdFx0XHRsZXQgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Q29kZSk7XHJcblx0XHRcdFx0bGV0IG5vZGUgPSAkLnEoYFtkYXRhLWtleT1cIiR7Y2hhcn1cIl1gKTtcclxuXHJcblx0XHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3BhbmVsLmZvY3VzKCk7XHJcblx0XHRcdFx0XHR0aGlzLl9mb2N1c1BhbmVsKDEpO1xyXG5cdFx0XHRcdFx0dGhpcy5fcGFuZWwuc2VsZWN0SXRlbShub2RlKTtcclxuXHJcblx0XHRcdFx0XHQkLmFkZENsYXNzKG5vZGUsICdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGlmIChoYW5kbGVkKSB7XHJcblx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRoYW5kbGVLZXlVcChldnQsIGN0eCkge1xyXG5cdFx0XHRsZXQga2V5Q29kZSA9IGV2dC5rZXlDb2RlO1xyXG5cdFx0XHRsZXQgaGFuZGxlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKGtleUNvZGUpIHtcclxuXHRcdFx0XHRjYXNlIEtleXMuU0hJRlQ6XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zaG93S2V5cykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNob3dLZXlzID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgS2V5cy5TUEFDRTpcclxuXHRcdFx0XHRjYXNlIEtleXMuRU5URVI6XHJcblx0XHRcdFx0XHQkLnJlbW92ZUNsYXNzKHRoaXMuX3BhbmVsLmN1cnJlbnROb2RlKCksICdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQudHJpZ2dlcignY2xpY2snLCB0aGlzLl9wYW5lbC5jdXJyZW50Tm9kZSgpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGhhbmRsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5vZGUgPSBfZ2V0UHJlc2V0QnlLZXlDb2RlKGtleUNvZGUpO1xyXG5cdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdCQucmVtb3ZlQ2xhc3Mobm9kZSwgJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdCQudHJpZ2dlcignY2xpY2snLCBub2RlKTtcclxuXHRcdFx0XHRoYW5kbGVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFoYW5kbGVkKSB7XHJcblx0XHRcdFx0bGV0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleUNvZGUpO1xyXG5cdFx0XHRcdGxldCBub2RlID0gJC5xKGBbZGF0YS1rZXk9XCIke2NoYXJ9XCJdYCk7XHJcblxyXG5cdFx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0XHQkLnJlbW92ZUNsYXNzKG5vZGUsICdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQudHJpZ2dlcignY2xpY2snLCBub2RlKTtcclxuXHRcdFx0XHRcdGhhbmRsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhhbmRsZWQpIHtcclxuXHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGluaXROYXZpZ2F0aW9uKCkge1xyXG5cdFx0XHRsZXQgbWFpbiA9ICQucSgnI21haW4nKTtcclxuXHJcblx0XHRcdCQub24oJ2tleWRvd24nLCBtYWluLCB0aGlzLmhhbmRsZUtleURvd24sIHRydWUpO1xyXG5cdFx0XHQkLm9uKCdrZXl1cCcsIG1haW4sIHRoaXMuaGFuZGxlS2V5VXAsIHRydWUpO1xyXG5cclxuXHRcdFx0bGV0IGggPSBuZXcgRm9jdXNIYW5kbGVyKG1haW4pO1xyXG5cclxuXHRcdFx0bWFpbi5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xhc3MgRm9jdXNIYW5kbGVyIHtcclxuXHRcdHByb3RlY3RlZCBpZ25vcmUgPSBmYWxzZTtcclxuXHRcdHByb3RlY3RlZCBmb2N1c2VkID0gZmFsc2U7XHJcblx0XHRwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHR0aGlzLl9faW5pdEhhbmRsZXJzKCk7XHJcblxyXG5cdFx0XHQkLm9uKCdmb2N1cycsIHRoaXMudGFyZ2V0LCB0aGlzLm9uRm9jdXMsIHRydWUpO1xyXG5cdFx0XHQkLm9uKCdibHVyJywgdGhpcy50YXJnZXQsIHRoaXMub25CbHVyLCB0cnVlKTtcclxuXHRcdFx0JC5vbignbW91c2Vkb3duJywgdGhpcy50YXJnZXQsIHRoaXMub25Nb3VzZURvd24sIHRydWUpO1xyXG5cdFx0XHQkLm9uKCdrZXlkb3duJywgZG9jdW1lbnQsIHRoaXMub25LZXlEb3duLCB0cnVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRfX2luaXRIYW5kbGVycygpIHtcclxuXHRcdFx0dmFyIGhhbmRsZXJzID0gWydvbkZvY3VzJywgJ29uQmx1cicsICdvbktleURvd24nLCAnb25Nb3VzZURvd24nXTtcclxuXHJcblx0XHRcdGZvciAodmFyIG1ldGhvZCBvZiBoYW5kbGVycykge1xyXG5cdFx0XHRcdHRoaXNbbWV0aG9kXSA9IF9fZXZlbnRIYW5kbGVyKHRoaXMsIHRoaXNbbWV0aG9kXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIF9fZXZlbnRIYW5kbGVyKGNvbnRleHQsIG1ldGhvZCkge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0XHRcdHJldHVybiBtZXRob2QuY2FsbChjb250ZXh0LCBldnQsIHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9uQmx1cihldnQpIHtcclxuXHRcdFx0aWYgKCF0aGlzLnRhcmdldC5jb250YWlucyhldnQucmVsYXRlZFRhcmdldCkpIHtcclxuXHRcdFx0XHQkLnJlbW92ZUNsYXNzKHRoaXMudGFyZ2V0LCAnZm9jdXNlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmZvY3VzZWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkZvY3VzKGV2dCkge1xyXG5cdFx0XHRpZiAoIXRoaXMuaWdub3JlKSB7XHJcblx0XHRcdFx0JC5hZGRDbGFzcyh0aGlzLnRhcmdldCwgJ2ZvY3VzZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5mb2N1c2VkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRvbktleURvd24oZXZ0KSB7XHJcblx0XHRcdHRoaXMuaWdub3JlID0gZmFsc2U7XHJcblx0XHRcdGlmICh0aGlzLmZvY3VzZWQpIHtcclxuXHRcdFx0XHQkLmFkZENsYXNzKHRoaXMudGFyZ2V0LCAnZm9jdXNlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Nb3VzZURvd24oZXZ0KSB7XHJcblx0XHRcdCQucmVtb3ZlQ2xhc3ModGhpcy50YXJnZXQsICdmb2N1c2VkJyk7XHJcblx0XHRcdHRoaXMuaWdub3JlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZnVuY3Rpb24gX3N0ZWFsRm9jdXMoZXZ0LCBjdHgpIHtcclxuXHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBfZ2V0UHJlc2V0QnlLZXlDb2RlKGtleUNvZGU6IG51bWJlcik6IEhUTUxFbGVtZW50IHtcclxuXHRcdHZhciBub2RlOiBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRpZiAoKGtleUNvZGUgPj0gS2V5cy5ESUdJVFNbMF0gJiYga2V5Q29kZSA8PSBLZXlzLkRJR0lUU1sxXSlcclxuXHRcdHx8IChrZXlDb2RlID49IEtleXMuTlVNUEFEWzBdICYmIGtleUNvZGUgPD0gS2V5cy5OVU1QQURbMV0pKSB7XHJcblx0XHRcdGxldCBpZHggID0gKGtleUNvZGUgJSA0OCkgfHwgMTA7XHJcblx0XHRcdG5vZGUgPSAkLnEoYHdyLXByZXNldDpudGgtb2YtdHlwZSgke2lkeH0pYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5vZGU7XHJcblx0fVxyXG5cclxuXHRjbGFzcyBMaXN0UGFuZWwge1xyXG5cdFx0cGFyZW50OiBFbGVtZW50ID0gbnVsbDtcclxuXHRcdGxpc3Q6IHN0cmluZyA9IG51bGw7XHJcblx0XHRjdXJyZW50OiBudW1iZXIgPSAtMTtcclxuXHJcblx0XHRhdXRvSW5pdDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdFx0X3NlbGVjdGVkOiBzdHJpbmcgPSAnc2VsZWN0ZWQnO1xyXG5cdFx0X2ZvY3VzZWQ6IHN0cmluZyA9ICdmb2N1c2VkJztcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihwYXJlbnQ6IHN0cmluZywgbGlzdDogc3RyaW5nKSB7XHJcblx0XHRcdHRoaXMucGFyZW50ID0gPEVsZW1lbnQ+ICQucShwYXJlbnQpO1xyXG5cdFx0XHR0aGlzLmxpc3QgPSBsaXN0O1xyXG5cdFx0fVxyXG5cclxuXHRcdG5leHQoKSB7XHJcblx0XHRcdGxldCBub2RlcyA9ICQucUFsbCh0aGlzLmxpc3QsIHRoaXMucGFyZW50KTtcclxuXHRcdFx0bGV0IG5leHQgPSAodGhpcy5jdXJyZW50ICsgMSkgJSBub2Rlcy5sZW5ndGg7XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdChuZXh0LCBub2Rlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJldigpIHtcclxuXHRcdFx0bGV0IG5vZGVzID0gJC5xQWxsKHRoaXMubGlzdCwgdGhpcy5wYXJlbnQpO1xyXG5cdFx0XHRsZXQgcHJldiA9IChub2Rlcy5sZW5ndGggKyB0aGlzLmN1cnJlbnQgLSAxKSAlIG5vZGVzLmxlbmd0aDtcclxuXHJcblx0XHRcdHRoaXMuc2VsZWN0KHByZXYsIG5vZGVzKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxlY3QobmV4dCwgbm9kZXMsIG5vRm9jdXM/KSB7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gbm9kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IG5vZGUgPSA8RWxlbWVudD4gbm9kZXNbaV07XHJcblx0XHRcdFx0bm9kZS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NlbGVjdGVkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5vZGUgPSA8SFRNTEVsZW1lbnQ+IG5vZGVzW25leHRdO1xyXG5cdFx0XHR0aGlzLl9zZWxlY3ROb2RlKG5vZGUpO1xyXG5cclxuXHRcdFx0dGhpcy5jdXJyZW50ID0gbmV4dDtcclxuXHJcblx0XHRcdGlmICghbm9Gb2N1cykge1xyXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvY3VzKCkge1xyXG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5hdXRvSW5pdCAmJiB0aGlzLmN1cnJlbnQgPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5uZXh0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3NlbGVjdE5vZGUodGhpcy5jdXJyZW50Tm9kZSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRibHVyKCkge1xyXG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVzZXQoKSB7XHJcblx0XHRcdGxldCBub2RlcyA9ICQucUFsbCh0aGlzLmxpc3QsIHRoaXMucGFyZW50KTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gbm9kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IG5vZGUgPSBub2Rlc1tpXTtcclxuXHRcdFx0XHRub2RlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2VsZWN0ZWQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmN1cnJlbnQgPSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRzZWxlY3RJdGVtKGl0ZW06IE5vZGUpIHtcclxuXHRcdFx0bGV0IG5vZGVzID0gJC5xQWxsKHRoaXMubGlzdCwgdGhpcy5wYXJlbnQpO1xyXG5cdFx0XHRsZXQgZm91bmQgPSAtMTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwLCBsID0gbm9kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT0gbm9kZXNbaV0pIHtcclxuXHRcdFx0XHRcdGZvdW5kID0gaTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmb3VuZCA+IC0xICYmIGZvdW5kICE9IHRoaXMuY3VycmVudCkge1xyXG5cdFx0XHRcdGxldCBub2RlID0gPEhUTUxFbGVtZW50PiBub2Rlc1tmb3VuZF07XHJcblx0XHRcdFx0dGhpcy5yZXNldCgpO1xyXG5cdFx0XHRcdHRoaXMuX3NlbGVjdE5vZGUobm9kZSk7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50ID0gZm91bmQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjdXJyZW50Tm9kZSgpIHtcclxuXHRcdFx0bGV0IG5vZGVzID0gJC5xQWxsKHRoaXMubGlzdCwgdGhpcy5wYXJlbnQpO1xyXG5cdFx0XHRyZXR1cm4gPEhUTUxFbGVtZW50PiBub2Rlc1t0aGlzLmN1cnJlbnRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9zZWxlY3ROb2RlKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZCh0aGlzLl9zZWxlY3RlZCk7XHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XHJcblx0XHRcdG5vZGUuZm9jdXMoKTtcclxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHBvcnQgdmFyIHZpZXcgPSBuZXcgUG9wdXAoKTtcclxuXHR2YXIgYmluZGluZyA9IHJpdmV0cy5iaW5kKGRvY3VtZW50LmJvZHksIHZpZXcpO1xyXG5cdHZpZXcuaW5pdE5hdmlnYXRpb24oKTtcclxuXHJcblx0Y2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1zZyA9PiB7XHJcblx0XHRpZiAobXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cclxuXHRcdFx0aWYgKCdsaWNlbnNlJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5jdXJyZW50QmFubmVyID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdwcmVzZXRzSWNvbnNTdHlsZScgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcucHJlc2V0c0ljb25zU3R5bGUgPSBtc2cuVXBkYXRlZFNldHRpbmdzLnByZXNldHNJY29uc1N0eWxlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ3ByZXNldHNQcmltYXJ5TGluZScgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcucHJlc2V0c1ByaW1hcnlMaW5lID0gbXNnLlVwZGF0ZWRTZXR0aW5ncy5wcmVzZXRzUHJpbWFyeUxpbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgnYWx0ZXJuYXRlUHJlc2V0c0JnJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5hbHRlcm5hdGVQcmVzZXRzQmcgPSBtc2cuVXBkYXRlZFNldHRpbmdzLmFsdGVybmF0ZVByZXNldHNCZztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdhdXRvQ2xvc2VQb3B1cCcgaW4gbXNnLlVwZGF0ZWRTZXR0aW5ncykge1xyXG5cdFx0XHRcdHZpZXcuYXV0b0Nsb3NlUG9wdXAgPSBtc2cuVXBkYXRlZFNldHRpbmdzLmF1dG9DbG9zZVBvcHVwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ2hpZGVQcmVzZXRzRGVzY3JpcHRpb24nIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LmhpZGVQcmVzZXRzRGVzY3JpcHRpb24gPSBtc2cuVXBkYXRlZFNldHRpbmdzLmhpZGVQcmVzZXRzRGVzY3JpcHRpb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgnaGlkZVBvcHVwVG9vbHRpcHMnIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LmhpZGVQb3B1cFRvb2x0aXBzID0gbXNnLlVwZGF0ZWRTZXR0aW5ncy5oaWRlUG9wdXBUb29sdGlwcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdoaWRlUXVpY2tSZXNpemUnIGluIG1zZy5VcGRhdGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0XHR2aWV3LmhpZGVRdWlja1Jlc2l6ZSA9IG1zZy5VcGRhdGVkU2V0dGluZ3MuaGlkZVF1aWNrUmVzaXplO1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2VbJ2hpZGVRdWlja1Jlc2l6ZSddID0gbXNnLlVwZGF0ZWRTZXR0aW5ncy5oaWRlUXVpY2tSZXNpemUgPyAxIDogMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCdwcmVzZXRzJyBpbiBtc2cuVXBkYXRlZFNldHRpbmdzKSB7XHJcblx0XHRcdFx0dmlldy5wcmVzZXRzID0gW107XHJcblx0XHRcdFx0Zm9yIChsZXQgcHJlc2V0RGF0YSBvZiBtc2cuVXBkYXRlZFNldHRpbmdzLnByZXNldHMpIHtcclxuXHRcdFx0XHRcdHZpZXcucHJlc2V0cy5wdXNoKG5ldyBDb3JlLlByZXNldChwcmVzZXREYXRhKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxuXHJcblxyXG5cdGZ1bmN0aW9uIExPR19FUlJPUihlcnI6IGFueSkge1xyXG5cdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlzU3RhbmRhbG9uZVBvcHVwKCkge1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoJ3BvcHVwLXZpZXcnKSA+IC0xO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gX2NvbnN0cmFpbldpbmRvd1NpemUoKSB7XHJcblx0XHR2YXIgbGltaXQ6IGFueSA9IHt9O1xyXG5cclxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDM0MCkge1xyXG5cdFx0XHRsaW1pdC53aWR0aCA9IDM0MCArIHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvdy5pbm5lckhlaWdodCA8IDQwMCkge1xyXG5cdFx0XHRsaW1pdC5oZWlnaHQgPSA0MDAgKyB3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGxpbWl0LndpZHRoIHx8IGxpbWl0LmhlaWdodCkge1xyXG5cdFx0XHRFeHRBUEkuaW52b2tlKCdsaW1pdC1wb3B1cCcsIGxpbWl0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChpc1N0YW5kYWxvbmVQb3B1cCgpKSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX2NvbnN0cmFpbldpbmRvd1NpemUpO1xyXG5cdH1cclxufVxyXG4iXX0=
