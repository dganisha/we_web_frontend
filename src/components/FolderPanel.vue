<template>
  <div>
    <h3 v-if="parentFolderName">Subfolders of {{ parentFolderName }}</h3>
    <ul v-if="subfolders.length > 0">
      <li v-for="folder in subfolders" :key="folder.id">{{ folder.name }}</li>
    </ul>
    <p v-else>No subfolders available.</p>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import axios from "axios";

export default defineComponent({
  name: "FolderPanel",
  props: {
    parentFolder: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const subfolders = ref([]);
    const parentFolderName = ref("");

    const fetchSubfolders = async () => {
      if (props.parentFolder) {
        parentFolderName.value = props.parentFolder.name;
        const response = await axios.get(
          `/api/v1/folders?parent_id=${props.parentFolder.id}`
        );
        subfolders.value = response.data.data;
      }
    };

    watch(() => props.parentFolder, fetchSubfolders);

    return { subfolders, parentFolderName };
  },
});
</script>
