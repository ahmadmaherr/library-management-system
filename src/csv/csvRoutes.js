import csv from 'csv-express';

import {
  getBorrowsInSepcificPeriod,
  getAllOverDueBorrowsLastMonth,
  getAllBorrowsLastMonth
} from "./csvData.js";

const csvRoutes = (app) => {
  app.get("/export-csv-data", async function(req, res) {
    let type = req.body.type; // csv file content type
    try {
      if (type) {
        let data = [];

        if (type === "borrowsInSepcificPeriod") { // borrowings data in a specific period
          let from = req.body.from; // start date
          let to = req.body.to; // end date
          data = await getBorrowsInSepcificPeriod(from, to);
        } else if (type === "AllOverDueBorrowsLastMonth") { // overdue borrows from last month
          data = await getAllOverDueBorrowsLastMonth();
        } else if (type === "getAllBorrowsLastMonth") { // all borrows from last month
          data = await getAllBorrowsLastMonth();
        }

        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + type + "-data.csv"
        );

        res.set("Content-Type", "text/csv");
        res.csv(data, true);
      }
    } catch (err) {
      console.log("An error occured while delivering the CSV " + err);
    }
  });
};

export default csvRoutes;

// let users = await getUsersOnlineHours();

// console.log(users)
