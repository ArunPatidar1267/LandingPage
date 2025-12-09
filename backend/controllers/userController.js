const User = require("../models/User.model");
const Subscriber = require("../models/Subscriber.model");

const updateForm = async (req, res) => {
  try {
    const { name, email, mobile, city } = req.body;
    
    const newUser = await User.create({
      name,
      email,
      mobile,
      city,
      userType: "user"
    });

    res.status(201).json({ message: "Form submitted successfully", data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    const existing = await Subscriber.findOne({ email });
    
    if (existing && existing.isSubscribed) {
      return res.status(400).json({ message: "Already subscribed" });
    }
    
    if (existing) {
      existing.isSubscribed = true;
      await existing.save();
      return res.json({ message: "Subscribed successfully" });
    }
    
    await Subscriber.create({ email, isSubscribed: true });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  updateForm,
  subscribeToNewsletter
};
