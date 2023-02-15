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
                <el-table-column prop="name" label="设备名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="number" label="序列号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="imei" label="设备Imei" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cardno" label="物联网卡号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="passage" label="通道" show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="path" label="路径" show-overflow-tooltip></el-table-column>
                <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pwd" label="密码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="picture" label="图片" show-overflow-tooltip></el-table-column>
                <el-table-column prop="purview" label="权限" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                            <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
                            @click="onOpenEditMonitor('edit', scope.row)">编辑</el-button>
                            <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
                            @click="onRowMonitor('monitor',scope.row)">监控</el-button>
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
        <UserDialog ref="monitorDialogRef" @refresh="getTableData()" />
    </div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import useMonitor from '/@/api/monitor/monitor';



// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/menu/menu3/menu31/dialog.vue'));

// 定义变量内容

const monitorDialogRef = ref();
const state = reactive<SysUserState1>({
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
    const res = await useMonitor.useMonitorApi()
    const data1 = [];
    console.log(res)
    for (let i = 0; i < res.data.list.length; i++) {
        data1.push({
            name: res.data.list[i].name,
            number: res.data.list[i].number,
            imei: res.data.list[i].imei,
            cardno: res.data.list[i].cardno,
            passage: res.data.list[i].passage,
            type: res.data.list[i].type,
            path: res.data.list[i].path,
            username: res.data.list[i].username,
            pwd: res.data.list[i].pwd,
            picture: res.data.list[i].picture,
            purview: res.data.list[i].purview,
            remark: res.data.list[i].remark,
            createTime: res.data.list[i].createTime,
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
// 打开编辑菜单弹窗
const onOpenEditMonitor = (type: string, row: DeptTreeType) => {
	monitorDialogRef.value.openDialog(type, row);
};
// 打开监控菜单弹窗
const onRowMonitor = (type: string, row: DeptTreeType) => {
	monitorDialogRef.value.openDialog(type, row);
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
