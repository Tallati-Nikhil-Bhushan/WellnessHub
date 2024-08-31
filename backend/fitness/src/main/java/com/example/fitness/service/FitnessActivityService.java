package com.example.fitness.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.fitness.model.FitnessActivity;
import com.example.fitness.repository.FitnessActivityRepository;


@Service
public class FitnessActivityService {

    @Autowired
    private FitnessActivityRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public FitnessActivity saveFitnessActivity(Long userId, String activityType, int duration, double weightKg, double heightCm, int age, LocalDate date) {
        String query = activityType + " for " + duration + " minutes";

        // Create request body for the API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("query", query);
        requestBody.put("weight_kg", weightKg);
        requestBody.put("height_cm", heightCm);
        requestBody.put("age", age);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-app-id", "ba07c6d1");
        headers.set("x-app-key", "35d19200749a26674d81a581834318fb");

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Call the Nutritionix API
        ResponseEntity<Map> response = restTemplate.exchange(
                "https://trackapi.nutritionix.com/v2/natural/exercise",
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        // Extract calories burned
        double caloriesBurned = 0;
        List<Map<String, Object>> exercises = (List<Map<String, Object>>) response.getBody().get("exercises");
        if (exercises != null && !exercises.isEmpty()) {
        	Object caloriesObj = exercises.get(0).get("nf_calories");
            
            if (caloriesObj instanceof Number) {
                caloriesBurned = ((Number) caloriesObj).doubleValue();
            }
        }

        // Save to database
        FitnessActivity fitnessActivity = new FitnessActivity();
        
        fitnessActivity.setUserId(userId);
        fitnessActivity.setActivityType(activityType);
        fitnessActivity.setDurationMinutes(duration);
        fitnessActivity.setCaloriesBurned(caloriesBurned);
        fitnessActivity.setActivityDate(date);

        return repository.save(fitnessActivity);
    }

    public double getCaloriesBurnedLast30Days(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(30);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedLast7Days(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(7);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedLastDay(Long userId) {
        LocalDate startDate = LocalDate.now().minusDays(1);
        return repository.getCaloriesBurned(userId, startDate, LocalDate.now().minusDays(1)); // Exclude today
    }

    public double getCaloriesBurnedToday(Long userId) {
        LocalDate today = LocalDate.now();
        return repository.getCaloriesBurnedToday(userId, today);
    }
}

