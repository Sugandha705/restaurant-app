import Food from '../models/Food.js';


export const getAllFoods = async (req, res) => { 
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

 export const getFood = async (req, res) => {
      try {
        const food = await Food.findById(req.params.id);
        console.log(food);
        if (!food) return res.status(404).json({ error: 'This Food not found' });
        res.json(food);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
 };


export const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);
            res.status(201).json(food);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateFood = async (req, res) => {
      try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) return res.status(404).json({ error: 'Food not found' });
        res.json(food);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
};