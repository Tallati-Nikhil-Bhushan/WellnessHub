package com.example.fitness.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fitness.model.ActivityRequest;
import com.example.fitness.model.FitnessActivity;
import com.example.fitness.service.FitnessActivityService;

@RestController
@RequestMapping("/api/fitness")
@CrossOrigin(origins = "http://localhost:4200")
public class FitnessActivityController {

    @Autowired
    private FitnessActivityService service;

    @GetMapping("/{userId}/calories-burned/last-30-days")
    public double getCaloriesBurnedLast30Days(@PathVariable Long userId) {
        return service.getCaloriesBurnedLast30Days(userId);
    }

    @GetMapping("/{userId}/calories-burned/last-7-days")
    public double getCaloriesBurnedLast7Days(@PathVariable Long userId) {
        return service.getCaloriesBurnedLast7Days(userId);
    }

    @GetMapping("/{userId}/calories-burned/last-day")
    public double getCaloriesBurnedLastDay(@PathVariable Long userId) {
        return service.getCaloriesBurnedLastDay(userId);
    }

    @GetMapping("/{userId}/calories-burned/today")
    public double getCaloriesBurnedToday(@PathVariable Long userId) {
        return service.getCaloriesBurnedToday(userId);
    }

    @PostMapping("/add-activity")
    public ResponseEntity<FitnessActivity> addActivity(@RequestBody ActivityRequest request){
    Long userId = request.getUserId();
    String activityType = request.getActivityType();
    int duration = request.getDuration();
    double weightKg = request.getWeightKg();
    double heightCm = request.getHeightCm();
    int age = request.getAge();
    LocalDate date = request.getDate();

        FitnessActivity fitnessActivity = service.saveFitnessActivity(userId, activityType, duration, weightKg, heightCm, age, date);
        return ResponseEntity.ok(fitnessActivity);
    }
}

