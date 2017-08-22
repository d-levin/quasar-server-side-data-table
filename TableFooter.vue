<template>
  <div class="row wrap justify-end items-baseline padding-footer">
    <div class="auto">
      <small class="text-faded">{{ rowsPerPageLabel }}</small>
      <q-select
        :options="internalPageSizeOptions"
        :value="pageSize"
        @input="onPageSizeChange"
        class="text-right"
        type="list"
      ></q-select>
    </div>

    <div v-if="numberOfElementsInfo" class="auto text-center">
      <small class="text-faded">{{ numberOfElementsInfo }}</small>
    </div>

    <div class="auto text-right">
      <q-pagination
        :max="internalTotalPages"
        :value="pageNumber"
        @input="onPageChange"
      ></q-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      required: true
    },

    pageSizeOptions: {
      type: Array,
      required: true,
      validator (arr) {
        return arr.length > 0
      }
    },

    pageNumber: {
      type: Number,
      required: true
    },

    totalPages: {
      type: Number,
      required: true
    },

    totalElements: {
      type: Number,
      required: true
    },

    rowsPerPageLabel: {
      type: String,
      default: 'Rows per page'
    }
  },

  methods: {
    onPageChange (pageNumber) {
      this.$emit('pageChange', pageNumber)
    },

    onPageSizeChange (pageSize) {
      this.$emit('pageSizeChange', pageSize)
    }
  },

  computed: {
    numberOfElementsInfo () {
      return this.totalElements ? `${this.start} - ${this.end} / ${this.totalElements}` : null
    },

    internalPageSizeOptions () {
      return this.pageSizeOptions.map(option => {
        return {
          label: option.toString(),
          value: option
        }
      })
    },

    internalTotalPages () {
      return this.totalPages ? this.totalPages : 1
    },

    start () {
      return (this.pageNumber - 1) * this.pageSize + 1
    },

    end () {
      if (this.pageNumber === this.max || this.pageSize === 0) {
        return this.totalElements
      }
      return this.pageNumber * this.pageSize
    },

    max () {
      return Math.max(1, Math.ceil(this.totalElements / this.pageSize))
    }
  }
}
</script>

<style lang="stylus" scoped>
.padding-footer
  padding 0.5rem 1rem
</style>
