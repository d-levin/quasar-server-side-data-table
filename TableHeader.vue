<template>
  <div class="row wrap justify-end padding-header">
    <div class="auto">
      <q-search
        :debounce="500"
        :value.lazy="searchTerm"
        @input="onSearch"
        @keyup.enter.native="onSearch($event.target.value)"
        ref="searchField"
      ></q-search>
    </div>
    <div>
      <button v-if="!loading" class="primary clear" @click="onRefresh">
        <i>refresh</i>
      </button>
      <button v-if="loading" class="disabled">
        <i class="animate-spin-reverse">cached</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    searchLabel: String,
    searchTerm: String
  },

  mounted () {
    this.setSearchPlaceholder()
  },

  methods: {
    // Handle bug in q-search component that prevents placeholder attr from displaying
    setSearchPlaceholder () {
      let element = this.$refs.searchField.$el.querySelector('.q-search-input')
      if (element) {
        element.placeholder = this.searchLabel
      }
    },

    onSearch (value) {
      this.$emit('search', value)
    },

    onRefresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="stylus" scoped>
.padding-header
  padding 1rem
</style>
