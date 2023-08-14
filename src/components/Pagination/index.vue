<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('pageNoInfo', pageNo - 1)">上一页</button>
        <button @click="$emit('pageNoInfo', 1)" :class="{ active: pageNo == 1 }">1</button>
        <button v-if="startNumAndendNum.start >= 2">···</button>

        <button v-for="(item, index) in startNumAndendNum.end" v-if="item > startNumAndendNum.start"
            @click="$emit('pageNoInfo', item)" :class="{ active: pageNo == item }">{{ item }}</button>
        <!-- 8 9 10 -->
        <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndendNum.end < totalPage" @click="$emit('pageNoInfo', totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('pageNoInfo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    mounted() {
        console.log('奇数', this.continues);
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startNumAndendNum() {
            const { pageNo, continues, totalPage } = this;
            let start = 0, end = 0;
            // 不正常现象，当连续的条数大于当前页码
            // 5 > 4 
            if (continues > totalPage) {
                console.log("测试测试测试1", continues > totalPage);
                start = 1
                end = totalPage
                return { start, end }
            } else {
                console.log("测试测试测试2");
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)

                // 不正常现象   开始页码小于1
                if (start < 1) {
                    start = 1
                    end = continues
                }
                // 不正常现象  结束页码大于总页码
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }
                return { start, end }
            }
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>