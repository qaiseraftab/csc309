-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 28, 2014 at 10:02 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `house_party_finder`
--

-- --------------------------------------------------------

--
-- Table structure for table `attends`
--

CREATE TABLE `attends` (
  `party` int(11) unsigned NOT NULL,
  `guest` int(11) unsigned NOT NULL,
  PRIMARY KEY (`party`,`guest`),
  KEY `attends_ibfk_2` (`guest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

CREATE TABLE `parties` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `host` int(11) unsigned NOT NULL,
  `capacity` int(8) NOT NULL,
  `address` varchar(256) NOT NULL,
  `city` varchar(32) NOT NULL,
  `province` varchar(32) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `description` text,
  `posted_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ended` tinyint(1) NOT NULL DEFAULT '0',
  `featured_until` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `streaming` tinyint(1) NOT NULL DEFAULT '0',
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `food_provided` tinyint(1) NOT NULL DEFAULT '0',
  `alcohol` tinyint(1) NOT NULL DEFAULT '0',
  `parking` tinyint(1) NOT NULL DEFAULT '0',
  `adult_only` tinyint(1) NOT NULL DEFAULT '0',
  `rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `rating_count` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Triggers `parties`
--
DROP TRIGGER IF EXISTS `update_host_rating`;
DELIMITER //
CREATE TRIGGER `update_host_rating` AFTER UPDATE ON `parties`
 FOR EACH ROW BEGIN

IF old.rating <> new.rating THEN
UPDATE users SET rating = (SELECT AVG(rating) FROM parties WHERE host = new.host), rating_count = (SELECT SUM(rating_count) FROM parties WHERE host = new.host) WHERE users.id = new.host;
END IF;

END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `party_album`
--

CREATE TABLE `party_album` (
  `owner` int(11) unsigned NOT NULL,
  `picture` int(11) unsigned NOT NULL,
  PRIMARY KEY (`owner`,`picture`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rated_by` int(11) unsigned NOT NULL,
  `rated_for` int(11) unsigned NOT NULL,
  `rating` tinyint(4) unsigned NOT NULL,
  `comment` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`rated_by`,`rated_for`),
  KEY `ratings_ibfk_2` (`rated_for`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `ratings`
--
DROP TRIGGER IF EXISTS `update_ratings_remote`;
DELIMITER //
CREATE TRIGGER `update_ratings_remote` AFTER INSERT ON `ratings`
 FOR EACH ROW BEGIN

UPDATE parties SET rating = (SELECT AVG(rating) FROM ratings WHERE ratings.rated_for = new.rated_for), rating_count = (SELECT COUNT(*) FROM ratings WHERE ratings.rated_for = new.rated_for) WHERE parties.id = new.rated_for;

END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `subscribes_to`
--

CREATE TABLE `subscribes_to` (
  `subscriber` int(11) unsigned NOT NULL,
  `user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`subscriber`,`user`),
  KEY `subscribes_to_ibfk_2` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `posted_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `owner` int(11) unsigned NOT NULL,
  `extension` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `first_name` varchar(16) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(256) NOT NULL,
  `city` varchar(32) NOT NULL,
  `province` varchar(32) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `rating_count` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_album`
--

CREATE TABLE `user_album` (
  `owner` int(11) unsigned NOT NULL,
  `picture` int(11) unsigned NOT NULL,
  PRIMARY KEY (`owner`,`picture`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attends`
--
ALTER TABLE `attends`
  ADD CONSTRAINT `attends_ibfk_1` FOREIGN KEY (`party`) REFERENCES `parties` (`id`),
  ADD CONSTRAINT `attends_ibfk_2` FOREIGN KEY (`guest`) REFERENCES `users` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`rated_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`rated_for`) REFERENCES `parties` (`id`);

--
-- Constraints for table `subscribes_to`
--
ALTER TABLE `subscribes_to`
  ADD CONSTRAINT `subscribes_to_ibfk_1` FOREIGN KEY (`subscriber`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `subscribes_to_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
