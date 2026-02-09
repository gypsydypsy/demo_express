const RepositoryInterface = require("../RepositoryInterface");

class RepositoryBaseMongo extends RepositoryInterface {
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
            let options = {};

            if (Object.keys(query).length) {
                Object.keys(query).forEach((entry) => {
                    options[entry] = query[entry];
                });
            }
            /* ex: { email: 'lorem@ipsum.dolor', name: "John" } */
            return await this.model.find(options);
        } catch (err) {
            throw new Error(err);
        }
    }
    async findById(id) {
        try {
            return await this.model.findById(id);
        } catch (err) {
            throw new Error(err);
        }
    }
    async update(id, data) {
        try {
            // new: true permet de retourner le document mis à jour à la place de l'ancien
            return await this.model.findByIdAndUpdate(id, data, { new: true }); 
        } catch (err) {
            throw new Error(err);
        }
    }
    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = RepositoryBaseMongo;
