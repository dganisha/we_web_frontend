<template>
  <footer class="footer">
    <p>Web Explorer</p>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style scoped>
.footer {
  background-color: #f3f3f3;
  border-top: 1px solid #ddd;
  padding: 10px 15px;
  text-align: center;
  font-size: 14px;
  color: #555;
}
</style>
