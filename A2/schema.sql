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
  `party` int(11) unsigned NOT NULL,
  `guest` int(11) unsigned NOT NULL,
  PRIMARY KEY (`party`,`guest`),
  KEY `guest` (`guest`)
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
  `location` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `posted_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `featured_until` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  KEY `rated_for` (`rated_for`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `subscribes_to`
--

CREATE TABLE `subscribes_to` (
  `subscriber` int(11) unsigned NOT NULL,
  `user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`subscriber`,`user`),
  KEY `user` (`user`)
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
