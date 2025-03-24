const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/generate", (req, res) => {
    const fileContent = "This is a generated file!";
    const fileName = "generated.txt";
    const filePath = path.join(__dirname, fileName);

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error generating file." });
        }

        res.download(filePath, fileName, (downloadErr) => {
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting file:", unlinkErr);
                }
            });

            if (downloadErr) {
                console.error("Error during download:", downloadErr);
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
