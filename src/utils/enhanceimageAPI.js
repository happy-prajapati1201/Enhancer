import axios from 'axios';

const API_KEY = "wxkt5hklbd7i7xdaf"
const BASE_URL = "https://techhk.aoscdn.com/"
export const enhancedImageAPI = async (file) => {
    // code to call API and get enhance 

    try {
        const taskId = await uploadImage(file);
        console.log("Image upload sucessfully,task ID:", taskId);

        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced image data:", enhancedImageData);

        console.log(enhancedImageData);
        return enhancedImageData;

    } catch (error) {
        console.log("Error enhancing image:", error.message);
        throw error;
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file)

    const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    });

    console.log("Full response:", data);

    const taskId = data?.data?.task_id || data?.taskId || data?.task_id || data?.id;

    if (!taskId) {
        throw new Error("Failed to upload images! Task ID not found.")
    }

    console.log("Task ID extracted:", taskId);
    return taskId;
};
const fetchEnhancedImage = async (taskId) => {

    const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
        headers: {
            // "Content-Type" : "multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    });

    if (!data?.data) {
        throw new Error("Failed to upload images! image not found.")

    }

    return data.data;
    //fetch enhance image
    // "/api/tasks/visual/scale/{task_id}" ---get
}

const PollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {
        console.log("Processing... ");

        if (retries >= 20) {
            throw new Error("Max retries reached, Please try again leter");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000))

        return PollForEnhancedImage(taskId, retries + 1)
    }

    console.log("Enhanced image URL", result);
    return result;
}


// {status: 200, message: 'success', data: {…}}
// data
// :
// {task_id: ' c7e35c29-a8f4-434c-a183-4993ba28315b'}
// message
// :
// "success"
// status
// :
// 200
// [[Prototype]]
// :
// Object