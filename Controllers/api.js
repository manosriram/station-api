// Imports
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

// List of all Station Codes.
const stations = [
    "MSB",
    "MSF",
    "MPK",
    "MS",
    "MSC",
    "NBK",
    "MKK",
    "MBM",
    "SP",
    "GDY",
    "STM",
    "PZA",
    "MN",
    "TLM",
    "RPM",
    "WST",
    "MMCC",
    "BBQ",
    "KOK",
    "TNP",
    "VOC",
    "TVT",
    "WCN",
    "KAVM",
    "ENR",
    "VJM",
    "PER",
    "PCW",
    "PEW",
    "VLK",
    "KOTR",
    "PVM",
    "ABU",
    "MPKT",
    "MCPT",
    "MCPK",
    "MTCN",
    "MLHS",
    "MKAK",
    "MTMY",
    "MNDY",
    "GWYR",
    "KTPM",
    "KTBR",
    "INDR",
    "TYMR",
    "TRMN",
    "PRGD",
    "VLCY"
];

// Returns distance between two given stations.
router.get("/distance", (req, res) => {
    const { from, to } = req.query;

    // If "from" or "to" station doesn't exist, return.
    if (!stations.includes(from) || !stations.includes(to)) {
        return res.status(422).json("Invalid Parameters");
    }
    // "data" array which stores the details of two given stations.
    let data = [];
    // "lastStation" tracks last visited stations.
    let lastStation;

    // Read from CSV.
    fs.createReadStream(path.resolve(__dirname, "../data.csv"))
        .pipe(csv.parse({ headers: true }))
        .on("error", error => console.error(error))
        .on("data", row => {
            // If we have no more than 2 elements in data array.
            if (data.length !== 2) {
                // If "line" is changed, empty data array.
                if (lastStation && lastStation !== row["Connection"]) {
                    data = [];
                }
                // If "from" station matches, push into data array.
                if (row["Station Code"] === from) {
                    data.push(row);
                }
                // If "to" station matches:
                if (row["Station Code"] === to) {
                    // If there is atleast one element in data array and both stations lie in the same "line", push station into data array.
                    if (data.length && data[0].Connection === row.Connection)
                        data.push(row);
                }
                // Keep track of last station visited.
                lastStation = row["Connection"];
            }
        })
        .on("end", () => {
            // If we have two stations, return the distance between them.
            if (data.length === 2) {
                return res.send({
                    distanceInKms: (
                        data[1]["Distance in Kms"] - data[0]["Distance in Kms"]
                    ).toFixed(6)
                });
                // Else, they either don't exist in the same line or are invalid.
            } else {
                return res.json("Invalid parameter");
            }
        });
});

// Search for a station in the CSV.
router.get("/search", (req, res) => {
    const { station } = req.query;
    // If Station doesn't exist, return.
    if (!stations.includes(station)) {
        return res.status(422).json("Invalid Parameters");
    }
    let data = [];
    fs.createReadStream(path.resolve(__dirname, "../data.csv"))
        .pipe(csv.parse({ headers: true }))
        .on("error", error => console.error(error))
        .on("data", row => {
            // If station matches, push into "data" array as JSON.
            if (row["Station Code"] === station) {
                data.push(row);
            }
        })
        .on("end", () => {
            // Return "data" array.
            return res.status(200).json(data);
        });
});

// Get all stations from the CSV.
router.get("/getall", (req, res) => {
    let data = [];
    fs.createReadStream(path.resolve(__dirname, "../data.csv"))
        .pipe(csv.parse({ headers: true }))
        .on("error", error => console.error(error))
        .on("data", row => {
            // Push every row into "data" array.
            data.push(row);
        })
        .on("end", () => {
            // Return "data" array as JSON.
            return res.status(200).json(data);
        });
});

module.exports = router;
