import { addOption, getOptionsByQuestion } from '../models/optionModel.js';

export async function handleaddOption(req, res) {
  try {
    const option = await addOption(req.body);
    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handlegetOptionsByQuestion(req, res) {
  try {
    const option = await getOptionsByQuestion(req.params.id);
    if (!option) {
      return res.status(404).json({ error: "question id is not available" });
    }
    res.json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
