<template>
  <div class="treeXmind-entry">
    treeXmind组件
    <treeXmind />
  </div>
</template>
<script>
import treeXmind from './index.vue'
export default {
  name: 'treeXmindEntry',
  components: { treeXmind },
  data() {
    return {
      tmpData: [
        {
          label: '1111',
          value: '11111',
          children: [
            {
              label: '222',
              value: '222',
              children: [
                {
                  label: '222-1111',
                  value: '222-222'
                }
              ]
            },
            {
              label: '333',
              value: '333',
              children: [
                {
                  label: '222-1111',
                  value: '222-222'
                },
                {
                  label: '222-1111',
                  value: '222-222'
                }
              ]
            },
            {
              label: '44',
              value: '44',
              children: [
                {
                  label: '222-1111',
                  value: '222-222'
                },
                {
                  label: '222-1111',
                  value: '222-222'
                },
                {
                  label: '222-1111',
                  value: '222-222'
                }
              ]
            },
            {
              label: '555',
              value: '555',
              children: [
                {
                  label: '222-1111',
                  value: '222-222'
                },
                {
                  label: '222-1111',
                  value: '222-222'
                },
                {
                  label: '222-1111',
                  value: '222-222'
                }
              ]
            }
          ]
        }
      ],
      treeData: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initData()
    this.init(this.tmpData)
  },
  methods: {
    init(data) {
      for(const i of data){
        this.handleLoop(i)
      }
      console.log("🚀 ~ file: entry.vue ~ line 95 ~ init ~ data", data)
    },
    initData() {
      this.treeData.splice(0, this.treeData.length, ...this.tmpData)
      let len1 = 0
      let len2 = 0
      for (const i of this.treeData) {
        if (i.children) {
          for (let index = 0; index < i.children.length; index++) {
            const j = i.children[index]
            j.childLen = len2
            len2 += Math.max(1, j.children.length)
            if (j.children) {
              for (const k of j.children) k.childLen = len1
              len1 += j.children.length
            }
          }
        }
      }
      console.log(this.treeData, '11111', this.tmpData)
    },
    // 累加上级的children个数
    handleLoop(o,len1 = 0,len2 = 0){
      if(Array.isArray(o)) return false
      if(typeof o === 'object' && o && Object.keys(o).length && o.children){
        for(let i = 0; i< o.children.length; i++){
          const j = o.children[i]
          j.len = len2
          len2 += Math.max(1,j.children.length)
          if(j.children){
            len1+=j.children.length
            for(const k of j.children) {
              k.len = len1
              this.handleData(k,len1,len2)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.treeXmind-entry {
  width: 100%;
  height: 100%;
}
</style>
