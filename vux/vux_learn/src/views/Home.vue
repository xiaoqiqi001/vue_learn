<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="setNum(999)">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{arrList}}{{collection}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState,mapGetters,mapActions} from 'vuex';

export default {
  name: 'home',
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
    })
  },
  created(){
    this.$store.dispatch('collection/invokePushItems', 1000)
    console.log(this.$store.state.collection.collection);
  }
}
</script>
