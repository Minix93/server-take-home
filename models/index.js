'use strict';

if (!global.hasOwnProperty('db')) {
    let {Sequelize, sequelize} = require('../service/db');

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        Creator: require(__dirname + '/creator')(sequelize, Sequelize.DataTypes),
        Install: require(__dirname + '/install')(sequelize, Sequelize.DataTypes),
        // new models add below
        Campaign: require(__dirname + '/campaign')(sequelize, Sequelize.DataTypes),
        Price: require(__dirname + '/price')(sequelize, Sequelize.DataTypes),
        Media: require(__dirname + '/media')(sequelize, Sequelize.DataTypes)
        /*
        *
        * TODO add any additional models here.
        *
        */
    };

    global.db.Creator.hasMany(global.db.Install, {
        onDelete: 'cascade',
        foreignKey: 'creator_id',
    });

    // global.db.Install.belongsTo(global.db.Campaign, {
    //     onDelete: 'cascade',
    //     foreignKey: 'campaign_id',
    // });

    /*
    *
    * TODO add any additional relationships between models here.
    *
    */

    // new relationships added below:

    /**
     * Creator and Campaign --> Many to Many
     */

    global.db.Creator.belongsToMany(db.Campaign, {
        through: "creator_campaign",
        as: "campaigns",
        foreignKey: "campaign_id"
    });
    global.db.Campaign.belongsToMany(db.Creator, {
        through: "creator_campaign",
        as: "creators",
        foreignKey: "creator_id"
    });


}