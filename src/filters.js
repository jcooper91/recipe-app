const filters = {
    searchText: ''
}

const getFilters = () => filters

const updateFilters = (updates) => {

    if(typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
}

export { getFilters, updateFilters }