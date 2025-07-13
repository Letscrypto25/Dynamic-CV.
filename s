<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "erika.dynamiccv@gmail.com"; // Replace with your email
    $subject = "New CV Request from " . $_POST['fullName'];
    
    // Collect form data
    $message = "CV REQUEST DETAILS:\n\n";
    $message .= "Template: " . $_POST['template'] . "\n";
    $message .= "Full Name: " . $_POST['fullName'] . "\n";
    $message .= "Job Title: " . $_POST['jobTitle'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Phone: " . $_POST['phone'] . "\n";
    $message .= "Location: " . $_POST['location'] . "\n";
    $message .= "Summary: " . $_POST['summary'] . "\n\n";
    
    $message .= "SKILLS:\n" . $_POST['skills'] . "\n\n";
    
    $message .= "WORK EXPERIENCE:\n";
    for ($i = 0; $i < count($_POST['expTitle']); $i++) {
        $message .= "Position: " . $_POST['expTitle'][$i] . "\n";
        $message .= "Company: " . $_POST['expCompany'][$i] . "\n";
        $message .= "Location: " . $_POST['expLocation'][$i] . "\n";
        $message .= "Date: " . $_POST['expDate'][$i] . "\n";
        $message .= "Description: " . $_POST['expDescription'][$i] . "\n\n";
    }
    
    $message .= "EDUCATION:\n";
    for ($i = 0; $i < count($_POST['eduDegree']); $i++) {
        $message .= "Degree: " . $_POST['eduDegree'][$i] . "\n";
        $message .= "Institution: " . $_POST['eduInstitution'][$i] . "\n";
        $message .= "Location: " . $_POST['eduLocation'][$i] . "\n";
        $message .= "Date: " . $_POST['eduDate'][$i] . "\n\n";
    }
    
    // Handle file upload
    if (isset($_FILES['cvUpload']) {
        $file = $_FILES['cvUpload'];
        $fileName = $file['name'];
        $fileTmp = $file['tmp_name'];
        $fileType = $file['type'];
        
        // Move file to uploads directory
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $uploadPath = $uploadDir . basename($fileName);
        move_uploaded_file($fileTmp, $uploadPath);
        
        $message .= "Uploaded CV: " . $uploadPath . "\n";
    }
    
    // Send email
    $headers = "From: cv-builder@yourdomain.com";
    if (mail($to, $subject, $message, $headers)) {
        header('Location: build-cv.html?status=success');
    } else {
        header('Location: build-cv.html?status=error');
    }
} else {
    header('Location: build-cv.html');
}
?>
