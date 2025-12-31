import {
  addOption,
  getOptionsByQuestion
} from '../models/optionModel.js';

/* =========================
   ADD OPTION
========================= */
export async function handleaddOption(req, res) {
  try {
    const { questionId, optionText, isCorrect } = req.body;

    if (!questionId || !optionText) {
      return res.status(400).json({
        success: false,
        error: 'questionId and optionText are required'
      });
    }

    const option = await addOption(
      questionId,
      optionText,
      isCorrect
    );

    return res.status(201).json({
      success: true,
      data: option
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

/* =========================
   GET OPTIONS BY QUESTION
========================= */
export async function handlegetOptionsByQuestion(req, res) {
  try {
    const questionId = Number(req.params.id);

    if (isNaN(questionId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid question id'
      });
    }

    const options = await getOptionsByQuestion(questionId);

    if (!options || options.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No options found for this question'
      });
    }

    return res.status(200).json({
      success: true,
      count: options.length,
      data: options
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
