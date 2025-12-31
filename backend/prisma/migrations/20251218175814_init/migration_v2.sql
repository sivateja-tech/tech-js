CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_submission_id ON answers(submission_id);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_quiz_id ON submissions(quiz_id);
CREATE UNIQUE INDEX IF NOT EXISTS unique_user_quiz_submission
ON submissions(user_id, quiz_id);
ALTER TABLE answers
ALTER COLUMN submission_id SET NOT NULL,
ALTER COLUMN question_id SET NOT NULL,
ALTER COLUMN selected_option_id SET NOT NULL;

ALTER TABLE questions
ALTER COLUMN quiz_id SET NOT NULL;

ALTER TABLE options
ALTER COLUMN question_id SET NOT NULL;

ALTER TABLE submissions
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN quiz_id SET NOT NULL;
ALTER TABLE users
ADD CONSTRAINT role_check
CHECK (role IN ('admin', 'player'));

ALTER TABLE submissions
ADD CONSTRAINT score_non_negative
CHECK (score >= 0);
CREATE OR REPLACE FUNCTION set_answer_correctness()
RETURNS TRIGGER AS $$
BEGIN
  SELECT is_correct
  INTO NEW.is_correct
  FROM options
  WHERE id = NEW.selected_option_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_answer_correctness ON answers;

CREATE TRIGGER trg_set_answer_correctness
BEFORE INSERT ON answers
FOR EACH ROW
EXECUTE FUNCTION set_answer_correctness();
