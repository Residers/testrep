<template>
  <div class="product-list">
    <div
      class="card"
      v-for="product in products"
      :key="product.id"
      :style="{ width: cardsWidth + '%' }"
    >
      <p class="card-title">{{ product.title }}</p>
      <img class="card-image" :src="product.image" alt="" />
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>
      <div>
        <input type="number" v-model="amount[product.id]" :id="product.id" />
        <span>кг</span>
      </div>
      <button @click="addToCart(product)">В корзину</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    currency: String,
  },
  data() {
    return {
      cardsWidth: 25,
      trueWidth: 100,
      amount: {},
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.data,
    }),
  },

  methods: {
    setCardsWidth() {
      let width = window.innerWidth;
      let count = 1;
      if (width > 840) {
        count = 3;
      } else if (width > 420 && width < 840) {
        count = 2;
      }
      this.cardsWidth = 100 / count;
    },
    startPricesMonitoring() {
      setInterval(this.getList, 2000);
    },
    getList() {
      this.$store.dispatch("getProductsList");
    },
    addToCart(product) {
      let amount = this.amount[product.id];
      let data = {
        amount,
        price: product.price,
        title: product.title,
      };
      this.$parent.cart.unshift(data);
    },
  },
  created() {
    this.startPricesMonitoring();
    window.addEventListener("resize", this.setCardsWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.setCardsWidth);
  },
};
</script>

<style>
.product-list {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
}

.card {
  display: inline-block;

  border: 1px solid #908888;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
}
.card-image {
  width: 100%;
}
button {
  padding: 5px;
  margin: 5px;
}
</style>
