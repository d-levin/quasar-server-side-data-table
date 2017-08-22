<!-- Example of implementing ServerSideDataTable -->
<template>
  <div class="card bg-white">
    <server-side-data-table
      :columns="columns"
      :data="data"
      :error="error"
      :loading="loading"
      :pageData="pageData"
      :search-term="searchTerm"
      @pageChange="onPageChange"
      @pageSizeChange="onPageSizeChange"
      @refresh="onRefresh"
      @search="onSearch"
      @sort="onSort"
    ></server-side-data-table>
  </div>
</template>

<script>
import Page from './Page'
import ServerSideDataTable from './ServerSideDataTable'

export default {
  components: { ServerSideDataTable },

  data () {
    return {
      searchTerm: '',
      loading: false,
      error: false,
      columns: [
        { label: 'Name', field: 'name', sort: true },
        { label: 'IDSA server', field: 'idsaServerName', sort: true }
      ],
      data: [
        { name: 'A', idsaServerName: 'A' },
        { name: 'B', idsaServerName: 'B' },
        { name: 'C', idsaServerName: 'C' },
        { name: 'D', idsaServerName: 'D' },
        { name: 'E', idsaServerName: 'E' },
        { name: 'F', idsaServerName: 'F' },
        { name: 'G', idsaServerName: 'G' },
        { name: 'H', idsaServerName: 'H' },
        { name: 'I', idsaServerName: 'I' },
        { name: 'J', idsaServerName: 'J' },
        { name: 'K', idsaServerName: 'K' },
        { name: 'L', idsaServerName: 'L' },
        { name: 'M', idsaServerName: 'M' }
      ],
      pageData: new Page({
        pageNumber: 1,
        pageSize: 15,
        sortColumn: '',
        sortDirection: '',
        totalElements: 0,
        totalPages: 10
      })
    }
  },

  methods: {
    onPageChange (pageNumber) {
      console.log('changing page number')
      this.pageData.pageNumber = pageNumber
    },

    onPageSizeChange (pageSize) {
      console.log('changing rows per page')
      this.pageData.pageSize = pageSize
    },

    onSort ({ sortColumn, sortDirection }) {
      console.log('sortColumn', sortColumn)
      console.log('sortDirection', sortDirection)
    },

    onRefresh () {
      console.log('refreshing')
    },

    onSearch (searchTerm) {
      console.log('searching', searchTerm)
      this.searchTerm = searchTerm
    }
  }
}
</script>
