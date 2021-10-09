// background.js
let host = "https://erptest.kjeyun.com/";//华钜
let hostName = '华钜同创ERP测试';
let cookieUrl = '';
document.addEventListener('DOMContentLoaded', function() {
    createMenu();
    bindEvents();
});
function createMenu() {     // 添加右键菜单
    var contexts = ["page", "selection", "link", "editable", "image", "video",
        "audio"
    ];
    // contextId = 
    chrome.contextMenus.create({
        "title": '采集到'+hostName,
        "contexts": contexts,
        "onclick": menuHandle,
        documentUrlPatterns:['*://detail.1688.com/*','*://*.aliexpress.com/item/*','*://mobile.pinduoduo.com/goods*']
    });
}

// var senderCur = {};
var requestCur={};
async function menuHandle() { // 右键菜单点击时的处理函数
    
    try{
        cookieUrl = await getCookie();
        console.log(cookieUrl,'cookieUrl')
        if(!cookieUrl){
            return;
        }
    	sendMessageToContentScript({type:'商品采集中！'});
        var xhr = new XMLHttpRequest();

        console.log('test')
        console.log(requestCur.url)

        xhr.open("GET", requestCur.url, true);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    let doc = xhr.response;//dom全部节点字符串
                    if(requestCur.url.indexOf('mobile.pinduoduo.com')>0){
                        params = getPinDuoduoData(doc,requestCur);
                    }
                    if(requestCur.url.indexOf('aliexpress')>0){
                        // console.log('getAliexpressData',getAliexpressData)
                        params = getAliexpressData(doc,requestCur);
                    }
                    if(requestCur.url.indexOf('detail.1688')>0){
                        // console.log('getALBBData',getALBBData)
                        console.log('1688')
                        params = getALBBData(doc,requestCur);
                    }
                    console.log('提交的数据')
                    console.log(params)
                    // return
                    ajaxs(params);
                }
            }
        }
        xhr.send();
    }catch{
        return;
    }
}

function ajaxs(params){
    $.ajax({
        url: host+'/erp/v1/auth/goods/collection/add',
        type: 'POST',
        data:JSON.stringify(params),
        contentType:'application/json',
        headers:{
            Authorization:'Bearer '+cookieUrl
        },
        dataType: 'json',
        success(res){
            console.log(res)
            if(res.code==0){
                // alert('采集成功！')
                sendMessageToContentScript({type:'商品采集已提交！'});
            }else{
                // alert(res.message)
                sendMessageToContentScript({type:res.message});
            }
            // console.log(res,'res')
        },
        error(err){
            // alert('采集出错，请刷新页面重试！')
            sendMessageToContentScript({type:'采集出错，请刷新页面重试！'});
            // console.log(err,'err')
        }
    })
}
function getCookie(){
    return new Promise((resolve,reject)=>{ 
        chrome.cookies.getAll({
            url: host,
            //name:'shiroCookie',

        },function(cookie){
            let url='';
            // console.log('cookie',cookie)
            if(cookie.length){
                cookie.map(item=>{
                    // url+=(item.name+'=');
                    // url+=(item.value+';');
                    if(item.name==='token'){
                        url = item.value;
                    }
                })
            }
            if(!url){
                // alert('请登录华钜ERP系统再进行采集！');
                sendMessageToContentScript({type:`请登录${hostName}系统再进行采集！`});
                reject(url);
            }else{
                resolve(url);
            }
        })
    })
}

// 响应来自content_script的message
function bindEvents() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        // console.log(request,sender,'message')
        if (request.type === 'mouseup-event') { // 添加/update书签
            requestCur = request;
        }
    });
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function sendMessageToContentScript(message, callback){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let tabId = tabs.length?tabs[0].id:null;
        message.icnName = hostName;
        message.icon = '../icon_hj.png';
		chrome.tabs.sendMessage(tabId, message, function(response){
            // console.log(response,'tabs')
			if(callback) callback(response);
		});
	});
}
