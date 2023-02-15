<template>
	<div class="system-dept-dialog-container">
		
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="monitorDialogRef"   v-show="state.dialog.monitorShowEdit" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="设备名称">
                            <el-input v-model="state.ruleForm.name" placeholder="请输入负责人" clearable></el-input >
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="序列号">
							<el-input v-model="state.ruleForm.number" placeholder="请输入部门名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="设备Imei">
							<el-input v-model="state.ruleForm.imei" placeholder="请输入负责人" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="物联网卡号">
							<el-input v-model="state.ruleForm.cardno" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="通道">
							<el-input v-model="state.ruleForm.passage" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="类型">
                            <el-input v-model="state.ruleForm.type" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路径">
                            <el-input v-model="state.ruleForm.path" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户名">
                            <el-input v-model="state.ruleForm.username" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="密码">
                            <el-input v-model="state.ruleForm.pwd" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="图片">
                            <el-input v-model="state.ruleForm.picture" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="权限">
                            <el-input v-model="state.ruleForm.purview" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="备注">
                            <el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="创建时间">
                            <el-input v-model="state.ruleForm.createTime" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
            <el-form ref="monitorDialogRef"   v-show="state.dialog.monitorShow" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
                    <iframe
                        src="https://open.ys7.com/jssdk/theme.html?url=ezopen://open.ys7.com/J92806982/1.live&amp;accessToken=at.b5kb21foa7qf7d7190zufn903txxxgk6-8dw6pgt9ww-1hjiykk-o7874xsu6&amp;id=single-player-window&amp;isMobile=undefined&amp;autoplay=true&amp;header=false"
                        width="790"
                        height="320"
                        id="EZUIKitPlayer-single-player-window"
                        allowfullscreen="true"
                        allow="autoplay"
                        frameborder="0"
                        ></iframe>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">关 闭</el-button>
					<el-button type="primary" @click="onSubmit" v-show="state.dialog.submitButton" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemDeptDialog">
import { containsProp } from '@vueuse/shared';
import { reactive, ref } from 'vue';
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);
// 定义变量内容
const deptDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		name: '', // 设备名称
		number: '', // 序列号
		imei: '', // 设备Imei
		cardno: '', // 物联网卡号
		passage: '', // 通道
		type: '', // 类型
		path: '', // 路径
		username: '', // 用户名
        pwd: '', // 密码
		picture: '', // 图片
		purview: '', // 权限
		remark: '', // 备注
		createTime: '', // 创建时间
	},
	deptData: [] as DeptTreeType[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
        monitorShow:false,
        monitorShowEdit:false,
        submitButton:false
	},
   
});

// 打开弹窗
const openDialog = (type: string, row: RowDeptType) => {
	if (type === 'edit') {
		state.ruleForm = row;
        state.dialog.monitorShowEdit=true;
        state.dialog.monitorShow=false;
		state.dialog.title = '编 辑';
        state.dialog.submitButton=true
		state.dialog.submitTxt = '提 交';
	} if (type === 'monitor') {
        state.dialog.monitorShowEdit=false;
        state.dialog.monitorShow=true;
		state.ruleForm = row;
		state.dialog.title = '监 控';
        state.dialog.submitButton=false
	}
    else {
		// state.dialog.title = '监 控';
		// state.dialog.submitTxt = '监 控';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	deptDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	// getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
	emit('refresh');
	// if (state.dialog.type === 'add') { }
};
// 初始化部门数据
// const getMenuData = () => {
// 	state.deptData.push({
// 		deptName: '莱芝科技',
// 		createTime: new Date().toLocaleString(),
// 		status: true,
// 		sort: Math.random(),
// 		describe: '顶级部门',
// 		id: Math.random(),
// 		children: [
// 			{
// 				deptName: 'IT外包服务',
// 				createTime: new Date().toLocaleString(),
// 				status: true,
// 				sort: Math.random(),
// 				describe: '总部',
// 				id: Math.random(),
// 			},
// 			{
// 				deptName: '资本控股',
// 				createTime: new Date().toLocaleString(),
// 				status: true,
// 				sort: Math.random(),
// 				describe: '分部',
// 				id: Math.random(),
// 			},
// 		],
// 	});
// };

// 暴露变量
defineExpose({
	openDialog,
});
</script>
