var emojiInited = false;
var step = 0;
var page = 1;
var srcTitle = window.parent.document.title;
var im = {
    init: function (appKey, userId, password) {
        $.core.showProgress();
        this.initNode();
        this.cache = new Cache();
        this.mysdk = new SDKBridge(this, this.cache, appKey, userId, password);
        this.buildContacts();
        myTeam.init(this.cache, this.mysdk);
        this.addEvent();
        notification.init(this.cache, this.mysdk);
        $.core.hidenProgress();
    },
    initNode: function () {
        this.$userName = $("#j-userName");
        this.$userPic = $("#j-userPic");

        this.$conversations = $('#j-conversations');
        this.$loadConversations = $('#j-loadConversations');
        this.$loadContacts = $('#j-loadContacts');
        this.$loadTeams = $('#j-loadTeams');
        this.$chatContent = $('#j-chatContent');
        this.$sendBtn = $("#sendMessage");

        this.$contacts = $('#j-contacts');


        this.$teamInfoContainer = $('#teamInfo');
        this.$cloudMsgContainer = $('#cloudMsg');
        this.$rightPanel = $("#rightContent");

        this.$nickName = $("#j-nickName");
        this.$headImg = $("#headImg");
        this.$teamInfoBtn = $("#btn-teamInfo");
        this.$cloudMsgBtn = $('#btn-cloudMsg');
        this.$messageText = $('#txtMessage');
        this.$chatEditor = $("#sendMsgContent");

        this.$showEmoji = $("#sendEmoji");

        //个人信息
        this.$myInfo = $("#myInfo");
        //修改头像
        this.$modifyAvatar = $("#modifyAvatar");
        //用户信息
        this.$personCard = $('#personCard');

        this.$chooseFileBtn = $("#chooseFile");
        this.$fileInput = $('#uploadFiles');

        this.$mask = $('#j-mask');

        this.$shareList = $("#shareList");
        this.$shareContent = $("#shareContent");
        this.$sendShareMsg = $("#sendShare");
        this.$cancelShareMsg = $("#cancelShare");

        //系统消息
        this.$notice = $('#sysNoticePanel');
    },
    initUI: function () {
        this.buildConversations();
    },
    addEvent: function () {
        this.$cloudMsgBtn.on('click', this.showCloudMsg.bind(this, this.$cloudMsgBtn));
        $("#cloudMsg").delegate('.j-backBtn', 'click', this.closeCloudMsgContainer.bind(this));
        $("#cloudMsg").delegate('.j-loadMore', 'click', this.loadMoreCloudMsg.bind(this));
        this.$sendBtn.on("click", this.sendTextMessage.bind(this));
        this.$messageText.on('keydown', this.inputMessage);

        //$("#showMyInfo").on('click',this.showMyInfo.bind(this));
        this.$showEmoji.on('click', this.showEmoji.bind(this));
        this.$chooseFileBtn.on('click', this.chooseFile.bind(this));
        this.$fileInput.on('change', this.sendFile.bind(this));

        this.$personCard.delegate(".j-close", "click", this.hideInfoBox.bind(this));
        $("#headImg").on('click', this.showInfo2.bind(this));

        this.$shareList.delegate(".j-close", "click", this.hideSendMessage.bind(this));
        this.$sendShareMsg.on("click", this.sendShareMessage.bind(this));
        this.$cancelShareMsg.on("click", this.cancelShareMessage.bind(this));

        this.$cloudMsgContainer.delegate('.j-mbox', 'click', this.playAudio);
        this.$chatContent.delegate('.j-mbox', 'click', this.playAudio);

        this.$cloudMsgContainer.delegate('.convert', 'click', this.convertAudio);
        this.$chatContent.delegate('.convert', 'click', this.convertAudio);

        this.$cloudMsgContainer.delegate('.location', 'click', this.showLocation);
        this.$chatContent.delegate('.location', 'click', this.showLocation);

        $("#systemNotice").on('click', this.showSystemNotice.bind(this));

/*        $("#sysNoticeContent").scroll(function () {
            var thisHeight = $(this).height();
            var scrollHeight = $(this)[0].scrollHeight;
            var scrollTop = $(this)[0].scrollTop;
            if (scrollTop + thisHeight + 50 >= scrollHeight) {
                //重新加载数据
            }
        });*/

    },
    initEmoji: function () {
        if (!emojiInited) {
            var that = this,
                emojiConfig = {
                    'emojiList': emojiList,  //普通表情
                    'pinupList': pinupList,  //贴图
                    'width': 500,
                    'height': 300,
                    'imgpath': '/view/static/comp/im/images/',
                    'callback': function (result) {
                        that.cbShowEmoji(result);
                    }
                };
            emojiInited = true;
            this.$emNode = new CEmojiEngine($('#emojiTag')[0], emojiConfig);
        }
    },
    selectTabs: function (e) {
        if ($(e.item).attr("id") == "teams" || $(e.item).attr("id") == "teamInfos") {
            this.buildTeams();
        }
    },
    showMe: function () {
        var user = this.cache.getUserById(this.userUID);
        this.$userName.text(user.nick);
    },
    initInfo: function (obj, team) {
        this.lockPerson = true;
        this.lockTeam = true;
        var array = Object.keys(obj),
            teamArray = [];
        for (var i = team.length - 1; i >= 0; i--) {
            if (!this.cache.hasTeam(team[i])) {
                teamArray.push(team[i]);
            }
        }
        if (teamArray.length > 0) {
            this.mysdk.getLocalTeams(teamArray, this.cbInitLocakTeamInfo.bind(this));
        } else {
            this.lockTeam = false;
        }
        this.mysdk.getUsers(array, this.cbInitInfo.bind(this));
    },
    buildContacts: function () {
        this.cache.setFriends(emps);
        this.cache.setPersonlist(emps);
        var data = {
            friends: emps,
            account: userUID
        };
        if (!this.friend) {
            var options = {
                data: data,
                onclickavatar: this.showInfo.bind(this),
                onclickitem: this.openChatBox.bind(this),
                infoprovider: this.infoProvider.bind(this)
            };
            this.friends = new NIMUIKit.FriendList(options);
            this.friends.inject(this.$contacts.get(0));
            var shareOptions = {
                data: data,
                onclickavatar: this.showSendMessage.bind(this),
                onclickitem: this.showSendMessage.bind(this),
                infoprovider: this.infoProvider.bind(this)
            };
            this.shareEmps = new NIMUIKit.FriendList(shareOptions);
            this.shareEmps.inject($("#empInfos").get(0));
        } else {
            this.friends.update(data);
            this.shareEmps.update(data);
        }
    },
    //获取好友备注名或者昵称
    getNick: function (account) {
        // 使用util中的工具方法
        return getNick(account, this.cache);
    },
    cbInitInfo: function (error, data) {
        if (!error) {
            this.cache.setPersonlist(data);
            this.lockPerson = false;
            if (this.lockTeam === false) {
                this.initUI();
            }
        } else {
            $.core.showErrorMsg("获取用户信息失败", "系统提示");
        }

    },
    cbInitLocakTeamInfo: function (err, data) {
        if (!err) {
            this.cache.addTeamMap(data.teams);
            this.lockTeam = false;
            if (this.lockPerson === false) {
                this.initUI();
            }
        } else {
            $.core.showErrorMsg("获取本地群组失败", "系统提示");
        }
    },
    buildConversations: function () {
        var data = {
            sessions: this.cache.getSessions()
        };
        if (!this.sessions) {
            var options = {
                data: data,
                onclickavatar: this.showInfo.bind(this),
                onclickitem: this.openChatBox.bind(this),
                infoprovider: this.infoProvider.bind(this),
            };
            this.sessions = new NIMUIKit.SessionList(options);
            this.sessions.inject(this.$conversations.get(0));
        } else {
            this.sessions.update(data);
        }
    },
    buildTeams: function () {
        var data = {
            teams: this.cache.getTeamlist()
        };
        if (!this.teams) {
            var options = {
                data: data,
                infoprovider: this.infoProvider.bind(this),
                onclickavatar: this.clickTeamAvatar.bind(this),
                onclickitem: this.openChatBox.bind(this)

            };
            this.teams = new NIMUIKit.TeamList(options);
            this.teams.inject($('#j-teams').get(0));

            var shareOptions = {
                data: data,
                infoprovider: this.infoProvider.bind(this),
                onclickavatar: this.showSendMessage.bind(this),
                onclickitem: this.showSendMessage.bind(this)
            };
            this.shareTeams = new NIMUIKit.TeamList(shareOptions);
            this.shareTeams.inject($('#teamInfos').get(0));
        } else {
            this.teams.update(data);
            this.shareTeams.update(data);
        }
    },
    /**
     * 点击群组列表头像
     * demo里跟点击列表处理一致了
     */
    clickTeamAvatar: function (account, type) {
        $("#j-teams").find("li.active").removeClass("active");
        this.openChatBox(account, type)
    },
    showSendMessage: function (account, scene) {
        this.openChatBox(account, scene);
        this.$shareList.addClass("hide");
        $("#shareMessage").removeClass("hide");
        this.$shareContent.data({
            to: account,
            scene: scene,
            type:$("#msgType").val(),
            relTypeName:$("#relTypeName").val(),
            relType:$("#relType").val(),
            relNo:$("#relNo").val()
        });
    },
    hideSendMessage:function(){
        this.$shareList.addClass("hide");
        this.$mask.addClass("hide");
    },
    sendShareMessage: function () {
        var scene = this.$shareContent.data('scene');
        var account = this.$shareContent.data('to');
        var relTypeName = this.$shareContent.data('relTypeName');
        var relType = this.$shareContent.data('relType');
        var relNo = this.$shareContent.data('relNo');
        var type = this.$shareContent.data('type');
        var msg = {"relTypeName":relTypeName,"relType": relType, "relNo": relNo, "type": kendo.parseInt(type)}
        this.mysdk.sendCustomMessage(scene, account, msg, this.sendMsgDone.bind(this));
        $("#shareMessage").addClass("hide");
        this.$mask.addClass("hide");
    },
    cancelShareMessage:function(){
        $("#shareMessage").addClass("hide");
        this.$shareList.removeClass("hide");
    },
    openChatBox: function (account, scene) {
        var info;
        this.mysdk.setCurrSession(scene, account);
        this.crtSession = scene + "-" + account;
        //根据帐号跟消息类型获取消息数据
        if (scene == "p2p") {
            info = this.cache.getUserById(account);
        } else {
            info = this.cache.getTeamById(account);
        }
        //隐藏其他窗口
        this.$teamInfoContainer.addClass('hide');
        this.$cloudMsgContainer.addClass('hide');
        //退群的特殊UI
        this.$rightPanel.find(".u-chat-notice").addClass("hide");
        this.$rightPanel.find(".chat-mask").addClass("hide");
        this.$notice.addClass("hide");

        //设置聊天面板
        if (scene === 'p2p') {
            if (info.account == userUID) {
                this.$nickName.text("我的手机");
                this.$headImg.attr('src', ctx + "/view/static/comp/im/images/myPhone.png");
            } else {
                this.$nickName.text(this.getNick(account));
                this.$headImg.attr('src', getAvatar(info.avatar,info.gender));
            }
        } else {
            if (info) {
                this.$headImg.attr('src', ctx + "/view/static/comp/im/images/" + info.type + ".png");
                this.$nickName.text(info.name);
            } else {
                this.$rightPanel.find(".u-chat-notice").removeClass("hide");
                this.$rightPanel.find(".chat-mask").removeClass("hide");
                this.$headImg.attr('src', ctx + "/view/static/comp/im/images/normal.png");
                this.$nickName.text(account);
            }
        }
        //显示面板
        this.$rightPanel.removeClass('hide');
        this.$messageText.val('');

        //群信息
        if (scene === 'p2p') {
            this.$teamInfoBtn.addClass('hide').data({
                teamId: '',
                gtype: ''
            });
        } else {
            this.$teamInfoBtn.removeClass('hide').data({
                teamId: account,
                gtype: info ? info.type : "normal"
            });
        }
        //会话信息
        this.$chatEditor.data({
            to: account,
            type: scene
        });
        // 根据或取聊天记录
        this.getHistoryMsgs(scene, account);
    },
    infoProvider: function (data, type) {
        var info = {};
        switch (type) {
            case "session":
                var msg = data.lastMsg,
                    scene = msg.scene;
                info.scene = msg.scene;
                info.account = msg.target;
                info.target = msg.scene + "-" + msg.target;
                info.time = transTime2(msg.time);
                info.crtSession = this.crtSession;
                info.unread = data.unread > 99 ? "99+" : data.unread;
                info.text = buildSessionMsg(msg);
                if (scene === "p2p") {
                    //点对点
                    if (msg.target === userUID) {
                        info.nick = "我的手机";
                        info.avatar = ctx + "/view/static/comp/im/images/myPhone.png";
                    } else {
                        var userInfo = this.cache.getUserById(msg.target);
                        info.nick = this.getNick(msg.target);
                        info.avatar = getAvatar(userInfo.avatar,userInfo.gender);
                    }

                } else {
                    //群组
                    var teamInfo = this.cache.getTeamById(msg.target);
                    if (teamInfo) {
                        info.nick = teamInfo.name;
                        info.avatar = ctx + "/view/static/comp/im/images/" + teamInfo.type + ".png";
                    } else {
                        info.nick = msg.target;
                        info.avatar = ctx + "/view/static/comp/im/images/normal.png";
                    }
                }
                break;
            case "friend":
                info.target = "p2p-" + data.account;
                info.account = data.account;
                info.nick = this.getNick(info.account);
                info.avatar = getAvatar(data.avatar,data.gender);
                var custom = JSON.parse(data.custom);
                if(custom) {
                    info.dept = custom.department;
                }
                info.crtSession = this.crtSession;
                break;
            case "team":
                info.type = data.type;
                info.nick = data.name;
                info.target = "team-" + data.teamId;
                info.teamId = data.teamId;
                info.avatar = info.type === "normal" ? ctx + "/view/static/comp/im/images/normal.png" : ctx + "/view/static/comp/im/images/advanced.png";
                info.crtSession = this.crtSession;
                break;
        }

        return info;
    },
    /**
     * 获取当前会话消息
     * @return {void}
     */
    getHistoryMsgs: function (scene, account) {
        var id = scene + "-" + account;
        var sessions = this.cache.findSession(id);
        var msgs = this.cache.getMsgs(id);
        if (!!sessions) {
            if (sessions.unread >= msgs.length) {
                var msgid = (msgs.length > 0) ? msgs[0].idClient : false;
                this.mysdk.getLocalMsgs(scene, account, msgid, this.getLocalMsgsDone.bind(this));
                return;
            }
        }
        var temp = appUI.buildChatContentUI(id, this.cache);
        this.$chatContent.html(temp);
        this.$chatContent.scrollTop(9999);
    },
    getLocalMsgsDone: function (err, data) {
        if (!err) {
            this.cache.addMsgsByReverse(data.msgs);
            var id = data.scene + "-" + data.to;
            var temp = appUI.buildChatContentUI(id, this.cache);
            this.$chatContent.html(temp);
            this.$chatContent.scrollTop(9999);
        } else {
            $.core.showErrorInfo("获取历史消息失败");
        }
    },
    showInfo: function (account, type) {
        if (type == "p2p") {
            var user = im.cache.getUserById(account);
            this.showInfoBox(user);
        }

    },
    //从聊天面板点进去
    showInfo2: function () {
        if ($("#sendMsgContent").data('type') == "p2p") {
            var account = $("#sendMsgContent").data('to');
            var user = im.cache.getUserById(account);
            this.showInfoBox(user);
        }
    },

    showInfoBox: function (user) {
        if (user.account === userUID) {
            this.showMyInfo();
            return;
        }
        var isFriend = this.cache.isFriend(user.account);
        var inMutelist = this.cache.inMutelist(user.account);
        var inBlacklist = this.cache.inBlacklist(user.account);
        var $node = this.$personCard.data({
            account: user.account,
            inMutelist: inMutelist ? true : false,
            inBlacklist: inBlacklist ? true : false
        });

        $node.find(".u-icon").attr('src', getAvatar(user.avatar,user.gender));
        $node.find(".j-nick").text(getNick(user.account));
        var avatarSrc = "";
        if (user.gender && user.gender !== "unknown") {
            avatarSrc = ctx + "/view/static/comp/im/images/" + user.gender + ".png";
        } else {
            $node.find(".j-gender").addClass("hide");
        }
        $node.find(".j-gender").attr('src', avatarSrc);
        //TODO修改为自定义属性
        $node.find(".j-username").text("帐号：" + user.account);
        $node.find(".j-birth").text(user.birth === undefined ? "--" : user.birth);
        $node.find(".j-tel").text(user.mobile === undefined ? "--" : user.mobile);
        $node.find(".j-email").text(user.email === undefined ? "--" : user.email);
        $node.find(".j-sign").text(user.sign === undefined ? "--" : user.sign);
        if(user.custom && user.custom != ""){
            var custom = JSON.parse(user.custom);
            $node.find(".j-dept").text("部门：" + custom.department);
            $node.find(".j-phone").text(custom.mobilePhone === undefined ? "--" : custom.mobilePhone);
        }

        if (inMutelist) {
            $node.find(".mutelist>.u-switch").addClass('off');
        }
        if (!inBlacklist) {
            $node.find(".blacklist>.u-switch").addClass('off');
        } else {
            $node.addClass('blacklist');
        }
        if (!isFriend) {
            $node.addClass("notFriend");
        } else {
            var alias = this.cache.getFriendAlias(user.account);
            $node.find(".e-alias").val(alias);
        }
        this.$mask.removeClass('hide');
        $node.removeClass('hide');
    },
    hideInfoBox: function () {
        this.$personCard.addClass('hide');
        this.$mask.addClass('hide');
        this.$personCard.removeClass('notFriend');
        this.$personCard.removeClass('blacklist');
        this.$personCard.find(".mutelist .u-switch").removeClass('off');
        this.$personCard.find(".blacklist .u-switch").removeClass('off');
    },
    /**
     * 查看云记录
     */
    showCloudMsg: function () {
        var that = this;
        if (this.$chatEditor.data("type") === "team") {
            var teamId = this.$teamInfoBtn.data("team-id");
            var teamInfo = that.cache.getTeamById(teamId);
            if (!teamInfo) {
                return;
            }
        }
        $("#j-cloudMsgList").html("");
        this.$rightPanel.addClass("hide");
        this.$cloudMsgContainer.removeClass('hide');
        var id = that.$chatEditor.data('to'),
            scene = that.$chatEditor.data('type'),
            param = {
                scene: scene,
                to: id,
                lastMsgId: 0,
                limit: 20,
                reverse: false,
                done: that.cbCloudMsg.bind(that)
            }
        that.mysdk.getHistoryMsgs(param);
    },
    /**
     * 云记录面板显示
     * @return {[type]} [description]
     */
    closeCloudMsgContainer: function () {
        this.$rightPanel.removeClass("hide");
        this.$cloudMsgContainer.addClass('hide');
    },

    /**
     * 加载更多云记录
     */
    loadMoreCloudMsg: function () {
        var id = this.$chatEditor.data('to'),
            scene = this.$chatEditor.data('type'),
            lastItem = $("#j-cloudMsgList .item").first(),
            param = {
                scene: scene,
                to: id,
                beginTime: 0,
                endTime: parseInt(lastItem.attr('data-time')),
                lastMsgId: parseInt(lastItem.attr('data-idServer')),//idServer 服务器用于区分消息用的ID，主要用于获取历史消息
                limit: 20,
                reverse: false,
                done: this.cbCloudMsg.bind(this)
            }
        this.mysdk.getHistoryMsgs(param);
    },

    /**
     * 云记录获取回调
     * @param  {boolean} error
     * @param  {object} obj 云记录对象
     */
    cbCloudMsg: function (error, obj) {
        var node = $("#j-cloudMsgList"),
            tip = $("#cloudMsg .u-status span");
        if (!error) {
            if (obj.msgs.length === 0) {
                tip.html('没有更早的聊天记录');
            } else {
                if (obj.msgs.length < 20) {
                    tip.html('没有更早的聊天记录');
                } else {
                    tip.html('<a class="j-loadMore">加载更多记录</a>')
                }
                var msgHtml = appUI.buildCloudMsgUI(obj.msgs, this.cache);
                $(msgHtml).prependTo(node);
            }
        } else {
            console && console.error('获取历史消息失败');
            tip.html('获取历史消息失败');
        }
    },
    sendTextMessage: function () {
        var scene = this.$chatEditor.data('type'),
            to = this.$chatEditor.data('to'),
            text = this.$messageText.val().trim();
        if (!!to && !!text) {
            if (text.length > 500 && text.length === 0) {
                $.core.showErrorInfo('消息内容不能为空，且长度最大为500字符');
            } else {
                this.mysdk.sendTextMessage(scene, to, text, this.sendMsgDone.bind(this));
            }
        }
    },
    /**
     * 发送消息完毕后的回调
     * @param error：消息发送失败时，error != null
     * @param msg：消息主体，类型分为文本、文件、图片、地理位置、语音、视频、自定义消息，通知等
     */
    sendMsgDone: function (error, msg) {
        this.cache.addMsgs(msg);
        this.$messageText.val('');
        this.$chatContent.find('.no-msg').remove();
        var msgHtml = appUI.updateChatContentUI(msg, this.cache);
        this.$chatContent.append(msgHtml).scrollTop(99999);
        $('#uploadFileForm').get(0).reset();
    },
    inputMessage: function (e) {
        var ev = e || window.event,
            $this = $(this);
        if ($.trim($this.val()).length > 0) {
            if (ev.keyCode === 13 && ev.ctrlKey) {
                $this.val($this.val() + '\r\n');
            } else if (ev.keyCode === 13 && !ev.ctrlKey) {
                im.sendTextMessage();
            }
        }
    },
    /**
     * 处理收到的消息
     * @param  {Object} msg
     * @return
     */
    doMsg: function (msg) {
        var that = this,
            who = msg.to === userUID ? msg.from : msg.to,
            updateContentUI = function () {
                //如果当前消息对象的会话面板打开
                if ($('#sendMsgContent').data('to') === who) {
                    var msgHtml = appUI.updateChatContentUI(msg, that.cache);
                    that.$chatContent.find('.no-msg').remove();
                    that.$chatContent.append(msgHtml).scrollTop(99999);
                }
            };
        //非群通知消息处理
        if (/text|image|file|audio|video|geo|custom/i.test(msg.type)) {
            this.cache.addMsgs(msg);
            var account = (msg.scene === "p2p" ? who : msg.from);
            //用户信息本地没有缓存，需存储
            if (!this.cache.getUserById(account)) {
                this.mysdk.getUser(account, function (err, data) {
                    if (!err) {
                        that.cache.updatePersonlist(data);
                        updateContentUI();
                    }
                })
            } else {
                this.buildConversations();
                updateContentUI();
            }
        } else {
            // 群消息处理
            notification.messageHandler(msg, updateContentUI);
        }
    },
    /**
     * 选择表情回调
     * @param  {objcet} result 点击表情/贴图返回的数据
     */
    cbShowEmoji: function (result) {
        if (!!result) {
            var scene = this.$chatEditor.data('type'),
                to = this.$chatEditor.data('to');
            // 贴图，发送自定义消息体
            if (result.type === "pinup") {
                var index = Number(result.emoji) + 1;
                content = {
                    type: 3,
                    data: {
                        catalog: result.category,
                        chartlet: result.category + '0' + (index >= 10 ? index : '0' + index)
                    }
                };
                this.mysdk.sendCustomMessage(scene, to, content, this.sendMsgDone.bind(this));
            } else {
                // 表情，内容直接加到输入框
                this.$messageText[0].value = this.$messageText[0].value + result.emoji;
            }
        }
    },
    showEmoji: function () {
        this.initEmoji();
        this.$emNode._$show();
    },
    chooseFile: function () {
        this.$fileInput.click();
    },
    sendFile: function () {
        var that = this,
            scene = that.$chatEditor.data('type'),
            to = that.$chatEditor.data('to'),
            fileInput = this.$fileInput.get(0);
        if (fileInput.files[0].size == 0) {
            $.core.showErrorInfo("不能传空文件");
            return;
        }
        this.mysdk.sendFileMessage(scene, to, fileInput, this.sendMsgDone.bind(this));
    },
    // 语音播放
    playAudio: function () {
        if (!!window.Audio) {
            var node = $(this),
                btn = $(this).children(".j-play");
            node.addClass("play");
            setTimeout(function () {
                node.removeClass("play");
            }, parseInt(btn.attr("data-dur")))
            new window.Audio(btn.attr("data-src") + "&audioTrans&type=mp3").play();
        }
    },
    convertAudio:function(){
        var audio = $(this).parent().find(".j-play");
        var src = audio.attr("data-src");
    },
    //显示位置
    showLocation:function(){
        var node = $(this);
        $.core.open(ctx+"/pubs/map?longitude=" + node.data("lng") + "&latitude=" + node.data("lat") + "&info=" + node.data("nick"), node.data("nick"));
    },
    //系统消息
    showSysMsgCount: function () {
        var $node = $("#systemNotice .count");
        var count = this.cache.getSysMsgCount();
        if (count > 0) {
            var imWindow = $('#chatWindow', window.parent.document);
            if (imWindow.hasClass("windowHidden")) {
                var chatFlag = $('#eidpChat', window.parent.document);
                var label = chatFlag.find(".badge-count");
                if (!label.length) {
                    label = $("<span class='badge badge-count'></span>");
                    chatFlag.append(label);
                    label.text(count);
                } else {
                    label.text(count);
                }
            }
            $node.removeClass("hide").text(count);
        } else {
            $node.addClass("hide").text(count);
        }
    },
    showSystemNotice: function () {
        var that = this;
        this.cache.setSysMsgCount(0);
        this.showSysMsgCount();
        if (this.firstLoadSysMsg) {
            this.mysdk.getLocalSysMsgs(function (error, obj) {
                if (!error) {
                    if (obj.sysMsgs.length > 0) {
                        that.cache.setSysMsgs(obj.sysMsgs);
                    }
                    that.firstLoadSysMsg = false;
                    that.showNotice();
                } else {
                    alert("获取系统消息失败");
                }
            });
        } else {
            this.showNotice();
        }

    },
    showNotice:function(){
        //get custom sysmsg
        var that = this;
        $.core.backgroundRequest(ctx+"/core/personal/notification/0/find?page="+page+"&rows=10",{
            type:"GET",
            callback:function(data) {
                if(data && data != null) {
                    var msgs =[];
                    $.each(data,function(index,item){
                        var msg = {
                            time:item.sendTime,
                            content:JSON.parse(item.extraData)
                        };
                        msgs.insert(0,msg);
                        //that.cache.addCustomSysMsgs(msg);
                    });
                    if(msgs.length > 0) {
                        //var data = that.cache.getCustomSysMsgs();
                        that.$rightPanel.addClass("hide");
                        that.$notice.removeClass("hide");
                        that.$teamInfoContainer.addClass("hide");
                        that.$cloudMsgContainer.addClass("hide");
                        that.$conversations.find(".active").removeClass("active");
                        var html = that.buildSysMsgs(msgs);
                        that.$notice.find('#sysNoticeContent').html(html);
                        $("#sysNoticeContent").scrollTop(9999);
                    } else {
                        that.$notice.find('#sysNoticeContent').html("暂无系统消息哦...");
                    }
                }else {
                    that.$notice.find('#sysNoticeContent').html("暂无系统消息哦...");
                }
            }
        });
    },
    buildSysMsgs:function(data){
        var html = "";
        if (data.length === 0) {
            return html;
        }
        data = data.sort(function (a, b) {
            return b.time - a.time;
        });
        for (var i = 0; i < data.length; i++) {
            content = JSON.parse(data[i].content);
            html += '<p class="u-msgTime"><code>'+transTime(data[i].time)+'</code></p>';
            html += '<div class="panel panel-default"><div class="panel-heading">'+ content.relBizTypeName + '提醒</div>' +
                '<div class="panel-body"> '+content.desc+'<blockquote>'+content.relBizSubject+'</blockquote></div></div>';
        }
        return html;
    },
    loginPorts: function (devices) {
        var pc, mobile;
        for (var i = devices.length - 1; i >= 0; i--) {
            if (/iOS|Android|WindowsPhone/i.test(devices[i].type)) {
                mobile = devices[i];
            } else if (/PC/i.test(devices[i].type)) {
                pc = devices[i];
            }
        }
        ;
        if ((pc && pc.online) || (mobile && mobile.online)) {
            if ((pc && pc.online) && (mobile && mobile.online)) {
                $(".m-devices").html("正在使用云信手机版，电脑版")
                $("#j-devices .pc").removeClass("hide");
                $("#j-devices .mobile").removeClass("hide");
                this.mysdk.mobileDeviceId = mobile.deviceId;
                this.mysdk.pcDeviceId = pc.deviceId;
            } else if (pc && pc.online) {
                $(".m-devices").html("正在使用云信电脑版")
                $("#j-devices .pc").removeClass("hide");
                $("#j-devices .mobile").addClass("hide");
                this.mysdk.mobileDeviceId = false;
                this.mysdk.pcDeviceId = pc.deviceId;
            } else {
                $(".m-devices").html("正在使用云信手机版")
                $("#j-devices .mobile").removeClass("hide");
                $("#j-devices .pc").addClass("hide");
                this.mysdk.mobileDeviceId = mobile.deviceId;
                this.mysdk.pcDeviceId = false;
            }
            $(".m-devices").removeClass("hide");
            $(".friends").height(463);
            $("#j-chatVernier").css({marginTop: '41px'});
        } else {
            $(".m-devices").addClass("hide");
            $("#j-devices").addClass("hide");
            $("#j-devices .pc").addClass("hide");
            $("#j-devices .mobile").addClass("hide");
            this.mysdk.mobileDeviceId = false;
            this.mysdk.pcDeviceId = false;
            $(".friends").height(504);
            $("#j-chatVernier").css({marginTop: '0'});
        }
    },
    showDevices: function () {
        this.$devices.removeClass("hide");
    },
    hideDevices: function () {
        this.$devices.addClass("hide");
    }
};