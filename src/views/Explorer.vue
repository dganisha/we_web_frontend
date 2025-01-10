<template>
  <div class="explorer">
    <!-- Navbar -->
    <Navbar
      :currentPath="currentPath"
      @navigate-back="navigateBack"
      @navigate-forward="navigateForward"
      @navigate-up="navigateUp"
    />

    <div class="explorer-body">
      <!-- Left Panel -->
      <div class="panel left">
        <h3>Folder Structure</h3>
        <FolderTree :folders="folders" @folder-selected="selectFolder" />
      </div>

      <!-- Right Panel -->
      <div class="panel right">
        <h3 v-if="selectedFolder">List File of {{ selectedFolder.name }}</h3>
        <ul v-if="subfolders.length > 0">
          <li v-for="subfolder in subfolders" :key="subfolder.id">
            {{ subfolder.name }}
          </li>
        </ul>
        <p v-else class="no-selection">No file available.</p>
      </div>
    </div>

    <!-- Footer -->
    <Footer :selectedFolder="selectedFolder" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import FolderTree from "../components/FolderTree.vue";
import axios from "axios";

export default defineComponent({
  name: "Explorer",
  components: { Navbar, Footer, FolderTree },
  setup() {
    const folders = ref([]);
    const selectedFolder = ref<any>(null);
    const subfolders = ref([]);
    const currentPath = ref("Root Folder");

    const fetchFolders = async () => {
      try {
        const response = await axios.get("/api/v1/folders");
        folders.value = response.data.data;
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    const selectFolder = async (folder: any) => {
      selectedFolder.value = folder;
      currentPath.value = folder.name;

      try {
        const response = await axios.get(
          `/api/v1/files?folder_id=${folder.id}`
        );
        subfolders.value = response.data.data;
      } catch (error) {
        console.error("Error fetching subfolders:", error);
      }
    };

    // Fungsi navigasi Navbar
    const navigateBack = () => {
      console.log("Back navigation not implemented yet.");
    };

    const navigateForward = () => {
      console.log("Forward navigation not implemented yet.");
    };

    const navigateUp = () => {
      if (selectedFolder.value && selectedFolder.value.parent_id) {
        const parentFolder = folders.value.find(
          (folder: any) => folder.id === selectedFolder.value.parent_id
        );
        if (parentFolder) {
          selectFolder(parentFolder);
        } else {
          console.warn("Parent folder not found.");
        }
      } else {
        console.warn("No parent folder available.");
      }
    };

    onMounted(fetchFolders);

    return {
      folders,
      selectedFolder,
      subfolders,
      currentPath,
      selectFolder,
      navigateBack,
      navigateForward,
      navigateUp,
    };
  },
});
</script>

<style scoped>
.explorer {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.explorer-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.panel.left {
  width: 30%;
  border-right: 1px solid #ddd;
  padding: 15px;
  background-color: #fff;
  overflow-y: auto;
}

.panel.right {
  width: 70%;
  padding: 15px;
  background-color: #f9f9f9;
  overflow-y: auto;
}

.no-selection {
  color: #666;
  font-size: 16px;
  text-align: center;
  padding: 20px;
  border: 1px dashed #ccc;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
