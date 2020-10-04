import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  // error checks
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.json({ error: "parameters missing" });
    return;
  }
  
  console.log(typeof target !== 'number');
  console.log(!Array.isArray(daily_exercises));
  if (!(typeof target === 'number' && Array.isArray(daily_exercises))) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  
  res.json(calculateExercises(target, daily_exercises));
});

app.listen(PORT, () => {
  console.log('はあちゃまっちゃまー');
  console.log('Server running on port', PORT);
});