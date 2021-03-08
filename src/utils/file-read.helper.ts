import { Product } from "../models/product.model";

const csv = require('csv-parser');
const fs = require('fs');

export function readProductsFromCSV(filePath: string) {
  return new Promise((resolve, reject) => {
    let bulkProducts: Product[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // do further validations here
        bulkProducts.push(row as Product);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(bulkProducts);
      });
  });
}