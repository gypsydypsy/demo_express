class RepositoryInterface {
    async create(data){ throw new Error('create() not implemented')}
    async getAll(){ throw new Error('getAll() not implemented')}
    async findById(id){ throw new Error('findById() not implemented')}
    async update(id){ throw new Error('update() not implemented')}
    async delete(id){ throw new Error('delete() not implemented')}
}

module.exports = RepositoryInterface