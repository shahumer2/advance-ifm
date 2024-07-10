import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SIGNUP_URL } from "../constants/utils.js";

const UseSignup = (formData) => {
    console.log(formData,"lolo");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SIGNUP_URL, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("User Added Successfully");
                navigate("/auth/sign-in");
            } else {
                toast.error(data.errorMessage);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    return {
        handleSubmit
    };
};

export default UseSignup;
