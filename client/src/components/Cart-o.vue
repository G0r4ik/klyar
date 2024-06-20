<template>
  <div class="cart popup-wrapper" @click="$emit('close')">
    <div class="cart__inner card" @click.stop>
      <div class="container">
        <div class="popup-wrapper__cross" @click="$emit('close')">
          ❌
        </div>
        <div v-if=!isBuy>
          <div class="cart__title">Корзина</div>
          <div class="cart__item" v-for="item in cart" :key="item.id">
            <img :src="`/img/${item.img || item.img}.png`" alt="" class="cart__img" />
            <div class="cart__text">
              <div class="cart__title-item">{{ item.title }}</div>
            </div>
            <div style="display: flex;">
              <div class="count__remove" @click="deleteOneProduct(item.id)">
                Удалить
              </div>
            </div>
          </div>
          <button v-if="cart.length" class="cart__finalyBuy" @click="buy">Заказать</button>
        </div>
        <div v-else>
          <br>
          <br>
          Спасибо за покупку!
          <br>
          Мы вам напишем.
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUser } from 'vue-clerk';
import { useStore } from '../store.ts';
import { computed, ref } from 'vue'


const { deleteOneProduct, increaseCount, decreaseCount } = useStore()
const isBuy = ref(false)
const { user } = useUser()

function buy() {
  isBuy.value = true
  useStore().clearCart(user.value.id)
}

let cart = useStore().cart
const totalSum = computed(() => {
  return cart.reduce((s, el) => {
    for (let i = 0; i < el.count; i++) s += +el.price
    return s
  }, 0);

});
</script>

<style>
.cart__items-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  right: -5px;
  width: 20px;
  height: 20px;
  bottom: -8px;
  background: #FF4C2B;
  color: #fff;
  border-radius: 50%;
}

.cart__totalsum {
  font-size: 22px;
  text-align: right;
  margin-bottom: 5px;
}

.cart__finalyBuy {
  background: #FF4C2B;
  padding: 5px 20px;
  font-size: 22px;
  border-radius: 15px;
  color: #fff;
  border: none;
  cursor: pointer;
  display: block;
  margin-left: auto;
}

.cart__inner {
  width: 100vw !important;
  max-width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  background: white;

}

.cart__title {
  font-size: 24px;
  margin-bottom: 25px;
}

.cart__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /* border-bottom: 1px solid #edeef0; */
  padding-bottom: 10px;
}

.cart__img {
  height: 150px;
  border-radius: 15px;
  margin-right: 15px;
}

.cart__title-item {
  max-width: 300px;
}

.cart__text {
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart__id {
  font-size: 14px;
  color: #626d7a;
  margin-bottom: 10px;
}

.cart__count {
  padding: 5px;
  border-radius: 15px;
  width: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.cart__count-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
  min-width: 30px;
  min-height: 30px;

}

.cart__count-n {
  width: 25px;
  border-radius: 15px;
  font-size: 20px;
  /* border: 1px solid #e7e8ec; */
  text-align: center;
}

.count__price {
  margin-right: 50px;
  font-size: 20px;
  color: #E3A3B4;
}

.count__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid tomato;
  cursor: pointer;
  padding: 5px;
  transition: 0.2s;
}

.count__remove:hover {
  background: tomato;
  transition: 0.2s;
}

@media (max-width: 768px) {
  .cart__item {
    flex-direction: column;
  }
}
</style>
