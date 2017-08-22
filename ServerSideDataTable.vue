<template>
  <div>
    <table-header
      @refresh="onRefresh"
      @search="onSearch"
      :loading="loading"
      :search-term="searchTerm"
      :search-label="internalConfig.labels.search"
    ></table-header>

    <q-data-table
      :columns="columns"
      :config="internalConfig"
      :data="data"
      ref="dataTable"
    ></q-data-table>

    <table-footer
      :page-number="pageData.pageNumber"
      :page-size="pageData.pageSize"
      :page-size-options="internalConfig.pageSizeOptions"
      :rows-per-page-label="internalConfig.labels.rowsPerPage"
      :total-elements="pageData.totalElements"
      :total-pages="pageData.totalPages"
      @pageChange="onPageChange"
      @pageSizeChange="onPageSizeChange"
    ></table-footer>
  </div>
</template>

<script>
import defaultConfig from './default-config'
import utils from 'src/utils/object-utils'
import SortDirection from './types/SortDirection'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'

let unwatchers = null

function translateSortDirection (numericSortDirection) {
  if (numericSortDirection === 1) {
    return SortDirection.ASCENDING
  } else if (numericSortDirection === -1) {
    return SortDirection.DESCENDING
  } else {
    return SortDirection.NONE
  }
}

export default {
  props: {
    columns: {
      type: Array,
      required: true
    },

    config: Object,

    data: {
      type: Array,
      required: true
    },

    error: Boolean,

    loading: Boolean,

    pageData: {
      type: Object,
      validator (obj) {
        const required = [
          'pageNumber',
          'pageSize',
          'sortColumn',
          'sortDirection',
          'totalElements',
          'totalPages'
        ]
        return required.every(field => obj.hasOwnProperty(field) && obj[field] != null)
      }
    },

    searchTerm: String
  },

  components: {
    TableFooter,
    TableHeader
  },

  created () {
    this.copyConfig()
  },

  mounted () {
    this.setupWatchers()
  },

  beforeDestroy () {
    this.teardownWatchers()
  },

  data () {
    return {
      internalConfig: {}
    }
  },

  watch: {
    config: {
      deep: true,
      handler (updatedConfig) {
        Object.assign(this.internalConfig, updatedConfig)
      }
    }
  },

  methods: {
    copyConfig () {
      this.internalConfig = Object.assign({}, utils.deepCopy(defaultConfig), this.config)
    },

    onPageChange (pageNumber) {
      this.$emit('pageChange', pageNumber)
    },

    onPageSizeChange (pageSize) {
      this.$emit('pageSizeChange', pageSize)
    },

    onSort (sortColumn, sortDirection) {
      this.$emit('sort', {
        sortColumn,
        sortDirection: translateSortDirection(sortDirection)
      })
    },

    onRefresh () {
      this.$emit('refresh')
    },

    onSearch (searchTerm) {
      this.$emit('search', searchTerm)
    },

    setupWatchers () {
      unwatchers = []
      // Must use instance method to watch $refs
      unwatchers.push(this.$watch(
        '$refs.dataTable.sorting',
        sortData => {
          const { field, dir } = sortData
          this.onSort(field, dir)
        },
        {
          deep: true
        }
      ))
    },

    teardownWatchers () {
      if (unwatchers.length) {
        unwatchers.forEach(unwatch => unwatch())
        unwatchers = null
      }
    }
  }
}
</script>
