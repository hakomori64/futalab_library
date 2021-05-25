<?php

define("DB_SERVER", "mysql");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "password");
define("DB_NAME", "library");
define("DB_PORT", 3306);

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, "/run/mysqld/mysqld10.sock");


if ($mysqli->connect_error) {
	die("ERROR: Could not connect. " . $mysqli->connect_error);
}

?>