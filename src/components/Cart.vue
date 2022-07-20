<template>
  <div class="cart-list">
    <div v-for="(item,ind) in spisok_dlya_rendera" :key="ind" >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
  },
  computed: {
      spisok_dlya_rendera() {
          return this.cart
      },
  },
};
</script>