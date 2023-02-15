<template>
    <div class="system-user-container layout-padding">
        <el-card shadow="hover" class="layout-padding-auto">
            <div class="system-user-search mb15">
                <el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
                <el-button size="default" type="primary" class="ml10">
                    <el-icon>
                        <ele-Search />
                    </el-icon>
                    查询
                </el-button>
                <el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
                    <el-icon>
                        <ele-FolderAdd />
                    </el-icon>
                    新增用户
                </el-button>
            </div>
            <el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
                <el-table-column type="index" label="序号" width="60" />
                <!-- <el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="recordTime" label="记录时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="imei" label="设备编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="hum" label="空气湿度(%RH)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="term" label="空气温度(℃)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="windSpeed" label="风速(m/s)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="wdir" label="风向值" show-overflow-tooltip></el-table-column>
                <el-table-column prop="wdirzStr" label="风向" show-overflow-tooltip></el-table-column>
                <el-table-column prop="airPressure" label="大气压强(Pa)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="hv" label="光照强度(lx)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="currentRainfall" label="降雨量(mm)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="soilTerm" label="土壤温度(℃)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="soilHum" label="土壤湿度(%)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="conductivity" label="电导率(uS/cm)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                            <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
                            @click="onRowDel(scope.row)">详情</el-button>
                        <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
                            @click="onRowDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
                :pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.tableData.param.pageNum"
                background v-model:page-size="state.tableData.param.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="state.tableData.total">
            </el-pagination>
        </el-card>
        <UserDialog ref="userDialogRef" @refresh="getTableData()" />
    </div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import meteorology from '/@/api/equipment/meteorology';



// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/menu/menu2/menu21/indexad.vue'));

// 定义变量内容

const userDialogRef = ref();
const state = reactive<Meteorology>({
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,
        },
    },
});

// 初始化表格数据
const getTableData = async () => {
    state.tableData.loading = true;
    const res = await meteorology.UserMeteorology()
    console.log(res.data.list)
    const data1 = [];
    for (let i = 0; i < res.data.list.length; i++) {
        data1.push({
            airPressure: res.data.list[i].airPressure,
            conductivity: res.data.list[i].conductivity,
            createTime: res.data.list[i].createTime,
            currentRainfall: res.data.list[i].currentRainfall,
            hum: res.data.list[i].hum,
            hv: res.data.list[i].hv,
            id: res.data.list[i].id,
            imei: res.data.list[i].imei,
            recordTime: res.data.list[i].recordTime,
            soilHum: res.data.list[i].soilHum,
            soilTerm: res.data.list[i].soilTerm,
            term: res.data.list[i].term,
            wdir: res.data.list[i].wdir,
            wdirzStr: res.data.list[i].wdirzStr,
            windSpeed: res.data.list[i].windSpeed,
        });
    }
    state.tableData.data = data1;
    state.tableData.total = state.tableData.data.length;
    setTimeout(() => {
        state.tableData.loading = false;
    }, 500);
};

// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
    userDialogRef.value.openDialog(type);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
    userDialogRef.value.openDialog(type, row);
};
// 删除用户
const onRowDel = (row: RowUserType) => {
    ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            getTableData();
            ElMessage.success('删除成功');
        })
        .catch(() => { });
};
// 分页改变
const onHandleSizeChange = (val: number) => {
    state.tableData.param.pageSize = val;
    getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
    state.tableData.param.pageNum = val;
    getTableData();
};
// 页面加载时
onMounted(() => {
    getTableData();
});
</script>

<style scoped lang="scss">
.system-user-container {
    :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: auto;

        .el-table {
            flex: 1;
        }
    }
}
</style>
