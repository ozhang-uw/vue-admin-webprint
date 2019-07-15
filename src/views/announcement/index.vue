<template>
  <div class="announcement-container">
    <el-tabs
      v-loading="listLoading"
      type="border-card"
    >
      <el-tab-pane label="admin">
        <div v-for="item of texts" :key="item.id">
          <div class="icon-item">
            <span>{{ item.id }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="editor">
        <div v-for="item of texts" :key="item.id">
          <div class="icon-item">
            <span>{{ item.id }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getText } from '@/api/announcement'

export default {
  data() {
    return {
      listLoading: true,
      texts: null
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getText().then(response => {
        this.texts = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.announcement-container{
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
