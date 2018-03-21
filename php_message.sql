-- phpMyAdmin SQL Dump
-- version 4.4.15
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-05-24 20:13:36
-- 服务器版本： 5.5.23
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `php_message`
--

-- --------------------------------------------------------

--
-- 表的结构 `pm_message`
--

CREATE TABLE IF NOT EXISTS `pm_message` (
  `pm_id` mediumint(8) NOT NULL,
  `pm_title` text NOT NULL,
  `pm_content` text NOT NULL,
  `pm_post_user` varchar(20) NOT NULL,
  `pm_post_time` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `pm_user`
--

CREATE TABLE IF NOT EXISTS `pm_user` (
  `pm_id` mediumint(20) NOT NULL,
  `pm_username` varchar(200) NOT NULL,
  `pm_password` varchar(40) NOT NULL,
  `pm_sex` varchar(6) NOT NULL,
  `pm_email` varchar(233) NOT NULL,
  `pm_reg_time` datetime NOT NULL,
  `pm_uniqid` char(40) NOT NULL,
  `pm_last_ip` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pm_message`
--
ALTER TABLE `pm_message`
  ADD PRIMARY KEY (`pm_id`);

--
-- Indexes for table `pm_user`
--
ALTER TABLE `pm_user`
  ADD PRIMARY KEY (`pm_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pm_message`
--
ALTER TABLE `pm_message`
  MODIFY `pm_id` mediumint(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=170;
--
-- AUTO_INCREMENT for table `pm_user`
--
ALTER TABLE `pm_user`
  MODIFY `pm_id` mediumint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
