-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2025 at 02:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xpertone_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2b$10$c1NhlnNqToArlAXo7.UAX./pMhut8Abv68u8defmyW/9IgOLtbhhq');

-- --------------------------------------------------------

--
-- Table structure for table `angels`
--

CREATE TABLE `angels` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `tiktok` varchar(100) NOT NULL,
  `youtube` varchar(255) NOT NULL,
  `youtube_image` varchar(255) NOT NULL,
  `followers` int(11) NOT NULL,
  `niche` varchar(100) NOT NULL,
  `other_niche` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `affiliate_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `facebook` varchar(255) NOT NULL,
  `linkedin` varchar(255) NOT NULL,
  `status` enum('pending','approved') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `angels`
--

INSERT INTO `angels` (`id`, `name`, `email`, `phone`, `instagram`, `tiktok`, `youtube`, `youtube_image`, `followers`, `niche`, `other_niche`, `description`, `affiliate_link`, `created_at`, `facebook`, `linkedin`, `status`) VALUES
(22, 'khubaib32', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1753435933456-902868865.png', 1000, 'Food', NULL, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvg', NULL, '2025-07-25 09:32:13', '', '', 'approved'),
(27, 'khubaib Bin Tariq2', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1754479761112-777652248.jpg', 1000, 'Not Touch', NULL, 'ok', NULL, '2025-08-06 11:29:21', 'http:facebook', 'linkedin', 'pending'),
(28, 'khubaib Bin Tariq3', 'khubaibintariq123@gmail.com', '+92 0000000003000000', 'https://www.instagram.com/khubaib9202?igsh=cWJ6dXEwZWhyMHBu', 'https://www.tiktok.com/@khubaib.tariq?_t=ZS-8yIupL7xs63&_r=1', 'Web expert', '/uploads/1754480309965-154406747.png', 1000, 'Not Touch', NULL, 'LEVEL', NULL, '2025-08-06 11:38:29', 'http:facebook', 'linkedin', 'pending'),
(35, 'Khubaib Bin Tariq11', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756204758088-782317052.png', 150, 'Food', NULL, 'kkkkkkkkf', NULL, '2025-08-26 10:39:18', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(36, 'Khubaib Bin Tariq11', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756275089070-154582934.jpg', 1500, 'Food', NULL, 'rrr', NULL, '2025-08-27 06:11:29', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(37, 'Khubaib Bin Tariq66', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756275526841-925001357.png', 1500, 'Food', NULL, 'regegw', NULL, '2025-08-27 06:18:46', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(38, 'Khubaib Bin Tariq55', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756275752729-450463015.jpg', 1500, 'Food', NULL, 'ggggg', NULL, '2025-08-27 06:22:32', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(39, 'Khubaib B', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '', 1500, 'Food', NULL, 'kkkkkkkkkkkkkkk', NULL, '2025-08-27 07:34:41', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(40, 'Khubaib B', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '', 1500, 'Food', NULL, 'kkkkkkkkkkkkkkk', NULL, '2025-08-27 07:39:52', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(41, 'Khubaib B', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '', 1500, 'Food', NULL, 'jjjjj', NULL, '2025-08-27 07:40:09', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(42, 'Khubaib B', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '', 1500, 'Food', NULL, 'klkl', NULL, '2025-08-27 07:44:34', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(43, 'Khubaib Bin', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756280804823-251364212.png', 1500, 'Food', NULL, 'fghshdf', NULL, '2025-08-27 07:46:44', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(44, 'Khubaib Bin', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756281431437-901948020.png', 1500, 'Food', NULL, 'dsdsds', NULL, '2025-08-27 07:57:11', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(45, 'Khubaib Bin t', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756281788175-497728884.png', 1500, 'Food', NULL, 'dfdfd', NULL, '2025-08-27 08:03:08', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(46, 'Khubaib Bin ti', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756282093426-852241786.png', 1500, 'Food', NULL, 'fdswadfa', NULL, '2025-08-27 08:08:13', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(47, 'Khubaib Bin ti', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756282363280-609533861.png', 1500, 'Food', NULL, 'dsaDSASDDFDDFGG', NULL, '2025-08-27 08:12:43', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(48, 'KBT', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756282558735-326954658.png', 1500, 'Food', NULL, 'Test', NULL, '2025-08-27 08:15:58', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'pending'),
(49, 'KBT vv', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756282832539-394328315.png', 1500, 'Food', NULL, 'bnfvbdbdffff', NULL, '2025-08-27 08:20:32', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'approved'),
(50, 'KBT KBT', 'khubaibbintariq455@gmail.com', '03000000000', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1756282991077-888357473.png', 1500, 'Food', NULL, 'fddfdfdfdfdfdfdf', NULL, '2025-08-27 08:23:11', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'approved'),
(52, 'Khubaib Bin Tariq', 'khubaib11@gmail.com', '03086001264', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1757155209603-310041097.png', 1508, 'Food', NULL, 'checkkkkkk', NULL, '2025-09-06 10:40:09', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'approved'),
(53, 'Khubaib Bin Tariq', 'khubaib1145@gmail.com', '03086001264', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1757155461384-592702360.png', 1508, 'Food', NULL, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', NULL, '2025-09-06 10:44:21', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'approved'),
(54, 'Khubaib ooo', 'khubaib1145@gmail.com', '03086001264', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', '/uploads/1757155810453-938673552.png', 1508, 'Food', NULL, 'afsdsdfsfsfs', NULL, '2025-09-06 10:50:10', 'https://www.fiverr.com/s/Ay6DaN4', 'https://www.fiverr.com/s/Ay6DaN4', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `ticket_price` decimal(10,2) NOT NULL,
  `ref_no` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `name`, `email`, `phone`, `ticket_price`, `ref_no`, `created_at`) VALUES
(1, 'Khubaib77', 'admin@gmail.com', '03000000000', 1500.00, '31', '2025-08-20 14:25:23');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `speaker` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `speaker_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `name`, `phone`, `email`, `speaker`, `created_at`, `speaker_id`) VALUES
(0, 'adminKhubaib77', '03000000000', 'a@gmail.com', '', '2025-08-26 10:40:48', 35),
(0, 'admin77', '03000000000', 'ad99@gmail.com', '', '2025-09-06 11:08:29', 54),
(0, 'adminKhubaib77', '03000000000', 'ad@gmail.com', '', '2025-08-26 10:25:34', 34),
(0, 'adminKhubaib77', '03000000000', 'add@gmail.com', '', '2025-08-27 07:57:48', 44),
(0, 'adminKhubaib77', '03000000000', 'admi@gmail.com', '', '2025-08-26 10:22:57', 34),
(0, 'admin Khubaib77', '03000000000', 'admin2@gmail.com', '', '2025-08-25 11:25:17', 33),
(0, 'admin Khubaib77', '03000000000', 'admin@gmail.com', '', '2025-08-25 11:25:02', 33),
(0, 'admind Khubaib77', '03000000000', 'admind@gmail.com', '', '2025-08-25 11:25:29', 20),
(0, 'admind Khubaib77', '03000000000', 'adminds@gmail.com', '', '2025-08-25 12:16:05', 22),
(0, 'admin77', '03000000000', 'admink@gmail.com', '', '2025-09-06 10:41:20', 52),
(0, 'adminKhubaib77', '03000000000', 'd@gmail.com', '', '2025-08-26 10:48:51', 28),
(0, 'adminKhubaib77', '03000000000', 'df@gmail.com', '', '2025-08-26 10:49:05', 28),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq03@gmail.com', 'khubaib32', '2025-08-04 15:54:33', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq0@gmail.com', 'khubaib32', '2025-08-04 15:55:51', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq123@gmail.com', 'khubaib32', '2025-07-31 19:55:07', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq13@gmail.com', 'khubaib89', '2025-07-31 19:56:20', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq1@gmail.com', 'khubaib32', '2025-07-31 19:55:36', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq3@gmail.com', 'khubaib32', '2025-08-01 14:51:38', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq56@gmail.com', 'khubaib32', '2025-08-04 17:36:35', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq6@gmail.com', 'khubaib3', '2025-08-04 18:01:06', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq76@gmail.com', 'khubaib32', '2025-08-04 17:23:57', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq88@gmail.com', 'khubaib3', '2025-08-05 04:23:25', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq8@gmail.com', 'khubaib32', '2025-08-05 04:23:52', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq93@gmail.com', 'khubaib32', '2025-08-01 14:42:32', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariq99@gmail.com', 'khubaib32', '2025-08-04 17:22:26', NULL),
(0, 'khubaib Bin Tariq', '+92 0000000003000000', 'khubaibintariq@gmail.com', 'khubaib32', '2025-08-04 15:39:52', NULL),
(0, 'khubaib', '+92 0000000003000000', 'khubaibintariqf@gmail.com', 'khubaib Bin Tariq2', '2025-08-06 11:37:26', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `angels`
--
ALTER TABLE `angels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ref_no` (`ref_no`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD UNIQUE KEY `Unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `angels`
--
ALTER TABLE `angels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
