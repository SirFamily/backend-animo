const prisma = require("../config/pirsma");


exports.addHost = (hostData)=>{
    return prisma.host.create({
        data:hostData,
    })
}
