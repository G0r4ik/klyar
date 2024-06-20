<template>
  <div class="c-item card">
    <img :src="`/img/${product.img}.png`" @click="showCardModalF(product)" :alt="product.title" class="c-item__img" />
    <span class="c-item__title">{{ product.title }}</span>
    <div class="c-item__bottom">
      <button v-if="isSignedIn" class="c-item__button" :disabled="inCart(product)" @click="addProductToCart(product)">
        {{ inCart(product) ? 'Уже в корзине' : "В корзину" }}
      </button>
      <span class="c-item__price">от {{ product.price.toLocaleString() }} ₽</span>
    </div>
  </div>
  <teleport to="body">
    <card-o v-if="currentItem" :product="currentItem" @close="currentItem = undefined" />
  </teleport>
</template>

<script setup lang="ts">
import CardO from './Card-o.vue'
import { PropType, computed, ref } from 'vue';
import { Product } from '../types.ts';
import { useStore } from '../store.ts';
import { useAuth } from 'vue-clerk'

const { product } = defineProps({
  product: { type: Object as PropType<Product>, required: true },
})
console.log(product)

let currentItem = ref<Product>()
let showCardModal = ref(false)

const { isSignedIn, } = useAuth()
const { addProductToCart } = useStore()

const cart = computed(() => useStore().cart)

function inCart(product: Product) {
  return !!cart.value.find((el) => el.id == product.id
  )
}

function showCardModalF(product: Product) {
  showCardModal.value = true
  currentItem.value = product
}

</script>


<style>
.c-item__button:disabled {
  background: gray;
}

.c-item {
  /* min-width: 360px;
  max-width: 360px; */
  width: 30%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  height: 400px;
}

.c-item__img {
  margin-bottom: 5px;
  height: 340px;
  object-fit: cover;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.c-item__title {
  margin-bottom: 5px;
  padding-left: 5px;
  margin-top: 5px;
}

.c-item__bottom {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  align-items: center;
}

.c-item__price {
  font-weight: 700;
  padding-left: 5px;
}

.c-item__button {
  color: white;
  background: #DA0038;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>