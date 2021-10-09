function getPinDuoduoData(doc,requestCur){
  var params = {
    goodName: '',
    otherImage: [],
    goodAttributes: '',
    goodSkuVoList: [],
    targetAt: 'mobile.pinduoduo',
    fromUrl: requestCur.url,
    mainImage: '', //主图
    discountPrice: ''
  }
  var obj = document.createElement('div')
  obj.innerHTML = doc
  params.goodName = $(obj).find('._1fdrZL9O span').html()

  // 产品图
  $(obj)
    .find('#main')
    .find('._1fBWnMAg')
    .find('div._1bq9lpD4')
    .each(function () {
      if (params.otherImage.length < 6) {
        var imgsrc = ''
        var img = $(this).find('img').attr('src')
        var imgdatasrc = $(this).find('img').attr('data-src')
        if(img){
          imgsrc = img
        }else{
          imgsrc = imgdatasrc
        }
        if(imgsrc){
          params.otherImage.push(imgsrc)
        }
      }
  })
  // 主图
  if (params.otherImage.length) {
      params.mainImage = params.otherImage[0]
  }
  // 属性
  var goodsProperty = doc.split('goodsProperty')
  var goodsProperty2 = goodsProperty[1].split( 'skuProperty')
  var str = goodsProperty2[0];

    // skus 
  var skus = doc.split('skus')
  var skus1 =  skus[1].split('goodsProperty')[0]
  var skus2 = skus1.split('}],"thumbUrl"')[0]+"}]"
  var skus3 = skus2.slice(2,skus2.length) 
  var skusData = JSON.parse(skus3)
  var skusArr = []

  for (var i=0;i<skusData.length;i++){
      if(skusData[i].groupTip){
        var salePrice = skusData[i].groupTip.slice(3,skusData[i].groupTip.length)
        salePrice = salePrice.replace(/([^\u0000-\u00FF])/g,'')
      }else{
        var salePrice = ''
      }
      if( skusData[i].specs.length == 1)
      {
         var obj3 = {
          "colorName":skusData[i].specs[0].spec_value,
          "sizeName":'',
          "costPrice":skusData[i].groupPrice,
          "salePrice": salePrice,
          "mainImage": skusData[i].thumbUrl
        }
      }else{
        var obj3 = {
          "colorName":skusData[i].specs[0].spec_value,
          "sizeName":skusData[i].specs[1].spec_value,
          "costPrice":skusData[i].groupPrice,
          "salePrice":salePrice,
          "mainImage": skusData[i].thumbUrl
        }   
      }
      skusArr.push(obj3)
  }
  
  var otherImage =[]
  var otherImageMaxNumber = 6
  if( skusArr.length <= otherImageMaxNumber){
    for(var i =0;i<skusArr.length;i++){
      otherImage.push(skusArr[i].mainImage)
    }
  }else{
    var num = Math.floor( skusArr.length /  otherImageMaxNumber)
    if(num >= 2){
      num =  num - 1   
    }
    for(var i =0;i<otherImageMaxNumber;i++){
      var j = i+1;
      otherImage.push(skusArr[j*num].mainImage)
    }
  }                           
  params.otherImage= otherImage
  params.goodSkuVoList = JSON.parse(JSON.stringify(skusArr))
  var goodsProperty3 = str.slice(2,str.length - 2)
  var obj2 = JSON.parse(goodsProperty3);
  var desc = ''
  for(var i=0;i<obj2.length;i++){
      for(var j =0;j<obj2[i].values.length;j++){
        desc += obj2[i].key + ': '+obj2[i].values[j]+'\n'
      }
  }
  var desc2 = desc.slice(0,desc.length-1)
  params.goodAttributes = desc2
  
  // 价格             
  params.discountPrice = $(obj).find('._1vQZeIX1').find('._15NyfC_w').html()

  return params
}

// 格式化图片
function initImg(img) {
  if (img) {
    img = img.replace('.60x60.', '.')
    img = img.replace('.32x32.', '.')
  } else {
    img = ''
  }
  return img
}
// 单引号' 后面字母小写
function titleToLowerCase(str) {
  const vaild = /\'[A-Z]/g;
  return str.replace(vaild, function(item){
    return "\'" + item[1].toLowerCase();
  });
}