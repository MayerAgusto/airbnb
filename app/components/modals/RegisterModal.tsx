"use client";

import  axios from "axios";
import { AiFillGithub} from "react-icons/ai"
import { FcGoogle} from "react-icons/fc"
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import useRegisterModal from "@/app/hooks/userRegisterHook";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/userLoginModel";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({ 
        defaultValues: {
            name: "",
            email:"",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => { 
            toast.error("Sometinh went wrong")
            console.log(error)
        })
        .finally(() => { setIsLoading(false)})
    };

    const bodyContent = (
        <div
         className="flex flex-col gap-4"
        >
            <Heading 
                title="Welcome to Airbnb clone"
                subtitle=" Create una cuenta"
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
             <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
             <Input 
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();

    }, [loginModal, registerModal])


    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label=" Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />

            <Button 
                outline
                label=" Continue with Gibhub"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div
            className="text-neutral-500 text-center mt-4 font-light"
            >
                <div className="justify-center flex
                 flex-row items-center gap-2
                ">
                    <div >
                        Already have an account ? 
                    </div>
                    <div

                    onClick={toggle}
                     className="text-neutral-800 cursor-pointer 
                     hover:underline hover:text-green-500
                     "
                    >
                        Log in
                    </div>

                </div>
            </div>
        </div>
    )
    return ( 
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Submit"
            onClose={ registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;