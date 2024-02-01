const prisma = require("../config/pirsma");

exports.getUserByID = (id) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    })
}
exports.getUserByEmail = (email) => {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}

exports.getuserByIdentity= (identityNumber)=>{
    return prisma.user.findUnique({
        where:{
            identityNumber : identityNumber  
        }
    })
}
exports.createUser = (userId, firstName, lastName, email, hashedPassword, phone, identityNumber, address, zipcodeint, city, district, url) => {

    return prisma.user.create({
        data: {
            id: userId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            identityNumber,
            address,
            zipcode: zipcodeint,
            city,
            district,
            img_profile: url
        }
        
    })
}