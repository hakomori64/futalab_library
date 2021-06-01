<?php
// Include config file
require_once "../config.php";
 
// Define variables and initialize with empty values
$borrower_name = "";
$borrower_name_err = "";
$book_id = -1;
$book_id_err = "";
$quantity = 0;
$quantity_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name
    $input_name = trim($_POST["borrower_name"]);
    if(empty($input_name)){
        $borrower_name_err = "Please enter a title.";
    } else{
        $borrower_name = $input_name;
    }

    $input_name = trim($_POST["book_id"]);
    if (empty($input_name)) {
        $book_id_err = "Please send book id";
    } else {
        $book_id = $input_name;
    }

    $input_name = trim($_POST["quantity"]);
    if (empty($input_name) || $input_name <= 0) {
        $quantity_err = "有効な値を入力してください";
    } else {
        $quantity = $input_name;
    }

    // Check input errors before inserting in database
    if(empty($borrower_name_err) && empty($book_id_err) && empty($quantity_err)){
        $mysqli->autocommit(false);
        $query_err = false;

        // Prepare an insert statement
        $sql = "INSERT INTO borrows (borrower_name, book_id, quantity) VALUES (?, ?, ?)";

        if($stmt = $mysqli->prepare($sql)){
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param("sii", $param_borrower_name, $param_book_id, $param_quantity);
            
            $param_borrower_name = $borrower_name;
            $param_book_id = $book_id;
            $param_quantity = $quantity;
            
            // Attempt to execute the prepared statement
            if(!$stmt->execute()){
                echo "borrows insertion errror";
                $query_err = true;
            }
        }
        $stmt->close();
        
        $sql = "UPDATE books SET quantity = quantity - ? WHERE id = ?";

        if ($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param("ii", $param_quantity, $param_book_id);

            $param_quantity = $quantity;
            $param_book_id = $book_id;

            if (!$stmt->execute()) {
                echo "quantity update error";
                $query_err = true;
            }
        }
        $stmt->close();

        // Close statement
        if ($query_err) {
            $mysqli->rollback();
            echo "クエリ中にエラーが発生しました。借りられない本を指定していたり、指定した数量に誤りがある可能性があります。";
        } else {
            if ($mysqli->commit()) {
                header("location: /borrows/index.php");
                exit();
            } else {
                echo "クエリ中にエラーが発生しました";
            }
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Record</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <?php include '../widgets/header.php' ?>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="mt-5">本を借りる</h2>
                    <p>あなたの名前と、借りたい本を選択してください。また、同じ本を複数冊借りる場合は数量を１から変更してください。</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div class="form-group">
                            <label>お名前</label>
                            <input type="text" name="borrower_name" class="form-control <?php echo (!empty($borrower_name_err)) ? 'is-invalid' : ''; ?>" value="<?php echo $borrower_name; ?>">
                            <span class="invalid-feedback"><?php echo $borrower_name_err;?></span>
                            <?php
                                $sql = 'SELECT * FROM books';
                                if ($result = $mysqli->query($sql)) {
                                    if ($result->num_rows > 0) {
                                        echo '<label>借りる本の名前</label>';
                                        echo '<select class="form-control form-select" name="book_id">';
                                        while ($row = $result->fetch_assoc())  {
                                            echo '<option value="' . $row['id'] . '" ' . ($row['quantity'] > 0 ? '' : 'disabled') . ">";
                                                echo $row['title'];
                                            echo '</option>';
                                        }
                                        echo '</select>';
                                    } else {
                                        echo "<div>借りることができる本がありません</div>";
                                    }
                                } else {
                                    echo "<div>問題が発生しました。</div>";
                                }
                                $mysqli->close();
                            ?>
                            <label>数量</label>
                            <input type="number" name="quantity" id="quantity" class="form-control <?php echo (!empty($quantity_err)) ? 'is-invalid' : ''; ?>">
                            <span class="invalid-feedback"><?php echo $quantity_err ?></span>
                        </div>
                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="/books/index.php" class="btn btn-secondary ml-2">Cancel</a>
                    </form>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>