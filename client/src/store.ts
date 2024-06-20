import { defineStore } from 'pinia'
import { Product } from './types'

export const useStore = defineStore('store', {
  state: () => {
    return {
      cart: [] as Product[],
      isAdmin: false,
      userId: null as unknown as string,
    }
  },
  actions: {
    async loadCart(userId: string) {
      const res = await fetch(`http://localhost:3000/getCart?userId=${userId}`)
      this.cart = await res.json()
    },

    async addProductToCart(product: Product) {
      const userId = this.userId
      product.count = 1
      this.cart.push(product)
      await fetch('http://localhost:3000/addToCart', {
        body: JSON.stringify({ productId: product.id, userId }),
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        method: 'POST',
      })
    },

    async clearCart(userId: string) {
      this.cart = []
      await fetch(`http://localhost:3000/buy?userId=${userId}`)
    },

    async deleteOneProduct(productId: string) {
      const ind = this.cart.findIndex(el => el.id == productId)
      this.cart.splice(ind, 1)
      await fetch(
        `http://localhost:3000/deleteOneProduct?userId=${this.userId}&productId=${productId}`,
        {
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          method: 'POST',
        }
      )
    },

    async increaseCount(product: Product) {
      // fixme
      if (product.count <= product.total_count_item) {
        product.count++
        product.total_count_item--
        await fetch(
          `http://localhost:3000/increaseCount?userId=${this.userId}&productId=${product.id}`,
          {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            method: 'POST',
          }
        )
      }
    },

    async decreaseCount(product: Product) {
      // fixme
      if (product.count > 1) {
        product.count--

        await fetch(
          `http://localhost:3000/decreaseCount?userId=${this.userId}&productId=${product.id}`,
          {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            method: 'POST',
          }
        )
      }
    },
  },
})
