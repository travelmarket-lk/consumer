-- Schema snapshot of the existing travelmarket database.
-- This file documents the current database and is not an application migration.

CREATE TABLE `adm_group_permissions` (
  `group_id` int NOT NULL,
  `permission_code` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`,`permission_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `adm_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `adm_user_groups` (
  `user_id` bigint NOT NULL,
  `adm_group_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`adm_group_id`),
  KEY `FK4p0feqbpw75cvxxx9t5hpiigf` (`adm_group_id`),
  CONSTRAINT `FK299w2g2lyds72vrkxhaxi8slu` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK4p0feqbpw75cvxxx9t5hpiigf` FOREIGN KEY (`adm_group_id`) REFERENCES `adm_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_method_permissions` (
  `method_no` int NOT NULL,
  `service_id` int NOT NULL,
  `permission_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`method_no`,`service_id`),
  CONSTRAINT `FKfy3w2d6g0ywtgycdc8222gc0r` FOREIGN KEY (`method_no`, `service_id`) REFERENCES `api_service_methods` (`method_no`, `service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_permissions` (
  `code` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_service_methods` (
  `method_no` int NOT NULL,
  `service_id` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `method` varchar(10) DEFAULT NULL,
  `resource_path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`method_no`,`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `api_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_non_expired` bit(1) NOT NULL,
  `account_non_locked` bit(1) NOT NULL,
  `credentials_non_expired` bit(1) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
