import User from "../models/user.model.js";
import { Message } from "../models/message.model.js";


export const getUsersForSidebar = async(req,res) => {

    try {
        // end point for getting info for sidebar users
        const loggedInUserId = req.user._id; // we can access the user id here because of middleware which we have attached to message route(prtect route).

        const filteredUsers = await User.find({id:{$ne: loggedInUserId } }).select("-password"); // getting all users leaving the currentloggedin User.

        res.status(200).json(filteredUsers);


    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message)

        res.status(500).json({error: "issue in getuserforsidebar"})
        
    }


}






export const getMessage= async(req,res)=>{

    
    try {
        // getting another person id
        const {id: userToChatId} = req.params;
    
        const myId = req.user._id;// getting current userId
    
        const messages = await Message.find({
            $or:[
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {

        console.log("Error in getMessages Controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const sendMessage = async (req,res) => {

    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
    
    
        let imageUrl;
    
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
    
        await newMessage.save();
    
        // todo: realtime text functionality
    
        res.status(201).json(newMessage)
    
    } catch (error) {
        
        console.log("error in sendMessage controller", error)
        res.status(500).json({error: "error in sendMessage"})
    }
}

