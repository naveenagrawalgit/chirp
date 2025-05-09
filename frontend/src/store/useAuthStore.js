import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import { SignUpPage } from "../pages/SignUpPage.jsx";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {

            const res = await axiosInstance.get("/auth/check");

            console.log(res.data," data from check in back")

            set({ authUser: res.data })

            // console.log(authUser," authUser inside try block")

        } catch (error) {
            console.log("error in front checkauth  :",error)
            
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    },

    SignUp : async(data)=>{
        // GETTING data from signup page

        set({isSigningUp: true})
        try {

            // sending 'data' to backend
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})
            toast.success("Account created successfully")

            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error during storing data in backend")
        }
        finally{

           set( {isSigningUp: false})
        }

    },

    login: async(data)=>{
        set({isLoggingIn: true})

        try {

            const res = await axiosInstance.post("/auth/login",data)

            set({authUser: res.data})
            toast.success("Account login successfull")


            console.log("res log in front inside login", res)

        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error during login")
            
        }
        finally{
            set({isLoggingIn: false})
        }


    },

    logout: async ()=> {

        try {
            const res = await axiosInstance.post("/auth/logout")
            console.log("console log in logout inside useAuthStore",res)
            set({authUser: null})
            toast.success("logged out successfully")
        } catch (error) {
            console.log(error.response.data.message)
            
        }
    },

    updateProfile : async(data) => {

        set({isUpdatingProfile: true})

        try {
            const res = await axiosInstance.put("/auth/update-profile", data);

            set({authUser: res.data})
            toast.success("profile updated successfully")

        } catch (error) {
            console.log('error inside upadte profile in useauthstore frontend',error)
            toast.error(error.response.data.message)

        }
        finally{
            set({isUpdatingProfile: false})
        }

    }

}))