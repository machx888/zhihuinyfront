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
                <el-table-column prop="name" label="基地简称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="number" label="基地编号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fullName" label="基地全称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="functionary" label="基地负责人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="phone" label="电话" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="基地地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="area" label="面积" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="启用状态" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.status">启用</el-tag>
                        <el-tag type="info" v-else>禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="elevation" label="海拔" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                

                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
                            @click="onOpenEditUser('edit', scope.row)">修改</el-button>
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
import jidi from '/@/api/jidi/jidi';



// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/menu/menu2/menu21/indexad.vue'));

// 定义变量内容

const userDialogRef = ref();
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
    const res = await jidi.usejidiApi()
    console.log(res.data.list)
    const data1 = [];
    for (let i = 0; i < res.data.list.length; i++) {
        data1.push({
            name: res.data.list[i].name,
            number: res.data.list[i].number,            
            fullName: res.data.list[i].fullName,
            functionary: res.data.list[i].functionary,
            phone: res.data.list[i].phone,
            address: res.data.list[i].address, //基地地址
            area: res.data.list[i].area,
            elevation: res.data.list[i].elevation,
            remark: res.data.list[i].remark,
            status: res.data.list[i].status,
            createTime: res.data.list[i].createTime,//创建时间
            id: res.data.list[i].id,
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
