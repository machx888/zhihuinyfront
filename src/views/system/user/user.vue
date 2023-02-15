<template>
    <div>

    </div>
</template>

<script>
import { useUserApi } from '/@/api/uesr/user';

export default {

    data() {
        return {
            isAllShop: [],//定义空数组
        }
    },
    created() {
        this.getShops()//调用getShops函数
    },
    methods: {
        async getShops() { //异步  async与await
            const res = await AllShops()
            this.isAllShop = res.data//将后端获取的数据赋值给isAllShop空数组
            console.log(res.data)//空数组输出获得的数据
        }
    },
}
</script>