<template>
  <el-container id="app">
    <el-aside width="300px" class="aside">
      Toolbox
      <draggable
        class="dragArea list-group"
        :list="getListCards"
        :group="{ name: 'listCard', pull: 'clone', put: false }"
        :clone="onCopyDrop"
      >
        <div class="list-group-item" v-for="elem in getListCards" :key="elem.id">
          <GenericCard :org="elem"/>
        </div>
      </draggable>
    </el-aside>
    <el-main>
      Drag and drop
      <div class="group">
        <draggable
        class="dragArea list-group"
        :list="getNewList"
        group="listCard"
      >
        <div class="list-group-item" v-for="elem in getNewList" :key="elem.id">
          <GenericCard :org="elem"/>
        </div>
      </draggable>
      </div>
    <!-- <el-footer>Footer</el-footer> -->
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import _ from 'lodash';
import GenericCard from './components/GenericCard'

export default {
  name: 'App',
  components: {
    GenericCard,
    draggable
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getListCards: "getListCards",
      getNewList: "getNewList"
    })
  },
  methods: {
    ...mapMutations({
      setNewList: "setNewList"
    }),
    filterList(id){
      return _.filter(this.getListCards, function(o) { return o.id === id })[0]
    },
    onCopyDrop({id}) {
      let item = this.filterList(id)
      this.getNewList.push({
        name: item.name,
        text: item.text,
        type: item.type,
        elem: item.elem,
        id: Math.floor(Math.random() * 256),
        list: 2,
        check: item.check
      })
      this.$store.commit('setNewList', this.getNewList)
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100vh;
  border: 1px solid #eee;
}

.aside {
  background-color: rgb(238, 241, 246);
  padding: 50px 15px 0;
}

.group {
  display: flex;
  height: 100%;
  margin-top: 20px;
}

.copy {
  display: inline-block;
  position: relative;
  flex: 1;
}

.not-input input.el-input__inner {
  background: none;
  border: none;
  padding: 0px;
}

/* .bb {
  border-bottom: 3px gray dotted;
  padding-bottom: 30px ;
}

.pt {
  padding-top: 30px;
}

.new {
  padding: 25px;
  resize: both;
  overflow: auto;
}

.new:hover {
  cursor: crosshair;
  border: 1px gray dotted;
}

.new-input {
  width: 60vh;
}

.new-check {
  width: 30vh;
}
.new-button {
  width: 20vh;
}

.name {
  padding-bottom: 20px;
} */

.aligh-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.active-close:hover {
  display: block;
}

.active-close {
  display: none;
}

.el-button {
  border: none !important;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

</style>
