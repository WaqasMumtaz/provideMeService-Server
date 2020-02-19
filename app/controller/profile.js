const mongoose = require('mongoose');
const profile = mongoose.model('userProfile');


exports.userProfilePost = function(req, res, next){
       var profileObj = req.body;
    if(req.body.objectId == "" || req.body.objectId == undefined){
        console.log("api hit2")
        //console.log(req.body,'asdasdasds')
    const profiledata = new profile({
        userId:req.body.userId,
        date:req.body.date,
        time:req.body.time,
        email:req.body.email,
        address:req.body.address,
        contactNo:req.body.contactNo,
        gender:req.body.gender,
        image:req.body.image,
        name:req.body.name,
        type:req.body.type,
    })

profiledata.save(function(err,dataProfile){
        console.log(dataProfile)
        if(err){
            res.send({
                code:404,
                msg:'no data inserted',
                content:[]
            })
        }
        else if(dataProfile){
            console.log(dataProfile)
            res.send({
                code:200,
                msg:'data is inserted',
                content:dataProfile
            })
        }
    })
}
else if(req.body.objectId != ""){
    console.log('hit app3')
    profile.updateMany(
        {"_id":req.body.objectId},
        {$set: profileObj},
        {multi:true}
    ).then((response) => {
        res.send({
            code:200,
            msg:'profile data updated successfully',
            content:profileObj
        });
    }).catch(() => res.status(422).send({msg:'okay'}));
}
}