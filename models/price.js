'use strict';

module.exports = function(sequelize, DataTypes) {
    var Price = sequelize.define(
        'Price',
        {
            platform: { type: DataTypes.STRING },
            country: { type: DataTypes.STRING },
            price: {type : DataTypes.FLOAT}
        },
        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
            underscored: true,
            tableName: 'price',
        },
    );

    return Price;
};