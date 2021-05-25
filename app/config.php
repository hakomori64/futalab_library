<?php

define("DB_SERVER", "nas.futa.lab");
define("DB_USERNAME", "yu_hakomori20");
define("DB_PASSWORD", "MariaDBPassw0rd!");
define("DB_NAME", "library");
define("DB_PORT", 3307);

$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, "/run/mysqld/mysqld10.sock");


if ($mysqli->connect_error) {
	die("ERROR: Could not connect. " . $mysqli->connect_error);
}

?>