require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('../models/Food');

mongoose.connect(process.env.DB);

let foods = [
  {
    name: 'Huevo entero',
    serving:{
      aumount: 1,
      unit: 'huevo',
    },
    cal: 74,
    protein: 6.29,
    carbs: 0.38,
    fat: 4.97,
    entero: true,
    expect: 1
  },
  {
    name: 'Blancas de Huevo',
    serving:{
      aumount: 1,
      unit: 'huevo',
    },
    cal: 17,
    protein: 3.6,
    carbs: 0.24,
    fat: 0.06,
    entero: true,
    expect: 1
  },
  {
    name: 'Pimientos Verdes',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 20,
    protein: 0.86,
    carbs: 4.64,
    fat: 0.17,
    entero: true,
    expect: 1
  },
  {
    name: 'Avena',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 389,
    protein: 16.89,
    carbs: 66.27,
    fat: 6.9,
    entero: true,
    expect: 1
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
    entero: true,
    expect: 1
  },
  {
    name: 'Licuado de proteina (Optimum nutrition 100% Whey)',
    serving:{
      aumount: 1,
      unit: 'porcion',
    },
    cal: 120,
    protein: 24,
    carbs: 3,
    fat: 1.5,
    entero: true,
    expect: 1
  },
  {
    name: 'Manzana',
    serving:{
      aumount: 1,
      unit: 'manzana',
    },
    cal: 72,
    protein: 0.36,
    carbs: 19.06,
    fat: 0.23,
    entero: true,
    expect: 1
  },
  {
    name: 'Almendras',
    serving:{
      aumount: 1,
      unit: 'almendra',
    },
    cal: 7,
    protein: 0.26,
    carbs: 0.24,
    fat: 0.61,
    entero: true,
    expect: 1
  },
  {
    name: 'Pan de trigo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 278,
    protein: 8.4,
    carbs: 51.4,
    fat: 5.4,
    entero: true,
    expect: 1
  },  
  {
    name: 'Pechuga de Pavo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 104,
    protein: 17.07,
    carbs: 4.21,
    fat: 1.66,
    entero: true,
    expect: 1
  },
  {
    name: 'Queso Panela',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 258,
    protein: 16.4,
    carbs: 1.59,
    fat: 20.7,
    entero: true,
    expect: 1
  },
  {
    name: 'Pure de Papas',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 100,
    protein: 1.8,
    carbs: 15.72,
    fat: 3.54,
    entero: true,
    expect: 1
  },
  {
    name: 'Tilapia (Pez)',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 96,
    protein: 20.08,
    carbs: 0,
    fat: 1.7,
    entero: true,
    expect: 1
  },
  {
    name: 'Salmon Rosado',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 116,
    protein: 19.94,
    carbs: 0,
    fat: 3.45,
    entero: true,
    expect: 1
  },
  {
    name: 'Platano',
    serving:{
      aumount: 1,
      unit: 'platano',
    },
    cal: 105,
    protein: 1.29,
    carbs: 26.95,
    fat: 0.39,
    entero: true,
    expect: 1
  },
  {
    name: 'Pechuga de pollo',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 195,
    protein: 29.55,
    carbs: 0,
    fat: 7.72,
    entero: true,
    expect: 1
  },
  {
    name: 'Ensalada de Verduras (sin aderezo)',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 15,
    protein: 0.74,
    carbs: 3.14,
    fat: 0.15,
    entero: true,
    expect: 1
  },
  {
    name: 'Camote',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 114,
    protein: 1.94,
    carbs: 19.97,
    fat: 3.26,
    entero: true,
    expect: 1
  },
  {
    name: 'Filete de Res',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 252,
    protein: 27.29,
    carbs: 0,
    fat: 15.01,
    entero: true,
    expect: 1
  },
  {
    name: 'Brocoli',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 34,
    protein: 2.82,
    carbs: 6.64,
    fat: 0.37,
    entero: true,
    expect: 1
  },
  {
    name: 'Arroz Integral (cocido)',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 110,
    protein: 2.56,
    carbs: 22.78,
    fat: 0.89,
    entero: true,
    expect: 1
  },
  {
    name: 'Yogurt Griego',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 117,
    protein: 4.05,
    carbs: 5.04,
    fat: 9.19,
    entero: true,
    expect: 1
  },
  {
    name: 'Granola',
    serving:{
      aumount: 100,
      unit: 'g',
    },
    cal: 408,
    protein: 9.22,
    carbs: 72.39,
    fat: 11.03,
    entero: true,
    expect: 1
  },
  {
    name: 'Atun enlatado en agua',
    serving:{
      aumount: 1,
      unit: 'lata',
    },
    cal: 99,
    protein: 21.68,
    carbs: 0,
    fat: 0.7,
    entero: true,
    expect: 1
  }
]

Food.create(foods, (err)=>{
  if(err){throw(err)}
  console.log(`Created ${foods.length} foods`)
  mongoose.connection.close();
});