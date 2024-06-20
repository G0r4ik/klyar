<template>
  <header>
    <div class="container">
      <div class="header__inner">
        <a href="#" class="header__logo">Фотостудия📸</a>
        <div class="header__right">
          <button class="header__cart" @click="showCartModal = true" v-if="isSignedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" style="enable-background: new 0 0 60 60"
              xml:space="preserve" fill="black">
              <path
                d="m11.68 13-.833-5h-2.99C7.411 6.28 5.859 5 4 5 1.794 5 0 6.794 0 9s1.794 4 4 4c1.859 0 3.411-1.28 3.858-3h1.294l.5 3h-.038l5.171 26.016c-2.465.188-4.518 2.086-4.76 4.474A5.013 5.013 0 0 0 15 49h2c0 3.309 2.691 6 6 6s6-2.691 6-6h11c0 3.309 2.691 6 6 6s6-2.691 6-6h4a1 1 0 1 0 0-2h-4.35c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4h-11.7c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4H15a3.01 3.01 0 0 1-2.224-.993 2.968 2.968 0 0 1-.761-2.316c.152-1.509 1.546-2.69 3.173-2.69h39.824A4.994 4.994 0 0 0 60 36.013V13H11.68zM4 11c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm42 34c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm-23 0c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm35-8.987A2.99 2.99 0 0 1 55.013 39H16.821l-4.77-24H58v21.013z" />
            </svg>
            <span class="cart__items-count" v-if="cart.length">
              {{ cart.length }}
            </span>
          </button>
          <teleport to="body">
          </teleport>
          <teleport to="body">
            <div class="fixed12">
              <UserButton v-if="isSignedIn" mode="modal" class="sign-in-btn" />
              <SignInButton v-if="isLoaded && !isSignedIn" mode="modal" v-slot="{ handler }">
                <button class="sign-in-btn" @click="handler">Войти</button>
              </SignInButton>
            </div>
          </teleport>
        </div>
      </div>
    </div>
  </header>
  <teleport to="body">
    <cart-o v-if="showCartModal" @close="showCartModal = false" />
  </teleport>
</template>

<script setup>
import CartO from './Cart-o.vue'
import { computed, ref } from 'vue';
import { useStore } from '../store.ts'
import { SignInButton, SignedIn, SignedOut, UserButton } from 'vue-clerk'
import { useAuth, useUser } from 'vue-clerk'

let showCartModal = ref(false)
const { isSignedIn } = useAuth()
const { isLoaded } = useUser()

const cart = computed(() => useStore().cart)
</script>

<style>
header {
  margin: 20px 0;
  background: white;
  border-bottom: 1px solid #000;
}

.header__inner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__logo {
  text-transform: uppercase;
  text-decoration: none;
  margin-right: auto;
  font-size: 26px;
  margin: 0 auto;
  font-weight: 900;
  letter-spacing: 5px;
  color: #DA0038;
}

.header__cart {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  position: relative;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sign-in-btn {
  color: white;
  background: royalblue;
  padding: 15px 20px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.fixed12 {
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>