import { developmentLaptops } from '../Frontend/src/data/readymade_Product.js';
import { gamingLaptops } from '../Frontend/src/data/readymade_Product.js';
import { professionalLaptops } from '../Frontend/src/data/readymade_Product.js';
import { Generateuse } from '../Frontend/src/data/readymade_Product.js';
import { Processors_CPUs } from '../Frontend/src/data/readymade_Product.js';
import { RAM } from '../Frontend/src/data/readymade_Product.js';
import { cabinets } from '../Frontend/src/data/readymade_Product.js';
import { storageDevices } from '../Frontend/src/data/readymade_Product.js';
import { coolingSystems } from '../Frontend/src/data/readymade_Product.js';
import { graphicsCards } from '../Frontend/src/data/readymade_Product.js';
import { Motherboards } from '../Frontend/src/data/readymade_Product.js';
import { Monitors } from '../Frontend/src/data/readymade_Product.js';
import { Mice } from '../Frontend/src/data/readymade_Product.js';
import { Keyboards } from '../Frontend/src/data/readymade_Product.js';
import { powerSupplies } from '../Frontend/src/data/readymade_Product.js';
import Products from './Models/Product.model.js';

async function insertdata() {
  let providedata = [
    developmentLaptops,
    gamingLaptops,
    professionalLaptops,
    Generateuse,
    Processors_CPUs,
    RAM,
    cabinets,
    storageDevices,
    powerSupplies,
    Keyboards,
    Mice,
    Monitors,
    Motherboards,
    graphicsCards,
    coolingSystems,
  ];
  providedata.map(async (data) => {
    try {
      const add = await Products.insertMany(data);
      console.log('data added');
    } catch (err) {
      console.log('error occor inserting many');
    }
  });
}

insertdata();
