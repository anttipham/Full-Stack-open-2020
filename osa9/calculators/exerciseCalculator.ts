interface exerciseInformation {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (target: number, dailyExcerciseHours: Array<number>): exerciseInformation => {
  const periodLength = dailyExcerciseHours.length;
  const average = dailyExcerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target ? true : false;
  let rating, ratingDescription;
  if (success) {
    rating = 3;
    ratingDescription = 'sUPer SUCCess';
  } else if (average > 0.9 * target) {
    rating = 2;
    ratingDescription = 'not SUCCess but mehhh close enough';
  } else {
    rating = 1;
    ratingDescription = '????????\nwut happened?';
  }
  return {
    periodLength,
    trainingDays: dailyExcerciseHours.filter(hours => hours).length,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Don't execute when imported
if (!process.env.NODE_ENV) {
  // console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

  if (process.argv.length < 4) {
    throw new Error('The program needs two or more arguments. The first argument is the target (h) and the rest are the excercise hours by day');
  }

  const target = Number(process.argv[2]);
  const hoursByDay = process.argv.slice(3).map(hours => Number(hours));

  if (isNaN(target) || hoursByDay.some(hours => isNaN(hours))) {
    throw new Error('Arguments must be numbers');
  }

  console.log(calculateExercises(target, hoursByDay));
}

export default calculateExercises
