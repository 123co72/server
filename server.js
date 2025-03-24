const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const temp = require("temp").track();

const app = express();
const PORT = 3000;

app.get("/generate", (req, res) => {
    const fileContent = "This is a generated file!";
    const fileName = `generated-${uuid.v4()}.txt`;

    temp.open(fileName, (err, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error generating file." });
        }

        fs.write(info.fd, fileContent, (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ success: false, message: "Error writing to file." });
            }

            res.download(info.path, fileName, (downloadErr) => {
                if (downloadErr) {
                    console.error("Error during download:", downloadErr);
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
