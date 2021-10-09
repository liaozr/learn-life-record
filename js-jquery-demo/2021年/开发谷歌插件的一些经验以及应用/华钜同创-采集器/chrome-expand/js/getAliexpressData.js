function getAliexpressData(doc,requestCur){
    let p ={
        goodName:'',
        otherImage:[],
        goodAttributes:'',
        goodSkuVoList:[],
        "targetAt": "Aliexpress",
        "fromUrl": requestCur.url,
        "mainImage": '',//主图
        discountPrice:'',
    }
    let obj = document.createElement('div');
    obj.innerHTML = doc;

    let mat = doc.match(/window.runParams[\s\S]*?};/g);
    let str = '';
    if(mat[0]){
        str = mat[0].replace(/[\s]*/g,'')
        str = str.substring(17,str.length-1)
    }
    // str = str.match(/skuMap:[\s\S]*?,end/g)
    // if(str[0]){
    //     str = str[0].replace(/[\s]*/g,'')
    //     str = str.substring(7,str.length-4)
    // }
    let fn = new Function('return '+str)
    let fnText = fn();
    const data = fnText.data;
    const titleModule = data.titleModule;
    let title = titleModule.subject.replace(/[A-Z]/g,function(e,i){
        if(i){
            return ' '+e;
        }else {
            return e;
        }
    })
    p.goodName = title;//标题
    p.otherImage = data.imageModule.imagePathList;//图片
    if(p.otherImage.length){
        p.mainImage = p.otherImage[0]
    }
    const priceModule = data.priceModule;
    p.discountPrice = priceModule.maxAmount.value;//最大价格
    const skuModule = data.skuModule;
    const productSKUPropertyList = skuModule.productSKUPropertyList;//sku列表
    // skuPropertyValues.propertyValueDisplayName
    const skuPriceList = skuModule.skuPriceList;//sku价格列表
    // console.log('sku列表',productSKUPropertyList)
    // console.log('sku价格列表',skuPriceList)
    let arr=[];
    let isColor = false;//是否存在颜色规格
    let isState = false;//是否带国家sku
    // 把颜色放在前面-2020-12-05
    productSKUPropertyList.map((item,index)=>{
        if(item.showType == "colour_atla"||item.showTypeColor||item.skuPropertyName=="Color"){
            isColor = true;
            let val = item;
            productSKUPropertyList.splice(index,1)
            productSKUPropertyList.unshift(val)
        }
    })
    if(skuPriceList&&productSKUPropertyList&&skuPriceList.length&&productSKUPropertyList.length){
        skuPriceList.map(skuItem=>{
            let idArr = skuItem.skuPropIds.split(',');
            let params = {
                costPrice:skuItem.skuVal.skuAmount.value,
                salePrice:skuItem.skuVal.skuAmount.value
            }
            productSKUPropertyList.map(item1=>{
                    item1.skuPropertyValues.map(item2=>{
                        idArr.map((idItem,idIndex)=>{
                            if(idItem==item2.propertyValueId){
                                if(item2.skuPropertyImagePath){
                                    params.mainImage = item2.skuPropertyImagePath;
                                }
                                // 把颜色放在前面-2020-12-05
                                if(isColor){
                                    if(item1.showType == 'colour_atla'||item1.showTypeColor||item1.skuPropertyName=="Color"){
                                        params.colorName = item2.propertyValueDisplayName
                                    }else if(!params.typeName&&item1.skuPropertyName == 'ShipsFrom'){
                                        isState = true;
                                        params.typeName = item2.propertyValueDisplayName;
                                    }else if(!params.sizeName){
                                        params.sizeName = item2.propertyValueDisplayName;
                                    }
                                }else{
                                    if(idIndex===0){
                                        params.colorName = item2.propertyValueDisplayName
                                    }else if(idIndex===1){
                                        params.sizeName = item2.propertyValueDisplayName;
                                    }else if(idIndex===2){
                                        params.typeName = item2.propertyValueDisplayName;
                                    }
                                }
                            }
                        })
                    })
            })
            arr.push(params);
        })
        // 判断如果有3个规格，就筛选china，如果没有就直接赋值
        if(isState){
            // 筛选China的sku
            arr.map((item)=>{
                if(item.typeName==='China'||item.typeName==='CN'){
                    p.goodSkuVoList.push(item)
                }
            })
        }else{
            p.goodSkuVoList = arr;
        }
    }
    // p.goodSkuVoList = arr;
    // console.log('sku',p.goodSkuVoList)
    const specsModule = data.specsModule;//规格
    let attr="";
    specsModule.props.map(item=>{
        attr =attr + item.attrName+': '+item.attrValue+'\n';
    })
    p.goodAttributes = attr;
    // console.log(JSON.stringify(p),'obj')
    return p;
}



// 格式化图片
function initImg(img){
    if(img){
        img =  img.replace('.60x60.','.');
        img =  img.replace('.32x32.','.');
    }else{
        img = '';
    }
    // console.log(img,'initImg')
    return img
}