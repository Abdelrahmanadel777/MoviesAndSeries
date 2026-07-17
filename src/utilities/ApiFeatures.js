
export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery
    }
    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        if (pageNumber < 1) pageNumber = 1
        let limit = 2
        let skip = parseInt((pageNumber - 1) * limit)
        this.mongooseQuery.skip(skip).limit(limit)
        this.pageNumber = pageNumber

        return this
    }
    filter() {
        let objFilter = structuredClone(this.searchQuery)
        let arrayFilter = ['page', 'sort', 'fields', 'search']
        arrayFilter.map((ele) => delete objFilter[ele])
        let updatedObj = JSON.stringify(objFilter)
        updatedObj = updatedObj.replace(/(lt|lte|gt|gte)/g, val => '$' + val)
        updatedObj = JSON.parse(updatedObj)
        this.mongooseQuery.find(updatedObj)
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let field = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(field)
        }
        return this
    }
    sort() {
        if (this.searchQuery.sort) {
            let sort = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sort)
        }
        return this
    }
    search() {
        if (this.searchQuery.search) {
            
            this.mongooseQuery.find({
                $or: [
                    { comment: { $regex: this.searchQuery.search, $options: "i" } },
                    // { description: { $regex: this.searchQuery.search, $options: "i" } }
                ]
            })
        }
        return this
    }

}