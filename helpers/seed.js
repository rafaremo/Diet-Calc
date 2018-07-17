const mongoose = require('mongoose');
const Food = require('../models/Food');

let foods = [
  {
    name: 'Huevo entero',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 143,
    protein: 12.56,
    carbs: 0.72,
    fat: 9.51,
  },
  {
    name: 'Blancas de Huevo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 52,
    protein: 10.90,
    carbs: 0.73,
    fat: 0.17,
  },
  {
    name: 'Pimientos verdes salteados',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 116,
    protein: 0.78,
    carbs: 4.22,
    fat: 11.85,
  },
  {
    name: 'Avena',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 40,
    protein: 3.21,
    carbs: 11.44,
    fat: 0.86,
  },
  {
    name: 'Moras',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 43,
    protein: 1.39,
    carbs: 9.61,
    fat: 0.49,
  },
  {
    name: 'Licuado de proteina (Optimum nutrition)',
    serving:{
      aumount: 1,
      unit: 'porcion',
    },
    cal: 130,
    protein: 24,
    carbs: 4,
    fat: 1.5,
  },
  {
    name: 'Manzana',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 52,
    protein: 0.26,
    carbs: 13.81,
    fat: 0.17,
  },
  {
    name: 'Almendras',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 579,
    protein: 21.15,
    carbs: 21.55,
    fat: 49.93,
  },
  {
    name: 'Pan de trigo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 274,
    protein: 10.67,
    carbs: 47.54,
    fat: 4.53,
  },  {
    name: 'Pechuga de pavo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 189,
    protein: 28.71,
    carbs: 0,
    fat: 7.41,
  },
  {
    name: 'Rebanada queso cottage bajo en grasa',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 72,
    protein: 12.39,
    carbs: 2.72,
    fat: 1.02,
  },
  {
    name: 'Pure de Papas',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 89,
    protein: 1.65,
    carbs: 14.65,
    fat: 2.82,
  },
  {
    name: 'Tilapia (Pescado Casa)',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 128,
    protein: 26.15,
    carbs: 0,
    fat: 2.65,
  },
  {
    name: 'Salmon',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 153,
    protein: 24.58,
    carbs: 0,
    fat: 5.28,
  },
  {
    name: 'Platano',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 89,
    protein: 1.09,
    carbs: 22.84,
    fat: 0.33,
  },
  {
    name: 'Pechuga de pollo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 197,
    protein: 29.80,
    carbs: 0,
    fat: 7.78,
  },
  {
    name: 'Ensalada Mixta',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 15,
    protein: 1.36,
    carbs: 2.87,
    fat: 0.15,
  },
  {
    name: 'Papa dulce',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 90,
    protein: 2.01,
    carbs: 20.71,
    fat: 0.15,
  },  {
    name: 'Licuado de proteina hydrolizada (optimum nutrition)',
    serving:{
      aumount: 1,
      unit: 'porcion',
    },
    cal: 93.33,
    protein: 20,
    carbs: 2.333,
    fat: 0.33,
  },
  {
    name: 'Corte de carne de res',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 202,
    protein: 27.55,
    carbs: 0,
    fat: 9.31,
  },
  {
    name: 'Brocoli',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 22,
    protein: 1.14,
    carbs: 3.81,
    fat: 0.72,
  },
  {
    name: 'Arroz café',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 370,
    protein: 7.60,
    carbs: 78.68,
    fat: 2.75,
  },
  {
    name: 'Yogurt griego',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 97,
    protein: 9,
    carbs: 3.98,
    fat: 5,
  },
  {
    name: 'Granola',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 489,
    protein: 13.67,
    carbs: 53.88,
    fat: 24.31,
  },
  {
    name: 'Atun enlatado en agua',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 128,
    protein: 23.62,
    carbs: 0,
    fat: 2.67,
  },
  {
    name: 'Caseina',
    serving:{
      aumount: 1,
      unit: 'porcion',
    },
    cal: 120,
    protein: 24,
    carbs: 3,
    fat: 1,
  },
]

Food.create(foods, (err)=>{
  if(err){throw(err)}
  console.log(`Created ${foods.length} foods`)
  mongoose.connection.close();
});