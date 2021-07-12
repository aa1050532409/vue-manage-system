<template>
  <el-table :data="tableData" style="width: 100%" border stripe type=index>
    <el-table-column :index="0" :key="0" type="index" label="#"></el-table-column>
    <el-table-column :index="index+1" :key="index+1" v-for="(item, index) in label" :label="item" :prop="prop[index]"></el-table-column>
    <slot name="state"></slot>
    <slot name="operate"></slot>
  </el-table>
</template>

<script>
  export default {
    name: "TableColumn",
    data() {
      return {
        currentPage: 1
      }
    },
    props: {
      label: Array,
      prop: Array,
      tableData: Array
    },
  }
</script>

<style scoped>

</style>
