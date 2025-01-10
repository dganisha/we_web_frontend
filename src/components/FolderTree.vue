<template>
  <ul class="folder-tree">
    <li v-for="folder in folders" :key="folder.id">
      <div class="folder-item" @click="toggleFolder(folder)">
        <span class="folder-icon">
          <span v-if="folder.isOpen">[-]</span>
          <span v-else>[+]</span>
        </span>
        <span class="folder-name" @click.stop="selectFolder(folder)">
          {{ folder.name }}
        </span>
      </div>
      <FolderTree
        v-if="folder.isOpen && folder.children && folder.children.length > 0"
        :folders="folder.children"
        @folder-selected="selectFolder"
      />
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FolderTree",
  props: {
    folders: { type: Array, required: true },
  },
  emits: ["folder-selected"],
  setup(props, { emit }) {
    const toggleFolder = (folder) => {
      folder.isOpen = !folder.isOpen;
    };

    const selectFolder = (folder) => {
      emit("folder-selected", folder);
    };

    return { toggleFolder, selectFolder };
  },
});
</script>

<style scoped>
.folder-tree {
  list-style-type: none;
  padding-left: 15px;
}

.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
}

.folder-item:hover {
  background-color: #f0f0f0;
}

.folder-icon {
  margin-right: 5px;
  color: #555;
}

.folder-name {
  font-weight: bold;
  color: #007bff;
}

.folder-name:hover {
  text-decoration: underline;
}
</style>
