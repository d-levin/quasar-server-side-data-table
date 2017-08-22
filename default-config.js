import Vue from 'vue'
import titleize from 'src/filters/titleize'

const defaultConfig = {
  rowHeight: '50px',
  title: '',
  bodyStyle: {
    maxHeight: '500px'
  },
  responsive: true,
  pageSizeOptions: [ 5, 10, 15, 30, 50, 500 ],
  selection: 'single',
  messages: {
    noData: `<i>warning</i> ${Vue.t('noDataAvailable')}`,
    noDataAfterFiltering: `<i>warning</i> ${Vue.t('noSearchResults')}`
  },
  labels: {
    columns: titleize(Vue.tc('column')),
    allCols: titleize(Vue.t('allColumns')),
    rows: titleize(Vue.tc('row')),
    rowsPerPage: titleize(Vue.t('rowsPerPage')),
    selected: {
      singular: `${Vue.t('itemSelected')}.`,
      plural: `${Vue.t('itemsSelected')}.`
    },
    clear: titleize(Vue.t('clear')),
    search: titleize(Vue.t('search')),
    all: titleize(Vue.t('all'))
  }
}

export default defaultConfig
