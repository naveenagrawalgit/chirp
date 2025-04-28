import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log(res.data," data from check in back")

            set({ authUser: res.data })

            // console.log(authUser," inside try block")

        } catch (error) {
            console.log("error in front checkauth  :",error)
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    }
}))