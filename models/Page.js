export default class Page {
  constructor ({
    pageNumber,
    pageSize,
    sortColumn,
    sortDirection,
    totalElements,
    totalPages
  } = {}) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.sortColumn = sortColumn
    this.sortDirection = sortDirection
    this.totalElements = totalElements
    this.totalPages = totalPages
  }
}
