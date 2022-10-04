'use strict';

let {Sequelize, sequelize} = require('../service/db');

// exports.creator = async (req, res) => {
//     try {
//         const creatorId = req.query.creator_id;
//         let user = await db.sequelize.query(
//             'SELECT * FROM creator b\n' +
//             'WHERE id=$1\n',
//             { bind: [creatorId], type: 'RAW' },
//         );
//         res.send(user[0]);
//     } catch (err) {
//         console.log("Error is User: " + err);
//         res.sendStatus(400);
//     }
// };

/**
 * endpoint: "/creator"
 */

exports.getCreatorById = async (req, res) => {
    try{
        const creatorId = req.query.creator_id;
        let creator = await db.Creator.findByPk(creatorId, {include : [{
            model : db.Campaign,
            as: "campaigns",
            attributes: ["id", "name", "icon_url"],
                through: {
                attributes:[],
                }
            }]});

        res.send(creator);
    }catch (err){
        console.log("Error is User: " + err);
         res.sendStatus(400);
    }
}

/**
 * endpoint: "/campaign"
 *
 */

/**
 * getCampaign fetch all the campaign data and their associated information (meda, price)
 * TODO: refactor the code to accept request for certain creator's campaign, and destruct
 *  raw data to return
 *  sample dataformat {campaign.name, campaign.icon_url, price(matching country&platform), media_list}
 */
exports.getCampaign = async (req, res) =>{
    try{
        let campaigns = await db.Campaign.findAll({
            include : [{ model: db.Media }, {model: db.Price}]
        });

        res.send(campaigns);
    }catch (err){
        console.log("Error is User: " + err);
         res.sendStatus(400);
    }
}


/**
 * endpoint: "deletecampaign"
 */

//TODO: refactor the function to realize relationship deletion in the future

exports.deleteCampaign = async (req, res) => {
    try{
        let {publisher_id, campaign_id, remove_at} = req.query;

        // step 1: find the two instance by id
        let creator_record = await db.Creator.findOne({
            where: {id : publisher_id}
        });

        let campaign_record = await db.Campaign.findOne({
            where: {id : campaign_id}
        });

        // step 2: call removeCampaign()

        creator_record.removeCampaigns(campaign_id);

        res.send("deleted");

    }catch (err){
        console.log("Error is User: " + err);
        res.sendStatus(400);
    }
}

/**
 * endpoint: "deletepublisher"
 *
 * SQL query:
 * WITH my_installs AS (
 *    SELECT creator.id as creator_id, country, campaign, platform, COUNT(*) AS install_count
 *    FROM creator
 *    LEFT JOIN install ON install.creator_id = creator.id
 *   GROUP BY 1, 2, 3, 4
 * ),
 * pays AS (
 *    SELECT my_installs.creator_id, SUM(install_count * price) AS pay
 *    FROM my_installs
 *    LEFT JOIN price ON campaign, country, platform
 *    GROUP BY 1
 * ),
 * creator_installs AS (
 *    SELECT creator_id, SUM(install_count) AS install_count
 *    FROM my_installs
 *    GROUP BY 1
 * )
 * output AS (
 *   SELECT ci.creator_id, pay/install_count AS pay_per_install
 *   FROM creator_installs ci
 *   LEFT JOIN pays
 * )
 * SELECT * FROM output
 */

//TODO implement the SQL query to get creator's pay_per_install
exports.deletePublisher = async (req, res) =>{

}

