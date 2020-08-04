<template>
    <div class="progress-entry">
        progress组件
        <svg style="width:0;height:40px;">
            <defs>
                <circle id="test-star" stroke="none" cx="15" cy="25" r="10" />
                <image id="test-shape-1" width="30" height="50" xlink:href="./assets/star.png" />
                <image id="test-shape-2" width="30" height="50" xlink:href="./assets/star-active.png" />
            </defs>
        </svg>
        <div class="progress-entry-box">
            <!-- <progress v-bind="rightAside" style="margin: 0 auto;" /> -->
            <progress-svg v-bind="rightAside" />
            <progress-svg v-bind="rightAside" :direction="'left'" :angle="0" />
            <progress-svg v-bind="rightAside" :direction="'left'" :angle="30" />
            <progress-svg v-bind="rightAside" :angle="0" :pattern-id="'test-star'" />
            <progress-svg v-bind="rightAside" :angle="0" :pattern-id="'test-shape-2'" :inactive-pattern-id="'test-shape-1'" />
            <progress-svg v-bind="rightAside" :rate="1" :charge-speed="0.2" :angle="30" :color="gradientColor" />
        </div>
        <div class="progress-entry-box" style="display:flex;">
           <progress-svg v-bind="otherObj" :angle="0" />
           <progress-svg v-bind="otherObj" :angle="0" style="margin: 0 20px;">
               <template v-slot="slotProps">
                   {{slotProps}}test
               </template>
           </progress-svg>
        </div>
    </div>
</template>
<script>
import progressSvg from './index.vue'
export default {
    name: 'progressEntry',
    components: { progressSvg },
    data() {
        return {
            rightAside: {
                width: 400,
                height: 56,
                value: 30,
                max: 100,
                num: 12,
                rate: 0.5,
                margin: {x: 3, y: 3},
                itemGap: 0.2,
                angle: -30,
                radius: 0,
                baseColor: '#eee',
                direction: 'right',
                filterBlur: 1,
                filterLevel: 1,
                filterOpacity: 0.8,
                color: [
                    {value: 0, color: '#ffae00'},
                    {value: 1, color: '#ffae00'}
                ],
                chargeWay: 'length',
                chargeSpeed: 0.4 // 动画加载时间（单位：秒）
            },
            otherObj: {
                height: 400,
                width: 56,
                value: 30,
                max: 100,
                num: 12,
                rate: 0.8,
                margin: {x: 3, y: 3},
                itemGap: 0.2,
                angle: -30,
                radius: 0,
                baseColor: '#eee',
                direction: 'top',
                filterBlur: 1,
                filterLevel: 1,
                filterOpacity: 0.8,
                color: [
                    {value: 0, color: '#ff0000'},
                    {value: 0.5, color: '#ffae00'},
                    {value: 0.8, color: '#4ccf83'}
                ],
                chargeWay: 'length',
                chargeSpeed: 0.4 // 动画加载时间（单位：秒）
            },
            breatheFlag: true,
            gradientColor: [
                {value: 0, color: '#302114'},
                {value: 1, color: '#ffae00'}
            ]
        }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.progress-entry {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
    &-box {
        width: 48%;
        height: 90%;
        margin: 5% auto;
        display: inline-block;
    }
}
</style>
