-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2021 年 5 月 25 日 18:09
-- サーバのバージョン： 10.3.24-MariaDB
-- PHP のバージョン: 7.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `library`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `rentals`
--

CREATE TABLE `rentals` (
  `id` int(10) UNSIGNED NOT NULL,
  `borrower_name` varchar(100) NOT NULL COMMENT '借りた人の名前',
  `date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '貸出日時',
  `book_id` int(11) UNSIGNED NOT NULL COMMENT '本のID',
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `rentals`
--

INSERT INTO `rentals` (`id`, `borrower_name`, `date`, `book_id`, `quantity`) VALUES
(1, '箱守　由', '2021-05-25 04:25:55', 2, 2),
(2, '箱守　雄之助', '2021-05-25 04:25:55', 3, 1),
(3, 'あああ', '2021-05-25 08:40:16', 2, 1),
(4, 'aaa', '2021-05-25 08:41:15', 2, 1),
(5, 'aaa', '2021-05-25 08:41:36', 2, 1);

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `book_id_to_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
