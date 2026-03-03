<script setup>
// assets
import imageEmpty from '@/assets/images/e-commerce/empty.png';

// icons
import {RightOutlined} from '@ant-design/icons-vue';
</script>

<template>
  <v-card variant="outlined" class="bg-surface">
    <v-card-text>
      <v-row class="justify-center align-center text-lg-start text-center pt-16 pb-6">
        <v-col lg="6" md="8" cols="8">
          <v-img :src="imageEmpty" alt="cover" width="80%" class="ml-lg-16 ml-auto mr-md-0 mr-auto" />
        </v-col>
        <v-col lg="6" md="8" cols="12">
          <h1 class="text-lg-h1 text-h3 mb-1">Add items to your cart</h1>
          <p class="text-h5 text-lightText">Explore around to add items in your shopping bag.</p>
          <v-btn class="mt-3" to="/ecommerce/products" variant="flat" size="large" color="primary">
            Explore your bag
            <template #append>
              <RightOutlined />
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
