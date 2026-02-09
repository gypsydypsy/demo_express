const RepositoryInterface = require("../RepositoryInterface");

class RepositoryBase extends RepositoryInterface {
    constructor(model) {
        super();
        this.model = model;
    }
    async create(data) {
        try {
            return await this.model.create(data);
        } catch (err) {
            throw new Error(err);
        }
    }
    async getAll(query) {
        try {

            let options = {}
            
            if(Object.keys(query).length){
                options.where = {}; 

                Object.keys(query).forEach( entry => {
                    options.where[entry] = query[entry]
                })
            }

            /* ex: find({ where: { email: "lorem@ipsum.dolor" }}) */
            return await this.model.findAll(options);
        } catch (err) {
            throw new Error(err);
        }
    }
    async findById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (err) {
            throw new Error(err);
        }
    }
    async update(id, data) {
        try {
            return await this.model.update(data, { where: { id } });
        } catch (err) {
            throw new Error(err);
        }
    }
    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = RepositoryBase;
