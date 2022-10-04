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

exports.deleteCampaign = async (req, res) => {
    try{
        let {publisher_id, campaign_id, remove_at} = req.query;

        //TODO delete the associations between publisher and campaign in the request

        // step 1: find the two instance by id

        // step 2: call removeCampaign() and removeCreator

        // step 3: find matching instance in junction table creator_campaign and delete by calling destroy()

    }catch (err){
        console.log("Error is User: " + err);
        res.sendStatus(400);
    }
}

