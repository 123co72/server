<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['generate'])) {
    $fileContent = "HI my name is  keejah!";
    $fileName = "generated.txt";

    if (file_put_contents($fileName, $fileContent)) {
        echo json_encode([
            "success" => true,
            "message" => "File generated successfully!",
            "file" => $fileName
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Error generating file."]);
    }
}
?>