<template>
  <div class="area">
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <TheHeader />

  <main>
    <div class="container">
      <div class=" cards">
        <CardInShop v-for="product of filteredProducts" :product />
        <div v-if="filteredProducts.length === 0 && isLoad" class="nothing-found">
          К сожалению ничего не найдено 😥
        </div>
      </div>
    </div>
  </main>

  <TheFooter />


</template>

<script setup lang="ts">

import { ref, computed, watch } from 'vue';

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import CardInShop from './components/CardInShop.vue';

import { Product } from './types.ts';
import { useStore } from './store.ts'
import { useUser } from 'vue-clerk';

const { isLoaded, user, isSignedIn } = useUser()

watch(isLoaded, async () => {
  if (isSignedIn.value && user.value) {
    useStore().loadCart(user.value.id)
    useStore().isAdmin = !!user.value.organizationMemberships[0]?.role
    useStore().userId = user.value.id
  }
})

const searchInput = ref('')
const products = ref<Product[]>([]);
const isLoad = ref(false)

fetch('http://localhost:3000/getProducts').then(response => response.json()).then(data => {
  products.value = data
  isLoad.value = true
})

const filteredProducts = computed(() => {
  console.log(products.value[0]?.title.toLowerCase())
  console.log(searchInput.value.toLowerCase())
  return products.value.filter(i => i.title.toLowerCase().includes(searchInput.value.toLowerCase()))
})

</script>

<style scoped>
.nothing-found {
  font-size: 30px;
  margin-top: 50px;
}

.cards {
  display: flex;
  padding: 10px 0;
  gap: 50px 25px;
  flex-wrap: wrap;
  justify-content: center;
}

.search-input {
  width: 100%;
  padding: 5px 15px;
  outline: none;
  border: none;
  border-bottom: 1px solid #E5E5E5;
  background: none;
  color: #E5E5E5;
  font-size: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
}

/*  */
/*  */
/*  */


.context {
  width: 100%;
  position: absolute;
  top: 50vh;

}

.area {
  /* background: #4e54c8; */
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
}

.circles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -999;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.05);
  animation: animate 25s linear infinite;
  bottom: -150px;

}

.circles li:nth-child(1) {
  left: 5%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 90%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 15%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 95%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 85%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 15%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 10%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 90%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 95%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}



@keyframes animate {

  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }

}
</style>