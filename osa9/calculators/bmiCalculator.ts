const calculateBmi = (height: number, weight: number): string => {
  // weight: kg, height: cm
  const heightInMeters = height / 100;
  const BMI = weight / (heightInMeters * heightInMeters);
  
  let message;
  if (BMI < 15) {
    message = 'Very severely underweight';
  } else if (BMI < 16) {
    message = 'Severely underweight';
  } else if (BMI < 18.5) {
    message = 'Underweight';
  } else if (BMI < 25) {
    message = 'Normal (healthy weight)';
  } else if (BMI < 30) {
    message = 'Overweight';
  } else if (BMI < 35) {
    message = 'Obese Class I (Moderately obese)';
  } else if (BMI < 40) {
    message = 'Obese Class II (Severely obese)';
  } else {
    message = 'Obese Class III (Very severely obese)';
  }

  return message;
};

// Don't execute when imported
if (!process.env.NODE_ENV) {
  // console.log(calculateBmi(180, 74));
  
  if (process.argv.length !== 4) {
    throw new Error('The program needs exactly two arguments: height (cm) and weight (kg)');
  }
  
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Arguments must be numbers');
  }

  console.log(calculateBmi(height, weight));
}

export default calculateBmi