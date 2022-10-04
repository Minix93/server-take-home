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

/*
    TODO implement new endpoints here
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
//         res.sendStatus(400);
    }
}