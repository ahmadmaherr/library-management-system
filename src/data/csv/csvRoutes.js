import csv from 'csv-express';


import {
  getBorrowsInSepcificPeriod,
  getAllOverDueBorrowsLastMonth,
  getAllBorrowsLastMonth
} from "./borrowsData.js";

const csvRoutes = (app) => {
  app.get("/export-admin-data", async function(req, res) {
    let type = req.body.type;
    let from = req.body.from;
    let to = req.body.to;
    try {
      if (type) {
        let data = [];

        if (type === "borrowsInSepcificPeriod") {
          data = await getBorrowsInSepcificPeriod(from, to);
        } else if (type === "AllOverDueBorrowsLastMonth") {
          data = await getAllOverDueBorrowsLastMonth();
        } else if (type === "getAllBorrowsLastMonth") {
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
