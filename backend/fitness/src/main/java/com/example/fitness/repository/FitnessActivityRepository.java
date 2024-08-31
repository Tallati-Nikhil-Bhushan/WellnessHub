package com.example.fitness.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fitness.model.FitnessActivity;

@Repository
public interface FitnessActivityRepository extends JpaRepository<FitnessActivity, Long> {
	
	@Query("SELECT COALESCE(SUM(f.caloriesBurned), 0) FROM FitnessActivity f WHERE f.userId = :userId AND f.activityDate BETWEEN :startDate AND :endDate")
    double getCaloriesBurned(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
	
	@Query("SELECT COALESCE(SUM(f.caloriesBurned), 0) FROM FitnessActivity f WHERE f.userId = :userId AND f.activityDate = :todayDate")
    double getCaloriesBurnedToday(@Param("userId") Long userId, @Param("todayDate") LocalDate todayDate);
	
	List<FitnessActivity> findByUserId(Long userId);
}
