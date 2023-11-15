<template>
    <div class="top">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: center">
          <i
            class="el-icon-back"
            style="float: left; cursor: pointer;color: #fff;"
            @click="reback(1)"
          ></i>
          <span style="color: #ffffff; font-weight: 800">{{
            tableChange ? teamInfo.name + "成员详情" : "团队top10"
          }}</span>
        </div>

        <el-table
          v-if="tableChange"
          :data="teamInfo?.data"
          style="width: 100%; background-color: transparent; color: #fff"
        >
          <el-table-column prop="loginName" label="成员用户名" width="160">
          </el-table-column>
          <el-table-column prop="activeNum" label="活跃度" width="90">
          </el-table-column>
          <el-table-column prop="grade" label="评级"> </el-table-column>
          <el-table-column prop="score" label="分数"> </el-table-column>
        </el-table>

        <el-table
          v-else
          :data="dataTop"
          style="width: 100%; background-color: transparent; color: #fff"
        >
          <el-table-column prop="name" label="团队名称" width="160">
          </el-table-column>
          <el-table-column prop="active" label="团队活跃度" width="160">
          </el-table-column>
          <el-table-column prop="data.length" label="团队人数">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    }
}
</script>
<style scoped>
</style>