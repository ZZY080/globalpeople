<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {

    }
  },
  methods: {
   
  },
  computed: {

  },
  watch:{
   
  },
  beforeUpdate(){
    console.log("beforeUpdate");
  },
  updated(){
    console.log("updated")
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

img {
  user-select: none;
}

.item.active {
  padding: 10px 40px;
  border: 1px solid orange;
}

.item {
  padding: 10px 40px;
  border: 1px solid transparent;
}
</style>
