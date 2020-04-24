 <template>
    <div>
      <cHeader></cHeader> 
      <bread>
         <span>Goods</span>
      </bread>

      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" @click='showPricefilter' class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a @click='setPriceAll' :class="{'cur': priceChecked == 'all'}"  href="javascript:void(0)">All</a></dd>

                <dd v-for="item in priceFilter" :key='item.id'>
                  <a @click='setPriceFilter(item)' :class="{'cur': priceChecked == item.startPrice}" href="javascript:void(0)">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
                

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for="(item,index) in goodsList" :key='item.id'>
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <cFooter></cFooter>   
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    </div>
</template>
<script>

    import cHeader from '@c/cHeader/cHeader'
    import cFooter from '@c/cFooter/cFooter'
    import bread from '@c/bread/bread'
    import axios from 'axios'

    export default{
        data(){
            return {
               goodsList:[],
               priceFilter:[
                  {
                    startPrice:'0.00',
                    endPrice:'100.00'
                  },
                  {
                    startPrice:'100.00',
                    endPrice:'500.00'
                  },
                  {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                  },
                  {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                  }
               ],
               priceChecked:'all',
               filterBy:false,
               overLayFlag:false
            }
        },
        components:{
            cHeader,
            cFooter,
            bread
        },
        mounted(){
            this.getGoodLists()
        },
        methods:{
            getGoodLists(){
              axios.get('/api/goodsList').then((res)=>{
                  var result = res.data.data.result;
                  console.log(1111)
                  console.log(result)
                  this.goodsList = result
              })
            },
            setPriceFilter(item){
                this.priceChecked = item.startPrice
            },
            setPriceAll(){
                this.priceChecked = 'all'
            },
            showPricefilter(){
                this.filterBy = true
                this.overLayFlag = true
            },
            closePop(){
                this.filterBy = false
                this.overLayFlag = false 
            }
        }
    }
</script>
