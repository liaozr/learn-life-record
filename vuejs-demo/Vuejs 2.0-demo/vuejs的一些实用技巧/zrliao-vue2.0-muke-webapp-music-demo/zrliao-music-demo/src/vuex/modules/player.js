import { playMode } from 'assets/js/config' // 导入一些默认变量
import {shuffle} from 'assets/js/util'
import{savePlay,loadPlay,saveFavorite,deleteFavorite,loadFavorite} from 'assets/js/cache'

function findIndex(list,song){
    return list.findIndex( (item) =>{
        return item.id == song.id
    })
}

export default {
  state: {
      singer:{},
      playing:false,
      fullScreen:false,
      playlist:[],
      sequencelist:[],
      mode:playMode.sequence,
      currentIndex:-1,
      disc:{    
      },
      playHistory:loadPlay(),
      favoriteList:loadFavorite()
  },
  mutations: {
      SET_SINGER(state,singer){
          state.singer = singer
      },
      SET_PLAYING_STATE(state,flag){
          state.playing = flag
      },
      SET_FULL_SCREEN(state,flag){
          state.fullScreen = flag
      },
      SET_PLAYLIST(state,list){
          state.playlist = list
      },
      SET_SEQUENCE_LIST(state,list){
          state.sequencelist = list
      },
      SET_PLAY_MODE(state,mode){
          state.mode = mode
      },
      SET_CURRENT_INDEX(state,index){
          state.currentIndex = index
      },
      SET_DISC(state,disc){
          state.disc = disc
      },
      SET_PLAYHISTORY(state,history){
          state.playHistory = history
      },
      SET_FAVORITELIST(state,favoriteList){
          state.favoriteList = favoriteList
      }
  },
  actions: {
    // 一些异步操作，以及对 mutations的 封装
    // 如通过调用一个actions，去修改多个mutations的目的

    // 传多个参数的时候，可以利用对象的解构，{ list,index },这样拿到的值就是list 跟 index
    selectPlay ({commit,state},{ list,index }){
        console.log('qqqqq')
        console.log(list)
        console.log(index)

        commit('SET_SEQUENCE_LIST',list)
        
        // 当播放模式为随机播放的时候
        if(state.mode == playMode.random){
           let randomlist = shuffle(list)
           commit('SET_PLAYLIST',randomlist)
           index = findIndex(randomlist,list[index])
        }else{
           commit('SET_PLAYLIST',list)
        }
        commit('SET_CURRENT_INDEX',index)
        commit('SET_FULL_SCREEN',true)
        commit('SET_PLAYING_STATE',true)
    },
    nextIndex( {commit},index){
        commit('SET_CURRENT_INDEX',index)
    },
    prevIndex( {commit},index){
        commit('SET_CURRENT_INDEX',index)
    },
    back ({commit}){
       commit('SET_FULL_SCREEN',false) 
    },
    open({commit}){
        commit('SET_FULL_SCREEN',true)
    },
    setplaystate( {commit},state){
        commit('SET_PLAYING_STATE',state)
    },
    setplayMode({commit},mode){
        commit('SET_PLAY_MODE',mode)
    },
    setPlayList({commit},playlist){
        commit('SET_PLAYLIST',playlist)
    },
    setCurrentIndex({commit},index){
        commit('SET_CURRENT_INDEX',index)
    },
    randomPlay ( {commit},list){
        commit('SET_PLAY_MODE',playMode.random)
        commit('SET_SEQUENCE_LIST',list)
        let randowlist = shuffle(list)
        commit('SET_PLAYLIST',randowlist)
        commit('SET_CURRENT_INDEX',0)
        commit('SET_FULL_SCREEN',true)
        commit('SET_PLAYING_STATE',true)
    },
    disc({commit},disc){
        commit('SET_DISC',disc)
    },
    insertSong({commit,state},song){

       // 之所以 加上 slice 的目的 是不能再actions里面直接修改state里面的数据。  
       // 变量跟数组是按引用传递的，需加上slice,不然会直接改变原来的数据的。  
       let playlist = state.playlist.slice(0)

       let sequencelist = state.sequencelist.slice(0)

       // 这些是按值传递的    
       let currentIndex = state.currentIndex

       // 记录当前歌曲
       let currentSong = playlist[currentIndex]

// -----------------------------------------------------------------------------------

       // 查一下插入的歌曲在不在 playlist里面  
       // 查找当前列表中是否有待插入的歌曲并返回其索引
       let findindexs = findIndex(playlist,song)
       // 因为是插入歌曲，所以索引 + 1   
       currentIndex++
       // 插入这首歌到当前索引位置 

       // splice 第二个参数值 如果设置为 0的话，则意味着不会删除数据    
       playlist.splice(currentIndex,0,song)

       //如果已经包含了这首歌  
       if(findindexs > -1){
          // 如果当前插入的序号大于列表中的序号    
          if(currentIndex > findindexs){
             playlist.splice(findindexs,1) 
             currentIndex--  
          }else{
             // 这种情况下，因为 playlist的长度变了，所以，之前找到的 findindexs 索引也要跟着变   
             playlist.splice(findindexs + 1 ,1)           
          }
       }

// -----------------------------------------------------------------------------------
       
       // 先找到插入的位置
       let currentSIndex = findIndex(sequencelist,currentSong) + 1

       let fsIndex = findIndex(sequencelist,song)
        // 插入这首歌到当前索引位置 
       sequencelist.splice(currentSIndex,0,song)

       if(fsIndex > -1){
           // 如果当前插入的序号大于列表中的序号    
          if(currentSIndex > fsIndex){
             sequencelist.splice(fsIndex,1)             
          }else{
             // 这种情况下，因为 playlist的长度变了，所以，之前找到的findindexs索引也要跟着变   
             sequencelist.splice(fsIndex + 1 ,1)           
          }
       }

// -----------------------------------------------------------------------------------

       commit('SET_PLAYLIST',playlist)
       commit('SET_SEQUENCE_LIST',sequencelist)
       commit('SET_CURRENT_INDEX',currentIndex)
       commit('SET_FULL_SCREEN',true)
       commit('SET_PLAYING_STATE',true)
    },
    deleteSong({commit,state},song){
       let playlist = state.playlist.slice(0)
       let sequencelist = state.sequencelist.slice(0)
       // 这些是按值传递的    
       let currentIndex = state.currentIndex

       let pIndex = findIndex(playlist,song)
       playlist.splice(pIndex,1)

       let sIndex = findIndex(sequencelist,song)
       sequencelist.splice(sIndex,1)

       if(currentIndex > pIndex || currentIndex == playlist.length){
          currentIndex--
       }
       commit('SET_PLAYLIST',playlist)
       commit('SET_SEQUENCE_LIST',sequencelist)
       commit('SET_CURRENT_INDEX',currentIndex)      

       if(!playlist.length){
         commit('SET_PLAYING_STATE',false)
       }else{
         commit('SET_PLAYING_STATE',true)
       }
    },
    deleteSongList({commit}){
       commit('SET_PLAYLIST',[])
       commit('SET_SEQUENCE_LIST',[]) 
       commit('SET_CURRENT_INDEX',-1)
       commit('SET_PLAYING_STATE',false)
    },
    set_playHistory({commit},song){
        commit('SET_PLAYHISTORY',savePlay(song))
    },
    saveFavoriteList({commit},song){
        commit('SET_FAVORITELIST',saveFavorite(song))         
    },
    deleteFavoriteList({commit},song){
        commit('SET_FAVORITELIST',deleteFavorite(song))
    }
  },
  getters: {
    singer:state => {
      return state.singer
    },
    playing:state => {
      return state.playing
    },
    fullScreen:state => {
      return  state.fullScreen
    },
    playlist:state => {
      return state.playlist
    },
    // 原始播放列表
    sequencelist:state => {
      return state.sequencelist
    },
    mode:state => {
      return state.mode
    },
    currentIndex:state => {
      return state.currentIndex
    },
    currentSong:state => {
        return state.playlist[state.currentIndex] || {}
    },
    disc:state =>{
        return state.disc
    },
    get_playHistory:state =>{
        return state.playHistory
    },
    favoriteList:state =>{
        return state.favoriteList
    }
  }
}