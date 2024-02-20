<script setup>
</script>

<template>
  <div>
    <ul
        class="mt-3 d-flex p-4 justify-content-around"
        style="background-color: #ccc"
    >
      <li>
        <router-link to="/admin/category">Quản lý danh mục</router-link>
      </li>
      <li>
        <router-link to="/admin/product">Quản lý sản phẩm</router-link>
      </li>
      <li>
        <router-link to="/admin/bill">Quản lý đơn hàng</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
