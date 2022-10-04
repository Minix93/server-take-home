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

