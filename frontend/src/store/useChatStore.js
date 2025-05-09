import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useChatStore = create((set)=> ({

    messages:[],
    users: [],
    selectedUser: null,
    isUserLoading:false,
    isMessageLoading: false,

    getUsers: async()=> {
        set({isUserLoading: true})

        try {

            const res= await axiosInstance.get('/messages/users');
            set({users: res.data})

            toast.success("users fetched")
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error inside getusers in chat store")

            
        }
        finally{
            set({isUserLoading:false});
        }
    },

    getMessages: async(userId)=>{

        set({isMessageLoading:true})

        try {
            const res = await axiosInstance(`/messages/${userId}`)

            set({messages: res.data});

            toast.success("messages fetched")
        } catch (error) {

            toast.error(error.response.data.message)
            console.log("error inside getmessages in chat store")
            
        }
        finally{
            set({isMessageLoading: false})
        }
    },

    setSelectedUser: async() => set({setSelectedUser}),

}))