<template>
  <div>

    <div v-if="org.type === 'input'" class="pt" :class="active ? 'new new-input' : 'bb'">
      <div v-for="i in org.elem" :key="i">
        <div :class="active ? 'aligh-top' : '' ">
          <el-input v-model="org.name" class="not-input"></el-input>
          <el-button plain icon="el-icon-close" @click="delet(org.id)" v-if="active"></el-button>
        </div>
        <el-input></el-input>
      </div>
    </div>

    <div v-if="org.type === 'check'" class="pt" :class="active ? 'new new-check' : 'bb'">
      <div :class="active ? 'aligh-top' : '' ">
        <el-input v-model="org.name" class="not-input"></el-input>
        <el-button plain icon="el-icon-close" @click="delet(org.id)" v-if="active"></el-button>
      </div>
      <div v-for="i, index in org.check" :key="index" class="item">
        <div>
          <el-checkbox>
            <el-input v-model="i.name" class="not-input"></el-input>
          </el-checkbox>
        </div>
        <el-button icon="el-icon-close" @click="close(index, org.id)" v-if="active"></el-button>
      </div>
      <el-button type="text" @click="insert(org.id)" v-if="active"> Incluir </el-button>
    </div>

    <div v-if="org.type === 'button'" class="pt" :class="active ? 'new new-button' : ''">
      <div :class="active ? 'aligh-top' : '' ">
        <el-input v-model="org.name" class="not-input"></el-input>
        <el-button class="el-icon-close" @click="delet(org.id)" v-if="active"></el-button>
      </div>
      <div v-for="i in org.elem" :key="i">
        <el-button plain :style="{background: `${background}`, color: `${color}`}">
          <el-input v-model="org.text" class="not-input"></el-input>
        </el-button>
      </div>
    </div>

   </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from 'lodash';

export default {
  props:{
    org: Object
  },
  data() {
    return {
      color: 'white',
      background: 'black'
    }
  },
  computed: {
    ...mapGetters({
      getNewList: "getNewList"
    }),
    active() {
      return this.org.list === 2
    },
    name: {
      get () { return this.org.name; },
      set (value) { console.log('o', value); this.$store.commit('updateName', value)}
    }
  },
  methods: {
    ...mapMutations({
      setNewList: "setNewList",
      updateName: "updateName"
    }),
    filterIndex(id){
      return _.findIndex(this.getNewList, function(o) { return o.id == id; })
    },
    delet(id) {
      let indice = this.filterIndex(id)
      this.getNewList.splice(indice, 1);
    },
    insert(id) {
      let elem = this.filterIndex(id)
      elem = this.getNewList[elem]
      elem.elem++
      elem.check.push({
        name: "opção " + Math.floor(Math.random() * 256),
        status: false
      })
      this.$store.commit('setNewList', this.getNewList)
    },
    close(index, id) {
      let elem = this.filterIndex(id)
      elem = this.getNewList[elem]
      elem.check.splice(index, 1)
      this.$store.commit('setNewList', this.getNewList)
    }
  }
}
</script>

<style>
.bb {
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
}

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