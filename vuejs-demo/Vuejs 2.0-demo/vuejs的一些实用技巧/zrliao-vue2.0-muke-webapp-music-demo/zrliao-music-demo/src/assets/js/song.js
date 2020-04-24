// -----------------------------------------------------------------------------------------------------------------------

import { getLyric } from '@a/song'
import { ERR_OK } from 'assets/js/config'
import { Base64 } from 'js-base64'

// song类的封装

// song类 这样子表示  song这个类，接收一个对象，这个对象含有一些参数信息

// constructor( {id,mid,singer,name,album,duration,image,url } )


// -----------------------------------------------------------------------------------------------------------------------

// 设计成一个类的而不是设计成一个对象的原因:
// 1、可以把一些代码集中到一个地方去维护，而不用大量的地方去写相同的代码
// 2、类的扩展性比对象好，要比对象强很多，而且类是一个面向对象的编程方式

export default class Song{
   constructor({ id,mid,singer,name,album,duration,image,url }) {
          this.id=id
          this.mid=mid
          this.singer=singer
          this.name=name
          this.album=album
          this.duration=duration
          this.image=image
          this.url=url
   }
   getLyric(){
      // 判断当前这首歌的歌词是不是已经存在，如果有的话，就不再请求获取歌词的接口 
      if(this.lyric){
          return Promise.resolve(this.lyric)
      }
      return new Promise((resolve,reject)=>{
            getLyric(this.mid).then((res) =>{
                if(res.retcode == ERR_OK){
                    // 进行js-base64 进行解码
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                    console.log(this.lyric)
                }else{
                    reject('no lyric') 
                }
            })
      })
   }     

}

// 抽象封装 一个 工厂方法 为的是 减少代码量
export function createSong(musicData){
   //  实例化一个 Song
   return new Song({
       id:musicData.songid,
       mid:musicData.songmid,
       singer:filterSinger(musicData.singer),
       name:musicData.songname,
       album:musicData.albumname,
       duration:musicData.interval,
       image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
       url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
   })
}

function filterSinger(singer){
    let ret=[]
    if(!singer){
        return ''
    }
    singer.forEach(($) =>{
        ret.push($.name)
    })
    return ret.join('/')
}

// -----------------------------------------------------------------------------------------------------------------------

//   上面代码首先用class定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，

//   而this关键字则代表实例对象。简单地说，constructor内定义的方法和属性是实例对象自己的，

//   而constructor外定义的方法和属性则是所有实例对象可以共享的。


// class Animal{
//     constructor(name){
//         this.name = name;
//     }

//     sayName(){
//         return this.name;
//     }
// }


// const animal = new Animal('dog');

// console.log(animal.sayName());  // 'dog'
        
// 其内部的constructor：指向的就是整个类的constructor

// 其内部的函数：这些函数的定义在类的原型上面

// -----------------------------------------------------------------------------------------------------------------------
