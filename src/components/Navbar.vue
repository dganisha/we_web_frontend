<template>
  <nav class="navbar">
    <div class="navbar-left">
      <button @click="navigateBack">⬅ Back</button>
      <button @click="navigateForward">➡ Forward</button>
      <button @click="navigateUp">⬆ Up</button>
      <input
        type="text"
        readonly
        class="address-bar"
        placeholder="Current folder path"
      />
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
  props: {
    currentPath: {
      type: String,
      required: true,
    },
  },
  emits: ["navigate-back", "navigate-forward", "navigate-up"],
  setup(props, { emit }) {
    const navigateBack = () => {
      emit("navigate-back");
    };

    const navigateForward = () => {
      emit("navigate-forward");
    };

    const navigateUp = () => {
      emit("navigate-up");
    };

    return {
      navigateBack,
      navigateForward,
      navigateUp,
    };
  },
});
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-bottom: 1px solid #ddd;
  padding: 10px 15px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-left button {
  margin-right: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.navbar-left button:hover {
  background-color: #e6e6e6;
}

.address-bar {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
  font-size: 14px;
}
</style>
