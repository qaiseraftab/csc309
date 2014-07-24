-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 17, 2014 at 02:20 AM
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
  `party` int(11) unsigned NOT NULL REFERENCES parties(id),
  `guest` int(11) unsigned NOT NULL REFERENCES users(id),
  PRIMARY KEY (`party`,`guest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

CREATE TABLE `parties` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `host` int(11) unsigned NOT NULL REFERENCES users(id),
  `capacity` int(8) NOT NULL,
  `address` varchar(256) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `description` text,
  `posted_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' CHECK (end_date > start_date),
  `ended` tinyint(1) NOT NULL DEFAULT 1,
  `featured_until` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `streaming` tinyint(1) NOT NULL DEFAULT 0,
  `private` tinyint(1) NOT NULL DEFAULT 0,
  `food_provided` tinyint(1) NOT NULL DEFAULT 0,
  `alcohol` tinyint(1) NOT NULL DEFAULT 0,
  `parking` tinyint(1) NOT NULL DEFAULT 0,
  `adult_only` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `rated_by` int(11) unsigned NOT NULL REFERENCES users(id),
  `rated_for` int(11) unsigned NOT NULL REFERENCES parties(id),
  `rating` tinyint(4) unsigned NOT NULL,
  `comment` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`rated_by`,`rated_for`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscribes_to`
--

CREATE TABLE `subscribes_to` (
  `subscriber` int(11) unsigned NOT NULL REFERENCES users(id),
  `user` int(11) unsigned NOT NULL REFERENCES users(id),
  PRIMARY KEY (`subscriber`,`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar (256) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
