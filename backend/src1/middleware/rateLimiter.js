import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
<<<<<<< HEAD
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
=======
    try {
    
        const { success } = await ratelimit.limit("my-limit-key"); 
        
        if (!success) {
         
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
>>>>>>> 3de9c0b24ce34f3fa956f5268c4706f324405b08

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
