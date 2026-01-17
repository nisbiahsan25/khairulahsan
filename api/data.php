<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$dataFile = 'data.json';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// GET Request: Read Data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        // If file doesn't exist, return empty object so frontend knows to use structure
        echo json_encode(["status" => "new_system"]);
    }
    exit;
}

// POST Request: Save Data or Lead Event
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON input"]);
        exit;
    }

    // Handle Lead Event (CAPI)
    if (isset($input['action_type']) && $input['action_type'] === 'lead_event') {
        // Log lead event logic here if needed
        echo json_encode(["status" => "lead_logged"]);
        exit;
    }

    // Handle Site Data Save
    $success = file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT));
    
    if ($success !== false) {
        echo json_encode(["status" => "success", "message" => "Data synchronized with cloud"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to write to file. Check folder permissions."]);
    }
    exit;
}
?>