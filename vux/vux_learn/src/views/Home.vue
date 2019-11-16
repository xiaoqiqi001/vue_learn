<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="setNum(999)">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    {{arrList}}{{collection}}
    <div @click="toAbout">
      to about
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState,mapGetters,mapActions} from 'vuex';
import { log } from 'util';

export default {
  name: 'home',
  data () {
    return {
      aaa: 'dayongge'
    }
  },
  components: {
    HelloWorld
  },
  computed: {
    ...mapState('collection', [
      'collection'
    ]),
    ...mapGetters('collection', {
      arrList: 'renderCollection'
    })
  },
  methods: {
    ...mapActions('collection', {
      setNum: 'invokePushItems'
    }),
    toAbout () {
      let that = this
      this.$router.push({
        path: '/about',
        meta:{
          aaa:111
        }
      })
    }
  },
  created(){
    this.$store.dispatch('collection/invokePushItems', 1000)
    console.log(this.$store.state.collection.collection);
  }
}
</script>
